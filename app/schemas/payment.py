from pydantic import BaseModel, Field
from typing import Dict, Optional

class PaymentCreate(BaseModel):
    amount: float = Field(..., gt=0)
    memo: str
    metadata: Dict[str, str]

class PaymentApprove(BaseModel):
    payment_id: str = Field(..., alias="paymentId")

class PaymentComplete(BaseModel):
    payment_id: str = Field(..., alias="paymentId")
    txid: str

class PaymentResponse(BaseModel):
    status: str
    payment_id: str
    amount: float
    memo: str
    metadata: Dict[str, str]

    class Config:
        from_attributes = True
        populate_by_name = True 