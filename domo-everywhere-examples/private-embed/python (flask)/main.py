from flask import Flask

app = Flask(__name__)

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)
from flask import Flask, render_template_string, jsonify
import requests
import base64

app = Flask(__name__)

# Demo data
# You will need to get your our client_id and client_secret (the ones below have been deleted out for obvious security reasons).
# Go to docs.clearsquare.co/domo-everywhere for more helpful tips on set up.
DEMO_DATA = {
    "credentials": {
        "client_id":
        "20358e05-1205-48aa-be25-07f7617cfd08",
        "client_secret":
        "f5d84f2d0381a10facc4835a3dc14617477338bc668975b9ae3f42a9729f21b3"
    },
    # Example:
    # "filters": [{
    #     "column": "Store Region",
    #     "operator": "EQUALS",
    #     "values": ["West"]
    #     # "datasourceId": "dc609d37-4854-47ec-af72-c3fefd2bf990"
    # }],
    "filters": [],
    "page": {
        "pageType": "EMBED_DASHBOARD",
        "responseType": "src",
        "pageEmbedCode": "xvJor"
        # "appData": "matthew@clearsquare.co"
    }
}


# Get DOMO Embed URL Token
def get_domo_embed_url_token(params):
    print("Entered get_domo_embed_url_token with params:", params)
    credentials = params.get("credentials", {})
    filters = params.get("filters", [])
    page = params.get("page", {})

    ACCESS_TOKEN_URL = "https://api.domo.com/oauth/token?grant_type=client_credentials"
    client_id = credentials.get("client_id")
    client_secret = credentials.get("client_secret")

    if not client_id or not client_secret:
        print("Invalid credentials detected")
        return {"status": 400, "message": "Invalid credentials"}

    base64_client_data = base64.b64encode(
        f"{client_id}:{client_secret}".encode()).decode()
    headers = {"Authorization": f"Basic {base64_client_data}"}
    print("Headers prepared for access token request:", headers)

    try:
        access_token_response = requests.get(ACCESS_TOKEN_URL, headers=headers)
        print("Access token response status:",
              access_token_response.status_code)
        print("Access token response body:", access_token_response.text)
        access_token_response.raise_for_status()
        access_token = access_token_response.json().get("access_token")
        print("Access token retrieved:", access_token)
    except Exception as e:
        print("Error during access token retrieval:", str(e))
        return {
            "status": 400,
            "message": f"Failed to get access token: {str(e)}"
        }

    EMBED_URL = "https://api.domo.com/v1/stories/embed/auth"
    payload = {
        "sessionLength":
        1400,
        "authorizations": [{
            "token": page.get("pageEmbedCode"),
            "permissions": ["READ", "FILTER", "EXPORT"],
            "filters": filters,
        }],
    }
    print("Payload prepared for embed token request:", payload)

    try:
        embed_token_response = requests.post(EMBED_URL,
                                             json=payload,
                                             headers={
                                                 "Authorization":
                                                 f"Bearer {access_token}",
                                                 "Content-Type":
                                                 "application/json"
                                             })
        print("Embed token response status:", embed_token_response.status_code)
        print("Embed token response body:", embed_token_response.text)
        embed_token_response.raise_for_status()
        embed_token = embed_token_response.json().get("authentication")
        print("Embed token retrieved:", embed_token)
    except Exception as e:
        print("Error during embed token retrieval:", str(e))
        return {
            "status": 400,
            "message": f"Failed to get embed token: {str(e)}"
        }

    page_url = f"https://public.domo.com/embed/pages/{page.get('pageEmbedCode')}"
    print("Page URL prepared:", page_url)

    iframe_html = f"""
    <iframe id="iframe" title="page-embed" src="" width="100%" height="100%" marginHeight="0" marginWidth="0" frameBorder="0"
        srcDoc='<html>
        <body>
          <form id="form" action="{page_url}" method="post">
            <input type="hidden" name="embedToken" value="{embed_token}" />
          </form>
        </body>
        <script>document.getElementById("form").submit();</script>
      </html>'>
    </iframe>
    """
    print("Iframe HTML prepared:", iframe_html)

    return {
        "iframeHtml": iframe_html,
        "pageUrl": page_url,
        "embedToken": embed_token,
    }


@app.route('/', methods=['GET'])
def domo_demo():
    print("Entered /domo-demo route")
    try:
        response = get_domo_embed_url_token(DEMO_DATA)
        print("Response from get_domo_embed_url_token:", response)
        if response.get("status") == 400:
            print("Error in response:", response)
            return jsonify(response), 400

        iframe_html = response.get("iframeHtml", "")
        if not isinstance(iframe_html, str) or not iframe_html:
            print("Error: No valid iframe HTML generated")
            return "Error: No valid iframe HTML generated.", 500

        print("Rendering iframe HTML")
        return render_template_string(iframe_html)
    except Exception as e:
        print("Exception in /domo-demo route:", str(e))
        return f"Error: {str(e)}", 500


if __name__ == "__main__":
    print("Starting Flask application")
    app.run(host='0.0.0.0', port=5000)
