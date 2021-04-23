import { Handler } from '@netlify/functions'

const handler: Handler = async (event, context) => {
  console.log(event, context);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World1" })
  }
}

export { handler }