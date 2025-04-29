import os
import requests
import json
import re
import numpy as np
from typing import List, Dict, Tuple
from PyPDF2 import PdfReader
from dotenv import load_dotenv
import groq

class LLMAPI:
    def __init__(self, api_key: str):
        self.api_key = api_key
        # Using Groq v0.3.0 API format
        self.api_url = "https://api.groq.com/openai/v1/chat/completions"
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        # Ayurvedic system prompt
        self.ayurvedic_system_prompt = """You are a caring and intuitive Ayurvedic practitioner with deep knowledge of traditional Ayurvedic principles. Your approach is warm, empathetic, and conversational - just like a real doctor speaking with a patient.

CONVERSATION STYLE:
- Be natural and conversational, as if having a real in-person consultation
- Ask only ONE question at a time in a natural, flowing way
- Make your questions feel connected to what the patient just shared
- Show empathy and understanding in your responses
- Keep your responses concise and focused - avoid lengthy explanations
- Maintain a warm, compassionate tone throughout

AYURVEDIC ASSESSMENT FOCUS:
As you converse, gather information about:
- The patient's symptoms and main concerns
- Their constitution (vata, pitta, kapha tendencies)
- Digestion and appetite (agni)
- Daily routines and lifestyle
- Mental and emotional state
- Sleep patterns
- Environmental and seasonal factors

When appropriate (after gathering sufficient information), provide a comprehensive prescription using this structured format:

### AyurBot-Generated Prescription

#### 1️⃣ Ayurvedic Assessment
- Primary Constitution (Prakriti): [Vata/Pitta/Kapha predominant]
- Current Imbalance (Vikriti): [Details]
- Key Symptoms: [Summary]

#### 2️⃣ Dietary Recommendations
- Foods to Favor: [List with brief explanations]
- Foods to Reduce: [List with brief explanations]
- Eating Habits: [Timing, manner of eating]

#### 3️⃣ Lifestyle Adjustments
- Daily Routine (Dinacharya): [Key recommendations]
- Exercise & Movement: [Appropriate types and intensity]
- Rest & Sleep: [Recommendations]

#### 4️⃣ Herbal Support
- Key Herbs & Formulations: [2-3 main recommendations with benefits]
- Usage Suggestions: [How to take]

#### 5️⃣ Additional Therapies
- Self-care practices: [1-2 recommendations]
- Mind-body practices: [Meditation, pranayama, etc.]

#### 6️⃣ Follow-up Recommendations
- When to reassess
- What to observe

This is offered as traditional Ayurvedic wisdom and not as a replacement for medical care."""

    def generate_response(self, prompt: str, context: str = "", is_ayurvedic_mode: bool = False, consultation_info: dict = None) -> str:
        try:
            if not self.api_key:
                return "Error: GROQ API key is not set. Please check your environment variables."

            system_content = self.ayurvedic_system_prompt if is_ayurvedic_mode else "You are a helpful assistant that answers questions based on the provided context."
            
            # Add context to the user prompt
            user_content = f"Context: {context}\n\nQuestion: {prompt}"
            
            # Add minimal consultation guidance if in Ayurvedic mode
            if is_ayurvedic_mode and consultation_info:
                questions_asked = consultation_info.get('questions_asked', 0)
                stage = consultation_info.get('stage', 'initial')
                
                # Guide model to provide a prescription after sufficient questions
                if questions_asked >= 7 or stage == 'prescription':
                    user_content += "\n\nYou now have sufficient information to provide comprehensive Ayurvedic recommendations."
                else:
                    user_content += "\n\nRespond naturally to the patient's concern, and ask a thoughtful follow-up question if appropriate."
            
            payload = {
                # "model": "mixtral-8x7b-32768",  # Using Mixtral model
                 "model": "llama-3.3-70b-versatile", 
                "messages": [
                    {"role": "system", "content": system_content},
                    {"role": "user", "content": user_content}
                ],
                "temperature": 0.7
            }
            
            response = requests.post(self.api_url, headers=self.headers, json=payload)
            
            if response.status_code != 200:
                error_detail = response.json().get('error', {}).get('message', 'Unknown error')
                return f"Error from API: {error_detail} (Status code: {response.status_code})"
            
            response_data = response.json()
            
            if "choices" in response_data and len(response_data["choices"]) > 0:
                return response_data["choices"][0]["message"]["content"]
            else:
                return f"Error: Invalid response format from API. Response: {json.dumps(response_data)}"
        except requests.exceptions.RequestException as e:
            return f"Network error while calling API: {str(e)}"
        except json.JSONDecodeError as e:
            return f"Error parsing API response: {str(e)}"
        except Exception as e:
            return f"Unexpected error: {str(e)}"


