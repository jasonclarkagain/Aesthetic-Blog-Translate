---
name: Wouter query strings
description: Routing behavior to preserve when building URL-driven search or filter pages.
---

Use Wouter's dedicated search hook when a page reads or reacts to query parameters; do not assume the pathname returned by the location hook includes the query string.

**Why:** Search pages can render correctly while silently ignoring a URL query if they parse only pathname state.

**How to apply:** Pair the location setter used for navigation with the router's search-state hook when reading query-driven UI state.