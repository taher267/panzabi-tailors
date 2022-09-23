import config from '../config/config.js';
export const checkAdmin = (roles) => {
  let isAdmin = false;
  const adminRoles = config.ADMIN_ACCESS;
  for (const role of adminRoles) {
    if (roles.includes(role)) {
      isAdmin = true;
      continue;
    }
  }
  return isAdmin;
};

export const checkUser = () => {
  let isUser = false;
  const UserRoles = config.USER_ACCESS;
  for (const role of UserRoles) {
    if (user.roles.includes(role)) {
      isUser = true;
      continue;
    }
  }
  return isUser;
};
