/**
 * @function myGetRandomNumber
 * @param {object} params 
 * @param {number} params.max 랜덤 숫자중 최대 값
 * @param {number} params.min 랜덤 숫자중 최소 값
 * @returns {number}
 */
const myGetRandomNumber = function(params) {
  const ranNum = Math.floor(Math.random() * (params.max - params.min + 1)) + params.min;
  return ranNum;
};

module.exports = myGetRandomNumber;
