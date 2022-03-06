const crypto = require('crypto');
const aes256 = require('aes256');
const md5 = require('md5');
require('dotenv').config();
const ivLength = 16;

/** @function encrypt
 * @param {object} params 필요 오브젝트 값
 * @param {string=} params.encrypt_key encrypt_key
 * @param {string} params.originalValue 원본 문자열
 * @param {string=} params.ivString iv 문자열
 * @description 같은 문자열이라도 매번 다른 암호화된 결과가 나옵니다.
 * @returns {string} 
 */
exports.encrypt = function(params) {
	let iv = crypto.randomBytes(ivLength);
	if (typeof params.ivString === 'string') {
		iv = Buffer.from(params.ivString);
	}
	let encrypt_key = process.env.ENCRYPT_KEY;
	if (typeof params.encrypt_key === 'string') {
		encrypt_key = params.encrypt_key;
	}
	const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encrypt_key), iv);
	let encrypted = cipher.update(params.originalValue);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return iv.toString('hex') + ':' + encrypted.toString('hex'); // 같은 문자열이더라도 다른 해쉬값이 나옴
};

/** @function decrypt
 * @param {object} params 필요 오브젝트 값
 * @param {string=} params.encrypt_key encrypt 함수로 암호화 할 때 사용한 encrypt_key
 * @param {string} params.hashedValue encrypt 함수로 암호화된 문자열
 * @returns {string} 
 */
exports.decrypt = function(params) {
	const textParts = params.hashedValue.split(':');
	const iv = Buffer.from(textParts.shift(), 'hex');
	const encryptedText = Buffer.from(textParts.join(':'), 'hex');
	let encrypt_key = process.env.ENCRYPT_KEY;
	if (typeof params.encrypt_key === 'string') {
		encrypt_key = params.encrypt_key;
	}
	const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encrypt_key), iv);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString(); // 다른 해쉬값이더라도 같은 문자열이 나올 수 있음
};

/** @function oneRootEncrypt
 * @param {object} params 필요 오브젝트 값
 * @param {string=} params.one_root_encrypt_salt 암호화 할 때 사용할 salt 값
 * @param {string} params.originalValue 원본 문자열
 * @description params.one_root_encrypt_salt 값과 params.originalValue 값이 동일하면 동일한 결과가 나옵니다.
 * @returns {string} 
 */
exports.oneRootEncrypt = function(params) {
  let one_root_encrypt_salt = process.env.ONE_ROOT_ENCRYPT_SALT;
  if (typeof params.one_root_encrypt_salt === 'string') {
    one_root_encrypt_salt = params.one_root_encrypt_salt;
  }
	const key = crypto.pbkdf2Sync(params.originalValue, one_root_encrypt_salt, 100000, 64, 'sha512');
	return key.toString('hex'); // 복호화 불가능한 해쉬 값, 같은 문자열당 같은 해쉬값이 나옴
};

/** @function pbkdf2
 * @param {object} params 필요 오브젝트 값
 * @param {string} params.salt 암호화 할 때 사용할 salt 값
 * @param {number} params.repeatCount 암호화 반복 횟수
 * @param {number} params.byte 암호화 byte
 * @param {string} params.originalValue 원본 문자열
 * @returns {string} 
 */
exports.pbkdf2 = function(params) {
	const result = crypto.pbkdf2Sync(params.originalValue, params.salt, params.repeatCount, params.byte, 'sha512').toString('hex');
	return result; // 복호화 불가능한 해쉬 값, salt 값에 따라 같은 문자열이라도 다른 해쉬값이 나옴
};

/** @function md5Encrypt
 * @param {object} params 필요 오브젝트 값
 * @param {string} params.originalValue 원본 문자열
 * @returns {string} 
 */
exports.md5Encrypt = function(params) {
	// const result = crypto.createHash('md5').update(params.originalValue).digest('hex');
	const result = md5(params.originalValue);
	return result;
};

/** @function encryptAES256
 * @param {object} params 필요 오브젝트 값
 * @param {string=} params.encrypt_key 암호화 할 때 사용할 encrypt_key
 * @param {string} params.originalValue 원본 문자열
 * @returns {string} 
 */
exports.encryptAES256 = function(params) {
	let encrypt_key = process.env.ENCRYPT_KEY;
	if (typeof params.encrypt_key === 'string') {
		encrypt_key = params.encrypt_key;
	}
	const result = aes256.encrypt(encrypt_key, params.originalValue);
	return result;
};

/** 
 * @function decryptAES256
 * @param {object} params 필요 오브젝트 값
 * @param {string=} params.encrypt_key encryptAES256 함수로 암호화 할 때 사용한 encrypt_key
 * @param {string} params.hashedValue encryptAES256 함수로 암호화된 문자열
 * @returns {string} 
 */
exports.decryptAES256 = function(params) {
	let encrypt_key = process.env.ENCRYPT_KEY;
	if (typeof params.encrypt_key === 'string') {
		encrypt_key = params.encrypt_key;
	}
	const result = aes256.decrypt(encrypt_key, params.hashedValue);
	return result;
};




function getAlgorithm(keyBase64) {
	const key = Buffer.from(keyBase64, 'base64');
	switch (key.length) {
			case 16:
					return 'aes-128-cbc';
			case 32:
					return 'aes-256-cbc';
	}
	throw new Error('Invalid key length: ' + key.length);
}

/** 
 * @function encryptMyData
 * @param {object} params 필요 오브젝트 값
 * @param {string} params.keyBase64 
 * @param {string} params.ivBase64 
 * @param {string} params.plainText 
 * @returns {string} 
 */
exports.encryptMyData = function(params) {
	const {
		keyBase64,
		ivBase64,
		plainText,
	} = params;

	const key = Buffer.from(keyBase64, 'base64');
	const iv = Buffer.from(ivBase64, 'base64');

	const cipher = crypto.createCipheriv(getAlgorithm(keyBase64), key, iv.slice(0, 16));
	let encrypted = cipher.update(plainText, 'utf8', 'base64');
	encrypted += cipher.final('base64');
	return encrypted;
};


