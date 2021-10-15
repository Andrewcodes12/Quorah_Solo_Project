import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import QuestionForm from '../QuestionForm';
import './modal.css'
import { useOpen } from '../../context/commentModal';
import {useSelector } from "react-redux";

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);
  const {open,setOpen} = useOpen()


  const sessionUser = useSelector(state => state.session.user)

  return (
    <>
      <button className="submitQuestionBtn" onClick={() => setOpen(true)} disabled={!sessionUser}>Add question</button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <QuestionForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
