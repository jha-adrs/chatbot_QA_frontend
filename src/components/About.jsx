import React from 'react'

const About = () => {
    return (
        <div className="p-10 bg-main-back2 rounded-xl shadow-lg relative border-2 ">
            <div className='p-10 hover:bg-primary-800 hover:scale-105 transition duration-300 ease-in-out transform rounded-lg'>
                <h1 className="text-4xl mb-4 text-center font-semibold">About University Chatbot</h1>
                <p className="mb-2 text-center">
                    This platform is a question answering system designed to collect data for training a chatbot application.
                </p>
                <p className="text-center">
                    The chatbot is specifically tailored for VIT Vellore, the questions are designed to be relevant to the university and its students.
                </p>
            </div>
            <hr className="my-6 border-t-2 border-gray-300" />

            <div className="p-10 hover:bg-primary-800 hover:scale-105 transition duration-300 ease-in-out transform rounded-lg">
                <h2 className="text-3xl mb-4">Purpose</h2>
                <p className="mb-2">
                    The primary purpose of this platform is to facilitate the collection of data for training a chatbot application. This data is collected through a question-answering system that allows users to interact with the chatbot, asking it questions and providing it with data through their responses.
                </p>
            </div>
            <hr className="my-6 border-t-2 border-gray-300" />

            <div className="p-10 hover:bg-primary-800 hover:scale-105 transition duration-300 ease-in-out transform rounded-lg">
                <h2 className="text-3xl mb-4">Technologies</h2>
                <p className="mb-2">
                    This platform is built using React, a popular JavaScript library for building user interfaces, and Tailwind CSS, a utility-first CSS framework for rapidly building custom designs. For the backend, we use a cloud-based NodeJS container which further connects to a MySQL database for storing crucial info.
                </p>
            </div>
            <hr className="my-6 border-t-2 border-gray-300" />

            <div className="p-10 hover:bg-primary-800 hover:scale-105 transition duration-300 ease-in-out transform rounded-lg">
                <h2 className="text-3xl mb-4">The Team</h2>
                <p className="mb-2">
                    The platform was developed by a dedicated team of developers and researchers at VIT Vellore. Our team is committed to creating a dynamic and interactive platform that effectively trains our chatbot to provide accurate and helpful responses.
                </p>
            </div>
            <hr className="my-6 border-t-2 border-gray-300" />
            <footer className="flex justify-between items-center py-4">
                <p className="text-gray-600">Front-end code publicly available &rarr;</p>
                <a href="https://github.com/myusername/myrepository" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-white">
                    View on GitHub
                </a>
            </footer>
        </div>
    )
}

export default About;
