import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

type Feed = {
  title: string;
  description: string;
};

function Index() {
  const [input, setInput] = useState("");
  const [feeds, setFeeds] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitting", input);

    try {
      const res = await fetch("http://localhost:3000/feeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: input }),
      });

      if (res.ok) {
        console.log("feed added");
        console.log(res);
        const data = await res.json();
        setFeeds([...feeds, data.feed]);
      } else {
        console.error("error adding feed");
      }
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
          <button
            onClick={handleSubmit}
            className="p-1 bg-slate-500 rounded-sm text-white"
          >
            Add feed
          </button>
        </form>
      </div>
      <div className="mt-4">
        {feeds.map((feed: Feed) => (
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
