const express = require('express');
const mongoose = require('mongoose');

const rateLimit = require('express-rate-limit');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const errorProcess = require('./middlewares/error-process');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/CORS');
const routes = require('./routes/index');

// Ограничиваем кол-во запросов от пользователей
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(cors);

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок
app.use(limiter);

app.use(errors());
app.use(errorProcess);

app.listen(PORT, () => {
});
