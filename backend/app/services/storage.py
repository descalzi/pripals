from typing import Dict, List, Optional
from datetime import datetime
import uuid
from app.models import Friend, FriendCreate, FriendUpdate, PointAction, PointActionCreate


class InMemoryStorage:
    def __init__(self):
        self.friends: Dict[str, Friend] = {}
        self.point_actions: Dict[str, PointAction] = {}

    # Friend operations
    def create_friend(self, friend_create: FriendCreate) -> Friend:
        friend_id = str(uuid.uuid4())
        now = datetime.now()
        friend = Friend(
            id=friend_id,
            name=friend_create.name,
            profilePicture=friend_create.profilePicture,
            points=0,
            isCouple=friend_create.isCouple,
            partnerName=friend_create.partnerName,
            createdAt=now,
            updatedAt=now
        )
        self.friends[friend_id] = friend
        return friend

    def get_friend(self, friend_id: str) -> Optional[Friend]:
        return self.friends.get(friend_id)

    def get_all_friends(self) -> List[Friend]:
        return list(self.friends.values())

    def update_friend(self, friend_id: str, friend_update: FriendUpdate) -> Optional[Friend]:
        friend = self.friends.get(friend_id)
        if not friend:
            return None

        update_data = friend_update.model_dump(exclude_unset=True)
        updated_friend = friend.model_copy(update=update_data)
        updated_friend.updatedAt = datetime.now()
        self.friends[friend_id] = updated_friend
        return updated_friend

    def delete_friend(self, friend_id: str) -> bool:
        if friend_id in self.friends:
            del self.friends[friend_id]
            # Also delete associated point actions
            actions_to_delete = [
                action_id for action_id, action in self.point_actions.items()
                if action.friendId == friend_id
            ]
            for action_id in actions_to_delete:
                del self.point_actions[action_id]
            return True
        return False

    # Point action operations
    def add_point_action(self, friend_id: str, point_action_create: PointActionCreate) -> Optional[PointAction]:
        friend = self.friends.get(friend_id)
        if not friend:
            return None

        action_id = str(uuid.uuid4())
        point_action = PointAction(
            id=action_id,
            friendId=friend_id,
            points=point_action_create.points,
            reason=point_action_create.reason,
            timestamp=datetime.now()
        )
        self.point_actions[action_id] = point_action

        # Update friend's points
        friend.points += point_action_create.points
        friend.updatedAt = datetime.now()
        self.friends[friend_id] = friend

        return point_action

    def get_friend_actions(self, friend_id: str) -> List[PointAction]:
        return [
            action for action in self.point_actions.values()
            if action.friendId == friend_id
        ]


# Global storage instance
storage = InMemoryStorage()
