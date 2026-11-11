import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

const getAllUsers = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = findUserById(id);
  if (!user) {
    return res.status(404).json({message: 'Not found'});
  }
  res.json(user);
};

const addNewUser = (req, res) => {
  console.log('request', req.body);
  const id = addUser(req.body);
  res.status(201).json({user_id: id});
};

const updateUser = (req, res) => {
  const result = modifyUser(Number(req.params.id), req.body);
  if (result) {
    res.json({message: 'User item updated'});
  } else {
    res.status(404).json({error: 404, message: 'Not found'});
  }
};

const deleteUser = (req, res) => {
  const result = removeUser(Number(req.params.id));
  if (result) {
    res.json({message: 'User item deleted.'});
  } else {
    res.status(404).json({error: 404, message: 'Not found.'});
  }
};

export {getAllUsers, getUserById, addNewUser, updateUser, deleteUser};
