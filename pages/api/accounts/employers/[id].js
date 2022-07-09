import dbConnect from "../../../../lib/dbConnect";
import Employer from "../../../../models/employer";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const employer = await Employer.findOne({ accountId: id });
      res.status(200).json({ employer });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
