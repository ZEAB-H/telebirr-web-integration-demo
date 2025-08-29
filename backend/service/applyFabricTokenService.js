const axios = require("axios");
const config = require("../config/config");


async function applyFabricToken() {
  try {
    const response = await axios.post(
      `${config.baseUrl}/payment/v1/token`,
      {
        appSecret: config.appSecret,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-APP-Key": config.fabricAppId,
        },
      }
    );


    return response.data;
  } catch (error) {
    console.error("Error while applying fabric token:", error.message);
    throw error;
  }
}

module.exports = applyFabricToken;
