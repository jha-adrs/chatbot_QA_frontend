import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/context';
import Alert from '../Alert';
import Spinner from '../Spinner';
import config from '../../config/config';

const Answered = () => {
    const pageRef = useRef(1);
    const { category } = useAppContext();
    const navigate = useNavigate();
    const [state, setState] = useState({
        questions: [],
        isLoading: true,
        hasQuestions: true,
        error: null,
        page: pageRef.current,
        limit: 10,
        nextDisabled: false,
        prevDisabled: true,
    });

    const { questions, isLoading, hasQuestions,page, error, limit, nextDisabled, prevDisabled } = state;
    
    const categoryRef = useRef(category);
    const dataFetched = useRef(false);
    
    const fetchQuestions = async () => {
        const accessToken = localStorage.getItem('accessToken');
        console.log("Fetching questions", category , page, pageRef.current, dataFetched.current);
        if (accessToken) {
            try {
                const response = await axios.post(`${config.SERVER_URL}/api/fetchanswered/${category}`, {
                    limit: limit,
                    offset: (page - 1) * limit,
                    user_id: localStorage.getItem('user_id'),
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });
                const questionsData = response.data.data;
                const hasQuestions = questionsData.length === 0 ? false : true;
                
                setState(prevState => ({
                  ...prevState,
                  questions: questionsData, hasQuestions, isLoading: false, error: null,
                  prevDisabled: page === 1, nextDisabled: !hasQuestions
                }));
                dataFetched.current = true;
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    localStorage.clear();
                    navigate('/login');
                } else if (err.response && err.response.status === 500) {
                    setState(prevState => ({ ...prevState, error: 'An error occurred while submitting data.', isLoading: false }));
                }
                dataFetched.current = false;
            }
        } else {
            navigate('/login');
            setState(prevState => ({ ...prevState, isLoading: false}));
        }
    };

    useEffect(() => {
        document.title = 'Answered Questions';
        setState(prevState => ({ ...prevState, isLoading: true, error: null }));
        if (categoryRef.current !== category) {
            categoryRef.current = category;
            dataFetched.current = false;
        }
        if(pageRef.current !== page) {
            pageRef.current = page;
            dataFetched.current = false;
        }

        if (!dataFetched.current) {
            console.log("category fetching again", category);
            fetchQuestions();
        }
    }, [category, navigate,page, limit]);

    const handlePagination = (direction) => {
        const newPage = direction === 'next' ? page+ 1 : page - 1;
        console.log("newPage",direction, page);

        if (newPage >= 1) {
            setState(prevState => ({ ...prevState, isLoading: true, error: null,page:newPage, questions: [], prevDisabled: newPage === 1}));
        }
        console.log("newPage",direction, newPage, page);
    };

    if (error) {
        return <Alert message={error} color="red" />;
    }
    if (isLoading && !error) {
        return <Spinner />;
    }

    


    return (
        <div className='flex border-2 rounded-lg mt-11 '>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    {hasQuestions ? (<><thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                QuestionID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Question
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tag
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Answer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                        <tbody>
                            {questions.map((question) => (
                                (
                                    <tr key={question.question_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {question.question_id}
                                        </th>
                                        <td className="px-6 py-4  text-lg">
                                            {question.question_text}
                                        </td>
                                        <td className="px-6 py-4">
                                            {question.tag}
                                        </td>
                                        <td className="px-6 py-4 text-white font-semibold font-xl">
                                            {question.answer_text}
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium">
                                            <button
                                                type="button"
                                                className="text-white hover:text-primary-500 bg-primary-600 hover:bg-primary-700 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                )
                            ))}
                            <tr>
                                <td colSpan="5" className="px-6 py-4">
                                    <div className="flex justify-between">
                                        <button onClick={()=> handlePagination('prev')} className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 p-10 rounded-lg shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black bg-white ease-out hover:translate-y-1 transition-all " disabled={isLoading||prevDisabled}>
                                            Prev</button>
                                        <button onClick={()=> handlePagination('next')} className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 p-10 rounded-lg shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black bg-white ease-out hover:translate-y-1 transition-all " disabled={isLoading || nextDisabled}>
                                            Next</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody></>) : (
                        <>
                            <tbody>
                                <Alert
                                    message="No questions found for this category"
                                    color="red"
                                    instructions="Please change to a different category"
                                />
                                
                                <tr>
                                    <td colSpan="5" className="px-6 py-4">
                                        <div className="flex justify-between">
                                            <button onClick={()=> handlePagination('prev')} className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 p-10 rounded-lg shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black bg-white ease-out hover:translate-y-1 transition-all " disabled={isLoading || prevDisabled}>
                                                Prev</button>
                                            <button onClick={()=> handlePagination('next')} className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 p-10 rounded-lg shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black bg-white ease-out hover:translate-y-1 transition-all " disabled={isLoading || nextDisabled}>
                                                Next</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </>)}
                </table>
            </div>
        </div>
    )
}

export default Answered;