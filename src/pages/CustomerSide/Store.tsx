import Header from "../../components/layout/Header";
import { CoffeeCarousel } from "../../components/layout/CoffeeCarousel";
import { ProductCard } from "../../components/layout/ProductCard.js";
import ProductDivider from "../../components/layout/ProductDivider";
import TitleHolder from "../../components/common/title-holder"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const iced_coffee = [
    { id: 1, name: "CARAMEL ICED LATTE", price: 39, image: "/Products/caramel_iced_latte.png" },
    { id: 2, name: "FRENCH VANILLA", price: 39, image: "/Products/french_vanilla.png" },
    { id: 3, name: "MATCHA LATTE", price: 39, image: "/Products/matcha_latte.png" },
    { id: 4, name: "SALTED CARAMEL", price: 39, image: "/Products/salted_caramel.png" },
    { id: 5, name: "SPANISH LATTE", price: 39, image: "/Products/spanish_latte.png" },
];

const berry_series = [
    { id: 6, name: "CHOCOLATE BERRY", price: 39, image: "/Products/chocolate_berry.png" },
    { id: 7, name: "MATCHA BERRY", price: 39, image: "/Products/matcha_berry.png" },
    { id: 8, name: "STRAWBERRY", price: 39, image: "/Products/strawberry.png" },
    { id: 9, name: "STRAWBERRY MILK", price: 39, image: "/Products/strawberry_milk.png" },
    { id: 10, name: "WHITE CHOCOLATE BERRY", price: 39, image: "/Products/white_chocolate_berry.png" },
]

const soda_series = [
    { id: 11, name: "BLUE BERRY", price: 39, image: "/Products/blue_berry.png" },
    { id: 12, name: "GREEN APPLE", price: 39, image: "/Products/green_apple.png" },
    { id: 13, name: "PASSION FRUIT", price: 39, image: "/Products/passion_fruit.png" },
    { id: 14, name: "STRAWBERRY", price: 39, image: "/Products/strawberry.png" },
    { id: 15, name: "KIWI", price: 39, image: "/Products/kiwi.png" },
]

const Store = () => {
    const location = useLocation();

    // Handle scrolling to section when hash is present in URL
    useEffect(() => {
        if (location.hash) {
            const sectionId = location.hash.substring(1); // Remove the # symbol
            const element = document.getElementById(sectionId);
            if (element) {
                // Small delay to ensure page is rendered
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        }
    }, [location.hash]);

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
                <CoffeeCarousel />

                <TitleHolder
                    Title="DAYBREAK MENU"
                    Description="ADD ONS: 10PHP ESPRESSO , SINKER , BERRIES , COFFEE JELLY"
                    TitleSize="text-9xl"
                    DescriptionSize="text-2xl"
                    Bold={true}
                />

                <div id="iced-coffee">
                    <ProductDivider Title="ICED COFFEE" Description="OUR MOST POPULAR ICED COFFEES" Color="#fce7c7" />
                </div>

                {/* Dynamic Product Cards */}
                <div className="flex justify-center mt-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 px-5 w-full">
                        {iced_coffee.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </div>
                </div>

                <div id="berry-series">
                    <ProductDivider Title="BERRY SERIES" Description="DISCOVER OUR BERRY BEST CREATION" Color="#fce7c7" />
                </div>

                {/* Dynamic Product Cards */}
                <div className="flex justify-center mt-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 px-5 w-full">
                        {berry_series.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </div>
                </div>

                <div id="soda-series">
                    <ProductDivider Title="SODA SERIES" Description="FIZZ UP YOUR DAY WITH OUR REFRESHING SODAS" Color="#fce7c7" />
                </div>

                {/* Dynamic Product Cards */}
                <div className="flex justify-center mt-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 px-5 w-full">
                        {soda_series.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Store;
