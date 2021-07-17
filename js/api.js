//FUNCTION CREATE FETCH

const sendRequest = (url, methodArg, bodyArg, onSuccess, onError) => {
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
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });
};

export{sendRequest};


