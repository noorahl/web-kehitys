import express from 'express';
import {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUser,
  deleteUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(addNewUser);

userRouter.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

export default userRouter;
