import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, {params}) {
  try {
    await connectToDB();
    const prompts = await Prompt.find({creator: params.id}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Error fetching the prompts", { status: 500 });
  }
}
