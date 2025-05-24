<div align="center">

<img src="docs/hero-banner.png" width="650" alt="Microcosm Log banner" />

**Microcosm Log**  
_The open-source atlas of tropical microscopic life_

[Website](https://microcosmlog.org) · [Docs](./docs) · [Roadmap](https://github.com/your-org/microcosm-log/issues) · [Contribute](#-contributing)

</div>

---

## 🌟 Why Microcosm Log?

Tropical freshwater microbes are **hugely diverse** yet **poorly documented** in open datasets.  
Microcosm Log crowdsources high-resolution images, metadata, and field notes so researchers, teachers, and citizen-scientists can:

* monitor biodiversity & climate trends  
* train machine-learning models on openly licensed images  
* learn microscopy without expensive equipment  

Everything is released under **CC-BY 4.0** (images) and **MIT** (code).

---

## ✨ Features

| ✔︎ | Module | Notes |
|----|--------|-------|
| 🔍 | **Searchable species guide** | curated references, markdown content |
| 📸 | **Crowd observations** | sample date, GPS, magnification, imaging method |
| 🗂 | **Supabase Storage** | originals + thumbnails |
| 🗳 | **Community vote QA** | ⬆️ “looks good” / ⬇️ “doubtful” per observation |
| 🗺 | **PostGIS geospatial queries** | fast “show everything within 10 km” |
| 🗨 | **Threaded discussions** | gear talk, ID requests, general chat |
| 🔒 | **Row-Level-Security** | fine-grained perms for every table |
| ⛓ | **Optional Web 3 provenance** | IPFS CID + on-chain hash (coming soon) |

---

## 🏗️ Tech stack

| Layer | Tech |
|-------|------|
| Database | **Supabase Postgres** + PostGIS + pgcrypto |
| Auth | Supabase email / magic-link • _wallet login optional_ |
| API | auto-generated Supabase REST & Realtime |
| Front-end | Next.js 14 + Tailwind CSS |
| Images | Supabase Storage (private & public buckets) |
| Deployment | Supabase (DB) · Vercel (web) |

---

## 🗄️ Database snapshot
The full schema lives in **`/docs/schema.md`**.

| Key table | Purpose |
|-----------|---------|
| **observations** | crowd data (sample date, geo, magnification…) |
| **observation_images** | CC-BY images + SHA-256 hashes |
| **observation_votes** | one vote / user ⬆️ or ⬇️ |
| **species_references** | curated taxonomy cards |

---

## 🛣 Roadmap

| Milestone | Status |
|-----------|--------|
| MVP v0.1 – public search & upload | ✅ May 2025 |
| Community voting + admin dashboard | 🟡 WIP |
| Mycology module (phone mushrooms) | ⬜ Planned Q3 2025 |
| On-chain provenance + POAP badges | ⬜ Planned Q3 2025 |
| Open API / CSV export | ⬜ Planned Q4 2025 |

_Track progress in the **Roadmap board**._

---

## 🤝 Contributing

We welcome **code, images, and feedback!**

1. **Fork** and create a feature branch.  
2. Run `pnpm lint && pnpm test` before committing.  
3. Open a PR — fill the template.  

See **`CONTRIBUTING.md`** for full guidelines.

---

## 📝 License
* **Code** — MIT  
* **Images & data** — CC-BY 4.0

<div align="center">

Made with 🔬 & ❤️ in Costa Rica

</div>
