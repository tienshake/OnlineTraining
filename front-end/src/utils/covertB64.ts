import { Buffer } from "buffer";

const covertB64 = (data: any) => {
  if (data) {
    const dataNew = Buffer.from(data, "base64").toString("binary");
    return dataNew;
  }
};

export default covertB64;
