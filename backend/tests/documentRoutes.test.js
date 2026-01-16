const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Document = require("../models/Document");

beforeAll(async () => {
  console.log("TEST_DB_URI:", process.env.TEST_DB_URI); // Debugging the environment variable
  await mongoose.connect(process.env.TEST_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Document Routes", () => {
  it("should upload a document", async () => {
    const response = await request(app)
      .post("/api/documents/upload")
      .set("Authorization", "Bearer test-token")
      .field("title", "Test Document")
      .field("recipients", JSON.stringify(["recipient1", "recipient2"]))
      .attach("file", "__tests__/testFile.pdf");

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Document uploaded successfully");
  });

  it("should track a document", async () => {
    const document = await Document.create({
      title: "Test Document",
      recipients: ["recipient1", "recipient2"],
      sender: "test-sender",
      fileUrl: "/uploads/testFile.pdf",
      currentHolder: "recipient1",
    });

    const response = await request(app)
      .get(`/api/documents/track/${document._id}`)
      .set("Authorization", "Bearer test-token");

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Test Document");
  });
});
