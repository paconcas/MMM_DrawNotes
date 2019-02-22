var NodeHelper = require("node_helper"),
	nodemailer = require("nodemailer"),
	mail = {
		host: '',
		port: '',
		service: '',
		username: '',
		pwd:''
	},
	mailOptions = {
		from: 'from@mail.com',
		to: 'to@mail.com',
		subject: 'Sending Email using Node.js',
		text: 'That was easy!',
		attachments: [{
			filename: 'out.png',
			path: 'out.png',
		}]
	};

module.exports = NodeHelper.create({
	
	socketNotificationReceived: function(notification, payload){
		
		if ( notification == 'mail' ){
			 mail.username = payload.username;
			 mail.pwd = payload.pwd;
			 mail.host = payload.host;
			 mail.service = payload.service;
			 mail.port = payload.port;
		} else if(notification == 'canvas'){
			var base64Data = payload.replace(/^data:image\/png;base64,/, "");
			require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
			  console.log(err);
			});
			var transporter = nodemailer.createTransport({
				host: mail.host,
				port: mail.port,
				secure: false,
				auth: {
					user: mail.username,
					pass: mail.pwd
				}
			 });
			transporter.sendMail(mailOptions, function(error, info){
			  if (error) {
				console.log(error);
			  } else {
				console.log('Email sent: ' + info.response);
				require("fs").unlink('out.png', (err) => {
				if (err) throw err;
				console.log('out.png was deleted');
				});
			  }
			});
			
		}
			
	}
});
