import { Whatsapp } from "venom-bot"
import { banco } from "../banco"
import { defaultMessage } from "../prompt/prompt"
import { completion } from "../IA"
import { ChatCompletionRequestMessage } from "openai"
import { promptIA } from "../prompt/promptIA"

const customerChat: ChatCompletionRequestMessage[] = [
    {
        role: "system",
        content: promptIA
    }
]

export async function thirdStage(user:string, message:string, client: Whatsapp) {
    if(message !== "#") {
        customerChat.push({
            role: 'user',
            content: message,
        })
        
        console.log('customerChat: ', customerChat)
        
        const responseIA = (await completion(customerChat)) || "Não entendi, pode repetir?!"
        
        console.log('response: ', responseIA)
        
        customerChat.push({
            role: 'assistant',
            content: responseIA,
        })
        return responseIA
    } 
    else {
        banco[user].stage = 1
        return defaultMessage
    }
}
