import { Avatar, AvatarFallback, AvatarImage } from "../common/avatar.js";
import { ScrollArea } from "../common/scroll-area.js";
import { Badge } from "../common/badge.js";

interface Message {
    id: string;
    content: string;
    timestamp: string;
    sender: 'customer' | 'admin';
    senderName: string;
    avatar?: string;
}

interface Customer {
    id: string;
    name: string;
    email: string;
    // status: 'online' | 'offline';
    avatar?: string;
}

interface ChatMessagesProps {
    customer: Customer | null;
    messages: Message[];
}

export function ChatMessages({ customer, messages }: ChatMessagesProps) {
    if (!customer) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background">
                <div className="text-center text-muted-foreground">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <h3>Select a conversation</h3>
                    <p>Choose a customer from the list to start chatting</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-background">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Avatar className="w-10 h-10 bg-[#e5c570]">
                            <AvatarImage src={customer.avatar} alt={customer.name} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                {customer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        {/* <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${customer.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                            }`} /> */}
                    </div>
                    <div>
                        <h3>{customer.name}</h3>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                    {/* <Badge variant={customer.status === 'online' ? 'default' : 'secondary'} className="ml-auto">
                        {customer.status}
                    </Badge> */}
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex gap-3 ${message.sender === 'admin' ? 'flex-row-reverse' : 'flex-row'
                                }`}
                        >
                            <Avatar className="w-8 h-8 bg-[#e5c570]">
                                <AvatarImage src={message.avatar} alt={message.senderName} />
                                <AvatarFallback className={`text-xs ${message.sender === 'admin'
                                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                                    : 'bg-[#e5c570] text-muted-foreground'
                                    }`}>
                                    {message.senderName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>

                            <div className={`max-w-xs lg:max-w-md ${message.sender === 'admin' ? 'text-right' : 'text-left'
                                }`}>
                                <div className={`rounded-lg p-3 ${message.sender === 'admin'
                                    ? 'bg-[#512615] text-white'
                                    : 'bg-[#e5c570] text-muted-foreground'
                                    }`}>
                                    <p>{message.content}</p>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}