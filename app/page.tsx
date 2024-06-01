import AskExa from "@/components/upload-form/ask-exa";
import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth/next";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const numSearches = session?.user?.numSearches as number;

  return (
    // <div className="flex flex-col px-3 bg-muted/40 min-h-full">
    //   <main className="mt-4">
    //     <AskExa numSearches={numSearches} />
    //   </main>
    // </div>
    <div className="bg-background">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary sm:text-6xl">
              Research made easy
            </h1>

            <AskExa numSearches={numSearches} session={session} />
          </div>
        </div>
      </div>
    </div>
  );
}
