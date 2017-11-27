const parseAndCheckResponse = response =>
  response
    .json()
    .then(result => {
      if (response.status >= 300)
        throw new Error(
          `Response not successful: Received status code ${response.status}`
        );
      return result;
    })
    .catch(e => {
      const httpError = new Error(
        `Network request failed with status ${response.status} - "${response.statusText}"`
      );
      httpError.response = response;
      httpError.parseError = e;
      httpError.statusCode = response.status;

      throw httpError;
    });
