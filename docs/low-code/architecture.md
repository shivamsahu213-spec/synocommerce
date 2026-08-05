# Enterprise Low-Code Application Designer Architecture

## Executive Overview

The **SynoCommerce Low-Code Application Designer** (`src/modules/low-code/` & `apps/app-builder/`) enables non-technical builders and developers to construct custom internal web apps matching Salesforce Lightning App Builder and Retool.

```
                    +--------------------------------------------------+
                    |             VISUAL APP BUILDER STUDIO            |
                    |    (30 Components, Drag-&-Drop Canvas, Property) |
                    +--------------------------------------------------+
                                             |
         +-----------------------------------+-----------------------------------+
         |                                   |                                   |
         v                                   v                                   v
+-----------------+                 +-----------------+                 +-----------------+
| FORMULA ENGINE  |                 | DATA CONNECTORS |                 | PUBLISHING      |
| (SUM, IF,       |                 | (PostgreSQL,    |                 | (App Export,    |
|  CONCAT)        |                 |  REST, GraphQL) |                 |  RBAC Roles)    |
+-----------------+                 +-----------------+                 +-----------------+
```
