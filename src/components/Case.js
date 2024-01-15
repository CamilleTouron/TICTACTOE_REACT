import React, { useEffect, useState } from "react";
import CaseValue from "../utils/CaseValue";

function caseValueToText(caseValue) {
    let value
    switch (caseValue) {
        case 0:
            value = " ";
            break;
        case 1:
            value = "X";
            break;
        case 2:
            value = "O";
            break;
        default:
            value = " ";
            break;
    }
    return value
}

function Case({ caseValue, moveDone, isPartyFinished }) {

    const [currentValue, setCurrentValue] = useState(caseValue);

    useEffect(() => {
        setCurrentValue(caseValue);
    }, [caseValue]);

    const handleClick = () => {
        setCurrentValue((buttonValue) => caseValue);
        moveDone();
    }

    return (
        <div class="case">
            <button class="caseButton" onClick={handleClick} disabled={isPartyFinished || currentValue !== CaseValue.Empty}>
                {caseValueToText(currentValue)}
            </button>
        </div>
    )

}
export default Case;