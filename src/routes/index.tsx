import InformationHub from "@/components/home/about-event";
import AboutEvent from "@/components/home/event-hub";
import Hero from "@/components/home/hero";
import JoinApp from "@/components/home/join-app";
import Newsletter from "@/components/home/newsletter";
import Partners from "@/components/home/partners";
import StatsStrip from "@/components/home/stats-strip";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <InformationHub />
      <AboutEvent />
      <StatsStrip />
      <Partners />
      <JoinApp />
      <Newsletter />
    </>
  );
}
