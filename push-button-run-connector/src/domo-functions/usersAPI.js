import domo from "ryuu.js";

import { testDomoUsersDetailsArray } from "src/domo-functions/test-data/users";

const baseURL = "/domo/users/v1";

export const getAllUsers = async ({ includeDetails = false, limit = 10, offset = 0, useAsync = true, debugging = false }) => {
  if (debugging) {
    return testDomoUsersDetailsArray;
  }

  const url = `${baseURL}?includeDetails=${includeDetails}&limit=${limit}&offset=${offset}`;
  const options = { contentType: "multipart" };
  if (useAsync) {
    return await domo.get(url, options);
  } else {
    domo.get(url, options).then((response) => response);
  }
};

export const getSingleUser = async ({ userId, includeDetails = false, useAsync = true, onSynchronousComplete = () => {}, debugging = false }) => {
  if (debugging) {
    return testDomoUsersDetailsArray[0];
  }
  const url = `${baseURL}/${userId}?includeDetails=${includeDetails}`;
  const options = { contentType: "multipart" };
  if (useAsync) {
    return await domo.get(url, options);
  } else {
    return domo.get(url, options).then((response) => onSynchronousComplete(response));
  }
};
