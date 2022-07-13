import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { trusted } from "mongoose";

const secret = process.env.JWT_SECRET;

export default async function (req, res) {
  try {
    res.setHeader("Set-Cookie", [`vyeti_jwt=deleted; Max-Age=0; path=/`]);

    return res.status(200).json({
      success: trusted,
    });
  } catch (err) {
    res.status(500).json(err);
  }
}
