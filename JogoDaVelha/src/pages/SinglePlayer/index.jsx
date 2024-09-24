import { useState, useEffect, useCallback } from "react";
import "../MultiPlayer/style.css";

export default function SinglePlayer() {
  const quadroVazio = Array(9).fill("");
  const jogador1 = "X";
  const jogador2 = "O";

  const [quadro, setQuadro] = useState(quadroVazio);
  const [jogadorAtual, setJogadorAtual] = useState(jogador2);
  const [vencedor, setVencedor] = useState(null);

  // Realiza as jogadas
  const handleCelulaClick = useCallback(
    (index) => {
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
      const novoQuadro = [...quadro];
      novoQuadro[index] = jogadorAtual;

      // Muda o turno
      setQuadro(novoQuadro);
      setJogadorAtual(jogadorAtual === jogador1 ? jogador2 : jogador1);
    },
    [jogadorAtual, quadro, vencedor]
  );

  // Verifica se tem um vencedor
  const checarVencedor = useCallback(() => {
    let venceu = 0;

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
      if (celulas.every((celula) => celula === "X")) {
        setVencedor("X");
        venceu = 1;
      }
      // Verifica se o jogador2 venceu
      if (celulas.every((celula) => celula === "O")) {
        setVencedor("O");
        venceu = 1;
      }
    });

    // Retorna 1 se houve um vencedor, 0 se não
    if (venceu === 1) {
      return 1;
    } else {
      return 0;
    }
  }, [quadro]);

  // Verifica se houve um empate
  const checarEmpate = useCallback(() => {
    if (quadro.every((item) => item !== "")) {
      setVencedor("E");
    }
  }, [quadro]);

  // Limpa o quadro do jogo e começa novamente
  const resetarJogo = useCallback(() => {
    setQuadro(quadroVazio);
    setJogadorAtual(jogador2);
    setVencedor(null);
  }, [quadroVazio, vencedor]);

  // Realiza a função:
  // - sempre que algum item do array de dependências é alterado
  // - ao carregar a página
  useEffect(() => {
    checarEmpate();
    const venceu = checarVencedor();
    // Verifica se é a vez do computador e se não há um vencedor
    if (jogadorAtual === jogador2 && !venceu) {
      // Verifica quais espaços do quadro de jogo estão vazios
      const celulasVazias = quadro
        .map((celula, index) => (celula === "" ? index : null))
        .filter((celula) => celula !== null);

      // Se houver espaçoes vazios no quadro de jogo, o bot joga em um espaço vazio aleatório
      if (celulasVazias.length > 0 && !vencedor) {
        const randomIndex = Math.floor(Math.random() * celulasVazias.length);
        const botMove = celulasVazias[randomIndex];

        // Faz o bot jogar após um período de tempo, para simular o tempo de  decisão
        setTimeout(() => {
          handleCelulaClick(botMove);
        }, 1000);
      }
    }
  }, [
    jogadorAtual,
    resetarJogo,
    checarVencedor,
    checarEmpate,
    handleCelulaClick,
    quadro,
    vencedor,
  ]);

  return (
    <>
      <div className={`quadro ${vencedor ? "game-over" : ""}`}>
        {quadro.map((item, index) => (
          <div
            key={index}
            className={`celula ${item}`}
            onClick={() => {
              if (jogadorAtual === jogador1) handleCelulaClick(index);
            }}
          >
            {item}
          </div>
        ))}
      </div>

      <button onClick={() => resetarJogo()}>Reiniciar Jogo</button>
    </>
  );
}
