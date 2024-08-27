import { http, delay, HttpResponse } from 'msw';
const isAuthenticated = (login, password) => {
  return login === 'admin' && password === 'admin';
};

export const handlerAuth = [
  http.post('/api/auth/login', async ({ request }) => {
    const { login, password } = (await request.json()) as { login: string; password: string };
    console.log(login, password);
    const statusCode = isAuthenticated(login, password) ? 200 : 400;
    const data = isAuthenticated(login, password)
      ? {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTB9.txWLuN4QT5PqTtgHmlOiNerIu5Do51PpYOiZutkyXYg',
          expires_in: 86400
        }
      : {
          errorCode: '400',
          errorMessage: 'Auth Failed.'
        };
    await delay(1000);
    return HttpResponse.json(data, { status: statusCode });
  })
];
