import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderButton = ({ ButtonTitle = "Sign Up" }) => {
    const navigate = useNavigate();
    const route = ButtonTitle.toLowerCase() === "sign up" ? "/signup" : "/login";

    const handleClick = () => navigate(route);

    return (
        <button
            onClick={handleClick}
            className="border-2 border-[#6c3608] rounded-full px-[60px] py-1 bg-transparent
                text-[#6c3608] cursor-pointer transition-all duration-300 ease-in-out
                hover:bg-[#6c3608] hover:text-white">
            {ButtonTitle}
        </button>
    );
};

export default HeaderButton;
