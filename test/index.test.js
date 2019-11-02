
var Validator = require('..');

var validator = new Validator();

var rule = {
	username: {
		rule:'string|length:5,20',
		message:{
			string: '非字符串',
		}
	},
	email:{
		rule:'require|email'
	},
	num:{
		rule:'number|between:3,100',
		message:{
			number:'非数字',
			between:'不在范围内',
		}
	}
};

const error = validator.validate(rule,{username:'21111',email:'fds@qq.com','num':3});
console.log(error);