import streamlit as st
import os
import tempfile
from chatbot import PDFChatbot, SimpleRAG, LLMAPI

st.set_page_config(page_title="Ayurvedic PDF Chatbot", page_icon="🌿", layout="wide")

# Initialize session state variables
if "chatbot" not in st.session_state:
    st.session_state.chatbot = PDFChatbot()
    # Initialize in Ayurvedic mode by default
    st.session_state.chatbot.ayurvedic_mode = True
    # Ensure consultation_state is initialized
    st.session_state.chatbot._reset_consultation_state()
    # Load default Charak Samhita PDF
    default_pdf = os.path.join("data", "Charak Samhita our own.pdf")
    if os.path.exists(default_pdf):
        try:
            st.session_state.chatbot.load_pdf(default_pdf)
        except Exception as e:
            st.error(f"Error loading default Charak Samhita: {str(e)}")
elif not hasattr(st.session_state.chatbot, 'consultation_state') or st.session_state.chatbot.consultation_state is None:
    # Ensure consultation_state is initialized for existing chatbot
    st.session_state.chatbot.ayurvedic_mode = True
    st.session_state.chatbot._reset_consultation_state()
    
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []
if "ayurvedic_mode" not in st.session_state:
    st.session_state.ayurvedic_mode = True
if "display_confidence" not in st.session_state:
    st.session_state.display_confidence = True

# Function to add messages to session chat history
def add_message(role, content):
    st.session_state.chat_history.append({"role": role, "content": content})

# Title and description
st.title("🌿 Ayurvedic PDF Chatbot")
st.markdown("""
This chatbot provides Ayurvedic consultations based on traditional Ayurvedic principles.
Upload Ayurvedic PDFs like Charak Samhita or other traditional texts for enhanced knowledge base!
""")

# Create a sidebar for PDF upload and settings
with st.sidebar:
    st.header("Settings & Upload")
    
    # Ensure Ayurvedic Mode is always on
    st.session_state.ayurvedic_mode = True
    st.session_state.chatbot.ayurvedic_mode = True
    st.success("Ayurvedic Consultation Mode is active!")
    
    # Confidence Score Display Toggle
    display_confidence = st.toggle("Display Confidence Score", value=st.session_state.display_confidence)
    if display_confidence != st.session_state.display_confidence:
        st.session_state.display_confidence = display_confidence
    
    # Display info about Ayurvedic mode
    st.info("""
    **Ayurvedic Consultation Mode is active!**
    
    The chatbot will:
    - Ask follow-up questions about your health
    - Analyze symptoms through doshas, agni, and ama
    - Provide an Ayurvedic diagnosis
    - Give structured treatment recommendations
    
    Start by describing your main health concern.
    """)
    
    # Display current consultation stats
    if st.session_state.display_confidence:
        st.divider()
        st.subheader("Consultation Progress")
        
        # Ensure consultation_state is initialized
        if not hasattr(st.session_state.chatbot, 'consultation_state') or st.session_state.chatbot.consultation_state is None:
            st.session_state.chatbot._reset_consultation_state()
        
        # Get consultation state
        consult_state = st.session_state.chatbot.consultation_state
        # Safely get confidence score with a default of 0 if consult_state is None
        confidence = 0
        if consult_state is not None:
            confidence = consult_state.get("confidence_score", 0)
        
        # Progress bar for confidence
        st.progress(confidence/100, text=f"Assessment Progress: {confidence}%")
        
        # Stage indicator
        stage = "initial"
        if consult_state is not None:
            stage = consult_state.get("stage", "initial")
        stage_index = {"initial": 0, "assessment": 1, "diagnosis": 2, "prescription": 3}.get(stage, 0)
        stages = ["Initial", "Assessment", "Diagnosis", "Prescription"]
        st.text(f"Current Stage: {stages[stage_index]}")
        
        # Show categories covered
        if consult_state is not None and "categories_covered" in consult_state and consult_state["categories_covered"]:
            st.markdown("**Topics Covered:**")
            for cat in consult_state["categories_covered"]:
                st.markdown(f"✅ {cat.replace('_', ' ').title()}")
        
        # Questions count
        questions_asked = 0
        if consult_state is not None and "questions_asked" in consult_state:
            questions_asked = consult_state["questions_asked"]
        st.text(f"Questions Asked: {questions_asked}/8")
    
    st.divider()
    
    # PDF Upload
    st.header("Ayurvedic Texts")
    
    # Show pre-loaded Charak Samhita
    if st.session_state.chatbot.loaded_pdfs:
        st.success("✅ Charak Samhita is pre-loaded and ready for consultation!")
        st.markdown("**Currently Loaded Texts:**")
        for pdf in st.session_state.chatbot.loaded_pdfs:
            st.write(f"- 📄 {os.path.basename(pdf)}")
    
    # Optional additional PDF upload
    st.markdown("**Optional: Upload Additional Texts**")
    uploaded_files = st.file_uploader("Choose additional PDF files", type="pdf", accept_multiple_files=True)
    
    if uploaded_files:
        for uploaded_file in uploaded_files:
            # Check if this file has already been processed
            file_already_loaded = False
            for loaded_pdf in st.session_state.chatbot.loaded_pdfs:
                if uploaded_file.name in loaded_pdf:
                    file_already_loaded = True
                    break
            
            if not file_already_loaded:
                with st.spinner(f"Processing {uploaded_file.name}..."):
                    # Create a temporary file
                    temp_dir = tempfile.mkdtemp()
                    temp_path = os.path.join(temp_dir, uploaded_file.name)
                    
                    # Save the uploaded file to the temporary path
                    with open(temp_path, "wb") as f:
                        f.write(uploaded_file.getbuffer())
                    
                    # Load the PDF
                    try:
                        result = st.session_state.chatbot.load_pdf(temp_path)
                        st.success(f"Successfully processed {uploaded_file.name}")
                    except Exception as e:
                        st.error(f"Error processing {uploaded_file.name}: {str(e)}")
    
    st.divider()
    
    # Consultation information
    st.header("About Ayurvedic Consultation")
    st.markdown("""
    **Ayurvedic Assessment Process:**
    
    1. **Initial Consultation**: Share your primary health concern
    2. **Dosha Assessment**: The practitioner assesses Vata, Pitta, and Kapha imbalances
    3. **Deeper Analysis**: Evaluation of agni (digestive fire) and ama (toxins)
    4. **Diagnosis**: Determination of the root cause
    5. **Prescription**: Personalized treatment plan
    
    The chatbot will guide you through this process with appropriate questions.
    """)

