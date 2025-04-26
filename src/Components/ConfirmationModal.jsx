import React from 'react';

const ConfirmationModal = ({ 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?", 
  isOpen, 
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="modal-button confirm" onClick={onConfirm}>OK</button>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-container {
          background: white;
          padding: 0;
          margin: 1rem;
          border-radius: 0.5rem;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          font-family: 'Poppins', sans-serif;
        }

        .modal-title {
          padding:0;
          margin:0;
          padding: 1ch 1.2ch 0ch 1.2ch;
          font-size: 1.2rem;
        }

        .modal-message {
          padding:0;
          margin:0;
          padding: 2ch 1.2ch;
        }

        .modal-actions {
          display: flex;
          justify-content: end;
          padding: 1rem;
        }

        .modal-button {
          font-size: 1rem;
          font-weight: 500;
          border: none;
          outline: none;
          background: none;
          background-color: none;
          color: #4f46e5;
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default ConfirmationModal;
