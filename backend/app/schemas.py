from pydantic import BaseModel
from typing import List, Optional

class AddressBase(BaseModel):
    street: str
    city: str
    state: str
    country: str
    postal_code: str
    address_type: str

class AddressCreate(AddressBase):
    pass

class Address(AddressBase):
    id: int
    employee_id: int

    class Config:
        orm_mode = True

class EmployeeBase(BaseModel):
    first_name: str
    last_name: str
    birthdate: str
    job_title: str
    start_date: str

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: int
    owner_id: str
    photo: Optional[str] = None
    addresses: List[Address] = []

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: str
    is_active: bool
    is_admin: bool
    employees: List[Employee] = []

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str