import { useSelector } from 'react-redux';

import styles from './questions.css'

// Import the thunk creator
import { getquestions } from '../../store/questions';
import { useParams } from 'react-router';
import { useState } from 'react';



const QuestionsContainer = ({question}) => {

  const [showComment, setShowComment] = useState("false")



  const questions = useSelector(state => state.questions)


  function clickHandler(){
  return setShowComment("true")
  }

  return (
        <div className="questionDiv">
          <div className="questionBody">
           {question.body}
          </div>
          <div className="userId">
            question.userId:{question.userId}
          </div>
            <button onClick={clickHandler}>
          <ul className="Comments">
          {question.Comments?.map((comment) => <li> {comment.body} </li>)}
          </ul>
          </button>
        </div>

  );
};

export default QuestionsContainer;
