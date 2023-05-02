import { createContext } from "react";

interface ChatBotContextProps {
    // dataFoodProducts: any
    showChatBox:any,
    handleShowChatBot: any,
    handleCloseChatBot: any
}

export const ChatBotContext = createContext<ChatBotContextProps>(null!);