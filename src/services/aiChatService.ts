// AI Chat Service using Google Gemini API (Frontend-only implementation)
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Gemini API Key
const GEMINI_API_KEY = 'AIzaSyDBFDef_RQ_CslIwWkhp3X4Tvh1hcTuGHM';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// FIXED: Use correct model name - try these in order:
// 1. gemini-1.5-flash-latest (most likely to work)
// 2. gemini-1.5-pro-latest
// 3. gemini-pro (fallback)

let model;
try {
  // Try the latest flash model first
  model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 500,
    }
  });
} catch (error) {
  console.log('Falling back to gemini-pro model');
  model = genAI.getGenerativeModel({ model: 'gemini-pro' });
}

// Mock AI responses for coffee shop queries
const getMockAIResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  // Greetings
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! Welcome to DayBreak Cafe! ☕ How can I help you today? Are you looking for our menu, hours, or have a question about our products?";
  }

  // Menu questions
  if (lowerMessage.includes('menu') || lowerMessage.includes('what do you serve') || lowerMessage.includes('products')) {
    return "We offer three amazing series:\n\n🍹 **Iced Coffee Series**: Caramel Iced Latte, French Vanilla, Matcha Latte, Salted Caramel, Spanish Latte\n\n🍓 **Berry Series**: Chocolate Berry, Matcha Berry, Strawberry, Strawberry Milk, White Chocolate Berry\n\n🥤 **Soda Series**: Blue Berry, Green Apple, Passion Fruit, Strawberry, Kiwi\n\nAll items are ₱39! Would you like to know more about any specific drink?";
  }

  // Hours
  if (lowerMessage.includes('hours') || lowerMessage.includes('open') || lowerMessage.includes('time')) {
    return "We're open:\n• Monday - Friday: 8:00 AM - 6:00 PM\n• Saturday - Sunday: 9:00 AM - 5:00 PM\n\nYou can also order online anytime through our store page!";
  }

  // Location
  if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('address')) {
    return "Our headquarters is located at:\n📍 123 Coffee Lane, Bean City, BC 12345\n\nYou can also visit our Locations page to find all our branches!";
  }

  // Price
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
    return "All our drinks are priced at ₱39! We also offer add-ons:\n• Espresso: ₱10\n• Sinker: ₱10\n• Berries: ₱10\n• Coffee Jelly: ₱10\n\nCheck out our store page to see all options!";
  }

  // Delivery
  if (lowerMessage.includes('delivery') || lowerMessage.includes('deliver') || lowerMessage.includes('ship')) {
    return "Yes! We offer both pickup and delivery options. When you checkout, you can choose:\n\n🚗 **Delivery**: We'll deliver to your address (free shipping!)\n🏪 **Pickup**: Come pick up your order at our store\n\nJust add items to your cart and proceed to checkout!";
  }

  // Order status
  if (lowerMessage.includes('order') && (lowerMessage.includes('status') || lowerMessage.includes('track'))) {
    return "You can track your orders on the 'My Checkout' page! You'll see all your orders with their current status:\n• To Pay\n• Preparing\n• Ready\n• Completed\n• Cancelled\n\nJust click on 'My Checkout' in the navigation bar!";
  }

  // Recommendations
  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('popular') || lowerMessage.includes('best')) {
    return "Our most popular drinks are:\n\n⭐ **Caramel Iced Latte** - A refreshing blend of espresso and caramel\n⭐ **Matcha Latte** - Premium matcha green tea with steamed milk\n⭐ **Strawberry Milk** - A nostalgic favorite\n⭐ **Spanish Latte** - Rich espresso with condensed milk\n\nWould you like to know more about any of these?";
  }

  // Contact
  if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
    return "You can reach us:\n\n📞 Phone: (555) 123-4567\n📧 Email: hello@daybreakcafe.com\n💬 Live Chat: Right here!\n\nWe're here to help! 😊";
  }

  // Thank you
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return "You're very welcome! 😊 If you have any other questions, feel free to ask. Enjoy your coffee at DayBreak Cafe!";
  }

  // Default response
  return "That's a great question! At DayBreak Cafe, we're passionate about serving quality coffee and drinks. Could you tell me more about what you're looking for? I can help you with:\n\n• Our menu and products\n• Store hours and locations\n• Placing an order\n• Order tracking\n• General inquiries\n\nWhat would you like to know?";
};

// Send message to Gemini AI
export const sendMessageToAI = async (messages: ChatMessage[]): Promise<string> => {
  try {
    // Build context for Gemini
    const systemPrompt = `You are a helpful customer service assistant for DayBreak Cafe, a coffee shop. 
You should be friendly, professional, and helpful. You can answer questions about:
- Our menu items (Iced Coffee Series, Berry Series, Soda Series)
- Store hours and locations
- Pricing (all drinks are ₱39)
- Delivery and pickup options
- Order tracking
- Product recommendations
- General inquiries

These are the products:
ICED COFEE SERIES:
1. Spanish Latte
2.  French Vanilla
3. Salted Caramel
4. Caramel Iced Latte
5. Matcha Latte
BERRY SERRIES:
1. White Chocolate Berry
2. Chocolate Berry
3. Starwberry Milk
4. Matcha Berry
5. Cookies & Cream Berry
SODA SERIES:
1. Blue Berry
2. Passion Fruit
3. Strawberry
4. Green Apple
5. Kiwi

Keep responses concise, friendly, and helpful. Use emojis sparingly.

`;

    // Get conversation history (last 10 messages for context)
    const recentMessages = messages.slice(-10);
    const conversationHistory = recentMessages
      .map((msg) => `${msg.role === 'user' ? 'Customer' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // Combine system prompt with conversation history
    const fullPrompt = `${systemPrompt}\n\nConversation History:\n${conversationHistory}\n\nCustomer: ${lastUserMessage}\nAssistant:`;

    // Call Gemini API
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return text || getMockAIResponse(lastUserMessage);
  } catch (error) {
    console.error('Gemini API error:', error);
    // Fallback to mock responses if API fails
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    return getMockAIResponse(lastUserMessage);
  }
};

// Alternative: Use Hugging Face Inference API (free, no API key needed for some models)
export const sendMessageToHuggingFace = async (messages: ChatMessage[]): Promise<string> => {
  try {
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // Using Hugging Face Inference API (free tier)
    const response = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {
            past_user_inputs: messages.filter(m => m.role === 'user').slice(-3).map(m => m.content),
            generated_responses: messages.filter(m => m.role === 'assistant').slice(-3).map(m => m.content),
            text: lastUserMessage,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.generated_text || getMockAIResponse(lastUserMessage);
  } catch (error) {
    console.error('AI API error:', error);
    // Fallback to mock responses
    return getMockAIResponse(messages[messages.length - 1]?.content || '');
  }
};