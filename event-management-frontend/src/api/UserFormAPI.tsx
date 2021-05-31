import UserForm from '../model/UserForm';
import { serverURL } from './Api';
import { fetchWrapper } from './FetchWrapper';

export function fetchUserByIdAPI(id: number) {
  return fetchWrapper(`${serverURL}/users/${id}`).then((response) => response.json());
}

export function fetchUserByUsernameAPI(username: string) {
  return fetchWrapper(`${serverURL}/users/${username}`).then((response) => response.json());
}

export const addUserAPI = (user: UserForm) => {
  return fetchWrapper(`${serverURL}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((response) => response.json());
};

export const editUserAPI = (user: UserForm) => {
  return fetchWrapper(`${serverURL}/users/${user.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((response) => response.json());
};
