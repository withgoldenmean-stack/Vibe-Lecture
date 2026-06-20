import { NextResponse } from "next/server";
import { createOpenAIClient, getOpenAIConfig } from "@/lib/openai";

export async function GET() {
  const config = getOpenAIConfig();

  return NextResponse.json({
    configured: config.isConfigured,
    model: config.model
  });
}

export async function POST(request: Request) {
  const client = createOpenAIClient();
  const config = getOpenAIConfig();

  if (!client) {
    return NextResponse.json(
      {
        error: "OPENAI_API_KEY가 설정되어 있지 않습니다.",
        configured: false
      },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as { prompt?: string };
  const prompt = body.prompt?.trim();

  if (!prompt) {
    return NextResponse.json(
      {
        error: "prompt가 비어 있습니다."
      },
      { status: 400 }
    );
  }

  const response = await client.responses.create({
    model: config.model,
    input: prompt
  });

  return NextResponse.json({
    configured: true,
    model: config.model,
    text: response.output_text
  });
}
