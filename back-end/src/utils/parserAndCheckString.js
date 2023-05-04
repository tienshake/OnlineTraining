const parserAndCheckString = (string, responseData) => {
  const lowerCaseString = responseData.response.toLowerCase(); // Chuyển đổi chuỗi thành dạng viết thường
  const normalizedString = lowerCaseString
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const newString = normalizedString.includes(string);
  console.log(newString, "new");
  return newString;
};

module.exports = {
    parserAndCheckString,
}