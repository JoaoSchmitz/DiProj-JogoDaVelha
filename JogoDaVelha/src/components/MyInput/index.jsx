import "./style.css";

export default function MyInput({ label, value }) {
  return (
    <div className="input-box">
      <label className="label-text">{label}</label>
      <input
        className="name-input"
        style={
          localStorage.getItem(value) !== "" ? { borderColor: "green" } : {}
        }
        type="text"
        maxlength={30}
        placeholder={
          localStorage.getItem(value) !== ""
            ? localStorage.getItem(value)
            : ""
        }
        onChange={(e) => localStorage.setItem(value, e.target.value)}
      />
    </div>
  );
}
