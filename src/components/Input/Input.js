import "./Input.scss";

export default function Input({ label, name, type, placeholder, image }) {
  return (
    <div className="field">
      <label htmlFor={name} className="field__label">
        {/* {label} */}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="field__input"
        placeholder={placeholder}
      />
    </div>
  );
}
