import { createContext, useContext, useState } from "react";

export const commentModal = createContext();

export const OpenProvider = (props) => {
  const [open, setOpen] = useState(false)
  const [openComment,setOpenComment] = useState(false)
  const [question_id,setQuestionId] = useState()

  return (
    <commentModal.Provider value={{ open, setOpen,openComment,setOpenComment,question_id,setQuestionId }}>
      {props.children}
    </commentModal.Provider>
  );
};

export const useOpen = () => useContext(commentModal);
