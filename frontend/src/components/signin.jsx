import React, { useRef, useState } from 'react';
import { MdLocationPin } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import axios from 'axios';

function Signin({ setShowSignin }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        try {
            await axios.post('https://ratepin.onrender.com/api/users/register', newUser);
            setShowError(false);
            setShowSuccess(true);
        } catch (err) {
            setShowError(true);
        }

    }
    return (
    <div className="flex h-[40%] w-1/3 flex-col justify-center px-6 lg:px-8 z-50 absolute top-0 left-0 right-0 bottom-0 mx-auto my-auto bg-gray-900 rounded-lg" >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className='flex justify-center gap-2 mt-2'>
                <button onClick={() => setShowSignin(false)}  className='absolute top-3 right-10'>
                    <IoIosCloseCircle className='text-white text-3xl' />
                </button>
                <MdLocationPin className='text-4xl text-white' />
                <p className='text-center text-4xl font-bold text-white font-montserrat'>RatePin</p>
            </div>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label for="name" className="block text-sm font-medium text-white font-montserrat">User Name</label>
                    <div className="mt-2">
                        <input id="name" name="name" type="text" ref={nameRef} required className="text-sm font-montserrat block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm" />
                    </div>
                </div>
                <div>
                    <label for="email" className="block text-sm font-medium text-white font-montserrat">Email address</label>
                    <div className="mt-2">
                        <input id="email" name="email" type="email" ref={emailRef} autocomplete="email" required className="text-sm font-montserrat block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label for="password" className="block text-sm font-medium text-white font-montserrat">Password</label>
                        {/* <div class="text-sm">
                            <a href="#" className="font-semibold text-stone-400 hover:text-stone-500 font-montserrat">Forgot password?</a>
                        </div> */}
                    </div>
                    <div className="mt-2">
                        <input id="password" name="password" ref={passwordRef} type="password" autocomplete="current-password" required className="text-sm font-montserrat block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm" />
                    </div>
                </div>

                    <div>
                        {showSuccess && <p className='text-sm font-montserrat font-semibold text-green-600'>SuccessFull, You can login Now!</p>}
                        {showError && <p className='text-sm font-montserrat font-semibold text-red-600'>Something went wrong!</p>}
                    </div>    

                <div>
                    <button  type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white font-montserrat ">Sign in</button>
                </div>
            </form> 
        </div>
    </div>
    );
}

export default Signin;