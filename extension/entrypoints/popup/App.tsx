import "./App.css";
import { MessageType } from "@/entrypoints/types.ts";
import { useEffect, useState } from "react";

import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  useClerk,
  useUser,
  ClerkProvider,
} from "@clerk/chrome-extension";
import { useNavigate, Routes, Route, MemoryRouter } from "react-router-dom";

async function sendMessageToBackground() {
  let response = await browser.runtime.sendMessage({
    eventType: MessageType.CLICK_EXTENSION,
  });
}

sendMessageToBackground();

function HelloUser() {
  const { isSignedIn, user } = useUser();
  const clerk = useClerk();

  async function sendUserStatusToBackground(isSignedIn: boolean) {
    if (isSignedIn === true) {
      await browser.runtime.sendMessage({
        messageType: MessageType.USER_LOGGED_IN,
        data: user,
      });
    }
  }

  useEffect(() => {
    if (!isSignedIn || !user) {
      browser.runtime.sendMessage({
        messageType: MessageType.USER_LOGGED_OUT,
        data: null,
      });
      return;
    }
    sendUserStatusToBackground(isSignedIn);
  }, [isSignedIn, user]);

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <p>{JSON.stringify(isSignedIn)}</p>
      <p>
        Hi You are signed in as, {user.username ? user.username : user.fullName}
      </p>
      <p>
        <button
          onClick={() =>
            clerk.signOut().then(() => {
              browser.runtime.sendMessage({
                messageType: MessageType.USER_LOGGED_OUT,
                data: null,
              });
            })
          }
        >
          Sign out
        </button>
      </p>
    </>
  );
}
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "";

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      routerPush={(x) => navigate(x)}
      routerReplace={(to) => navigate(to, { replace: true })}
      syncSessionWithTab
    >
      <main>
        <Routes>
          <Route path="/sign-up/*" element={<SignUp signInUrl="/" />} />
          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <HelloUser />
                </SignedIn>
                <SignedOut>
                  <SignIn signUpUrl="/sign-up" />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </main>
    </ClerkProvider>
  );
}

function App() {
  return (
    <MemoryRouter>
      <ClerkProviderWithRoutes />
    </MemoryRouter>
  );
}

export default App;
