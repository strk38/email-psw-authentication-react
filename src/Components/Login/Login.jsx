import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import auth from "../../Firebase/firebase__config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const emailRef = useRef(null);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value; //name=email
        const password = e.target.password.value;
        setSuccessMessage('');
        setErrorMessage('');


        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if (result.user.emailVerified) {
                    setSuccessMessage('Login Successful');
                }
                else {
                    alert('Plese vetify your Email');
                }
            })
            .catch(error => {
                console.error(error);
                setErrorMessage('Login error');
            }
            );
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log('Please provide an email');
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            console.log('Enter a valid Email');
        }

        //send validation mail
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                alert("Please check your Email");
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                // ..
            });
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    ref={emailRef}
                                    className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover" onClick={handleForgetPassword} >Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            {
                                errorMessage &&
                                <p className="text-xl text-red-600">{errorMessage}</p>
                            }
                            {
                                successMessage &&
                                <p className="text-xl text-green-600">{successMessage}</p>
                            }
                            <p>New User? <Link to="/register" className="font-semibold text-blue-400">Please Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;