// import { createContext, useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// // Context banaya jisse poore app me authentication state accessible ho
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogout = (e) => {
//     e.stopPropagation();
//     setIsLoggedIn(false);
//     console.log(isLoggedIn);
//   };

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };
//   const auth = getAuth();

//   useEffect(() => {
//     // Firebase ka function jo auth state track karega
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser); // User logged in hai
//       } else {
//         setUser(null); // User logged out ho gaya
//       }
//     });

//     return () => unsubscribe(); // Cleanup function
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, handleLogin,handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();
export const useAuth = ()=> useContext(AuthContext) 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [carts, setCarts] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    // Firebase ka function jo auth state track karega
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoggedIn(true); // Yahan update karein
      } else {
        setUser(null);
        setIsLoggedIn(false); // User logged out ho gaya
      }
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  // Logout function
  const handleLogout = async (e) => {
    e.stopPropagation();
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, handleLogout,carts}}>
      {children}
    </AuthContext.Provider>
  );
};