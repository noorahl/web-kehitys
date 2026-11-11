const userItems = [
  {
    user_id: 3002,
    name: 'Maija',
    username: 'maija',
    email: 'maija@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3001,
    name: 'Matti',
    username: 'matti',
    email: 'matti@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3000,
    name: 'Nikke',
    username: 'nikke',
    email: 'nikke@metropolia.fi',
    role: 'user',
    password: 'password',
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.user_id == id);
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = userItems[0].user_id + 1;
  userItems.unshift({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });
  return newId;
};

const modifyUser = (id, newDetails) => {
  const index = userItems.findIndex((user) => id === user.user_id);
  userItems[index] = {...userItems[index], ...newDetails};
  return index !== -1;
};

const removeUser = (id) => {
  const index = userItems.findIndex((user) => id === user.user_id);
  userItems.splice(index, 1);
  // palauttaa true, jos poisto onnistui
  return index !== -1;
};

export {listAllUsers, findUserById, addUser, modifyUser, removeUser};
