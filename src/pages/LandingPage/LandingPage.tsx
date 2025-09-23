import React from "react";
import Header from "../../components/layout/Header/Header";
import { ArrowUpRight } from "lucide-react";
import "./LandingPage.css";
import BlurText from "../../components/motions/BlurText";
import SplitText from '../../components/motions/SplitText'

const LandingPage: React.FC = () => {
    React.useEffect(() => {
        document.body.classList.add("landing-page");
        return () => document.body.classList.remove("landing-page");
    }, []);

    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };

    return (
        <>
            <Header />
            <main className="landing-wrapper flex flex-col md:flex-row items-center justify-center gap-20 px-8 md:px-24 pt-8 pb-16">

                {/* Left: single hero image (coffee cups + price) - Made bigger */}
                <div className="group relative mb-8 md:mb-0">
                    <img
                        src="pair_coffee.svg"
                        alt="Two cups of coffee with P39 price badge"
                        className="w-[40rem] max-w-full drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Right: text & button - Made bigger */}
                <div className="max-w-2xl text-center md:text-left space-y-8">

                    <SplitText
                        text="Enjoy Your Morning Coffee"
                        className="text-8xl md:text-8xl text-[#512615] font-bold leading-tight"
                        delay={100}
                        duration={0.8}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign="left"
                        onLetterAnimationComplete={handleAnimationComplete}
                    />

                    <p className="text-[#af8561] text-lg">
                        Boost your productivity and build your mood with a
                        cup of coffee in the morning, 100% natural from garden.
                    </p>

                    <button className="bg-[#512615] hover:scale-105 transition-transform text-white text-2xl rounded-full px-10 py-5 flex items-center justify-center gap-3">
                        Order Now
                        <ArrowUpRight
                            className="bg-white rounded-full text-[#512615]"
                            size={32}
                        />
                    </button>
                </div>
            </main>
        </>
    );
};

export default LandingPage;