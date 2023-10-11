import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config/config'
import Alert from './Alert'
import Spinner from './Spinner'
import { useAppContext } from '../context/context';
const DataTable = () => {
  const { category } = useAppContext();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [hasQuestions, setHasQuestions] = useState(true);
  const [error, setError] = useState(null);
  const dataFetched = useRef(false);
  const categoryRef = useRef(category);

  useEffect(() => {
    document.title = 'Dashboard';

    // Check if the category has changed
    if (categoryRef.current !== category) {
      categoryRef.current = category;
      dataFetched.current = false;
      console.log("Changing") // Reset the flag when category changes
    }

    if (!dataFetched.current) {
      setIsLoading(true);
      setError(null);
      setQuestions([]);
      setAnswers({});
      setHasQuestions(true);
      console.log('Fetching data')
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        console.log('Access token found');
        axios
          .post(`${config.SERVER_URL}/api/fetch/${category}`, {
              limit: 10,
              user_id: localStorage.getItem('user_id'),
          },{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            }
          })
          .then(({ data }) => {
            const res = { data: data.data }
            console.log("res", res);
            if (res.data.length === 0) {
              setHasQuestions(false);
              dataFetched.current = true; // Mark data as fetched
            }
            setQuestions(res.data);
            setIsSubmitDisabled(false);
          })
          .catch((err) => {
            console.log(err);
            if (err.response && err.response.status === 401) {
              console.log('Access token expired');
              localStorage.clear();
              navigate('/login');
            } else if (err.response && err.response.status === 500) {
              console.log('Internal server error');
              setError('An error occurred while submitting data.');
              dataFetched.current = false; // Reset the flag when an error occurs
            }
          })
          .finally(() => {
            setIsLoading(false);
            //dataFetched.current = true; // Mark data as fetched
          });
      } else {
        console.log('No access token');
        navigate('/login');
        setIsLoading(false);
      }
    }
  }, [category]);

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const user_id = localStorage.getItem('user_id');
    setIsLoading(true);
    setIsSubmitDisabled(true);

    const answerArray = Object.keys(answers).map((question_id) => ({
      question_id,
      answer_text: answers[question_id]
    }));

    console.log(accessToken, answerArray);

    await axios
      .post(
        `${config.SERVER_URL}/api/insertmultiple/${category}`,
        {
          user_id: user_id,
          data:answerArray,
         
        }, // Send the data as the request body
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          console.log('Access token expired');
          localStorage.clear();
          navigate('/login');
        } else if (err.response && err.response.status === 500) {
          setError('An error occurred while submitting data.');
        }
      })
      .finally(() => {
        setIsLoading(false);
        setIsSubmitDisabled(false);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    dataFetched.current = false; // Reset the flag when error occurs
    return <Alert message={error} color="red" />;
  }

  if (questions.length === 0) {
    return hasQuestions ? (
      <Spinner />
    ) : (
      <Alert
        message="No questions found for this category"
        color="red"
        instructions="Please change to a different category"
      />
    );
  }


  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left  text-gray-400">
          <thead className="text-xs  uppercase bg-gray-700 text-white">
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
                <tr key={question.question_id} className=" border-2 bg-gray-700/30 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black">
                  <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                    {question.question_id}
                  </th>
                  <td className="px-6 py-4  text-lg">
                    {question.question_text}
                  </td>
                  <td className="px-6 py-4">
                    {question.tag}
                  </td>
                  <td className="px-6 py-4">
                    <input onChange={(e) => { setAnswers({ ...answers, [question.question_id]: e.target.value }) }} name="answer" placeholder="Answer" 
                    className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700/30 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required="" />
                  </td>
                  <td className="px-6 py-4 text-right">
                  </td>
                </tr>
              )
            ))}
            <tr>
              <td colSpan="5" className="px-6 py-4 text-right">
                <button type="submit" onClick={handleSubmit} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 p-10 rounded-lg shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] ease-out hover:translate-y-1 transition-all " disabled={isSubmitDisabled}>
                  {isLoading ? (<Spinner />) : "Submit All"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable