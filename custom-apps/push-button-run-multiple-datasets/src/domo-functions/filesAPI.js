import Download from "downloadjs";
import domo from "ryuu.js";
import { testDomoFilePermissionsObject, testDomoFilesArray } from "src/domo-functions/test-data/files";

const baseURL = "/domo/data-files/v1";

export const uploadFile = ({ name, description = "", isPublic = false, file, debugging = false }) => {
  const formData = new FormData();
  formData.append("file", file);
  const url = `${baseURL}?name=
             ${name}&description=${description}&public=${isPublic}`;
  const options = { contentType: "multipart" };
  return domo.post(url, formData, options);
};

export const uploadRevision = ({ file, dataFileId, debugging = false }) => {
  const formData = new FormData();
  formData.append("file", file);
  const url = `/${baseURL}/${dataFileId}`;
  const options = { contentType: "multipart" };
  return domo.put(url, formData, options);
};

function sortFilesByDateDescending(files) {
  return files.sort((a, b) => new Date(b.datetimeCreated) - new Date(a.datetimeCreated));
}

export const getFileDetailsList = async ({ idList = null, expandList = null, limitToOwned = false, sortOrder = "DESC", debugging = false }) => {
  if (debugging) {
    if (sortOrder === "ASC") return sortFilesByDateDescending(testDomoFilesArray);
    return testDomoFilesArray;
  }

  let url = `${baseURL}/details/?limitToOwned=${limitToOwned}`;
  if (idList !== null) {
    url += `&ids=${idList.join()}`;
  }
  if (expandList !== null) {
    url += `&expand=${expandList.join()}`;
  }

  try {
    let filesResponse = await domo.get(url);
    if (sortOrder === "ASC") return sortFilesByDateDescending(filesResponse);
    return filesResponse;
  } catch (error) {
    console.dir("error", error);
  }
  return [];
};

export const getFileDetails = async ({ dataFileId, expandList = null, debugging = false }) => {
  if (debugging) {
    return testDomoFilesArray[0];
  }

  let url = `${baseURL}/${dataFileId}/details`;
  if (expandList !== null) {
    url += `?expand=${expandList.join()}`;
  }

  return await domo.get(url);
};

export const previewFile = async ({ file, dataFileId, revisionId, debugging = false }) => {
  if (debugging) {
    return "blob:https://8207d7e3-4034-4589-b97d-9ec42290e757.domoapps.prod5.domo.com/80d8a700-d158-44e6-a20b-a994949f206c";
  }

  const options = { responseType: "blob" };
  const url = `${baseURL}/${dataFileId}${!!revisionId ? `/revisions/${revisionId}` : ""}`;
  try {
    return domo.get(url, options).then((data) => {
      const blob = new Blob([data], { type: file.currentRevision.contentType });
      return URL.createObjectURL(blob);
    });
  } catch (error) {
    console.dir("error", error);
  }
  return "";
};

export const downloadFile = ({ dataFileId, filename, revisionId, debugging = false }) => {
  if (debugging) {
    Download("blob:https://8207d7e3-4034-4589-b97d-9ec42290e757.domoapps.prod5.domo.com/80d8a700-d158-44e6-a20b-a994949f206c", filename);
    return;
  }

  const options = { responseType: "blob" };
  const url = `${baseURL}/${dataFileId}${!!revisionId ? `/revisions/${revisionId}` : ""}`;
  return domo.get(url, options).then((data) => {
    Download(data, filename);
  });
};

export const deleteFile = ({ dataFileId, revisionId, debugging = false }) => {
  if (debugging) {
    return;
  }

  const url = `${baseURL}/${dataFileId}/revisions/${revisionId}`;
  return domo.delete(url);
};

export const getFilePermissions = async ({ dataFileId, debugging = false }) => {
  if (debugging) {
    return testDomoFilePermissionsObject;
  }

  const url = `${baseURL}/${dataFileId}/permissions`;
  try {
    return await domo.get(url);
  } catch (error) {
    console.dir("error", error);
  }
  return {};
};

export const updateFilePermissions = async ({ dataFileId, data, debugging = false }) => {
  if (debugging) {
    return "";
  }

  const url = `${baseURL}/${dataFileId}/permissions`;
  return await domo.put(url, data);
};
