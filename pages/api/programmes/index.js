import dbConnect from "../../../lib/dbConnect";
import Programme from "../../../models/programme";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const programmes = await Programme.find();
      res.status(200).json(programmes);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const programme = await Programme.create(req.body);
      res.status(201).json(programme);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
