from fastapi import FastAPI 
import google.generativeai as genai
from pydantic import BaseModel
from markupsafe import escape  # Importing MarkupSafe for escaping HTML
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize the FastAPI app
app = FastAPI()

# Get the API key from environment variables
api_key = os.getenv("GEMINI_API_KEY")

# Configure the Generative AI API with your API key
genai.configure(api_key=api_key)

# Create the model configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Define the model
model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
    system_instruction=( 
        "You are a customized quote-generating AI. "
        "The user will provide inputs such as Category (Quran, Bible, Bhagavad Gita, Thirukkural, Random), "
        "Profession (Teacher, Doctor, Student), Interest (sports, arts, memes), and Preference (motivational, honesty, self-esteem), "
        "and you will provide quotes relevant to these inputs.\n\n"
        "If the user selects Thirukkural, include both Tamil and English versions, with the Tamil Kural in this format:\n"
        "EXAMPLE FORMAT: அகர முதல எழுத்தெல்லாம் ஆதி\n"
        "பகவன் முதற்றே உலகு.\n\n"
        "If the user selects Quran, provide relevant ayah in both English and Arabic.\n"
        "If the user selects Random, provide quotes from anywhere relevant to their input.\n"
        "For meme-related interests, ensure the quotes have a humorous tone."
    )
)

# Define the Pydantic model for the request body
class QuoteRequest(BaseModel):
    category: str
    preference: str
    profession: str
    interest: str

# Function to build the input message
def build_input_message(category, preference, profession, interest):
    return f"Provide {category}, I am a {profession} interested in {interest} and my preference is {preference}"

# Function to get the AI-generated quote
def generate_quote(category, preference, profession, interest):
    try:
        # Build the input message
        user_input = build_input_message(category, preference, profession, interest)
        
        # Start a new chat session
        chat_session = model.start_chat(history=[{"role": "user", "parts": [user_input]}])
        
        # Send the message to the model
        response = chat_session.send_message(user_input)
        
        # Return the AI's response
        return response.text
    except Exception as e:
        print(f"Error: {e}")
        return f"An error occurred while generating the quote: {e}"

# Define the API endpoint
@app.post("/generate-quote")
def get_quote(request: QuoteRequest):
    # Get the quote based on user inputs
    quote = generate_quote(
        request.category, 
        request.preference, 
        request.profession, 
        request.interest
    )
    
    if request.category.lower() == "quran":
        parts = quote.split("\n\n")
        english_quote = escape(parts[0].replace("**English:**", "").strip())  # Escape HTML
        arabic_quote = escape(parts[1].replace("**Arabic:**", "").strip())  # Escape HTML
        return {
            "category": "Quran",
            "quote": {
                "Arabic": english_quote,
                "English": arabic_quote
            }
        }

    elif request.category.lower() == "thirukkural":
        parts = quote.split("\n")
        # Split the original Kural into two lines manually
        # original_text = "அகர முதல எழுத்தெல்லாம் ஆதி\nபகவன் முதற்றே உலகு."
        
        # Split the transliteration into two lines as well
        # transliteration = "Agaram mudhala ezhuththellam aadhi\nBhagavan mudhatre ulagu."
        
        # Escape the rest of the text as usual
        english_translation = escape(parts[2].replace("**English Translation:**", "").strip())  # Escape HTML
        explanation = escape(parts[3].replace("**Explanation:**", "").strip())  # Escape HTML
        
        # Standardized format for Thirukkural
        return {
            "category": "Thirukkural",
            "quote": {
                "Original": original_text,  # Two-line format for the original text
                "Transliteration": transliteration,  # Two-line format for the transliteration
                "Translation": english_translation,
                "Explanation": explanation
            }
        }

    elif request.category.lower() == "bhagavad gita":
        parts = quote.split("\n\n")
        original_text = escape(parts[0].strip())  # Escape HTML
        transliteration = escape(parts[1].replace("**Transliteration:**", "").strip())  # Escape HTML
        english_translation = escape(parts[2].replace("**Translation:**", "").strip())  # Escape HTML
        explanation = escape(parts[3].replace("**Explanation:**", "").strip())  # Escape HTML
        return {
            "category": "Bhagavad Gita",
            "quote": {
                "Original": original_text,
                "Transliteration": transliteration,
                "Translation": english_translation,
                "Explanation": explanation
            }
        }

    elif request.category.lower() == "bible":
        parts = quote.split("\n\n")
        original_text = escape(parts[0].strip())  # Escape HTML
        english_translation = escape(parts[1].replace("**Translation:**", "").strip())  # Escape HTML
        explanation = escape(parts[2].replace("**Explanation:**", "").strip())  # Escape HTML
        return {
            "category": "Bible",
            "quote": {
                "Original": original_text,
                "Translation": english_translation,
                "Explanation": explanation
            }
        }
    
    else:
        # Handle Random or meme-related interests with a simple format
        return {"quote": escape(quote.strip())}  # Escape HTML for random quotes
