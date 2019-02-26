var NodeHelper = require("node_helper"),
	nodemailer = require("nodemailer"),
	mail = {
		host: '',
		port: '',
		service: '',
		username: '',
		pwd:'',
		to:'',
		subject:'',
		text:'',
	},
	mailOptions = {
		from: 'from@mail.com',
		to: 'to@mail.com',
		subject: '',
		text: '',
		attachments: [{
			filename: 'note.png',
			path: 'note.png',
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
			 mailOptions.from = payload.username;
			 mailOptions.to = payload.to;
			 mailOptions.subject = payload.subject;
			 mailOptions.text = payload.text;
		} else if(notification == 'canvas'){
			var base64Data = payload.replace(/^data:image\/png;base64,/, "");
			require("fs").writeFile("note.png", base64Data, 'base64', function(err) {
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
				console.log('Note capture was deleted');
				});
			  }
			});

		}

	}
});
