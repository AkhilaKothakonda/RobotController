"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
/* A program to find the final coordinates of Robot with direction
     Directions East, North, South and West,
     Movements G M R L
*/
function getInputFromFile() {
    return __awaiter(this, void 0, void 0, function () {
        var args, filePath, filedetails, re, arrayofLines;
        return __generator(this, function (_a) {
            args = { direction: [], sequence: '' };
            filePath = path.resolve(__dirname, "./input.txt");
            filedetails = fs.readFileSync(filePath, { encoding: 'utf8' });
            re = /\r\n|\n\r|\n|\r/g;
            arrayofLines = filedetails.replace(re, "\n").split("\n");
            args.direction = arrayofLines[0].split(' ');
            args.sequence = arrayofLines[1];
            return [2 /*return*/, args];
        });
    });
}
function getFinalDestination(sequence, maxRow, maxCol, x, y, initialDirection) {
    // Initialize starting
    // point for robot as 
    // (0, 0) and starting
    // direction as N North
    var dir = 0;
    if (initialDirection == 'N')
        dir = 0;
    else if (initialDirection == 'E')
        dir = 1;
    else if (initialDirection == 'S')
        dir = 2;
    else if (initialDirection == 'W')
        dir = 3;
    // Traverse the path 
    // given for robot
    var path = sequence.match(/\d+|\D/g);
    for (var i = 0; i < path.length; i++) {
        // Find current move
        var move = path[i];
        var count = 1;
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
    var finalDirection = '';
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
        process.exit();
    }
    else {
        console.log("Final Destination is ".concat(finalDirection, ",").concat(x, ",").concat(y));
    }
}
function isNumeric(s) {
    return !isNaN(s - parseFloat(s));
}
function checkIfValidInputs(input, initialDirection, initialX, initialY) {
    var allowedDirections = ['N', 'E', 'S', 'W'];
    if (input.length == 3 && allowedDirections.includes(initialDirection) && (initialX >= 0 && initialX < 100) && (initialY >= 0 && initialY < 100)) {
        return true;
    }
    else {
        return false;
    }
}
var startProcess = function () { return __awaiter(void 0, void 0, void 0, function () {
    var args, input, sequence, maxRow, maxCol, initialX, initialY, initialDirection, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getInputFromFile()];
            case 1:
                args = _a.sent();
                input = args.direction;
                sequence = args.sequence;
                ;
                console.log("Initial position ".concat(input));
                console.log("Sequence of movements ".concat(sequence));
                maxRow = 100;
                maxCol = 100;
                initialX = input[1];
                initialY = input[2];
                initialDirection = input[0];
                if (checkIfValidInputs(input, initialDirection, initialX, initialY)) {
                    getFinalDestination(sequence, maxRow, maxCol, initialX, initialY, initialDirection);
                }
                else {
                    console.log('Incorrect input format. Please enter valid format like N 0 0 ');
                }
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                process.exit();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
setTimeout(startProcess, 2000);
