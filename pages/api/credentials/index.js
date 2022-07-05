import dbConnect from "../../../lib/dbConnect";
import Credential from "../../../models/credential";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const credentials = await Credential.find().populate(
        "institution programme",
        "_id institution_name programme_name"
      );
      res.status(200).json({ credentials });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const credential = await Credential.create(req.body);
      res.status(201).json(credential);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
