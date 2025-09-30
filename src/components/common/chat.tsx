import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "./button";

const Chat = () => {
    const [chatOpen, setChatOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {chatOpen ? (
                <div className="w-90 h-110 bg-white rounded-2xl shadow-xl flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2 bg-[#512615] text-white rounded-t-2xl">
                        <span className="font-semibold">Chat with us</span>
                        <button onClick={() => setChatOpen(false)} className="text-sm">
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto text-left text-sm text-gray-700">
                        <p className="mb-2">
                            <strong>Bot:</strong> Hi 👋 How can I help you today?
                        </p>
                    </div>

                    {/* Input */}
                    <div className="p-2 border-t flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none"
                        />
                        <Button className="" variant="coffee">
                            Send
                        </Button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setChatOpen(true)}
                    className="bg-[#512615] hover:bg-[#e5c570] text-white p-4 rounded-full shadow-lg flex items-center justify-center"
                >
                    <MessageCircle className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default Chat;
