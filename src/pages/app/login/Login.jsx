import { useState } from "react";
import { toast } from "react-toastify";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import app from "../../../firebase";
import { getAuth, signInWithCredential, signInWithEmailAndPassword } from "firebase/auth";

function Login({handleLogins}) {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async(e)=>{
    e.preventDefault();
    try
    {
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
        const user = userCredential.user;
        if(user.emailVerified)
        {
            setMessage('login successfull');
           
        }
        else{
            setError('Please verify your email');
        }
        navigate('/');
    }
    catch(err)
    {
        if(err.message.includes('invalid-credential'))
        {
           setError('Incorrect email or password')
           //toast.err(message)
        }
     // setMessage(err.message);
    }
  }
  return (
    <>
      <main>
        <div className={style.login_container}>
          <h1>Sign In</h1>
          {error && <p>{error}</p>}
          {message && <p>{message}</p>}
          <form onSubmit={handleLogin}>
          <input
            placeholder="Enter Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <button type="submit" onClick={handleLogins}>Sign In</button>
          </form>
          <Link to="/register">
            <p style={{color:"black"}}>Or sign Up instead</p>
          </Link> 
        </div>
      </main>
    </>
  );
}
export default Login;
