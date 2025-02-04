import {Request, Response} from 'express';
import {Billboard, createFakeBillboard} from '../helpers';

const validInstructions = /^[x^v><]+$/i;

export default function (req: Request<{instructions: string}>, res: Response) {
    const instructions = req.query.instructions;
    if (!instructions || typeof instructions !== 'string') {
        res.json({
            success: false,
            message: 'No instructions received'
        });
        return;
    }

    if (!validInstructions.test(instructions)) {
        res.json({
            success: false,
            message: 'Received an invalid instruction set'
        });
        return;
    }

    const billboards = instructDrones(instructions);

    res.json({
        success: true,
        instructions: instructions,
        billboards: billboards
    });
}

function instructDrones(instructions: string) {
    // Holds billboard's coordinates and number of photos taken
    const billboards = new Array<Billboard>();

    // Holds drone's coordinates
    const droneCoordinates = {x: 0, y: 0};

    // Read every instruction
    for (let i = 0; i < instructions.length; i++) {
        switch (instructions[i]) {
            case 'x': {
                takePhoto(droneCoordinates);
                break;
            }
            // north
            case '^': {
                droneCoordinates.x += 1;
                break;
            }
            // south
            case 'v': {
                droneCoordinates.x -= 1;
                break;
            }
            // east
            case '>': {
                droneCoordinates.y += 1;
                break;
            }
            // west
            case '<': {
                droneCoordinates.y -= 1;
                break;
            }

            default: {
                throw new Error(`Invalid instruction ${instructions[i]} received at position ${i}`);
            }
        }
    }

    return billboards;

    function takePhoto(location: {x: number; y: number}) {
        // See if the billboard already has photos and get the index if so
        let index = -1;

        for (let i = 0; i < billboards.length; i += 1) {
            if (billboards[i].x === location.x && billboards[i].y === location.y) {
                // Billboard was found, store the index to increment photos taken
                index = i;
                break;
            }
        }

        // Billboard has no photo taken yet
        if (index === -1) {
            billboards.push(createFakeBillboard({...location, photosTaken: 1}));
        }
        // Increment photos taken by 1
        else {
            billboards[index].photosTaken += 1;
        }
    }
}
