from sklearn.pipeline import Pipeline
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.model_selection import train_test_split
from src.pipeline import pipeline_builder

def full_pipeline_builder(df, model):
    try:
        preprocessor = pipeline_builder(df)

        full_pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('selector', SelectKBest(score_func=f_classif, k=10)),
        ('model', model)
    ])
        return full_pipeline
    
    except Exception as e:
        print(f"An error occurred\n{e}")


def train_test_splitter(df):
    try:
        X = df.drop(columns='return_risk_label')
        y = df['return_risk_label']

        return train_test_split(X,y, test_size=0.2, stratify=y, random_state=42)

    except Exception as e:
        print(f"An error occurred\n{e}")    