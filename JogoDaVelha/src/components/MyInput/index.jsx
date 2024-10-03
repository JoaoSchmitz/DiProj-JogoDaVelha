import { useState } from "react";
import "./style.css";

export default function MyInput({ label, value }) {
  const [name, setName] = useState("");

  return (
    <div className="input-box">
      <label className="label-text">{label}</label>
      <input
        id="name"
        className={`name-input ${name !== "" ? "active" : ""}`}
        type="text"
        maxlength={15}
        onChange={(e) => {
          localStorage.setItem(value, e.target.value);
          setName(e.target.value);
        }}
      />
    </div>
  );
}
