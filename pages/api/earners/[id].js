import dbConnect from "../../../lib/dbConnect";
import Earner from "../../../models/earner";
import Credential from "../../../models/credential";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const earner = await Earner.findById(id);
      const email = earner.email;
      const credentials = await Credential.find({
        "issued_to.email": email,
      })
        .sort("-createdAt")
        .populate("institution", "_id institution_name");
      res.status(200).json({ earner, credentials });
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
