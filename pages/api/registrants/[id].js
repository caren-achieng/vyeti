import dbConnect from "../../../lib/dbConnect";
import Registrant from "../../../models/registrant";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const registrant = await Registrant.findById(id).populate(
        "institution programme",
        "_id institution_name programme_name"
      );
      res.status(200).json({ registrant });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const registrant = await Registrant.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json({ registrant });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      await Registrant.findByIdAndDelete(id);
      res.status(200).json("Registrant has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
