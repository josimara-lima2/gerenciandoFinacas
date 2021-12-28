const string = '"teste"'
const result = string.replace(/^"(.*)"$/, '$1')
console.log(result)