import dbConnect from "../../../lib/dbConnect";
import Employer from "../../../models/employer";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const employer = await Employer.findById(id);
      res.status(200).json({ employer });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const employer = await Employer.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(employer);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      await Employer.findByIdAndDelete(id);
      res.status(200).json("Employer account has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
