🌍 EcoAware — Environmental Analytics Platform

Live Demo: https://eco-aware-xxxx.vercel.app (update with your actual Vercel URL) Backend API: Deployed on Render

EcoAware is a full-stack environmental awareness and analytics platform that combines interactive data visualization, an LLM-grounded AI assistant, and machine learning-based forecasting to help users explore and understand global environmental trends — climate change, air quality, water withdrawal, and deforestation.

✨ Features
📊 Interactive Analytics Dashboard
Filterable, searchable dashboard covering four environmental categories: Climate (CO₂ emissions), Air Quality (PM2.5), Water Withdrawal, and Forest Change
Bar, Line, and Pie chart views (Recharts) with automatic chart-type switching based on context (e.g. single-country selection auto-switches to trend view)
Country and year-based filtering across all datasets
Color-coded severity thresholds (e.g. WHO air quality limits, global CO₂ targets) for at-a-glance interpretation
🤖 EcoBot — AI Data Analyst (Gemini API)

Rather than a generic chatbot, EcoBot is grounded in the dashboard's own live, filtered data:

Explain This Graph — generates a plain-language summary of whatever data is currently on screen
Follow-up Q&A — users can ask further questions; responses are split into a "from the data" section (only claims supported by the visible dataset) and an optional, clearly labeled "general knowledge" section — preventing the AI from presenting unverified claims as fact
Compare Mode — structured two-country comparison with computed differences and percentage change, narrated by the LLM using the same grounded-prompt pipeline
🔮 ML-Based Forecasting
Per-country Linear Regression models (scikit-learn) trained on historical time-series data (OWID datasets) for CO₂, PM2.5, water withdrawal, and forest change
Predictions for upcoming years rendered as a dashed forecast line extending each historical trend chart
Design note: an initial Random Forest approach was tested first but discarded after diagnosing that tree-based models cannot extrapolate beyond their training range (they repeat memorized values instead of projecting a trend) — Linear Regression was adopted specifically because it generalizes past the observed data range
🔐 Authentication & User Features
JWT-based registration/login system
Pledge tracking system for users to commit to environmental actions
Quiz section to test environmental knowledge
🛠️ Tech Stack

Frontend

React (Vite)
Recharts (data visualization)
Custom CSS

Backend

Node.js / Express
MongoDB (data persistence)
JWT (authentication)

AI / ML

Google Gemini API (LLM-grounded chatbot responses)
Python, scikit-learn, pandas, NumPy (forecasting models)
Jupyter Notebook (model training/experimentation)

Data Sources

Our World in Data (OWID) — CO₂ emissions, air quality, water withdrawal, and forest change datasets

Deployment

Frontend: Vercel
Backend: Render


Engineering Highlights
Grounded AI, not just an API call: EcoBot's responses are constructed by injecting the exact filtered dataset currently shown on screen into the LLM prompt, so answers stay traceable to real numbers rather than the model's general training data — with explicit prompt instructions preventing the model from blending unverified claims into data-backed statements.
Model selection based on diagnosed failure, not first attempt: Random Forest was initially used for forecasting; after observing it simply repeated the last historical value for all future years, the root cause (tree-based models can't extrapolate past their training range) was identified and the approach was corrected to per-country Linear Regression.
Environment-based configuration: All API URLs are read from environment variables (VITE_API_URL on the frontend, secrets via Render's environment panel on the backend) rather than hardcoded, enabling clean separation between local development and production deployments.
