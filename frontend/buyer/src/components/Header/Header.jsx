import React from "react";
import {
    MagnifyingGlassIcon,
    UserIcon,
    ShoppingCartIcon,
    MoonIcon,
    SunIcon,
} from "@heroicons/react/24/outline";
import useThemeStore from "../../Stores/ThemeStore";
import { useState } from "react"; // adjust path if needed
import SearchBar from "../SearchBar/SearchBar";

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

const NavLinkDark = ({ href, children }) => (
    <a
        href={href}
        className="relative text-white font-bold group transition-colors"
    >
        {children}
        <span className="absolute left-0 -bottom-1 h-0.5 w-[70%] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </a>
);

const NavLinkLight = ({ href, children }) => (
    <a
        href={href}
        className="relative text-gray-900 font-bold group transition-colors"
    >
        {children}
        <span className="absolute left-0 -bottom-1 h-0.5 w-[70%] bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </a>
);

const Header = () => {
    const { darkMode, toggleDarkMode } = useThemeStore();
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <div className="min-h-screen">
            <SearchBar 
                isOpen={searchOpen} 
                onClose={() => setSearchOpen(false)} 
            />
            {/* ================= DARK HEADER ================= */}
            {darkMode && (
                <>
                    <header className="bg-black border-b border-gray-800">
                        <div className="px-30 py-5 flex items-center justify-between">
                            <div className="flex items-center space-x-12">
                                <div className="h-14 overflow-clip">
                                    <button onClick={() => window.location.href = "/"}>
                                        <img
                                            src="/Assets/Darkbg2.png"
                                            alt="Logo"
                                            className="h-14 max-w-40 object-contain cursor-pointer"
                                        />
                                    </button>
                                </div>

                                <nav className="hidden md:flex items-center space-x-8 text-sm">
                                    <NavLinkDark href="/">HOME</NavLinkDark>
                                    <NavLinkDark href="/blog">BLOG</NavLinkDark>
                                    <NavLinkDark href="/about">ABOUT</NavLinkDark>
                                    <NavLinkDark href="/contact">CONTACT</NavLinkDark>
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
                </>
            )}

            {/* ================= LIGHT HEADER ================= */}
            {!darkMode && (
                <>
                    <header className="bg-white border-b border-gray-200">
                        <div className="px-30 py-5 flex items-center justify-between">
                            <div className="flex items-center h-14 overflow-clip space-x-12">
                                <div className="h-14 overflow-clip">
                                    <button onClick={() => window.location.href = "/"}>
                                        <img
                                            src="/Assets/Lightbg1.png"
                                            alt="Logo"
                                            className="h-14 max-w-40 object-contain cursor-pointer"
                                        />
                                    </button>
                                </div>

                                <nav className="hidden md:flex items-center space-x-8 text-sm">
                                    <NavLinkLight href="/">HOME</NavLinkLight>
                                    <NavLinkLight href="/blog">BLOG</NavLinkLight>
                                    <NavLinkLight href="/about">ABOUT</NavLinkLight>
                                    <NavLinkLight href="/contact">CONTACT</NavLinkLight>
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
                </>
            )}
        </div>
    );
};

export default Header;
