import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { client } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { Bell } from "lucide-react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [input, setInput] = useState("");

  const { data: feedData } = useQuery({
    queryKey: ["feedQuery"],
    // make this in other function to use other eden retuns that are not only data
    queryFn: async () => (await client.feeds.get()).data,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitting", input);

    try {
      const res = await client["new-feed"].post({ url: input });
      console.log(res.status);
    } catch (err) {
      console.error(err);
    }

    setInput("");
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl">Feeds</h1>
      <div className="mt-4">
        <form>
          <input
            placeholder="feed url..."
            className="border p-1 border-black mr-2"
            value={input}
            onInput={(e) => setInput((e.target as HTMLInputElement).value)}
          />
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={handleSubmit}
            className="p-1 bg-primary text-secondary rounded-sm"
          >
            Add feed
          </button>
        </form>
      </div>
      <div className="mt-4">
        {feedData?.map((feed) => (
          <>
            <div
              className="flex items-center justify-between p-1 w-96"
              key={feed.id}
            >
              <a href={`feed/${feed.id}`} className="flex flex-col">
                <h2 className="text-md">{feed.title}</h2>
                <p className="text-sm">{feed.description}</p>
              </a>
              <div className="">
                <Toggle aria-label="Toggle notifications">
                  <Bell />
                </Toggle>
              </div>
            </div>
            <Separator key={feed.id} />
          </>
        ))}
      </div>
    </div>
  );
}
