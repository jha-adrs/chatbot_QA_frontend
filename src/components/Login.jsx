import  { useState } from 'react';
import config from '../config/config'
import Alert from './Alert';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
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
async function generateOTP(user_id,email) {
  return fetch(config.SERVER_URL + '/users/generateOTP', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id, email })
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
export default function Login() {
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
      localStorage.setItem('user_id', response.user_id ); // Store the user_id
      setIsLoading(false)
      navigate('/chat')
    }
    else {
      if (response.message == "User not activated yet!") {
        const otp_res =await generateOTP(response.user_id,email)
        
        if(!otp_res.success){
          setShowAlert(true)
          setAlertMessage(otp_res.message)
          setAlertColor("red")
          setAlertInstructions(otp_res.instructions||"Please try after sometime")
          setIsLoading(false)
          setIsSubmitDisabled(false)
          return
        }
        localStorage.setItem('email', email); // Store the user_id
        setTimeout(() => {
          navigate('/verifyemail')
        },3000)
       
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
    <section className="bg-main-dark2 rounded-lg">
      {showAlert && (
        <Alert message={alertMessage} color={alertColor} instructions={alertInstructions} />
      )}
      {isLoading ? (<Spinner />) : (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 border-2 border-primary-500 bg-black">
          <div className="w-60 h-14 relative m-4 ">
            <div className="left-[62.01px] top-[5.31px] absolute  text-white text-4xl font-bold font-['DM Sans'] leading-10">QA Portal</div>
            <div className="w-12 h-14 left-0 top-0 absolute">
              <div className="w-8 h-8 left-[24px] top-[-1.86px] absolute origin-top-left rotate-[30deg] bg-indigo-600" />
              <div className="w-7 h-7 left-[-0.21px] top-[13.55px] absolute origin-top-left rotate-[30deg] bg-sky-400" />
              <div className="w-7 h-7 left-[24px] top-[27.53px] absolute origin-top-left rotate-[-30deg] bg-purple-600" />
            </div>
          </div>
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-black border-primary-800">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl ">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
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
                <button type="submit" onClick={handleSubmit} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={isSubmitDisabled}>Sign in</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>)}
    </section>
  )
}