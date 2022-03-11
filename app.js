const express = require('express');
const mongoose = require('mongoose');
const { ERR_NOT_FOUND } = require('./utils');

const app = express();
const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

async function start() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
}

start()
  .then(() => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use((req, res, next) => {
      req.user = {
        _id: '622af57d91f86803ddb12e37',
      };
      next();
    });
    app.use(userRouter);
    app.use(cardRouter);
    app.use('/', (req, res) => {
      res.status(ERR_NOT_FOUND).send({ message: `Ошибка статус ${ERR_NOT_FOUND}. Страница не найдена.` });
    });
  })
  .catch(() => {
    console.log('Ошибка. Что-то пошло не так.');
    process.exit();
  });