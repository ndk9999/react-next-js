import Questions from "../models/questionSchema.js";
import questions, {answers} from '../database/dataSeeder.js';

export async function getQuestions(req, res) {
    try {
        const questionList = await Questions.find();
        res.json(questionList);
    } catch (error) {
        res.json({error});        
    }
}

export async function addQuestions(req, res) {
    try {
        await Questions.insertMany({ questions, answers}, (error, data) => {
            res.json({ msg: 'Data Saved Successfully' });
        });
    } catch (error) {
        res.json({error});        
    }
}

export async function deleteQuestions(req, res) {
    try {
        await Questions.deleteMany();
        res.json('All questions are deleted');
    } catch (error) {
        res.json({error});        
    }
}