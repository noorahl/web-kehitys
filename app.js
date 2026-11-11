import express from 'express';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

const cats = [
  {
    cat_id: 1,
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
    cat_id: 3,
    name: 'Mau',
    birthdate: '20.03.2022',
    weight: 5,
    owner: 'Mikko',
    image: 'https://placecats.com/300/200',
  },
];

app.use(express.static('public'));
//app.use('/images', express.static('public'));

// needed for reading request body in JSON format
app.use(express.json());

// käynnistään HTTP- palvelimen kuuntelemaan porttia
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// express kutsuu reitin callback-funktiota
// req sisältää pyyntöä koskevat tiedot ja res vastaustoiminnot
app.get('/kissa', (req, res) => {
  res.send('Welcome to my REST API mororo!');
});

app.get('/api/v1/cats', (req, res) => {
  res.json(cats);
});

app.get('/api/v1/cats/:id', (req, res) => {
  console.log('path variables', req.params);

  for (let cat of cats) {
    if (Number(req.params.id) === cat.cat_id) {
      return res.json(cat);
    }
  }

  res.sendStatus(404);

  /* PALAUTTAKAA VAIN YKSI KISSA req.params.id haulla

  // 1. Haetaan ID URL-parametrista ja muunnetaan numeroksi
  const id = Number(req.params.id);
  console.log(id);

  // 2. Etsitään kissa taulukosta
  // find palauttaa ensimmäisen löytyneen olion tai undefined
  const cat = cats.find((cat) => cat.cat_id === id);

  // 3. Jos kissaa ei löydy, palautetaan 404
  if (!cat) {
    return res.status(404).json({message: 'Kissaa ei löytynyt'});
  }

  // 4. Jos kissa löytyy, palautetaan sen tiedot
  res.json(cat);*/
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.post('/api/v1/cats', (req, res) => {
  console.log('request', req.body);
  res.sendStatus(201);
});
