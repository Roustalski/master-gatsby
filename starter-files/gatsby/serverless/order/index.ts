import { Handler } from "@netlify/functions";
import NodeMailer from "nodemailer";

const generateOrderEmail = ({ order, total }: any) => {
  return `<div>
    <h2>Your Recent Order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in teh next 20 minutes.</p>
    <ul>
      ${order.map(
        (item: any) => `<li>
        <img src="${item.thumbnail}" alt="${item.name}"/>
        ${item.size} ${item.name} - ${item.price}
      </li>`
      )}
    </ul>
    <p>Your total is ${total} and due at pickup.</p>
  </div>`;
};

const transporter = NodeMailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PSS,
  },
});

const createRequestErrorResponse = (message: string) => {
  return {
    statusCode: 400,
    body: JSON.stringify({ message }),
  };
};

const handler: Handler = async (event, context) => {
  // validate the request data is valid
  let body: any;
  try {
    body = JSON.parse(event.body || "");
  } catch {
    return createRequestErrorResponse(
      "Invalid JSON received as part of the request of the body."
    );
  }
  const requiredFields = ["email", "name", "order"];
  for (const field of requiredFields) {
    if (!body[field]) {
      return createRequestErrorResponse(`Missing required field ${field}`);
    }
  }

  // send the email

  // send the success or error message

  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: "New Order!",
    html: generateOrderEmail(body),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Success" }),
  };
};

export { handler };
