import { Whatsapp } from "venom-bot";
import { banco } from "../banco";
import { timerOut } from "../prompt/prompt";

interface TimerMap {
    [user: string]: NodeJS.Timeout;
}

function getHours() {
    let date = new Date()
    let day = date.getDay()
    let hours = date.getHours()
    let min = date.getMinutes()

    let open = (hours * 60) + min;
    let close = (hours * 60) + min;

    let timerOpen = 18 * 60;          // 18h00 -> 1080m + 0m
    let timerClose = (23 * 60) + 59;  // 22h30 -> 1320m + 30m 

    if ((open >= timerOpen && close <= timerClose) && [0, 2, 3, 4, 5, 6].includes(day)) {
        return true
    } else {
        return true
    }
}

const timers: TimerMap = {};
const TIMER_5 = 5 * 60 * 1000 // 5 minutos -> milissegundos
const TIMER_1 = 1 * 60 * 1000 // 1 minuto -> milissegundos

function startTimer(user: string, client: Whatsapp): void {
    // Cancelar temporizador existente, se houver
    clearTimeout(timers[user])

    // Iniciar um novo temporizador
    timers[user] = setTimeout(() => {
        const remainingTime = (timers[user].unref() as any)._idleTimeout

        if (remainingTime < TIMER_1) {
            client.sendText(user, "Falta 1 minuto para finalizar. Por favor, responda para continuar.")
        } else {
            // Caso contrário, redefinir o estágio para 0 após 5 minutos
            banco[user].stage = 0;
            client.sendText(user, timerOut)
            console.log('Tempo esgotado. Redefinindo estágio para 0.')
        }

    }, TIMER_5);
}

// Função para cancelar um temporizador
function cancelTimer(user: string): void {
    clearTimeout(timers[user])
}

export { getHours, startTimer, cancelTimer }
