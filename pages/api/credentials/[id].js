import dbConnect from "../../../lib/dbConnect";
import Credential from "../../../models/credential";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const credential = await Credential.findOne({ tokenId: id }).populate(
        "institution programme",
        "_id institution_name programme_name"
      );
      res.status(200).json({ credential });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
