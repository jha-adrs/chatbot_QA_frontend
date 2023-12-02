import _ from 'lodash'
import { BrainCircuit } from 'lucide-react'
import React, { useEffect } from 'react'

const QAComponent = ({ questions,isAnswerFetching ,answers}) => {
    useEffect(() => {
        console.log('QAComponent', questions,answers)

    }, [questions,answers])

    return (
        <div className='py-10 h-screen'>
            {
                questions?.length === 0 ? <InitialComponent /> : <QAPopulatedComponent questions={questions} answers={answers}  />
            }
        </div>
    )
}

export default QAComponent

// Not exported components
const InitialComponent = () => {
    return (
        <div className='flex  flex-col items-center justify-center h-full w-full '>
            <div className='flex flex-col items-center justify-center'>
                <BrainCircuit className='w-10 h-10 inline-block text-white my-4 rotate-90' />
                <h1 className='text-5xl font-bold text-center'>
                    Chatbot
                </h1>
                <h3 className='pt-4 font-semibold text-gray-400'>
                    Alpha v0.5
                </h3>
                <p className='text-gray-500 pt-4 text-center'>
                    Please note that information provided here is not guaranteed to be correct.
                    <br />Please refer to official sources for accurate information.
                    <br />
                </p>
            </div>
        </div>
    )
}

const QAPopulatedComponent = ({ questions,answers }) => {
    return (
        <div className="flex w-screen h-screen justify-center">
            <div className='flex flex-col h-full w-[75%] sm:w-[60%] md:w-[50%] '>
                <div className='px-5 py-5 justify-start  w-full h-full'>
                    {questions?.map((question, index) => {
                        // For each question and answer, we need to render a QAComponent
                        // We need to check if the answer is present or not
                        // If answer is present, we need to render the answer and question
                        return (
                            <>
                            
                            <MiniTextComponent key={question?.uuid} type='question' text={question?.question} />
                            {answers && answers?.length > 0 && answers?.map((answer, index) => {
                                if (answer?.uuid === question?.uuid) {
                                    return (
                                        <MiniTextComponent key={answer?.answer_uuid} type='answer' text={answer?.answer} />
                                    )
                                }
                            })}
                                
                            </>
                        )

                    })}
                </div>

            </div>
        </div>
    )
}

const MiniTextComponent = ({ type, text }) => {

    const chatbotDiv = <div className='w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center'>
        <p className='font-medium text-xs p-0 m-0'>
            <BrainCircuit className='w-4 h-4 text-white font-medium' />
        </p>
    </div>
    const userDiv = <div className='w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center'>
        <p className='font-light text-xs p-0 m-0'>
            AJ
        </p>
    </div>
    if (text === null) return (<></>)
    return (
        <div className='flex flex-row items-center justify-start mb-4'>
            <div className="flex flex-col">
                <div className="flex">
                    {type == 'question' ? chatbotDiv : userDiv}
                    <p className='text-gray-300 text-sm font-extrabold ml-2'>{type == 'question' ? "You" : "UniChat"}</p>
                </div>
                <div className='ml-6'>
                    <p className='text-gray-300 text-sm font-medium ml-2 w-full overflow-auto break-all'>{text}</p>
                </div>
            </div>
        </div>
    )
}