import "./Input.scss";
import mailIcon from "../../assets/icons/mail.svg";
import lockIcon from "../../assets/icons/lock.svg";
import { useState } from "react";

export default function Input({
  label,
  name,
  type,
  onChange,
  submitted,
  value,
}) {
  const [isLabelFocus, setIsLabelFocus] = useState(false);

  const handlePlaceholderFocus = () => {
    setIsLabelFocus(true);
  };

  const handleBlur = (e) => {
    setIsLabelFocus(e.target.value !== "");
  };

  return (
    <div className="field">
      <input
        type={type}
        id={name}
        name={name}
        className={`field__input ${
          submitted && value === "" ? "field__input--invalid" : ""
        } ${isLabelFocus ? "field__input--focused" : ""}`}
        onFocus={handlePlaceholderFocus}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
      />
      <label
        htmlFor={name}
        className={`field__label ${
          label === "Email" ? "field__label--email" : ""
        } ${isLabelFocus ? "field__label--focused" : ""} ${
          label === "Email" && isLabelFocus ? "field__label--focused-email" : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
}
