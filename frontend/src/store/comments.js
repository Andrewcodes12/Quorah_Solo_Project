import { csrfFetch } from "./csrf";

const LOAD = "comments/LOAD"
const ADD = "comments/ADD"
const REMOVE = "comments/REMOVE"

const load = (commentsList) => ({
    type: LOAD,
    commentsList
})

const createComment = (comment) => ({
    type: ADD,
    comment
})

const remove = (commentId) => ({
    type: REMOVE,
    commentId
})

export const getComments = (commentId) => async dispatch => {
    const response = await fetch(`/api/comment/${commentId}`)
    if(response.ok){
        const list = await response.json()
        dispatch(load(list))
    }
}

export const createNewComment = (commentInfo) => async dispatch => {
    const { userId, body,questionId} = commentInfo
    const response = await csrfFetch("/api/comment/new", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            userId,
            body,
            questionId
        })
    })

    const newComment = await response.json()
    dispatch(createComment(newComment))
    return newComment
}


export const editComment = (commentInfo) => async dispatch => {
    const { commentId, body } = commentInfo
    const response = await csrfFetch(`/api/comment/${commentId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({
            body,
            commentId
        })
    })
    if(response.ok){
        const updatedComment = await response.json()
        dispatch(createComment(updatedComment))
        return updatedComment
    }
}

export const removeComment = (commentId) => async dispatch => {

    const response = await csrfFetch(`/api/comment/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            commentId
        })
    })

    if(response.ok){
        const deleteComment = await response.json()
        dispatch(remove(deleteComment))
        return deleteComment
    }
}

const initialState = {}

const commentReducer = (state=initialState, action) => {
    switch(action.type){
        case LOAD: {
            const allComments = {}
            action.commentsList.forEach(comment => {
                allComments[comment.id] = comment
            })
            return {
                ...allComments,
                ...state,
                commentsList: action.commentsList
            }
        }
        case REMOVE: {
            const newState = {...state}
            const newCommentsList = [...newState.commentsList]
            const removeComment = newCommentsList.filter(comment =>  comment.id === action.commentId)
            removeComment.forEach(comment => newCommentsList.splice(newCommentsList.findIndex(comment2 => comment2.id === comment.id), 1))
            delete newState[action.commentId]
            newState.commentsList = newCommentsList
            return newState
        }
        case ADD: {
            if(!state[action.comment.id]){
                const newestState = { ...state, [action.comment.id]: action.comment}
                newestState.commentsList.push(action.comment)
                return newestState
            }else{
                let updatedState = { ...state }
                updatedState[action.comment.id] = action.comment
                const newCommentsList = [...updatedState.commentsList]
                const removeComment = newCommentsList.filter(comment => comment.id === action.comment.id)[0]
                newCommentsList.splice(newCommentsList.findIndex(comment => comment.id === removeComment.id), 1, action.comment)
                updatedState.commentsList = newCommentsList
                return updatedState

            }
        }
        default:
            return state
    }
}

export default commentReducer
