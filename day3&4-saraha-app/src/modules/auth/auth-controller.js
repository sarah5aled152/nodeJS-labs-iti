import { User } from "./../../../DB/models/user-model.js";
import { asyncHandler } from "../../utils/error-Handler.js";
import sendEmailService from "../../utils/send-Email.js";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
//sign up
export const signUp = asyncHandler(async (req, res, next) => {
  const { username, email, password, confirmpassword, age, phone } = req.body;

  //check password
  if (password !== confirmpassword) {
    return next(new Error("password must match"));
  }

  //check email
  const checkEmailExist = await User.findOne({ email });
  if (checkEmailExist) {
    return next(new Error("email already exists"));
  }

  // hash password
  const hashedPassword = bcryptjs.hashSync(password, +process.env.SALT_ROUNDS);
  console.log(process.env.SALT_ROUNDS);

  const encryptedPhone = CryptoJS.AES.encrypt(
    phone,
    process.env.SECRET_KEY
  ).toString();
  console.log(encryptedPhone);

  //save user
  const addUser = await User.create({
    username,
    email,
    password: hashedPassword,
    age,
    phone,
  });

  const token = Jwt.sign({ email: addUser.email }, process.env.TOKEN_SECRET);
  sendEmailService({
    to: addUser.email,
    subject: "hello from saraaha application!",
    message: `<a href = 'http://localhost:3000/auth/activate_account/${token}'>Aactivate your account </a>`,
  });

  const bytes = CryptoJS.AES.decrypt(encryptedPhone, process.env.SECRET_KEY);
  const decryptedPhone = bytes.toString(CryptoJS.enc.Utf8); // تحويل البايتات إلى نص عادي
  console.log(decryptedPhone);

  return res.status(201).json({
    success: true,
    message: `Signed Up !`,
  });
});

//activate-account
export const activateAccount = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  const payload = Jwt.verify(token, process.env.TOKEN_SECRET);

  const user = await User.findOneAndUpdate(
    { email: payload.email },
    { isEmailVerified: true },
    { new: true }
  );

  return res.json({ success: true, message: "email verified", user });
});
//=========log in =================
export const logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const checkUser = await User.findOne({ email });

  if (!checkUser) {
    return next(new Error("user not signed up", { cause: 404 }));
  }

  //check activation
  if (!checkUser.isEmailVerified) {
    return next(new Error("your account not activated ,please activate it"));
  }

  if (checkUser) {
    const match = bcryptjs.compareSync(password, checkUser.password);

    if (!match) {
      return next(new Error("wrong password", { cause: 403 }));
    }
  }

  const token = Jwt.sign({ id: checkUser._id }, process.env.TOKEN_SECRET);

  res.json({ success: true, message: "logged In", token: token });
});
