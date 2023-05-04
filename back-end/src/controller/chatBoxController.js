import db from "../models";
import { parserAndCheckString } from "../utils/parserAndCheckString";
// Import the packages we need
const dialogflow = require("@google-cloud/dialogflow");
const { Op } = require("sequelize");

require("dotenv").config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
// Other way to read the credentials

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
  const result = responses[0].queryResult;

  return {
    response: result.fulfillmentText,
  };
};

/* welcomUser */
const welcomeUser = async (req, res) => {
  const languageCode = "vi"; // Ngôn ngữ của trò chuyện
  const sessionId = Math.random().toString(36).substring(7); // Tạo sessionId ngẫu nhiên
  const queryText = "chào mừng"; // Chào hỏi
  const responseData = await detectIntent(languageCode, queryText, sessionId); // Gửi yêu cầu đến Dialogflow

  res.send(responseData.response); // Trả về phản hồi cho khách hàng
};

/* Ask bot */
const askBot = async (req, res) => {
  const { keyWordCourse } = req.query;
  console.log(keyWordCourse);
  const idUser = req.query.idUser;
  const user = await db.User.findOne({ where: { id: `${idUser}` } });

  let languageCode = "vi";
  let sessionId = "abc12345";
  let queryText = keyWordCourse ? "@course" : req.body.queryText;
  let responseData = await detectIntent(languageCode, queryText, sessionId);

  if (user && parserAndCheckString("ten cua ban", responseData)) {
    console.log("1");
    return res.status(200).send({
      message: "Submit request successfully!",
      respone: `${responseData.response}, ${user.name}`,
    });
  } else if (
    keyWordCourse &&
    parserAndCheckString("khoa hoc ban can tim", responseData)
  ) {
    const results = await db.Course.findAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${keyWordCourse}%` } }],
      },
    });

    if (results.length > 0) {
      res.status(200).json({
        code: 0,
        message: "Search completed",
        respone: `${responseData.response}: ${results[0].title}. Bạn có thể thể truy cập để xem chi tiết về nó: http://localhost:3000/course-details/${results[0].id}`,
        data: results,
      });
    } else {
      res.status(200).json({
        code: 0,
        message: "Search completed",
        respone: `Chúng tôi không tìm thấy khoá học nào có gợi ý là "${keyWordCourse}" `,
      });
    }
    
  } else if (user && parserAndCheckString("email cua ban la", responseData)) {
    console.log("3");
    return res.status(200).send({
      message: "Submit request successfully!",
      respone: `${responseData.response} ${user.email}`,
    });
  } else {
    console.log("4");
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
