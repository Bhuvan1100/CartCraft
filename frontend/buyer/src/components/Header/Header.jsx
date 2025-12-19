import React, { useState } from "react";
import {
    MagnifyingGlassIcon,
    UserIcon,
    ShoppingCartIcon,
    MoonIcon,
    SunIcon,
} from "@heroicons/react/24/outline";
import useThemeStore from "../../Stores/ThemeStore";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";

/* ===== DO NOT CHANGED (AS REQUESTED) ===== */
const IconButtonDark = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="relative text-white group transition-colors"
    >
        {children}
        <span className="absolute left-0 -bottom-1 h-px w-[70%] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </button>
);
/* ======================================== */

const IconButtonLight = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="relative text-gray-900 group transition-colors"
    >
        {children}
        <span className="absolute left-0 -bottom-1 h-px w-[70%] bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </button>
);

const NavLinkDark = ({ to, children }) => (
    <Link
        to={to}
        className="relative text-white font-bold group transition-colors"
    >
        {children}
        <span className="absolute left-0 -bottom-1 h-0.5 w-[70%] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </Link>
);

const NavLinkLight = ({ to, children }) => (
    <Link
        to={to}
        className="relative text-gray-900 font-bold group transition-colors"
    >
        {children}
        <span className="absolute left-0 -bottom-1 h-0.5 w-[70%] bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </Link>
);

const Header = () => {
    const { darkMode, toggleDarkMode } = useThemeStore();
    const [searchOpen, setSearchOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <SearchBar
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
            />

            {/* ================= DARK HEADER ================= */}
            {darkMode && (
                <header className="bg-black border-b border-gray-800">
                    <div className="px-30 py-5 flex items-center justify-between">
                        <div className="flex items-center space-x-12">
                            <div className="h-14 overflow-clip">
                                <button onClick={() => navigate("/")}>
                                    <img
                                        src="https://res.cloudinary.com/dg0lez6mp/image/upload/w_50,h_14,c_fit,f_auto,q_auto/v1766065675/Darkbg2_a0a7qi.png"
                                        data-src="https://res.cloudinary.com/dg0lez6mp/image/upload/w_200,h_56,c_fit,f_auto,q_auto/v1766065675/Darkbg2_a0a7qi.png"
                                        alt="Dark Logo"
                                        className="h-14 max-w-40 object-contain cursor-pointer filter blur-[0.5px] opacity-80 transition duration-300 ease-out"
                                        onLoad={(e) => {
                                            const target = e.currentTarget;
                                            const src = target.getAttribute("data-src");
                                            if (!src) return;
                                            const fullImage = new Image();
                                            fullImage.src = src;
                                            fullImage.onload = () => {
                                                target.src = fullImage.src;
                                                target.classList.remove("blur-[0.5px]", "opacity-80");
                                            };
                                        }}
                                    />
                                </button>
                            </div>

                            <nav className="hidden md:flex items-center space-x-8 text-sm">
                                <NavLinkDark to="/">HOME</NavLinkDark>
                                <NavLinkDark to="/blog">BLOG</NavLinkDark>
                                <NavLinkDark to="/about">ABOUT</NavLinkDark>
                                <NavLinkDark to="/contact">CONTACT</NavLinkDark>
                            </nav>
                        </div>

                        <div className="flex items-center space-x-6">
                            <IconButtonDark onClick={() => setSearchOpen(true)}>
                                <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer" />
                            </IconButtonDark>

                            <IconButtonDark>
                                <UserIcon className="h-6 w-6 cursor-pointer" />
                            </IconButtonDark>

                            <IconButtonDark>
                                <div className="relative">
                                    <ShoppingCartIcon className="h-6 w-6 cursor-pointer" />
                                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        0
                                    </span>
                                </div>
                            </IconButtonDark>

                            <IconButtonDark onClick={toggleDarkMode}>
                                <SunIcon className="h-6 w-6 cursor-pointer" />
                            </IconButtonDark>
                        </div>
                    </div>
                </header>
            )}

            {/* ================= LIGHT HEADER ================= */}
            {!darkMode && (
                <header className="bg-white border-b border-gray-200">
                    <div className="px-30 py-5 flex items-center justify-between">
                        <div className="flex items-center h-14 overflow-clip space-x-12">
                            <div className="h-14 overflow-clip">
                                <button onClick={() => navigate("/")}>
                                    <img
                                        src="https://res.cloudinary.com/dg0lez6mp/image/upload/w_50,h_14,c_fit,f_auto,q_auto/v1766065838/Lightbg1_iknhu7.png"
                                        data-src="https://res.cloudinary.com/dg0lez6mp/image/upload/w_200,h_56,c_fit,f_auto,q_auto/v1766065838/Lightbg1_iknhu7.png"
                                        alt="Light Logo"
                                        className="h-14 max-w-40 object-contain cursor-pointer filter blur-[0.5px] opacity-80 transition duration-300 ease-out"
                                        onLoad={(e) => {
                                            const target = e.currentTarget;
                                            const src = target.getAttribute("data-src");
                                            if (!src) return;
                                            const fullImage = new Image();
                                            fullImage.src = src;
                                            fullImage.onload = () => {
                                                target.src = fullImage.src;
                                                target.classList.remove("blur-[0.5px]", "opacity-80");
                                            };
                                        }}
                                    />
                                </button>
                            </div>

                            <nav className="hidden md:flex items-center space-x-8 text-sm">
                                <NavLinkLight to="/">HOME</NavLinkLight>
                                <NavLinkLight to="/blog">BLOG</NavLinkLight>
                                <NavLinkLight to="/about">ABOUT</NavLinkLight>
                                <NavLinkLight to="/contact">CONTACT</NavLinkLight>
                            </nav>
                        </div>

                        <div className="flex items-center space-x-6">
                            <IconButtonLight onClick={() => setSearchOpen(true)}>
                                <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer" />
                            </IconButtonLight>

                            <IconButtonLight>
                                <UserIcon className="h-6 w-6 cursor-pointer" />
                            </IconButtonLight>

                            <IconButtonLight>
                                <div className="relative">
                                    <ShoppingCartIcon className="h-6 w-6 cursor-pointer" />
                                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        0
                                    </span>
                                </div>
                            </IconButtonLight>

                            <IconButtonLight onClick={toggleDarkMode}>
                                <MoonIcon className="h-6 w-6 cursor-pointer" />
                            </IconButtonLight>
                        </div>
                    </div>
                </header>
            )}
        </div>
    );
};

export default Header;
