from sqlalchemy.orm import Session
from fastapi import HTTPException
from . import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str) -> models.User:
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_employees(db: Session, skip: int = 0, limit: int = 10) -> list[models.Employee]:
    return db.query(models.Employee).offset(skip).limit(limit).all()

def create_employee(db: Session, employee: schemas.EmployeeCreate, user_id: str) -> models.Employee:
    db_employee = models.Employee(**employee.dict(), owner_id=user_id)
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

def get_employee(db: Session, employee_id: int) -> models.Employee:
    db_employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_employee

def create_address(db: Session, address: schemas.AddressCreate, employee_id: int) -> models.Address:
    db_address = models.Address(**address.dict(), employee_id=employee_id)
    db.add(db_address)
    db.commit()
    db.refresh(db_address)
    return db_address
