const nodeMailer = require('nodemailer');
const promisify = require('es6-promisify');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');

const transport = nodeMailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
});

const generateHTML = (fileName, options = {}) => {
	const html = pug.renderFile(`${__dirname}/../views/emails/${fileName}.pug`, options);
	const inlined = juice(html);
	return inlined;
};

module.exports.send = async (fileName, options) => {
	const html = generateHTML(fileName, options);
	const text = htmlToText.fromString(html);
	const mailOptions = {
		from: 'no-reply@localhost.com',
		to: options.to,
		subject: options.subject,
		html,
		text,
	};

	const sendMail = promisify(transport.sendMail, transport);
	return sendMail(mailOptions);
};
