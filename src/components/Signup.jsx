import config from '../config/config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import Alert from './Alert'

async function generateOTP(email) {
    return fetch(config.SERVER_URL + '/users/generateOTP', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
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
async function signupUser(credentials) {
    return fetch(config.SERVER_URL + '/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
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

const Signup = () => {
    // On Sumbit create new user or display of user already exists
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
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
        setIsLoading(true);
        if (!email || !password || !confirmPassword) {
            setShowAlert(true)
            setAlertMessage("Please fill all the fields!")
            setAlertColor("red")
            setAlertInstructions("Make sure you have filled all the fields")
            setIsLoading(false)
            return
        }
        if (password !== confirmPassword) {
            setShowAlert(true)
            setAlertMessage("Passwords do not match")
            setAlertColor("red")
            setAlertInstructions("Please check your password")
            setIsLoading(false)
            return
        }
        setIsLoading(true);
        const response = await signupUser({ email, password });
        if (response.success) {
            const otp_res = await generateOTP(email)
            if(!otp_res.success){
                setShowAlert(true)
                setAlertMessage(otp_res.message)
                setAlertColor("red")
                setAlertInstructions(otp_res.instructions)
                setIsLoading(false)
                return
            }
            setShowAlert(true)
            setAlertMessage(otp_res.message)
            setAlertColor("green")
            setAlertInstructions(otp_res.instructions)
            localStorage.setItem('email', email); // Store the user_id
            setTimeout(() => {
                navigate('/verifyemail')
            }, 3000);
        }
        else {
            setShowAlert(true)
            setAlertMessage(response.message)
            setAlertColor("red")
            setAlertInstructions(response.instructions)
        }
        setIsLoading(false)
        setIsSubmitDisabled(false)
    }
    document.title = "Signup | QA Portal"


    return (
        <section className="bg-transparent dark:bg-transparent rounded-lg border-2 border-primary-700">
            {showAlert && (
                <Alert message={alertMessage} color={alertColor} instructions={alertInstructions} />
            )}
            {isLoading ? (<Spinner />) : (
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 border-2 border-primary-500 bg-black">
                    <div className="w-60 h-14 relative m-4">
                        <div className="left-[62.01px] top-[5.31px] absolute text-white text-4xl font-bold font-['DM Sans'] leading-10">QA Portal</div>
                        <div className="w-12 h-14 left-0 top-0 absolute">
                            <div className="w-8 h-8 left-[24px] top-[-1.86px] absolute origin-top-left rotate-[30deg] bg-indigo-600" />
                            <div className="w-7 h-7 left-[-0.21px] top-[13.55px] absolute origin-top-left rotate-[30deg] bg-sky-400" />
                            <div className="w-7 h-7 left-[24px] top-[27.53px] absolute origin-top-left rotate-[-30deg] bg-purple-600" />
                        </div>
                    </div>
                    <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-transparent dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium  text-white">Your login email</label>
                                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} name="email" id="email" className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-transparent border-gray-600 placeholder-gray-400 text-white" placeholder="xyz@me.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 text-white bg-transparent" required="" />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-white">Confirm password</label>
                                    <input type="confirm-password" onChange={(e) => { setConfirmPassword(e.target.value) }} name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white bg-transparent" required="" />
                                </div>
                                
                                <button onClick={handleSubmit} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    disabled={isSubmitDisabled}
                                >
                                    Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Signup
