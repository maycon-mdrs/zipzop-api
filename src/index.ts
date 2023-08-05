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
        const messagem = message.body.toLowerCase()
        
        if (messagem === 'oi' || message.body === 'olá' || message.body === 'ola') {
            await client.sendText(message.from, response)
            await sendMainMenu(client, message.from);
        } else {
            await handleUserResponse(client, message);
        }
    })
}

async function sendMainMenu(client: any, recipient: string) {
    const menu = 'Escolha uma opção:\n' +
      '[1] Preciso de ajuda com um problema técnico.\n' +
      '[2] Gostaria de saber mais sobre os produtos.';
    
    await client.sendText(recipient, menu);
}

async function handleUserResponse(client: any, message: Message) {
    const userResponse = message.body.toLowerCase();
    
    if (userResponse === '1') {
      await client.sendText(message.from, 'Claro, estou aqui para ajudar! Por favor, descreva o problema que você está enfrentando.');
      // Implemente a lógica para lidar com problemas técnicos aqui
    } else if (userResponse === '2') {
      await client.sendText(message.from, 'Ótimo! Temos uma variedade de produtos incríveis. Você está procurando informações sobre um produto específico?');
      // Implemente a lógica para fornecer informações sobre produtos aqui
    } else {
      await client.sendText(message.from, 'Desculpe, não entendi a sua resposta. Por favor, escolha uma opção válida.');
      await sendMainMenu(client, message.from);
    }
}