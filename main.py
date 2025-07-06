from cost_of_living.calculator import calculate_equivalent_cost

def main():
    print("📍 Cost of Living Equivalent Calculator")
    source_city = input("Enter source city: ")
    target_city = input("Enter target city: ")
    budget = float(input("Enter your current monthly budget (in USD): "))

    result = calculate_equivalent_cost(source_city, target_city, budget)
    print(f"\nTo maintain your lifestyle in {target_city}, you'll need approximately ${result:.2f}/month.")

if __name__ == "__main__":
    main()
