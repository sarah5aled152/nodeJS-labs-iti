// import sha256 from "crypto-js/sha256";
// import hmacSHA512 from "crypto-js/hmac-sha512";
// import Base64 from "crypto-js/enc-base64";

// const privateKey = process.env.PRIVATE_KEY;

// const hashPhoneNumber = (phoneNumber) => {
//   const nonce = Date.now().toString(); // Create a unique nonce (could use a timestamp or random string)
//   const message = phoneNumber; // The phone number to hash

//   // First, hash the phone number using sha256
//   const hashDigest = sha256(nonce + message).toString();

//   // Then, create an HMAC using the path and the hashed phone number
//   const path = "/users/phone"; // Can be any relevant path, like API endpoint
//   const hmacDigest = Base64.stringify(
//     hmacSHA512(path + hashDigest, privateKey)
//   );

//   return hmacDigest;
// };

// const verifyPhoneNumber = (phoneNumber, hash) => {
//   const nonce = Date.now().toString();
//   const message = phoneNumber;
//   const hashDigest = sha256(nonce + message).toString();
//   const path = "/users/phone";

//   const computedHmac = Base64.stringify(
//     hmacSHA512(path + hashDigest, privateKey)
//   );

//   return computedHmac === hash;
// };

// export { hashPhoneNumber, verifyPhoneNumber };
