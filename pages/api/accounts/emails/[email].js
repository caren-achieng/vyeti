import dbConnect from "../../../../lib/dbConnect";
import Account from "../../../../models/account";

export default async function handler(req, res) {
  const {
    method,
    query: { email },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const account = await Account.findOne({ email: email });
      res.status(200).json({ account });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const account = await Account.findOneAndUpdate(
        { email: email },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({ account });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
