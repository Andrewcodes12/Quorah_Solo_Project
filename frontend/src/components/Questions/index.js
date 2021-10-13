import useToggle from '../../Hooks/useToggle';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import EditQuestionForm from '../EditQuestionForm';


import './questions.css'


const QuestionsContainer = ({question}) => {


  const sessionUser = useSelector((state) => state.session.user);

  const [showComment, toggleComment] = useToggle("true")
  const [showForm, setShowForm] = useState(false);


      function deleteQuestion(questionId){
        fetch(`/delete/${questionId}`,{
          method:'DELETE'
        }).then((result)=>{
          result.json().then((resp)=>{
            console.log(resp)
          })
        })
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
          <button className="addComment"> <i class="fas fa-plus-square"></i></button>
          <button className="deleteQuestion" onClick={()=> deleteQuestion(question.id)}> <i class="fas fa-trash-alt"> </i></button>
          </ul>
        </div>


  );
};

export default QuestionsContainer;
