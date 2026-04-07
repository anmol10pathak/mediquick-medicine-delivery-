// REGISTER
export const registerUser = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find((u) => u.email === user.email);

  if (exists) {
    alert("User already exists ❌");
    return false;
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  return true;
};

// LOGIN
export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const found = users.find(
    (u) =>
      u.email === String(email).trim() &&
      u.password === String(password).trim()
  );

  if (found) {
    localStorage.setItem("user", JSON.stringify(found));
    return true;
  }

  return false;
};

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("user");
};

// CHECK LOGIN
export const isLoggedIn = () => {
  return localStorage.getItem("user") !== null;
};

// GET CURRENT USER
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};