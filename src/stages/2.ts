import { Whatsapp } from "venom-bot"
import { banco } from "../banco"
import { defaultMessage } from "../prompt/prompt"

export async function secondStage(user:string, message:string, client: Whatsapp) {
    if (!["1", "2"].includes(message)) {
        return "Por favor, selecione uma opção válida!"
    } 
    else if (message === "1") {
        banco[user].stage = 3
        return "FAZER PEDIO"
    } 
    else if (message === "2") {
        banco[user].stage = 4 
        return "FALAR COM ATENDENTE"
    }

}