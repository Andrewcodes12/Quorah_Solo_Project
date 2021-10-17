import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatequestions } from "../../store/questions";
import { useHistory } from "react-router-dom";


import { useOpen } from '../../context/commentModal';

const EditQuestionForm = ({questionId}) => {
    const dispatch = useDispatch()

    const {open,setOpen} = useOpen()

    const history = useHistory()




    const sessionUser = useSelector(state => state.session.user)
    const [body, setBody] = useState()
    const [errors, setErrors] = useState([]);



    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const questionInfo = {
        userId: sessionUser.id,
        body,
        questionId
        }

        try{
          const updatequestion = await dispatch(updatequestions(questionInfo))

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
                  <button className="submitQuestionBtn" type="submit" onClick={setOpen(false)}>
                    Submit Question
                  </button>
                </div>
              </form>
            </div>
          </div>
    )
}

export default EditQuestionForm
