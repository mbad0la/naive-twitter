const fs = require('fs')
const jwt = require('jwt-simple')

const serverConfig = JSON.parse(fs.readFileSync('serverConfig.json').toString())

const validateToken = token => {
  if (token) {
    try {
      let tokenArgs = token.split(' ')
      if (tokenArgs[0] == 'JWT') {
        const credentials = jwt.decode(tokenArgs[1], serverConfig.jwtSecret)
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }

    return true;
  } else {
    return false;
  }
}

const verifyLogin = basicAuth => {
  if (basicAuth.username && basicAuth.password) {
    return {
      isAuthenticated: true,
      token: `JWT ${jwt.encode(basicAuth, serverConfig.jwtSecret)}`
    }
  } else {
    return {
      isAuthenticated: false
    }
  }
}

module.exports = { validateToken, verifyLogin }
