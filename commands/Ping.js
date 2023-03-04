import { Command } from "../Command.js"

export class Ping extends Command {

    constructor(client) {
        super(client) 

        this.data.setName("ping").setDescription("pong!")
    }

    async execute(interaction) {
        await interaction.reply("Pong!")
    }
}