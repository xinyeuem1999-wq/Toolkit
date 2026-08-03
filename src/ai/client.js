import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default class AIClient {

    constructor(config) {

        this.config = config;

    }

    get provider() {

        return this.config.ai.provider;

    }

    get model() {

        return process.env.OPENAI_MODEL ||
               this.config.ai.model;

    }

    get apiKey() {

        return process.env.OPENAI_API_KEY;

    }

    async chat(messages) {

        switch (this.provider) {

            case "openai":

                return await this.openai(messages);

            default:

                throw new Error(
                    "Unsupported AI Provider: " +
                    this.provider
                );

        }

    }

    async openai(messages) {

        try {

            const response = await axios.post(

                "https://api.openai.com/v1/chat/completions",

                {

                    model: this.model,

                    messages,

                    temperature: 1,

                    max_completion_tokens:
                        this.config.ai.maxTokens

                },

                {

                    headers: {

                        Authorization:
                            `Bearer ${this.apiKey}`,

                        "Content-Type":
                            "application/json"

                    },

                    timeout: 60000

                }

            );

            return response.data;

        }

        catch (e) {

            if (e.response) {

                console.error(
                    JSON.stringify(
                        e.response.data,
                        null,
                        2
                    )
                );

            }

            throw e;

        }

    }

}