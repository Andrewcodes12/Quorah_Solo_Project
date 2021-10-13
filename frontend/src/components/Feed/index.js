import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getquestions } from "../../store/questions";
import { getComments } from "../../store/comments";
import './feed.css'
import QuestionsContainer from "../Questions";



const Feed = () => {
    const dispatch = useDispatch()

    const sessionUser = useSelector((state) => state.session.user);


    const questions = useSelector(state => {
        return state.questions
    })

    const comments = useSelector(state => {
        return state.comments.commentsList
    })


    useEffect(() => {
        dispatch(getquestions())
        dispatch(getComments())
    },[dispatch])


    return (
        <div className="feedContainer">
            <div className="questionFeed">
            {Object.values(questions)?.map((question) => <QuestionsContainer question={question}/>)}
            </div>

        </div>

    )
}

export default Feed
