const express = require('express');
const app = express();
const PORT = 3000;
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
