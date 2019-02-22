var NodeHelper = require("node_helper");
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: 'smtp.mail.yahoo.com',
  port: 465,
  secure: false,
  service: 'yahoo',
  auth: {
	user: ' ',
	pass: ' '
  },
});

var mailOptions = {
  from: ' ',
  to: ' ',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!',
  attachments: [{
        filename: 'out.png',
        path: 'out.png',
    }]
};

module.exports = NodeHelper.create({
	socketNotificationReceived: function(notification, payload){
		if(notification == 'canvas'){
			var base64Data = payload.replace(/^data:image\/png;base64,/, "");
			require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
			  console.log(err);
			});
			transporter.sendMail(mailOptions, function(error, info){
			  if (error) {
				console.log(error);
			  } else {
				console.log('Email sent: ' + info.response);
				// require("fs").unlink('out.png', (err) => {
				// if (err) throw err;
				// console.log('out.png was deleted');
				// });
			  }
			});
			
		}
			
	}
});
