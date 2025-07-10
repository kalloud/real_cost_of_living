import { useState, useEffect } from "react";

function App() {
  const [salary, setSalary] = useState("");
  const [fxRate, setFxRate] = useState("");
  const [colIndex, setColIndex] = useState("");
  const [transferPercentage, setTransferPercentage] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Sync theme state with actual document attribute on mount
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark" || currentTheme === "light") {
      setTheme(currentTheme);
    } else {
      // Default to light theme
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salary_local: parseFloat(salary),
          fx_rate: parseFloat(fxRate),
          cost_of_living_index: parseFloat(colIndex),
          transfer_percentage: parseFloat(transferPercentage) / 100,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch calculation");
      }

      const data = await res.json();
      setResult(data.equivalent_salary);
    } catch (err) {
      setError((err as Error).message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const onInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">📍 Cost of Living Calculator</h2>
          <button
            onClick={toggleTheme}
            className="btn btn-outline btn-sm"
            aria-label="Toggle dark/light theme"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            Current Salary
            <input
              type="number"
              min="0"
              placeholder="Enter your salary"
              className="input input-bordered w-full mt-1"
              value={salary}
              onChange={(e) => onInputChange(setSalary, e.target.value)}
              required
            />
          </label>
          <label className="block">
            Exchange Rate
            <input
              type="number"
              min="0"
              placeholder="Original → target currency"
              className="input input-bordered w-full mt-1"
              value={fxRate}
              onChange={(e) => onInputChange(setFxRate, e.target.value)}
              required
            />
          </label>
          <label className="block">
            Cost of Living Ratio
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Target / Original city COL ratio"
              className="input input-bordered w-full mt-1"
              value={colIndex}
              onChange={(e) => onInputChange(setColIndex, e.target.value)}
              required
            />
          </label>
          <label className="block">
            % Sent Back Home
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              placeholder="Percentage of salary spent locally"
              className="input input-bordered w-full mt-1"
              value={transferPercentage}
              onChange={(e) => onInputChange(setTransferPercentage, e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Calculating..." : "Calculate"}
          </button>
        </form>

        {error && (
          <div className="mt-4 alert alert-error">⚠️ Error: {error}</div>
        )}

        {result !== null && !error && (
          <div className="mt-4 alert alert-success">
            💸 Adjusted Equivalent Salary: <strong>{result.toFixed(2)}</strong>
          </div>
        )}
      </div>
    </div>
    
  );
}

export default App;
