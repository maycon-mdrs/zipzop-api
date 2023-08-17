import { Message, Whatsapp, create } from "venom-bot"
import { banco } from "./banco";

import { welcome } from "./stages/0";
import { firstStage } from "./stages/1";
import { secondStage } from "./stages/2";
import { thirdStage } from "./stages/3";
import { fourthStage } from "./stages/4";
import { defaultStage } from "./stages/defaultStage";
 
interface Stage {
    description: string;
    stage: (user: string, message:string, client: Whatsapp) => any;
}

export const stages: { [key: number]: Stage } = {
    0: {
        description: "Boas Vindas",
        stage: welcome,
    },
    1: {
        description: "Escolha de Opção",
        stage: firstStage,
    },
    2: {
        description: "Cardápio",
        stage: secondStage,
    },
    3: {
        description: "Pedido",
        stage: thirdStage,
    },
    4: {
        description: "Falar com Atendente",
        stage: fourthStage,
    },
    5: {
        description: "Defaut",
        stage: defaultStage,
    }
};

export function getStage(user: string): number {
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
