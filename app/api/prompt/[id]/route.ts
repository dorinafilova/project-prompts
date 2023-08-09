import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, {params}) {
    try {
      await connectToDB();
      const prompt = await Prompt.findById(params.id).populate("creator");
      if(!prompt) return new Response("Post not found", { status: 404 });

      return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
      return new Response("Error fetching the prompts", { status: 500 });
    }
  }

  export async function PATCH(request: NextRequest, {params}) {
    const {prompt} = await request.json();
    try {
      await connectToDB();
      const existingPrompt= await Prompt.findById(params.id);
        if(!existingPrompt)return new Response("Post not found", { status: 404 });

        existingPrompt.prompt = prompt
        await existingPrompt.save();

      return new Response("Successfully updated prompt!", { status: 200 });
    } catch (error) {
      return new Response("Error editing the prompt", { status: 500 });
    }
  }

  export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};