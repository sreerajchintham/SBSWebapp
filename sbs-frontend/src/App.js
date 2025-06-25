// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [targetColumn, setTargetColumn] = useState('');
  const [model, setModel] = useState('KNN');
  const [k, setK] = useState(3);
  const [columnNames, setColumnNames] = useState([]);
  const [previewRows, setPreviewRows] = useState([]);
  const [status, setStatus] = useState('');
  const [downloadLink, setDownloadLink] = useState(null);

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setTargetColumn('');
    setColumnNames([]);
    setPreviewRows([]);
    setDownloadLink(null);

    if (uploadedFile) {
      const text = await uploadedFile.text();
      const lines = text.split('\n').filter(line => line.trim() !== '');
      const headers = lines[0].split(',').map(h => h.trim());
      const rows = lines.slice(1, 6).map(row => row.split(',').map(cell => cell.trim()));
      setColumnNames(headers);
      setPreviewRows(rows);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !targetColumn || !model || !k) return;

    setStatus("Processing...");
    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_column', targetColumn);
    formData.append('model', model);
    formData.append('k', k);

    try {
      const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      setDownloadLink(url);
      setStatus("✅ Done!");
    } catch (err) {
      setStatus("❌ Error occurred. Check backend.");
    }
  };

  return (
    <div className="bg-gradient d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-5 w-70" style={{ maxWidth: '1200px' }}>
        <h2 className="text-center text-primary mb-4">SBS Feature Selector</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Upload CSV:</label>
            <input type="file" className="form-control" accept= ".csv" onChange={handleFileChange} required />
          </div>

          {previewRows.length > 0 && (
            <div className="mb-3">
              <label className="form-label">Data Preview:</label>
              <div className="table-responsive">
                <table className="table table-bordered table-sm">
                  <thead className="table-light">
                    <tr>
                      {columnNames.map((col, idx) => (
                        <th key={idx}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewRows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {columnNames.length > 0 && (
            <div className="mb-3">
              <label className="form-label">Target Column:</label>
              <select
                className="form-select"
                value={targetColumn}
                onChange={(e) => setTargetColumn(e.target.value)}
                required
              >
                <option value="">-- Select --</option>
                {columnNames.map((col, idx) => (
                  <option key={idx} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Select Model:</label>
            <select className="form-select" value={model} onChange={(e) => setModel(e.target.value)}>
              <option>KNN</option>
              <option>Logistic Regression</option>
              <option>Decision Tree</option>
              <option>Random Forest</option>
              <option>Naive Bayes</option>
              <option>SVM</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Number of Features to Keep:</label>
            <input
              type="number"
              className="form-control"
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
              min="1"
              max={columnNames.length - 1}
              required
            />
            <small className="text-muted">
              (Max: {columnNames.length - 1} features, excluding target column)
            </small>
          </div>

          <button type="submit" className="btn btn-primary w-100">Run Feature Selection</button>
        </form>

        {status && (
          <div className="alert alert-info mt-4 text-center">
            {status}
          </div>
        )}

        {downloadLink && (
          <div className="mt-3 text-center">
            <a href={downloadLink} download="reduced_dataset.csv" className="btn btn-success">
              Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
