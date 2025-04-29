from fastapi import FastAPI, HTTPException, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, Optional, List, Any
from chatbot import PDFChatbot
import os
import json
import time
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Ayurvedic Chatbot API",
    description="API for interacting with the Ayurvedic chatbot",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize chatbot
chatbot = PDFChatbot()

# Load default Charak Samhita
default_pdf = os.path.join("data", "Charak Samhita our own.pdf")
if os.path.exists(default_pdf):
    try:
        chatbot.load_pdf(default_pdf)
    except Exception as e:
        print(f"Error loading default Charak Samhita: {str(e)}")

class UserProfile(BaseModel):
    name: str
    age: int
    sex: str
    dosha_test_results: Dict[str, float] = Field(..., description="Vata, pitta, kapha percentages")
    primary_dosha: str = Field(..., description="The dominant dosha")
    secondary_dosha: str = Field(..., description="The secondary dosha")

class ChatMessage(BaseModel):
    role: str
    content: str
    type: str = "message"

class ChatSession(BaseModel):
    user_id: str = Field(..., description="Unique identifier for the user")
    message: str = Field(..., description="User's message")
    consultation_history: Optional[List[ChatMessage]] = []

class FeedbackModel(BaseModel):
    message_id: str = Field(..., description="ID of the message being rated")
    rating: int = Field(..., description="Rating from 1-5")
    feedback_text: Optional[str] = None

@app.post("/chat/")
async def chat_endpoint(session: ChatSession):
    """
    Process a chat message and return a response from the Ayurvedic chatbot.
    """
    try:
        # Validate input
        if not session.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")

        # Log incoming request
        print(f"Processing chat request for user: {session.user_id}")
        print(f"Message: {session.message}")

        # Get response from chatbot
        response = chatbot.ask_question(session.message)
        
        if not response:
            print("Error: Chatbot returned empty response")
            raise HTTPException(
                status_code=500,
                detail="Failed to generate response from chatbot"
            )
        
        # Generate a unique ID for this message
        message_id = f"msg_{int(time.time())}"
        
        # Safely handle consultation state
        try:
            consultation_state = chatbot.consultation_state.copy() if chatbot.consultation_state else {}
            
            # Convert sets to lists for JSON serialization
            if "categories_covered" in consultation_state:
                consultation_state["categories_covered"] = list(consultation_state["categories_covered"])
            if "categories_pending" in consultation_state:
                consultation_state["categories_pending"] = list(consultation_state["categories_pending"])
            
            # Ensure required fields exist
            if "stage" not in consultation_state:
                consultation_state["stage"] = "initial"
            if "questions_asked" not in consultation_state:
                consultation_state["questions_asked"] = 0
        except Exception as state_error:
            print(f"Error handling consultation state: {str(state_error)}")
            consultation_state = {
                "stage": "initial",
                "questions_asked": 0,
                "categories_covered": [],
                "categories_pending": []
            }
        
        result = {
            "message_id": message_id,
            "response": response,
            "consultation_state": consultation_state
        }
        
        # Log successful response
        print(f"Successfully processed chat request. Message ID: {message_id}")
        
        return result
    except HTTPException as he:
        # Re-raise HTTP exceptions
        raise he
    except Exception as e:
        error_msg = f"Error in chat endpoint: {str(e)}"
        print(error_msg)  # Log the error
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing your request: {str(e)}"
        )

@app.post("/feedback/")
async def feedback_endpoint(feedback: FeedbackModel, background_tasks: BackgroundTasks):
    """
    Record user feedback about a chatbot response.
    """
    try:
        # Store feedback in a background task
        background_tasks.add_task(store_feedback, feedback)
        return {"status": "success", "message": "Feedback recorded"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def store_feedback(feedback: FeedbackModel):
    """Store feedback in a JSON file"""
    feedback_file = "feedback.json"
    
    try:
        # Create or load existing feedback
        if os.path.exists(feedback_file):
            with open(feedback_file, "r") as f:
                feedback_data = json.load(f)
        else:
            feedback_data = []
        
        # Add new feedback
        feedback_data.append({
            "message_id": feedback.message_id,
            "rating": feedback.rating,
            "feedback_text": feedback.feedback_text,
            "timestamp": time.time()
        })
        
        # Save feedback
        with open(feedback_file, "w") as f:
            json.dump(feedback_data, f, indent=2)
    except Exception as e:
        print(f"Error storing feedback: {str(e)}")

@app.get("/health/")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "loaded_pdfs": chatbot.loaded_pdfs,
        "ayurvedic_mode": chatbot.ayurvedic_mode
    }

@app.post("/reset/")
async def reset_consultation():
    """Reset the consultation state"""
    try:
        chatbot.reset_consultation_state()
        return {"status": "success", "message": "Consultation state reset"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 