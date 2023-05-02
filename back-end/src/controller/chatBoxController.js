import db from "../models";
// Import the packages we need
const dialogflow = require("@google-cloud/dialogflow");
const mysql = require("mysql2/promise");
// const {WebhookClient, WebhookResponse} = require('dialogflow-fulfillment');
const { Op } = require("sequelize");

require("dotenv").config();

// Your credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
// console.log(CREDENTIALS)

// Other way to read the credentials
// const fs = require('fs');
// const CREDENTIALS = JSON.parse(fs.readFileSync('File path'));

// Your google dialogflow project-id
const PROJECID = CREDENTIALS.project_id;

// Configuration for the client
const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS["private_key"],
    client_email: CREDENTIALS["client_email"],
  },
};

// Create a new session
const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);
const detectIntent = async (languageCode, queryText, sessionId) => {
  let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);

  // The text query request.
  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: queryText,
        // The language used by the client (en-US)
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  // console.log(responses);
  const result = responses[0].queryResult;
  // console.log(result);

  return {
    response: result.fulfillmentText,
  };
};

const welcomeUser = async (req, res) => {
  const languageCode = "vi"; // Ngôn ngữ của trò chuyện
  const sessionId = Math.random().toString(36).substring(7); // Tạo sessionId ngẫu nhiên
  const queryText = "chào mừng"; // Chào hỏi
  const responseData = await detectIntent(languageCode, queryText, sessionId); // Gửi yêu cầu đến Dialogflow

  res.send(responseData.response); // Trả về phản hồi cho khách hàng
};

const askBot = async (req, res) => {
  const { keyword } = req.query;

  const idUser = req.query.idUser;
  const user = await db.User.findOne({ where: { id: `${idUser}` } });
  let languageCode = req.body.languageCode;
  let queryText = req.body.queryText;
  let sessionId = req.body.sessionId;
  let responseData = await detectIntent(languageCode, queryText, sessionId);

  const parserNormalString = (string) => {
    const lowerCaseString = responseData.response.toLowerCase(); // Chuyển đổi chuỗi thành dạng viết thường
    const normalizedString = lowerCaseString
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const newString = normalizedString.includes(string);
    return newString;
  };

  if (user && parserNormalString("ten cua ban")) {
    return res.status(200).send({
      message: "Submit request successfully!",
      respone: `${responseData.response}, ${user.name}`,
    });
  } else if (keyword && parserNormalString("san pham ban đang tim")) {
    const results = await db.Course.findAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${keyword}%` } }],
      },
    });
    res.status(200).json({
      code: 0,
      message: "Search completed",
      respone: `${responseData.response}`,
      data: results,
    });
  } else {
    res.status(200).send({
      message: "Submit request successfully!",
      respone: `${responseData.response}`,
    });
  }
};

export default {
  welcomeUser,
  askBot,
};
