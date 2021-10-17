import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editComment } from "../../store/comments";


const EditCommentForm = ({comment}) => {
    const dispatch = useDispatch()


    const history = useHistory()


    const sessionUser = useSelector(state => state.session.user)
    const comments = useSelector((state) => state.comments.commentsList);

    const [body, setBody] = useState()
    const [errors, setErrors] = useState([]);



  console.log(comments)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const commentInfo = {

        body,

        }

        try{
          const updatequestion = await dispatch(editComment(commentInfo))

          if(updatequestion){
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
                  <p>{sessionUser?.username} asked</p>
                </div>
                <input
                  type="text"
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}/>
                <div className="questionBtns">
                  <button
                    className="cancelQuestionBtn"
                    type="button"> Cancel</button>
                  <button className="submitQuestionBtn" type="submit">
                    Submit Question
                  </button>
                </div>
              </form>
            </div>
          </div>
    )
}

export default EditCommentForm
