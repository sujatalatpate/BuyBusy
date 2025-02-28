// import { Timestamp } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { db } from "../../../firebase";
// import { collection, getDocs, deleteDoc, doc, getDoc, addDoc } from "firebase/firestore";
// import { useCart } from "../../../context/cartContext";
// import style from "./Orders.module.css"
// import { useAuth } from "../../../context/auth";

// function Order() {
//   //const [purchases, setPurchases] = useState([]);
//   const { order, setOrder,cart, totalPrice } = useCart();
//   const {user} = useAuth();

//   useEffect(() => {
//     async function fetchData() {
//       const orderSnapshot = await getDocs(
//         collection(db, "usersOrder",user.uid,'orders')
//       );
//       const orders = orderSnapshot.docs.map((order) => ({
//         docId: order.id,
//         ...order.data(),
//       }));
//       console.log(orders);
//       setOrder(orders);
//     }

//     fetchData();
//   }, []);

//   return (
//     <div className={style.tableContainer}>
//       <div>
//         <h1>Your Orders</h1>
//         <p>Ordered On:- {}</p>
//       </div>
//       <div>
//         <table>
//             <thead>
//           <tr>
//             <th>Titel</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Total Price</th>
//           </tr>
//           </thead>
//          <tbody>

//          {order.map((item)=>
//            <>
//            <tr>
//             <td>{item.name}</td>
//             <td>{item.price}</td>
//             <td>{item.quantity}</td>
//             <td>{item.price * item.quantity}</td>
//             </tr>

//             </>
//             )}
//           <tr><td colSpan="4" style={{textAlign:'end'}}>{totalPrice}</td></tr>
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// }
// export default Order;
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../../../context/cartContext";
import Loader from "../../../components/product/Loader";
import style from "./Orders.module.css";
import { useAuth } from "../../../context/auth";

function Order() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      try {
        const orderSnapshot = await getDocs(
          collection(db, "usersOrder", user.uid, "orders")
        );

        const ordersList = orderSnapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // Stop the loading state after fetching data
      }
    }

    fetchOrders();
  }, [user]);

  return (
    <div className={style.tableContainer}>
      <h1>Your Orders</h1>

      {orders.length === 0 ? <p>No orders found.</p> : null}

      {orders.map((order) => (
        <div key={order.docId} className={style.orderBox}>
          {/* <h3>Order ID: {order.docId}</h3> */}
          <p style={{ fontSize: "x-large", textAlign: "center" }}>
            Ordered On: {new Date(order.createdAt?.toDate()).toLocaleString()}
          </p>

          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>₹ {item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹ {item.price * item.quantity}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" style={{ textAlign: "end" }}>
                  ₹ {order.totalAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Order;
