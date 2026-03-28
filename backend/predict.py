import sys
import json
import joblib
import numpy as np
import pandas as pd

args = json.loads(sys.argv[1])
dataset  = args['dataset']
model_type = args['model_type']
data     = args['data']

if dataset == 'gaming':
    ensemble = joblib.load('../models/gaming_ensemble.pkl')
    nn       = joblib.load('../models/gaming_nn.pkl')
    scaler   = joblib.load('../models/gaming_scaler.pkl')
    imputer  = joblib.load('../models/gaming_imputer.pkl')
    le_dict  = joblib.load('../models/gaming_le_dict.pkl')
    with open('../models/gaming_y_stats.json') as f:
        import json as j
        y_stats = j.load(f)

    feature_cols = [
        'favorite_game_genre_enc', 'rank_tier_enc', 'voice_chat_usage_enc',
        'platform_used_enc', 'season_pass_enc', 'active_status_enc',
        'in_game_purchases', 'achievement_points', 'matches_played',
        'win_rate', 'friends_count', 'streaming_hours', 'latency_ms', 'dlc_owned'
    ]

    X = pd.DataFrame([[
        le_dict['favorite_game_genre'].transform([data['genre']])[0],
        le_dict['rank_tier'].transform([data['rank']])[0],
        le_dict['voice_chat_usage'].transform([data['voice']])[0],
        le_dict['platform_used'].transform([data['platform']])[0],
        le_dict['season_pass'].transform([data['season_pass']])[0],
        le_dict['active_status'].transform([data['active_status']])[0],
        data['purchases'], data['achievement'], data['matches'],
        data['win_rate'], data['friends'], data['streaming'],
        data['latency'], data['dlc']
    ]], columns=feature_cols)

    X_imp = imputer.transform(X)
    X_sc  = scaler.transform(X_imp)

    if model_type == 'ensemble':
        result = float(ensemble.predict(X_sc)[0])
    else:
        pred_norm = float(nn.predict(X_sc)[0])
        result = pred_norm * y_stats['std'] + y_stats['mean']

    result = max(result, 0)
    print(json.dumps({'prediction': round(result, 2), 'unit': 'hours/week'}))

else:
    ensemble = joblib.load('../models/salary_ensemble.pkl')
    nn       = joblib.load('../models/salary_nn.pkl')
    scaler   = joblib.load('../models/salary_scaler.pkl')
    imputer  = joblib.load('../models/salary_imputer.pkl')
    le_dict  = joblib.load('../models/salary_le_dict.pkl')
    with open('../models/salary_y_stats.json') as f:
        import json as j
        y_stats = j.load(f)

    feature_cols = [
        'major_enc', 'university_enc', 'job_role_enc',
        'company_size_enc', 'province_enc',
        'gpa', 'internship_count', 'certifications',
        'english_score_toeic', 'projects_count'
    ]

    X = pd.DataFrame([[
        le_dict['major'].transform([data['major']])[0],
        le_dict['university'].transform([data['university']])[0],
        le_dict['job_role'].transform([data['job_role']])[0],
        le_dict['company_size'].transform([data['company_size']])[0],
        le_dict['province'].transform([data['province']])[0],
        data['gpa'], data['internship'], data['certifications'],
        data['toeic'], data['projects']
    ]], columns=feature_cols)

    X_imp = imputer.transform(X)
    X_sc  = scaler.transform(X_imp)

    if model_type == 'ensemble':
        result = float(ensemble.predict(X_sc)[0])
    else:
        pred_norm = float(nn.predict(X_sc)[0])
        result = pred_norm * y_stats['std'] + y_stats['mean']

    result = max(result, 0)
    print(json.dumps({'prediction': round(result), 'unit': 'THB'}))