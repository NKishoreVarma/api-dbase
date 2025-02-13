// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 9000;
let data = require("./data.json")
app.use(express.static('static'));
app.use(express.json())

app.post('/students/above-threshold', async(req, res) => {
    try{
      console.log("request body:",req.body);
      const {threshold}=req.body;

      if(typeof threshold !=='number'){
        return res.status(400).json({message:'invalid threshold  value'})
      }
      const filteredStudents =data.filter(student =>student.total > threshold);
      
      res.json({
        count:filteredStudents.length,
        students:filteredStudents
      })
       
    }
    catch(err){
      console.log(err)
      res.status(500).json({message:"internal server error"})
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});