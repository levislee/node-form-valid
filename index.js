'use strict';

const util = require('util');

var EMAIL_RE = /^[a-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+(?:\.[a-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?$/i;
var MOBILE_RE = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

var DATE_TYPE_RE = /^\d{4}\-\d{2}\-\d{2}$/;
var DATETIME_TYPE_RE = /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/;

var URL_RE = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;


const TYPE_MAP = {
	require : checkRequired,
	number : checkNumber,
	string : checkString,
	array : checkArray,
	object : checkObject,
	email : checkEmail,
	mobile : checkMobile,
	boolean : checkBoolean,
	bool : checkBoolean,
	date : checkDate,
	datetime : checkDateTime,
	dateTime : checkDateTime,
	int : checkInt,
	integer : checkInt,
	url : checkUrl,
	between : checkBetween,
	max : checkMax,
	min : checkMin,
	length : checkLength,
};

const TYPE_MAP_ERROR_MESSAGE = {
	require : '%s 不能为空',
	number : '%s 不是Number类型',
	string : '%s 不是String类型',
	array : '%s 不是Array类型',
	object : '%s 不是Object类型',
	email : '%s email格式不正确',
	mobile : '%s 不是手机号码',
	boolean : '%s 不是布尔类型',
	bool : '%s 不是布尔类型',
	date : '%s 不是日期格式',
	datetime : '%s 不是日期时间格式',
	dateTime : '%s 不是日期时间格式',
	int : '%s 不是Int类型',
	integer : '%s 不是Integer类型',
	url : '%s 不是url',
	between : '%s 不在范围内',
	max : '%s 已大于最大值',
	min : '%s 已小于最小值',
	length : '%s 长度范围不正确'
};

function checkRequired(rule,value,key){
	if(typeof value === 'undefined'){
		return rule.errorMessage;
	}

	return false;
}

function checkNumber(rule,value,key){
	if(typeof value !== 'number'){
		return rule.errorMessage;
	}

	return false;
}

function checkString(rule,value,key){
	if(typeof value !== 'string'){
		return rule.errorMessage;
	}

	return false;
}

function checkArray(rule,value,key){
	if(Array.isArray(value)){
		return rule.errorMessage;
	}

	return false;
}

function checkString(rule,value,key){
	if(typeof value !== 'string'){
		return rule.errorMessage;
	}

	return false;
}

function checkObject(rule,value,key){
	if(typeof value !== 'object'){
		return rule.errorMessage;
	}

	return false;
}

function checkEmail(rule,value,key){
	if(typeof value !== 'string'){
		return rule.errorMessage;
	}

	if(!EMAIL_RE.test(value)) {
		return rule.errorMessage;
	}

	return false;
}

function checkMobile(rule,value,key){
	if(typeof value !== 'number'){
		return rule.errorMessage;
	}

	if(!MOBILE_RE.test(value)) {
		return rule.errorMessage;
	}

	return false;
}

function checkBoolean(rule,value,key){
	if(typeof value !== 'boolean'){
		return rule.errorMessage;
	}

	return false;
}

function checkDate(rule,value,key){
	if(typeof value !== 'string'){
		return rule.errorMessage;
	}

	if(!DATE_TYPE_RE.test(value)) {
		return rule.errorMessage;
	}

	return false;
}

function checkDateTime(rule,value,key){
	if(typeof value !== 'string'){
		return rule.errorMessage;
	}

	if(!DATETIME_TYPE_RE.test(value)) {
		return rule.errorMessage;
	}

	return false;
}

function checkInt(rule,value,key){
	if(typeof value !== 'number' || value % 1 !== 0){
		return rule.errorMessage;
	}

	return false;
}

function checkUrl(rule,value,key){
	if(typeof value !== 'string'){
		return rule.errorMessage;
	}
	
	if(!URL_RE.test(value)) {
		return rule.errorMessage;
	}

	return false;
}

function checkBetween(rule,value,key){
	if(typeof value !== 'number'){
		return rule.errorMessage;
	}

	switch(rule.typeValue.length){
		case 1:
			if(value < 0 || value > rule.typeValue[0]){
				return rule.errorMessage;
			}
			break;

		case 2:
			if(value < rule.typeValue[0] || value > rule.typeValue[1]){
				return rule.errorMessage;
			}
			break;

		default:
			return rule.errorMessage;
			break;
	}

	return false;
}

function checkMax(rule,value,key){
	if(typeof value !== 'number' || typeof rule.typeValue[0] !== 'number'){
		return rule.errorMessage;
	}

	if(value > rule.typeValue[0]){
		return rule.errorMessage;
	}

	return false;
}

function checkMin(rule,value,key){
	if(typeof value !== 'number' || typeof rule.typeValue[0] !== 'number'){
		return rule.errorMessage;
	}

	if(value < rule.typeValue[0]){
		return rule.errorMessage;
	}

	return false;
}

function checkLength(rule,value,key){
	if(typeof value !== 'string' && typeof value !== 'number'){
		return rule.errorMessage;
	}

	value = value.toString();
	switch(rule.typeValue.length){
		case 1:
			if(value.length > rule.typeValue[0]){
				return rule.errorMessage;
			}
			break;

		case 2:
			if(value.length < rule.typeValue[0] || value.length > rule.typeValue[1]){
				return rule.errorMessage;
			}
			break;

		default:
			return rule.errorMessage;
			break;
	}

	return false;
}


function formateRule(rule,key){
	if(!rule || typeof rule.rule !== 'string' || rule.rule.length === 0){
		console.log('rule:',rule);
		return false;
	}
	const ruleType = rule.rule.split('|');

	const customMessage = typeof rule.message === 'object' ? rule.message:{};

	var ruleFormate = [];
	for(const value of ruleType) {
		if(value.length === 0){
			console.log('value.lenght:' , value.lenght);
			return false;
		}
		
		var formate = {
			type:'',
			typeValue:[],
			errorMessage:'',
		};
		if(value.indexOf(':') !== -1){
			const keyArray = value.split(':');
			if(keyArray.length !== 2){
				console.log('keyArray.length keyArray:');
				console.log(keyArray);
				return false;
			}

			formate.type = keyArray[0];
			if(keyArray[1].indexOf(',') !== -1){
				formate.typeValue = keyArray[1].split(',');
			}else{
				formate.typeValue = [keyArray[1]];
			}

		}else{
			formate.type = value;
		}

		if(!TYPE_MAP.hasOwnProperty(formate.type)){
			continue;
		}

		formate.errorMessage = customMessage.hasOwnProperty(formate.type)?customMessage[formate.type]:util.format(TYPE_MAP_ERROR_MESSAGE[formate.type],key);

		ruleFormate.push(formate);
	}

	return ruleFormate;
}

class Validator
{
    constructor(opts){
        opts = opts || {};

        if(typeof opts.translate === 'function'){
            this.translate = opts.translate;
        }

        if(opts.validateRoot) this.validateRoot = true;
        if(opts.convert) this.convert = true;
        if(opts.widelyUndefined) this.widelyUndefined = true;

    }

    output(msg, error = false){
    	if(!msg){
    		msg = '异常：验证库的返回值不正确';
    		error = true;
    	}
    	return {
    			error,
    			msg
    		}
    }

    t(){
    	var args = Array.prototype.slice.call(arguments);
    	if(typeof this.translate === 'function') {
    		return this.translate.apply(this,args);
    	} else {
    		return util.format.apply(util,args);
    	}
    }

    

    // rule: { username:{rule:'required|alpha:6|string',message:{required:'不能为空',alpha:'xxx6',string:'不是字符串类型'} }
    validate(rules, obj){
    	if(typeof rules !== 'object') {
    		return this.output('错误：验证规则应该为对象，请检查',true);
    	}

    	if(this.validateRoot && (typeof obj !== 'object' || !obj) ){
    		return this.output('错误：验证的值应该为对象，请检查',true);
    	}

    	var self = this;

    	var ruleList = {};
    	for(const key of Object.keys(rules)) {
    		var rule = formateRule(rules[key],key);
    		if(!rule){ return this.output('错误：'+key+' 参数格式不正确，'+rules[key]+'，请检查',true);}

    		for( const ruleType of rule ){
    			if(!TYPE_MAP.hasOwnProperty(ruleType.type)){
    				return this.output('错误：无效验证方法 ' + ruleType.type ,true);
    			}
    			const checker = TYPE_MAP[ruleType.type];   

    			const res = checker.call(self,ruleType, obj[key],key);
    			if(res){
    				return this.output(res);
    			}

    		}
    		
    	}

    	return false;


    }
}

module.exports = Validator;
