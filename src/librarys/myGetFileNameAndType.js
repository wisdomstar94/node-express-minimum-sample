/**
 * @typedef FileNameAndTypeInfo
 * @property {string} file_only_name 파일명 (확장자 제외)
 * @property {string} file_only_type 파일확장자 (파일명 제외)
 */

/**
 * @function myGetFileNameAndType
 * @param {object} params 
 * @param {string} params.full_file_name 파일명 (확장자 포함)
 * @returns {FileNameAndTypeInfo}
 */
const myGetFileNameAndType = function(params) {
  var file_full_name_split = params.full_file_name.split('.');
  var file_only_name = '';
  var file_only_type = '';
  if (file_full_name_split.length == 1) {
    file_only_name = file_full_name_split[0];
    file_only_type = '';
  } else if (file_full_name_split.length == 2) {
    file_only_name = file_full_name_split[0];
    file_only_type = file_full_name_split[1];
  } else if (file_full_name_split.length > 2) {
    for (var kk=0; kk<file_full_name_split.length - 1; kk++) {
      file_only_name += file_full_name_split[kk];
      if (kk != file_full_name_split.length - 2) {
        file_only_name += '.';
      }
    }
    file_only_type = file_full_name_split[file_full_name_split.length - 1];
  }
  return {
    file_only_name: file_only_name,
    file_only_type: file_only_type
  };
};

module.exports = myGetFileNameAndType;
