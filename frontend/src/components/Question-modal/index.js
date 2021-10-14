import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import QuestionForm from '../QuestionForm';
import './modal.css'
import { useOpen } from '../../context/commentModal';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);
  const {open,setOpen} = useOpen()

  return (
    <>
      <button className="submitQuestionBtn" onClick={() => setOpen(true)}>Add question</button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <QuestionForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
