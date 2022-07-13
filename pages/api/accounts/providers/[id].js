import dbConnect from "../../../../lib/dbConnect";
import Provider from "../../../../models/provider";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const provider = await Provider.findOne({ accountId: id });
      res.status(200).json({ provider });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
