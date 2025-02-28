import { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useAuth } from "./auth";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
const CartContext = createContext();

export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const { user } = useAuth();

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

 
  const showToast = () => {
    toast.success("Product Remove Successfully!");
  };

  async function handleRemoveFromCart(item) {
    showToast();
    if (!item.docId) {
      console.error("Document ID missing for item:", item);
      return;
    }

    try {
      await deleteDoc(doc(db, "users", user.uid, "carts", item.docId)); // Corrected Firestore path
      const updatedCart = cart.filter((data) => data.id !== item.id); // Fix filter logic
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }

  const increaseQuantity = async (itemInc) => {
    const updatedProduct = { ...itemInc, quantity: itemInc.quantity + 1 };
    const docId = updatedProduct.docId;
    console.log(docId, updatedProduct);
    delete updatedProduct.docId;
    await updateDoc(doc(db, "users", user.uid, "carts", docId), updatedProduct);
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.id === itemInc.id ? { ...updatedProduct, docId } : item
      );
      return newCart;
    });
  };

  const decreaseQuantity = async (itemDec) => {
    const updatedProduct = { ...itemDec, quantity: itemDec.quantity - 1 };
    if (updatedProduct.quantity <= 0) {
      handleRemoveFromCart(itemDec);
    } else {
      const docId = updatedProduct.docId;
      console.log(docId, updatedProduct);
      delete updatedProduct.docId;
      await updateDoc(
        doc(db, "users", user.uid, "carts", docId),
        updatedProduct
      );
      setCart((prevCart) => {
        const newCart = prevCart.map((item) =>
          item.id === itemDec.id ? { ...updatedProduct, docId } : item
        );
        return newCart;
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        handleRemoveFromCart,
        totalPrice,
        increaseQuantity,
        decreaseQuantity,
        order,
        setOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
