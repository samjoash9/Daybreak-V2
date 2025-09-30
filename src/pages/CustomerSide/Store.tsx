import Header from "../../components/layout/Header";
import { CoffeeCarousel } from "../../components/layout/CoffeeCarousel";
import { ProductCard } from "../../components/layout/ProductCard";
import ProductDivider from "../../components/layout/ProductDivider";
import TitleHolder from "../../components/common/title-holder"

const iced_coffee = [
    { id: 1, name: "CARAMEL ICED LATTE", price: 39, image: "/Products/caramel_iced_latte.png" },
    { id: 2, name: "FRENCH VANILLA", price: 39, image: "/Products/french_vanilla.png" },
    { id: 3, name: "MATCHA LATTE", price: 39, image: "/Products/matcha_latte.png" },
    { id: 4, name: "SALTED CARAMEL", price: 39, image: "/Products/salted_caramel.png" },
    { id: 5, name: "SPANISH LATTE", price: 39, image: "/Products/spanish_latte.png" },
];

const berry_series = [
    { id: 6, name: "CARAMEL ICED LATTE", price: 39, image: "/Products/caramel_iced_latte.png" },
    { id: 7, name: "FRENCH VANILLA", price: 39, image: "/Products/french_vanilla.png" },
    { id: 8, name: "MATCHA LATTE", price: 39, image: "/Products/matcha_latte.png" },
    { id: 9, name: "SALTED CARAMEL", price: 39, image: "/Products/salted_caramel.png" },
    { id: 10, name: "SPANISH LATTE", price: 39, image: "/Products/spanish_latte.png" },
]

const soda_series = [
    { id: 11, name: "CARAMEL ICED LATTE", price: 39, image: "/Products/caramel_iced_latte.png" },
    { id: 12, name: "FRENCH VANILLA", price: 39, image: "/Products/french_vanilla.png" },
    { id: 13, name: "MATCHA LATTE", price: 39, image: "/Products/matcha_latte.png" },
    { id: 14, name: "SALTED CARAMEL", price: 39, image: "/Products/salted_caramel.png" },
    { id: 15, name: "SPANISH LATTE", price: 39, image: "/Products/spanish_latte.png" },
]

const Store = () => {
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

                <ProductDivider Title="ICED COFFEE" Description="OUR MOST POPULAR ICED COFFEES" Color="#fce7c7" />

                {/* Dynamic Product Cards */}
                <div className="flex justify-center mt-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 px-5 w-full">
                        {iced_coffee.map((product) => (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </div>
                </div>

                <ProductDivider Title="BERRY SERIES" Description="DISCOVER OUR BERRY BEST CREATION" Color="#fce7c7" />

                {/* Dynamic Product Cards */}
                <div className="flex justify-center mt-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 px-5 w-full">
                        {berry_series.map((product) => (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </div>
                </div>

                <ProductDivider Title="SODA SERIES" Description="FIZZ UP YOUR DAY WITH OUR REFRESHING SODAS" Color="#fce7c7" />

                {/* Dynamic Product Cards */}
                <div className="flex justify-center mt-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 px-5 w-full">
                        {soda_series.map((product) => (
                            <ProductCard
                                key={product.id}
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
