import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import Alert from './Alert';
import config from '../config/config';
import Spinner from './Spinner';

const verifyOTP = async (otp, email) => {
    return fetch(`${config.SERVER_URL}/users/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ otp, email })
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



const OTPVerification = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('')
    const email = localStorage.getItem('email')
    const [alertDetails, setAlertDetails] = useState({ showAlert: false, alertMessage: '', alertInstructions: '' })
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [secondsRemaining, setSecondsRemaining] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!email) {
            navigate('/login')
        }
        let intervalId;
        if (isTimerActive && secondsRemaining > 0) {
            intervalId = setInterval(() => {
                setSecondsRemaining(seconds => seconds - 1);
            }, 1000);
        } else {
            setIsTimerActive(false);
            setSecondsRemaining(0);
        }
        return () => clearInterval(intervalId);


    }, [email, navigate, isTimerActive, secondsRemaining]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!otp || otp.length !== 4) {
            setAlertDetails({ showAlert: true, alertMessage: "Please fill all the fields!", alertInstructions: "Make sure you have filled all four digits" })
            setIsLoading(false);
            return
        }
        if (!email) {
            setAlertDetails({ showAlert: true, alertMessage: "Please login again!  ", alertInstructions: "Redirecting to login screen" })
            setIsLoading(false);
            return navigate('/login');
        }
        const response = await verifyOTP(otp, email);
        if (response.success) {
            // Store the token and user_id in local storage
            localStorage.clear();
            localStorage.setItem('user_id', response.user_id);
            localStorage.setItem('accessToken', response.token);
            setIsLoading(false);
            setAlertDetails({ showAlert: true, alertMessage: "OTP Verified!", alertInstructions: "Redirecting to login screen" })
            return navigate('/select')
        }
        else {
            if (response.message === "OTP Expired") {
                setAlertDetails({ showAlert: true, alertMessage: "OTP Expired!", alertInstructions: "Resending OTP" })

                await handleResendOTP();
                setIsLoading(false);
            }
            if(response.message === "User already verified"){
                setAlertDetails({ showAlert: true, alertMessage: "User already verified!", alertInstructions: "Redirecting to login screen" })
                setIsLoading(false);
                return setTimeout(() => navigate('/login'), 2000);
            }

            setAlertDetails({ showAlert: true, alertMessage: response.message ||"OTP Verification Failed!", alertInstructions:response.instructions|| "Please try generating a new one" })
            setIsLoading(false);
        }

    }

    const handleResendOTP = async () => {
        setIsTimerActive(true);
        setSecondsRemaining(180); // 3 minutes in seconds
        const response = await generateOTP(email);
        if (response.success) {
            setAlertDetails({ showAlert: true, alertMessage: "OTP Sent!", alertInstructions: "Please check your email" })
        }
        else {
            setAlertDetails({ showAlert: true, alertMessage: "OTP Sending Failed!", alertInstructions: "Please try again" })
        }
    };


    return (<>
        {alertDetails.showAlert && (
            <Alert message={alertDetails.alertMessage} instructions={alertDetails.alertInstructions} />
        )}
        <div className="border-2 border-primary-700 relative flex min-h-screen flex-col justify-center overflow-hidden bg-black py-6">

            <div className="relative bg-black px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">

                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="w-60 h-14 relative m-4 ">
                            <div className="left-[62.01px] top-[5.31px] absolute text-white text-4xl font-bold font-['DM Sans'] leading-10">QA Portal</div>
                            <div className="w-12 h-14 left-0 top-0 absolute">
                                <div className="w-8 h-8 left-[24px] top-[-1.86px] absolute origin-top-left rotate-[30deg] bg-indigo-600" />
                                <div className="w-7 h-7 left-[-0.21px] top-[13.55px] absolute origin-top-left rotate-[30deg] bg-sky-400" />
                                <div className="w-7 h-7 left-[24px] top-[27.53px] absolute origin-top-left rotate-[-30deg] bg-purple-600" />
                            </div>
                        </div>
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email,please check your inbox <br /> <span className='font-semibold text-lg'>{email}</span></p>
                        </div>
                        <div className="font-semibold text-xl">
                            <p>Your OTP</p>
                        </div>
                    </div>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        renderSeparator={<span></span>}
                        renderInput={(props) => <input {...props} />}
                        containerStyle={"flex flex-row items-center justify-center space-x-4 w-full "}
                        inputStyle={"w-16 h-16 flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-black focus:bg-gray-800 focus:ring-1 ring-blue-700"}
                        skipDefaultStyles={true}
                        inputType='tel'
                    />
                    <button onClick={handleSubmit} disabled={isLoading}
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 h-12 bg-primary-700 border-none text-white text-sm shadow-sm shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all">
                        {isLoading?(<Spinner />):("Verify Account")}
                    </button>


                    <div className="flex flex-col items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <div className='flex flex-row items-center '>
                        <p>Didn&apos;t recieve code?</p>
                        <button onClick={handleResendOTP} disabled={isLoading||isTimerActive} className="flex flex-row items-center mx-2 text-primary-400 hover:text-white" >
                            Resend
                        </button>
                        </div>
                        {isTimerActive && (
                            <p>Next OTP can be sent in {Math.floor(secondsRemaining / 60)}:{secondsRemaining % 60 < 10 ? '0' : ''}{secondsRemaining % 60}</p>
                        )}
                    </div>
                </div>
            </div>
        </div></>
    )
}

export default OTPVerification