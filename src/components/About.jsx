
const About = () => {
    document.title = "About | QA Portal"
    return (
        <div className="p-10 bg-gray-700/30 rounded-xl shadow-lg relative mt-10 bg-gradient-to-r  p-4">
            <div className='p-10 rounded-lg shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-white bg-gray-500/30  ease-out hover:translate-y-1 transition-all rounded'>
                <h1 className="text-4xl mb-4 text-center font-semibold">About University Chatbot</h1>
                <p className="mb-2 text-center">
                    This platform is a question answering system designed to collect data for training a chatbot application.
                </p>
                <p className="text-center">
                    The chatbot is specifically tailored for VIT Vellore, the questions are designed to be relevant to the university and its students and has <b>no affiliation with the university itself</b>.
                </p>
            </div>
            <hr className="my-6 border-t-2 border-gray-300" />

            <div className="p-10 rounded-lg shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-white bg-gray-500/30 ease-out hover:translate-y-1 transition-all rounded">
                <h2 className="text-3xl mb-4 font-semibold">Purpose</h2>
                <p className="mb-2">
                    The primary purpose of this platform is to facilitate the collection of data for training a chatbot application. This data is collected through a question-answering system that allows users to interact with the chatbot, asking it questions and providing it with data through their responses.
                </p>
            </div>
            <hr className="my-6 border-t-2 border-gray-300" />

            <div className="p-10 rounded-lg shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-white bg-gray-500/30  ease-out hover:translate-y-1 transition-all rounded">
                <h2 className="text-3xl mb-4 font-semibold">Technologies</h2>
                <p className="mb-2">
                    This platform is built using React, a popular JavaScript library for building user interfaces, and Tailwind CSS, a utility-first CSS framework for rapidly building custom designs. For the backend, we use a cloud-based NodeJS container which further connects to a MySQL database for storing crucial info.
                </p>
            </div>
            <hr className="my-6 border-t-2 border-gray-300" />
            <footer className="flex  items-center py-4">
                
                
                <a href="https://github.com/myusername/myrepository" target="_blank" rel="noopener noreferrer" className="flex items-center text-black p-2 shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black bg-white ease-out hover:translate-y-1 transition-all rounded">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="w-7 h-7 mr-2">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                    </svg>
                    View on GitHub
                </a>

            </footer>
        </div>
    )
}

export default About;
