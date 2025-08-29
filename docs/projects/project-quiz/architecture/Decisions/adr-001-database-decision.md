---
sidebar_label: Database Decision Record
---

# Database Decision Record

## Context
The project requires storing and managing data for a quiz application that includes:
- **Quizzes** with different types of questions (single-choice, multiple-choice, etc.).
- **Stories** consisting of sequential content elements (text, video, images, or questions).
- **User progress tracking** (which story part has been reached, which sets/questions have been solved).
- **Multilingual support**, where questions and stories may exist in multiple languages.

Initially, there were three main options under consideration:
1. **Relational Database (PostgreSQL)**
2. **Document Store (MongoDB)**
3. **Graph Database (Neo4j)**

---

## Evaluation

### PostgreSQL (Relational Database)
**Pros**
- Well-suited for structured data with clear relationships (users, sets, questions, answers).
- Excellent support for **multilingual content** using `jsonb` fields to store translations.
- Easy to query sequential story elements with simple ordering (`ORDER BY position`).
- Mature ecosystem, strong support for transactions, and well-known tooling.
- Flexible: can handle relational data and semi-structured data (JSONB) in one system.
- Easier to generate **statistics** (progress, completion rates, user activity) compared to Neo4j.

**Cons**
- Handling highly dynamic schemas (many question types with varying properties) can require careful design.
- Relationships (like friends, user progress graphs) are less "visual" than in Neo4j.

---

### MongoDB (Document Store)
**Pros**
- Flexible schema, easy to add new question/answer formats.
- JSON-like storage makes multilingual content straightforward.

**Cons**
- Complex relations (e.g., users, stories, sets of questions) become harder to manage.
- More difficult to perform complex joins and statistics.
- Would likely require embedding or duplicating data, which complicates consistency.

---

### Neo4j (Graph Database)
**Pros**
- Naturally models relationships (user friendships, answered questions, story progression).
- Intuitive for traversing non-linear stories or complex quiz graphs.
- Queries for connected data can be more elegant.

**Cons**
- Adds complexity since the project does not require **branching stories** (all stories are linear).
- Statistics and aggregations are harder compared to SQL.
- Migration of JSONB-based multilingual content is less straightforward.
- Smaller ecosystem compared to Postgres, fewer developers familiar with Cypher than SQL.

---

## Decision
We decided to use **PostgreSQL** as the primary database.  

The reasoning:
- **Stories are linear**, so sequential content can be modeled with an ordered list in SQL.
- **Quizzes and Sets** are well-structured and map naturally to relational tables.
- **User progress and statistics** are easier to calculate in SQL.
- **Multilingual content** can be handled with `jsonb`, while also allowing sets and stories to declare their available languages for filtering.
- PostgreSQL provides the flexibility to adapt if question formats evolve, without losing the advantages of relational integrity.

Neo4j was strongly considered, but its advantages would only be significant if stories became **non-linear** (branching narratives) or if relationship-heavy queries dominated the use cases.  
MongoDB was dismissed due to weaker relational capabilities and potential consistency issues.

---

## Consequences
- The schema will follow relational best practices (e.g., separate tables for `questions`, `answers`, `sets`, `stories`, `progress`).
- JSONB fields will be used for multilingual text and flexible properties.
- If in the future **non-linear stories** or more complex relationships are introduced, a migration path to Neo4j remains possible (SQL data is easier to map to a graph than the reverse).
