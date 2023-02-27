import { Client, GatewayIntentBits, Partials, ActivityType, REST, Collection, Events, Routes } from "discord.js"
import { config } from "dotenv"; config()
import { readdirSync } from "fs"

class BotRPG extends Client {
    DEVS = ['493478321615536153']
    commands = new Collection()
    rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

    constructor() {
        super({
            allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
            partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.ThreadMember],
            intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping]
        })

        this.elogin(process.env.TOKEN)
        this.once(Events.ClientReady, this.ready)
    }

    //COCO MOLE

    ready() {
        this.user.setPresence({
            status: 'online',
            activities: [{ name: 'BotRPG', type: ActivityType.Playing }]
        })
        this.loadCommands()
    }

    async loadCommands() {
        this.commands.clear()
        const commands = readdirSync(`./commands/`).filter(file => file.endsWith(".js"))
        for (const file of commands) {
            const cmd = new (await import(`./commands/${file}`))[file.replace('.js', '').cap()](this)
            if (cmd.data.name) {
                this.commands.set(cmd.data.name, cmd)
            }
        }
        await this.rest.put(Routes.applicationCommands(this.application.id), { body: ([...this.commands.values()].map(c => { return c.data.toJSON() })) }).catch(console.error)
    }

    commandExecutor(interaction) {
        if (!interaction.isChatInputCommand()) return
        this.commands.get(interaction.commandName).execute(interaction)
    }

    async elogin(token) {
        await this.login(token).then(() => {
            console.log(` [` + `INFO` + `] ` + this.user.username + ` começou a funcionar sem erros`)
        }).catch((error) => {
            console.error(` [` + `ERRO` + `] ` + `Deu erro aqui:\n${error.stack}`)
        })
    }
}

String.prototype.cap = function () { return this.charAt(0).toUpperCase() + this.slice(1) }
String.prototype.uncap = function () { return this.charAt(0).toLowerCase() + this.slice(1) }

new BotRPG()
