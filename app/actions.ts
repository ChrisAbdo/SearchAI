// actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth-options";

let sessionCache: any = null;

async function getSession() {
  if (!sessionCache) {
    sessionCache = await getServerSession(authOptions);
  }
  return sessionCache;
}

export async function setNumSearches(formData: FormData) {
  const numSearches = Number(formData.get("numSearches"));
  const session = await getSession();
  if (!session || !session.user) {
    return {
      error: "User not authenticated",
    };
  }

  const userId = session.user.id;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { numSearches },
    });

    revalidatePath("/");
  } catch (error: any) {
    console.error("Error in setNumSearches function:", error);
    return {
      error: error.message,
    };
  }
}

export async function addSearch(formData: FormData) {
  const input = String(formData.get("input"));
  const session = await getSession();
  if (!session || !session.user) {
    return {
      error: "User not authenticated",
    };
  }

  const authorId = session.user.id;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/exa?prompt=${encodeURIComponent(
        input
      )}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch from /api/exa: ${response.statusText}`);
    }

    const data = await response.json();

    await prisma.search.create({
      data: {
        authorId,
        search: input,
        result: JSON.stringify(data), // Serialize the result object
      },
    });

    revalidatePath("/");
    return data;
  } catch (error: any) {
    console.error("Error in addSearch function:", error);
    return {
      error: error.message,
    };
  }
}
