import { browser } from "wxt/browser";
import ExtMessage, { MessageType } from "./types";

const CHROME_STORE_URL = "https://chromewebstore.google.com/";
const CHROME_EXTENSIONS_URL = "chrome://extensions/";
const CHROME_NEW_TAB_URL = "chrome://newtab/";

export default defineBackground(() => {
  console.log(`Hello from ${browser.runtime.id}!`);

  // listen for extension icon click, you need to add action {} in manifest.json (wxt.config.ts) for this to work
  // browser.action.onClicked.addListener((tab) => {
  //   console.log("click icon");
  //   console.log(tab);
  //   browser.tabs.sendMessage(tab.id!, {
  //     messageType: MessageType.CLICK_EXTENSION,
  //   });
  // });

  // listen for theme changes
  browser.runtime.onMessage.addListener(
    async (
      message: ExtMessage,
      sender,
      sendResponse: (message: any) => void
    ) => {
      console.log("background:");
      console.log(message);
      if (message.messageType === MessageType.CHANGE_THEME) {
        let tabs = await browser.tabs.query({});
        console.log(`tabs:${tabs.length}`);
        if (tabs) {
          for (const tab of tabs) {
            await browser.tabs.sendMessage(tab.id!, message);
          }
        }
      }
      return true;
    }
  );

  // listen for user login/logout

  browser.runtime.onMessage.addListener(
    async (
      message: ExtMessage,
      sender,
      sendResponse: (message: any) => void
    ) => {
      console.log("background:");
      console.log(message);
      if (message.messageType === MessageType.USER_LOGGED_IN) {
        let tabs = await browser.tabs.query({});
        await browser.storage.local.set({
          user: message.data,
        });
        console.log(`tabs:${tabs.length}`);
        if (tabs) {
          for (const tab of tabs) {
            await browser.tabs.sendMessage(tab.id!, message);
          }
        }
      } else if (message.messageType === MessageType.USER_LOGGED_OUT) {
        await browser.storage.local.remove("user");
        let tabs = await browser.tabs.query({});
        console.log(`tabs:${tabs.length}`);
        if (tabs) {
          for (const tab of tabs) {
            await browser.tabs.sendMessage(tab.id!, message);
          }
        }
      }
      return true;
    }
  );
});
