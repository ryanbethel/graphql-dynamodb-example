exports.handler = async function http (req) {
  return {
    statusCode: 303,
    headers: {
      'location': '/graphql'
    }
  }
}
