import { useState } from "react";
import style from "./Register.module.css";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app, { db } from "../../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleRegister = async(e)=>{
    e.preventDefault();
    try
    {
      const userCredential = await createUserWithEmailAndPassword(auth,email,password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      //await signOut(auth);
      await setDoc(doc(db,'users', user.uid),{
        name, email
      })
      setMessage('registration successful!')    
      console.log(error);  
      navigate("/")
    }
    catch(err)
    {
      console.log(err)
      if(err.message.includes('email-already-in-use'))
        {
           setError('email already exit')
           //toast.err(message)
        }
    }
  }



  return (
    <>
      <main>
        <div className={style.login_container}>
          <h1>Sign Up</h1>
          {error && <p>{error}</p>}
          {message && <p>{message}</p>}
          <form onSubmit={handleRegister}>
          <input
            placeholder="Enter Name"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            
          />
          <input
            placeholder="Enter Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className={style.sign}>Sign Up</button>
          </form>

          
        </div>
      </main>
    </>
  );
}
export default Register;
