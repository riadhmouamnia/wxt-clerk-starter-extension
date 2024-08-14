import { useEffect, useState } from "react";
import { MessageType } from "@/entrypoints/types";
import { useTheme } from "@/components/theme-provider";
import { hideUi, setThemeToBody, showUi } from "@/lib/utils";

type User = {
  username: string;
  email: string;
  id: string;
};

export default () => {
  const [url, setUrl] = useState(window.location.href);
  const { toggleTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // send message to background script when first load to check if we have a user
    async function loadUser() {
      const data = await browser.storage.local.get("user");
      console.log(data);
      if (data.user) {
        console.log("user: ", data.user);
        setUser(data.user as User);
        showUi();
      } else {
        hideUi();
      }
    }

    loadUser();

    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log("content:");
      console.log(message);
      if (message.messageType === MessageType.CHANGE_THEME) {
        const newTheme = message.content;
        toggleTheme(newTheme);
        setThemeToBody(newTheme);
      } else if (message.messageType === MessageType.USER_LOGGED_IN) {
        setUser(message.data);
        showUi();
      } else if (message.messageType === MessageType.USER_LOGGED_OUT) {
        setUser(null);
        hideUi();
      }
      return true;
    });
  }, []);

  if (!user) {
    return (
      <div>
        <h1>No user</h1>
        <p>need to log in first</p>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <p>{user.username}</p>
      <p>{url}</p>
      <p>Content Script UI.</p>
    </div>
  );
};
