from fastapi import APIRouter, HTTPException, UploadFile, File
from typing import List
import base64
from app.models import Friend, FriendCreate, FriendUpdate, PointActionCreate, League
from app.services.storage import storage
from app.services.league import calculate_leagues

router = APIRouter()


@router.get("/friends", response_model=List[Friend])
async def get_friends():
    """Get all friends"""
    return storage.get_all_friends()


@router.post("/friends", response_model=Friend)
async def create_friend(friend: FriendCreate):
    """Create a new friend"""
    return storage.create_friend(friend)


@router.get("/friends/{friend_id}", response_model=Friend)
async def get_friend(friend_id: str):
    """Get a specific friend"""
    friend = storage.get_friend(friend_id)
    if not friend:
        raise HTTPException(status_code=404, detail="Friend not found")
    return friend


@router.put("/friends/{friend_id}", response_model=Friend)
async def update_friend(friend_id: str, friend_update: FriendUpdate):
    """Update a friend"""
    friend = storage.update_friend(friend_id, friend_update)
    if not friend:
        raise HTTPException(status_code=404, detail="Friend not found")
    return friend


@router.delete("/friends/{friend_id}")
async def delete_friend(friend_id: str):
    """Delete a friend"""
    success = storage.delete_friend(friend_id)
    if not success:
        raise HTTPException(status_code=404, detail="Friend not found")
    return {"message": "Friend deleted successfully"}


@router.post("/friends/{friend_id}/points")
async def add_points(friend_id: str, point_action: PointActionCreate):
    """Add or remove points from a friend"""
    action = storage.add_point_action(friend_id, point_action)
    if not action:
        raise HTTPException(status_code=404, detail="Friend not found")
    return action


@router.get("/leagues", response_model=List[League])
async def get_leagues():
    """Get all leagues with friends organized by points"""
    friends = storage.get_all_friends()
    return calculate_leagues(friends)


@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    """Upload a profile picture and return base64 encoded string"""
    try:
        contents = await file.read()
        base64_encoded = base64.b64encode(contents).decode('utf-8')
        return {
            "filename": file.filename,
            "data": f"data:{file.content_type};base64,{base64_encoded}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading file: {str(e)}")
