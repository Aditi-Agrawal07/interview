import {Request, Response} from "express";
import db from "../db";

// Adding usage
export const addUsage = (req: Request, res: Response) => {
    const { userId, action, usedUnits } = req.body;
    const sql = 'INSERT INTO usagerecords (userId, action, usedUnits) VALUES (?, ?, ?)';

    db.query(sql, [userId, action, usedUnits])
        .then(() => {
            res.status(201).json({ message: 'Usage record added successfully' });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}