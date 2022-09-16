const config = require("dotenv");
const nodemailer = require("nodemailer");

config.config();

const sendEmail = async (email, subject, heading, text) => {
  return new Promise((resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      });
      transporter
        .sendMail({
          from: process.env.MAIL_USERNAME,
          to: email,
          subject: subject,
          html: `<table style="width: 100%; height: 100%; background-color: #f5f5f5; font-family: sans-serif; font-size: 14px; line-height: 1.42857143; color: #333; margin: 0;">
          <tbody>
            <tr>
              <td style="text-align: center; padding: 20px 0;">
                <table style="width: 600px; background-color: #fff; margin: 0 auto; border: 1px solid #ddd; border-radius: 4px; padding: 20px;">  
                  <tbody>
                    <tr>
                      <td style="text-align: left; padding: 20px 0;">
                        <img src="https://ci3.googleusercontent.com/proxy/-A-wWZ4sUppZ-E1EQiVHDlZzZFfZaGQfF35Pru-DRv-VTMjQJNqLzGdG2SmgLHibxEeWgP_xO9g5ulFm6Me1JsQ4Eu6tRUZ5T-g8sVdr1uWwePiUwICM_pS1So6J31F8rhRoUSuvV0b79hQ2HLLndYo-sMKNm5ZA7kFVQ4L2IOvaR6I0Qb2ljRX5VBMNe24xbCjw8OwhcRUnePH2NKJ668dKYL576qYa5HkGlRECVtQpzo61ZoYGznLED1im8e6w3dSfnsFkZuvBIFDuLHoht5FnE6I1-IqfsslbjbPPm-Apug=s0-d-e1-ft#https://static.licdn.com/sc/p/com.linkedin.email-assets-frontend%3Aemail-assets-frontend-static-content%2B__latest__/f/%2Femail-assets-frontend%2Fimages%2Femail%2Flogos%2Flogo_linkedin_tm_email_95x21_v1.png" alt="logo" border="0" style="width: 70px; height: 30px;">
                      </td>
                    </tr>
                    <tr>
                    <td style="text-align: left; padding: 20px 0;">
                    <p style="font-size: 16px; line-height: 1.5; color: #333; margin: 0 0 10px;">${heading}</p>
                    </td>
                    </tr>
                    <tr>
                    
                      <td style="padding: 20px 0;">
                        <p style="margin: 0 0 10px;">${text}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 20px 0;">
                        <p style="margin: 0 0 10px;">Regards,</p>
                        <p style="margin: 0 0 10px;">LinkedOut Team</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>`,
        })
        .then((info) => {
          resolve(info);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = { sendEmail };
