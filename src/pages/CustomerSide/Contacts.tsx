import Header from "../../components/layout/Header";
import TitleHolder from "../../components/common/title-holder";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/common/card";
import { Phone, Mail, MapPin } from "lucide-react";
import Chat from "../../components/common/chat";

const Contacts = () => {

    return (
        <div className="h-screen w-full overflow-hidden relative">
            <div
                className="h-full w-full overflow-auto pr-5"
                style={{ scrollbarWidth: "none" }} // Firefox
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

                    {/* Bigger Cards */}
                    <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 justify-center">
                        {/* Phone */}
                        <Card className="h-full w-full max-w-md mx-auto bg-white border-0 drop-shadow-[0_-4px_6px_rgba(0,0,0,0.1)] shadow-lg p-6 md:p-8">
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
                        <Card className="h-full w-full max-w-md mx-auto bg-white border-0 drop-shadow-[0_-4px_6px_rgba(0,0,0,0.1)] shadow-lg p-6 md:p-8">
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
                        <Card className="h-full w-full max-w-md mx-auto bg-white border-0 drop-shadow-[0_-4px_6px_rgba(0,0,0,0.1)] shadow-lg p-6 md:p-8">
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
                </div>
            </div>

            {/* Floating Chat */}
            <Chat />

        </div>
    );
};

export default Contacts;
