import { useSelector } from 'react-redux';

import styles from './questions.css'

// Import the thunk creator
import { getquestions } from '../../store/questions';
import { useParams } from 'react-router';
import { useState } from 'react';
import useToggle from '../../Hooks/useToggle';


const QuestionsContainer = ({question}) => {

  const [showComment, toggleComment] = useToggle("false")




  const questions = useSelector(state => state.questions)
console.log(questions)



  return (
        <div className="questionDiv">
          <div className="questionBody">
           {question.body}
          </div>
          {/* <div className="userId">
            question.userId:{question.userId}
          </div> */}
          <ul className="Comments">
            {question.Comments? <button onClick= {toggleComment}>Show Comments</button>: "" }
            <button> Add Comments</button>
          {showComment && question.Comments?.map((comment) => <li> {comment.body} </li>)}

          </ul>
        </div>

  );
};

export default QuestionsContainer;
