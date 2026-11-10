import { Arrival } from "@/components/chapters/Arrival";
import { Crossing } from "@/components/chapters/Crossing";
import { Departure } from "@/components/chapters/Departure";
import { FirstSteps } from "@/components/chapters/FirstSteps";
import { Harbor } from "@/components/chapters/Harbor";
import { Projects } from "@/components/chapters/Projects";
import { Stack } from "@/components/chapters/Stack";
import { JourneyRoot } from "@/components/journey/JourneyRoot";
import { SceneCanvas } from "@/components/journey/SceneCanvas";

export default function Home() {
  return (
    <>
      <SceneCanvas />
      <JourneyRoot>
        <Departure />
        <FirstSteps />
        <Stack />
        <Projects />
        <Harbor />
        <Crossing />
        <Arrival />
      </JourneyRoot>
    </>
  );
}
