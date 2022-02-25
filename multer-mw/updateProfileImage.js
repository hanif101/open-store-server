// /* eslint-disable */
// const multer = require('multer')
// const path = require('path')
// const { BadCredentialsError } = require('../lib/custom_errors')
// const uniqid = require('uniqid')
// const upload = multer({ dest: 'uploads/' })

// // Storage, FileFilter

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     /*  */
//     const rootDir = path.dirname(require.main.filename)
//     cb(null, path.join(rootDir, 'public/uploads'))
//   },
//   /*  */
//   filename: function (req, file, cb) {
//     // type of files
//     const extension = file.mimetype.split('/')[1]

//     req.avatar = req.user.username + '-' + `${uniqid()}` + '.' + extension
//     cb(null, req.avatar)
//   }
// })

// let upload = multer({ storage })

// module.exports = upload
