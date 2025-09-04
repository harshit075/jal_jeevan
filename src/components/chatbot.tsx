
'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Input } from './ui/input';
import { Bot, Send, X } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { continueConversation } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


function ChatMessage({ role, content }: { role: 'user' | 'assistant'; content: string }) {
    const isUser = role === 'user';
    return (
        <div className={cn("flex items-start gap-3", isUser && "justify-end")}>
            {!isUser && (
                 <Avatar className="h-8 w-8 border">
                    <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
            )}
            <div className={cn(
                "rounded-lg px-3 py-2 text-sm max-w-xs break-words", 
                isUser ? "bg-primary text-primary-foreground" : "bg-muted"
            )}>
                {content}
            </div>
             {isUser && (
                 <Avatar className="h-8 w-8 border">
                    <AvatarFallback>You</AvatarFallback>
                </Avatar>
            )}
        </div>
    )
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: undefined,
    // @ts-ignore
    action: continueConversation
  });

  return (
    <div>
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button size="icon" className="fixed bottom-24 right-4 md:bottom-6 md:right-6 rounded-full w-14 h-14 shadow-lg z-50">
               {open ? <X /> : <Bot />}
                <span className="sr-only">Open Chat</span>
            </Button>
        </PopoverTrigger>
        <PopoverContent 
            align="end" 
            sideOffset={16} 
            className="w-[90vw] max-w-md h-[70vh] p-0 flex flex-col"
        >
            <div className="p-4 border-b">
                <h3 className="font-semibold text-lg">Jal Jeevan Assistant</h3>
                <p className="text-sm text-muted-foreground">Ask me anything about water safety!</p>
            </div>
            <ScrollArea className="flex-1 p-4">
                 <div className="space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center text-sm text-muted-foreground p-8">
                            <Bot className="mx-auto h-12 w-12 mb-4" />
                            <p>Start a conversation by typing a message below.</p>
                        </div>
                    )}
                    {messages.map(m => (
                       <ChatMessage key={m.id} role={m.role} content={m.content} />
                    ))}
                 </div>
            </ScrollArea>
            <div className="p-4 border-t bg-background">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type a message..."
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input}>
                        <Send />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
        </PopoverContent>
        </Popover>
    </div>
  );
}
