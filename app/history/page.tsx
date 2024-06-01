import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth/next";
import React from "react";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const searches = await prisma.search.findMany({
    where: {
      authorId: session?.user.id,
    },
  });
  return (
    <div>
      {searches.map((search) => (
        <div key={search.id} className="p-4">
          <h2 className="text-lg font-semibold">{search.search}</h2>
          <p className="text-sm text-muted">{search.result}</p>
        </div>
      ))}
    </div>
  );
}
