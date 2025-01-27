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
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import useProducts from "@/hooks/useProducts";
import CartModal from "@/components/CartModal";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const [scrolled, setScrolled] = React.useState(false);
  const { cart, setOpenCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const { searchProducts, filterProduct, totalProduct } = useProducts();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
    setIsMenuOpen(false);
    searchProducts(searchQuery);
  };

  return (
    <div>
      <header
        className={`w-full transition-colors duration-300  ${
          scrolled ? "bg-white" : "bg-gray-800"
        }`}
      >
        <div className="border border-b-1 border-gray-400 flex justify-between items-center px-4 py-2">
          <Image
            src={scrolled ? Logo : LogoRed}
            alt="sportify"
            width={150}
            height={150}
            className="object-contain cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="relative">
            <FaBars onClick={toggleMenu} size={24} className="lg:hidden" />
            {cart?.length > 0 && (
              <span className="absolute -top-3 -right-3 lg:hidden bg-red-500 text-white w-5 h-5 flex justify-center items-center rounded-full text-xs">
                {cart.length}
              </span>
            )}
          </div>

          {/* Menu for larger screens */}
          <div className="hidden lg:flex flex-1 justify-between items-center">
            {/* Search Input */}
            <form
              className="flex flex-1 justify-center py-2 px-4"
              onSubmit={handleSubmit}
            >
              <input
                id="search-input"
                className="w-full px-2 py-1 border rounded-md"
                placeholder="Search Product Name ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {/* Cart */}
            <div className="relative">
              <FaShoppingCart
                className="cursor-pointer"
                size={24}
                onClick={() => {
                  setOpenCart(true);
                }}
              />
              {cart?.length > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-500 text-white w-5 h-5 flex justify-center items-center rounded-full text-xs">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-white z-50 p-4">
            <div className="w-full flex justify-end mb-4">
              <IoClose onClick={toggleMenu} size={24} className="self-end" />
            </div>

            {/* Search Input */}
            <div className="mb-4">
              <input
                className="w-full px-2 py-2 border rounded-md"
                placeholder="Search..."
              />
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
              <div
                role="button"
                className="flex flex-row items-center"
                onClick={() => {
                  setOpenCart(true);
                  setIsMenuOpen(false);
                }}
              >
                <FaShoppingCart size={14} />
                <div className="ml-2">
                  Cart {cart?.length ? `(${cart.length})` : ""}
                </div>
              </div>
              <div className="relative flex flex-row items-center justify-between">
                <div>Color</div>
                <div className="grid grid-cols-4 gap-4 px-4 py-2">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push("/");
                      filterProduct("color", "red");
                    }}
                    className="bg-red-500 border-none cursor-pointer hover:bg-red-500"
                  />
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push("/");
                      filterProduct("color", "blue");
                    }}
                    className="bg-blue-500 border-none cursor-pointer hover:bg-blue-500"
                  />
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push("/");
                      filterProduct("color", "yellow");
                    }}
                    className="bg-yellow-500 border-none cursor-pointer hover:bg-yellow-500"
                  />
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push("/");
                      filterProduct("color", "black");
                    }}
                    className="bg-black border-none cursor-pointer hover:bg-black"
                  />
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
                    <a
                      onClick={() => {
                        filterProduct("type", "t-shirt");
                        setIsDropdownOpen(false);
                        setIsMenuOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      T-shirt ({totalProduct("t-shirt")})
                    </a>
                    <a
                      onClick={() => {
                        filterProduct("type", "pants");
                        setIsDropdownOpen(false);
                        setIsMenuOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Pants ({totalProduct("pants")})
                    </a>
                    <a
                      onClick={() => {
                        filterProduct("type", "socks");
                        setIsDropdownOpen(false);
                        setIsMenuOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Socks ({totalProduct("socks")})
                    </a>
                    <a
                      onClick={() => {
                        filterProduct("type", "belt");
                        setIsDropdownOpen(false);
                        setIsMenuOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Belt ({totalProduct("belt")})
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
      <CartModal />
    </div>
  );
}

export default Header;
