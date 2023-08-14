import { Whatsapp } from "venom-bot"
import { banco } from "../banco"
import { getPage1, getPage2 } from "../produtos/menu"
import { defaultMessage, moreInfo } from "../prompt/prompt"

export async function firstStage(user:string, message:string, client: Whatsapp):Promise<any> {
    if (!["1", "2", "3", "4", "5"].includes(message)) {
        return "Por favor, selecione uma opção válida!"
    } 
    /* CARDÁPIO */
    else if (message === "1") {
        console.log(banco[user])

        await client.sendImage(user, getPage1(), "Cardápio-1", "")
        await client.sendImage(user, getPage2(), "Cardápio-2", "Segue o cardápio!")
        return defaultMessage
    } 
    /* FAZER PEDIDO */
    else if (message === "2") {
        banco[user].stage = 3
        return "opcao 2"
    }
    /* FALAR COM ATENDENTE */
    else if (message === "3") {
        banco[user].stage = 4
        return "opcao 3"
    }
    /* LOCALIZAÇÃO */
    else if (message === "4") {
        await client.sendLocation(user, "-5.879444090962025", "-35.17789638278107", "Localização do DOGSPETO")
        return defaultMessage
    }
    /* MAIS INFORMAÇÕES */
    else if (message === "5") {
        return moreInfo
    }
}