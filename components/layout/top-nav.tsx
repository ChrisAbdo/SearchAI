import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth/next";
import React from "react";
import ProfileDropdown from "../auth/profile-dropdown";
import AuthDrawer from "../auth/auth-drawer";
import { ModeToggle } from "./mode-toggle";

export default async function TopNav() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-3">
      <h1 className="text-xl font-semibold">BirdyAI</h1>

      {session ? (
        <>
          <ProfileDropdown />
          <ModeToggle />
        </>
      ) : (
        <>
          <AuthDrawer text="Sign In" />
          <ModeToggle />
        </>
      )}
    </header>
  );
}
