import useToggle from '../../Hooks/useToggle';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import EditQuestionForm from '../EditQuestionForm';
import CommentForm from '../CommentForm';
import { removeQuestion } from '../../store/questions';
import { removeComment } from '../../store/comments';
import { getComments } from '../../store/comments';
import { getquestions } from '../../store/questions';
import { useHistory } from 'react-router';
import { getQuestionComments } from '../../store/comments';
import { useOpen } from '../../context/commentModal'
import LikeBtn from '../LikeBtn';
import './questions.css'


const QuestionsContainer = ({question}) => {
const dispatch = useDispatch()
const history = useHistory()

const {openComment,setOpenComment,setQuestionId} = useOpen()

const sessionUser = useSelector(state => state.session.user.username)

  const [showComment, toggleComment] = useToggle("true")
  const [showForm, setShowForm] = useState(false);
  const [commentForm,setCommentForm] = useState(false)


  const comments = useSelector(state => {
    return state.comments[question.id]
})

  const handleDelete = async (e) => {
    e.preventDefault()
    await dispatch(removeQuestion(question.id))
    history.push(`/feed`)

  }

  const deleteComments = async (id,e) => {
    e.preventDefault()
    await dispatch(removeComment(id)).then(() => {
      dispatch(getQuestionComments(question.id))
    })

  }

  useEffect(() => {
    dispatch(getQuestionComments(question.id))
  },[question.id])



  const onClick = () => {
    setQuestionId(question.id)
    setOpenComment(true)

  }

  return (
        <div className="questionDiv">

          <div className="questionBody">
            <div className="userName"> {sessionUser} Says: </div>
           {question.body}
           {showForm && <EditQuestionForm questionId={question.id} />}
           <button className="editQuestionBtn" onClick={()=>setShowForm(true)}><i class="fas fa-edit"></i></button>
          </div>

          {/* <div className="userId">
            {sessionUser.username}
          </div> */}

          <ul className="Comments">
            {question.Comments? <button className="commentBtn" onClick= {toggleComment}>Show Comments</button>: "" }

          {comments && comments?.map((comment) => <div> <div className="userName"> {sessionUser} Answers: </div>{comment.body}
           <button className="deleteComment" onClick = {(e)=>deleteComments(comment.id,e)}>Delete Comment</button> </div>)}


           {openComment && <CommentForm questionId={question.id} />}
          <button className="addComment" onClick={onClick}><i class="fas fa-plus-square"></i></button>

          <form onSubmit={handleDelete}>
          <button className="deleteQuestion" type="submit"><i class="fas fa-trash-alt"> </i></button>
        </form>
        <div className="likeBtn">
           <LikeBtn />
           </div>


          </ul>
        </div>


  );
};

export default QuestionsContainer;
