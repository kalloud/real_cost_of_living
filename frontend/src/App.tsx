import { useState } from 'react'

function App() {
  const [salary, setSalary] = useState("")
  const [fx_rate, setFxRate] = useState("")
  const [colIndex, setColIndex] = useState("")
  const [TransferPercentage, setTransferPercentage] = useState("")
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("http://127.0.0.1:8000/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        salary_local: parseFloat(salary),
        fx_rate: parseFloat(fx_rate),
        cost_of_living_index: parseFloat(colIndex),
        transfer_percentage: parseFloat(TransferPercentage) / 100
      })
    })
    const data = await res.json()
    setResult(data.equivalent_salary)
  }

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Cost of Living Calculator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Current Salary:
          <input type="number" value={salary} onChange={e => setSalary(e.target.value)} required />
        </label>
        <br />
        <label>
          Exchage Rate:
          <input type="number" value={fx_rate} onChange={e => setFxRate(e.target.value)} required />
        </label>
        <br />
        <label>
          Cost of Living Ratio:
          <input type="number" value={colIndex} onChange={e => setColIndex(e.target.value)} required />
        </label>
        <br />
        <label>
          % Sent Back Home:
          <input type="number" value={TransferPercentage} onChange={e => setTransferPercentage(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>
      {result !== null && (
        <p>💸 Adjusted Equivalent Salary: <strong>{result.toFixed(2)}</strong></p>
      )}
    </div>
  )
}

export default App
