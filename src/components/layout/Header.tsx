import { useNavigate, useLocation, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import HeaderButton from "../common/HeaderButton";

const Header = ({ AuthButtonTitle = "Login" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useCart();

  // helper to check if the link is the current path
  const isActive = (path: string) => location.pathname === path;

  const cartItemCount = getTotalItems();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-10 md:px-16 lg:px-24">
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
      <nav className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-[#6c3608] text-base sm:text-lg md:text-xl lg:text-2xl items-center justify-end">
        <a
          href="/store"
          className={`${
            isActive("/store")
              ? "underline underline-offset-4 text-[#e5c570]"
              : ""
          }`}
        >
          Store
        </a>
        <a
          href="/locations"
          className={`${
            isActive("/locations")
              ? "underline underline-offset-4 text-[#e5c570]"
              : ""
          }`}
        >
          Locations
        </a>
        <a
          href="/contacts"
          className={`${
            isActive("/contacts")
              ? "underline underline-offset-4 text-[#e5c570]"
              : ""
          }`}
        >
          Contact
        </a>
        <a
          href="/about"
          className={`${
            isActive("/about")
              ? "underline underline-offset-4 text-[#e5c570]"
              : ""
          }`}
        >
          About
        </a>
        <a
          href="/my-checkout"
          className={`${
            isActive("/my-checkout")
              ? "underline underline-offset-4 text-[#e5c570]"
              : ""
          }`}
        >
          My Checkout
        </a>

        {/* Shopping Cart Icon */}
        <Link
          to="/cart"
          className="relative flex items-center justify-center p-2 hover:bg-[#e5c570] rounded-full transition-colors"
          aria-label="Shopping Cart"
        >
          <ShoppingCart className="text-[#6c3608]" size={28} />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#e5c570] text-[#3a2a18] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold border-2 border-[#6c3608]">
              {cartItemCount > 99 ? "99+" : cartItemCount}
            </span>
          )}
        </Link>

        {/* Auth button */}
        <HeaderButton ButtonTitle={AuthButtonTitle} />
      </nav>
    </header>
  );
};

export default Header;
