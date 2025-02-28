// import { useState } from "react";
// import Navbar from "./components/navbar/Navbar";
// import Login from "./pages/app/login/Login";
// import Register from "./pages/app/register/Register";
// import Home from "./pages/app/home/Home";
// import Cart from "./pages/app/cart/Cart";
// import { CartProvider } from "./context/cartContext";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { AuthProvider } from "./context/auth";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogout = (e) => {
//     e.stopPropagation();
//     setIsLoggedIn(false);
//     console.log(isLoggedIn);
//   };

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   const browserRouter = createBrowserRouter([
//     {
//       path: "/",
//       element: <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>,
//       children: [
//         {index: true, element: <Home />},
//         { path: "/login", element: <Login handleLogins={handleLogin} />},
//         { path: "/register", element: <Register handleLogout={handleLogout}/>},
//         {path: "/cart", element: <Cart />}
//       ],
//     },
//   ]);
//   return (
//     <AuthProvider>
//     <CartProvider>
//     <div>
//       <RouterProvider router={browserRouter} />
//     </div>
//     </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;
import Loader from "./components/product/Loader";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/app/login/Login";
import Register from "./pages/app/register/Register";
import Home from "./pages/app/home/Home";
import Cart from "./pages/app/cart/Cart";
import { CartProvider } from "./context/cartContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import Order from "./pages/app/orders/Orders";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/cart", element: <Cart /> },
      {path: "/orders", element: <Order />}
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={browserRouter} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;