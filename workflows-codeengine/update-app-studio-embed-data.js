const codeengine = require('codeengine')

/**
 * This function allows you to create an Embed ID for a dashboard. The visibility argument is looking for public, private or off (not case sensitive).
 * @param {text} pageId
 * @param {text} visibility
 * @param {boolean} showTitle
 * @param {boolean} allowInteractions
 * @param {boolean} showFilterBar
 * @param {boolean} allowDataExport
 * @param {boolean} showDataMaximization
 * @param {boolean} persistFilters
 * @param {boolean} openLinksInNewTab
 * @returns {object}
 */
async function updateAppStudioEmbedData(
  pageId,
  dataExport = true,
) {
  
  let options = {
    dataMaximization: true,
    filterBarOpen: false,
    filters: false,
    interactions: true,
    openLinksInNewTab: true,
    persistFilters: false,
    publicLink: "PRIVATE",
    scheduledReport: false, 
    title: true,
  };

  const url = `/api/content/v1/pages/embed/${pageId}/state`;

  const body = {
    dataExport,
    ...options
  };

  try {
    const {gatewayToken, ...rest} = await codeengine.sendRequest(
      'PUT',
      url,
      body,
    );

  } catch (error) {
    throw error;
  }
}