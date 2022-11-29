import { Router } from "express";
import * as questionController from '../controllers/questionController.js';
import * as resultController from "../controllers/resultController.js";

const router = Router();

router.route('/questions')
    .get(questionController.getQuestions)
    .post(questionController.addQuestions)
    .delete(questionController.deleteQuestions);

router.route('/results')
    .get(resultController.getResults)
    .post(resultController.saveResults)
    .delete(resultController.deleteResults);

export default router;