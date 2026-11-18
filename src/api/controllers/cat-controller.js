import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
  findCatByUserId,
} from '../models/cat-model.js';

const getAllCats = async (req, res) => {
  //const cats = [{cat_id: 1, name: 'Misu'}];
  console.log('Ollaan nyt controllerissa');
  // res.json(listAllCats());
  const cats = await listAllCats();

  // esimerkki siitä että middleware on muokannut req-objektia
  res.json({
    message: 'Tässä kissat',
    time: req.requestTime,
    data: cats,
  });
};

const getCatById = async (req, res, next) => {
  const cat = await findCatById(req.params.id);

  if (!cat) {
    const error = new Error('Kissaa ei löytynyt');
    error.status = 404;
    return next(error);
  }

  res.json(cat);
};

const getCatsByUserId = async (req, res, next) => {
  const userId = Number(req.params.id);
  const cats = await findCatByUserId(userId);

  if (!cats) {
    const error = new Error('Kissaa ei löytynyt');
    error.status = 404;
    return next(error);
  }

  res.json(cats);
};

const postCat = async (req, res, next) => {
  // check if file is rejected by multer
  if (!req.file) {
    const error = new Error('Invalid or missing file');
    error.status = 400;
    return next(error);
  }

  console.log('request', req.body);
  console.log(req.file);
  console.log(req.file.filename);
  req.body.filename = req.file.filename;
  req.body.owner = res.locals.user.user_id;

  const result = await addCat(req.body);
  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(201).json({message: 'New media item added.', ...result});
};

const deleteCat = async (req, res, next) => {
  const result = await removeCat(Number(req.params.id), res.locals.user);

  if (!result) {
    const error = new Error('Not found.');
    error.status = 404;
    return next(error);
  }

  res.json({message: 'Cat removed!'});
};

const putCat = async (req, res, next) => {
  const result = await modifyCat(Number(req.params.id), req.body);

  if (!result) {
    const error = new Error('Not found.');
    error.status = 404;
    return next(error);
  }

  res.json({message: 'Cat updated!'});
};

export {getAllCats, getCatById, postCat, deleteCat, putCat, getCatsByUserId};
