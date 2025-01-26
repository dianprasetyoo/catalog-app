"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../../public/sportify.svg";
import LogoRed from "../../../public/sportify-red.svg";
import {
  FaShoppingCart,
  FaChevronDown,
  FaChevronUp,
  FaBars,
} from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import {
    IoClose
  } from "react-icons/io5";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { cart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`w-full transition-colors duration-300  ${scrolled ? "bg-white" : "bg-gray-800"}`}>
      <div className="border border-b-1 border-gray-400 flex justify-between items-center px-4 py-2">
        {/* Logo */}
        <Image
          src={scrolled ? Logo : LogoRed}
          alt="sportify"
          width={150}
          height={150}
          className="object-contain"
        />
        <FaBars onClick={toggleMenu} size={24} className="lg:hidden"/>

        {/* Menu for larger screens */}
        <div className="hidden lg:flex flex-1 justify-between items-center">
          {/* Search Input */}
          <div className="flex flex-1 justify-center py-2 px-4">
            <input
              className="w-full px-2 py-1 border rounded-md"
              placeholder="Search Products ..."
            />
          </div>

          {/* Cart */}
          <div className="relative">
            <FaShoppingCart size={24} />
            {cart?.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white w-5 h-5 flex justify-center items-center rounded-full text-xs">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Full-screen Mobile Menu (Visible when isMenuOpen is true) */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-white z-50 p-4">
          {/* Close Button */}
          <div className="w-full flex justify-end mb-4">
          <IoClose onClick={toggleMenu} size={24} className="self-end"/>
          </div>
          {/* <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-2xl"
            aria-label="Close menu"
          >
            ✕
          </button> */}

          {/* Search Input */}
          <div className="mb-4">
            <input
              className="w-full px-2 py-2 border rounded-md"
              placeholder="Search..."
            />
          </div>

          {/* Menu Items */}
          <div className="space-y-4">
            <div className="flex flex-row items-center">
              <FaShoppingCart size={14} />
              <div className="ml-2">
                Cart {cart?.length ? `(${cart.length})` : ""}
              </div>
            </div>
            <div className="relative flex flex-row items-center justify-between">
              <div>Color</div>
              <div className="grid grid-cols-4 gap-4 px-4 py-2">
                <button className="bg-red-500 border-none cursor-pointer hover:bg-red-500" />
                <button className="bg-blue-500 border-none cursor-pointer hover:bg-blue-500" />
                <button className="bg-yellow-500 border-none cursor-pointer hover:bg-yellow-500" />
                <button className="bg-black border-none cursor-pointer hover:bg-black" />
              </div>
            </div>
            {/* Filter Dropdown */}
            <div className="relative">
              <a
                onClick={toggleDropdown}
                className="flex items-center w-full text-left border-none bg-white hover:bg-white"
              >
                <div className="flex flex-row items-center w-full justify-between">
                  <div>Filter</div>
                  {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </a>
              {isDropdownOpen && (
                <div className="w-full">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    T-shirt
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Pants
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Socks
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Belt
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
