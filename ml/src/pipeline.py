from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer

def pipeline_builder(df, exclude=()):
    try:
        num_cols = df.select_dtypes(include=['int', 'float']).columns.tolist()
        num_cols = [c for c in num_cols if c not in exclude]
        
        cat_cols = df.select_dtypes(include=['str','object']).columns.tolist()

        num_transformer = Pipeline(steps=[
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler())
        ])

        cat_transformer = Pipeline(steps=[
            ('imputer', SimpleImputer(strategy='most_frequent')),
            ('onehot', OneHotEncoder())
        ])

        preprocessor = ColumnTransformer(transformers=[
            ('num_transformer', num_transformer, num_cols),
            ('cat_transformer', cat_transformer, cat_cols)
            ],
            remainder='passthrough'
        )

        return preprocessor

    except Exception as e:
        print(f"An error occurred:\n{e}")  
        raise  