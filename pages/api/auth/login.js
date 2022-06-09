import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import dbConnect from "../../../lib/dbConnect";
import Account from "../../../models/account";

const secret = process.env.JWT_SECRET;

export default async function (req, res) {
  dbConnect();

  await Account.findOne({ wallet: req.body.wallet }).then((account) => {
    if (!account) {
      res.json({
        message:
          "Wallet not recognized. Please create an account if you don't have one",
      });
    } else {
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
          wallet: account.wallet,
          type: account.type,
          id: account.id,
        },
        secret
      );

      const serialised = serialize("vyeti_jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      res.setHeader("Set-Cookie", serialised);

      res.status(200).json({ message: "Success!", token });
    }
  });
}
