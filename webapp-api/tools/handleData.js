module.exports = {
  responseJSON: (isOK, obj) => {
    return {
      info: {
        ...obj
      },
      status: isOK ? "OK" : "error"
    }
  },
  capital(str) {
    if (str === '') {
      return ''
    }
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
  }
}
