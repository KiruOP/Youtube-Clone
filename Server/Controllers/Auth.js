import users from "../Models/Auth.js";
import UserPoints from "../Models/UserPoints.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    const extinguser = await users.findOne({ email });
    if (!extinguser) {
      try {
        const newuser = await users.create({ email });
        const token = jwt.sign(
          {
            email: newuser.email,
            id: newuser._id,
          },
          process.env.JWT_SECERT,
          {
            expiresIn: "1h",
          }
        );

        //Creating profile for userPoints when the new login
        const UserId = newuser._id;
        const userPoints = new UserPoints({ UserId: UserId });
        await userPoints.save();
        res.status(200).json({ result: newuser, token });
      } catch (error) {
        res.status(500).json({ mess: "something went wrong..." });
        return;
      }
    } else {
      const token = jwt.sign(
        {
          email: extinguser.email,
          id: extinguser._id,
        },
        process.env.JWT_SECERT,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ result: extinguser, token });
    }
  } catch (error) {
    res.status(500).json({ mess: "something went wrong..." });
    return;
  }
};