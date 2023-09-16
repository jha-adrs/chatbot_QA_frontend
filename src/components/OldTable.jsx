import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Paper,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

import './App.css';
require('dotenv').config();
function App() {
  const [rows, setRows] = useState([]);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedTable, setSelectedTable] = useState('try_questions');
  const [answered, setAnswered] = useState([]);

  const fetchData = () => {
    setLoading(true);
    fetch(`${process.env.SERVER_URI}/get/${selectedTable}`)
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [selectedTable]);

  const handleAnswerChange = (event, QuestionID) => {
    setAnswers({
      ...answers,
      [QuestionID]: event.target.value,
    });
  };

  const handleSubmit = (QuestionID) => {
    const AnswerText = answers[QuestionID] || '';
    if (AnswerText.length < 20) {
      setErrors({
        ...errors,
        [QuestionID]: 'Answer must be at least 20 characters long',
      });
      return;
    }
    console.log(QuestionID, AnswerText);
    setLoading(true);

    fetch(`${process.env.SERVER_URI}/api/insert/${selectedTable}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ QuestionID, AnswerText }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAnswered([...answered, QuestionID]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        delete answered[QuestionID];
        setLoading(false);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Select
        value={selectedTable}
        onChange={(event) => setSelectedTable(event.target.value)}
        disabled={loading}
      >
        <MenuItem value="try_questions">Try Questions</MenuItem>
        <MenuItem value="infrastructure_questions">Infrastructure Questions</MenuItem>
        <MenuItem value="academics_questions">Academic Questions</MenuItem>
        <MenuItem value="admissions_questions">Admissions Questions</MenuItem>
        <MenuItem value="fee_questions">Fee Questions</MenuItem>
      </Select>

      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question ID</TableCell>
            <TableCell>Question Text</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Answer</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.QuestionID}>
              <TableCell component="th" scope="row">
                {row.QuestionID}
              </TableCell>
              <TableCell>{row.QuestionText}</TableCell>
              <TableCell>{row.Tag}</TableCell>
              <TableCell>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Answer"
                  multiline
                  maxRows={4}
                  variant="outlined"
                  value={answers[row.QuestionID] || ''}
                  onChange={(event) => handleAnswerChange(event, row.QuestionID)}
                  error={!!errors[row.QuestionID]}
                  helperText={errors[row.QuestionID]}
                  disabled={loading}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => handleSubmit(row.QuestionID)}
                  disabled={loading || answered.includes(row.QuestionID)}
                >
                  Submit
                </Button>
                {loading && <CircularProgress size={24} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
