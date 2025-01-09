import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/feed/$authorId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { authorId } = Route.useParams();
  // list of posts page
  // what path should be the actual post path here?
  return (
    <div>
      <h1>Posts by author {authorId}</h1>
      <span>URL to the original website</span>
      <div className="flex flex-col">
        <h2>Name of the post</h2>
        <p>Small description of the post</p>
        <div>
          <span>Date it was published</span>
          <span>tags?</span>
          <span>Path to the original blog post</span>
        </div>
      </div>
    </div>
  );
}
