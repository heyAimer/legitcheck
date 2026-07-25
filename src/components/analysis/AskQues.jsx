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
const MAX_QUESTION_LENGTH = 300;

export default function AskQuestion({chatsLeft, setChatsLeft}) {

    const [open,setOpen]=useState(false);
    const [question,setQuestion]=useState("");
    const [loading, setLoading] = useState(false);
    
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hi 👋 I'm LegitCheck AI. Ask me anything about this contract."
        }
    ]);

    const noChatsLeft = typeof chatsLeft === "number" && chatsLeft <= 0;

    const askQuestion = async () => {
        const trimmed = question.trim();
        if (!trimmed) return;

        if (trimmed.length > MAX_QUESTION_LENGTH) {
            toast.error(`Please keep your question under ${MAX_QUESTION_LENGTH} characters.`);
        return;
        }
        
        const userQuestion = trimmed;
        
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

            if (typeof res.data.chatsLeft === "number" && setChatsLeft) {
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

                   {typeof chatsLeft === "number" && (
                        <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border bg-muted/40 px-3 py-2">
                            <div className="flex items-center gap-2">
                            <span
                                className={`h-2 w-2 rounded-full ${
                                noChatsLeft
                                    ? "bg-red-500"
                                    : chatsLeft <= 2
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                                }`}
                            />

                            <span className="text-xs font-medium text-muted-foreground">
                                Chat questions
                            </span>
                            </div>

                            <span
                            className={`text-xs font-semibold ${
                                noChatsLeft
                                ? "text-red-700"
                                : chatsLeft <= 2
                                ? "text-amber-700"
                                : "text-emerald-700"
                            }`}
                            >
                            {noChatsLeft
                                ? "None left"
                                : `${chatsLeft} left`}
                            </span>
                        </div>
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
                        disabled={noChatsLeft} 
                    >
                        Indemnity
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setQuestion(
                        "Explain this IP clause"
                    )}
                        disabled={noChatsLeft} 
                    >
                        IP Clause
                    </Button>

                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setQuestion(
                            "Can I negotiate this?"
                        )}
                        disabled={noChatsLeft} 
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
                        disabled={loading || noChatsLeft}
                        maxLength={MAX_QUESTION_LENGTH}
                        placeholder={
                            noChatsLeft ? "No questions left for this contract" : "Ask about this contract..."
                        }
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

                    {!noChatsLeft && (
                        <div className="flex justify-end">
                            <div
                            className="relative flex h-8 w-8 items-center justify-center rounded-full"
                            style={{
                                background: `conic-gradient(${
                                question.length >= MAX_QUESTION_LENGTH
                                    ? "#ef4444"
                                    : question.length >= MAX_QUESTION_LENGTH * 0.8
                                    ? "#f59e0b"
                                    : "#22c55e"
                                } ${(question.length / MAX_QUESTION_LENGTH) * 360}deg, #e5e7eb 0deg)`,
                            }}
                            >
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-background">
                                <span
                                className={`text-[10px] font-semibold ${
                                    question.length >= MAX_QUESTION_LENGTH
                                    ? "text-red-600"
                                    : question.length >= MAX_QUESTION_LENGTH * 0.8
                                    ? "text-amber-600"
                                    : "text-muted-foreground"
                                }`}
                                >
                                {MAX_QUESTION_LENGTH - question.length}
                                </span>
                            </div>
                            </div>
                        </div>
                        )}
                    
                    <Button onClick={askQuestion} disabled={loading || noChatsLeft || !question.trim()} size="icon" className="flex shrink-0 pr-[1px] pt-[1px]"
                    >
                        <Send />
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}