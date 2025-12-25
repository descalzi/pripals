from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum


class LeagueType(str, Enum):
    PRIMIUM = "PRIMIUM"
    PRIME = "PRIME"
    PRIMITIVES = "PRIMITIVES"


class Friend(BaseModel):
    id: str
    name: str
    profilePicture: str
    points: int = 0
    isCouple: bool = False
    partnerName: Optional[str] = None
    createdAt: datetime
    updatedAt: datetime


class FriendCreate(BaseModel):
    name: str
    profilePicture: str
    isCouple: bool = False
    partnerName: Optional[str] = None


class FriendUpdate(BaseModel):
    name: Optional[str] = None
    profilePicture: Optional[str] = None
    isCouple: Optional[bool] = None
    partnerName: Optional[str] = None


class PointAction(BaseModel):
    id: str
    friendId: str
    points: int
    reason: str
    timestamp: datetime


class PointActionCreate(BaseModel):
    points: int
    reason: str


class League(BaseModel):
    type: LeagueType
    title: str
    description: str
    friends: list[Friend]


class PointHistoryEntry(BaseModel):
    timestamp: datetime
    points: int
    totalPoints: int