class SimpleRAG:
    def __init__(self):
        self.documents = []  # List of (text, metadata) tuples
        self.chat_history = []

    def add_document(self, text: str, metadata: Dict = None):
        """Add a document to the RAG system"""
        if metadata is None:
            metadata = {}
        
        # Split text into chunks of approximately 1000 characters
        chunks = self._split_text(text)
        
        # Store chunks
        for chunk in chunks:
            self.documents.append((chunk, metadata))
    
    def _split_text(self, text: str, chunk_size: int = 1000, overlap: int = 200) -> List[str]:
        """Split text into chunks with overlap"""
        chunks = []
        start = 0
        text_length = len(text)
        
        while start < text_length:
            end = min(start + chunk_size, text_length)
            chunks.append(text[start:end])
            start += chunk_size - overlap
        
        return chunks
    
    def search(self, query: str, top_k: int = 3) -> List[Tuple[str, Dict]]:
        """Search for relevant documents given a query using simple keyword matching"""
        if not self.documents:
            return []
        
        # Tokenize query into keywords
        keywords = self._extract_keywords(query)
        
        # Score documents based on keyword matches
        scores = []
        for doc_text, metadata in self.documents:
            score = self._score_document(doc_text, keywords)
            scores.append((score, doc_text, metadata))
        
        # Sort by score (descending) and get top_k
        scores.sort(reverse=True)
        top_docs = [(doc_text, metadata) for _, doc_text, metadata in scores[:top_k]]
        
        return top_docs
    
    def _extract_keywords(self, text: str) -> List[str]:
        """Extract keywords from text"""
        # Remove punctuation and convert to lowercase
        text = re.sub(r'[^\w\s]', '', text.lower())
        
        # Split into words and remove common stop words
        words = text.split()
        stop_words = {'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'and', 'or', 'is', 'was', 'be', 'are'}
        keywords = [word for word in words if word not in stop_words and len(word) > 2]
        
        return keywords
    
    def _score_document(self, doc_text: str, keywords: List[str]) -> float:
        """Score a document based on keyword matches"""
        doc_text_lower = doc_text.lower()
        score = 0
        
        for keyword in keywords:
            # Count occurrences of the keyword in the document
            count = doc_text_lower.count(keyword)
            score += count
        
        return score
    
    def add_to_chat_history(self, question: str, answer: str):
        """Add a question-answer pair to the chat history"""
        # Use consistent dictionary format with string keys and string values
        self.chat_history.append({"role": "user", "content": question, "type": "question"})
        self.chat_history.append({"role": "assistant", "content": answer, "type": "answer"})
    
    def get_chat_history_text(self) -> str:
        """Get chat history as a formatted string"""
        if not self.chat_history:
            return ""
            
        history_text = ""
        # Process all messages in chat history
        for i, msg in enumerate(self.chat_history):
            role = msg.get("role", "")
            content = msg.get("content", "")
            
            if role == "user":
                history_text += f"Patient: {content}\n"
            elif role == "assistant":
                history_text += f"Practitioner: {content}\n\n"
                
        return history_text


class PDFChatbot:
    def __init__(self):
        # Load environment variables
        load_dotenv()
        
        # Initialize Groq API key
        self.api_key = os.getenv("GROQ_API_KEY", "")
        
        # Initialize components
        self.llm_api = LLMAPI(self.api_key)
        self.rag = SimpleRAG()
        self.loaded_pdfs = []
        
        # Initialize chat history
        self.chat_history = self.rag.chat_history
        
        # Initialize user profile
        self.user_profile = None
        
        # Initialize consultation state
        self.consultation_state = {
            "stage": "initial",
            "collected_info": {
                "symptoms": [],
                "dosha_indicators": {
                    "vata": 0,
                    "pitta": 0,
                    "kapha": 0
                },
                "agni_status": None,
                "ama_presence": None,
                "dhatu_imbalances": [],
                "mala_abnormalities": []
            },
            "questions_asked": 0,
            "questions_answered": 0,
            "confidence_score": 0,
            "categories_covered": set(),
            "categories_pending": set(),
            "prescription_given": False,
            "last_category_asked": None
        }
        
        # Ayurvedic diagnostic categories
        self.diagnostic_categories = [
            "physical_symptoms",
            "digestive_health",
            "sleep_patterns",
            "mental_emotional",
            "diet_habits",
            "daily_routine",
            "seasonal_effects",
            "constitutional_assessment"
        ]
        
        # Set pending categories
        self.consultation_state["categories_pending"] = set(self.diagnostic_categories)
        
        # Enable Ayurvedic mode by default
        self.ayurvedic_mode = True
        
        # Keywords for category detection
        self.category_keywords = {
            "physical_symptoms": ["pain", "ache", "discomfort", "symptom", "body", "physical", "issue"],
            "digestive_health": ["digestion", "appetite", "stomach", "bowel", "elimination", "gas", "acid", "agni"],
            "sleep_patterns": ["sleep", "insomnia", "rest", "dream", "night", "waking", "tired"],
            "mental_emotional": ["stress", "anxiety", "mood", "emotion", "mental", "worry", "feeling"],
            "diet_habits": ["food", "diet", "meal", "eat", "nutrition", "taste", "craving", "aversion"],
            "daily_routine": ["routine", "schedule", "habit", "daily", "morning", "evening", "activity"],
            "seasonal_effects": ["season", "weather", "climate", "winter", "summer", "monsoon", "cold", "hot"],
            "constitutional_assessment": ["constitution", "body type", "prakriti", "vikriti", "dosha", "nature"]
        }
        
        # Follow-up questions by category
        self.follow_up_questions = {
            "physical_symptoms": [
                "Where in your body do you experience discomfort or symptoms?",
                "How would you describe the nature of your physical symptoms (sharp, dull, throbbing)?",
                "When did these symptoms first appear?",
                "Do your symptoms change with time of day or season?"
            ],
            "digestive_health": [
                "How would you describe your appetite and digestion?",
                "Do you experience any discomfort after meals?",
                "How regular are your bowel movements?",
                "Do you notice any undigested food in your stool?"
            ],
            "sleep_patterns": [
                "How is the quality of your sleep?",
                "Do you have trouble falling asleep or staying asleep?",
                "What time do you usually go to bed and wake up?",
                "Do you feel refreshed upon waking?"
            ],
            "mental_emotional": [
                "How would you describe your typical emotional state?",
                "What causes you stress or anxiety?",
                "How do you respond to stressful situations?",
                "Do you notice any patterns in your mood throughout the day?"
            ],
            "diet_habits": [
                "What does your typical daily diet consist of?",
                "Do you have any specific food cravings or aversions?",
                "How regular are your meal timings?",
                "Do you prefer warm or cold foods and beverages?"
            ],
            "daily_routine": [
                "Could you describe your typical daily routine?",
                "What type of work or activity do you engage in?",
                "Do you have a regular exercise routine?",
                "How much time do you spend in nature or outdoors?"
            ],
            "seasonal_effects": [
                "How do seasonal changes affect your health?",
                "Which season do you feel most comfortable in?",
                "Do your symptoms worsen in any particular season?",
                "How do you adapt your routine seasonally?"
            ],
            "constitutional_assessment": [
                "How would you describe your body frame and build?",
                "Do you typically feel warm or cold?",
                "How would you describe your skin (dry, oily, combination)?",
                "Are you quick to learn but quick to forget, or slow but steady in learning?"
            ]
        }
        
        # Dosha-specific keywords
        self.dosha_keywords = {
            "vata": ["dry", "cold", "light", "irregular", "change", "anxiety", "insomnia", "constipation", 
                    "gas", "bloating", "crackling", "popping", "variable", "creative", "quick", "thin"],
            "pitta": ["hot", "sharp", "intense", "irritation", "anger", "rash", "inflammation", 
                     "burning", "acidic", "perfectionist", "competitive", "medium", "focused"],
            "kapha": ["heavy", "slow", "steady", "cold", "damp", "congestion", "mucus", "weight", 
                     "lethargy", "calm", "loving", "attachment", "stable", "thick", "stocky"]
        }

    def _reset_consultation_state(self):
        """Reset the consultation state to initial values"""
        self.consultation_state = {
            "stage": "initial",  # initial, assessment, diagnosis, prescription
            "collected_info": {
                "symptoms": [],
                "dosha_indicators": {
                    "vata": 0,
                    "pitta": 0,
                    "kapha": 0
                },
                "agni_status": None,
                "ama_presence": None,
                "dhatu_imbalances": [],
                "mala_abnormalities": []
            },
            "questions_asked": 0,
            "questions_answered": 0,
            "confidence_score": 0,
            "categories_covered": set(),
            "categories_pending": set(self.diagnostic_categories) if hasattr(self, 'diagnostic_categories') else set(),
            "prescription_given": False,
            "last_category_asked": None
        }

    def extract_text_from_pdf(self, pdf_path: str) -> str:
        """Extract text from a PDF file"""
        text = ""
        reader = PdfReader(pdf_path)
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text

    def load_pdf(self, pdf_path: str) -> str:
        """Load and process a PDF file"""
        if not os.path.exists(pdf_path):
            raise FileNotFoundError(f"PDF file not found: {pdf_path}")
        
        # Extract text from PDF
        text = self.extract_text_from_pdf(pdf_path)
        
        # Add document to RAG
        self.rag.add_document(text, {"source": pdf_path})
        
        self.loaded_pdfs.append(pdf_path)
        
        # If this is an Ayurvedic text, enable Ayurvedic mode
        if "ayurved" in pdf_path.lower() or "charak" in pdf_path.lower() or "sushrut" in pdf_path.lower():
            self.ayurvedic_mode = True
            print("Ayurvedic mode enabled based on the loaded text.")
            
        return f"Successfully loaded and processed PDF: {pdf_path}"

    def ask_question(self, question: str) -> str:
        """Process a question and return a response."""
        try:
            if not hasattr(self, 'consultation_state') or self.consultation_state is None:
                self.consultation_state = self._reset_consultation_state()
            
            # Get relevant context from documents
            relevant_docs = self.rag.search(question)
            context = "\n".join([doc[0] for doc in relevant_docs])
            
            # Get consultation context
            consultation_context = self._get_consultation_context()
            
            # Generate response using LLM
            response = self.llm_api.generate_response(
                prompt=question,
                context=context,
                is_ayurvedic_mode=True,
                consultation_info=consultation_context
            )
            
            # Update chat history
            self.rag.add_to_chat_history(question, response)
            
            # Safely update consultation state
            if self.consultation_state is not None:
                current_count = self.consultation_state.get('questions_asked', 0)
                self.consultation_state['questions_asked'] = current_count + 1
            
            return response
        except Exception as e:
            error_msg = f"Error processing question: {str(e)}"
            print(f"Error in ask_question: {error_msg}")  # Log the error
            return f"I apologize, but I encountered an error while processing your question. {error_msg}. Please try again or rephrase your question."

    def _get_consultation_context(self) -> dict:
        """Get the current consultation context."""
        if not hasattr(self, 'consultation_state') or self.consultation_state is None:
            self.consultation_state = self._reset_consultation_state()
        
        # Ensure all required fields exist
        if 'questions_asked' not in self.consultation_state:
            self.consultation_state['questions_asked'] = 0
        if 'stage' not in self.consultation_state:
            self.consultation_state['stage'] = 'initial'
        if 'categories_covered' not in self.consultation_state:
            self.consultation_state['categories_covered'] = set()
        
        # Include user profile if available
        if self.user_profile:
            self.consultation_state['user_profile'] = self.user_profile
        
        return self.consultation_state

    def get_loaded_pdfs(self) -> List[str]:
        """Get list of currently loaded PDFs"""
        return self.loaded_pdfs
    
    def toggle_ayurvedic_mode(self, enable: bool = True) -> str:
        """Toggle Ayurvedic consultation mode"""
        self.ayurvedic_mode = enable
        if enable:
            self.consultation_state = self._reset_consultation_state()
            return "Ayurvedic consultation mode activated. I'll now function as an Ayurvedic practitioner."
        else:
            return "Ayurvedic consultation mode deactivated. I'll now function as a standard PDF chatbot."

    def get_chat_history_text(self) -> str:
        """Get chat history as a formatted string"""
        return self.rag.get_chat_history_text()

    def set_user_profile(self, profile_data: dict):
        """Initialize chatbot with user profile data"""
        self.user_profile = profile_data
        
        # Update consultation state with dosha test results
        if "dosha_test_results" in profile_data:
            self.consultation_state["collected_info"]["dosha_indicators"] = {
                "vata": profile_data["dosha_test_results"]["vata"],
                "pitta": profile_data["dosha_test_results"]["pitta"],
                "kapha": profile_data["dosha_test_results"]["kapha"]
            }
            self.consultation_state["categories_covered"].add("constitutional_assessment")
            
        # Add user profile to context
        self.rag.add_document(
            f"User Profile: {profile_data['name']}, Age: {profile_data['age']}, Sex: {profile_data['sex']}, "
            f"Primary Dosha: {profile_data['primary_dosha']}, Secondary Dosha: {profile_data['secondary_dosha']}",
            {"source": "user_profile"}
        )

def main():
    # Initialize chatbot
    chatbot = PDFChatbot()
    
    print("Welcome to the PDF Chatbot with Groq!")
    print("Commands:")
    print("- 'load <pdf_path>' to load a PDF")
    print("- 'list' to see loaded PDFs")
    print("- 'ask <question>' to ask a question")
    print("- 'quit' to exit")
    
    while True:
        command = input("\nEnter command: ").strip()
        
        if command.lower() == 'quit':
            break
            
        elif command.lower().startswith('load '):
            pdf_path = command[5:].strip()
            try:
                result = chatbot.load_pdf(pdf_path)
                print(result)
            except Exception as e:
                print(f"Error loading PDF: {str(e)}")
                
        elif command.lower() == 'list':
            pdfs = chatbot.get_loaded_pdfs()
            if pdfs:
                print("\nLoaded PDFs:")
                for pdf in pdfs:
                    print(f"- {pdf}")
            else:
                print("No PDFs loaded yet.")
                
        elif command.lower().startswith('ask '):
            question = command[4:].strip()
            response = chatbot.ask_question(question)
            print("\nAnswer:", response)
            
        else:
            print("Invalid command. Please try again.")

if __name__ == "__main__":
    main() 