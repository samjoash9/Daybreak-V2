import { useNavigate, useLocation, Link } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import HeaderButton from "../common/HeaderButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useIsMobile } from "../common/use-mobile";

const Header = ({ AuthButtonTitle = "Login" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useCart();

  // helper to check if the link is the current path
  const isActive = (path: string) => location.pathname === path;

  const cartItemCount = getTotalItems();

  const isMobile = useIsMobile();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-10 md:px-16 lg:px-24">
      {isMobile ? (
        <MobileHeader
          isActive={isActive}
          cartItemCount={cartItemCount}
          navigate={navigate}
          AuthButtonTitle={AuthButtonTitle}
        />
      ) : (
        <DesktopHeader
          isActive={isActive}
          cartItemCount={cartItemCount}
          navigate={navigate}
          AuthButtonTitle={AuthButtonTitle}
        />
      )}
    </header>
  );
};

export default Header;

const DesktopHeader = ({
  isActive,
  cartItemCount,
  navigate,
  AuthButtonTitle,
}: {
  isActive: (path: string) => boolean;
  cartItemCount: number;
  navigate: any;
  AuthButtonTitle: string;
}) => {
  return (
    <div className="hidden md:flex w-full items-center justify-between">
      {/* LOGO */}
      <HeaderLogo navigate={navigate} />
      {/* NAVIGATIONS */}
      <nav className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-[#6c3608] text-base md:text-lg items-center justify-end">
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
    </div>
  );
};

const MobileHeader = ({
  isActive,
  cartItemCount,
  navigate,
  AuthButtonTitle,
}: {
  isActive: (path: string) => boolean;
  cartItemCount: number;
  navigate: any;
  AuthButtonTitle: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="md:hidden w-full flex justify-between">
      <HeaderLogo navigate={navigate} />
      <button onClick={() => setIsOpen(!isOpen)}>
        <Menu />
      </button>

      <Sheet open={isOpen} onOpenChange={(sOpen) => setIsOpen(sOpen)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <div
                className="
                        text-[#6c3608]
                        text-2xl
                        font-bold
                        tracking-[-0.5px]
                        font-['League_Spartan',sans-serif]


                    "
              >
                DayBreak Cafe
              </div>
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col gap-5 sm:gap-6 md:gap-8 lg:gap-12 text-[#6c3608] text-base sm:text-2xl md:text-sm lg:text-sm items-center h-full mt-10">
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

const HeaderLogo = ({ navigate }: { navigate: any }) => {
  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img src="/logo.svg" alt="" className="size-12" />
      <div
        className="
                        text-[#6c3608]
                        text-2xl
                        font-bold
                        tracking-[-0.5px]
                        font-['League_Spartan',sans-serif]


                    "
      >
        DayBreak Cafe
      </div>
    </div>
  );
};
