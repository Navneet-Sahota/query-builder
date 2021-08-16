import React from "react";

const Footer = ({ onClose = () => {}, onSubmit = () => {} }) => {
  return (
    <div className="flex justify-between pb-8 px-4">
      <button
        className="py-2 px-4 rounded-md"
        style={{ backgroundColor: "#6D7175" }}
        onClick={onClose}
      >
        Back
      </button>
      <button
        className="py-2 px-4 rounded-md"
        style={{ backgroundColor: "#4F46E5" }}
        onClick={onSubmit}
      >
        Finish
      </button>
    </div>
  );
};

export default Footer;
