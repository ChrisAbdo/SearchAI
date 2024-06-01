import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { Settings2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { setNumSearches } from "@/app/actions";

export default function AISettings({ numSearches }: { numSearches: number }) {
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline">
              <Settings2 className="size-5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">AI Settings</TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust your AI Settings</DialogTitle>
          <DialogDescription>More settings coming soon!</DialogDescription>
          {/* <Input
            id="ai-settings"
            name="ai-settings"
            placeholder="Number of results"
            type="number"
            defaultValue={5}
          /> */}
          <div className="w-full items-center gap-1.5">
            <form action={setNumSearches}>
              <Label htmlFor="numSearches">
                Number of results (more = slower)
              </Label>
              <Input
                id="numSearches"
                name="numSearches"
                type="number"
                defaultValue={numSearches}
              />
              <Button type="submit">Set</Button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
