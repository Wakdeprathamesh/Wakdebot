# PDF Chatbot with RAG using Groq

This is a RAG (Retrieval-Augmented Generation) based chatbot that can process PDF documents and answer questions about their content. The chatbot uses Groq's Llama3-8B model and simple keyword-based retrieval to provide relevant answers.

## Features

- Load and process PDF documents
- Extract relevant information using keyword matching
- Generate coherent answers based on retrieved context
- Support for multiple PDFs
- Interactive command-line interface
- Web interface using Streamlit

## Setup

1. Clone this repository
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt --user
   ```
3. Use your Groq API key in the `.env` file:
   ```
   GROQ_API_KEY=your-groq-api-key
   ```

## How it Works

The chatbot uses a simplified RAG (Retrieval-Augmented Generation) approach:

1. **PDF Processing**: Extracts text from PDF documents
2. **Text Chunking**: Splits the content into manageable chunks with overlap for better context
3. **Keyword Extraction**: Extracts important keywords from user questions
4. **Relevant Document Retrieval**: Finds chunks containing the most keyword matches
5. **Context Building**: Combines relevant chunks with conversation history
6. **Response Generation**: Uses Groq's Llama3-8B to generate a response based on the context

## Usage

### Command Line Interface

Run the chatbot in the terminal:
```bash
python chatbot.py
```

Available commands:
- `load <pdf_path>`: Load a PDF file
- `list`: Show all loaded PDFs
- `ask <question>`: Ask a question about the loaded PDFs
- `quit`: Exit the chatbot

### Streamlit Web Interface

For a more user-friendly experience, run the Streamlit web app:
```bash
streamlit run streamlit_app.py
```

The web interface provides:
- PDF file upload through a simple drag-and-drop interface
- Chat-like interface for asking questions
- Display of conversation history
- List of loaded PDFs in the sidebar

## Example

### Command Line

```
Welcome to the PDF Chatbot with Groq!
Commands:
- 'load <pdf_path>' to load a PDF
- 'list' to see loaded PDFs
- 'ask <question>' to ask a question
- 'quit' to exit

Enter command: load document.pdf
Successfully loaded and processed PDF: document.pdf

Enter command: ask What is the main topic of this document?
Answer: [Chatbot will provide a relevant answer based on the PDF content]
```

### Streamlit Web App

1. Open the web interface in your browser
2. Upload PDF documents using the sidebar
3. Type your questions in the chat input
4. View answers in a conversational format

## Requirements

- Python 3.8+
- Groq API key
- Dependencies listed in requirements.txt

## API Integration Guide

The Ayurvedic chatbot can be integrated with your frontend application using the FastAPI endpoints provided. The API server runs on port 8000 by default.

### Starting the API Server

```bash
cd WAKDEBOT
python fastapi_app.py
```

### Available Endpoints

#### 1. Chat Endpoint

```
POST /chat/
```

Send user messages and receive chatbot responses.

**Request Body:**

```json
{
  "user_id": "unique-user-id",
  "message": "User's message here",
  "consultation_history": []  // Optional
}
```

**Optional User Profile:**

You can also send user profile information to enhance the consultation:

```json
{
  "name": "John Doe",
  "age": 30,
  "sex": "male",
  "dosha_test_results": {
    "vata": 35.5,
    "pitta": 40.2,
    "kapha": 24.3
  },
  "primary_dosha": "Pitta",
  "secondary_dosha": "Vata"
}
```

**Response:**

```json
{
  "message_id": "msg_1653456789",
  "response": "Chatbot's response text",
  "consultation_state": {
    "confidence_score": 30,
    "categories_covered": ["symptoms", "lifestyle"],
    "questions_asked": 2,
    "stage": "assessment",
    // additional state information
  }
}
```

#### 2. Feedback Endpoint

```
POST /feedback/
```

Send user feedback about a chatbot response.

**Request Body:**

```json
{
  "message_id": "msg_1653456789",
  "rating": 4,
  "feedback_text": "This was helpful, but I would like more specific advice."
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Feedback recorded"
}
```

#### 3. Reset Consultation

```
POST /reset/
```

Reset the consultation state to start fresh.

**Response:**

```json
{
  "status": "success",
  "message": "Consultation state reset"
}
```

#### 4. Health Check

```
GET /health/
```

Check if the API is running correctly.

**Response:**

```json
{
  "status": "healthy",
  "loaded_pdfs": ["Charak Samhita our own.pdf"],
  "ayurvedic_mode": true
}
```

### Example Integration (React)

```javascript
// Example of integrating with React

import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Function to send a message to the chatbot
const sendMessage = async (userId, message) => {
  try {
    const response = await axios.post(`${API_URL}/chat/`, {
      user_id: userId,
      message: message
    });
    
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Function to send user profile data
const sendUserProfile = async (userId, message, profileData) => {
  try {
    const response = await axios.post(
      `${API_URL}/chat/`,
      {
        user_id: userId,
        message: message
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          user_profile: profileData
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error sending profile:', error);
    throw error;
  }
};

// Function to send feedback
const sendFeedback = async (messageId, rating, feedbackText = '') => {
  try {
    const response = await axios.post(`${API_URL}/feedback/`, {
      message_id: messageId,
      rating: rating,
      feedback_text: feedbackText
    });
    
    return response.data;
  } catch (error) {
    console.error('Error sending feedback:', error);
    throw error;
  }
};

// Function to reset consultation
const resetConsultation = async () => {
  try {
    const response = await axios.post(`${API_URL}/reset/`);
    return response.data;
  } catch (error) {
    console.error('Error resetting consultation:', error);
    throw error;
  }
};
``` 