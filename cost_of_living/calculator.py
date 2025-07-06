def calculate_weighted_equivalent_salary(
    salary_local: float,
    fx_rate: float,
    cost_of_living_index: float,
    local_spending_ratio: float
) -> float:
    """
    Calculate equivalent salary in target city/currency.

    :param salary_local: Salary in original currency
    :param fx_rate: Exchange rate (original → target currency)
    :param cost_of_living_index: Target city COL index relative to source city (e.g. 1.2 means 20% more expensive)
    :param local_spending_ratio: % of salary spent in original currency (0.0 to 1.0)
    :return: Weighted equivalent salary in target currency
    """
    adjusted_foreign = (salary_local * (1 - local_spending_ratio)) * cost_of_living_index
    adjusted_local = salary_local * local_spending_ratio
    return adjusted_foreign + adjusted_local
