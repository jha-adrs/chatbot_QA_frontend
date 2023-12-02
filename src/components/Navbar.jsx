import { useState, useRef } from 'react'
import { useAppContext } from '../context/context';
import {Link, useLocation , useNavigate} from 'react-router-dom';
import config from '../config/config';
import { ChevronDownCircle } from 'lucide-react';
const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { category, updateCategory } = useAppContext();
    const dropdownRef = useRef(null)
    const changeCategory = (value) => {
        updateCategory(value)
        setShowtoggle(false)
        
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
        navigate('/')
    }
    const handleMenuToggle = () => {
        const navbarLanguage = document.getElementById('navbar-language')
        if (navbarLanguage.classList.contains('hidden')) {
            navbarLanguage.classList.remove('hidden')
            navbarLanguage.classList.add('block')
        } else {
            navbarLanguage.classList.remove('block')
            navbarLanguage.classList.add('hidden')
        }
    }
    return (<>

        <nav className="fixed top-0 left-0 right-0  border-white bg-gray-900 z-20 h-15">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
               
                <div ref={dropdownRef} className="relative flex items-center md:order-2">
                    <button type="button" onClick={handleToggle} className="inline-flex items-center font-medium justify-center px-4  text-sm text-white  cursor-pointer hover:bg-zinc-800 hover:text-white border-none rounded-md  ">
                        <ChevronDownCircle className="w-5 h-5 mr-2" />
                        Question Category ({capitalize(category)})
                    </button>
                    <button onClick={handleSignout} className='mx-8  items-center font-medium justify-center px-4  text-sm bg-transparent text-white  cursor-pointer hover:bg-danger-700   rounded-md  '>
                        Signout
                    </button>
                    {showtoggle && (
                        <div className=" absolute left-0 top-0 mt-10 z-50 text-base list-none  divide-y divide-gray-100 rounded-lg shadow bg-black" id="language-dropdown-menu">
                            <ul className="py-2 font-medium" role="none">
                                
                                <li>
                                    <div onClick={() => { changeCategory(1) }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                        <div className="inline-flex items-center">
                                            {category == 'fee' ? "✅" : ""} 1. Fee
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={() => { changeCategory(2) }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                        <div className="inline-flex items-center">
                                            {category == 'academics' ? "✅" : ""} 2. Academics
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={() => { changeCategory(3) }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                        <div className="inline-flex items-center">
                                            {category == 'admission' ? "✅" : ""} 3. Admissions
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={() => { changeCategory(4) }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                        <div className="inline-flex items-center">
                                            {category == 'infrastructure' ? "✅" : ""} 4. Infrastructure
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div onClick={() => { changeCategory(5) }} className=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                        <div className="inline-flex items-center">
                                            {category == 'try' ? "✅" : ""}   5. TRY
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    )}

                    <button onClick={handleMenuToggle} data-collapse-toggle="navbar-language" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-language" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
            
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-language">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 md:mt-0 md:border-0   dark:border-gray-700">
                        <li>
                            <Link to="/dashboard" className={`block py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 md:dark:hover:text-primary-500 dark:hover:bg-gray-700  md:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname == '/dashboard' ? 'text-primary-700 ' : 'text-white'}`} >Home</Link>
                        </li>
                        <li>
                            <Link to="/answered" className={`block py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0  md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname == '/answered' ? 'text-primary-700' : 'text-white'}`}>See answered</Link>
                        </li>
                        <li>
                            <Link to="/useranswered" className={`block py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname == '/useranswered' ? 'text-primary-700' : 'text-white'}`}>Your answers</Link>
                        </li>
                        <li>
                            <Link to="/about" className={`block py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0  md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname == '/about' ? 'text-primary-700' : 'text-white'}`}>About</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
    )
}

export default Navbar
