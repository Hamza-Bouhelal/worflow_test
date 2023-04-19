import express from "express";
import cors from "cors";
import { BrowserService } from "./services/browserService";
import { validate, validateShoesBody } from "./middlewares/validation";
import dotenv from "dotenv";
import generateApiKey from "generate-api-key";
import { authValidation } from "./middlewares/authValidation";

dotenv.config();

const port = process.env.PORT || 8000;
const apiKey = (process.env.API_KEY as string) || generateApiKey().toString();

console.log("API_KEY: ", apiKey);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/health", (req, res) => {
  res.send("OK");
});

app.post(
  "/api/shoes",
  authValidation(apiKey),
  validate(validateShoesBody),
  async (req, res) => {
    const shoesName = req.body as string[];
    const data = await BrowserService.getData();
    res.status(200).send({ bitcoinPrice: data, shoesName });
  }
);

app.listen(port, () => {
  console.log(
    "Server running on port %PORT%".replace("%PORT%", port.toString())
  );
});
