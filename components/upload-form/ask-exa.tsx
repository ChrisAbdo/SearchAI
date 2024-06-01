"use client";
import React from "react";
import { Input } from "../ui/input";
import { addSearch } from "@/app/actions";
import { Textarea } from "../ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "../ui/label";

export default function AskExa() {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const handleInput = () => {
    const textarea = textareaRef.current as HTMLTextAreaElement;
    if (textarea) {
      // Resetting the rows to auto adjust height properly
      textarea.rows = 1;
      // Calculate the new number of rows based on scrollHeight
      const newRows = Math.min(3, Math.floor(textarea.scrollHeight / 24)); // assuming 24px per line height
      textarea.rows = newRows;
    }
  };

  return (
    <>
      <form action={addSearch}>
        <div className="flex items-center space-x-2">
          <Switch id="private" />
          <Label htmlFor="private">Private</Label>
        </div>
        <Textarea
          id="input"
          name="input"
          ref={textareaRef}
          rows={1}
          onInput={handleInput}
          className="resize-none"
          style={{ overflowY: "auto" }} // Enable scrolling when max rows are reached
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
}
