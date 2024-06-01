"use client";
import React from "react";
import { Input } from "../ui/input";
import { addSearch } from "@/app/actions";

export default function AskExa() {
  const [input, setInput] = React.useState("");
  const [data, setData] = React.useState(null);

  return (
    <div>
      <form action={addSearch}>
        <Input name="input" id="input" />
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
