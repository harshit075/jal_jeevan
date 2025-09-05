
import { chat } from '@/ai/flows/chat';
import { NextRequest, NextResponse } from 'next/server';
import { Message, experimental_streamText } from 'ai';

export const runtime = 'edge';

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
    console.error(e);
    return NextResponse.json(
      { error: 'Error processing chat request' },
      { status: 500 }
    );
  }
}
