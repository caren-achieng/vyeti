import dbConnect from "../../../lib/dbConnect";
import Programme from "../../../models/programme";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const programme = await Programme.findById(id).populate(
        "provider",
        "_id institution_name"
      );
      res.status(200).json({ programme });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const programme = await Programme.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(programme);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
