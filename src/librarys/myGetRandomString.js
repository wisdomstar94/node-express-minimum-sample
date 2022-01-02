/**
 * @function myGetRandomString
 * @param {object} params 
 * @param {number} params.str_length 가져올 랜덤 문자열 길이
 * @returns {string}
 */
const myGetRandomString = function(params) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  
  for (let i = 0; i < params.str_length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

module.exports = myGetRandomString;


