import React, { useRef, useState } from "react";  
import './Quiz.css';  
import { data } from "../../assets/data";  

const Quiz = () => {  
    const [index, setIndex] = useState(0);  
    const [questions, setQuestions] = useState(data[index]);  
    const [lock, setLock] = useState(false);  
    const [score, setScore] = useState(0);  
    const [result, setResult] = useState(false);  
    const option1 = useRef(null);   
    const option2 = useRef(null);   
    const option3 = useRef(null);   
    const option4 = useRef(null);   

    const option_array = [option1, option2, option3, option4];   

    const checkAns = (e, ans) => {  
        if (!lock) {  
            if (questions.ans === ans) {  
                e.target.classList.add("correct");  
                setLock(true);  
                setScore(prev => prev + 1);  
            } else {  
                e.target.classList.add("wrong");  
                option_array[questions.ans - 1].current.classList.add("correct");  
                setLock(true);  
            }  
        }  
    };  

    const next = () => {  
        if (lock) {  
            if (index === data.length - 1) {  
                setResult(true);  
                return;  
            }  
            setIndex(prevIndex => prevIndex + 1);  
            setQuestions(data[index + 1]);  
            setLock(false);  

            option_array.forEach(option => {  
                option.current.classList.remove("wrong");  
                option.current.classList.remove("correct");  
            });  
        }  
    };  

    const reset = () => {  
        setIndex(0);  
        setQuestions(data[0]);  
        setScore(0);  
        setLock(false);  
        setResult(false);  
    };  

    return (  
        <div className="container">  
            {result ? (  
                <div>  
                    <h2>Your Score: {score}/{data.length}</h2>  
                    <button onClick={reset}>Restart Quiz</button>  
                </div>  
            ) : (  
                <>  
                    <div className="index">Question {index + 1} of {data.length}</div>  
                    <h2>{questions.question}</h2>  
                    <ul>  
                        <li ref={option1} onClick={(e) => checkAns(e, 1)}>{questions.option1}</li>  
                        <li ref={option2} onClick={(e) => checkAns(e, 2)}>{questions.option2}</li>  
                        <li ref={option3} onClick={(e) => checkAns(e, 3)}>{questions.option3}</li>  
                        <li ref={option4} onClick={(e) => checkAns(e, 4)}>{questions.option4}</li>  
                    </ul>  
                    <button onClick={next}>Next</button>  
                </>  
            )}  
        </div>  
    );  
};  

export default Quiz;