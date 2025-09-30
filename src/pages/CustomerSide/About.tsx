import Header from '../../components/layout/Header'
import { Card, CardHeader, CardTitle, CardContent } from "../../components/common/card";
import { Award, Coffee, Users } from 'lucide-react'

const About = () => {

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

                <div className="min-h-screen py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">About DayBreak Cafe</h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Since 2018, we've been brewing exceptional coffee and creating memorable experiences for our community.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 mb-16">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
                                <div className="space-y-4 text-gray-600">
                                    <p>
                                        DayBreak Cafe began as a simple dream: to create a place where exceptional coffee meets genuine community.
                                        Founded by coffee enthusiasts Sarah and Mike Chen, we started with a single location and an unwavering
                                        commitment to quality.
                                    </p>
                                    <p>
                                        What began as a local coffee shop has grown into a beloved chain, but our core values remain unchanged.
                                        We source our beans directly from farmers, ensuring fair trade and sustainable practices while delivering
                                        the rich, complex flavors that coffee lovers crave.
                                    </p>
                                    <p>
                                        Every cup we serve is crafted with care by our trained baristas, who are passionate about the art and
                                        science of coffee. We believe that great coffee is more than just a beverage—it's a daily ritual that
                                        brings people together.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-8 shadow-lg drop-shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Our Mission</h3>
                                <p className="text-gray-600 mb-6">
                                    To provide exceptional coffee experiences that energize communities and inspire connections,
                                    one cup at a time.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-[#512615]">7</div>
                                        <div className="text-sm text-gray-600">Years in Business</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-[#512615]">15+</div>
                                        <div className="text-sm text-gray-600">Coffee Origins</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-[#512615]">50K+</div>
                                        <div className="text-sm text-gray-600">Happy Customers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-[#512615]">3</div>
                                        <div className="text-sm text-gray-600">Locations</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <Card className="text-center bg-white border-0 drop-shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
                                <CardHeader>
                                    <Coffee className="w-12 h-12 text-[#512615] mx-auto mb-4" />
                                    <CardTitle>Quality Coffee</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        We source premium beans from sustainable farms and roast them to perfection for the ultimate coffee experience.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="text-center bg-white border-0 drop-shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
                                <CardHeader>
                                    <Users className="w-12 h-12 text-[#512615] mx-auto mb-4" />
                                    <CardTitle>Community Focus</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        More than just a coffee shop, we're a gathering place where neighbors become friends and ideas come to life.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="text-center bg-white border-0 drop-shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
                                <CardHeader>
                                    <Award className="w-12 h-12 text-[#512615] mx-auto mb-4" />
                                    <CardTitle>Award Winning</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Recognized by local and national publications for our exceptional coffee and outstanding customer service.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;