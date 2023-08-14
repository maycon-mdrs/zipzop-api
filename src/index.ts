import { Message, Whatsapp, create } from "venom-bot"
import { openai } from "./lib/openai"
import { ChatCompletionRequestMessage } from "openai"
import { stages } from "./stages"
import { banco } from "./banco"

async function completion(messages: ChatCompletionRequestMessage[]): Promise<string | undefined> {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.9,
        max_tokens: 256,
        messages,
    }
    )

    return completion.data.choices[0].message?.content
}

const customerChat: ChatCompletionRequestMessage[] = []

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

        // Transferir primeiramente para Stages
        let response = (await stages[getStage(message.from)].stage(message.from, message.body, client)) || ""

        console.log('message.body: ', message.body)

        await client.sendText(message.from, response)

        customerChat.push({
            role: 'user',
            content: message.body,
        })

        console.log('customerChat: ', customerChat)

        //const responseIA = (await completion(customerChat)) || "Não entendi, pode repetir?!"

        console.log('response: ', response)

        customerChat.push({
            role: 'assistant',
            //content: responseIA,
        })

        //await client.sendText(message.from, response)
    })
}

function getStage(user: string): number {
    if (banco[user]) {
        //Se existir esse numero no banco de dados
        return banco[user].stage;
    } else {
        //Se for a primeira vez que entra e contato
        banco[user] = {
            stage: 0,
        };
        return banco[user].stage;
    }
}