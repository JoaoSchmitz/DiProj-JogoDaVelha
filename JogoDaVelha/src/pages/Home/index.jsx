import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";
import "./style.css";

export default function Home() {
  const navigate = useNavigate();
  const [player01Symbol, setPlayer01Symbol] = useState("X");
  const [player02Symbol, setPlayer02Symbol] = useState("O");

  const invertSymbols = () => {
    if (player01Symbol === "X") {
      setPlayer01Symbol("O");
      setPlayer02Symbol("X");
    } else {
      setPlayer01Symbol("X");
      setPlayer02Symbol("O");
    }
  };

  useEffect(() => {
    localStorage.setItem("player01", "");
    localStorage.setItem("player02", "");
  }, []);

  return (
    <>
      <h1>Jogo da Velha</h1>

      <div className="inputs-row">
        <div className="input-box">
          <MyInput label="Nome do Player 01" value="player01" type="text" />
          <div className="player-symbol-box" onClick={() => invertSymbols()}>
            <p className="player-symbol-text">{player01Symbol}</p>
          </div>
        </div>
        <div className="input-box">
          <MyInput label="Nome do Player 02" value="player02" type="text" />
          <div className="player-symbol-box" onClick={() => invertSymbols()}>
            <p className="player-symbol-text">{player02Symbol}</p>
          </div>
        </div>
      </div>

      <div className="buttons-row">
        <MyButton
          className="single"
          value="SinglePlayer"
          action={() => {
            if (localStorage.getItem("player01") === "")
              localStorage.setItem("player01", "Player 01");
            localStorage.setItem("player02", "CPU-Bot");
            navigate("/singleplayer", {
              state: {
                player01Symbol: player01Symbol,
                player02Symbol: player02Symbol,
              },
            });
          }}
        />
        <MyButton
          className="multi"
          value="MultiPlayer"
          action={() => {
            if (localStorage.getItem("player01") === "")
              localStorage.setItem("player01", "Player 01");
            if (localStorage.getItem("player02") === "")
              localStorage.setItem("player02", "Player 02");
            navigate("/multiplayer", {
              state: {
                player01Symbol: player01Symbol,
                player02Symbol: player02Symbol,
              },
            });
          }}
        />
      </div>
    </>
  );
}
