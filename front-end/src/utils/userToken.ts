const getUserToken = (): string | null => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
  return null;
};

const removeUserToken = () => {
  localStorage.removeItem("token");
};

export { getUserToken, removeUserToken };
