import React from "react";
import { useNavigate } from "react-router-dom";
import './HeaderButton.css';

const HeaderButton = ({ ButtonTitle = "Sign Up" }) => {
    const navigate = useNavigate();

    const route = ButtonTitle.toLowerCase() === "sign up" ? "/signup" : "/login";

    const handleClick = () => {
        navigate(route);
    };

    return (
        <button className="header-button" onClick={handleClick}>
            {ButtonTitle}
        </button>
    );
}

export default HeaderButton;
