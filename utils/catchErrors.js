function catchErrors(error, displayError) {
  let errorMsg;
  if (error.response) {
    // The request was made and the server responded with a status code of 2XX
    errorMsg = error.response.data;
    console.error("Error Response: ", errorMsg);

    // For cloudinary error
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
      console.error("Cloudinary Error: ", errorMsg);
    }
  } else if (error.request) {
    // The request was made but no response was received.
    errorMsg = error.request;
    console.error("Error Request: ", errorMsg);
  } else {
    // Something else happened
    errorMsg = error.message;
    console.error("Error Message: ", errorMsg);
  }

  displayError(errorMsg);
}

export default catchErrors;
