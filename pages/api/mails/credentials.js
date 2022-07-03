const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API);

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const senderAdress = `vyeti-via@jamiibuilder.com`;
      const renderImage = req.body.image
        ? ` <img src="${req.body.image}" alt="image" style="width:100%; height:auto;"/>`
        : `<div></div>`;

      const data = {
        to: req.body.issued_to.email,
        from: {
          email: senderAdress,
          name: "Vyeti Certificates",
        },
        subject: `Certificate for ${req.body.title}`,
        html: `
                <div align="center" style="background-color:#eceff1; padding-top:12px; padding-bottom:12px;">
                  <div style="background-color:#fff ; margin:8%; padding:6%;">
                      <h1>Certificate for ${req.body.title}</h1>
                      <div style=" margin:10px; width:100px">
                        ${renderImage}
                      </div>
                      <div style=" padding-left:4%; padding-right:4%;">
                        <p style="font-size: 16px;">You have recieved a certificate via Vyeti</p>
                      </div>
                  </div>
                  <p style="font-size: 12px;">Created with <a style="color: black;" href="vyeti.com">Vyeti</a></p>
                </div>`,
      };

      await mail.send(data);

      res.status(200).json({ status: "OK", data });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}
