import dbConnect from "../../../lib/dbConnect";
import Account from "../../../models/account";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const account = await Account.findById(id);
      res.status(200).json({ account });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const account = await Account.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json({ account });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
