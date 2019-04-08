import { Router } from 'express';
import * as todoController from './todo-controller';

const router = Router();

router.get('/', todoController.getAllTodos);
router.post('/createATodo', todoController.createATodo);
router.delete('/delete/:delete_id', todoController.deleteTodo);

export { router }