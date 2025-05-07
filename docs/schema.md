# 🧬 Microcosm Log — Database Documentation

_Last updated: May 2025_

---

## 🧠 Overview

This schema powers **Microcosm Log**, a community-driven platform for documenting fungi and microscopic life. It supports:

- A curated species guide
- Community-contributed observations
- User authentication via Supabase
- Threaded discussions
- Image uploads via Supabase Storage
- Role-based moderation

---

## 📁 Tables

---

### 🔹 `users`

**Extends Supabase Auth users table** to include profile metadata and roles.

| Field         | Type     | Description                                    |
|---------------|----------|------------------------------------------------|
| `id`          | `uuid`   | Primary key, matches `auth.users.id`          |
| `username`    | `text`   | Unique handle shown publicly                  |
| `avatar_url`  | `text`   | Profile picture URL                           |
| `bio`         | `text`   | Short user bio                                |
| `role`        | `text`   | `'user'` or `'admin'` (default: `'user'`)     |
| `created_at`  | `timestamp` | Auto-generated                             |

🔐 RLS:
- Users can view and update their own profile
- Admins can be used for moderation access

---

### 🔹 `species_references`

**Metadata for curated species entries** (actual content lives in Markdown or JSON files).

| Field          | Type       | Description                              |
|----------------|------------|------------------------------------------|
| `id`           | `uuid`     | Unique ID                                |
| `slug`         | `text`     | URL slug (e.g. `paramecium-caudatum`)    |
| `scientific_name` | `text`  | Scientific name                          |
| `common_name`  | `text`     | Optional common name                     |
| `type`         | `text`     | `'fungi'`, `'protist'`, `'algae'`, etc.  |
| `description`  | `text`     | Summary for previews and cards           |
| `habitat`      | `text`     | Typical growing environment              |
| `tags`         | `text[]`   | Searchable tags                          |
| `extra_data`   | `jsonb`    | Optional structured metadata             |
| `created_at`   | `timestamp`| Auto-generated                           |

📖 Used to display entries in the Logbook section.

---

### 🔹 `species_images`

**One-to-many relationship for curated images per species.**

| Field         | Type     | Description                                |
|---------------|----------|--------------------------------------------|
| `id`          | `uuid`   | Primary key                                |
| `species_id`  | `uuid`   | Foreign key → `species_references(id)`     |
| `image_url`   | `text`   | Supabase Storage or external URL           |
| `caption`     | `text`   | Optional image description                 |
| `created_at`  | `timestamp` | Auto-generated                          |

---

### 🔹 `observations`

**User-submitted field notes and media about a species.**

| Field            | Type     | Description                              |
|------------------|----------|------------------------------------------|
| `id`             | `uuid`   | Primary key                              |
| `user_id`        | `uuid`   | Foreign key → `users(id)`                |
| `species_id`     | `uuid`   | Foreign key → `species_references(id)`   |
| `note`           | `text`   | Field note or description                |
| `location`       | `text`   | Text-based location                      |
| `latitude`       | `double precision` | Optional geolocation            |
| `longitude`      | `double precision` | Optional geolocation            |
| `microscope_used`| `text`   | Optional microscope model or method      |
| `is_approved`    | `boolean`| Defaults to `false`                      |
| `created_at`     | `timestamp` | Auto-generated                        |

🔐 RLS:
- Public can read **approved** observations
- Users can view/edit/delete their own
- Admins can approve observations

---

### 🔹 `observation_images`

**Images attached to a user observation.**

| Field            | Type     | Description                              |
|------------------|----------|------------------------------------------|
| `id`             | `uuid`   | Primary key                              |
| `observation_id` | `uuid`   | Foreign key → `observations(id)`         |
| `image_url`      | `text`   | Path to image in Supabase Storage        |
| `caption`        | `text`   | Optional image description               |
| `created_at`     | `timestamp` | Auto-generated                        |

---

### 🔹 `threads`

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

### 🔹 `thread_replies`

**Replies to discussion threads.**

| Field         | Type     | Description                                |
|---------------|----------|--------------------------------------------|
| `id`          | `uuid`   | Primary key                                |
| `thread_id`   | `uuid`   | Foreign key → `threads(id)`                |
| `user_id`     | `uuid`   | Foreign key → `users(id)`                  |
| `body`        | `text`   | Reply text                                 |
| `created_at`  | `timestamp` | Auto-generated                          |

---

### 🔹 `admin_flags`

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

## 🔐 RLS Summary

| Table                | Insert | Read                     | Update/Delete              |
|---------------------|--------|--------------------------|----------------------------|
| `users`             | ❌     | own only                 | own only                   |
| `species_references`| ❌     | ✅ (public)              | ❌                         |
| `species_images`    | ❌     | ✅ (public)              | ❌                         |
| `observations`      | ✅     | if approved or own       | own / admin-only approval  |
| `observation_images`| ✅     | ✅                        | ❌                         |
| `threads`           | ✅     | ✅                        | own                        |
| `thread_replies`    | ✅     | ✅                        | own                        |
| `admin_flags`       | ✅     | admin only               | ❌                         |

---

## 🪣 Storage Buckets

| Bucket Name     | Access   | Purpose                                      |
|------------------|----------|----------------------------------------------|
| `observations`   | Private  | User-contributed observation images          |
| `species`        | Public   | Curated, admin-uploaded species images       |
| `avatars`        | Public   | Optional user profile pictures               |

---

## 🧠 Future Schema Ideas

- `projects`: Collaborative research efforts or seasonal data campaigns
- `contributions`: User contributions log (metadata for community science)
- `reactions`: Lightweight endorsement system for quality content
- `tags`: Extendable tag system for filtering species, threads, observations

---


