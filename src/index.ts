import { Message, Whatsapp, create } from "venom-bot"
import { openai } from "./lib/openai"
import { ChatCompletionRequestMessage } from "openai"

async function completion( messages: ChatCompletionRequestMessage[] ):Promise<string | undefined> {
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
    session: "Maycon",
    disableWelcome: true,
})
.then(async (client: Whatsapp) => await start(client))
.catch((err) => {
    console.log(err)
})

async function start(client: Whatsapp) {
    client.onMessage(async (message: Message) => {
        if (!message.body || message.isGroupMsg) return

        console.log('message.body: ', message.body)

        customerChat.push({
          role: 'user',
          content: message.body,
        })

        console.log('customerChat: ', customerChat)

        const response = (await completion(customerChat)) || "Não entendi, pode repetir?!"

        console.log('response: ', response)

        customerChat.push({
          role: 'assistant',
          content: response,
        })

        await client.sendText(message.from, response)
    })
}
