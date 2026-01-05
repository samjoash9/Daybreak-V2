import { useState } from "react";
import { Button } from "../common/button.js";
import { Input } from "../common/input.js";
import { Send } from "lucide-react";

interface MessageInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
}

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage(message.trim());
            setMessage("");
        }
    };

    return (
        <div className="p-4 border-t border-border bg-card">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-1 relative">
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={disabled ? "Select a customer to start chatting..." : "Type your message..."}
                        disabled={disabled}
                        className="pr-20 bg-input-background"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={!message.trim() || disabled}
                    variant="coffee"
                >
                    <Send className="w-4 h-4" />
                </Button>
            </form>
        </div>
    );
}