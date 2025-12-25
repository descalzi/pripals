from typing import List, Optional
from datetime import datetime
import uuid
from sqlalchemy.orm import Session
from app.models import Friend, FriendCreate, FriendUpdate, PointAction, PointActionCreate, PointHistoryEntry
from app.database import DBFriend, DBPointAction


class DatabaseStorage:
    """SQLite-based storage using SQLAlchemy"""

    def __init__(self, db: Session):
        self.db = db

    # Friend operations
    def create_friend(self, friend_create: FriendCreate) -> Friend:
        friend_id = str(uuid.uuid4())
        now = datetime.now()

        db_friend = DBFriend(
            id=friend_id,
            name=friend_create.name,
            profile_picture=friend_create.profilePicture,
            points=0,
            is_couple=friend_create.isCouple,
            partner_name=friend_create.partnerName,
            created_at=now,
            updated_at=now
        )

        self.db.add(db_friend)
        self.db.commit()
        self.db.refresh(db_friend)

        return self._db_friend_to_pydantic(db_friend)

    def get_friend(self, friend_id: str) -> Optional[Friend]:
        db_friend = self.db.query(DBFriend).filter(DBFriend.id == friend_id).first()
        if not db_friend:
            return None
        return self._db_friend_to_pydantic(db_friend)

    def get_all_friends(self) -> List[Friend]:
        db_friends = self.db.query(DBFriend).all()
        return [self._db_friend_to_pydantic(f) for f in db_friends]

    def update_friend(self, friend_id: str, friend_update: FriendUpdate) -> Optional[Friend]:
        db_friend = self.db.query(DBFriend).filter(DBFriend.id == friend_id).first()
        if not db_friend:
            return None

        update_data = friend_update.model_dump(exclude_unset=True)

        # Map camelCase to snake_case for database columns
        field_mapping = {
            'profilePicture': 'profile_picture',
            'isCouple': 'is_couple',
            'partnerName': 'partner_name'
        }

        for field, value in update_data.items():
            db_field = field_mapping.get(field, field)
            setattr(db_friend, db_field, value)

        db_friend.updated_at = datetime.now()
        self.db.commit()
        self.db.refresh(db_friend)

        return self._db_friend_to_pydantic(db_friend)

    def delete_friend(self, friend_id: str) -> bool:
        db_friend = self.db.query(DBFriend).filter(DBFriend.id == friend_id).first()
        if not db_friend:
            return False

        self.db.delete(db_friend)
        self.db.commit()
        return True

    # Point action operations
    def add_point_action(self, friend_id: str, point_action_create: PointActionCreate) -> Optional[PointAction]:
        db_friend = self.db.query(DBFriend).filter(DBFriend.id == friend_id).first()
        if not db_friend:
            return None

        action_id = str(uuid.uuid4())
        db_action = DBPointAction(
            id=action_id,
            friend_id=friend_id,
            points=point_action_create.points,
            reason=point_action_create.reason,
            timestamp=datetime.now()
        )

        self.db.add(db_action)

        # Update friend's points
        db_friend.points += point_action_create.points
        db_friend.updated_at = datetime.now()

        self.db.commit()
        self.db.refresh(db_action)

        return self._db_action_to_pydantic(db_action)

    def get_friend_actions(self, friend_id: str) -> List[PointAction]:
        db_actions = self.db.query(DBPointAction).filter(
            DBPointAction.friend_id == friend_id
        ).all()
        return [self._db_action_to_pydantic(a) for a in db_actions]

    def get_point_history(self, friend_id: str, limit: int = 10) -> List[PointHistoryEntry]:
        """Get the point history for a friend, showing cumulative points over time"""
        db_actions = self.db.query(DBPointAction).filter(
            DBPointAction.friend_id == friend_id
        ).order_by(DBPointAction.timestamp).all()

        history: List[PointHistoryEntry] = []
        running_total = 0

        for action in db_actions:
            running_total += action.points
            history.append(PointHistoryEntry(
                timestamp=action.timestamp.isoformat(),
                points=action.points,
                totalPoints=running_total
            ))

        # Return last N entries
        return history[-limit:] if len(history) > limit else history

    # Helper methods to convert DB models to Pydantic models
    def _db_friend_to_pydantic(self, db_friend: DBFriend) -> Friend:
        return Friend(
            id=db_friend.id,
            name=db_friend.name,
            profilePicture=db_friend.profile_picture,
            points=db_friend.points,
            isCouple=db_friend.is_couple,
            partnerName=db_friend.partner_name,
            createdAt=db_friend.created_at.isoformat(),
            updatedAt=db_friend.updated_at.isoformat()
        )

    def _db_action_to_pydantic(self, db_action: DBPointAction) -> PointAction:
        return PointAction(
            id=db_action.id,
            friendId=db_action.friend_id,
            points=db_action.points,
            reason=db_action.reason,
            timestamp=db_action.timestamp.isoformat()
        )
