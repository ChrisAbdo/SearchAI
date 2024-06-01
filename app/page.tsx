import AskExa from "@/components/upload-form/ask-exa";

import AuthDrawer from "@/components/auth/auth-drawer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth-options";
import ProfileDropdown from "@/components/auth/profile-dropdown";
import { prisma } from "@/prisma/db";
import Sidebar from "@/components/layout/sidebar";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const searches = await prisma.search.findMany({
    where: {
      authorId: session?.user.id,
    },
  });
  return (
    <div className="flex flex-col px-4">
      <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background">
        <h1 className="text-xl font-semibold">Playground</h1>

        {session ? <ProfileDropdown /> : <AuthDrawer text="Sign In" />}
      </header>
      <main className="">
        {/* {searches.map((search) => (
            <div key={search.id} className="p-4">
              <h2 className="text-lg font-semibold">{search.search}</h2>
              <p className="text-sm text-muted">{search.result}</p>
            </div>
          ))} */}
        <AskExa />
      </main>
    </div>
  );
}
