import app from "./app";

const PORT = 3000;

// server.ts starts the Express app and listens for API requests.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
