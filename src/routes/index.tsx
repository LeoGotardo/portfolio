import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/portfolio/Home";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead("en"),
  component: () => <Home locale="en" />,
});
