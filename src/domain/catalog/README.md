# Catalog Bounded Context Architecture

## Overview
The `catalog` bounded context serves as the central architectural blueprint for product catalog representations, taxonomy groupings, collections, attribute models, and media assets in SynoCommerce.

## Purpose
This context defines domain contracts and interface abstractions that unite catalog assets without embedding concrete execution logic.

## Key Architectural Contracts
- `IProductContract`: Product aggregate abstraction.
- `IVariantContract`: Product variant abstraction.
- `ICategoryContract`: Taxonomy category node contract.
- `IBrandContract`: Brand entity abstraction.
- `ICollectionContract`: Curated or automated product collection contract.
- `IAttributeContract`: Specification attribute contract.
- `IAttributeValueContract`: Assigned attribute value contract.
- `IMediaAssetContract`: Catalog image, video, or 3D asset metadata.
- `ProductStatus`: Enumeration of lifecycle states (Draft, Published, Archived).
- `Visibility`: Storefront and channel visibility policy contract.
- `SearchMetadata`: Indexable search parameters and metadata.
