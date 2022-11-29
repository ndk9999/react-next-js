import Results from "../models/resultSchema.js";

export async function getResults(req, res) {
    try {
        const resultList = await Results.find();
        res.json(resultList);
    } catch (error) {
        res.json({error});        
    }
}

export async function saveResults(req, res) {
    try {
        const {userId, userAnswers, attempts, earnedPoints, finalResult} = req.body;

        if (!userId || !userAnswers) {
            throw new Error('Result data is invalid');
        }

        await await Results.create({userId, userAnswers, attempts, earnedPoints, finalResult}, (err, data) => {
            res.json('User results have been saved');
        });
    } catch (error) {
        res.json({error});        
    }
}

export async function deleteResults(req, res) {
    try {
        await Results.deleteMany();
        res.json('All results have been deleted');
    } catch (error) {
        res.json({error});        
    }
}