import "./ChipButton.scss";
import { useState } from "react";

export default function ChipButton({ text, onClick, selected }) {
  return (
    <button
      onClick={onClick}
      className={`meditation__button ${
        selected ? "meditation__button--selected" : ""
      }`}
    >
      {text}
    </button>
  );
}
