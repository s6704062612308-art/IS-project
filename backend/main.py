from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import json
import numpy as np
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# โหลดโมเดล
gaming_ensemble = joblib.load("../models/gaming_ensemble.pkl")
gaming_nn       = joblib.load("../models/gaming_nn.pkl")
gaming_scaler   = joblib.load("../models/gaming_scaler.pkl")
gaming_imputer  = joblib.load("../models/gaming_imputer.pkl")
gaming_le_dict  = joblib.load("../models/gaming_le_dict.pkl")

salary_ensemble = joblib.load("../models/salary_ensemble.pkl")
salary_nn       = joblib.load("../models/salary_nn.pkl")
salary_scaler   = joblib.load("../models/salary_scaler.pkl")
salary_imputer  = joblib.load("../models/salary_imputer.pkl")
salary_le_dict  = joblib.load("../models/salary_le_dict.pkl")

with open("../models/gaming_y_stats.json") as f:
    gaming_y_stats = json.load(f)

with open("../models/salary_y_stats.json") as f:
    salary_y_stats = json.load(f)

class GamingInput(BaseModel):
    genre: str
    rank: str
    voice: str
    platform: str
    season_pass: str
    active_status: str
    purchases: float
    achievement: float
    matches: float
    win_rate: float
    friends: float
    streaming: float
    latency: float
    dlc: float

class SalaryInput(BaseModel):
    major: str
    university: str
    job_role: str
    company_size: str
    province: str
    gpa: float
    internship: float
    certifications: float
    toeic: float
    projects: float

def prepare_gaming(data: GamingInput):
    le = gaming_le_dict
    feature_cols = [
        "favorite_game_genre_enc", "rank_tier_enc", "voice_chat_usage_enc",
        "platform_used_enc", "season_pass_enc", "active_status_enc",
        "in_game_purchases", "achievement_points", "matches_played",
        "win_rate", "friends_count", "streaming_hours", "latency_ms", "dlc_owned"
    ]
    X = pd.DataFrame([[
        le["favorite_game_genre"].transform([data.genre])[0],
        le["rank_tier"].transform([data.rank])[0],
        le["voice_chat_usage"].transform([data.voice])[0],
        le["platform_used"].transform([data.platform])[0],
        le["season_pass"].transform([data.season_pass])[0],
        le["active_status"].transform([data.active_status])[0],
        data.purchases, data.achievement, data.matches, data.win_rate,
        data.friends, data.streaming, data.latency, data.dlc
    ]], columns=feature_cols)
    X_imp = gaming_imputer.transform(X)
    X_sc  = gaming_scaler.transform(X_imp)
    return X_sc

def prepare_salary(data: SalaryInput):
    le = salary_le_dict
    feature_cols = [
        "major_enc", "university_enc", "job_role_enc",
        "company_size_enc", "province_enc",
        "gpa", "internship_count", "certifications",
        "english_score_toeic", "projects_count"
    ]
    X = pd.DataFrame([[
        le["major"].transform([data.major])[0],
        le["university"].transform([data.university])[0],
        le["job_role"].transform([data.job_role])[0],
        le["company_size"].transform([data.company_size])[0],
        le["province"].transform([data.province])[0],
        data.gpa, data.internship, data.certifications,
        data.toeic, data.projects
    ]], columns=feature_cols)
    X_imp = salary_imputer.transform(X)
    X_sc  = salary_scaler.transform(X_imp)
    return X_sc

@app.get("/")
def root():
    return {"message": "ML Project API is running"}

@app.post("/predict/gaming/ensemble")
def predict_gaming_ensemble(data: GamingInput):
    X_sc   = prepare_gaming(data)
    result = float(gaming_ensemble.predict(X_sc)[0])
    result = max(result, 0)
    return {"prediction": round(result, 2), "unit": "hours/week"}

@app.post("/predict/gaming/nn")
def predict_gaming_nn(data: GamingInput):
    X_sc      = prepare_gaming(data)
    pred_norm = float(gaming_nn.predict(X_sc)[0])
    result    = pred_norm * gaming_y_stats["std"] + gaming_y_stats["mean"]
    result    = max(result, 0)
    return {"prediction": round(result, 2), "unit": "hours/week"}

@app.post("/predict/salary/ensemble")
def predict_salary_ensemble(data: SalaryInput):
    X_sc   = prepare_salary(data)
    result = float(salary_ensemble.predict(X_sc)[0])
    result = max(result, 0)
    return {"prediction": round(result), "unit": "THB"}

@app.post("/predict/salary/nn")
def predict_salary_nn(data: SalaryInput):
    X_sc      = prepare_salary(data)
    pred_norm = float(salary_nn.predict(X_sc)[0])
    result    = pred_norm * salary_y_stats["std"] + salary_y_stats["mean"]
    result    = max(result, 0)
    return {"prediction": round(result), "unit": "THB"}