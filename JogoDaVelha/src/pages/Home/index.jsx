import { useNavigate } from "react-router-dom";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";
import "./style.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Jogo da Velha</h1>

      <div className="inputs-row">
        <MyInput label="Nome do Player 01" value="player01" />
        <MyInput label="Nome do Player 02" value="player02" />
      </div>

      <div className="buttons-row">
        <MyButton
          className="single"
          value="SinglePlayer"
          action={() => navigate("/singleplayer")}
        />
        <MyButton
          className="multi"
          value="MultiPlayer"
          action={() => navigate("/multiplayer")}
        />
      </div>
    </>
  );
}
