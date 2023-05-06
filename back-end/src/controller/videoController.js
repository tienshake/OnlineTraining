import db from "../models";
import path from "path";
import getVideoDuration from "../utils/getTime";
const multer = require("multer");
const firebase = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const request = require("request");

const firebaseConfig = {
  apiKey: "AIzaSyBay0s-0CnInpQJXA4APy2oEKw3QkAcgoA",
  authDomain: "videostore-3561b.firebaseapp.com",
  projectId: "videostore-3561b",
  storageBucket: "videostore-3561b.appspot.com",
  messagingSenderId: "546028101649",
  appId: "1:546028101649:web:7bb7c0346b1873359051b0",
  measurementId: "G-2F00F33N5V",
};

firebase.initializeApp(firebaseConfig);

const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() }).single("video");

const multerUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(new Error("only mp4 is allowed"));
    }
    cb(null, true);
  },
});

const uploadVideo = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
      return;
    }
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const StorageRef = ref(storage, req.file.originalname);
    const metadata = {
      contentType: "video/mp4",
    };

    uploadBytes(StorageRef, req.file.buffer, metadata).then(() => {
      getDownloadURL(StorageRef)
        .then((url) => {
          res.json({ url });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: "Server error" });
        });
    });
  });
};

const createLectureCourse = async (req, res) => {
  try {
    multerUpload.array("video", 10)(req, res, async (err) => {
      const sections = JSON.parse(req.body.sections);
      const {
        title,
        description,
        descriptionMarkdown,
        price,
        user_id,
        category_id,
        thumbnail,
        promotion_price,
      } = JSON.parse(req.body.dataCourse);

      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          message: err.message,
        });
      } else if (err) {
        return res.status(500).json({
          message: "Server error",
        });
      }

      const course = await db.Course.create({
        title,
        description,
        descriptionMarkdown,
        price,
        user_id,
        category_id,
        thumbnail,
        promotion_price,
      });

      if (course) {
        await db.Course_detail.create({
          course_id: course.id,
          description,
          descriptionMarkdown,
        });
      }

      if (!course) {
        res.status(400).json({ message: "Create course failed" });
        return;
      }

      if (
        !title ||
        !description ||
        !price ||
        !user_id ||
        !category_id ||
        !descriptionMarkdown
      ) {
        res.status(400).json({ message: "Missing params" });
        return;
      }

      if (sections && sections.length > 0) {
        for (let i = 0; i < sections.length; i++) {
          const courseSection = await db.Course_section.create({
            course_id: course.id,
            title: sections[i].title,
          });
          if (sections[i].lectures) {
            sections[i].lectures.forEach(async (lecture, index) => {
              try {
                // Make sure to access the correct file in req.files
                const videoFile = req.files[index];

                // Check if the file exists before accessing its properties
                if (videoFile) {
                  const filename = `${Date.now()}_${videoFile.originalname}`;
                  const fileRef = ref(storage, filename);
                  const metadata = {
                    contentType: "video/mp4",
                  };
                  await uploadBytes(fileRef, videoFile.buffer, metadata);
                  const downloadURL = await getDownloadURL(fileRef);
                  const totalTime = await getVideoDuration(downloadURL);
                  await db.Lecture.create({
                    course_section_id: courseSection.id,
                    title: lecture.title,
                    filename,
                    video: downloadURL,
                    totalTime,
                  });
                } else {
                  console.error("Video file not found");
                  await db.Lecture.create({
                    course_section_id: courseSection.id,
                    title: lecture.title,
                  });
                }
              } catch (err) {
                console.log(err);
              }
            });
          }
        }
      }
      res.status(201).json({
        message: "Create course successfully",
        data: course,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getVideoByFilename = async (req, res) => {
  const { filename } = req.params;
  console.log("filename", filename);
  // Create a reference to the video file in Firebase Storage
  const storageRef = ref(storage, filename);

  try {
    // Get the download URL of the video file
    const downloadURL = await getDownloadURL(storageRef);

    // Set the response headers
    const head = {
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);

    // Pipe the video stream to the response object
    const stream = request(downloadURL);
    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(404).send("File not found");
  }
};

export default {
  uploadVideo,
  createLectureCourse,
  getVideoByFilename,
};
