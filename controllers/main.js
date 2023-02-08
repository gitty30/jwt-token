const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.headers);

  const authHeader = req.headers.authorization;

   if(!authHeader || !authHeader.startsWith('Bearer '))
   {
         throw new CustomAPIError("No token provided", 401);
   }
  const token=authHeader.split(' ')[1];
  console.log(token);
  try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    // console.log(decoded);
      const luckyNum = Math.floor(Math.random() * 100);
      res.status(200).json({
        msg: `Hello ${decoded.username}`,
        secret: `His your authorized data,your lucky Number is ${luckyNum}`,
      });
  } catch (error) {
     throw new CustomAPIError("Token not authorized", 401);
  }

};
module.exports = { login, dashboard };
