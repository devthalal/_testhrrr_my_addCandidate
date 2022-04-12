
    import fs from 'fs'
    import path from 'path'
// For testing take pull from Appblox/node-blox-sdk and npm install from path
// import { env } from 'node-blox-sdk'
// env.init()

const addCandidate = async (req, res) => {
  try {
    // const DB_FILE = path.resolve(process.env.DB_FILE_PATH)
    // const inmemDB = getDB(DB_FILE)
    // const newId = new Date().getTime()
    // const newItem = await getBody(req)
    // const newEntry = { id: newId, item: newItem }
    // console.log('Request to add -', newItem)
    // inmemDB.push(newEntry)
    // fs.writeFileSync(DB_FILE, JSON.stringify(inmemDB))
    // console.log('Updated DB:
', inmemDB)
    // console.log('
')
    sendResponse(res, 200, "Hello from addCandidate")
  } catch (e) {
    console.log(e)
    sendResponse(res, 500, { status: 'failed', errMsg: e.message })
  }
}