import Header from "../../components/layout/Header";
import TitleHolder from "../../components/common/title-holder";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/common/card";
import { Button } from "../../components/common/button";
import { MapPin, Clock, Phone } from "lucide-react";

const locations = [
    {
        name: "Downtown Location",
        address: "123 Main Street, Downtown, City 12345",
        hours: "Mon-Fri: 6:00 AM - 9:00 PM, Sat-Sun: 7:00 AM - 10:00 PM",
        phone: "(555) 123-4567",
    },
    {
        name: "University Campus",
        address: "456 College Ave, University District, City 12346",
        hours: "Mon-Sun: 7:00 AM - 11:00 PM",
        phone: "(555) 234-5678",
    },
    {
        name: "Suburban Mall",
        address: "789 Shopping Center Blvd, Suburbs, City 12347",
        hours: "Mon-Thu: 8:00 AM - 8:00 PM, Fri-Sun: 8:00 AM - 9:00 PM",
        phone: "(555) 345-6789",
    },
];

const Locations = () => {
    return (
        <div className="h-screen w-full overflow-hidden">
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
                        Title="Our Locations"
                        Description="Find your nearest DayBreak Cafe and experience the perfect blend of quality coffee and cozy atmosphere."
                        Color="black"
                        TitleSize="text-4xl"
                        DescriptionSize="text-xl"

                    />

                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
                        {locations.map((location, index) => (
                            <Card
                                key={index}
                                className="h-full w-full max-w-sm mx-auto bg-white border-0 drop-shadow-[0_-4px_6px_rgba(0,0,0,0.1)] shadow-lg"
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-center space-x-2">
                                        <MapPin className="w-5 h-5 text-[#3a2a18]" />
                                        <span>{location.name}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start justify-center space-x-2 text-left">
                                        <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                                        <p className="text-sm text-gray-600">{location.address}</p>
                                    </div>
                                    <div className="flex items-start justify-center space-x-2 text-left">
                                        <Clock className="w-4 h-4 text-gray-500 mt-1" />
                                        <p className="text-sm text-gray-600">{location.hours}</p>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <Phone className="w-4 h-4 text-gray-500" />
                                        <p className="text-sm text-gray-600">{location.phone}</p>
                                    </div>
                                    <Button className="w-full" variant="coffee">
                                        Get Directions
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-16 bg-white rounded-lg p-8 max-w-2xl w-full drop-shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't Find Us?</h2>
                            <p className="text-gray-600">
                                We're always expanding! Contact us if you'd like to see a DayBreak
                                Cafe in your neighborhood.
                            </p>
                        </div>
                        <div>
                            <Button className="w-full" size="lg" variant="coffee">
                                Request New Location
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Locations;