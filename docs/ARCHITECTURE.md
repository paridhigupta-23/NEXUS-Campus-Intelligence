# NEXUS Architecture

## MongoDB capabilities demonstrated

1. **Document model** — users, events, issues and campus resources.
2. **2dsphere index** — nearby campus resource discovery.
3. **Aggregation** — dashboard and category analytics.
4. **Change Streams** — planned real-time issue/event updates.
5. **Flexible schema** — different event/resource metadata without rigid relational joins.
6. **Recommendation data** — user interests + event match score.

## Planned production additions

- Authentication with JWT/OAuth
- MongoDB Atlas deployment
- Atlas Search for campus-wide search
- Change Stream websocket/SSE service
- AI recommendation scoring
- Admin role-based access
- MapLibre/Mapbox campus map
- Push notifications
