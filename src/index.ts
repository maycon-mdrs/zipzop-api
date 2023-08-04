import { Message, Whatsapp, create } from "venom-bot"

create({
    session: "zipzop-api",
    disableWelcome: true,
})
.then(async (client: Whatsapp) => await start(client))
.catch((err) => {
    console.log(err)
})

async function start(client: Whatsapp) {
client.onMessage(async (message: Message) => {
    if (!message.body || message.isGroupMsg) return

    const response = `Olá italo!`

    await client.sendText(message.from, response)
    
    const title = "Button push test"
    const subtitle = "Choose your favorite"
    let buttons = [
        {
        "buttonId": "1",
        "text": "Teste",
        "buttonText": {
        "displayText": "Button 1"
        }
        },
        {
        "buttonId": "2",
        "text": "Teste2",
        "buttonText": {
        "displayText": "Button 2"
        }
        }
        ]

      await client.sendButtons(message.from, title, subtitle, buttons)
      .then((result) => {
        console.log("Result", result)
      })
      .catch((error) => {
        console.error("Error when sending: ", error)
      })

})
}

