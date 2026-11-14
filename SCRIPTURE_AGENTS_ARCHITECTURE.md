# Scripture Agents architecture

## Current design

The four traditions are separate configurations in `lib/scripture-agents.ts`. Each definition owns a stable ID, display name, availability state, tradition-specific system instructions, and curated primary-text and reference-source links.

The selection page reads from this registry. All four traditions use the shared dynamic route `app/Agents/[tradition]`. Christian and Jewish are live AgentPlace integrations configured by URL and embed mode in the registry; Muslim and Buddhist currently render their own development frameworks and source lists. Shared presentation and embed behavior live in the dynamic route.

## Source integrity

The source URLs are curated starting points, not connected retrieval pipelines. The application must not imply that an agent has searched, indexed, or retrieved a source until an actual integration does so.

Keep primary scripture distinct from translations, commentary, hadith, rabbinic literature, and modern scholarship. Preserve source title, edition or translation, and precise passage metadata in any future retrieval records.

## Next implementation stages

1. Select and document licensing and permitted reuse for each corpus.
2. Build one retrieval adapter per tradition, with source-specific parsing and metadata.
3. Store passages with tradition, collection, work, section, language, translation or edition, and stable source URL.
4. Add a server-side chat endpoint that selects the correct configuration and retrieval adapter from a validated agent ID.
5. Keep provider credentials on the server. Add rate limits, request validation, abuse controls, and privacy-conscious retention.
6. Return passage-level citations with answers and distinguish retrieved text from model-generated explanation.
7. Add tests for tradition isolation, citation correctness, unsupported claims, and prompt-injection attempts in retrieved documents.

## Non-goals

Do not merge all traditions into a single generic corpus or silently use one tradition's interpretive assumptions in another agent. Do not represent an unconnected source list as a functioning knowledge base.
