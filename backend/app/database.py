from sqlalchemy import create_engine, Column, String, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os

# Database URL - use environment variable or default to local file
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./pripals.db")

# Create engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class
Base = declarative_base()


# Database Models
class DBFriend(Base):
    __tablename__ = "friends"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    profile_picture = Column(String, nullable=False)
    points = Column(Integer, default=0)
    is_couple = Column(Boolean, default=False)
    partner_name = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationship to point actions
    point_actions = relationship("DBPointAction", back_populates="friend", cascade="all, delete-orphan")


class DBPointAction(Base):
    __tablename__ = "point_actions"

    id = Column(String, primary_key=True, index=True)
    friend_id = Column(String, ForeignKey("friends.id"), nullable=False)
    points = Column(Integer, nullable=False)
    reason = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.now)

    # Relationship to friend
    friend = relationship("DBFriend", back_populates="point_actions")


# Create all tables
def init_db():
    Base.metadata.create_all(bind=engine)


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
