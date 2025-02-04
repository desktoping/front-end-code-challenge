import {Request, Response} from 'express';
import {createFakeBillboard} from '../helpers';

export default function (req: Request<{id: string}>, res: Response) {
    const id = req.query.id;
    if (!id || typeof id !== 'string') {
        res.json({
            success: false,
            message: 'You must pass in an ID'
        });
        return;
    }

    res.json({
        success: true,
        billboard: createFakeBillboard({id})
    });
}
