from fastapi import APIRouter
from pydantic import BaseModel

from backend.ai.rag_chain import chain

router = APIRouter(prefix="/api/ai", tags=["ai"])


class QueryRequest(BaseModel):
    prompt: str


class QueryResponse(BaseModel):
    answer: str


@router.post("/query", response_model=QueryResponse)
async def query(body: QueryRequest):
    answer = await chain.ainvoke(body.prompt)
    return QueryResponse(answer=answer)
