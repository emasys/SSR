/* eslint-disable global-require */
import express from 'express';
import 'express-yields';
import fs from 'fs-extra';
import webpack from 'webpack';

const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
  const config = require('../webpack.config.dev');
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

// eslint-disable-next-line func-names
app.get(['/'], function* (req, res) {
  const index = yield fs.readFile('./public/index.html', 'utf-8');
  res.send(index);
});


app.listen(port, '0.0.0.0', () => console.log(`app running on ${port}`));
