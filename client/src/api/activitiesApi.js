const apiRoot = 'http://localhost:3002/activities';

export const getRunsByUserById = async (userId) => {
  const response = await fetch(`${apiRoot}/runs?userId=${userId}`);
  const data = await response.json();
  return data.runs;
};
