def calculate_weighted_equivalent_salary(
    salary_local: float,
    fx_rate: float,
    cost_of_living_index: float,
    transfer_percentage: float
) -> float:
    """
    Calculate equivalent salary in target city/currency.

    :param salary_local: Salary in original currency
    :param fx_rate: Exchange rate (e.g. 3.3 for local=Paris and target=Tunis)
    :param cost_of_living_index: Target city COL index relative to source city (e.g. 1.2 means 20% more expensive)
    :param transfer_percentage: % of salary sent back to home country (0.0 to 1.0)
    :return: Weighted equivalent salary in target currency
    """
    classical_equivalent = salary_local * fx_rate
    col_adjusted_equivalent = salary_local * cost_of_living_index
    equivalent_salary = classical_equivalent * transfer_percentage + col_adjusted_equivalent * (1 - transfer_percentage)
    return equivalent_salary
