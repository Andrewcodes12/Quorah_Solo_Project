import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewComment } from "../../store/comments";


const CommentForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([]);



    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const questionInfo = {
        userId: sessionUser.id,
           body
        }

        try{
          const createdQuestion = await dispatch(createNewComment(questionInfo))

          if(createdQuestion){
              history.push('/feed')

          }

        }catch(res){
        console.error(errors)
        }
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
