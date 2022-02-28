const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const errorProcess = require('./middlewares/error-process');
const { loginValidation, createUserValidation } = require('./middlewares/userValidation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/CORS');
const routes = require('./routes/index');
const auth = require('./middlewares/auth');

// Ограничиваем кол-во запросов от пользователей
const limiter = require('./utils/rate-limiter');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const {
  login,
  createUser,
} = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(cors);

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);
app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок
app.use(limiter);

app.use(errors());
app.use(errorProcess);

app.listen(PORT, () => {
});
