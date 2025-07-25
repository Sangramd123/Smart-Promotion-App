/* eslint-disable react/prop-types */

const DeleteModal = ({ isOpen, onClose, onConfirm, message, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "48px", color: "#F44336" }}>!</div>
        <h2>Delete Confirmation</h2>
        <p>{message}</p>
        <div>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            style={{
              backgroundColor: "#F44336",
              color: "white",
              border: "none",
              padding: "10px 20px",
              margin: "10px",
              borderRadius: "5px",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            DELETE
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            style={{
              backgroundColor: "#808080",
              color: "white",
              border: "none",
              padding: "10px 20px",
              margin: "10px",
              borderRadius: "5px",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
