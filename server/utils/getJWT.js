import jwt from 'jsonwebtoken';
import config from '../config/config.js';
export default (id) =>
  jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: '5h',
  });
// console.log(
//   jwt.verify(
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjg5Y2Q5ZWU5YWRjNTM4MWM5NjhmMiIsImlhdCI6MTY2MzcxNzkzNiwiZXhwIjoxNjYzNzE3OTQxfQ.j0zSbDlxCE11sQ-IKIpvbKI833wZWacnoZ3dY-OmkNw',
//     config.JWT_SECRET
//   )
// );
