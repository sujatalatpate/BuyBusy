import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import style from "./Cart.module.css"
import ProductCart from "../../../components/product/product";
import { useCart } from "../../../context/cartContext";
import { AuthContext, useAuth } from "../../../context/auth";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, deleteDoc, doc, getDoc, addDoc } from "firebase/firestore";
import PurchaseButton from "../../PurchaseButton";

function Cart() {
  
  const { user,carts } = useAuth();
  const {
    cart,
    setCart,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    handleRemoveFromCart,
  } = useCart();


  useEffect(() => {
    async function fetchData() {
      try {
        const cartSnapshot = await getDocs(
          collection(db, "users", user.uid, "carts")
        );
        console.log(cartSnapshot);
        const carts = cartSnapshot.docs.map((cart) => ({
          docId: cart.id,
          ...cart.data(),
        }));
        console.log(carts);
        setCart(carts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
     
    }
    fetchData();
  }, []);

  return (
    <>
    <ToastContainer />
    <div className={style.cartContainer}>
        
      {totalPrice !==0 && (
      <PurchaseButton />
      )}
      <div>
      {cart.length?
        <div className={style.data} style={{ marginTop: "80px" }}>
          
          {cart.map((item) => {
            return (
              <>
                <div className={style.item}>
                  <img src={item.image} style={{ objectFit: "contain" }} />
                  <div>
                    <p>
                      {item.title}
                      <br />
                    </p>
                    <div className={style.priceContainer}>
                      <p>{`₹ ${item.price}`}</p>
                      <div className={style.quantity}>
                        <button onClick={() => decreaseQuantity(item)} className={style.qtyButton}>
                          -
                        </button>
                        <p className={style.qty}>{item.quantity}</p>
                        <button onClick={() => increaseQuantity(item)} className={style.qtyButton}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className={style.remove}>
                      <button onClick={() => handleRemoveFromCart(item)}>
                        Remove From Cart
                      </button>
                    </div>
        
                  </div>
                </div>
              </>
            );
          })}
          
        </div>
        :
        <h1>Cart is Empty</h1>
        }
      </div>

    </div>
    </>
  );
  
}
export default Cart;
