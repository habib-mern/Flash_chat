import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useState} from "react";
import {AiFillEyeInvisible} from 'react-icons/ai';
import {AiFillEye} from 'react-icons/ai';
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {userLoginInfo} from "../../slices/userSlice";

const Login = () => {
    const auth = getAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //error state

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    //Email regex
    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

    //Show password

    const [showPass, setShowPass] = useState("password")

    const handleEmail = (event) => {
        setEmail(event.target.value)
        if (email.length > 1) {
            setEmailError("")
        }
    }
    const handlepassword = (event) => {
        setPassword(event.target.value)
        if (password.length > 1) {
            setPasswordError("")
        }
    }

    const handleShowPass = () => {
        if (showPass == "password") {
            setShowPass("text")
        } else {
            setShowPass("password")
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (email == "") {
            setEmailError("Please enter your email")
        } else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email")
        } else if (password == "") {
            setPasswordError("Please enter your password")
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    const user = userCredential.user;

                    toast.success('Login successful', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                    });

                    dispatch(userLoginInfo(user));
                    localStorage.setItem("user", JSON.stringify(user));
                    navigate('/home')
                })
                .catch((error) => {
                    console.log(error)
                });
        }

    }

    return (
        <div id='login'>
            <div className="main">
                <div className="left">
                    <img src="https://i.ibb.co/6BFqV2D/logo.png" alt="logo" border="0"/>
                </div>
                <div className="right">
                    <h1>Please login to continue</h1>
                    <h2>Get Your flash By useing Flash Chat</h2>
                    <form onClick={handleSubmit}>
                        <div ></div>
                        <input onChange={handleEmail} type="text" placeholder='Enter your email'/>
                        <p>{emailError}</p>

                        <div className="relative">

                            <input
                                onChange={handlepassword}
                                type={showPass}
                                placeholder="Enter your password"/> {
                                showPass == "password"
                                    ? <div
                                            className=" absolute top-1/2 right-[15%] md:right-[28%] transform translate-y-[-50%] text-primary cursor-pointer">
                                            <AiFillEyeInvisible onClick={handleShowPass}></AiFillEyeInvisible>
                                        </div>
                                    : <div
                                            className=" absolute top-1/2 right-[15%] md:right-[28%] transform translate-y-[-50%] text-primary cursor-pointer">
                                            <AiFillEye onClick={handleShowPass}></AiFillEye>
                                        </div>
                            }
                        </div>
                        <p>{passwordError}</p>
                        <button className='btn_v_1'>Login</button>
                    </form>
                    <div className="text-center mt-5">Don't have an account ?
                        <Link className="cursor-pointer text-secound font-semibold" to='registration'>Register</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;