import fs from "fs";
import path from "path";
import { getDB, getBody, sendResponse, shieldApi } from "./utils.js";

/**
 * Add candidate request hanlder
 * @param {*} req
 * @param {*} res
 */
const addCandidate = async (req, res) => {
  try {
    const DB_FILE = path.resolve("../localdb.json");
    const localDB = getDB(DB_FILE);
    const id = new Date().getTime();
    const candidateData = await getBody(req);
    localDB.push({ ...candidateData, id });
    fs.writeFileSync(DB_FILE, JSON.stringify(localDB));
    sendResponse(res, 200, {
      status: true,
      msg: "Candidate added successfully",
    });
  } catch (e) {
    sendResponse(res, 500, { status: false, msg: e.message, err: e });
  }
};

export default { addCandidate };
