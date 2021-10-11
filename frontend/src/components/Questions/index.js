import React, {useEffect, useState} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {NavLink, useParams} from 'react-router-dom'
import getQuestions from '../../store/questions'

const Questions = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);
    const {questionId} = useParams()

    const question = useSelector(state => {
        return state.questions[questionId]
})


    useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

    return (
        <div>
            <h1>Hello</h1>

        </div>
    )
}

export default Questions
