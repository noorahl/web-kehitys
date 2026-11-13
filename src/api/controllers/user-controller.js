import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getAllUsers = async (req, res) => {
  const users = await listAllUsers();
  res.json({
    message: 'Tässä Käyttäjät',
    time: req.requestTime,
    data: users,
  });
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) {
    return res.status(404).json({message: 'Käyttäjää ei löytynyt'});
  }
  res.json(user);
};

const addNewUser = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const result = await addUser(req.body);
  if (result) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const updateUser = async (req, res) => {
  const result = await modifyUser(Number(req.params.id), req.body);
  if (result) {
    res.json({message: 'User updated!'});
  } else {
    res.status(404).json({error: 404, message: 'Not found.'});
  }
};

const deleteUser = async (req, res) => {
  const result = await removeUser(Number(req.params.id));
  if (result) {
    res.json({message: 'User removed!'});
  } else {
    res.status(404).json({error: 404, message: 'Not found.'});
  }
};

export {getAllUsers, getUserById, addNewUser, updateUser, deleteUser};
