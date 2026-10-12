# Release-data refresh — October 12, 2026

Reviewed the nine existing labs for releases in the four weeks from September 14 through October 12, 2026, including gaps in the September 25 inventory. Added **six records**, bringing the dataset from 220 to **226**. Research dates are updated for all nine files; existing IDs and historical event dates remain intact.

This is a refresh of the timeline's text, reasoning, and coding scope, including general-purpose multimodal models used for these tasks. Standalone image, video, speech, embedding, and moderation models remain outside that scope. A dated alias update is labeled separately from a model release. Exact launch times are not inferred from date-only documentation.

## Added records

| Record | Announcement | First documented access | Evidence and access scope |
| --- | --- | --- | --- |
| Claude Haiku 5.5 | October 7 | October 7 | [Launch article](https://www.anthropic.com/claude-haiku-5-5) and [API release notes](https://platform.claude.com/docs/en/release-notes/overview) identify the model and API, Bedrock, Google Cloud, and Microsoft Foundry availability. |
| chat-latest (October 2026 update) | October 7 | October 7 | [API changelog](https://developers.openai.com/api/docs/changelog): a rolling API snapshot update. No pinned snapshot or underlying model identity is supplied; no separate ChatGPT launch is inferred. |
| GPT-6.1 Sol | September 29 | September 29 | [API changelog](https://developers.openai.com/api/docs/changelog) dates the model release; the [product changelog](https://learn.chatgpt.com/docs/changelog) separately dates Codex and ChatGPT Work access, subject to plan and workspace settings. |
| Claude Sonnet 5.5 | September 28 | September 28 | [Launch article](https://www.anthropic.com/claude-sonnet-5-5) and [API release notes](https://platform.claude.com/docs/en/release-notes/overview) establish hosted launch access. |
| MiniMax M3.1-Flash-Preview | September 27 | September 27 | The [official MiniMax Agent post](https://x.com/MiniMaxAgent/status/2104079819881517400), viewed in the browser, explicitly announces its MiniMax Code debut. The [September 28 Code changelog](https://agent.minimax.io/docs/changelog) corroborates the preview. The [current API guide](https://platform.minimax.io/docs/guides/text-generation) establishes subscription API access, which is listed as a current channel without inventing its first-access date. |
| Qwen3.8-Omni-Flash | September 18 | September 18 | The [rendered launch article](https://qwen.ai/blog?id=qwen3.8-omni-flash), viewed in the browser because the text fetch returns an empty page, gives September 18 and says the hosted model is available. It covers coding, knowledge work, tool use, and multimodal reasoning. Open-source companion tools do not establish open model weights. |

MiniMax's separate Token Plan post displays September 28 in the browser's local time. The initial Code debut is September 27, so a later subscription announcement or September 28 app changelog does not move the model's initial event. No exact clock time is assigned to availability.

## Coverage checked

| Lab | Official sources reviewed | Result within the current scope |
| --- | --- | --- |
| OpenAI | [API changelog](https://developers.openai.com/api/docs/changelog), [product changelog](https://learn.chatgpt.com/docs/changelog) | Added GPT-6.1 Sol and the October chat-latest update. Ultrafast processing and the Decisions API are features of existing models, not additional model launches. |
| Anthropic | [Newsroom](https://www.anthropic.com/news), [API release notes](https://platform.claude.com/docs/en/release-notes/overview), linked launch articles | Added Sonnet 5.5 and Haiku 5.5. Opus 5.5 was already included. |
| Google DeepMind | [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) | No missing text, reasoning, or coding launch found. September voice/TTS and October Nano Banana image releases are outside the scope. Deprecations do not become new releases. |
| xAI | [API release notes](https://docs.x.ai/developers/release-notes) | Grok 4.7 was already included. Its Fast option is the same model, not an additional foundational release. Speech model updates and retirements are outside the scope. |
| DeepSeek | [API changelog](https://api-docs.deepseek.com/updates/) | Latest listed model release is September 10 V4.1-Flash, already included. No newer named release found in the reviewed primary sources. |
| Alibaba Qwen | [Research index](https://qwen.ai/research/qwen3.8-livetranslate), [Omni launch article](https://qwen.ai/blog?id=qwen3.8-omni-flash), [official model repository](https://github.com/QwenLM/Qwen3.8) | Added the missing September 18 Omni-Flash model. Specialized Realtime voice, LiveTranslate, and Qwen-Image releases are excluded; no open-weight availability is inferred. |
| Moonshot AI | [Kimi Code updates](https://www.kimi.com/en/help/kimi-code/whats-new) | K2.8 Preview was already included. Later CLI and app releases do not establish new named model launches. |
| MiniMax | [Code changelog](https://agent.minimax.io/docs/changelog), [official launch post](https://x.com/MiniMaxAgent/status/2104079819881517400), [API model guide](https://platform.minimax.io/docs/guides/text-generation) | Added M3.1-Flash-Preview; preview and subscription access are explicitly labeled. |
| Z.ai | [Model release notes](https://docs.z.ai/release-notes/new-released) | Latest listed launch remains August 26 GLM-5.3-Flash, already included. No new model found in the reviewed primary sources. |

## Limits and maintenance

The absence of a new record means no qualifying release was found in these sources, not proof that every private preview, regional rollout, or model snapshot has been captured. The historical disagreements documented in the [September 25 audit](release-data-audit-2026-09-25.md) remain unchanged. This dataset is maintained manually and is not a live feed.

Local setup uses Node.js 24 and npm, with a Node.js 22.12 minimum declared in `package.json`. Wrangler remains pinned, updated to 4.149.0 to resolve affected development dependencies; the source-map-js patch is also locked. The production route, asset base, and existing-site service binding are unchanged.

## Validation

A clean `npm ci` succeeds with zero reported vulnerabilities. All 43 existing data, rendering, and Worker routing tests pass; TypeScript and the production build pass. The account-check script verifies the approved Async Web Studio identity, and Wrangler's deployment dry run succeeds without publication.

Browser checks on the local UI confirm the 226-record count and October 12 research date, the new releases, search query updates, a filtered URL surviving reload, the GPT-6.1 Sol details and separate API/product source links, and Clear all retaining `/model-timeline/`. Production publication uses the checked-in `npm run deploy` account, test, and build checks, followed by `node scripts/verify-deployment.mjs` and browser verification.
