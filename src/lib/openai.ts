import { Configuration, OpenAIApi } from "openai"
import { config } from "../config"

const configuration = new Configuration({
    organization: "org-hBtnxfagVkqoh3KeHS4Pnfsq",
    apiKey: config.openAI.apiToken,
})

export const openai = new OpenAIApi(configuration)
