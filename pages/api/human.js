import { readHumanDB, writeDataDB } from "../../backendLibs/dbLib";

export default function humanRoute(req, res) {
  if (req.medthod === "GET") {
    const humanDetected = readHumanDB().filter((x) => x.human === human);
    return res.json({
      ok: true,
      humanDetected,
    });
  }
}

// use('mongodbVSCodePlaygroundDB');

// // Insert a few documents into the sales collection.
// db.getCollection('camera').insertMany([
//     {'cam': '1', 'img_name': 'esp32_001', 'human': 30},
//     {'cam': '1', 'img_name': 'esp32_002', 'human': 28}
// ])
