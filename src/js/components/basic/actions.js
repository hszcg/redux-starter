import * as t from './actionTypes';
import Logger from 'shared/lib/logger';

const getUser = (data) => {
  return {
    data,
    type: t.GET_USER_INFO
  };
};


function getUserAjax() {
  const url = 'https://api.github.com/users/hszcg';

  return (dispatch, getState) => {
    fetch(url, {
      credentials: 'same-origin'
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      dispatch(getUser(response));
    })
    .then(() => {
      return Promise.resolve();
    })
    .catch((err) => {
      Logger.error(err);
      Logger.error(`Fetch ${url} fails`);
    });
  };
}

export const init = () => (dispatch, getState) => {
  dispatch(getUserAjax());
};
