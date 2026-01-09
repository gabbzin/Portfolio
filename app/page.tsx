import Header from "@/components/header";
import { StarBackground } from "@/components/StarBackground";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />
      <StarBackground />
    </div>
  );
}
