const express = require('express');
const { connection } = require("./database.js");
const app = express();
const port = 3000;
const cors = require('cors')




app.get("/hello", (req, res) => {
  res.json("Hello world");
});

app.get("/kelas", (req, res) => {
  connection.query("SELECT * FROM kelas", (err, rows, fields) => {
    if (err) throw err;
    res.json(rows);
  });
});

// get MK by id
app.get("/mk/:id", (req, res) => {
  const { id } = req.params;
  connection.query(`SELECT * FROM tb_mk WHERE id_mk = ${id}`, (err, rows, fields) => {
    if (err) throw err;
    return res.json(
      {
        error: false,
        message: "Successfully get data",
        data: rows
      }
    );
  });
});

// get KRS by nim and semester
app.get("/krs/:nim/:semester", (req, res) => {
  const { nim, semester } = req.params;
  connection.query(`SELECT * FROM tb_krs INNER JOIN tb_mk ON tb_krs.id_mk=tb_mk.id_mk WHERE nim = ${nim} && semester = ${semester}`, (err, rows, fields) => {
    if (err) throw err;

    if (rows.length == 0) {
      return res.status(404).json(
        {
          error: true,
          message: "Data not found"
        }
      )
    }

    return res.status(200).json(
      {
        error: false,
        message: "Successfully get data",
        data: rows
      }

    );
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


app.use(cors)