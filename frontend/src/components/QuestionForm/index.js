import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createquestions } from "../../store/questions";
import './questionform.css'
import { useOpen } from "../../context/commentModal";



const QuestionForm = ({onClose}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([]);
    const {setOpen} = useOpen()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const questionInfo = {
        userId: sessionUser.id,
           body
        }

        try{
          const createdQuestion = await dispatch(createquestions(questionInfo))

          if(createdQuestion){
              setOpen(false)
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
                  placeholder="Start your question with 'What', 'How', 'Why', etc."
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

export default QuestionForm
