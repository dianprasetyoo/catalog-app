"use client";
import React from "react";
import Modal from "react-modal";
import { useCart } from "@/context/CartContext";
import { IoCloseCircle, IoTrash } from "react-icons/io5";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1001,
    minWidth: "50%",
    maxHeight: "70%",
    overflowY: "auto" as const,
  },
};

function CartModal() {
  const { openCart, setOpenCart, cart, removeFromCart, clearCart } = useCart();

  return (
    <div>
      <Modal
        isOpen={openCart}
        onRequestClose={() => setOpenCart(false)}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="flex justify-end">
          <IoCloseCircle
            size={32}
            className="flex justify-end cursor-pointer mt-[-12px] mr-[-12px]"
            onClick={() => setOpenCart(false)}
          />
        </div>
        {cart?.length > 0 ? (
          <div className="w-full">
            {cart?.map((item) => (
              <div key={item.id} className="mt-2">
                <div className="flex justify-between items-center">
                  <img src={item.imageUrl} className="h-14" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <IoTrash
                    size={24}
                    className="cursor-pointer text-red-500"
                    onClick={() => removeFromCart(item.id)}
                  />
                </div>
                <div className="w-full border-b mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center my-4">
            There are no items in your cart. Please add products to continue.
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              clearCart();
              setOpenCart(false);
              toast.success("Order Success!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
              });
            }}
          >
            Order Now
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CartModal;
