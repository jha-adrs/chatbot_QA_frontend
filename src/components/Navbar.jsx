import React, { useState, useContext, useRef } from 'react'
import { useAppContext } from '../context/context';
import config from '../config/config';
const Navbar = () => {
    const {category, updateCategory} = useAppContext();
    const dropdownRef = useRef(null)
    const changeCategory = (value)=>{
        updateCategory(value)
        console.log("changeCategory called", value, config.CATEGORY_MAP[value], category )
    }
    
    const [showtoggle, setShowtoggle] = useState(false)
    const handleToggle = () => {
        setShowtoggle(!showtoggle)
    }
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    document.addEventListener('click', function (event) {
        const dropdown = dropdownRef.current
        if (dropdown && !dropdown.contains(event.target)) {
            setShowtoggle(false)
        }
    })

    const handleSignout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (<>

        <nav className="fixed top-0 left-0 right-0 bg-white border-white dark:bg-gray-900 z-20 h-18">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="w-20 h-10 relative">
                    <div className="left-[62.01px] top-[5.31px] relative text-white text-md font-bold leading-10">QA Portal</div>
                    <div className="w-10 h-10 left-0 top-0 absolute">
                        <div className="w-8 h-8 left-[24px] top-[-1.86px] absolute origin-top-left rotate-[30deg] bg-indigo-600" />
                        <div className="w-7 h-7 left-[-0.21px] top-[13.55px] absolute origin-top-left rotate-[30deg] bg-sky-400" />
                        <div className="w-7 h-7 left-[24px] top-[27.53px] absolute origin-top-left rotate-[-30deg] bg-purple-600" />
                    </div>
                </div>
                <div ref={dropdownRef} className="relative flex items-center md:order-2">
                    <button type="button" onClick={handleToggle} className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-primary-700 dark:hover:bg-primary-700 dark:hover:text-white border-2 rounded-md border-primary-700 hover:border-white">
                        <svg className='w-5 h-5 mr-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                        Question Category ({capitalize(category)})
                    </button>
                    <button onClick={handleSignout} className='ml-8 inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-danger-700 dark:hover:bg-danger-700 dark:hover:text-white border-2 rounded-md border-danger-700 hover:border-white'>
                        Signout
                    </button>
                    {showtoggle && (
                        <div className=" absolute left-0 top-0 mt-10 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-black" id="language-dropdown-menu">
                            <ul className="py-2 font-medium" role="none">
                                <li>
                                    <div onClick={()=>{changeCategory(1)}} className=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                        <div className="inline-flex items-center">
                                         {category=='try'?"✅":""}   1. TRY
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={()=>{changeCategory(2)}} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                        <div className="inline-flex items-center">
                                        {category=='fee'?"✅":""} 2. Fee
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={()=>{changeCategory(3)}} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                        <div className="inline-flex items-center">
                                        {category=='academics'?"✅":""} 3. Academics
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={()=>{changeCategory(4)}} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                        <div className="inline-flex items-center">
                                        {category=='admission'?"✅":""} 4. Admissions
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={()=>{changeCategory(5)}} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                        <div className="inline-flex items-center">
                                        {category=='infrastructure'?"✅":""} 5. Infrastructure
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    )}

                    <button data-collapse-toggle="navbar-language" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-language" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-language">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-transparent md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <a href="/dashboard" className="block py-2 pl-3 pr-4 text-white bg-primary-700 rounded md:bg-transparent md:text-primary-700 md:p-0 md:dark:text-primary-500" aria-current="page">Home</a>
                        </li>
                        
                        <li>
                            <a href="/answered" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">See answered</a>
                        </li>
                        <li>
                            <a href="/useranswered" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Your answers</a>
                        </li>
                        <li> 
                            <a href="/creators" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact Admin</a>
                        </li>
                        <li>
                            <a href="/about" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
    )
}

export default Navbar
