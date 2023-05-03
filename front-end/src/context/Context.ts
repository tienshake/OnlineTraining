import { createContext } from "react";

interface ChatBotContextProps {
    showChatBox:any,
    welcome: string,
    talkContent: any,
    handleShowChatBot: any,
    handleCloseChatBot: any,
    dispatch: any
}

export const ChatBotContext = createContext<ChatBotContextProps>(null!);