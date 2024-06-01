import React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  GithubLoginButton,
  GoogleLoginButton,
} from "@/components/auth/login-buttons";

export default function AuthDrawer({ text }: { text?: string }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="ml-auto gap-1.5 text-sm">{text}</Button>
      </DrawerTrigger>
      <DrawerContent className="h-1/2">
        <DrawerHeader className="mx-auto mt-4 max-w-lg gap-4">
          <DrawerTitle>Welcome to OSS Hub</DrawerTitle>
          <DrawerDescription>
            Sign in to create posts, comment on posts, upvote posts, and more!
          </DrawerDescription>
          <GithubLoginButton />
          <GoogleLoginButton />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
