import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function MultiPlayer() {
  const navigate = useNavigate();

  const quadroVazio = Array(9).fill("");
  const jogador1 = "X";
  const jogador2 = "O";

  const [quadro, setQuadro] = useState(quadroVazio);
  const [jogadorAtual, setJogadorAtual] = useState(jogador1);
  const [vencedor, setVencedor] = useState(null);

  // Realiza as jogadas
  const handleCelulaClick = (index) => {
    // Verifica se há um vencedor
    if (vencedor) {
      console.log("Jogo finalizado.");
      return null;
    }

    // Verifica se o local escolhido está vazio
    if (quadro[index] !== "") {
      return null;
    }

    // Realiza a jogada
    quadro[index] = jogadorAtual;

    // Muda o turno e checa se teve um vencedor ou aconteceu um empate
    setJogadorAtual(jogadorAtual === jogador1 ? jogador2 : jogador1);
    checarEmpate();
    checarVencedor();
  };

  // Verifica se tem um vencedor
  const checarVencedor = () => {
    // Lista todas as possibilidades de vencer
    const possibilidadesDeVencer = [
      [quadro[0], quadro[1], quadro[2]],
      [quadro[3], quadro[4], quadro[5]],
      [quadro[6], quadro[7], quadro[8]],

      [quadro[0], quadro[3], quadro[6]],
      [quadro[1], quadro[4], quadro[7]],
      [quadro[2], quadro[5], quadro[8]],

      [quadro[0], quadro[4], quadro[8]],
      [quadro[2], quadro[4], quadro[6]],
    ];

    // Para cada possibilidade de vencer, verifica se ela ocorreu
    possibilidadesDeVencer.forEach((celulas) => {
      // Verifica se o jogador1 venceu
      if (celulas.every((celula) => celula === jogador1)) {
        setVencedor(jogador1);
      }
      // Verifica se o jogador2 venceu
      if (celulas.every((celula) => celula === jogador2)) {
        setVencedor(jogador2);
      }
    });
  };

  // Verifica se houve um empate
  const checarEmpate = () => {
    if (quadro.every((item) => item !== "")) {
      setVencedor("E");
    }
  };

  // Limpa o quadro do jogo e começa novamente
  const resetarJogo = () => {
    setJogadorAtual(jogador1);
    setQuadro(quadroVazio);
    setVencedor(null);
  };

  return (
    <>
      <div className={`quadro quadro-multiplayer ${vencedor ? "game-over" : ""}`}>
        {quadro.map((item, index) => (
          <div
            key={index}
            className={`celula ${item}`}
            onClick={() => handleCelulaClick(index)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="buttons-row">
        <button onClick={() => navigate("/")}>Voltar</button>
        <button onClick={() => resetarJogo()}>Reiniciar Jogo</button>
      </div>
    </>
  );
}
