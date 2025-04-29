const express = require("express");
const axios = require("axios");
const router = express.Router();

// Define the FastAPI endpoint
const FASTAPI_URL = "http://localhost:8000";

// Proxy the chat request to FastAPI
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(`${FASTAPI_URL}/chat/`, req.body);
    return res.json(response.data);
  } catch (error) {
    console.error("Error forwarding chat request to FastAPI:", error.message);
    
    // Forward the original error from FastAPI if available
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    
    return res.status(500).json({ detail: "Failed to connect to chat service" });
  }
});

// Proxy the health check request to FastAPI
router.get("/health", async (req, res) => {
  try {
    const response = await axios.get(`${FASTAPI_URL}/health/`);
    return res.json(response.data);
  } catch (error) {
    console.error("Error forwarding health check to FastAPI:", error.message);
    return res.status(500).json({ detail: "Chat service is currently unavailable" });
  }
});

// Proxy the reset request to FastAPI
router.post("/reset", async (req, res) => {
  try {
    const response = await axios.post(`${FASTAPI_URL}/reset/`);
    return res.json(response.data);
  } catch (error) {
    console.error("Error forwarding reset request to FastAPI:", error.message);
    return res.status(500).json({ detail: "Failed to reset chat service" });
  }
});

module.exports = router; 