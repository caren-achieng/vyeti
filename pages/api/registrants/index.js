import dbConnect from "../../../lib/dbConnect";
import Registrant from "../../../models/registrant";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const registrants = await Registrant.find().sort("-createdAt");
      res.status(200).json(registrants);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const registrant = await Registrant.create(req.body);
      res.status(201).json(registrant);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
