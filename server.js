const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const SECRET_KEY = 'mysecretkey_facu';

server.use(middlewares);
server.use(jsonServer.bodyParser);

console.log()

// Servicio de autenticación
server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = router.db
    .get('users')
    .find({ username, password })
    .value();
    console.log("User",user);
  if (user) {
    const token = jwt.sign({ userId: user.password}, SECRET_KEY);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Middleware para verificar el token de autenticación
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Servicio CRUD de películas
server.get('/movies', (req, res) => {
  const movies = router.db.get('movies').value();
  console.log("Pelis",movies)
  res.json(movies);
});

server.get('/movies/:id', (req, res) => {
  const movie = router.db
    .find({ id: parseInt(req.params.id) })
    .value();
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

server.post('/movies', verifyToken, (req, res) => {
  const { title, year, genere } = req.body;
  const newMovie = {
    id: Date.now(),
    title,
    year,
    genere,
  };
  router.db.get('movies').push(newMovie).write();
  res.json(newMovie);
});

server.put('/movies/:id', verifyToken, (req, res) => {
  const { title, year, genere } = req.body;
  const movie = router.db
    .get('movies')
    .find({ id: parseInt(req.params.id) })
    .value();
  if (movie) {
    movie.title = title;
    movie.year = year;
    movie.genere = genere;
    router.db.get('movies').write();
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

server.delete('/movies/:id', verifyToken, (req, res) => {
  const movie = router.db
    .get('movies')
    .find({ id: parseInt(req.params.id) })
    .value();
  if (movie) {
    router.db.get('movies').remove({ id: parseInt(req.params.id) }).write();
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

server.listen(3002, () => {
  console.log('JSON Server is running');
});