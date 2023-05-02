import { CLOSE_CHAT_BOT, SHOW_CHAT_BOT } from '../Types';

export default function ChatBotReducer(state:any, action:any) {
    switch (action.type) {
        case SHOW_CHAT_BOT: {
            return {
                ...state,
                showChatBot: true
            }
        }
        case CLOSE_CHAT_BOT: {
            return {
                ...state,
                showChatBot: false
            }
        }
        default:
            return state;
    }
}
