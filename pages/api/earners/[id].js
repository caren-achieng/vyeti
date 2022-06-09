import dbConnect from "../../../lib/dbConnect";
import Earner from "../../../models/earner";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const earner = await Earner.findById(id);
      res.status(200).json({ earner });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const earner = await Earner.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(earner);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      await Earner.findByIdAndDelete(id);
      res.status(200).json("Earner account has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
