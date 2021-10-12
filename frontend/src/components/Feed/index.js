import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getquestions } from "../../store/questions";
import { getComments } from "../../store/comments";



const Feed = () => {
    const dispatch = useDispatch()

    const sessionUser = useSelector((state) => state.session.user);


    const questions = useSelector(state => {
        return state.questions.list
    })

    const comments = useSelector(state => {
        return state.comments.commentsList
    })


    useEffect(() => {
        dispatch(getquestions())
        dispatch(getComments())
    },[dispatch])

    if(!questions) return null

    if(!comments) return null

    return (
        <div>

        </div>
    )
}

export default Feed
