import React, { useState } from 'react'
import Spinner from './Spinner'
import { BrainCircuit } from 'lucide-react'
import config from '../config/config'
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';
import * as Toast from '@radix-ui/react-toast';
import "../index.css"

async function loginUser(credentials) {
    const response = await fetch(`${config.SERVER_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    const data = await response.json();
    return data;
}
async function generateOTP(user_id, email) {
    return fetch(config.SERVER_URL + '/users/generateOTP', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id, email })
    })
        .then(data => data.json())
        .then(data => {
            if (data.success) {
                return data
            }
            else {
                console.log("Error: ", data)
                return data
            }
        })
        .catch(err => console.log(err))
}
export default function Loginv2() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertColor, setAlertColor] = useState('')
    const [alertInstructions, setAlertInstructions] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        localStorage.clear()
        setShowAlert(false);
        setIsSubmitDisabled(true)
        if (!email || !password) {
            setShowAlert(true)
            setAlertMessage("Please fill all the fields!")
            setAlertColor("red")
            setAlertInstructions("Make sure you have filled all the fields")
            setIsLoading(false)
            setIsSubmitDisabled(false)
            
            return
        }
        setIsLoading(true);
        const response = await loginUser({ email, password });

        if (response.success) {
            localStorage.setItem('accessToken', response.token); // Store the token
            localStorage.setItem('user_id', response.user_id); // Store the user_id
            setIsLoading(false)
            navigate('/chat')
        }
        else {
            if (response.message == "User not activated yet!") {
                const otp_res = await generateOTP(response.user_id, email)

                if (!otp_res.success) {
                    setShowAlert(true)
                    setAlertMessage(otp_res.message)
                    setAlertColor("red")
                    setAlertInstructions(otp_res.instructions || "Please try after sometime")
                    setIsLoading(false)
                    setIsSubmitDisabled(false)
                    return
                }
                localStorage.setItem('email', email); // Store the user_id
                setTimeout(() => {
                    navigate('/verifyemail')
                }, 3000)

            }
            else if (response.message == "User not found!") {
                setShowAlert(true)
                setAlertMessage(response.message)
                setAlertColor("red")
                setAlertInstructions("Please check your credentials")
                setIsLoading(false)
            }
            setShowAlert(true)
            setAlertMessage(response.message || "Error")
            setAlertColor("red")
            setAlertInstructions(response.instructions || "Please check your credentials")

        }
        setIsLoading(false)
        setIsSubmitDisabled(false)
    }
    document.title = "Login | QA Portal"
    return (
        <div className='h-screen w-screen flex bg-zinc-900 items-center justify-center'>
            {showAlert && (
                <Toaster message={alertMessage} color={alertColor} instructions={alertInstructions} setOpen={setShowAlert} open={showAlert} />
            )}
            {isLoading ? <Spinner /> : (
                <div className="flex flex-col w-[100%] sm:w-[70%] md:w-[40%]  h-full bg-black/30 items-center justify-center rounded-xl">
                    <div className=''>
                        <div className="inline-flex gap-x-2 items-center ">
                            <BrainCircuit size={50} />
                            <p className="font-bold text-3xl">
                                UniChat
                            </p>
                        </div>
                    </div>
                    <div className="w-full rounded-lg  md:mt-0 sm:max-w-md xl:p-0 bg-transparent border-none justify-center">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl text-center ">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6 " action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium  text-white ">Your email</label>
                                    <input onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" id="email" className=" border border-gray-300 text-gray-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-transparent" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-100 ">Password</label>
                                    <input onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" id="password" placeholder="••••••••" className="border border-gray-300 text-gray-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-transparent" required="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <a href="/forgotpassword" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <button type="submit" onClick={handleSubmit} className="w-[100%] text-white  focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={isSubmitDisabled}>Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>

                </div>



            )}
        </div>
    )
}


const Toaster = ({ message, color, instructions, open, setOpen }) => {
    return (
        <>
            <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
                <Toast.Title className="ToastTitle">{message}</Toast.Title>
                <Toast.Description asChild>
                    {instructions}
                </Toast.Description>
                <Toast.Action className="ToastAction" asChild >
                    <button className="Button small green " onClick={()=>setOpen(false)}>x</button>
                </Toast.Action>
            </Toast.Root>
            <Toast.Viewport className="ToastViewport" />
        </>
    )
}