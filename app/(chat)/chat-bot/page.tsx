"use client";
import ChatNav from "@/components/ChatNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import model from "@/lib/gemini/config";
import { cn } from "@/lib/utils";
import { Content } from "@google/generative-ai";
import { Plus, Send } from "lucide-react";
import { useState } from "react";

const ChatBotPage = () => {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<Content[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return; 

    setHistory((oldHistory) => [
      ...oldHistory,
      {
        role: "user",
        parts: [{ text: message }],
      },
    ]);

    try {
      const chat = model.startChat({
        history: [...history, { role: "user", parts: [{ text: message }] }],
      });

      const result = await chat.sendMessage(message);
      const text = result.response.text(); 

      setHistory((oldHistory) => [
        ...oldHistory,
        {
          role: "model",
          parts: [{ text }],
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setMessage(""); 
    }
  };

  return (
    <section className="flex flex-col justify-between p-4">
      <ChatNav />
      <div
        className="flex flex-col p-4 gap-3 bg-gray-100 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        {history.map((content, index) => (
          <div key={index} className={cn('flex', content.role === 'user' && 'justify-end')}>
            <p
              className={cn(
                "p-2 rounded-lg w-fit",
                content.role === "user"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              )}
            >
              {content.role === "user"
                ? content.parts[0].text
                : content.parts[0].text}
            </p>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 top-[600px] w-[75%] p-2 flex gap-5 items-center">
        <Button
          type="button"
          className="rounded-[50px] bg-green-400 hover:bg-green-600 p-2"
        >
          <Plus />
        </Button>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-green-500"
          placeholder="Type 'From the Start' or Something you would like...."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button
          onClick={sendMessage}
          type="button"
          className="rounded-[50px] bg-green-400 hover:bg-green-600 p-2"
        >
          <Send />
        </Button>
      </div>
    </section>
  );
};

export default ChatBotPage;
