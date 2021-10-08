import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SignupFormPage from '../SignupFormPage';
import '../Splash.css'

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="signUpBtn" onClick={() => setShowModal(true)}>Sign up with email</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
