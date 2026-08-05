# Meilisearch Fast Instant Search Integration

## Overview

SynoCommerce uses Meilisearch for ultra-fast, typo-tolerant instant search under 10ms.

---

## Configuration

Set environment variables in `.env.production`:

```env
MEILISEARCH_HOST=https://search.synocommerce.com
MEILISEARCH_MASTER_KEY=meili_prod_master_key
```

---

## API Usage

```typescript
import { SearchEngineProvider } from '@/integrations/search';

const searchEngine = new SearchEngineProvider();
const results = await searchEngine.search({
  query: 'Triphala',
  enginePreference: 'MEILISEARCH',
});
```
