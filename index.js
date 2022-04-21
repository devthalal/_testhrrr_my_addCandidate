import fs from "fs";
import path from "path";
import { getDB, getBody, sendResponse } from "./utils.js";
import { env, shield, internals } from "node-blox-sdk";

env.init();

// Initializes sdk with credentials
internals.initialize({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

/**
 * Add candidate request hanlder
 * @param {*} req
 * @param {*} res
 */
const addCandidate = async (req, res) => {
  try {
    
    if (req.params["health"] === "health") {
      return sendResponse(res, 200, {
        success: true,
        msg: "Health check success",
      });
    }

    let userUID;
    try {
      userUID = await shield.getUID(req);
    } catch (error) {
      console.log(error);
    }

    const DB_FILE = path.resolve("../localdb.json");
    const localDB = getDB(DB_FILE);
    const id = new Date().getTime();
    const candidateData = await getBody(req);
    localDB.push({ ...candidateData, id, createdBy: userUID });
    fs.writeFileSync(DB_FILE, JSON.stringify(localDB));
    sendResponse(res, 200, {
      status: true,
      msg: "Candidate added successfully",
    });
  } catch (e) {
    sendResponse(res, 500, {
      status: false,
      msg: e.message,
      err: e,
    });
  }
};

export default addCandidate;
