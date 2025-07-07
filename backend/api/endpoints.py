from fastapi import APIRouter
from pydantic import BaseModel
from backend.calculation_logic.calculator import calculate_weighted_equivalent_salary

router = APIRouter()

class SalaryRequest(BaseModel):
    salary_local: float
    fx_rate: float  # exchange rate to target currency
    cost_of_living_index: float
    transfer_percentage: float  # between 0.0 and 1.0

class SalaryResponse(BaseModel):
    equivalent_salary: float

@router.post("/calculate", response_model=SalaryResponse)
def calculate_salary(data: SalaryRequest):
    result = calculate_weighted_equivalent_salary(
        salary_local=data.salary_local,
        fx_rate=data.fx_rate,
        cost_of_living_index=data.cost_of_living_index,
        transfer_percentage=data.transfer_percentage
    )
    return SalaryResponse(equivalent_salary=result)
