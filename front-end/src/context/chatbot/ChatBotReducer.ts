import { BOT_REPLY_USER, CLOSE_CHAT_BOT, SHOW_CHAT_BOT, USER_ASK_BOT } from "../Types";

export default function ChatBotReducer(state: any, action: any) {
  switch (action.type) {
    case SHOW_CHAT_BOT: {
      return {
        ...state,
        showChatBot: true,
      };
    }
    case CLOSE_CHAT_BOT: {
      return {
        ...state,
        showChatBot: false,
      };
    }
    case USER_ASK_BOT: {
      
      return {
        ...state,
        talkContent: [
          ...state.talkContent,
          {
            role: "user",
            message: action.payload,
          },
        ],
      };
    }
    case BOT_REPLY_USER: {
      return {
        ...state,
        talkContent: [
          ...state.talkContent,
          {
            role: "bot",
            message: action.payload,
          },
        ],
      };
    }
    default:
      return state;
  }
}
