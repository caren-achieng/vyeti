import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import dbConnect from "../../../lib/dbConnect";
import Earner from "../../../models/earner";
import Account from "../../../models/account";
import { randomBytes } from "crypto";

const secret = process.env.JWT_SECRET;

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const earners = await Earner.find();
      res.status(200).json(earners);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //Earner Registration
  if (method === "POST") {
    return new Promise((resolve) => {
      const accountType = "earner";
      const earnerdata = new Earner(req.body);

      earnerdata.validate(async function (err) {
        if (err) {
          res.status(500).json(err);
          resolve();
        } else {
          try {
            const account = await Account.create({
              email: req.body.email,
              wallet: req.body.wallet,
              type: accountType,
              verification_token: randomBytes(32).toString("hex"),
            });

            const accountId = account._id;

            const earner = await Earner.create({
              ...req.body,
              accountId: accountId,
            });

            //Assign Token
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
              //sameSite: "strict",
              maxAge: 60 * 60 * 24 * 30,
              path: "/",
            });

            res.setHeader("Set-Cookie", serialised);

            res.status(200).json({ message: "Success!", token });
            resolve();
          } catch (err) {
            res.status(500).json(err);
            resolve();
          }
        }
      });
    });
  }
}
