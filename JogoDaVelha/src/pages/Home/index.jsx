import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Jogo da Velha</h1>

      <div className="buttons-row">
        <button className="single" onClick={() => navigate("/singleplayer")}>SinglePlayer</button>
        <button className="multi" onClick={() => navigate("/multiplayer")}>MultiPlayer</button>
      </div>

    </>
  );
}
