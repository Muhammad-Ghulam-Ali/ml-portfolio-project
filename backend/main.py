import uvicorn
import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)


# Base Model
class ReturnInputs(BaseModel):
    cart_value_usd: float
    past_return_rate: float
    size_bracketing_flag: int
    delivery_days_taken: int
    discount_pct_applied: int
    product_category: str
    fit_review_sentiment: str
    newsletter_subscriber: int
    browser_used: str
    checkout_device: str
    packaging_color: str
    loyalty_card_color: str

# Classification Model
model = joblib.load("../backend/models/return_model.pkl")

# APIs

# Server wakeup api
@app.get('/server/wakeup')
def wakeup():
    try:
        return ("Server woke up.")
    except Exception as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="An error occurred."
        )

# Predict post api
@app.post('/predict/return')
def predictor(input: ReturnInputs):
    try:
        row = pd.DataFrame([input.model_dump()])
        prediction = model.predict(row)
        proba = model.predict_proba(row)[0]
        return {
            "prediction": int(prediction[0]),
            "probability_class_0": float(proba[0]),
            "probability_class_1": float(proba[1]),
        }

    except Exception as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred."
        )   


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
