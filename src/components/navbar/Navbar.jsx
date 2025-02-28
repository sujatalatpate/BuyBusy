// import { useContext, useState } from "react";
// import React from "react";
// import style from "./Navbar.module.css";
// import {AuthContext, AuthProvider } from "../../context/auth";
// import { Link, Outlet } from "react-router-dom";


// function Navbar({isLoggedIn, handleLogout}) {
// const {user} = useContext(AuthContext);
//   return (
//     <>
//       <nav>
//         <div className={style.nav_container}>
//           <Link to="/">
//             <h1 style={{padding:'50px'}}>Busy Buy</h1>
//           </Link>
//           <div className={style.nav_icons}>
//             <Link to="/">
//               <div className={style.home}>
//                 <img src="https://cdn-icons-png.flaticon.com/128/553/553416.png" />
//                 <h1>Home</h1>
//               </div>
//             </Link>
//             {isLoggedIn ?
//             (<>
//             <Link to="">
//               <div className={style.home}>
//                 <img src="https://cdn-icons-png.flaticon.com/128/1007/1007908.png" />
//                 <h1>My Orders</h1>
//               </div>
//             </Link>

//             <Link to="/cart">
//               <div className={style.home}>
//                 <img src="https://cdn-icons-png.flaticon.com/128/2838/2838694.png" />
//                 <h1>Cart</h1>
//               </div>
//             </Link>

//             <Link to="/">
//               <div className={style.signIn} onClick={(e)=>handleLogout(e)}>
//                 <img src="https://cdn-icons-png.flaticon.com/128/9203/9203736.png" />
//                 <h1>SignOut</h1>
//               </div>
//             </Link>
          
//             </>
//             ):
//             (
//               <Link to="/login">
//               <div className={style.signIn} >
//                 <img src="https://cdn-icons-png.flaticon.com/128/2996/2996170.png" />
//                 <h1>SignIn</h1>
//               </div>
//             </Link>
//             )}  
//           </div>
//         </div>
//       </nav>
//       <Outlet />
//     </>
//   );
// }

// export default Navbar;

import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import style from "./Navbar.module.css";

function Navbar() {
  const { user, isLoggedIn, handleLogout } = useContext(AuthContext);

  return (
    <>
      <nav>
        <div className={style.nav_container}>
          <Link to="/">
            <h1 style={{ padding: "50px" }}>Busy Buy</h1>
          </Link>
          <div className={style.nav_icons}>
            <Link to="/">
              <div className={style.home}>
                <img src="https://cdn-icons-png.flaticon.com/128/553/553416.png" />
                <h1>Home</h1>
              </div>
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/orders">
                  <div className={style.home}>
                    <img src="https://cdn-icons-png.flaticon.com/128/1007/1007908.png" />
                    <h1>My Orders</h1>
                  </div>
                </Link>

                <Link to="/cart">
                  <div className={style.home}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2838/2838694.png" />
                    <h1>Cart</h1>
                  </div>
                </Link>

                <Link to="/">
                  <div className={style.signIn} onClick={handleLogout}>
                    <img src="https://cdn-icons-png.flaticon.com/128/9203/9203736.png" />
                    <h1>SignOut</h1>
                  </div>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <div className={style.signIn}>
                  <img src="https://cdn-icons-png.flaticon.com/128/2996/2996170.png" />
                  <h1>SignIn</h1>
                </div>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;