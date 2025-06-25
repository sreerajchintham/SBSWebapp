#model_logic.py
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_selection import SequentialFeatureSelector
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC

def encode_categorical_columns(df):
    encoders = {}
    encoded_df = df.copy()
    for col in df.columns:
        if df[col].dtype == 'object':
            le = LabelEncoder()
            encoded_df[col] = le.fit_transform(df[col].astype(str).str.strip())
            encoders[col] = le
    return encoded_df, encoders

def get_estimator(name):
    if name == "KNN":
        return KNeighborsClassifier(n_neighbors=5)
    elif name == "Logistic Regression":
        return LogisticRegression(max_iter=1000)
    elif name == "Decision Tree":
        return DecisionTreeClassifier()
    elif name == "Random Forest":
        return RandomForestClassifier()
    elif name == "Naive Bayes":
        return GaussianNB()
    elif name == "SVM":
        return SVC()
    else:
        raise ValueError("Unsupported model")

def run_sbs(df, target_col, model_name, k):
    encoded_df, encoders = encode_categorical_columns(df)
    feature_cols = [col for col in encoded_df.columns if col != target_col]

    X = encoded_df[feature_cols].values
    y = encoded_df[target_col].values

    model = get_estimator(model_name)
    sbs = SequentialFeatureSelector(model, n_features_to_select=k, direction='backward')
    sbs.fit(X, y)

    selected_mask = sbs.get_support()
    selected_features = [feature_cols[i] for i in np.where(selected_mask)[0]]

    reduced_df = df[selected_features + [target_col]]
    return reduced_df, selected_features
