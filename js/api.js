//FUNCTION CREATE FETCH

const sendRequest = (url, methodArg, onSuccess, onError, bodyArg) => {
  fetch(
    url,
    {
      method: methodArg,
      body: bodyArg,
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
