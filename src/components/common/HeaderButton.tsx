import { useNavigate } from "react-router-dom";
import { cn } from "./utils";
import type { ReactNode } from "react";

const HeaderButton = ({
  ButtonTitle = "Sign Up",
  className,
  children,
}: {
  ButtonTitle: string;
  className?: string;
  children?: ReactNode;
}) => {
  const navigate = useNavigate();
  const route = ButtonTitle.toLowerCase() === "sign up" ? "/signup" : "/login";

  const handleClick = () => navigate(route);

  return (
    <button
      onClick={handleClick}
      className={cn(
        "border-2 border-[#6c3608] rounded-full px-[60px] py-1 bg-transparent text-[#6c3608] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#6c3608] hover:text-white",
        className
      )}
    >
      {children ? children : ButtonTitle}
    </button>
  );
};

export default HeaderButton;
