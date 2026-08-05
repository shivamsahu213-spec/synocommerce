# Enterprise Search Platform Architecture

## Executive Overview

The **SynoCommerce Enterprise Search Platform** (`src/modules/search/` & `apps/search-center/`) delivers sub-millisecond search & discovery matching Algolia, Meilisearch, and Coveo.

```
                    +--------------------------------------------------+
                    |             ENTERPRISE SEARCH ENGINE             |
                    |    (Instant Search, Autocomplete, Typo Tolerant) |
                    +--------------------------------------------------+
                                             |
         +-----------------------------------+-----------------------------------+
         |                                   |                                   |
         v                                   v                                   v
+-----------------+                 +-----------------+                 +-----------------+
| INVERTED INDEX  |                 | MERCHANDISING   |                 | HYBRID VECTOR   |
| (11 Searchable  |                 | (Pinned Rules,  |                 | (Cosine Embed,  |
|  Entities)      |                 |  Brand Boost)   |                 |  Zero-Result)   |
+-----------------+                 +-----------------+                 +-----------------+
```
