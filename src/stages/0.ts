import { Whatsapp } from "venom-bot"
import { apresentation, closeMessage } from "../prompt/prompt"
import { banco } from "../banco"

import { getHours } from "../regras/info"

export async function welcome(user:string, message:string, client: Whatsapp) {
    if(getHours()){
        banco[user].stage = 1
        console.log(banco[user].stage)

        return "*Boa noite*" + apresentation
    } else {
        return closeMessage
    }
}