const got = require('got');


module.exports.run = (bot, message, args) => {
        got('http://belikebill.azurewebsites.net/billgen-API.php?default=1', { encoding: null }).then(res => {
            message.channel.send({
                file: {
                    attachment: res.body,
                    name: 'bill.jpg'
                }
            })
        }).catch(message.error);
}

module.exports.help = {
	name: "bill"
}
