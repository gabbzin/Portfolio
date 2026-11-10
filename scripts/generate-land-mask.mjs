// Gera public/globe/land-mask.png: máscara equirretangular em escala de cinza
// (branco = terra) que o globo usa para decidir onde colocar pontos.
//
// Fonte: Natural Earth 1:110m (domínio público), no formato TopoJSON do pacote
// world-atlas. Só precisa rodar de novo para mudar a resolução:
//
//   npm pack world-atlas@2 && tar xzf world-atlas-*.tgz
//   node scripts/generate-land-mask.mjs package/land-110m.json
import { readFileSync, writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";

const WIDTH = 720;
const HEIGHT = 360;

const topology = JSON.parse(readFileSync(process.argv[2], "utf8"));
const { scale, translate } = topology.transform;

// Os arcos do TopoJSON são codificados em delta e quantizados.
const arcs = topology.arcs.map(arc => {
  let x = 0;
  let y = 0;
  return arc.map(([dx, dy]) => {
    x += dx;
    y += dy;
    return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
  });
});

const ring = indexes =>
  indexes.flatMap(index =>
    index >= 0 ? arcs[index] : arcs[~index].slice().reverse(),
  );

const polygons = topology.objects.land.geometries.flatMap(geometry =>
  geometry.type === "Polygon" ? [geometry.arcs] : geometry.arcs,
);

// Anéis que cruzam o antimeridiano (Eurásia pela Chukotka, Fiji) misturam
// longitudes perto de -180 e de 180. Desdobrar o lado oeste para além de 180
// deixa o anel contínuo; a Antártida fica de fora porque de fato dá a volta.
function unwrap(points) {
  const crosses =
    points.some(([lon]) => lon > 90) && points.some(([lon]) => lon < -90);
  const isAntarctica = points.some(([, lat]) => lat < -80);
  if (!crosses || isAntarctica) return points;
  return points.map(([lon, lat]) => [lon < -90 ? lon + 360 : lon, lat]);
}

const rings = polygons.flat().map(ring).map(unwrap);

// Regra par-ímpar sobre todos os anéis: buracos (lagos) saem naturalmente.
function isLand(lon, lat) {
  return contains(lon, lat) || contains(lon + 360, lat);
}

function contains(lon, lat) {
  let inside = false;
  for (const points of rings) {
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const [xi, yi] = points[i];
      const [xj, yj] = points[j];
      if (
        yi > lat !== yj > lat &&
        lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi
      )
        inside = !inside;
    }
  }
  return inside;
}

// PNG de 8 bits em escala de cinza: cada linha começa com o byte de filtro 0.
const raw = Buffer.alloc((WIDTH + 1) * HEIGHT);
for (let y = 0; y < HEIGHT; y++) {
  const lat = 90 - ((y + 0.5) / HEIGHT) * 180;
  for (let x = 0; x < WIDTH; x++) {
    const lon = ((x + 0.5) / WIDTH) * 360 - 180;
    raw[y * (WIDTH + 1) + 1 + x] = isLand(lon, lat) ? 255 : 0;
  }
}

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function chunk(type, data) {
  const body = Buffer.concat([Buffer.from(type), data]);
  let crc = 0xffffffff;
  for (const byte of body) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const sum = Buffer.alloc(4);
  sum.writeUInt32BE((crc ^ 0xffffffff) >>> 0);
  return Buffer.concat([length, body, sum]);
}

const header = Buffer.alloc(13);
header.writeUInt32BE(WIDTH, 0);
header.writeUInt32BE(HEIGHT, 4);
header.set([8, 0, 0, 0, 0], 8);

const out = new URL("../public/globe/land-mask.png", import.meta.url);
writeFileSync(
  out,
  Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]),
);
console.log(`land-mask.png: ${WIDTH}x${HEIGHT}`);
