import style from "./product.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { itemDetailsData } from "../../data/data";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { useCart } from "../../context/cartContext";

function ProductCart({products=[]}) {
  const showToast = () => {
    toast.success("Product Added Successfully!");
  };
  //const { handleAddToCart } = useCart();
  const { cart, setCart,increaseQuantity,
    decreaseQuantity, } = useCart();
  const { user } = useAuth();
  const [onCart, setOnCart] = useState();
  const navigate = useNavigate();

  const handleAddToCart = async (product, quantity) => {
   // setOnCart(true)
   showToast();
    if (!user) {
      return navigate("/login");
    }
    const cartItem = cart.find((item) => item.id === product.id);
    if (!cartItem) {
      let newProduct = { ...product, quantity: 1 };
      // Add the product to the cart in Firebase
      const docRef = await addDoc(
        collection(db, "users", user.uid, "carts"),
        newProduct
      );
      newProduct.docId = docRef.id;
      setCart([...cart, newProduct]);
    } else {
      const updatedProduct = { ...cartItem, quantity: cartItem.quantity + 1 };
      const docId = updatedProduct.docId;
      delete updatedProduct.docId;
      await updateDoc(
        doc(db, "users", user.uid, "carts", docId),
        updatedProduct
      );
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className={style.data}>
        {products.map((item) => {
          return (
            <div className={style.item}>
              <img src={item.image} style={{ objectFit: "contain" }} />
              <div>
                <p>
                  {item.title}
                  <br />
                </p>
                <p>{`₹ ${item.price}`}</p>
                <button onClick={() => handleAddToCart(item)}>
                  Add To Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ProductCart;
