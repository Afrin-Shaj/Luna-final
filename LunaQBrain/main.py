import os
import google.generativeai as genai

# Configure the Generative AI API with your API key
#genai.configure(api_key=os.environ["API_KEY"])
genai.configure(api_key="AIzaSyDVm1sOtzscwtgnC_cR5sxbKeLNgtvSftw")

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
        "EXAMPLE FORMAT: அகர முதல எழுத்தெல்லாம் ஆதி (4 words in the first row, 3 in the second row)\n"
        "If the user selects Quran, provide relevant ayah in both English and Arabic.\n"
        "If the user selects Random, provide quotes from anywhere relevant to their input.\n"
        "For meme-related interests, ensure the quotes have a humorous tone."
    )
)

# Function to build the input message based on variables
def build_input_message(category, preference, profession, interest):
    return f"Provide {category}, I am a {profession} interested in {interest} and my preference is {preference}"

# Function to get the response from the AI model based on user inputs
def generate_quote(category, preference, profession, interest):
    # Build the input message
    user_input = build_input_message(category, preference, profession, interest)
    
    # Start a new chat session
    chat_session = model.start_chat(history=[{"role": "user", "parts": [user_input]}])
    
    # Send the message to the model
    response = chat_session.send_message(user_input)
    
    # Return the AI's response
    return response.text

# Example usage
category = "Thirukkural"
preference = "honesty"
profession = "student"
interest = "memes"

quote = generate_quote(category, preference, profession, interest)
print(quote)
