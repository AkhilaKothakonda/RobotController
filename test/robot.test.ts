import {getFinalDestination, start, checkIfValidInputs} from "../src/robot";

describe("Tested cases", () => {
  it("With Input E 4 4 and sequence G3L5R3GGL", () => {
    const result = getFinalDestination('G3L5R3GGL', 100, 100, 4, 4, 'E');
    expect(result).not.toBe(undefined);
    expect(result?.finalDirection).toEqual('S');
    expect(result?.x).toEqual(5);
    expect(result?.y).toEqual(4);
  });
  it("With input from input file",  () => {
    const result = start();
    expect(result).not.toBe(undefined);
    expect(result?.finalDirection).toEqual('S');
    expect(result?.x).toEqual(5);
    expect(result?.y).toEqual(4);
  });
  it("With Input N 3 5 and sequence G3L5R3GGL", () => {
    const result = getFinalDestination('G3L5R3GGL', 100, 100, 3, 5, 'N');
    expect(result).not.toBe(undefined);
    expect(result?.finalDirection).toEqual('E');
    expect(result?.x).toEqual(3);
    expect(result?.y).toEqual(6);
  });
  it("With Input N 300 5 and sequence G3L5R3GGL", () => {
    const result = getFinalDestination('G3L5R3GGL', 100, 100, 3, 5, 'N');
    expect(result).not.toBe(undefined);
    expect(result?.finalDirection).toEqual('E');
    expect(result?.x).toEqual(3);
    expect(result?.y).toEqual(6);
  });
describe('Input data validations',()=>{
  //When valid sequence is given
  it("With Input N 3 5 and sequence G3L5R3GGL", () => {
    const result = checkIfValidInputs(['N', 3, 5], 'N', 3, 5);
    expect(result).toBe(true);
  });
  //Boundary value analysis
  it("With Input E 99 99 and sequence G3L5R3GGL", () => {
    const result = checkIfValidInputs(['E', 99, 99], 'E', 99, 99);
    expect(result).toBe(true);
  });
  //Invalid length with more than 3 inputs
  it("With Input E 99 99 1 and sequence G3L5R3GGL", () => {
    const result = checkIfValidInputs(['E', 99, 99, 1], 'E', 99, 99);
    expect(result).toBe(false);
  });
  it("With Input X 3 5 with invalid direction and sequence G3L5R3GGL", () => {
    const result = checkIfValidInputs(['X', 3, 5], 'X', 3, 5);
    expect(result).toBe(false);
  });
  it("With Input N 300 5 with invalid X co-ordinate and sequence G3L5R3GGL", () => {
    const result = checkIfValidInputs(['N', 3, 5], 'N', 300, 5);
    expect(result).toBe(false);
  });
  it("With Input N 3 500 with invalid Y co-ordinate and sequence G3L5R3GGL", () => {
    const result = checkIfValidInputs(['N', 3, 5], 'N', 3, 500);
    expect(result).toBe(false);
  });
});

});