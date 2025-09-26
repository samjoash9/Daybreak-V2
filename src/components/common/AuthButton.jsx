import React from "react";

const AuthButton = ({ ButtonLabel = "Login" }) => {
    return (
        <div>
            <button
                className="
                    inline-block 
                    w-full 
                    px-[60px] py-2 
                    rounded-full 
                    bg-[#512615] 
                    text-white 
                    font-['League_Spartan',Arial,sans-serif] 
                    font-bold 
                    text-[1.6rem] 
                    text-center 
                    cursor-pointer 
                    transition-colors 
                    duration-300 
                    ease-in-out 
                    hover:bg-[#e5c570]
                "
            >
                {ButtonLabel}
            </button>
        </div>
    );
};

export default AuthButton;
