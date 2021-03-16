import { Auth } from 'aws-amplify';

export const fetchWrapper = (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  return Auth.currentSession().then((data) => {
    return fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${data.getIdToken().getJwtToken()}`,
      },
    });
  });
};
