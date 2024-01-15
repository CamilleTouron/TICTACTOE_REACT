import React, { useEffect, useRef, useState } from "react";
import Board from "./Board";
import CaseValue from "../utils/CaseValue";
import { Winner } from "./Board";

const textPlayer1 = "Player 1 turn to play using cross.";
const textPlayer2 = "Player 2 turn to play using round.";
const textWinPlayer1 = "Player 1 won the party.";
const textWinPlayer2 = "Player 2 won the party.";
const textNoWinner = "There is no winner.";

function TicTacToe() {
    const player1 = CaseValue.Cross;
    const player2 = CaseValue.Round;
    const [player, setPlayer] = useState(player1);
    const [text, setText] = useState(textPlayer1);
    const [winner, setWinner] = useState(Winner.None);
    const [partyOver, setPartyOver] = useState(false);
    const boardRef = useRef();

    useEffect(() => {
        if (partyOver && winner === Winner.None) {
            setText(textNoWinner);
        }
    }, [partyOver, winner]);

    const switchPlayer = () => {
        setPlayer(currentPlayer => (currentPlayer === player1 ? player2 : player1));
        setText(currentText => (currentText === textPlayer1 ? textPlayer2 : textPlayer1));
    };

    const updateWinner = (newWinner) => {
        setWinner(newWinner);
        switch (newWinner) {
            case Winner.Player1:
                setText(textWinPlayer1);
                break;
            case Winner.Player2:
                setText(textWinPlayer2);
                break;
            default:
                break;
        }
    };

    const updatePartyOver = () => {
        setPartyOver(true);
    }

    const replayOnClick = () => {
        if (boardRef.current) {
            boardRef.current.resetBoard();
        }
        setPlayer(player1);
        setText(textPlayer1);
        setWinner(Winner.None);
        setPartyOver(false);
    };

    return (
        <div>
            <header>TicTacToe</header>
            <p>{text}</p>
            <Board player={player} onMoveDone={switchPlayer} onWinnerChange={updateWinner} partyOver={updatePartyOver} ref={boardRef} />
            <button onClick={replayOnClick}>Replay</button>
        </div>
    );
}

export default TicTacToe;
