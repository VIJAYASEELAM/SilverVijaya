import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({
    status: "ok",
    service: "orbitflow"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(
    `OrbitFlow running on port ${PORT}`
  );
});