const apiRoot = 'http://localhost:3002/users';

export const getUserById = async (userId) => {
  const response = await fetch(`${apiRoot}/${userId}`);
  const data = await response.json();
  return data.user;
};
