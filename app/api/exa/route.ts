import { NextResponse } from "next/server";
import Exa from "exa-js";
import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth/next";

const exa = new Exa("4b5b780b-a7dc-46ec-aeca-d3c882173f80");

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const numSearches = session?.user?.numSearches as number;
  const url = new URL(req.url);
  const prompt = url.searchParams.get("prompt");

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const result = await exa.search(prompt, {
      type: "neural",
      useAutoprompt: true,
      numResults: numSearches,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
