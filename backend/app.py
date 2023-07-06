from flask_cors import CORS
from flask import Flask, request
import pandas as pd

app = Flask(__name__)
CORS(app)

def ethnicity_recommendation(employee_df):
    total_employees = len(employee_df)
    ethnicity_counts = employee_df['Ethnicity'].value_counts()
    ethnicity_diversity_ratio = ethnicity_counts / total_employees

    # Step 3: Define Recommendation Criteria
    # Set a threshold ratio for ethnicity diversity
    threshold_ratio = 0.2

    # Step 4: Candidate Pool (Assuming an external database)
    candidate_data = employee_df

    # Step 5: Candidate Filtering

    # Filter candidate pool for ethnicities with lower representation
    underrepresented_ethnicities = ethnicity_diversity_ratio[ethnicity_diversity_ratio < threshold_ratio].index
    filtered_candidates = candidate_data[candidate_data['Ethnicity'].isin(underrepresented_ethnicities)]

    # Step 6: Candidate Ranking
    # You can define a ranking mechanism based on qualifications, experience, etc.
    filtered_candidates = filtered_candidates.sort_values(by='Age', ascending=True)

    # Step 8: Implement Recommendation System
    # Select the top 10 recommended candidates
    top_candidates = filtered_candidates

    return top_candidates


def gender_recommendation(employee_df):
    # Gender wise
    # Step 3: Calculate Gender Diversity Ratio
    total_employees = len(employee_df)
    female_employees = len(employee_df[employee_df['gender_encoded'] == 1])
    gender_diversity_ratio = 0.338
    

    # Step 4: Define Recommendation Criteria
    # Set a threshold ratio for gender diversity
    threshold_ratio = 0.4

    # Step 5: Candidate Pool (Assuming an external database)
    candidate_data = employee_df

    # Step 6: Candidate Filtering
    if gender_diversity_ratio < threshold_ratio:
        # Filter candidate pool for female candidates
        filtered_candidates = candidate_data[candidate_data['gender_encoded'] == 1]
    else:
        # Filter candidate pool for male candidates
        filtered_candidates = candidate_data[candidate_data['gender_encoded'] == 0]

    # Step 7: Candidate Ranking
    # You can define a ranking mechanism based on qualifications, experience, etc.
    filtered_candidates = filtered_candidates.sort_values(by='Age', ascending=True)

    # Step 8: Implement Recommendation System
    # Select the top 10 recommended candidates
    top_candidates = filtered_candidates.head(10)

    return top_candidates


# routing
@app.route("/", methods=["GET"])
def home():
    return "server started..."


@app.route("/recommendations", methods=["POST"])
def recommendation():
    employee_df = pd.read_csv("recommendation/employee_data.csv")
    ethnicity_recommendations = ethnicity_recommendation(employee_df)
    print("EthnicityRecommendations")
    print(ethnicity_recommendations)
    gender_recommendations = gender_recommendation(ethnicity_recommendations)
    print("GenderRecommendations")
    print(gender_recommendations)
    return {"Success": "yes"}
    

if __name__ == "__main__":
    app.run(debug=True)