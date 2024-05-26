import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from '../../Firebase/firebase__config';
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {

    const [resgisterError, setRegisterError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value; //name=email
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password);
        // reset error
        setRegisterError('');
        setSuccessMessage('');

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password should be have at least one uppercase characters');
            return;
        }
        else if (!accepted) {
            setRegisterError('Please accept our Terms and Conditions');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                //console.log('result', result);
                console.log(result.user);
                setSuccessMessage('Registered Successfully');

                //Update User profile
                updateProfile(result.user, {
                    displayName: name
                })
                    .then(() => {
                        console.log('Profile Updated')
                    })
                    .catch(error => {
                        console.error(error)
                    }
                    )

                //send verification mail
                sendEmailVerification(result.user)
                    .then(() => {
                        alert("A mail have been sent. Plesae verify your Email");
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                setRegisterError(errorMessage);
            })
    }
    return (
        <div className="">
            <div className="text-center mx-auto md:w-1/3 bg-blue-100 my-8 py-6 px-12">
                <h2 className="text-2xl">Please Register</h2>
                <form onSubmit={handleRegister} className="my-4 px-2 py-4 border-4 border-indigo-500/100">
                    <input className='mb-3 pl-1 w-full' type="text" name='name' id='' placeholder="Enter your name" required />
                    <input className='mb-3 pl-1 w-full' type="email" name='email' id='' placeholder="your mail here" required />
                    <br />
                    <div className="relative">
                        <input className="mb-3 pl-1 w-full"
                            type={showPassword ? "text" : "password"}
                            name='password' id='' placeholder="enter password" required />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1 right-2">
                            {
                                showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye />
                            }
                        </span>
                    </div>

                    <div className="">
                        <input type='checkbox' name='terms' id='term' />
                        <label className="ml-2" htmlFor="term">Accept our <a href="">terms and conditions</a></label>
                    </div>

                    <input className='btn btn-secondary my-2 w-1/3' type="submit" value='Register' />
                </form>
                {
                    resgisterError && <p className="text-xl text-red-600">{resgisterError}</p>
                }
                {
                    successMessage && <p className="text-xl text-green-600">{successMessage}</p>
                }

                <p>Already have account? <Link to='/login' className="font-semibold text-blue-400">Go to Login</Link></p>

            </div>
        </div>

    );
};

export default Register;