const apiRoot = 'http://localhost:3002/activities';

export const getRunsByUserById = async (userId) => {
  const response = await fetch(`${apiRoot}/runs?userId=${userId}`);
  const data = await response.json();
  return data.runs;
};

export const putRun = async ({userId, distance, duration, date}) => {
  const response = await fetch(`${apiRoot}/runs`,{
    body: JSON.stringify({userId, distance, duration, date}),
    headers: {
      'content-type': 'application/json'
    },
    method: 'PUT',
  });
  const data = await response.json();
  return data.run;
};
