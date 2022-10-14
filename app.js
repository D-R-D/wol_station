const { Client, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");
const childProcess = require('child_process');

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages] });

client.once("ready", async () => {
    const data0 =
    {
        name: "wol",
        description: "new wake on lan",
        options: [
            {
                name: "machine",
                description: "input machine name",
                type: 3,
                required: true,

                choices: [
                    { name: "example", value: "example" },
                    { name: "example1", value: "example1" }
                ]
            }
	]
    };

    const data1 =
    {
        name: "stdm",
        description: "new machine shutdown",
        options: [
            {
                name: "machine",
                description: "input machine name",
                type: 3,
                required: true,

                choices: [
                    { name: "example", value: "example" },
                    { name: "example1", value: "example1" }
                ]
            }
	]
    };

    const commands = [data0, data1];
    await client.application.commands.set(commands, process.env.CHANNEL_ID);
    
    console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    await interaction.reply("PROCESSING...");

    if (interaction.commandName === "wol") {
        const cmd = 'sh [full path of wol.sh dierctory]' + interaction.options.getString("machine") + '.sh';
	const stdout = childProcess.execSync(cmd);
	let msg = stdout.toString();

        if (msg === "") {
            msg = "machine name [ " + interaction.options.getString("machine") + " ] wakeupped!!";
        }

        await interaction.editReply(msg);
    }
    if (interaction.commandName === "stdm") {
        const cmd = 'sh [full path of shutdown.sh directory]' + interaction.options.getString("machine") + '.sh';
	const stdout = childProcess.execSync(cmd);
	let msg = stdout.toString();

        if (msg === "") {
            msg = "machine name [ " + interaction.options.getString("machine") + " ] shutdowned!!";
        }

        await interaction.editReply(msg);
    }
});

client.login(process.env.DISCORD_TOKEN);
