import dbConnect from "../../../lib/dbConnect";
import Programme from "../../../models/programme";
import Registrant from "../../../models/registrant";

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
        "_id institution_name slug"
      );
      const registrants = await Registrant.find({ programme: id })
        .populate(
          "institution programme",
          "_id institution_name programme_name"
        )
        .sort("-createdAt");
      res.status(200).json({ programme, registrants });
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
