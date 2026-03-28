const express = require('express')
const cors    = require('cors')
const { PythonShell } = require('python-shell')
const path    = require('path')

const app  = express()
app.use(cors())
app.use(express.json())

function runPredict(dataset, model_type, data) {
  return new Promise((resolve, reject) => {
    const options = {
      mode: 'text',
      pythonPath: 'python',
      scriptPath: __dirname,
      args: [JSON.stringify({ dataset, model_type, data })]
    }

    PythonShell.run('predict.py', options)
      .then(results => {
        console.log('Python output:', results)
        const output = JSON.parse(results[results.length - 1])
        resolve(output)
      })
      .catch(err => {
        console.error('Python error:', err)
        reject(err)
      })
  })
}

app.get('/', (req, res) => {
  res.json({ message: 'ML Backend is running' })
})

app.post('/predict/gaming/ensemble', async (req, res) => {
  try {
    const result = await runPredict('gaming', 'ensemble', req.body)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/predict/gaming/nn', async (req, res) => {
  try {
    const result = await runPredict('gaming', 'nn', req.body)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/predict/salary/ensemble', async (req, res) => {
  try {
    const result = await runPredict('salary', 'ensemble', req.body)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/predict/salary/nn', async (req, res) => {
  try {
    const result = await runPredict('salary', 'nn', req.body)
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(8000, () => {
  console.log('Backend running at http://localhost:8000')
})