/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs';
import * as path from 'path';

/* A program to find the final coordinates of Robot with direction
	 Directions East, North, South and West, 
     Movements G M R L
*/
function getInputFromFile() {
    const args: {
        direction: (string|number)[],
        sequence: string,
    }={direction:[],sequence:'' };
    const filePath = path.resolve(__dirname, `../input data.txt`);

    const filedetails = fs.readFileSync(filePath,{encoding:'utf8'})
    const re=/\r\n|\n\r|\n|\r/g;
    const arrayofLines=filedetails.replace(re,"\n").split("\n")
    args.direction =arrayofLines[0].split(' ');
    args.sequence=arrayofLines[1];
    return args
}

function isNumeric(s:any) {
    return !isNaN(s - parseFloat(s));
}

export function checkIfValidInputs(input : any,initialDirection:string, initialX : number,initialY:number )
{
        const allowedDirections = [ 'N', 'E', 'S','W'];
    
        if(input.length==3 && allowedDirections.includes(initialDirection) && (initialX>=0 && initialX<100) && (initialY>=0 && initialY<100) )
        {
            return true;
        } 
        else
        {	  
            return false;
        }
}

export function getFinalDestination(sequence:string,maxRow:number,maxCol:number,x:number,y:number,initialDirection:string)
{

    // Initialize starting
    // point for robot as 
    // (0, 0) and starting
    // direction as N North

    let dir=0;

    if(initialDirection=='N')
         dir=0;
    else if(initialDirection=='E')
         dir=1;
    else if(initialDirection=='S')
         dir=2;
    else if(initialDirection=='W')
         dir=3;

    // Traverse the path given for robot
    const path:any = sequence.match(/\d+|\D/g);
    for (let i = 0; i < path.length; i++)
    {
        
        // Find current move
        const move:any = path[i];
        let count=1;
        
        if(isNumeric(move))
        {
            count = parseInt(move);
            if (count >=100)
                {
                    console.log('Number of movements is more than 100');
                    process.exit();
                }
            while(count>1)
            {
                if (path[i-1] == 'R')
                    dir = (dir + 1) % 4;
                else if (path[i-1] == 'L')
                    dir = (4 + dir - 1) % 4;
                // If move is Go, then 
                // change x or y according to
                // current direction
                // if (move == 'G')
                else if (path[i-1] == 'G')
                {
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
        else
        {
            if (move == 'R')
                dir = (dir + 1) % 4;
            else if (move == 'L')
                dir = (4 + dir - 1) % 4;

            // If move is Go, then 
            // change x or y according to
            // current direction
            // if (move == 'G')
            else if (move == 'G')
            {
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
    
    let finalDirection='';      
    if(dir == 0)
    finalDirection='N';
    else if(dir == 1)
    finalDirection='E';
    else if(dir == 2)
    finalDirection='S';
    else if(dir == 3)
    finalDirection='W';
    if(x>maxRow || y>maxCol || x<0 || y<0)
    {
        console.log("Destination is out of grid");
        return;
 
    }
    else
    {
         return {
            finalDirection,
            x,
            y,
         };
    }
    
}


export const start = ()=>{
    const args = getInputFromFile();
    const input:any =args.direction;
    const sequence:string = args.sequence;
    console.log(`Initial position ${input}`)
    console.log(`Sequence of movements ${sequence}`);
    const maxRow:number=100;
    const maxCol:number=100;
    const initialX:number=parseInt(input[1]);
    const initialY:number=parseInt(input[2]);
    const initialDirection=input[0];
    let result:any;
    if(checkIfValidInputs(input,initialDirection,initialX,initialY))
    {
         result = getFinalDestination(sequence,maxRow,maxCol,initialX,initialY,initialDirection);
    }
    else
    {
         result = undefined;
         console.log('Incorrect input format. Please enter valid format like N 0 0 ');
    }
    return result;
}


const startProcess =  () => {
    try {
        // This function returns direction and coordinates of Robot and print error if final cordinates are out of grid
        const result = start();
        if(result){
            console.log(`Final Destination is ${result.finalDirection},${result.x},${result.y}`);
        }else{
            console.log('Incorrect input format. Please enter valid format like N 0 0');
            throw new Error('Incorrect input format. Please enter valid format like N 0 0');
        }
      } catch (e) {
       console.log(e);
       process.exit();
      }
  };
  
setTimeout(startProcess, 2000);