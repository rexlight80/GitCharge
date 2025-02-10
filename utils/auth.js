import { CLIENT_ID, CLIENT_SECRET } from "./env";
import { getAccessToken } from "./gitLabApi";


export const onLaunchWebAuthFlow = async () => {
  return new Promise(async (resolve, reject) => {
    try{
    const authUrl = new URL('https://gitlab.com/oauth/authorize?');
    const client_id = CLIENT_ID;
    const client_secret = CLIENT_SECRET;
    const redirect_url =  `https://${chrome.runtime.id}.chromiumapp.org/`;
    const scopes = 'api read_api read_user openid profile';
    const state = Math.random().toString(36).substring(7);
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("client_id", client_id);
    authUrl.searchParams.set("redirect_uri", redirect_url);
    authUrl.searchParams.set("scope", scopes);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("access_type", "offline");
    authUrl.searchParams.set("include_granted_scopes", "true");
    authUrl.searchParams.set("auto_login", "false");
  
    chrome.windows.create({
    url: authUrl.href,
    width: 550,
    height: 550,
    type: 'popup',
    top: 100,
    left: 600,
    focused: true
    }, (window) => {

      chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if(tabId == window.tabs[0].id){
          const params = new URLSearchParams(tab.url.split("?")[1]);
          const code = params.get("code");
         if(code !== null){
            getAccessToken(client_id, client_secret, code, redirect_url).then(data => {
             if(data.access_token){
               //chrome.tabs.sendMessage(tab_Id, {accessToken: data});
               resolve({accessToken: data, winRef: window});
             }
           })
          }
         }
       })
    });
  
      } catch (error) {
        reject(error);
        throw new Error(`Sign-in failed: ${error.message}`);
      }
    })
  }