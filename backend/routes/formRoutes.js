import express from 'express';
import { submitForm } from '../controller/formController.js';
const router = express.Router();

router.post('/submissions', submitForm);

export default router;