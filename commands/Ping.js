import {Commands} from "../Commands.js"

export class Ping extends Commands {
    constructor(client) {
        super(client) 

        this.data.setName("ping").setDescription("pong!")
    }
    async execute(interaction) {
        await interaction.reply("Pong!")
    }
}