import { useEffect, useReducer, useState } from "react";
import { ChatBotContext } from "../Context";
import ChatBotReducer from "./ChatBotReducer";
import { SHOW_CHAT_BOT, CLOSE_CHAT_BOT } from "../Types";
import axios from "axios";

export default function ChatBotState({ children }: any) {
  const [welcome, setWelcome] = useState("");
  const initialState = {
    showChatBot: true,
    talkContent: [],
    botWelcome: "",
  };

  useEffect(() => {
    const welcomeUser = async () => {
      const response = await axios.get(
        `https://nodejs-deploy-n9mo.onrender.com/chat-bot/welcome`
      );

      setWelcome(response.data);
    };
    welcomeUser();
  }, []);

  const [stateChatbox, dispatch] = useReducer(ChatBotReducer, initialState);

  /* Xử lý show/hide Cart */
  const handleShowChatBot = () => {
    dispatch({
      type: SHOW_CHAT_BOT,
    });
  };

  const handleCloseChatBot = () => {
    dispatch({
      type: CLOSE_CHAT_BOT,
    });
  };
  return (
    <ChatBotContext.Provider
      value={{
        showChatBox: stateChatbox.showChatBot,
        talkContent: stateChatbox.talkContent,
        welcome: welcome,
        dispatch,
        handleShowChatBot,
        handleCloseChatBot,
      }}
    >
      {children}
    </ChatBotContext.Provider>
  );
}
