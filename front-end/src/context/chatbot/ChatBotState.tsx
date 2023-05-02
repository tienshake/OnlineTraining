import { useReducer } from 'react';
import { ChatBotContext } from '../Context';
import ChatBotReducer from './ChatBotReducer';
import { SHOW_CHAT_BOT, CLOSE_CHAT_BOT } from '../Types';

export default function ChatBotState({ children }: any) {
    const initialState = {
        showChatBot: true,
    }
    const [stateCart, dispatch] = useReducer(ChatBotReducer, initialState);

    /* Xử lý show/hide Cart */
    const handleShowChatBot = () => {
        dispatch({
            type: SHOW_CHAT_BOT
        })
    }

    const handleCloseChatBot = () => {
        dispatch({
            type: CLOSE_CHAT_BOT
        })
    }

    return (
        <ChatBotContext.Provider value={{
            showChatBox: stateCart.showChatBot,
            handleShowChatBot,
            handleCloseChatBot
        }}>
            {children}
        </ChatBotContext.Provider>
    )
}