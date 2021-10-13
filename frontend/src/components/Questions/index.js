import styles from './questions.css'
import useToggle from '../../Hooks/useToggle';
// import { useSelector } from 'react-redux';
import EditQuestionForm from '../EditQuestionForm';

const QuestionsContainer = ({question}) => {

  const [showComment, toggleComment] = useToggle("true")

  return (
        <div className="questionDiv">
          <div className="questionBody">
           {question.body}
          </div>
          {/* <div className="userId">
            {sessionUser.username}
          </div> */}
          <ul className="Comments">
            {question.Comments? <button onClick= {toggleComment}>Show Comments</button>: "" }
          {showComment && question.Comments?.map((comment) => <div> {comment.body} <button className="editComment">Edit Comment</button> <button className="deleteComment">Delete Comment</button> </div>)}
          <button> Add Comments</button>
          {/* <button>Edit Question <EditQuestionForm /></button> */}
          <button> Delete Question </button>
          </ul>
        </div>


  );
};

export default QuestionsContainer;
