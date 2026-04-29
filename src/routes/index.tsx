import { createFileRoute } from "@tanstack/react-router";
import Hero from "./fragments/hero";
import InformationHub from "./fragments/about-event";
import AboutEvent from "./fragments/event-hub";
import StatsStrip from "./fragments/stats-strip";
import Partners from "./fragments/partners";
import JoinApp from "./fragments/join-app";
import Newsletter from "./fragments/newsletter";

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
