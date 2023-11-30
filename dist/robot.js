"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = exports.getFinalDestination = exports.checkIfValidInputs = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/* A program to find the final coordinates of Robot with direction
     Directions East, North, South and West,
     Movements G M R L
*/
function getInputFromFile() {
    const args = { direction: [], sequence: '' };
    const filePath = path.resolve(__dirname, `../input data.txt`);
    const filedetails = fs.readFileSync(filePath, { encoding: 'utf8' });
    const re = /\r\n|\n\r|\n|\r/g;
    const arrayofLines = filedetails.replace(re, "\n").split("\n");
    args.direction = arrayofLines[0].split(' ');
    args.sequence = arrayofLines[1];
    return args;
}
function isNumeric(s) {
    return !isNaN(s - parseFloat(s));
}
function checkIfValidInputs(input, initialDirection, initialX, initialY) {
    const allowedDirections = ['N', 'E', 'S', 'W'];
    if (input.length == 3 && allowedDirections.includes(initialDirection) && (initialX >= 0 && initialX < 100) && (initialY >= 0 && initialY < 100)) {
        return true;
    }
    else {
        return false;
    }
}
exports.checkIfValidInputs = checkIfValidInputs;
function getFinalDestination(sequence, maxRow, maxCol, x, y, initialDirection) {
    // Initialize starting
    // point for robot as 
    // (0, 0) and starting
    // direction as N North
    let dir = 0;
    if (initialDirection == 'N')
        dir = 0;
    else if (initialDirection == 'E')
        dir = 1;
    else if (initialDirection == 'S')
        dir = 2;
    else if (initialDirection == 'W')
        dir = 3;
    // Traverse the path given for robot
    const path = sequence.match(/\d+|\D/g);
    for (let i = 0; i < path.length; i++) {
        // Find current move
        const move = path[i];
        let count = 1;
        if (isNumeric(move)) {
            count = parseInt(move);
            if (count >= 100) {
                console.log('Number of movements is more than 100');
                process.exit();
            }
            while (count > 1) {
                if (path[i - 1] == 'R')
                    dir = (dir + 1) % 4;
                else if (path[i - 1] == 'L')
                    dir = (4 + dir - 1) % 4;
                // If move is Go, then 
                // change x or y according to
                // current direction
                // if (move == 'G')
                else if (path[i - 1] == 'G') {
                    if (dir == 0)
                        y++;
                    else if (dir == 1)
                        x++;
                    else if (dir == 2)
                        y--;
                    else // dir == 3
                        x--;
                }
                count--;
            }
        }
        // If move is left or
        // right, then change direction
        else {
            if (move == 'R')
                dir = (dir + 1) % 4;
            else if (move == 'L')
                dir = (4 + dir - 1) % 4;
            // If move is Go, then 
            // change x or y according to
            // current direction
            // if (move == 'G')
            else if (move == 'G') {
                if (dir == 0)
                    y++;
                else if (dir == 1)
                    x++;
                else if (dir == 2)
                    y--;
                else // dir == 3
                    x--;
            }
        }
    }
    let finalDirection = '';
    if (dir == 0)
        finalDirection = 'N';
    else if (dir == 1)
        finalDirection = 'E';
    else if (dir == 2)
        finalDirection = 'S';
    else if (dir == 3)
        finalDirection = 'W';
    if (x > maxRow || y > maxCol || x < 0 || y < 0) {
        console.log("Destination is out of grid");
        return;
    }
    else {
        return {
            finalDirection,
            x,
            y,
        };
    }
}
exports.getFinalDestination = getFinalDestination;
const start = () => {
    const args = getInputFromFile();
    const input = args.direction;
    const sequence = args.sequence;
    console.log(`Initial position ${input}`);
    console.log(`Sequence of movements ${sequence}`);
    const maxRow = 100;
    const maxCol = 100;
    const initialX = parseInt(input[1]);
    const initialY = parseInt(input[2]);
    const initialDirection = input[0];
    let result;
    if (checkIfValidInputs(input, initialDirection, initialX, initialY)) {
        result = getFinalDestination(sequence, maxRow, maxCol, initialX, initialY, initialDirection);
    }
    else {
        result = undefined;
        console.log('Incorrect input format. Please enter valid format like N 0 0 ');
    }
    return result;
};
exports.start = start;
const startProcess = () => {
    try {
        // This function returns direction and coordinates of Robot and print error if final cordinates are out of grid
        const result = (0, exports.start)();
        if (result) {
            console.log(`Final Destination is ${result.finalDirection},${result.x},${result.y}`);
        }
        else {
            console.log('Incorrect input format. Please enter valid format like N 0 0');
            throw new Error('Incorrect input format. Please enter valid format like N 0 0');
        }
    }
    catch (e) {
        console.log(e);
        process.exit();
    }
};
setTimeout(startProcess, 2000);
//# sourceMappingURL=robot.js.map