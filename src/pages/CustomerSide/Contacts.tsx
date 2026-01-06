import { useState } from "react";
import Header from "../../components/layout/Header";
import TitleHolder from "../../components/common/title-holder.js";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/common/card.js";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import AIChat from "../../components/common/AIChat.js";
import { Button } from "../../components/common/button.js";

const Contacts = () => {
    const [isChatOpen, setIsChatOpen] = useState(false); // default closed

    return (
        <div className="h-screen w-full overflow-hidden relative">
            <div
                className="h-full w-full overflow-auto pr-5"
                style={{ scrollbarWidth: "none" }}
            >
                {/* Hide scrollbar in Chromium browsers */}
                <style>
                    {`
                        div::-webkit-scrollbar {
                          width: 0;
                          height: 0;
                          background: transparent;
                        }
                    `}
                </style>

                <Header />

                <div className="min-h-screen flex flex-col items-center justify-start text-center px-4">
                    <TitleHolder
                        Title="Contact Us"
                        Description="We'd love to hear from you! Reach out with questions, feedback, or just to say hello."
                        Color="black"
                        TitleSize="text-4xl"
                        DescriptionSize="text-xl"
                    />

                    {/* Contact Cards Grid */}
                    <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 justify-center">
                        {/* Phone */}
                        <Card className="h-full w-full max-w-md mx-auto bg-white border-0 drop-shadow-md shadow-lg p-6 md:p-8">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center space-x-3 text-xl">
                                    <Phone className="w-6 h-6 text-[#6c3608]" />
                                    <span>Phone</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-lg md:text-xl">General: (555) 123-4567</p>
                                <p className="text-sm md:text-base text-gray-600">
                                    Customer Service: (555) 987-6543
                                </p>
                                <p className="text-sm md:text-base text-gray-600 mt-2">
                                    Available Mon-Fri, 8 AM - 6 PM
                                </p>
                            </CardContent>
                        </Card>

                        {/* Email */}
                        <Card className="h-full w-full max-w-md mx-auto bg-white border-0 drop-shadow-md shadow-lg p-6 md:p-8">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center space-x-3 text-xl">
                                    <Mail className="w-6 h-6 text-[#6c3608]" />
                                    <span>Email</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-lg md:text-xl">hello@daybreakcafe.com</p>
                                <p className="text-sm md:text-base text-gray-600">support@daybreakcafe.com</p>
                                <p className="text-sm md:text-base text-gray-600 mt-2">
                                    We respond within 24 hours
                                </p>
                            </CardContent>
                        </Card>

                        {/* Headquarters */}
                        <Card className="h-full w-full max-w-md mx-auto bg-white border-0 drop-shadow-md shadow-lg p-6 md:p-8">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center space-x-3 text-xl">
                                    <MapPin className="w-6 h-6 text-[#6c3608]" />
                                    <span>Headquarters</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-lg md:text-xl">123 Coffee Lane</p>
                                <p className="text-sm md:text-base text-gray-600">Bean City, BC 12345</p>
                                <p className="text-sm md:text-base text-gray-600 mt-2">
                                    Visit us Mon-Fri, 9 AM - 5 PM
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Live Chat Card Below */}
                    <div className="mt-12 flex justify-center">
                        <Card className="w-96 bg-white border-0 drop-shadow-lg shadow-lg p-6 text-center">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center space-x-3 text-xl">
                                    <MessageCircle className="w-6 h-6 text-[#6c3608]" />
                                    <span>Live Chat</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <p className="text-sm text-gray-600 mb-4">
                                    Need instant help? Start a chat with us.
                                </p>
                                <Button
                                    onClick={() => setIsChatOpen(true)}
                                    variant="coffee"
                                    className="w-full"
                                >
                                    Chat with us
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* AI-Powered Chat at Bottom Right */}
            <AIChat chatOpen={isChatOpen} setChatOpen={setIsChatOpen} />
        </div>
    );
};

export default Contacts;
