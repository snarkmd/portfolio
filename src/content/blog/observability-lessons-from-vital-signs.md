# Observability Lessons from Vital Signs

A single vital sign rarely explains the whole patient. A single log line rarely explains the whole incident.

## Trends beat snapshots

One abnormal value matters. A pattern matters more.

- Heart rate rising over two hours.
- Error rate climbing after a deployment.
- Latency increasing only for one endpoint.

The trend tells you whether the system is stabilizing or deteriorating.

## Context changes interpretation

A temperature of 38.1 means different things after surgery, during chemotherapy, or after a long run. A spike in API latency means different things during a traffic surge, a database migration, or a third-party outage.

Context turns numbers into meaning.

## Good dashboards reduce guessing

The goal is not more graphs. The goal is faster judgment.

Put related signals near each other. Label thresholds. Make the normal range obvious. Keep the path from detection to action short.
