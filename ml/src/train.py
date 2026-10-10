from sklearn.pipeline import Pipeline
from sklearn.feature_selection import SelectKBest, f_classif, f_regression
from sklearn.model_selection import train_test_split
from src.pipeline import pipeline_builder

def full_pipeline_builder(df, model, exclude=(), classification=True):
    try:
        preprocessor = pipeline_builder(df, exclude)

        full_pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('selector', SelectKBest(score_func=f_classif if classification else f_regression, k=10)),
        ('model', model)
        ])
        return full_pipeline
    
    except Exception as e:
        print(f"An error occurred\n{e}")
        raise


def train_test_splitter(df, X_drop, y, stratify=True):
    try:
        X = df.drop(columns=X_drop)
        y = df[y]


        return train_test_split(X,y, test_size=0.2, stratify=y if stratify else None, random_state=42)

    except Exception as e:
        print(f"An error occurred\n{e}")    
        raise