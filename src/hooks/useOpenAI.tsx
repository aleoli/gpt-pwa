import OpenAI from "openai";
import Message from "../classes/message";

function messagesToPrompt(messages: Message[]): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
  const initialization = localStorage.getItem('initialization') ?? 'You are an helpful assistant.';
  return [{
    role: 'system',
    content: initialization,
  }, ...messages.map((message): OpenAI.Chat.Completions.ChatCompletionMessageParam => ({
    role: message.author === 'user' ? 'user' : 'assistant',
    content: message.message ?? '',
  }))];
}

export function completion(prompt: Message[]): Promise<string | null> {
  const apiKey = localStorage.getItem('openAIApiKey');
  if (apiKey === null) return Promise.reject('OpenAI API Key not found, set it in the settings.');

  const model = localStorage.getItem('textGenerationModel') ?? 'gpt-3.5-turbo';

  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  return new Promise((resolve, reject) => {
    openai.chat.completions.create({
      messages: messagesToPrompt(prompt),
      model: model,
    }).then((completion) => {
      resolve(completion.choices[0].message.content);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function imageGeneration(prompt: string): Promise<string | undefined> {
  const apiKey = localStorage.getItem('openAIApiKey');
  if (apiKey === null) return Promise.reject('OpenAI API Key not found, set it in the settings.');

  const model = localStorage.getItem('imageGenerationModel') ?? 'dall-e-2';

  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  return new Promise((resolve, reject) => {
    openai.images.generate({
      model: model,
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    }).then((result) => {
      resolve(result.data[0].url);
    }).catch((error) => {
      reject(error);
    });
  });
}
