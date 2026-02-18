import { Request, Response } from "express";
import db from "../db";

// Controller : Getting Current Usage
export const getCurrentUsage = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const sql = 'SELECT SUM(usedUnits) AS totalUsedUnits FROM usagerecords WHERE userId = ? AND MONTH(createdAt) = MONTH(CURRENT_DATE()) AND YEAR(createdAt) = YEAR(CURRENT_DATE())';
    db.query(sql, [userId])
        .then(([rows]: any) => {
            const totalUsedUnits = rows[0].totalUsedUnits || 0;
            res.json({ userId, totalUsedUnits });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

// Controller : Getting Billing Summary
export const getBillingSummary = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const sql = `select p.id as planId, 
    p.name as planName, p.monthlyQuota ,
     p.extraChargePerUnit, 
     COALESCE(SUM(u.usedUnits), 0) as totalUsage from subscriptions s
     join plans p on p.Id = s.planId
     left join usagerecords u on u.userId = s.userId AND 
     MONTH(u.createdAt) = MONTH(CURRENT_DATE())
      AND YEAR(u.createdAt) = YEAR(CURRENT_DATE())
      where s.userId = ? AND s.isActive = TRUE Group by p.id`;

      db.query(sql, [userId])
        .then(([rows]: any) => {
const data = rows[0];

const extraUnits = data.totalUsage > data.monthlyQuota ? data.totalUsage - data.monthlyQuota : 0;
const extraCharges = Number(extraUnits * data.extraChargePerUnit).toFixed(2);
        res.json({userId, plan:{
            id: data.planId,
            name: data.planName,
            monthlyQuota: data.monthlyQuota,
            extraChargePerUnit: data.extraChargePerUnit,
            totalUsage: data.totalUsage,
            extraUnits,
            extraCharges
        }} );
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
        });

        const data= res
}