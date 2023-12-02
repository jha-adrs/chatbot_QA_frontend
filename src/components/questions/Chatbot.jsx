"use client"
import { useState } from 'react';
import config from '../../config/config';
import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, HomeIcon, LogInIcon, LogOutIcon, Search } from 'lucide-react';
export default function Chatbot() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user_id = localStorage.getItem('user_id');
  const accessToken = localStorage.getItem('accessToken');
  if (!user_id || !accessToken) {
    navigate('/login');
  }
  const answerQuestion = async (e) => {
    try {
      console.log('answerQuestion');
      e.preventDefault();
      setAnswer('');
      setLoading(true);

      const response = await fetch(`${config.SERVER_URL}/chat/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          query: question,
          user_id: user_id,
        }),
      });
      if (response.success === 0) {
        setLoading(false);
        setAnswer('Sorry, I cant answer your question. Try again later, ig?');
      }

      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setAnswer((prev) => prev + chunkValue);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setAnswer('Sorry, I cant answer your question. Try again later, ig?');
      setLoading(false);
    }
  };
  const handleSignout = () => {
    localStorage.clear();
    navigate('/login')
  }
  return (

    <div className={` mx-auto px-6 sm:px-12 lg:px-48 inset-0 bg-gray-400/10 rounded-lg h-[98%] w-[95%]`}>
      <div className=' top-{0.1rem}  flex flex-row'>
        <Link to='/dashboard' className=' text-white   font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:bg-zinc-900 hover:text-green'>
          <HomeIcon />
        </Link>
        <Link onClick={handleSignout} className=' text-white   font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent hover:bg-zinc-900 hover:text-red-800'>
          <LogOutIcon />
        </Link>
      </div>
      <div className='p-8'>
        <div className='p-8'>
          <h1 className='text-5xl font-bold text-center'>
            Chatbot  <BrainCircuit className='w-10 h-10 inline-block text-white' />
          </h1>
          <h3 className='pt-4 font-semibold text-gray-400'>
            Alpha v0.1
          </h3>
          <p className='text-gray-500 pt-4'>
            Please note that informartion provided here is not guaranteed to be correct.
            <br />Please refer to official sources for accurate information.
            <br />
          </p>

        </div>
        <form>
          <label
            htmlFor='default-search'
            className='mb-2 text-sm font-medium text-gray-100 sr-only'
          >
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <Search className='w-5 h-5 text-gray-500' />
            </div>
            <input
              type='search'
              id='default-search'
              className='block text-left w-full p-4 pl-10 text-sm text-gray-100 border border-gray-300 rounded-lg bg-zinc-900 focus:ring-primary-500 '
              placeholder='Ask me about VIT University'
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  answerQuestion(e);
                }
              }}
              required
            />
            <button
              type='submit'
              className='text-black absolute right-2.5 bottom-2.5 bg-white hover:bg-zinc-200 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2'
              onClick={answerQuestion}
            >
              <LogInIcon className='p-0 m-0 w-4 h-4' />
            </button>
          </div>
        </form>
        <div className='mt-16 min-height-100'>
          {loading && answer.length === 0 && (
            <div className='flex justify-center items-center'>
              <div role='status'>
                <svg
                  aria-hidden='true'
                  className='w-8 h-8 mr-2 text-gray-100 animate-spin  fill-blue-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
          <div className="justify-center text-left w-[100%] h-[50%] bg-zinc-900/50 p-4">
            <p className='text-lg leading-8 text-gray-100'>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

