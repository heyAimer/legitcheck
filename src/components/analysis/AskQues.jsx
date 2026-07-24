"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";

import {
    MessageCircle,
    Send,
    Loader2
} from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const FREE_TRIAL_CHAT_LIMIT = 3;

export default function AskQuestion() {

    const [open,setOpen]=useState(false);
    const [question,setQuestion]=useState("");
    const [loading, setLoading] = useState(false);
    const [chatsLeft, setChatsLeft] = useState(null);
    
    const [messages,setMessages]=useState([
        {
            role:"assistant",
            content: "Hi 👋 I'm LegitCheck AI. Ask me anything about this contract."
        }

    ]);

    const noChatsLeft = chatsLeft !== null && chatsLeft <= 0;

    const askQuestion = async () => {

        if(!question.trim()) return;

        const userQuestion = question;

        setMessages(prev => ([
            ...prev,
            {
                role:"user",
                content:userQuestion
            }
        ]));

        setQuestion("");

        try {
        
            setLoading(true);
            const res=await axios.post(
                `${BASE_URL}/scan/answer`,
                {
                    question:userQuestion
                },
                {
                    withCredentials:true
                }
            );
            setMessages(prev=>([...prev,
                {
                    role:"assistant",
                    content:res.data.response || "Sorry, I couldn't answer that."
                }
            ]));

            if (typeof res.data.chatsLeft === "number") {
                setChatsLeft(res.data.chatsLeft);
            }

        } catch {
            toast.error("Failed to get answer!");
            setMessages(prev => ([...prev,
                {
                role:"assistant",
                content:"Sorry, I couldn't answer that."
                }]));
            
        } finally {
            setLoading(false);
        }
        
    };

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="icon"
                    onClick={()=>setOpen(true)}
                    className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                    <MessageCircle/>
                </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[600px] p-0 gap-0 duration-300

            data-[state=open]:animate-in
            data-[state=closed]:animate-out

            data-[state=open]:fade-in-0
            data-[state=closed]:fade-out-0

            data-[state=open]:zoom-in-95
            data-[state=closed]:zoom-out-95

            data-[state=open]:slide-in-from-bottom-3
            data-[state=closed]:slide-out-to-bottom-3"
            >
                <DialogHeader className="border-b p-5">
                    <DialogTitle>
                        Ask LegitCheck
                    </DialogTitle>

                    {chatsLeft !== null && (
                        <span
                            className={`text-xs font-medium rounded-full px-2.5 py-1 ${
                                noChatsLeft
                                    ? "bg-red-100 text-red-700"
                                    : chatsLeft <= 2
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-neutral-100 text-neutral-600"
                            }`}
                        >
                            {noChatsLeft
                                ? "No questions left"
                                : `${chatsLeft} question${chatsLeft === 1 ? "" : "s"} left`}
                        </span>
                    )}
                </DialogHeader>

                <div className="h-[500px] overflow-y-auto p-5 space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                msg.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`
                                    max-w-[80%]
                                    rounded-xl
                                    px-4
                                    py-3
                                    text-sm
                                    ${
                                        msg.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted border"
                                    }
                                `}
                            >

                                <ReactMarkdown
                                    components={{
                                        p: ({ children }) => (
                                            <p className="mb-2 last:mb-0">
                                                {children}
                                            </p>
                                        ),

                                        ul: ({ children }) => (
                                            <ul className="list-disc pl-5 space-y-1 my-2">
                                                {children}
                                            </ul>
                                        ),

                                        ol: ({ children }) => (
                                            <ol className="list-decimal pl-5 space-y-1 my-2">
                                                {children}
                                            </ol>
                                        ),

                                        li: ({ children }) => (
                                            <li>{children}</li>
                                        ),

                                        strong: ({ children }) => (
                                            <strong className="font-semibold">
                                                {children}
                                            </strong>
                                        ),

                                        h1: ({ children }) => (
                                            <h1 className="text-lg font-bold mb-2">
                                                {children}
                                            </h1>
                                        ),

                                        h2: ({ children }) => (
                                            <h2 className="text-md font-semibold mb-2">
                                                {children}
                                            </h2>
                                        )
                                    }}
                                >
                                    {msg.content}
                                </ReactMarkdown>

                            </div>
                        </div>
                    ))}

                    {
                        loading && (
                            <div className="flex justify-center">
                                <Loader2 className="h-5 w-5 animate-spin"/>
                            </div>
                        )
                    }
                    {noChatsLeft && (
                        <div className="text-center text-xs text-muted-foreground border rounded-lg py-3 px-4 bg-muted/40">
                            You've used all your questions for this contract.
                        </div>
                    )}
                </div>

                <div className="px-5 pb-3 flex flex-wrap gap-2">
                    <Button size="sm" variant="outline"
                        onClick={() => setQuestion(
                            "Why is indemnity risky?"
                        )}
                    >
                        Indemnity
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setQuestion(
                        "Explain this IP clause"
                    )}
                    >
                        IP Clause
                    </Button>

                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setQuestion(
                            "Can I negotiate this?"
                        )}
                    >
                        Negotiate
                    </Button>
                </div>

                <div className=" border-t p-4 flex gap-3 ">
                    <Input value={question}
                        onChange={(e) =>
                            setQuestion(
                                e.target.value
                            )
                        }
                        disabled={loading}
                        placeholder="Ask about this contract..."
                        onKeyDown={(e) => {
                            if (
                                e.key === "Enter"
                                &&
                                !e.shiftKey
                            ) {
                                e.preventDefault();
                                askQuestion();
                            }
                        }}
                    />

                    <Button onClick={askQuestion} disabled={loading || noChatsLeft} size="icon"
                    >
                        <Send />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}