import {useState} from "react";
import {AiFillEyeInvisible} from 'react-icons/ai';
import {AiFillEye} from 'react-icons/ai';
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {getDatabase, ref, set} from "firebase/database";

const Registration = () => {

    const auth = getAuth();
    const navigate = useNavigate()
    const db = getDatabase();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //error state

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    //Email regex
    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

    //Show password

    const [showPass, setShowPass] = useState("password")

    const handleName = (event) => {
        setName(event.target.value)
        if (name.length > 1) {
            setNameError("")
        }
    }
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

        if (name == "") {
            setNameError("Please enter your name")

        } else if (email == "") {
            setEmailError("Please enter your email")
        } else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email")
        } else if (password == "") {
            setPasswordError("Please enter your password")
        } else {

            createUserWithEmailAndPassword(auth, email, password)
                .then(
                    (userCredential) => {
                        updateProfile(auth.currentUser, {
                            displayName: name,
                            photoURL: "https://png.pngitem.com/pimgs/s/517-5178740_clip-art-free-download-png-free-do" +
                                    "wnload-user.png"
                        })
                        // Signed up
                            .then(() => {
                            toast.success('Registration successful', {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored"
                            });
                            set(ref(db, 'users/' + auth.currentUser.uid), {
                                username: auth.currentUser.displayName,
                                email: auth.currentUser.email
                            });
                            navigate('/')
                        })
                        const user = userCredential.user;
                        console.log(user)
                        // ...
                    }
                )
                .catch((error) => {
                    console.log(error)
                    // ..
                });
        }

    }

    return (
        <> < div id = 'registration' > <div className="main">
            <div className="left">
                <img src="https://i.ibb.co/6BFqV2D/logo.png" alt="logo" border="0"/>
            </div>
            <div className="right">
                <h1>Get started with easily register</h1>
                <h2>Free register and you can enjoy it</h2>
                <form onClick={handleSubmit}>
                    <div >

                        <input onChange={handleName} type="text" placeholder='Enter your name'/>
                        <p>{nameError}</p>
                    </div>
                    <input onChange={handleEmail} type="email" placeholder='Enter your email'/>
                    <p>{emailError}</p>

                    <div className="relative">

                        <input
                            onChange={handlepassword}
                            type={showPass}
                            placeholder="Enter your password"/> {
                            showPass == "password"
                                ? <div
                                        className=" absolute top-1/2 right-[15%] md:right-[28%] transform translate-y-[-50%] text-secound cursor-pointer">
                                        <AiFillEyeInvisible onClick={handleShowPass}></AiFillEyeInvisible>
                                    </div>
                                : <div
                                        className=" absolute top-1/2 right-[15%] md:right-[28%] transform translate-y-[-50%] text-secound cursor-pointer">
                                        <AiFillEye onClick={handleShowPass}></AiFillEye>
                                    </div>
                        }
                    </div>
                    <p>{passwordError}</p>
                    <button className='btn_v_1'>Sign Up</button>
                </form>
                <div className="text-center mt-5">Already have an account ?
                    <Link className="text-primary font-semibold cursor-pointer" to='/'>Sign In</Link>
                </div>

            </div>
        </div>
    </div>

</>
    );
};

export default Registration;