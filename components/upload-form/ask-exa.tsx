"use client";
import React from "react";
import { addSearch } from "@/app/actions";
import { Textarea } from "../ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ArrowUp, CornerDownLeft } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import AISettings from "./ai-settings";
import { Separator } from "../ui/separator";
import { AuthDrawerQuestion } from "../auth/auth-drawer";

export default function AskExa({
  numSearches,
  session,
}: {
  numSearches: number;
  session: any;
}) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [result, setResult] = React.useState(null);
  const handleInput = () => {
    const textarea = textareaRef.current as HTMLTextAreaElement;
    if (textarea) {
      textarea.rows = 1;
      const newRows = Math.min(3, Math.floor(textarea.scrollHeight / 24));
      textarea.rows = newRows;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = await addSearch(formData);
    setResult(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-background border rounded-lg">
        <Textarea
          id="input"
          name="input"
          ref={textareaRef}
          placeholder="The hottest topics in AI"
          onInput={handleInput}
          className="resize-none border-none shadow-none focus:ring-0 focus:outline-none"
          style={{ overflowY: "auto" }} // Enable scrolling when max rows are reached
        />
        <div className="flex justify-between p-2">
          <div className="flex gap-2">
            <AISettings numSearches={numSearches} />
            <Separator orientation="vertical" />
            <div className="flex items-center space-x-2">
              <Switch id="private" />
              <Label htmlFor="private">Private</Label>
            </div>
          </div>
          <div className="space-x-2">
            {session ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="submit" size="icon" variant="secondary">
                    <CornerDownLeft className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Submit</TooltipContent>
              </Tooltip>
            ) : (
              <AuthDrawerQuestion />
            )}
          </div>
        </div>
      </form>
      {result && (
        <div className="mt-4 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Search Result</h2>
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
