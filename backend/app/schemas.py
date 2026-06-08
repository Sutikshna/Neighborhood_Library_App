from pydantic import BaseModel




class BookCreate(BaseModel):
    title: str
    author: str

class MemberCreate(BaseModel):
    name: str
    contact_info: str
    
class BorrowCreate(BaseModel):
    book_id: int
    member_id: int
    
class ReturnCreate(BaseModel):
    book_id: int
    
 
class BookUpdate(BaseModel):
    title: str
    author: str


class MemberUpdate(BaseModel):
    name: str
    contact_info: str