# Main chat interface with two columns
col1, col2 = st.columns([7, 3])

with col1:
    st.header("Ayurvedic Consultation")
    
    # Display session chat history
    for message in st.session_state.chat_history:
        role = message["role"]
        content = message["content"]
        if role == "user":
            st.chat_message("user").write(content)
        else:
            with st.chat_message("assistant", avatar="🌿"):
                st.write(content)
    
    # Chat input
    if not st.session_state.chatbot.loaded_pdfs:
        st.warning("⚠️ No texts loaded. Please upload at least one Ayurvedic text to enhance the consultation experience.")
    
    placeholder = "Describe your health concern..."
    if user_question := st.chat_input(placeholder):
        # Add user message to session chat history
        add_message("user", user_question)
        
        # Display user message
        st.chat_message("user").write(user_question)
        
        # Generate response
        with st.spinner("Analyzing according to Ayurvedic principles..."):
            try:
                # Ensure consultation_state is initialized
                if not hasattr(st.session_state.chatbot, 'consultation_state') or st.session_state.chatbot.consultation_state is None:
                    st.session_state.chatbot._reset_consultation_state()
                
                response = st.session_state.chatbot.ask_question(user_question)
            except Exception as e:
                response = f"Error: {str(e)}. Please try again or reload the application."
        
        # Display assistant response
        with st.chat_message("assistant", avatar="🌿"):
            st.write(response)
        
        # Add assistant response to session chat history
        add_message("assistant", response)

with col2:
    # Display Ayurvedic Info Panel
    st.header("Ayurvedic References")
    
    # Doshas explanation
    with st.expander("🔄 Doshas (Body Energies)", expanded=False):
        st.markdown("""
        **Vata** (Air & Space): Controls movement, breathing, and nervous system. When imbalanced: anxiety, dry skin, constipation.
        
        **Pitta** (Fire & Water): Governs digestion, metabolism, and energy production. When imbalanced: inflammation, acid reflux, irritability.
        
        **Kapha** (Earth & Water): Maintains structure, lubrication, and stability. When imbalanced: congestion, weight gain, lethargy.
        """)
        
    # Agni explanation
    with st.expander("🔥 Agni (Digestive Fire)", expanded=False):
        st.markdown("""
        **Strong Agni**: Good digestion, appropriate hunger, proper elimination
        
        **Weak Agni**: Poor digestion, gas, bloating, incomplete elimination
        
        **Variable Agni**: Irregular hunger, alternating constipation and loose stools
        
        **Sharp Agni**: Excessive hunger, acid reflux, quick digestion
        """)
        
    # Ama explanation
    with st.expander("⚠️ Ama (Toxins)", expanded=False):
        st.markdown("""
        **Signs of Ama**:
        - Coating on tongue
        - Bad breath
        - Heaviness after eating
        - Brain fog
        - Lethargy
        - Joint stiffness
        - Irregular elimination
        """)
        
    # Seasonal guidance
    with st.expander("🌦️ Seasonal Influences", expanded=False):
        st.markdown("""
        **Winter**: Vata season - focus on warming, grounding foods
        
        **Spring**: Kapha season - focus on light, warm, drying foods
        
        **Summer**: Pitta season - focus on cooling, sweet, bitter foods
        
        **Fall**: Vata/Pitta transition - focus on stable routine
        """)
        
    # Disclaimer
    st.info("⚠️ **Disclaimer**: This chatbot provides general Ayurvedic wellness guidance based on traditional texts. It is not a substitute for professional medical advice, diagnosis, or treatment.")

# Add reset button
if st.button("Reset Consultation"):
    # Clear chat history
    st.session_state.chat_history = []
    # Reset consultation state
    st.session_state.chatbot._reset_consultation_state()
    st.experimental_rerun()

# Footer
st.markdown("---")
st.markdown("🌿 Powered by Ayurvedic Wisdom • RAG Implementation • Charak Samhita Analysis") 