/**
 * @function myIsNumber
 * @param {object} params 
 * @param {string | number} params.value
 * @returns {boolean}
 */
 const myIsNumber = function(params) {
  if (typeof params !== 'object') {
    return false;
  }

  const v = params.value;

  if (v === undefined || v === null) {
    return false;
  }

  if (typeof v !== 'string' && typeof v !== 'number') {
    return false;
  }

  if (typeof v === 'string') {
    if (v.trim() === '') {
      return false;
    }

    if (isNaN(Number(v))) {
      return false;
    }
  }

  if (typeof v === 'number') {
    if (isNaN(v)) {
      return false;
    }
  }

  return true;
};

module.exports = myIsNumber;