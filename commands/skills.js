module.exports = {
    name: "skills",
    description: "Check your skills.",
    usage: '',
    category: "abilities",

    code(client, message, args) {
        const { getDB } = client.functions.get('dbfind');
        const { MessageEmbed } = require('discord.js');

        getDB(message.author.id).then(res => {
            function skillCost(skill, diff, important) {
                return ((skill+3482)+(skill*diff*important*432))*2;
            }

            const skillEmbed = new MessageEmbed()
            .setColor()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(`Cop: Level ${res.skills.cop} | Upgrade Cost ${skillCost(res.skills.cop, 4, 7)}\n
            Law: Level ${res.skills.law} | Upgrade Cost ${skillCost(res.skills.law, 6, 8)}\n
            Decisions: Level ${res.skills.decisions} | Upgrade Cost ${skillCost(res.skills.decisions, 2, 4)}\n
            Communication: Level ${res.skills.communication} | Upgrade Cost ${skillCost(res.skills.communication, 1, 5)}\n
            Firefighter: Level ${res.skills.firefighter} | Upgrade Cost ${skillCost(res.skills.firefighter, 5, 8)}\n
            Physics: Level ${res.skills.physics} | Upgrade Cost ${skillCost(res.skills.physics, 2, 4)}\n
            Medical: Level ${res.skills.medical} | Upgrade Cost ${skillCost(res.skills.medical, 3, 10)}\n
            Therapy: Level ${res.skills.therapy} | Upgrade Cost ${skillCost(res.skills.therapy, 6, 3)}\n
            Coding: Level ${res.skills.coding} | Upgrade Cost ${skillCost(res.skills.coding, 4, 4)}\n
            Creativity: Level ${res.skills.creativity} | Upgrade Cost ${skillCost(res.skills.creativity, 5, 4)}\n
            Editing: Level ${res.skills.editing} | Upgrade Cost ${skillCost(res.skills.editing, 5, 3)}\n
            Commentary: Level ${res.skills.commentary} | Upgrade Cost ${skillCost(res.skills.commentary, 2, 2)}\n
            Humour: Level ${res.skills.humour} | Upgrade Cost ${skillCost(res.skills.humour, 2, 5)}\n
            Driving: Level ${res.skills.driving} | Upgrade Cost ${skillCost(res.skills.driving, 2, 6)}\n
            Music: Level ${res.skills.music} | Upgrade Cost ${skillCost(res.skills.music, 7, 3)}\n
            Painting: Level ${res.skills.painting} | Upgrade Cost ${skillCost(res.skills.painting, 6, 2)}`)

            message.channel.send(skillEmbed);
        });
    }
}

/* skills:
cop: Number
law: Number
decisions: Number
communication: Number
firefighter: Number
physics: Number
medical: Number
therapy: Number
coding: Number
creativity: Number
editing: Number
commentary: Number
humour: Number
driving: Number
music: Number
painting: Number
*/