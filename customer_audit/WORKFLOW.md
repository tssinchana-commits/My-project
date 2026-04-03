mermaid
flowchart TD

A[Representative Creates Customer] --> B[Status: SUBMITTED]

B -->|Verification Approves| C[Status: VERIFIED]
B -->|Verification Rejects| D[Status: REJECTED]

C -->|Manager Approves| E[Status: ACTIVE]
C -->|Manager Rejects| F[Status: MANAGER_REJECTED]

D -->|Representative Edits & Resubmits| B
F -->|Representative Edits & Resubmits| B
