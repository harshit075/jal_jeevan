// This is a new server-only route to handle the Genkit chat flow.

import { chat } from '@/ai/flows/chat';
import { NextRequest, NextResponse } from 'next/server';
import { Message, experimental_streamText } from 'ai';

export const runtime = 'nodejs'; // This route runs in the Node.js runtime

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages: Message[] };

    const history = messages.slice(0, -1);
    const prompt = messages[messages.length - 1].content;

    const { stream } = await chat({
      history,
      prompt,
      stream: true,
    });
    
    return experimental_streamText({
      stream,
    });

  } catch (e) {
    console.error('Error in server-side chat route:', e);
    return NextResponse.json(
      { error: 'Error processing chat request' },
      { status: 500 }
    );
  }
}
