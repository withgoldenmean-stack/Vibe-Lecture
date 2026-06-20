import OpenAI from "openai";

export const getOpenAIConfig = () => {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4.1-mini";

  return {
    apiKey,
    model,
    isConfigured: Boolean(apiKey)
  };
};

export const createOpenAIClient = () => {
  const { apiKey } = getOpenAIConfig();

  if (!apiKey) {
    return undefined;
  }

  return new OpenAI({ apiKey });
};
