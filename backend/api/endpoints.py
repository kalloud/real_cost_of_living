from fastapi import APIRouter
from pydantic import BaseModel
from backend.calculation_logic.calculator import calculate_weighted_equivalent_salary

router = APIRouter()

class SalaryRequest(BaseModel):
    salary_local: float
    cost_of_living_index: float
    local_spending_ratio: float  # between 0.0 and 1.0

class SalaryResponse(BaseModel):
    equivalent_salary: float

@router.post("/calculate", response_model=SalaryResponse)
def calculate_salary(data: SalaryRequest):
    result = calculate_weighted_equivalent_salary(
        salary_local=data.salary_local,
        cost_of_living_index=data.cost_of_living_index,
        local_spending_ratio=data.local_spending_ratio
    )
    return SalaryResponse(equivalent_salary=result)
