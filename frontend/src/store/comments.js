import { csrfFetch } from "./csrf";

const LOAD = "COMMENTS/LOAD"
const ADD = "COMMENTS/ADD"
const REMOVE = "COMMENTS/REMOVE"

const load = (listOfComments) => ({
    type: LOAD,
    listOfComments
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
    const response = await fetch(`/api/comments/${commentId}`)
    if(response.ok){
        const list = await response.json()
        dispatch(load(list))
    }
}


export const createNewComment = (commentDetails) => async dispatch => {
    const { userId, body } = commentDetails
    const response = await csrfFetch("/api/comments/new", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            userId,
            body,
        })
    })

    const createdComment = await response.json()
    dispatch(createComment(createdComment))
    return createdComment
}

export const editComment = (commentDetails) => async dispatch => {
    const { commentId, body } = commentDetails
    const response = await csrfFetch(`/api/comments/${commentId}`, {
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
    const response = await csrfFetch(`/api/comments/${commentId}`, {
       method: 'DELETE',
       headers: { 'Content-Type': 'application/json'},
       body: JSON.stringify({
           commentId
       })
   })

   if(response.ok){
       const comment = await response.json()
       dispatch(remove(comment))
       return comment
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
                listOfComments: action.listOfComments
            }
        }
        case REMOVE: {
            const newState = {...state}
            const newCommentsList = [...newState.listOfComments]
            const removeComment = newCommentsList.filter(comment =>  comment.id === action.commentId)
            removeComment.forEach(comment => newCommentsList.splice(newCommentsList.findIndex(comment2 => comment2.id === comment.id), 1))
            delete newState[action.commentId]
            newState.listOfComments = newCommentsList
            return newState
        }
        case ADD: {
            if(!state[action.comment.id]){
                const newestState = { ...state, [action.comment.id]: action.comment}
                newestState.listOfComments.push(action.comment)
                return newestState
            }else{
                let updatedState = { ...state }
                updatedState[action.comment.id] = action.comment
                const newCommentsList = [...updatedState.listOfComments]
                const removeComment = newCommentsList.filter(comment => comment.id === action.comment.id)[0]
                newCommentsList.splice(newCommentsList.findIndex(comment => comment.id === removeComment.id), 1, action.comment)
                updatedState.listOfComments = newCommentsList
                return updatedState

            }
        }
        default:
            return state
    }
}

export default commentReducer
