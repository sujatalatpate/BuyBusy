import { addDoc, collection, Timestamp } from "firebase/firestore";
import style from "../components/product/product.module.css"
import { db } from "../firebase";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";
function PurchaseButton() {
    const { cart, totalPrice, setCart } = useCart();
    const { user } = useAuth();
  
    function purchaseProducts()
    {
    if (!user || cart.length === 0) {
      alert("No items in cart or user not logged in");
      return;
    }
  
    const newOrder = {
      items: cart, // Store all products in the order
      totalAmount: totalPrice,
      createdAt: Timestamp.now(),
    };
  
    addDoc(collection(db, "usersOrder", user.uid, "orders"), newOrder)
      .then(() => {
        alert("Order placed successfully!");
        setCart([]); // Clear the cart after placing an order
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
    }
    return(
<div className={style.cartContainer}>
      {totalPrice !==0 && (
      <div className={style.left}>
        <div className={style.con}>
          <h1>TotalPrice: ₹{totalPrice}</h1>
          <Link to="/orders">
          <button onClick={purchaseProducts} style={{cursor:'pointer'}}>Purchase</button>
          </Link>
        </div>
      </div>
      
      )}
      </div>

    )
  }
export default PurchaseButton;