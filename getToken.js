const axios = require("axios");

async function getToken() {
  try {
    const res = await axios.post(
      "http://20.207.122.201/evaluation-service/auth",
      {
        email: "sg4798@srmist.edu.in",
        name: "Getta Satya Amrutha",
        rollNo: "RA2311003010461",
        accessCode: "QkbpxH",
        clientID: "b117c9ac-7c90-4324-bf66-f7d0664c6bbc",
        clientSecret: "XAgXyBMbpxqNBkgm"
      }
    );

    console.log(res.data);
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

getToken();