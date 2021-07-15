//FUNCTION CREATE FETCH
const createFetchTemplate = (url, method, onSuccess, onError, body) => () => {
  fetch(url, method, body)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((json) => {
      onSuccess(json);
    })
    .catch((err) => {
      onError(err);
    });
};

export{createFetchTemplate};


