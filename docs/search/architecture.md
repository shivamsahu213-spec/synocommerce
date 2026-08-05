# Enterprise Search & Discovery Platform Architecture

## Executive Overview

The **SynoCommerce Search Platform** (`src/integrations/search/`) orchestrates multi-engine search across Meilisearch, Elasticsearch, OpenSearch, Algolia, and Typesense with hybrid vector search, instant autocomplete, zero-downtime reindexing, and query security.

```
                    +--------------------------------------------------+
                    |           MULTI-ENGINE SEARCH ADAPTER            |
                    | (Meilisearch, Elasticsearch, Algolia, Typesense) |
                    +--------------------------------------------------+
                                             |
             +-------------------------------+-------------------------------+
             |                               |                               |
             v                               v                               v
    +-----------------+             +-----------------+             +-----------------+
    | SEMANTIC HYBRID |             | MERCHANDISING   |             | QUERY SECURITY  |
    | (Vector Embed & |             | (Boost Rules &  |             | (Sanitization & |
    |  Cosine Match)  |             |  Pinned Items)  |             |  Rate Limiting) |
    +-----------------+             +-----------------+             +-----------------+
```
