const getUserToken = (): string | null => {
  const token = localStorage.getItem("token");
  console.log('gettoken:"', token);
  if (token) {
    return token;
  }
  return null;
};

const removeUserToken = () => {
  localStorage.removeItem("user-token");
};

export { getUserToken, removeUserToken };
