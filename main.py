from cost_of_living.calculator import calculate_weighted_equivalent_salary

def main():
    print("📍 Cost of Living Weighted Salary Calculator")

    # User Inputs
    salary = float(input("Enter your current salary (in local/original currency): "))
    fx_rate = float(input("Enter exchange rate (original → target currency): "))
    col_index = float(input("Enter cost of living ratio (target / original): "))
    transfer_percentage = float(input("Enter % of salary spent locally (0–100): ")) / 100

    # Calculation
    equivalent_salary = calculate_weighted_equivalent_salary(
        salary_local=salary,
        fx_rate=fx_rate,
        cost_of_living_index=col_index,
        transfer_percentage=transfer_percentage
    )

    print(f"\n💸 Equivalent salary in target city/currency: {equivalent_salary:.2f}")

if __name__ == "__main__":
    main()
