export enum MessageType {
  CHANGE_THEME = "CHANGE_THEME",
  CLICK_EXTENSION = "CLICK_EXTENSION",
  USER_LOGGED_IN = "USER_LOGGED_IN",
  USER_LOGGED_OUT = "USER_LOGGED_OUT",
}

export enum MessageFrom {
  contentScript = "contentScript",
  background = "background",
}

class ExtMessage {
  content?: string;
  data?: any;
  from?: MessageFrom;

  constructor(messageType: MessageType) {
    this.messageType = messageType;
  }

  messageType: MessageType;
}

export default ExtMessage;
