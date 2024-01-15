from flask_cors import CORS
from flask import Flask, request
import pandas as pd
import docx2txt
import fitz
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from langchain.agents import create_csv_agent
from langchain.llms import OpenAI


app = Flask(__name__)
CORS(app)

def ethnicity_recommendation(employee_df, candidates):
    total_employees = len(employee_df)
    ethnicity_counts = employee_df['Ethnicity'].value_counts()
    ethnicity_diversity_ratio = ethnicity_counts / total_employees

    # Step 3: Define Recommendation Criteria
    # Set a threshold ratio for ethnicity diversity
    threshold_ratio = 0.2

    # Step 4: Candidate Pool (Assuming an external database)
    candidate_data = pd.DataFrame(candidates)

    # Step 5: Candidate Filtering

    # Filter candidate pool for ethnicities with lower representation
    underrepresented_ethnicities = ethnicity_diversity_ratio[ethnicity_diversity_ratio < threshold_ratio].index
    filtered_candidates = candidate_data[candidate_data['ethnicity'].isin(underrepresented_ethnicities)]

    # Step 6: Candidate Ranking
    # You can define a ranking mechanism based on qualifications, experience, etc.
    filtered_candidates = filtered_candidates.sort_values(by='ats_score', ascending=False)

    # Step 8: Implement Recommendation System
    # Select the top 10 recommended candidates
    top_candidates = filtered_candidates

    return top_candidates


def gender_recommendation(employee_df, candidates):
    # Gender wise
    # Step 3: Calculate Gender Diversity Ratio
    total_employees = len(employee_df)
    female_employees = len(employee_df[employee_df['Gender'] == 'Female'])
    gender_diversity_ratio = 0.338
    

    # Step 4: Define Recommendation Criteria
    # Set a threshold ratio for gender diversity
    threshold_ratio = 0.4

    # Step 5: Candidate Pool (Assuming an external database)
    candidate_data = candidates

    # Step 6: Candidate Filtering
    if gender_diversity_ratio < threshold_ratio:
        # Filter candidate pool for female candidates
        filtered_candidates = candidate_data[candidate_data['gender'] == 'Female']
    else:
        # Filter candidate pool for male candidates
        filtered_candidates = candidate_data[candidate_data['gender'] == 'Male']

    # Step 7: Candidate Ranking
    # You can define a ranking mechanism based on qualifications, experience, etc.
    filtered_candidates = filtered_candidates.sort_values(by='ats_score', ascending=False)

    # Step 8: Implement Recommendation System
    # Select the top 10 recommended candidates
    top_candidates = filtered_candidates.head(10)

    return top_candidates


# routing
@app.route("/", methods=["GET"])
def home():
    return "server started..."


@app.route("/get-recommendations", methods=["POST"])
def recommendation():
    print(request.get_json())
    employee_df = pd.read_csv("recommendation/employee_data.csv")
    ethnicity_recommendations = ethnicity_recommendation(employee_df, request.get_json())
    gender_recommendations = gender_recommendation(employee_df,ethnicity_recommendations)
    print(gender_recommendations)
    return {"recommendations": gender_recommendations.to_dict(orient='records')}

@app.route("/ats", methods=["POST"])
def ats():
    # Check if a file is included in the request
    if 'file' not in request.files:
        return "No file found", 400
    
    file = request.files['file']
    
    # Check if the file has a valid filename
    if file.filename == '':
        return "Invalid file name", 400
    
    # Check if the file is a PDF
    if file.filename.endswith('.pdf'):
        # Save the file to the backend
        file.save('uploads/' + file.filename)
        
    doc = fitz.open('uploads/' + file.filename)
    resume = ""
    for page in doc:
        resume +=page.get_text()

    job_description = request.form['jobDescription']

    content = [job_description, resume]
    cv = CountVectorizer()
    matrix = cv.fit_transform(content)

    similarity_matrix = cosine_similarity(matrix)

    score = int(similarity_matrix[1][0] * 100)

    return {"score": score}


@app.route("/qna", methods=["POST"])
def qna():
    prompt = request.form['query']
    # return request
    agent = create_csv_agent(OpenAI(temperature=0, model="gpt-3.5-turbo-instruct", openai_api_key="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"),'./employee_data.csv',verbose=True)
    res = agent.run(prompt)
    return {"res":res}

    

if __name__ == "__main__":
    app.run(debug=True)