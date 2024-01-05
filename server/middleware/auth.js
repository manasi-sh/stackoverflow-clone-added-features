import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodeData = jwt.verify(token,process.env.JWT_SECRET);
    req.userId = decodeData?.id;

    // const ip = req.ip;
    // const userAgent = req.get('user-agent')
    // const userBrowser = req.get('user-browser')
    // const userOs = req.get('user-os')
    // const userDevice = req.get('user-device')

    // req.userInfo = {ip, userAgent, userBrowser, userOs, userDevice};

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
