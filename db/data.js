use("mongodbVSCodePlaygroundDB");

// Insert a few documents into the sales collection.
db.getCollection("camera").insertMany([
  { cam: "1", img_name: "esp32_001", human: 30 },
  { cam: "1", img_name: "esp32_002", human: 28 },
]);
