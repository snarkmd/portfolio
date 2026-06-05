# FHIR for Frontend Developers

FHIR is a healthcare data standard. The useful mental model is simple: healthcare records are split into resources that reference each other.

## Common resources

- Patient: who the record is about.
- Practitioner: who delivered care.
- Encounter: where and when care happened.
- Observation: measurements, findings, and results.
- MedicationRequest: prescribed medication intent.

## Read references like links

A resource often points to another resource:

`Observation.subject -> Patient/123`

That means the observation belongs to that patient. Frontend code should treat these links as data dependencies.

## Avoid overfetching

Healthcare payloads can become large quickly. Ask for only what the screen needs.

1. Load the list view with summary fields.
2. Fetch details after selection.
3. Cache stable reference data where appropriate.

## Respect uncertainty

Medical records may contain missing, corrected, provisional, or conflicting data. Your interface logic should not assume every field is final.
