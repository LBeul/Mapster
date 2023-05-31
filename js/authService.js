const users = [
  {
    id: "admina",
    isAdmin: true,
    password: "password",
  },
  {
    id: "normalo",
    isAdmin: false,
    password: "password",
  },
];

const isValidUserData = (username, password) => {
  const user = users.find((u) => u.id === username);
  if (user) {
    const isCorrectPwd = user.password === password;
    return isCorrectPwd;
  }
  return false;
};

const isAdmin = (name) => users.find((u) => u.id === name)?.isAdmin;

export { isValidUserData, isAdmin };
