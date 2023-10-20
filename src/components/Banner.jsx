import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Banner = ({close,...props}) => {

    return (

        <div id="informational-banner" tabIndex="-1" className="fixed bottom-0 left-0 z-50 flex flex-col justify-between w-full p-4 border-b border-gray-200 md:flex-row bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
        {...props}>
            <div className="mb-4 md:mb-0 md:mr-4">
                <h2 className="mb-1 text-base font-semibold text-white">Inital Version of Chatbot is out!!</h2>
                <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">You can checkout the chatbot feature trained on very limited data here</p>
            </div>
            <div className="flex items-center flex-shrink-0">

                <Link  to="/chat" className="inline-flex items-center justify-center px-3 py-2 mr-2 text-xs font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-gray-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-gray-800">Get started <svg className="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
                </Link>
                <button 
                onClick={close}
                data-dismiss-target="#informational-banner" type="button" className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-white rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close banner</span>
                </button>
            </div>
        </div>

    )
}

export default Banner

Banner.propTypes = {
    close: PropTypes.func.isRequired,
    
  };