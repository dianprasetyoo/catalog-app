"use client";
import React from "react";
import useProducts from "@/hooks/useProducts";

const SideNav = () => {
  const { filterProduct, totalProduct } = useProducts();

  return (
    <aside
      className={`hidden
          lg:block bg-gray-100 p-4 w-full fixed lg:relative left-0 top-0 bottom-0 lg:w-[20%] ml-2`}
    >
      <div>
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          <li>
            <a onClick={() => filterProduct("type", "t-shirt")} className="hover cursor-pointer">
              T-shirt ({totalProduct('t-shirt')})
            </a>
          </li>
          <li>
            <a onClick={() => filterProduct("type", "pants")} className="hover cursor-pointer">
              Pants ({totalProduct('pants')})
            </a>
          </li>
          <li>
            <a onClick={() => filterProduct("type", "socks")} className="hover cursor-pointer">
              Socks ({totalProduct('socks')})
            </a>
          </li>
          <li>
            <a onClick={() => filterProduct("type", "belt")} className="hover cursor-pointer">
              Belt ({totalProduct('belt')})
            </a>
          </li>
        </ul>
      </div>
      <div className="my-4">
        <h2 className="text-lg font-semibold mb-4">Variants</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => {
              filterProduct("color", "red");
            }}
            className="bg-red-500 border-none cursor-pointer hover:bg-red-500"
          />
          <button
            onClick={() => {
              filterProduct("color", "blue");
            }}
            className="bg-blue-500 border-none cursor-pointer hover:bg-blue-500"
          />
          <button
            onClick={() => {
              filterProduct("color", "yellow");
            }}
            className="bg-yellow-500 border-none cursor-pointer hover:bg-yellow-500"
          />
          <button
            onClick={() => {
              filterProduct("color", "black");
            }}
            className="bg-black border-none cursor-pointer hover:bg-black"
          />
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
