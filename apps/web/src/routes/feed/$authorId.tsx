import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/feed/$authorId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { authorId } = Route.useParams();
  return <div>{authorId}</div>;
}
