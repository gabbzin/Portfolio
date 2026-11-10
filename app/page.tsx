import { Arrival } from "@/components/journey/Arrival";
import { Departure } from "@/components/journey/Departure";
import { Journey } from "@/components/journey/Journey";
import { VoyageActs } from "@/components/journey/VoyageActs";

export default function Home() {
  return (
    <Journey>
      <Departure />
      <VoyageActs />
      <Arrival />
    </Journey>
  );
}
