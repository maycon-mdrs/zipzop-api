import { Message, Whatsapp, create } from "venom-bot"
import { stages, getStage } from "./stages"
import { cancelTimer, startTimer } from "./regras/info"

import { outIA } from "./prompt/prompt"

create({
    session: "ItaloBot",
    disableWelcome: true,
})
    .then(async (client: Whatsapp) => await start(client))
    .catch((err) => {
        console.log(err)
    })

async function start(client: Whatsapp) {
    client.onMessage(async (message: Message) => {
        if (!message.body || message.isGroupMsg) return

        // Cancelar temporizador existente, se houver
        cancelTimer(message.from);

        // Iniciar um novo temporizador
        startTimer(message.from, client);

        // Transferir primeiramente para Stages
        let response = (await stages[getStage(message.from)].stage(message.from, message.body, client)) || ""

        console.log(message.from, ': ', message.body)
        
        if(response === "IA__ACTIVE") {
            let response = (await stages[getStage(message.from)].stage(message.from, "oi", client)) || ""
            await client.sendText(message.from, outIA)
            await client.sendText(message.from, response)
        }
        else {
            await client.sendText(message.from, response)
        }

        console.log('response: ', response)

    })
}

