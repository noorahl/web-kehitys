const cats = [
  {
    cat_id: 3,
    name: 'Misu',
    birthdate: '20.09.2022',
    weight: 4,
    owner: 'Nikke',
    image: 'https://placecats.com/300/200',
  },
  {
    cat_id: 2,
    name: 'Miu',
    birthdate: '20.04.2022',
    weight: 3,
    owner: 'Maija',
    image: 'https://placecats.com/300/200',
  },
  {
    cat_id: 1,
    name: 'Mau',
    birthdate: '20.03.2022',
    weight: 5,
    owner: 'Mikko',
    image: 'https://placecats.com/300/200',
  },
];

const listAllCats = () => {
  return cats;
};

const findCatById = (id) => {
  // 2. Etsitään kissa taulukosta
  // find palauttaa ensimmäisen löytyneen olion tai undefined
  return cats.find((item) => item.cat_id == id);
};

const addCat = (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const newId = cats[0].cat_id + 1;
  cats.unshift({
    cat_id: newId,
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  });
  return newId;
};

const removeCat = (id) => {
  const index = cats.findIndex((cat) => id === cat.cat_id);
  cats.splice(index, 1);
  // palauttaa true, jos poisto onnistui
  return index !== -1;
};

const modifyCat = (id, newDetails) => {
  const index = cats.findIndex((cat) => id === cat.cat_id);
  // create new object and combine properties/values of two objects inside it
  cats[index] = {...cats[index], ...newDetails};
  // palauttaa true, jos muokkaus onnistui
  return index !== -1;
};

export {listAllCats, findCatById, addCat, removeCat, modifyCat};
