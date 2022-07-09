import dbConnect from "../../../../lib/dbConnect";
import Earner from "../../../../models/earner";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const earner = await Earner.findOne({ accountId: id });
      res.status(200).json({ earner });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
