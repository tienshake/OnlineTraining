const ffprobe = require("ffprobe-static");
const ffprobePath = ffprobe.path;
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const getVideoDuration = async (filePath) => {
  try {
    const { stdout } = await exec(
      `${ffprobePath} -v error -show_entries format=duration -of json "${filePath}"`
    );
    const metadata = JSON.parse(stdout);
    const totalDuration = metadata.format.duration;
    return totalDuration;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getVideoDuration;
