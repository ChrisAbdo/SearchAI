"use client";
import React from "react";

export default function Home() {
  const [input, setInput] = React.useState("");
  const [data, setData] = React.useState(null);

  async function fetchExa(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch(
      `/api/exa?prompt=${encodeURIComponent(input)}`
    );
    const data = await response.json();
    setData(data);
  }

  return (
    <div>
      <form onSubmit={fetchExa}>
        <input
          name="prompt"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {data && (
        <div>
          <h2>Search Results:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
