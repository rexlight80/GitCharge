import {getProjectBySearch} from '../../../utils/gitLabApi';
import { onLaunchWebAuthFlow } from '../../../utils/auth';
import Mellowtel from "mellowtel";
import { MELLOWTEL_PUBLIC_KEY , CLIENT_ID} from '../../../utils/env';

var WebsiteUrl;
var WebsiteUrlPathNames;
var ListOfProject;
var projectId;
let mellowtel;

(async () => {
   mellowtel = new Mellowtel(MELLOWTEL_PUBLIC_KEY);
   await mellowtel.initBackground();
})();

const injectScript = async () => {

  chrome.tabs.query({active: true, lastFocusedWindow: true}).then(async (tab) => {
     WebsiteUrl = tab[0].url;
     WebsiteUrlPathNames = new URL(tab[0].url)?.pathname.substring(1).split('/');
     ListOfProject = await getProjectBySearch(WebsiteUrlPathNames[0], WebsiteUrlPathNames[1]);
     if(ListOfProject.length > 0){
        projectId = ListOfProject[0].id;
      }
      
      if(
         WebsiteUrl.match('https://gitlab.com/*/*') 
         && 
         WebsiteUrlPathNames.length > 1
         &&
         ListOfProject.length >= 1
      ) {
         try{
         chrome.storage.local.set({'tabID': tab[0].id});
         await chrome.scripting.executeScript(
              {
              target: {tabId: tab[0].id},
              files: [ "contentScript.bundle.js" ],
              },
              (result) => {
                 if(result[0].documentId.length > 0){
                    chrome.tabs.sendMessage(tab[0].id, { projectId : projectId});
                  }
               })
            }catch(err){
           console.error(`failed to execute script: ${err}`);
        }
     }    
   });
}



chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) =>{
   if(request.launch == 'login'){   
       try {
         chrome.storage.local.get('tabID', (data) => {
            if(data.tabID){
             onLaunchWebAuthFlow().then(res => {
              chrome.tabs.sendMessage(data.tabID, {accessToken: res.accessToken, win: res.win}).then(() => {
                 chrome.windows.remove(res.winRef.id);
              })
             })
             
           }
           sendResponse( {
             response: data.tabID
           });
            
         })
       } catch (error) {
         console.error(error);
       }
      }
   });



chrome.runtime.onInstalled.addListener(async (details) => {
   injectScript().then(async () => {
      await mellowtel.generateAndOpenOptInLink();
   })

    
});



chrome.tabs.onActivated.addListener(async (activeInfo) => {
   chrome.tabs.sendMessage(activeInfo.tabId, {text: "are_you_there_content_script?"}, function(msg) {
      msg = msg || {};
      if (msg.status !== 'yes') {
         injectScript();
      }
   })
})

 
chrome.tabs.onUpdated.addListener(async (tabId , changeInfo, tab) => {
   if(changeInfo.status == 'complete'){
      chrome.tabs.sendMessage(tabId, {text: "are_you_there_content_script?"}, function(msg) {
          msg = msg || {};
         if (msg.status !== 'yes') {
            injectScript();
         }
      })

   }
});











