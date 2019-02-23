# MMM_DrawNotes

![ScreenShot](/snapshot.png)

## Installation
Navigate into your MagicMirror's `modules` folder:
```
cd ~/MagicMirror/modules
```

Clone this repository:
```
git clone https://github.com/paconcas/MMM_DrawNotes
```

Navigate to the new `MMM_DrawNotes` folder and install the node dependencies.
```
npm install
```

Configure the module in your `config.js` file.

## Using the module
To use this module, add it to the modules array in the `config/config.js` file:
```javascript
{
	module: "MMM_DrawNotes",
	position: "top_right",
	config: {
		postit: "List",
		width: "300",
		height: "300",
		email_host: "smtp.mail.provider.com",
		email_port: "465",
		email_service: "yahoo",
		email_user: "your.account@provider.com",
		email_pwd: "your.password"
	}
},
```
