import dbConnect from "../../../../lib/dbConnect";
import Provider from "../../../../models/provider";
import Programme from "../../../../models/programme";

export default async function handler(req, res) {
  const {
    method,
    query: { slug },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const provider = await Provider.findOne({ slug: slug });
      const programmes = await Programme.find({ provider: provider._id }).sort(
        "-createdAt"
      );
      res.status(200).json({ provider, programmes });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
