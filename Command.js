import { SlashCommandBuilder } from "discord.js"

export class Command {

    constructor(client) {
        this.client = client
        this.data = new SlashCommandBuilder()
    }
}