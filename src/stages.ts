import { Message, Whatsapp, create } from "venom-bot"
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
