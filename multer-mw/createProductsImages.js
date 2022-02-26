// const multer = require('multer')
// const path = require('path')
// const { BadCredentialsError } = require('../lib/custom_errors')
// const uniqid = require('uniqid')

// // Storage, FileFilter

// const storage = multer.diskStorage({

//   destination: function (req, file, cb) {
//   /*  */
//     const rootDir = path.dirname(require.main.filename)
//     cb(null, path.join(rootDir, 'public/uploads'))
//     console.log(rootDir)
//   },
//   /*  */
//   filename: function (req, file, cb) {
//     // type of files
//     const extension = file.mimetype.split('/')[1]

//     req.avatar = req.user.username + '-' + `${uniqid()}` + '.' + extension
//     cb(null, req.avatar)
//   }
// })

// const fileFilter = (req, file, cb) => {
//   let allowedFiles = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg']

//   if (!allowedFiles.includes(file.mimetype)) {
//     return cb(new BadCredentialsError(), false)
//   }

//   return cb(null, true)
// }

// const createProduct = multer({storage, fileFilter})

// module.exports = createProduct
