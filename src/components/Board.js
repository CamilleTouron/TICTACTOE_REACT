import Case from "./Case";
import CaseValue from "../utils/CaseValue";
import { forwardRef, useImperativeHandle, useState } from "react";

export const Winner = {
    None: 0,
    Player1: 1,
    Player2: 2
}

function winningConditionsHorizontal(boardValue, player) {
    return (
        (player === boardValue[0] && boardValue[0] === boardValue[1] && boardValue[1] === boardValue[2]) ||
        (player === boardValue[3] && boardValue[3] === boardValue[4] && boardValue[4] === boardValue[5]) ||
        (player === boardValue[6] && boardValue[6] === boardValue[7] && boardValue[7] === boardValue[8])
    );
}

function winningConditionsVertical(boardValue, player) {
    return (
        (player === boardValue[0] && boardValue[0] === boardValue[3] && boardValue[3] === boardValue[6]) ||
        (player === boardValue[1] && boardValue[1] === boardValue[4] && boardValue[4] === boardValue[7]) ||
        (player === boardValue[2] && boardValue[2] === boardValue[5] && boardValue[5] === boardValue[8])
    );
}

function winningConditionsDiagonalRight(boardValue, player) {
    return player === boardValue[0] && boardValue[0] === boardValue[4] && boardValue[4] === boardValue[8];
}

function winningConditionsDiagonalLeft(boardValue, player) {
    return player === boardValue[2] && boardValue[2] === boardValue[4] && boardValue[4] === boardValue[6];
}

function doesPlayerWin(boardValue, player) {
    return (
        winningConditionsHorizontal(boardValue, player) ||
        winningConditionsVertical(boardValue, player) ||
        winningConditionsDiagonalRight(boardValue, player) ||
        winningConditionsDiagonalLeft(boardValue, player)
    );
}

const Board = forwardRef(({ player, onMoveDone, onWinnerChange, partyOver }, ref) => {
    const [isPartyFinished, setIsPartyFinished] = useState(false);
    const [boardValue, setBoardValue] = useState(new Array(9).fill(CaseValue.Empty));

    const handleMoveDone = (caseId, caseValue) => {
        const newBoardValue = boardValue.map((value, index) => {
            if (index === caseId - 1) {
                return caseValue;
            }
            return value;
        });

        setBoardValue(newBoardValue);

        setTimeout(() => {
            const newWinner = doesPlayerWin(newBoardValue, caseValue) ?
                (caseValue === CaseValue.Cross ? Winner.Player1 : Winner.Player2) :
                Winner.None;

            if (newWinner !== Winner.None) {
                setIsPartyFinished(true);
                onWinnerChange(newWinner);
            } else if (!newBoardValue.includes(CaseValue.Empty)) {
                partyOver();
            }
        }, 0);

        onMoveDone();
    };

    useImperativeHandle(ref, () => ({
        resetBoard: () => {
            setIsPartyFinished(false);
            setBoardValue(new Array(9).fill(CaseValue.Empty));
        }
    }));

    return (
        <table>
            <tbody>
                <tr>
                    <td><Case caseValue={boardValue[0]} moveDone={() => handleMoveDone(1, player)} isPartyFinished={isPartyFinished}></Case></td>
                    <td><Case caseValue={boardValue[1]} moveDone={() => handleMoveDone(2, player)} isPartyFinished={isPartyFinished}></Case></td>
                    <td><Case caseValue={boardValue[2]} moveDone={() => handleMoveDone(3, player)} isPartyFinished={isPartyFinished}></Case></td>
                </tr>
                <tr>
                    <td><Case caseValue={boardValue[3]} moveDone={() => handleMoveDone(4, player)} isPartyFinished={isPartyFinished}></Case></td>
                    <td><Case caseValue={boardValue[4]} moveDone={() => handleMoveDone(5, player)} isPartyFinished={isPartyFinished}></Case></td>
                    <td><Case caseValue={boardValue[5]} moveDone={() => handleMoveDone(6, player)} isPartyFinished={isPartyFinished}></Case></td>
                </tr>
                <tr>
                    <td><Case caseValue={boardValue[6]} moveDone={() => handleMoveDone(7, player)} isPartyFinished={isPartyFinished}></Case></td>
                    <td><Case caseValue={boardValue[7]} moveDone={() => handleMoveDone(8, player)} isPartyFinished={isPartyFinished}></Case></td>
                    <td><Case caseValue={boardValue[8]} moveDone={() => handleMoveDone(9, player)} isPartyFinished={isPartyFinished}></Case></td>
                </tr>
            </tbody>
        </table >
    )
});

export default Board;

