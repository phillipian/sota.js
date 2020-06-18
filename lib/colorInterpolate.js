/**
 * Function that generates an array of hex codes interpolating between start and end hex codes
 * @param {string} start - 6-digit hex code for starting color, including "#" at beginning
 * @param {string} [end=#ffffff] - 6-digit hex code for ending color, including "#" at beginning
 * @param {number} [steps=8] - Number of steps, equal to the length of the returned array
 * @param {boolean} [includeLast=false] - Whether or not to include the given end value in the final array
 */

export default function colorInterpolate(start,end="#ffffff",steps=8, includeLast=false){

    const startHex = start.substr(1);
    const startR = parseInt("0x" + startHex.substr(0,2));
    const startG = parseInt("0x" + startHex.substr(2,2));
    const startB = parseInt("0x" + startHex.substr(4,2));
    
    const endHex = end.substr(1);
    const endR = parseInt("0x" + endHex.substr(0,2));
    const endG = parseInt("0x" + endHex.substr(2,2));
    const endB = parseInt("0x" + endHex.substr(4,2));

    const diffR = endR - startR;
    const diffG = endG - startG;
    const diffB = endB - startB;

    const calcSteps = includeLast ? steps : steps + 1;
    
    const incR = diffR / calcSteps;
    const incG = diffG / calcSteps;
    const incB = diffB / calcSteps;

    let colorsArray = [start];
    
    for (let i = 1; i < steps - 1; i++){
        const newR = startR + incR * i;
        const newG = startG + incG * i;
        const newB = startB + incB * i;

        const newHexString = "#" + Math.round(newR).toString(16) + Math.round(newG).toString(16) + Math.round(newB).toString(16);

        colorsArray.push(newHexString);
    }

    let lastColor;

    if (includeLast){
        lastColor = end;
    } else{
        const newR = startR + incR * steps;
        const newG = startG + incG * steps;
        const newB = startB + incB * steps;
        lastColor = "#" + Math.round(newR).toString(16) + Math.round(newG).toString(16) + Math.round(newB).toString(16);
    }

    colorsArray.push(lastColor);

    return colorsArray;
}