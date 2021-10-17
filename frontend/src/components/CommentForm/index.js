import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewComment, getQuestionComments } from "../../store/comments";
import { useOpen } from "../../context/commentModal";

const CommentForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([]);

  const {openComment,setOpenComment,question_id} = useOpen()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])




        const commentInfo = {
        userId: sessionUser.id,
        body,
        questionId:question_id
        }

        try{
          const createdQuestion = await dispatch(createNewComment(commentInfo))

        }catch(res){
        console.error(errors)
        }
        dispatch(getQuestionComments(question_id))
        setOpenComment(false)
    }

    return (

        <div className="createQuestionMainDiv">
            <div className="createNewQuestionInner">
              <form onSubmit={handleSubmit} className="questionInputs">
                <div className="questionUserInfo">
                </div>
                <input
                  type="text"
                  placeholder="Add a comment"
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}/>
                <div className="questionBtns">
                  <button
                    className="cancelQuestionBtn"
                    type="button"> Cancel</button>
                  <button className="submitQuestionBtn" type="submit">
                    Submit Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
    )
}

export default CommentForm
