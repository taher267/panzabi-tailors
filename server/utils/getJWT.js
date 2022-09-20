import jwt from 'jsonwebtoken';
import config from '../config/config.js';
export default (id) =>
  jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: '1h',
  });
