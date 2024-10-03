import "./style.css";

export default function MyButton({ className, value, action }) {
  return (
    <button
      className={className}
      onClick={() => action()}
    >
      {value}
    </button>
  );
}
