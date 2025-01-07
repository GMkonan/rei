import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { client } from "../services/api";
import { useQuery } from "@tanstack/react-query";

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
      <h1 className="text-2xl">Feeds page</h1>
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
            className="p-1 bg-slate-500 rounded-sm text-white"
          >
            Add feed
          </button>
        </form>
      </div>
      <div className="mt-4">
        {feedData?.map((feed) => (
          <div
            className="flex flex-col border border-black p-4 items-start"
            key={feed.title}
          >
            <h2 className="text-xl font-bold">{feed.title}</h2>
            <p>{feed.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
