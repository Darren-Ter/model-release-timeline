# Moonshot AI X announcement links — October 19, 2026

All ten Moonshot model records lacked `announcement_x_url`, and their announcement event sources pointed to Kimi web pages. The timeline therefore displayed disabled X icons. Eight qualifying posts had already been verified in the [October 16 release-pattern research](deepseek-glm-kimi-release-patterns-2026-10-16.md), but that research explicitly left the model data unchanged. This update adds those eight permalinks to `data/kimi.json`.

## Verification

Grok CLI searched for the remaining Kimi-Dev and K2.8 Preview announcements and checked the user-supplied K2.7 Code post. It ran with only `web_search` and `web_fetch` enabled and subagent spawning disabled. The active Grok identity and configuration were inspected before authenticated research; no credentials were copied into the repository.

Each accepted link was independently retrieved on October 19 from X's first-party public syndication endpoint, `https://cdn.syndication.twimg.com/tweet-result?id=<status_id>&lang=en&token=0`. Every response identified the exact requested status ID, author `Kimi_Moonshot`, creation time, and content introducing the corresponding release. Creation times agree with the post IDs to the second; syndication responses do not retain the milliseconds encoded by the IDs. Search snippets and Grok's answer alone were not accepted as verification.

| Release | Official announcement | Created, UTC | Created, UTC+8 | Verified context |
| --- | --- | --- | --- | --- |
| Kimi K1.5 | [1881332472748851259](https://x.com/Kimi_Moonshot/status/1881332472748851259) | 2025-01-20 13:26:29 | 2025-01-20 21:26:29 | Introduces the multimodal reasoning research model. |
| Kimi K2 | [1943687594560332025](https://x.com/Kimi_Moonshot/status/1943687594560332025) | 2025-07-11 15:03:29 | 2025-07-11 23:03:29 | Introduces the open-source agentic K2 model. |
| Kimi-K2-Instruct-0905 | [1963802687230947698](https://x.com/Kimi_Moonshot/status/1963802687230947698) | 2025-09-05 03:13:40 | 2025-09-05 11:13:40 | Announces the 0905 coding/context update and links its weights. |
| Kimi K2 Thinking | [1986449512538513505](https://x.com/Kimi_Moonshot/status/1986449512538513505) | 2025-11-06 15:04:04 | 2025-11-06 23:04:04 | Introduces the open-source thinking agent model. |
| Kimi K2.5 | [2016024049869324599](https://x.com/Kimi_Moonshot/status/2016024049869324599) | 2026-01-27 05:42:44 | 2026-01-27 13:42:44 | Introduces K2.5's visual, coding, and agent capabilities. |
| Kimi K2.6 | [2046249571882500354](https://x.com/Kimi_Moonshot/status/2046249571882500354) | 2026-04-20 15:28:10 | 2026-04-20 23:28:10 | Introduces K2.6's coding improvements. |
| Kimi K2.7 Code | [2065377579130142937](https://x.com/Kimi_Moonshot/status/2065377579130142937) | 2026-06-12 10:16:02 | 2026-06-12 18:16:02 | Announces the release and open sourcing of K2.7 Code; this is the user's supplied post. |
| Kimi K3 | [2077830229968683203](https://x.com/Kimi_Moonshot/status/2077830229968683203) | 2026-07-16 18:58:25 | 2026-07-17 02:58:25 | Introduces K3 and its multimodal, million-token context capabilities. |

## Remaining gaps

- **Kimi-Dev:** Grok did not verify an exact original `@Kimi_Moonshot` June 2025 announcement. X's syndication responses independently confirm a [researcher introduction](https://x.com/yang_zonghan/status/1934652763985838585) by `yang_zonghan` on June 16 at 16:42:17 UTC and a [later official research backstory](https://x.com/Kimi_Moonshot/status/1977518651831095696) on October 12 at 23:36:01 UTC. These separate milestones are not substituted for the lab's original model announcement. Its X field remains unset.
- **Kimi K2.8 Preview:** Grok did not verify an exact official launch post around September 11, 2026. The existing [Kimi Code changelog](https://www.kimi.com/code/docs/en/kimi-code/whats-new.html) remains the recorded source. Its X field remains unset.

These are unresolved searches, not claims that no such posts exist.

## Data and UI behavior

Only eight `announcement_x_url` fields were added to the model data. All ten model IDs, descriptions, channels, event dates, event sources, and availability claims remain unchanged. The file's general release-research date remains October 17 because this pass audits announcement links rather than refreshing all releases.

The existing UI derives verified posting times from the linked status IDs. In UTC+8, K3's announcement card now shows **July 17, 02:58**, while its original July 16 source date remains recorded. X post times do not supply availability timestamps. No UI code change was necessary.

`AGENTS.md` now requires Grok CLI discovery, independent post verification, and saving accepted links into the model data as well as research notes.

## Validation

- All 106 existing tests pass; TypeScript and the production build pass.
- A comparison against the original JSON confirms that only the eight announcement-link fields changed.
- Browser verification of the production-build preview confirms eight enabled Moonshot X links and two explicitly unavailable links, K2.7 Code's exact supplied permalink and 18:16 UTC+8 posting time, K3's July 17 announcement date, and preservation of separate availability evidence.
- Search updates the URL, and the filtered K2.7 Code URL survives reload and opens its release details.

This change is local and has not been deployed.
