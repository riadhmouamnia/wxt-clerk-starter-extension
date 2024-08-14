import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setThemeToBody = (theme: string) => {
  const element = document.querySelector("wxt-react-example");
  if (element) {
    const shadowRoot = element.shadowRoot;
    if (shadowRoot) {
      const body = shadowRoot.querySelector("body");
      if (body) {
        body.className = theme;
      }
    }
  }
};

export const showUi = () => {
  const element = document.querySelector("wxt-react-example");
  if (element) {
    const shadowRoot = element.shadowRoot;
    if (shadowRoot) {
      const body = shadowRoot.querySelector("body");
      if (!body) {
        return;
      }
      // change right: to 0px
      body.style.right = "0px";
      body.style.display = "block";
    }
  }
};
export const hideUi = () => {
  const element = document.querySelector("wxt-react-example");
  if (element) {
    const shadowRoot = element.shadowRoot;
    if (shadowRoot) {
      const body = shadowRoot.querySelector("body");
      if (!body) {
        return;
      }
      // change right: to -600px
      body.style.right = "-600px";
      body.style.display = "none";
    }
  }
};
