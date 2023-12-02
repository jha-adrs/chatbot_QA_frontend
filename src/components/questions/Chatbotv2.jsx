import { Brain, BrainCircuit, ChevronFirst, ChevronUp, Home, LogIn, LogOut, PenSquare, Search, ShieldQuestion, Upload } from 'lucide-react'
import React, { useState } from 'react'
import "../../assets/extra.css"
import { TooltipWrapper } from '../Helpers'
import QAComponent from './QAComponent'
import { z } from "zod"
import { v4 as uuidv4 } from 'uuid';
const questionSchema = z.object({
    question: z.string().max(1000).min(1),

})
const Chatbotv2 = () => {
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [textInput, setTextInput] = useState('');
    const [isAnswerFetching, setIsAnswerFetching] = useState(false);
    const [rerender, setRerender] = useState(0);

    const handleAnswering = (textInput) => {
        console.log('handleAnswering', textInput);
        setIsAnswerFetching(true);
        const uuid = uuidv4();
        const timestamp = Date.now();
        // Store the current input value in a variable

        setQuestions([...questions, { uuid: uuid, question: textInput, timestamp: timestamp }]);
        setRerender(rerender + 1);
        setTextInput('');
        setTimeout(() => {
            {
                setAnswers([...answers, { uuid: uuid, question: textInput, timestamp: timestamp, answer: 'This is a dummy answer'+rerender, answer_uuid: uuidv4(), answer_timestamp: Date.now() }]);
                setRerender(rerender + 1);
                setIsAnswerFetching(false);
            }
        }, 1000);

    };

    return (
        <div className='flex flex-col'>
            {/** Upper nav */}
            <div className='fixed items-center top-0 w-full bg-zinc-800 h-10 justify-between flex'>
                <div className='mx-4 inline-flex gap-x-8 cursor-pointer'>
                    <TooltipWrapper Component={Home} text='Home' classnames='w-4 h-4 text-white cursor-pointer' />
                    <TooltipWrapper Component={PenSquare} text='New Chat' classnames='w-4 h-4 text-white cursor-pointer' />
                </div>
                <div>
                    <p className="font-bold text-lg gap-x-2 inline-flex items-center">
                        <TooltipWrapper Component={BrainCircuit} text="Home" classnames="w-5 h-6 text-white cursor-pointer" />  UniChat
                    </p>
                </div>
                <div className='mx-4 inline-flex gap-x-8 cursor-pointer'>
                    <TooltipWrapper Component={ShieldQuestion} text='Help' classnames='w-4 h-4 text-white cursor-pointer' />
                    <TooltipWrapper Component={LogOut} text='Logout' classnames='w-4 h-4 text-white cursor-pointer' />
                </div>
            </div>

            {/** Main */}
            {/*Dont give padding here or margin */}
            <div className="bg-zinc-900  overflow-clip h-screen w-screen items-center ">
                <QAComponent key={rerender} questions={questions} isAnswerFetching={isAnswerFetching} answers={answers} />
            </div>

            {/*Lower Input component*/}
            <div className="absolute z-20 bottom-5 w-full h-[10%] rounded-t-lg flex items-center justify-center">
                <div className='w-[75%] sm:w-[60%] md:w-[50%]  bg-zinc-800 rounded-lg h-12  max-h-32'>
                    <div className=' flex flex-row w-full flex-grow items-center '>
                        <Search className='w-4 h-4 text-white  my-2 mx-2' />
                        <input style={{ resize: 'none', outline: 'none', overflow: 'hidden' }}
                            placeholder='Ask UniChat...' name="" id="" cols="30" rows="1"
                            onChange={(e) => setTextInput(e.target.value)}
                            value={textInput}
                            className='m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 md:py-3.5 md:pr-12 placeholder-white/50 pl-3 md:pl-4'
                            autoFocus />
                        <button className='rounded-lg bg-zinc-700 mr-3 hover:bg-zinc-600'
                            onClick={(e) => {
                                handleAnswering(textInput);
                            }}
                            disabled={textInput.length === 0 || isAnswerFetching}
                        >
                            <LogIn className=' w-4 h-4 mx-2  text-white cursor-pointer my-2 ' />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Chatbotv2
