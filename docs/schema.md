# 🧬 Microcosm Log — Database Schema  
_Last updated: May 2025_

---

## 🧠 Overview  

Microcosm Log is a community-driven, **CC-BY** platform for documenting tropical microscopic life (microbes first, fungi module next).  
Key capabilities ⬇︎

| ✔︎ | Capability |
|----|-------------|
| Curated, searchable species guide |
| Community-contributed observations **with research-grade metadata** |
| Supabase Auth (e-mail ➕ optional wallet) |
| Image storage on Supabase Storage |
| Threaded discussions & role-based moderation |
| Row-Level-Security everywhere |

---

## 📁 Tables  

### 1 `users` — profile & roles  

| Field | Type | Notes |
|-------|------|-------|
| id | `uuid` PK | mirrors `auth.users.id` |
| username | `text` UNIQUE | public handle |
| avatar_url | `text` | profile picture |
| bio | `text` | |
| role | `text` | `'user'` (default) \| `'admin'` |
| created_at | `timestamp` | auto |

**RLS**

* users read / update **their own** row  
* admins have extra “ALL” policy

---

### 2 `species_references` — curated guide  

| Field | Type | Notes |
|-------|------|-------|
| id | `uuid` PK |
| slug | `text` | e.g. `paramecium-caudatum` |
| scientific_name | `text` |
| common_name | `text` NULL |
| type | `text` | `'protist'`, `'algae'`, `'fungi'`, … |
| description | `text` |
| habitat | `text` |
| tags | `text[]` |
| extra_data | `jsonb` |
| created_at | `timestamp` |

_Public read-only._

---

### 3 `species_images` — 1-N with species  

| Field | Type | Notes |
|-------|------|-------|
| id | `uuid` PK |
| species_id | `uuid` FK → `species_references.id` |
| image_url | `text` |
| caption | `text` NULL |
| created_at | `timestamp` |

_Public read-only._

---

### 4 `observations` — crowd data  

| Field | Type | Notes |
|-------|------|-------|
| id | `uuid` PK |
| user_id | `uuid` FK → `users.id` |
| species_id | `uuid` FK → `species_references.id` |
| note | `text` |
| sample_date | `date` |
| location | `text` |
| latitude | `double precision` NULL |
| longitude | `double precision` NULL |
| geom | `geography(Point,4326)` NULL |
| magnification | `integer` NULL |
| imaging_method | `text` NULL | `'brightfield'`, `'phase'`, … |
| microscope_used | `text` NULL |
| is_approved | `boolean` DEFAULT `false` |
| created_at | `timestamp` |

_Index_: `observations_geom_idx` (GIST on `geom`)

**RLS**

| Action | Allowed |
|--------|---------|
| SELECT | public **if** `is_approved = true` _or_ owner |
| INSERT | owner |
| UPDATE / DELETE | owner · admins can set `is_approved = true` |

---

### 5 `observation_images` — files per observation  

| Field | Type | Notes |
|-------|------|-------|
| id | `uuid` PK |
| observation_id | `uuid` FK → `observations.id` |
| image_url | `text` |
| caption | `text` NULL |
| license | `text` DEFAULT `'CC-BY-4.0'` |
| sha256 | `text` NULL | content hash |
| ipfs_cid | `text` NULL | future provenance |
| created_at | `timestamp` |

_Public read · insert by owner._

---

### 6 `observation_votes` — crowd QA  

| Field | Type | Notes |
|-------|------|-------|
| id | `uuid` PK `DEFAULT gen_random_uuid()` |
| observation_id | `uuid` FK → `observations.id` `ON DELETE CASCADE` |
| user_id | `uuid` FK → `users.id` `ON DELETE CASCADE` |
| vote | `smallint` CHECK (-1, 1) |
| created_at | `timestamp` DEFAULT `now()` |

UNIQUE (observation_id, user_id) → one vote per user.

**RLS**

| Action | Condition |
|--------|-----------|
| SELECT | `TRUE` |
| INSERT | `auth.uid() = user_id` |
| UPDATE | `auth.uid() = user_id` |
| DELETE | admin policy only |

---

### 7 `threads`

**Community discussion threads.**

| Field         | Type     | Description                                |
|---------------|----------|--------------------------------------------|
| `id`          | `uuid`   | Primary key                                |
| `user_id`     | `uuid`   | Foreign key → `users(id)`                  |
| `title`       | `text`   | Thread title                               |
| `body`        | `text`   | Initial content                            |
| `category`    | `text`   | e.g. `'gear'`, `'id-request'`, `'general'` |
| `created_at`  | `timestamp` | Auto-generated                          |

---

### 8 `thread_replies`

**Replies to discussion threads.**

| Field         | Type     | Description                                |
|---------------|----------|--------------------------------------------|
| `id`          | `uuid`   | Primary key                                |
| `thread_id`   | `uuid`   | Foreign key → `threads(id)`                |
| `user_id`     | `uuid`   | Foreign key → `users(id)`                  |
| `body`        | `text`   | Reply text                                 |
| `created_at`  | `timestamp` | Auto-generated                          |

---

### 9 `admin_flags`

**Moderation system for reporting problematic content.**

| Field         | Type     | Description                                 |
|---------------|----------|---------------------------------------------|
| `id`          | `uuid`   | Primary key                                 |
| `target_type` | `text`   | `'observation'`, `'thread'`, or `'reply'`   |
| `target_id`   | `uuid`   | ID of the flagged item                      |
| `reason`      | `text`   | Reason for the flag                         |
| `flagged_by`  | `uuid`   | Foreign key → `users(id)`                   |
| `created_at`  | `timestamp` | Auto-generated                           |

---

## 🔐 RLS Matrix  

| Table | Insert | Read | Update | Delete |
|-------|--------|------|--------|--------|
| users | – | own | own | – |
| species_references | – | ✅ | – | – |
| species_images | – | ✅ | – | – |
| observations | ✅ | approved ∨ own | own ∨ admin | own ∨ admin |
| observation_images | ✅ | ✅ | – | – |
| observation_votes | ✅(own) | ✅ | own | admin |
| threads | ✅ | ✅ | own | own |
| thread_replies | ✅ | ✅ | own | own |
| admin_flags | ✅ | admin | – | – |

---

## 🪣 Storage Buckets  

| Bucket | ACL | Purpose |
|--------|-----|---------|
| `observations` | **Private** | raw crowd images |
| `species` | **Public** | curated reference images |
| `avatars` | **Public** | user pics |

---

## 🧠 Future Schema Ideas

- `projects`: Collaborative research efforts or seasonal data campaigns
- `contributions`: User contributions log (metadata for community science)
- `reactions`: Lightweight endorsement system for quality content
- `tags`: Extendable tag system for filtering species, threads, observations

---

Questions? ping @LazarusAA — happy to onboard contributors!
