//FUNCTION CREATE FETCH

const sendRequest = (url, method, onSuccess, onError, body) => {
  fetch(
    url,
    {
      method,
      body,
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
};

export{sendRequest};
