---
id: resource-addressing
title: "Resource Addressing: Using Keys vs IDs"
sidebar_label: Resource Addressing
---


When enterprises integrate Vectara into real business workflows, they need 
reliable ways to reference objects across systems like corpora, agent sessions, 
and agents. If the only option is a system-generated ID, each integration must 
store that ID, maintain mapping tables, and perform extra lookups, creating 
unnecessary complexity.

Vectara solves this issue by supporting the following modes of resource identification: 
* **ID-based addressing**: When the platform generates an ID for you.
* **Key-based addressing**: When you provide the platform with an ID that works 
  in URLs without escaping.
* **Name-based addressing**: When you provide the platform with a unique string 
  that carries meaning in your business context.

Additionally, most objects in the Vectara system.

## ID addressing

**What it is**: System-generated strings that uniquely identify a resource.  
**Format**: Prefixed strings (`agt_ab12cd`, `ase_4f5g6h`)  
**When used in the API**: For resources that typically do not need the user to 
address later by ID.

## Key addressing

**What it is**: User-defined (or system-generated) unique strings that can carry 
meaning in your business context, but limited to a certain length and character set.  

**Format**:
* Pattern: `[0-9a-zA-Z_-]+$`
* Max length: 50
* Unique within the relevant scope (per agent or corpus)

**When used in the API**: When we expect the user to reference the object after 
creation by ID.

## Name addressing

**What it is**: User-defined unique strings that can carry meaning in your 
business context, but limited to a certain length and character set.  
**Format**: Unique within the relevant scope.  
**When used in the API**: When we expect the user to reference the object after creation, 
but not by looking it up directly and instead by reference within objects. For example, 
when creating an agent its instructions are referred to by name.  

## Where Vectara uses keys

| Resource       | Key Field     | Example Path                                      | Notes                                      |
|----------------|---------------|---------------------------------------------------|--------------------------------------------|
| Corpora       | `corpus_key`   | `/v2/corpora/legal_docs_v1`                       | Name corpora after datasets for clarity   |
| Document ID   | `document_id`  | `/v2/corpora/legal_docs_v1/documents/statement`    | Although this is named “ID”, it behaves like a key, but requires escaping. |
| Image ID      | `image_id`     | `/v2/corpora/legal_docs_v1/documents/statement/figure_a` | Although this is named “ID”, it behaves like a key, but requires escaping. |
| Agent sessions| `session_key`  | `/v2/agents/agent_id/sessions/customer_support_001` | Track sessions per customer or ticket     |
| Agents        | `agent_key`    | `/v2/agents/onboarding_bot`                        | Consistent agent references across integrations |

