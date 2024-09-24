import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Jogo da Velha</h1>

      <button onClick={() => navigate("/singleplayer")}>SinglePlayer</button>
      <button onClick={() => navigate("/multiplayer")}>MultiPlayer</button>
    </>
  );
}
