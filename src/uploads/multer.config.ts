import { diskStorage } from 'multer';
import { extname } from 'path';
// export const storage = {
//   storage: diskStorage({
//     destination: './uploads/tasks',
//     filename: (req, file, callback) => {
//       const randomName = Array(32)
//         .fill(null)
//         .map(() => Math.round(Math.random() * 16).toString(16))
//         .join('');
//       return callback(null, `${randomName}${extname(file.originalname)}`);
//     },
//   }),
//   fileFilter: (req, file, callback) => {
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//       return callback(null, false);
//     }
//     callback(null, true);
//   },
// };
export const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(null, false);
  }
  callback(null, true);
};
