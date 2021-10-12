import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import QuestionForm from '../QuestionForm';
import './modal.css'

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="submitQuestionBtn" onClick={() => setShowModal(true)}>Add question</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <QuestionForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
