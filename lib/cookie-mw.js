/* eslint-disable */
const validateCookie = (req, res, next) => {
  const { cookies, user} = res

  console.log(req)
  next()
}

module.exports =  validateCookie
