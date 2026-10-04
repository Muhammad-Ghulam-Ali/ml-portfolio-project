import pandas as pd

# Load dataset
def data_loader(path):
    try:
        df = pd.read_csv(path)
        return df
    except FileNotFoundError:
        print(f"File not found: {path}")
        raise