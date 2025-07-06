from flask import Flask, render_template, request
from cost_of_living.calculator import calculate_weighted_equivalent_salary

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    if request.method == "POST":
        try:
            salary = float(request.form["salary"])
            fx_rate = float(request.form["fx_rate"])
            col_index = float(request.form["col_index"])
            transfer_percentage = float(request.form["transfer_percentage"]) / 100

            result = calculate_weighted_equivalent_salary(
                salary_local=salary,
                fx_rate=fx_rate,
                cost_of_living_index=col_index,
                transfer_percentage=transfer_percentage
            )
        except ValueError:
            result = "Invalid input. Please enter numeric values."

    return render_template("index.html", result=result)

if __name__ == "__main__":
    app.run(debug=True)
