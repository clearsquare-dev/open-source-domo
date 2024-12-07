const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 5000;

// Demo data
// Demo data
// You will need to get your our client_id and client_secret (the ones below have been deleted out for obvious security reasons).
// Go to docs.clearsquare.co/domo-everywhere for more helpful tips on set up.
const DEMO_DATA = {
  credentials: {
    client_id: "20358e05-1205-48aa-be25-07f7617cfd08",
    client_secret: "f5d84f2d0381a10facc4835a3dc14617477338bc668975b9ae3f42a9729f21b3",
  },
  // Example of filters (uncomment to use):
  // filters: [
  //     {
  //         "column": "Store Region",
  //         "operator": "EQUALS",
  //         "values": ["West"],
  //         // Use dataset switching (optional):
  //         // "datasourceId": "dc609d37-4854-47ec-af72-c3fefd2bf990"
  //     }
  // ],
  filters: [],
  page: {
    pageType: "EMBED_DASHBOARD",
    responseType: "src",
    pageEmbedCode: "xvJor", // Example embed code for a Domo page from the Clearsquare Domo instance
    // Example of additional app data (optional):
    // "appData": "matthew@clearsquare.co"
  },
};

// Function to get DOMO Embed URL Token
async function getDomoEmbedUrlToken(params) {
  try {
    const credentials = params.credentials;
    const filters = params.filters || [];
    const page = params.page || {};

    const ACCESS_TOKEN_URL = "https://api.domo.com/oauth/token?grant_type=client_credentials";
    const client_id = credentials.client_id;
    const client_secret = credentials.client_secret;

    if (!client_id || !client_secret) {
      return { status: 400, message: "Invalid credentials" };
    }

    // Encode client_id and client_secret in Base64 for Basic Authentication
    const base64ClientData = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
    const headers = { Authorization: `Basic ${base64ClientData}` };

    // Fetch access token
    const accessTokenResponse = await axios.get(ACCESS_TOKEN_URL, { headers });
    const accessToken = accessTokenResponse.data.access_token;

    const EMBED_URL = "https://api.domo.com/v1/stories/embed/auth";
    const payload = {
      sessionLength: 1400,
      authorizations: [
        {
          token: page.pageEmbedCode, // Embed code for the Domo page
          permissions: ["READ", "FILTER", "EXPORT"], // Example permissions
          filters: filters, // Pass in any filters
        },
      ],
    };

    // Fetch embed token
    const embedTokenResponse = await axios.post(EMBED_URL, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const embedToken = embedTokenResponse.data.authentication;

    const pageUrl = `https://public.domo.com/embed/pages/${page.pageEmbedCode}`;

    // Generate iframe HTML for embedding
    const iframeHtml = `
            <iframe id="iframe" title="page-embed" src="" width="100%" height="100%" marginHeight="0" marginWidth="0" frameBorder="0"
                srcDoc='<html>
                <body>
                  <form id="form" action="${pageUrl}" method="post">
                    <input type="hidden" name="embedToken" value="${embedToken}" />
                  </form>
                </body>
                <script>document.getElementById("form").submit();</script>
              </html>'>
            </iframe>
        `;

    return { iframeHtml, pageUrl, embedToken };
  } catch (error) {
    console.error("Error in getDomoEmbedUrlToken:", error.message);
    return { status: 400, message: `Failed to get embed token: ${error.message}` };
  }
}

// Route to render the DOMO demo
app.get("/", async (req, res) => {
  try {
    const response = await getDomoEmbedUrlToken(DEMO_DATA);

    if (response.status === 400) {
      return res.status(400).json(response);
    }

    const iframeHtml = response.iframeHtml;
    if (!iframeHtml) {
      return res.status(500).send("Error: No valid iframe HTML generated.");
    }

    res.send(iframeHtml);
  } catch (error) {
    console.error("Error in / route:", error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
