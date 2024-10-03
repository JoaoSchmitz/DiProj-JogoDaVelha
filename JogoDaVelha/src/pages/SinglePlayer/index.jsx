import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyButton from "../../components/MyButton";
import "./style.css";

export default function SinglePlayer() {
  const navigate = useNavigate();
  const location = useLocation();

  const emptyBoard = Array(9).fill("");
  const player1 = location.state.player01Symbol;
  const player2 = location.state.player02Symbol;

  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState(player2);
  const [winner, setWinner] = useState(null);

  const [player01Points, setPlayer01Points] = useState(0);
  const [player02Points, setPlayer02Points] = useState(0);

  // Realiza as jogadas
  const handleCellClick = useCallback(
    (index) => {
      // Verifica se há um vencedor
      if (winner) {
        console.log("Jogo finalizado.");
        return null;
      }

      // Verifica se o local escolhido está vazio
      if (board[index] !== "") {
        return null;
      }

      // Realiza a jogada
      const newBoard = [...board];
      newBoard[index] = currentPlayer;

      // Muda o turno
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
    },
    [currentPlayer, board, winner]
  );

  // Verifica se tem um vencedor
  const checkWinner = useCallback(() => {
    let venceu = 0;

    // Lista todas as possibilidades de vencer
    const winningPossibilities = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    // Para cada possibilidade de vencer, verifica se ela ocorreu
    winningPossibilities.forEach((cells) => {
      // Verifica se o player1 venceu
      if (cells.every((cell) => cell === player1)) {
        setWinner(player1);
        setPlayer01Points(player01Points + 1);
        venceu = 1;
      }
      // Verifica se o player2 venceu
      if (cells.every((cell) => cell === player2)) {
        setWinner(player2);
        setPlayer02Points(player02Points + 1);
        venceu = 1;
      }
    });

    // Retorna 1 se houve um vencedor, 0 se não
    if (venceu === 1) {
      return 1;
    } else {
      return 0;
    }
  }, [board]);

  // Verifica se houve um empate
  const checkDraw = useCallback(() => {
    if (board.every((item) => item !== "")) {
      setWinner("E");
    }
  }, [board]);

  // Limpa o board do jogo e começa novamente
  const resetGame = useCallback(() => {
    setBoard(emptyBoard);
    setCurrentPlayer(player2);
    setWinner(null);
  }, [emptyBoard, winner]);

  // Limpa o scoreboard do jogo e começa novamente
  const resetScoreboard = useCallback(() => {
    resetGame();
    setPlayer01Points(0);
    setPlayer02Points(0);
  }, []);

  // Realiza a função:
  // - sempre que algum item do array de dependências é alterado
  // - ao carregar a página
  useEffect(() => {
    checkDraw();
    const venceu = checkWinner();
    // Verifica se é a vez do computador e se não há um winner
    if (currentPlayer === player2 && !venceu) {
      // Verifica quais espaços do board de jogo estão vazios
      const emptyCells = board
        .map((cell, index) => (cell === "" ? index : null))
        .filter((cell) => cell !== null);

      // Se houver espaçoes vazios no board de jogo, o bot joga em um espaço vazio aleatório
      if (emptyCells.length > 0 && !winner) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const botMove = emptyCells[randomIndex];

        // Faz o bot jogar após um período de tempo, para simular o tempo de  decisão
        setTimeout(() => {
          handleCellClick(botMove);
        }, 1000);
      }
    }
  }, [
    currentPlayer,
    resetGame,
    checkWinner,
    checkDraw,
    handleCellClick,
    board,
    winner,
  ]);

  return (
    <section className="game-screen">
      <section className="board-scoreboard-container">
        {/* Placar Player01 */}
        <div
          className={`scoreboard ${winner === player1 ? "winner" : ""}`}
        >
          <h2 className="scoreboard-player-title">
            {localStorage.getItem("player01")}
          </h2>
          <p className="scoreboard-player-score">{player01Points}</p>
          <p
            className={`scoreboard-player-title scoreboard-player-winner ${
              winner === player1 ? "active" : winner === "E" ? "draw" : ""
            }`}
          >
            {winner === player1
              ? "Venceu!!!"
              : winner === "E"
              ? "Empate!"
              : ""}
          </p>
        </div>

        {/* Board do Jogo */}
        <div
          className={`board board-singleplayer ${
            winner ? "game-over" : ""
          }`}
        >
          {board.map((item, index) => (
            <div
              key={index}
              className={`cell ${item}`}
              onClick={() => {
                if (currentPlayer === player1) handleCellClick(index);
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Placar Player02 */}
        <div
          className={`scoreboard ${winner === player2 ? "winner" : ""}`}
        >
          <h2 className="scoreboard-player-title">
            {localStorage.getItem("player02")}
          </h2>
          <p className="scoreboard-player-score">{player02Points}</p>
          <p
            className={`scoreboard-player-title scoreboard-player-winner ${
              winner === player2 ? "active" : winner === "E" ? "draw" : ""
            }`}
          >
            {winner === player2
              ? "Venceu!!!"
              : winner === "E"
              ? "Empate!"
              : ""}
          </p>
        </div>
      </section>

      {/* Símbolo de Loading enquanto o Bot joga */}
      <div className="loading-box">
        {currentPlayer === player2 && !winner ? (
          <h2 class="bot-message">
            <div class="loading" />
          </h2>
        ) : (
          <></>
        )}
      </div>

      {/* Botões */}
      <div className="buttons-row">
        <MyButton value="Reiniciar Placar" action={() => resetScoreboard()} />
        <MyButton value="Voltar" action={() => navigate("/")} />
        <MyButton value="Reiniciar Jogo" action={() => resetGame()} />
      </div>
    </section>
  );
}
