import "./Input.scss";
import mailIcon from "../../assets/icons/mail.svg";
import lockIcon from "../../assets/icons/lock.svg";

export default function Input({
  label,
  name,
  type,
  placeholder,
  onChange,
  submitted,
  value,
}) {
  return (
    <div className="field">
      <label htmlFor={name} className="field__label">
        {/* {label} */}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        // className="field__input"
        className={`field__input ${
          submitted && value === "" ? "field__input--invalid" : ""
        }`}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
