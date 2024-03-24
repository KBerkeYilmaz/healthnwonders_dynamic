const nodemailer = require("nodemailer");

async function SMTP(
  email,
  specialRequests,
  name,
  phone,
  date,
  gender,
  doctor,
  treatment,
) {
  // send mail with defined transport object
  const transporter = nodemailer.createTransport({
    host: "", // SMTP Adresi 
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "....", // Gönderen Adresi // Buraya healthandwonders'ın ilgili adresi yazılacak. 
      pass: "....", // Gönderen Adresi Şifresi => Google hesabı Uygulama Parolaları, yeni parola oluştur.
    },
  });

  const info = await transporter.sendMail({
    from: `Yeni Bir Mesajınız Var 👻 <${email}>`, // Gönderen
    to: "info@healthandwonders.com", // Alıcı listesi
    subject: "healthandwonders.com'dan Yeni Bir Mailiniz Var ✔", // Subject line
    text: `${specialRequests}`, // plain text body
    html: `
        <h1>Yeni Bir Randevu Talebi!</h1>
        <p>Yeni bir randevu talebi aldınız. Aşağıda detayları bulabilirsiniz.</p>
        <br>
        <b>İsim ${name} </b>
        <br>
        <b>Email: ${email}</b>
        <br>
        <b>Telefon: ${phone}</b>
        <br>
        <b>Randevu Tarihi: ${date}</b>
        <br>
        <b>Cinsiyet:${gender}</b>
        <br>
        <b>Doktor: ${doctor}</b>
        <br>
        <b>Tedavi: ${treatment}</b>
        <br>
        <b>Özel İstekler: ${specialRequests}</b>  
        `,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = SMTP;
