import React from "react";
import HeaderButton from "../common/HeaderButton";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ AuthButtonTitle = "Login" }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // helper to check if the link is the current path
    const isActive = (path) => location.pathname === path;

    return (
        <header className="flex items-center h-24 justify-between px-32">
            {/* LOGO */}
            <div
                className="flex items-center cursor-pointer"
                onClick={() => navigate("/")}
            >
                <img src="/logo.svg" alt="" className="size-14" />
                <div
                    className="
                        text-[#6c3608]
                        text-4xl
                        font-bold
                        tracking-[-0.5px]
                        font-['League_Spartan',sans-serif]
                    "
                >
                    DayBreak Cafe
                </div>
            </div>

            {/* NAVIGATIONS */}
            <nav className="flex gap-12 text-[#6c3608] text-2xl items-center">
                <a
                    href="/store"
                    className={`${isActive("/store") ? "underline underline-offset-4 text-[#e5c570]" : ""}`}
                >
                    Store
                </a>
                <a
                    href="/locations"
                    className={`${isActive("/locations") ? "underline underline-offset-4 text-[#e5c570]" : ""}`}
                >
                    Locations
                </a>
                <a
                    href="/contacts"
                    className={`${isActive("/contacts") ? "underline underline-offset-4 text-[#e5c570]" : ""}`}
                >
                    Contact
                </a>
                <a
                    href="/about"
                    className={`${isActive("/about") ? "underline underline-offset-4 text-[#e5c570]" : ""}`}
                >
                    About
                </a>

                {/* Auth button */}
                <HeaderButton ButtonTitle={AuthButtonTitle} />
            </nav>
        </header>
    );
};

export default Header;
