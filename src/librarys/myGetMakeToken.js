const myGetRandomNumber = require('./myGetRandomNumber');
const myGetRandomString = require('./myGetRandomString');

/**
 * @function myGetMakeToken
 * @param {object} params 
 * @param {number} params.strlength 토큰 총 길이
 * @description 중복되지 않는 고유 문자열을 반환합니다. (최소 20자 이상으로 이용해주세요.)
 * @returns {string}
 */
const myGetMakeToken = function(params) {
  const timestamp = new Date().getTime();
  const timestamp_length = timestamp.toString().length;
  const str_max_length = params.strlength - timestamp_length;
  const first_length = myGetRandomNumber({
    min: 1, 
    max: str_max_length
  });
  const second_length = str_max_length - first_length;
  const token = ''.concat(
    myGetRandomString({
      str_length: first_length
    }),
    new Date().getTime(),
    myGetRandomString({
      str_length: second_length
    })
  );
  return token;
};

module.exports = myGetMakeToken;
