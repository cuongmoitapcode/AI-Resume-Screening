@echo off
echo 🚀 Setting up AI Resume Screening Application...

echo 📦 Installing backend dependencies...
cd backend
pip install -r requirements.txt
python -m spacy download en_core_web_sm

echo ⚛️ Installing frontend dependencies...
cd ..\frontend
npm install

echo ✅ Setup complete!
echo.
echo 🏃♂️ To run the application:
echo 1. Start backend: cd backend ^&^& uvicorn main:app --reload
echo 2. Start frontend: cd frontend ^&^& npm run dev
echo 3. Open http://localhost:5173 in your browser

pause