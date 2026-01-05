import { useState } from "react";
import { CustomerList } from "../../components/layout/CustomerList.js";
import { ChatMessages } from "../../components/layout/ChatMessages.js";
import { MessageInput } from "../../components/layout/MessageInput.js";

interface Customer {
    id: string;
    name: string;
    email: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    avatar?: string;
    status: 'online' | 'offline';
}

interface Message {
    id: string;
    content: string;
    timestamp: string;
    sender: 'customer' | 'admin';
    senderName: string;
    avatar?: string;
}

// Mock data for demo
const mockCustomers: Customer[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@email.com',
        lastMessage: 'Is my latte order ready for pickup?',
        timestamp: '2 min ago',
        unreadCount: 2,
        status: 'online'
    },
    {
        id: '2',
        name: 'Mike Chen',
        email: 'mike@email.com',
        lastMessage: 'Thank you for the quick service!',
        timestamp: '15 min ago',
        unreadCount: 0,
        status: 'online'
    },
    {
        id: '3',
        name: 'Emma Davis',
        email: 'emma@email.com',
        lastMessage: 'Do you have any vegan pastries available?',
        timestamp: '1 hour ago',
        unreadCount: 1,
        status: 'offline'
    },
    {
        id: '4',
        name: 'James Wilson',
        email: 'james@email.com',
        lastMessage: 'Can I get extra foam on my cappuccino?',
        timestamp: '2 hours ago',
        unreadCount: 1,
        status: 'offline'
    }
];

const mockMessages: Record<string, Message[]> = {
    '1': [
        {
            id: '1',
            content: 'Hi! I placed an order for a vanilla latte about 10 minutes ago. Is it ready for pickup?',
            timestamp: '10:45 AM',
            sender: 'customer',
            senderName: 'Sarah Johnson'
        },
        {
            id: '2',
            content: 'Hi Sarah! Let me check on your order for you. What name was it placed under?',
            timestamp: '10:46 AM',
            sender: 'admin',
            senderName: 'Coffee Admin'
        },
        {
            id: '3',
            content: 'It should be under Sarah Johnson. Order number #1234.',
            timestamp: '10:47 AM',
            sender: 'customer',
            senderName: 'Sarah Johnson'
        },
        {
            id: '4',
            content: 'Perfect! I can see your order here. Your vanilla latte is ready for pickup at the counter!',
            timestamp: '10:48 AM',
            sender: 'admin',
            senderName: 'Coffee Admin'
        },
        {
            id: '5',
            content: 'Is my latte order ready for pickup?',
            timestamp: '10:50 AM',
            sender: 'customer',
            senderName: 'Sarah Johnson'
        }
    ],
    '2': [
        {
            id: '1',
            content: 'Just wanted to say thanks for the amazing service today! The barista was super friendly.',
            timestamp: '9:30 AM',
            sender: 'customer',
            senderName: 'Mike Chen'
        },
        {
            id: '2',
            content: 'Thank you so much for the kind words, Mike! We really appreciate your feedback. Hope to see you again soon!',
            timestamp: '9:35 AM',
            sender: 'admin',
            senderName: 'Coffee Admin'
        },
        {
            id: '3',
            content: 'Thank you for the quick service!',
            timestamp: '9:40 AM',
            sender: 'customer',
            senderName: 'Mike Chen'
        }
    ],
    '3': [
        {
            id: '1',
            content: 'Hi there! Do you have any vegan pastries available today?',
            timestamp: '8:15 AM',
            sender: 'customer',
            senderName: 'Emma Davis'
        }
    ],
    '4': [
        {
            id: '1',
            content: 'hehe',
            timestamp: '8:16 AM',
            sender: 'customer',
            senderName: 'Silver WOW'
        }
    ]
};

const Messages = () => {
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
    const [customers, setCustomers] = useState(mockCustomers);
    const [messages, setMessages] = useState(mockMessages);

    const selectedCustomer = customers.find(c => c.id === selectedCustomerId) || null;
    const currentMessages = selectedCustomerId ? messages[selectedCustomerId] || [] : [];

    const handleSelectCustomer = (customerId: string) => {
        setSelectedCustomerId(customerId);

        // Mark messages as read
        setCustomers(prev =>
            prev.map(customer =>
                customer.id === customerId
                    ? { ...customer, unreadCount: 0 }
                    : customer
            )
        );
    };

    const handleSendMessage = (content: string) => {
        if (!selectedCustomerId) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            content,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: 'admin',
            senderName: 'Coffee Admin'
        };

        setMessages(prev => ({
            ...prev,
            [selectedCustomerId]: [...(prev[selectedCustomerId] || []), newMessage]
        }));

        // Update last message in customer list
        setCustomers(prev =>
            prev.map(customer =>
                customer.id === selectedCustomerId
                    ? {
                        ...customer,
                        lastMessage: content,
                        timestamp: 'Just now'
                    }
                    : customer
            )
        );
    };

    return (
        <div className="h-screen flex bg-background">
            <CustomerList
                customers={customers}
                selectedCustomerId={selectedCustomerId}
                onSelectCustomer={handleSelectCustomer}
            />

            <div className="flex-1 flex flex-col">
                <ChatMessages
                    customer={selectedCustomer}
                    messages={currentMessages}
                />

                <MessageInput
                    onSendMessage={handleSendMessage}
                    disabled={!selectedCustomerId}
                />
            </div>
        </div>
    );
}

export default Messages;