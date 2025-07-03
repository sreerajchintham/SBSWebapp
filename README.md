

# 🔍 SBS Feature Selector Web App

A full-stack web application that allows users to perform **Sequential Backward Selection (SBS)** for feature selection on any dataset, directly from a browser interface.

This project was developed as part of a **Data Mining course**, combining both machine learning and modern web development practices.

---

## 🚀 Features

✅ Upload CSV datasets
✅ Automatically select target column and machine learning model
✅ Perform **Sequential Backward Selection (SBS)** to reduce dimensionality
✅ Download reduced datasets in CSV format
✅ Interactive, responsive user interface with **React** and **Bootstrap**
✅ Fast and scalable **FastAPI** backend with multiple model choices

---

## 🏗️ Tech Stack

### Backend:

* **Python 3**
* **FastAPI**
* **Scikit-learn** (for SBS and ML models)
* **Pandas**
* **Uvicorn** (ASGI server)

### Frontend:

* **React.js**
* **Bootstrap 5**
* **Custom CSS**

---

## 📂 Folder Structure

```
SBSWebapp/
├── SBS-backend/          # FastAPI backend with SBS logic
│   ├── main.py
│   ├── requirements.txt
│
├── sbs-frontend/         # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── ...
│   └── package.json
└── README.md
```

---

## 🔧 How to Run the Project

### 1. Clone the Repository:

```bash
git clone https://github.com/yourusername/SBSWebapp.git
cd SBSWebapp
```

---

### 2. Backend Setup (FastAPI + SBS):

```bash
cd SBS-backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

* The FastAPI server will be available at:
  `http://127.0.0.1:8000`
* Swagger API docs:
  `http://127.0.0.1:8000/docs`

---

### 3. Frontend Setup (React + Bootstrap):

```bash
cd ../sbs-frontend
npm install
npm start
```

* React app will run on:
  `http://localhost:3000`

---

## 🌟 How It Works:

1. Upload your dataset (CSV).
2. Select the **Target Column** (dependent variable).
3. Choose your preferred **Machine Learning Model**:

   * KNN
   * Logistic Regression
   * Decision Tree
   * Random Forest
   * Naive Bayes
   * SVM
4. Specify how many features you want to keep.
5. Click **Submit** to run SBS in the backend.
6. Preview the selected features and download the reduced dataset.

---

## 🎨 UI Highlights:

* Clean and colorful theme with Bootstrap and custom CSS
* Modern fonts and styled buttons
* Responsive design for better usability
* Preview of uploaded CSV file displayed in a table

---

## 📚 Why This Project?

* Demonstrates real-world application of **Data Mining** techniques.
* Combines both **ML model selection** and **feature reduction** into a user-friendly tool.
* Leverages my prior knowledge in **frontend development** from my Bachelor's in IT.

---

## 🔗 Future Improvements:

* Add feature importance visualization
* Support additional feature selection algorithms
* User authentication and saving results in database

---

## 📄 License

This project is for educational purposes only.

