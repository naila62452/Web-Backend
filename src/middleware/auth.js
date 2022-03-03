// // let jwtSecretKey = process.env.JWT_SECRET_KEY;

// // async function authenticate({ email, password }) {
// //     const user = await User.findOne({ email });
// //     if (user && bcrypt.compareSync(password, user.hash)) {
// //         const token = jwt.sign({ sub: user._id }, jwtSecretKey , { expiresIn: '7d' });
// //         return {
// //             // ...user.toJSON(),
// //             token
// //         };
// //     }
// // }

// // module.exports.generateAccessToken = async (username) => {
// //     return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
// //   }

// let jwtSecretKey = process.env.JWT_SECRET_KEY;
//   function generateAccessToken(email) {
//     return jwt.sign(email, jwtSecretKey , { expiresIn: '1800s' });
//   }

// exports.accesToken = generateAccessToken;