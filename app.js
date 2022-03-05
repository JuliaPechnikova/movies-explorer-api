require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const errorProcess = require('./middlewares/error-process');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/CORS');
const routes = require('./routes/index');

// Ограничиваем кол-во запросов от пользователей
const limiter = require('./utils/rate-limiter');

const { MONGO_ADDR } = require('./utils/config');

const { PORT = 3000, MONGO_DB, NODE_ENV } = process.env;
const app = express();

app.use(requestLogger);
app.use(helmet());
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(NODE_ENV === 'production' ? MONGO_DB : MONGO_ADDR);

app.use(cors);

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(errorProcess);

app.listen(PORT, () => {
});
