from typing import List
from app.models import Friend, League, LeagueType


def calculate_leagues(friends: List[Friend]) -> List[League]:
    """
    Calculate league placement for all friends based on their points.
    Top 3 -> Primium
    Next 5 -> Prime
    Rest -> Primitives
    """
    # Sort friends by points (descending)
    sorted_friends = sorted(friends, key=lambda f: f.points, reverse=True)

    # Split into leagues
    primium_friends = sorted_friends[:3]
    prime_friends = sorted_friends[3:8]
    primitives_friends = sorted_friends[8:]

    leagues = [
        League(
            type=LeagueType.PRIMIUM,
            title="Primium",
            description="The Elite",
            friends=primium_friends
        ),
        League(
            type=LeagueType.PRIME,
            title="Prime",
            description="The Inner Circle",
            friends=prime_friends
        ),
        League(
            type=LeagueType.PRIMITIVES,
            title="Primitives",
            description='The Bottom Tier. Lucky if they get a "like" on their IG story.',
            friends=primitives_friends
        )
    ]

    return leagues
