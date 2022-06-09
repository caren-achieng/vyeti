import dbConnect from "../../../lib/dbConnect";
import Provider from "../../../models/provider";
import Programme from "../../../models/programme";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const provider = await Provider.findById(id);
      const programmes = await Programme.find({ provider: id }).sort(
        "-createdAt"
      );
      res.status(200).json({ provider, programmes });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const provider = await Provider.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(provider);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      await Provider.findByIdAndDelete(id);
      res.status(200).json("Provider account has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
