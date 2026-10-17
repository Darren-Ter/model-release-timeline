# Release-data check — October 17, 2026

Checked recent releases across the **nine existing labs**, as requested. Added **two missing records**, taking the local dataset from 271 to **273**. All 271 existing records, including the unfinished Qwen catalog work, are preserved. Each lab's research date is now October 17; this is a recent-release check, not a new audit of its entire history.

The scope remains text, reasoning, coding, and general-purpose multimodal models. Meta, Mistral, and other additional labs are outside this update by user preference. Standalone media models, API tools, processing modes, retirements, and application versions do not become model launches.

## Added records

### DeepSeek-V4.1-Flash-1017

- Record ID: `deepseek-v4-1-flash-1017`; kind: **Dated update**.
- The [official changelog](https://api-docs.deepseek.com/updates/) explicitly dates the named update to **October 17, 2026**. This is a separate dated model update to the September 10 V4.1-Flash record.
- The [official launch article](https://api-docs.deepseek.com/news/news261017/), verified in the browser, documents web, app, and API access and links downloadable weights on [Hugging Face](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) and ModelScope. Announcement and first documented access use October 17. The `deepseek-flash` API alias serves this version.
- The exact [official announcement post](https://x.com/deepseek_ai/status/2111375640717033777) was verified through X's first-party syndication response: author `deepseek_ai`, post ID `2111375640717033777`, created at **2026-10-17 08:35:54 UTC / 16:35:54 UTC+8**, with launch-identifying text. The app decodes the same announcement time from the post ID.
- Availability remains date-only. Neither the X post time nor the model repository's creation time is treated as an exact first-access timestamp. Search & Fetch, announced alongside the model, is an API feature and receives no model record.

### Gemini 4 Argon

- Record ID: `gemini-4-argon`; kind: **Model release**.
- Google's [September 30 announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/) documents the initial rollout to trusted cyber defenders through the **Fairwind Program**. September 30 is both the announcement and first documented limited-access date.
- Google's [October 13 launch article](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/) and [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) document subsequent public availability. The second availability event is marked `is_first_availability: false`; the public rollout does not replace the earlier date or create a duplicate model.
- Current API identification is corroborated by the [Gemini 4 Argon model documentation](https://ai.google.dev/gemini-api/docs/models/gemini-4-argon). Consumer and Antigravity subscription restrictions are stated in the record's notes.
- No exact official X announcement post was verified. The X link stays unset and event dates remain date-only.

## Coverage checked

| Lab | Sources checked | Result |
| --- | --- | --- |
| OpenAI | [API changelog](https://developers.openai.com/api/docs/changelog), [product changelog](https://learn.chatgpt.com/docs/changelog) | GPT-6.1 Sol and the October chat-latest update are already present. October 15–16 Live integrations and voices, Ultrafast, and Codex releases do not establish another in-scope model. |
| Anthropic | [Claude Platform release notes](https://platform.claude.com/docs/en/release-notes/overview) | Haiku 5.5, Sonnet 5.5, and Opus 5.5 are already present. October 15 Opus 5.5 Fast mode availability is a processing-mode update. |
| Google DeepMind | [API changelog](https://ai.google.dev/gemini-api/docs/changelog), both Argon launch articles | Added Argon, including its previously missed September limited release. Nano Banana 2.1 and standalone speech releases remain outside scope. |
| xAI | [API release notes](https://docs.x.ai/developers/release-notes) | Grok 4.7 is already present. October 14 Grok Voice 3.0 is a standalone speech model. |
| DeepSeek | [Changelog](https://api-docs.deepseek.com/updates/), launch article, official X post, model repository metadata | Added V4.1-Flash-1017. Its original V4.1-Flash record remains intact. |
| Alibaba Qwen | [Rendered official research index](https://qwen.ai/research), read in the browser | The latest listed general-purpose release remains September 18 Qwen3.8-Omni-Flash, already present. Image and LiveTranslate entries are outside scope; no Qwen4 launch is inferred from speculation. |
| Moonshot AI | [Kimi Code updates](https://www.kimi.com/code/docs/en/kimi-code/whats-new.html) | K2.8 Preview is already present. October 14 desktop and CLI releases are application updates. |
| MiniMax | [Code changelog](https://agent.minimax.io/docs/changelog), [text model guide](https://platform.minimax.io/docs/guides/text-generation) | M3.1-Flash-Preview is already present. October 17 Code v3.1.2 describes application features, not a new named model. |
| Z.ai | [Model release notes](https://docs.z.ai/release-notes/new-released), [rendered GLM-Legal article](https://z.ai/blog/glm-legal) | GLM-Legal is already present with its October 12 announcement. The article still invites beta API applications and describes AutoClaw integration as forthcoming; no first-access date is inferred. |

The public [OpenRouter model catalog](https://openrouter.ai/api/v1/models) was also checked for newly listed entries from these nine labs. Catalog timestamps are discovery signals, not original launch dates. The two additions above use vendor evidence for their dates and access claims.

No further qualifying release was found in the sources checked. This does not establish complete coverage of private previews or every regional rollout. Existing historical date disputes remain unchanged.

## Validation and publication

- All **106 existing tests pass**, including validation and loading of every data record and Worker routing checks.
- TypeScript and the production build pass. Vite reports its existing large-chunk advisory.
- A comparison against the pre-edit files confirms all 271 previous model records are unchanged; only two model records were added.
- Browser checks of the production-build preview confirm 273 records, the October 17 research date, both searchable additions, DeepSeek's official X time, and Argon's separate September 30 and October 13 availability events.
- Changes are saved locally. **No production deployment was performed.**
