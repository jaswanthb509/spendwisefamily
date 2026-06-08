const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI =
  new GoogleGenerativeAI(
    "PASTE_YOUR_NEW_API_KEY_HERE"
  );

async function test() {
  try {
    console.log("Testing Gemini...");

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

    const result =
      await model.generateContent(
        "Say hello"
      );

    const response =
      await result.response.text();

    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

test();