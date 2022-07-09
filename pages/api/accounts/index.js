import dbConnect from "../../../lib/dbConnect";
import Account from "../../../models/account";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const accounts = await Account.find();
      res.status(200).json({ accounts });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const account = await Account.create(req.body);
      res.status(201).json({ account });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
