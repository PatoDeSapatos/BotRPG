import {SlashCommandBuilder} from "discord.js"

export class Commands {
    constructor(client) {
        this.client = client
        this.data = new SlashCommandBuilder()
    }
}