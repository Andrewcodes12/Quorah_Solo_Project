import useToggle from '../../Hooks/useToggle';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import EditQuestionForm from '../EditQuestionForm';
import CommentForm from '../CommentForm';
import { removeQuestion } from '../../store/questions';
import { useHistory } from 'react-router';


import './questions.css'


const QuestionsContainer = ({question}) => {
const dispatch = useDispatch()
const history = useHistory()

  const sessionUser = useSelector((state) => state.session.user);

  const [showComment, toggleComment] = useToggle("true")
  const [showForm, setShowForm] = useState(false);
  const [commentForm,setCommentForm] = useState(false)


  const handleDelete = async (e) => {
    e.preventDefault()
    await dispatch(removeQuestion(question.id))
    history.push(`/feed`)
  }


  return (
        <div className="questionDiv">

          <div className="questionBody">
           {question.body}
           {showForm && <EditQuestionForm questionId={question.id} />}
           <button className="editQuestionBtn" onClick={()=>setShowForm(true)}><i class="fas fa-edit"></i></button>
          </div>

          {/* <div className="userId">
            {sessionUser.username}
          </div> */}

          <ul className="Comments">
            {question.Comments? <button className="commentBtn" onClick= {toggleComment}><i class="fas fa-comments"></i></button>: "" }
          {showComment && question.Comments?.map((comment) => <div> {comment.body} <button className="editComment">Edit Comment</button> <button className="deleteComment">Delete Comment</button> </div>)}
          
          {commentForm && <CommentForm questionId={question.id} />}
          <button className="addComment" onClick={()=>setCommentForm(true)}><i class="fas fa-plus-square"></i></button>

          <form onSubmit={handleDelete}>
          <button className="deleteQuestion" type="submit"><i class="fas fa-trash-alt"> </i></button>
        </form>
          </ul>
        </div>


  );
};

export default QuestionsContainer;
