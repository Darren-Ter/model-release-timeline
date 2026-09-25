# Release-data audit — September 25, 2026

Scope: all **220 existing records across nine labs**. Reviewed the linked official launch articles, release notes, research indexes, and model repositories for model identity, descriptions, event dates, and access claims. This is an audit of the existing inventory, not a claim that every model or rollout is included.

**18 records corrected or clarified; 11 announcement dates changed.** The September 25 GLM-5.3-Flash card used a later AutoClaw overview. The original [Z.ai launch article](https://z.ai/blog/glm-5.3-flash) and [release notes](https://docs.z.ai/release-notes/new-released) date its release to August 26, 2026.

## Method and limits

- Prefer an explicit release event over an article publication timestamp, repository creation date, report date, or model snapshot suffix. Read Qwen's rendered article headings: several raw HTML metadata dates differ from the visible dates.
- Preserve the dataset's UTC+8 conversion only where an exact source timestamp is established. Date-only sources retain their stated calendar day; a one-day difference is not automatically an error.
- Separate announcements, hosted access, open-weight uploads, public beta, general availability, and later platform access. A promise of future weights is not an availability event.
- A dated article saying a model is available establishes access by that date, not necessarily the exact start of its rollout. A repository upload proves an artifact date, not its first public visibility.
- Retained below means no correction was identified in the reviewed evidence. It does not certify an exhaustive history or current access; models can later be suspended or retired.
- Two records retain a visible date caveat: **GLM-4-Plus** and **Qwen3.6-35B-A3B**. Details below.

## Corrections and clarifications

| Model | Announcement before → after | Access before → after | Rationale |
|---|---|---|---|
| [Claude Mythos 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1) | 2026-09-01 → 2026-09-01 | 2026-09-01 → 2026-09-01 | Trusted-access programs cover cybersecurity and life sciences; not just Project Glasswing. Date sourced to API release notes. |
| [GLM-4](https://www.zhipuai.cn/zh/news/8) | 2024-01-25 → 2024-01-16 | Not documented → Not documented | DevDay report explicitly identifies January 16, irrespective of its later publication date. |
| [GLM-4-9B](https://github.com/zai-org/GLM-4#project-updates) | 2024-06-18 → 2024-06-05 | 2024-06-18 → 2024-06-05 | June 5 is the model release; June 18 is the technical report. |
| [GLM-4-Plus](https://z.ai/company) | 2024-08-12 → 2024-08-12 | Not documented → Not documented | Retained company-timeline date with a visible uncertainty flag and separate launch-report link. |
| [GLM-5.3](https://huggingface.co/zai-org/GLM-5.3) | 2026-08-14 → 2026-08-14 | Not documented → 2026-08-18 | Primary research index replaces the secondary announcement citation; August 18 API access recorded separately. |
| [GLM-5.3-Flash](https://z.ai/blog/glm-5.3-flash) | 2026-09-25 → 2026-08-26 | Not documented → 2026-08-26 | Original August launch replaces the September overview; documented launch access added. |
| [MiniMax M3](https://www.minimax.io/blog/minimax-m3) | 2026-06-01 → 2026-06-01 | 2026-06-01 → 2026-06-01 | Hosted June 1; weights are present in the June 12 repository commit. Removed weights from launch-day access. |
| [chat-latest (August 2026 update)](https://developers.openai.com/api/docs/changelog) | 2026-08-06 → 2026-08-06 | 2026-08-06 → 2026-08-06 | Removed unsupported identification as GPT-5.6 Sol and a same-day ChatGPT rollout; the source establishes a rolling API update. |
| [Qwen3-Max-Thinking](https://qwen.ai/blog?id=qwen3-max-thinking) | 2026-01-25 → 2026-01-26 | 2026-01-25 → 2026-01-26 | Rendered launch article says January 26. |
| [Qwen3-Coder-Next](https://qwen.ai/blog?id=qwen3-coder-next) | 2026-02-02 → 2026-02-03 | 2026-02-02 → 2026-02-03 | Rendered launch article says February 3. |
| [Qwen3.5-397B-A17B](https://qwen.ai/blog?id=qwen3.5) | 2026-02-15 → 2026-02-16 | 2026-02-16 → 2026-02-16 | Both the rendered article and repository say February 16. |
| [Qwen3.5-Plus](https://qwen.ai/blog?id=qwen3.5) | 2026-02-15 → 2026-02-16 | 2026-02-15 → 2026-02-16 | Hosted launch is in the February 16 article. |
| [Qwen3.6-35B-A3B](https://qwen.ai/blog?id=qwen3.6-35b-a3b) | 2026-04-16 → 2026-04-15 | 2026-04-16 → 2026-04-16 | Article says April 15; repository says April 16. Both are retained with a caveat. |
| [Qwen3.6-27B](https://qwen.ai/blog?id=qwen3.6-27b) | 2026-04-21 → 2026-04-22 | 2026-04-21 → 2026-04-22 | Rendered article and repository both say April 22. |
| [Qwen3.8-Max](https://qwen.ai/blog?id=qwen3.8) | 2026-08-02 → 2026-08-03 | 2026-08-02 → 2026-08-03 | Hosted launch August 3; weights August 12. Weights removed from the initial access event. |
| [Grok Build 0.1](https://x.ai/news/grok-build-0-1) | 2026-05-29 → 2026-05-19 | 2026-05-29 → 2026-05-19 | May 19 changelog names the model in early access; May 29 public API beta remains a later event. |
| [Grok 4.20](https://docs.x.ai/developers/release-notes) | 2026-03-10 → 2026-03-10 | 2026-03-10 → 2026-03-10 | Explicitly scoped to the API release; not asserted to date the initial consumer beta. |
| [Grok 3](https://x.ai/news/grok-3) | 2025-02-19 → 2025-02-19 | 2025-04-03 → 2025-02-19 | February blog documents consumer access; April 3 is the subsequent API release. |

## Remaining source differences

- **GLM-4-Plus:** [Z.ai's company timeline](https://z.ai/company) lists August 12, 2024. The [separate launch report](https://www.zhipuai.cn/zh/news/69) describes the later KDD launch and has a September 12 publication date. Neither resolves an exact first-access day. The retained timeline date is explicitly uncertain.
- **Qwen3.6-35B-A3B:** the [rendered article](https://qwen.ai/blog?id=qwen3.6-35b-a3b) is dated April 15 and describes access as live; the [official repository](https://github.com/QwenLM/Qwen3.8/blob/main/README.md) dates the weight release April 16. Separate sourced dates and a visible caveat preserve the discrepancy.
- **Qwen3.6-Max-Preview:** its April 18 article gives inconsistent API-readiness statements. The entry keeps only an announcement; availability is shown as not documented.
- **GPT-5.1-Codex-Max and codex-mini-latest:** existing notes preserve earlier changelog availability versus later launch articles. A later article does not move the earlier access event.
- **Grok 3 and Grok 4.20:** the cited dated sources establish the blog/API milestones. They do not establish the earliest consumer livestream or beta access day; the records and UI now make that scope explicit.
- **MiniMax M3:** the [June 12 commit](https://huggingface.co/MiniMaxAI/MiniMax-M3/commit/3a41b311ffa5719cef48fed3974ccf2cc03733ea) includes weight files. The June 1 article only promised them later.

## UI correction

A missing event previously inherited the other date, so the details panel could label an announcement as first availability (or platform access as a new model launch). The timeline retains its position fallback but labels it on the card and explains it in the chart. Details show missing dates as **Not documented**, distinguish **Recorded access** from **First documented access**, and show source disagreement. Availability cards no longer borrow an announcement's clock time.

## Complete reviewed inventory

Validation: 36 tests passed, including loading every record from all nine files, corrected-date regressions, staged weight releases, date caveats, and missing-event rendering. TypeScript and the production build passed. Browser checks confirmed the August 26 GLM-5.3-Flash card without a New badge, its source links, and the uncertain-date/missing-access presentation.

Dates below are actual recorded event types, without the UI positioning fallback. “Access” is first documented access where marked, otherwise the earliest recorded availability. Follow each record's event links for the precise channel and date scope.

### Anthropic (25)

| Model | Announcement | Access | Result | Sources |
|---|---|---|---|---|
| Claude Opus 5.5 | 2026-09-22 | 2026-09-22 | Retained | [1](https://www.anthropic.com/claude-opus-5-5) |
| Claude Fable 5.1 | 2026-09-01 | 2026-09-01 | Retained | [1](https://www.anthropic.com/claude-fable-and-mythos-5-1) |
| Claude Mythos 5.1 | 2026-09-01 | 2026-09-01 | Corrected / clarified | [1](https://www.anthropic.com/claude-fable-and-mythos-5-1), [2](https://platform.claude.com/docs/en/release-notes/overview) |
| Claude Opus 5 | 2026-07-24 | 2026-07-24 | Retained | [1](https://www.anthropic.com/news/claude-opus-5) |
| Claude Sonnet 5 | 2026-06-30 | 2026-06-30 | Retained | [1](https://www.anthropic.com/news/claude-sonnet-5) |
| Claude Fable 5 | 2026-06-09 | 2026-06-09 | Retained | [1](https://www.anthropic.com/news/claude-fable-5-mythos-5) |
| Claude Mythos 5 | 2026-06-09 | 2026-06-09 | Retained | [1](https://www.anthropic.com/news/claude-fable-5-mythos-5) |
| Claude Opus 4.8 | 2026-05-28 | 2026-05-28 | Retained | [1](https://www.anthropic.com/news/claude-opus-4-8) |
| Claude Opus 4.7 | 2026-04-16 | 2026-04-16 | Retained | [1](https://www.anthropic.com/news/claude-opus-4-7) |
| Claude Mythos Preview | 2026-04-07 | 2026-04-07 | Retained | [1](https://platform.claude.com/docs/en/release-notes/overview) |
| Claude Sonnet 4.6 | 2026-02-17 | 2026-02-17 | Retained | [1](https://www.anthropic.com/news/claude-sonnet-4-6) |
| Claude Opus 4.6 | 2026-02-06 | 2026-02-05 | Retained | [1](https://www.anthropic.com/news/claude-opus-4-6), [2](https://x.com/claudeai/status/2019467372609040752) |
| Claude Opus 4.5 | 2025-11-24 | 2025-11-24 | Retained | [1](https://www.anthropic.com/news/claude-opus-4-5) |
| Claude Haiku 4.5 | 2025-10-15 | 2025-10-15 | Retained | [1](https://www.anthropic.com/news/claude-haiku-4-5) |
| Claude Sonnet 4.5 | 2025-09-29 | 2025-09-29 | Retained | [1](https://www.anthropic.com/news/claude-sonnet-4-5) |
| Claude Opus 4.1 | 2025-08-05 | 2025-08-05 | Retained | [1](https://www.anthropic.com/news/claude-opus-4-1) |
| Claude Opus 4 | 2025-05-22 | 2025-05-22 | Retained | [1](https://www.anthropic.com/news/claude-4) |
| Claude Sonnet 4 | 2025-05-22 | 2025-05-22 | Retained | [1](https://www.anthropic.com/news/claude-4) |
| Claude 3.7 Sonnet | 2025-02-25 | 2025-02-24 | Retained | [1](https://www.anthropic.com/news/claude-3-7-sonnet), [2](https://x.com/AnthropicAI/status/1894092430560965029) |
| Claude 3.5 Haiku | 2024-10-22 | 2024-11-04 | Retained | [1](https://platform.claude.com/docs/en/release-notes/overview), [2](https://www.anthropic.com/news/3-5-models-and-computer-use) |
| Claude 3.5 Sonnet (October) | 2024-10-22 | 2024-10-22 | Retained | [1](https://www.anthropic.com/news/3-5-models-and-computer-use) |
| Claude 3.5 Sonnet (June) | 2024-06-20 | 2024-06-20 | Retained | [1](https://www.anthropic.com/news/claude-3-5-sonnet), [2](https://x.com/AnthropicAI/status/1803790676988920098) |
| Claude 3 Haiku | 2024-03-04 | 2024-03-13 | Retained | [1](https://www.anthropic.com/news/claude-3-haiku), [2](https://x.com/AnthropicAI/status/1764653830468428150) |
| Claude 3 Opus | 2024-03-04 | 2024-03-04 | Retained | [1](https://www.anthropic.com/news/claude-3-family), [2](https://x.com/AnthropicAI/status/1764653830468428150) |
| Claude 3 Sonnet | 2024-03-04 | 2024-03-04 | Retained | [1](https://www.anthropic.com/news/claude-3-family), [2](https://x.com/AnthropicAI/status/1764653830468428150) |

### DeepSeek (22)

| Model | Announcement | Access | Result | Sources |
|---|---|---|---|---|
| DeepSeek-V2 | Not documented | 2024-05-06 | Retained | [1](https://github.com/deepseek-ai/DeepSeek-V2) |
| DeepSeek-V2-Lite | Not documented | 2024-05-16 | Retained | [1](https://github.com/deepseek-ai/DeepSeek-V2) |
| DeepSeek-V2-0517 | Not documented | 2024-05-17 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-Coder-V2-0614 | Not documented | 2024-06-14 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-V2-0628 | Not documented | 2024-06-28 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-Coder-V2-0724 | Not documented | 2024-07-24 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-V2.5 | Not documented | 2024-09-05 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-V2.5-1210 | Not documented | 2024-12-10 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-V3 | Not documented | 2024-12-26 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-R1 | Not documented | 2025-01-20 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-V3-0324 | Not documented | 2025-03-24 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-R1-0528 | Not documented | 2025-05-28 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-V3.1 | Not documented | 2025-08-21 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-V3.1-Terminus | Not documented | 2025-09-22 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-V3.2-Exp | Not documented | 2025-09-29 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-V3.2 | Not documented | 2025-12-01 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-V3.2-Speciale | Not documented | 2025-12-01 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-V4-Flash | Not documented | 2026-04-24 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-V4-Pro | Not documented | 2026-04-24 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-V4-Flash-Vision-Exp | Not documented | 2026-08-21 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-V4.1-Flash | Not documented | 2026-09-10 | Retained | [1](https://api-docs.deepseek.com/updates/) |
| DeepSeek-R1-Lite-Preview | 2024-11-20 | 2024-11-20 | Retained | [1](https://www.deepseek.com/en/news/r1-lite-preview/) |

### Z.ai (16)

| Model | Announcement | Access | Result | Sources |
|---|---|---|---|---|
| GLM-4-32B-0414 | Not documented | 2025-04-14 | Retained | [1](https://huggingface.co/zai-org/GLM-4-32B-0414), [2](https://huggingface.co/zai-org/GLM-4-32B-0414/commits/main) |
| GLM-Z1-32B-0414 | Not documented | 2025-04-14 | Retained | [1](https://huggingface.co/zai-org/GLM-Z1-32B-0414), [2](https://huggingface.co/zai-org/GLM-Z1-32B-0414/commits/main) |
| GLM-4.6 | Not documented | 2025-09-30 | Retained | [1](https://huggingface.co/zai-org/GLM-4.6), [2](https://huggingface.co/zai-org/GLM-4.6/commits/main) |
| GLM-4.7-Flash | Not documented | 2026-01-19 | Retained | [1](https://huggingface.co/zai-org/GLM-4.7-Flash), [2](https://huggingface.co/zai-org/GLM-4.7-Flash/commits/main) |
| GLM-5 | Not documented | 2026-02-11 | Retained | [1](https://huggingface.co/zai-org/GLM-5), [2](https://huggingface.co/zai-org/GLM-5/commits/main) |
| GLM-5.1 | Not documented | 2026-04-07 | Retained | [1](https://huggingface.co/zai-org/GLM-5.1), [2](https://huggingface.co/zai-org/GLM-5.1/commits/main) |
| GLM-5.3-Flash | 2026-08-26 | 2026-08-26 | Corrected / clarified | [1](https://z.ai/blog/glm-5.3-flash) |
| GLM-5.3 | 2026-08-14 | 2026-08-18 | Corrected / clarified | [1](https://huggingface.co/zai-org/GLM-5.3), [2](https://www.zhipuai.cn/zh/research), [3](https://docs.z.ai/release-notes/new-released) |
| GLM-5.2 | 2026-06-16 | 2026-06-16 | Retained | [1](https://z.ai/blog/glm-5.2) |
| GLM-4.7 | 2025-12-22 | 2025-12-22 | Retained | [1](https://z.ai/blog/glm-4.7) |
| GLM-4.5 | 2025-07-28 | 2025-07-28 | Retained | [1](https://z.ai/blog/glm-4.5) |
| GLM-4.5-Air | 2025-07-28 | 2025-07-28 | Retained | [1](https://z.ai/blog/glm-4.5) |
| GLM-Zero-Preview | 2024-12-20 | Not documented | Retained | [1](https://z.ai/company) |
| GLM-4-Plus | 2024-08-12 | Not documented | Date caveat | [1](https://z.ai/company) |
| GLM-4-9B | 2024-06-05 | 2024-06-05 | Corrected / clarified | [1](https://github.com/zai-org/GLM-4#project-updates) |
| GLM-4 | 2024-01-16 | Not documented | Corrected / clarified | [1](https://www.zhipuai.cn/zh/news/8) |

### Google DeepMind (23)

| Model | Announcement | Access | Result | Sources |
|---|---|---|---|---|
| Gemini 1.0 Ultra | Not documented | 2024-02-08 | Retained | [1](https://blog.google/products-and-platforms/products/gemini/bard-gemini-advanced-app/) |
| Gemini 3.8 Flash Cyber | 2026-09-02 | 2026-09-02 | Retained | [1](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/) |
| Gemini 3.8 Flash | 2026-09-02 | 2026-09-02 | Retained | [1](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/) |
| Gemini 3.7 Flash | 2026-08-13 | 2026-08-13 | Retained | [1](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/) |
| Gemini 3.6 Flash | 2026-07-21 | 2026-07-21 | Retained | [1](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/) |
| Gemini 3.5 Flash-Lite | 2026-07-21 | 2026-07-21 | Retained | [1](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/) |
| Gemini 3.5 Flash Cyber | 2026-07-21 | Not documented | Retained | [1](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/) |
| Gemini 3.5 Flash | 2026-05-19 | 2026-05-19 | Retained | [1](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/) |
| Gemini 3.1 Flash-Lite | 2026-03-03 | 2026-03-03 | Retained | [1](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-lite/) |
| Gemini 3.1 Pro | 2026-02-19 | 2026-02-19 | Retained | [1](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/) |
| Gemini 3 Flash | 2025-12-17 | 2025-12-17 | Retained | [1](https://blog.google/products-and-platforms/products/gemini/gemini-3-flash/) |
| Gemini 3 Pro | 2025-11-18 | 2025-11-18 | Retained | [1](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-3-developers/) |
| Gemini 2.5 Flash-Lite | 2025-06-17 | 2025-06-17 | Retained | [1](https://blog.google/products-and-platforms/products/gemini/gemini-2-5-model-family-expands/) |
| Gemini 2.5 Flash | 2025-04-09 | 2025-04-17 | Retained | [1](https://blog.google/products-and-platforms/products/gemini/gemini-2-5-flash-preview/), [2](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/google-cloud-next-2025-sundar-pichai-keynote/), [3](https://blog.google/products-and-platforms/products/gemini/gemini-2-5-model-family-expands/) |
| Gemini 2.5 Pro | 2025-03-25 | 2025-03-25 | Retained | [1](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-model-thinking-updates-march-2025/), [2](https://blog.google/products-and-platforms/products/gemini/gemini-2-5-model-family-expands/) |
| Gemini 2.0 Pro Experimental | 2025-02-05 | 2025-02-05 | Retained | [1](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-model-updates-february-2025/) |
| Gemini 2.0 Flash-Lite | 2025-02-05 | 2025-02-05 | Retained | [1](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-model-updates-february-2025/) |
| Gemini 2.0 Flash | 2024-12-11 | 2024-12-11 | Retained | [1](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/google-gemini-ai-update-december-2024/), [2](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-model-updates-february-2025/) |
| Gemini 1.5 Pro-002 | 2024-09-24 | 2024-09-24 | Retained | [1](https://developers.googleblog.com/en/updated-production-ready-gemini-models-reduced-15-pro-pricing-increased-rate-limits-and-more/) |
| Gemini 1.5 Flash-002 | 2024-09-24 | 2024-09-24 | Retained | [1](https://developers.googleblog.com/en/updated-production-ready-gemini-models-reduced-15-pro-pricing-increased-rate-limits-and-more/) |
| Gemini 1.5 Flash-8B | 2024-08-27 | 2024-08-27 | Retained | [1](https://developers.googleblog.com/en/gemini-15-flash-8b-is-now-generally-available-for-use/), [2](https://ai.google.dev/gemini-api/docs/changelog), [3](https://developers.googleblog.com/en/updated-production-ready-gemini-models-reduced-15-pro-pricing-increased-rate-limits-and-more/) |
| Gemini 1.5 Flash | 2024-05-14 | 2024-05-14 | Retained | [1](https://blog.google/innovation-and-ai/products/google-gemini-update-flash-ai-assistant-io-2024/) |
| Gemini 1.5 Pro | 2024-02-15 | 2024-02-15 | Retained | [1](https://blog.google/innovation-and-ai/products/google-gemini-next-generation-model-february-2024/), [2](https://blog.google/innovation-and-ai/products/google-gemini-update-flash-ai-assistant-io-2024/) |

### Moonshot AI (10)

| Model | Announcement | Access | Result | Sources |
|---|---|---|---|---|
| Kimi K2.8 Preview | 2026-09-11 | 2026-09-11 | Retained | [1](https://www.kimi.com/code/docs/en/kimi-code/whats-new.html) |
| Kimi K3 | 2026-07-16 | 2026-07-16 | Retained | [1](https://www.kimi.com/en/blog/kimi-k3) |
| Kimi K2.7 Code | 2026-06-12 | 2026-06-12 | Retained | [1](https://www.kimi.com/code/docs/en/kimi-code/whats-new.html) |
| Kimi K2.6 | 2026-04-20 | 2026-04-20 | Retained | [1](https://www.kimi.com/en/blog/kimi-k2-6) |
| Kimi K2.5 | 2026-01-27 | 2026-01-27 | Retained | [1](https://www.kimi.com/en/blog/kimi-k2-5) |
| Kimi K2 Thinking | 2025-11-06 | 2025-11-06 | Retained | [1](https://www.kimi.com/en/blog/kimi-k2-thinking) |
| Kimi-K2-Instruct-0905 | 2025-09-05 | Not documented | Retained | [1](https://www.kimi.com/en/blog/) |
| Kimi K2 | 2025-07-11 | 2025-07-11 | Retained | [1](https://www.kimi.com/en/blog/kimi-k2) |
| Kimi-Dev | 2025-06-17 | Not documented | Retained | [1](https://www.kimi.com/en/blog/) |
| Kimi K1.5 | 2025-01-20 | Not documented | Retained | [1](https://www.kimi.com/en/blog/) |

### MiniMax (7)

| Model | Announcement | Access | Result | Sources |
|---|---|---|---|---|
| MiniMax M3 | 2026-06-01 | 2026-06-01 | Corrected / clarified | [1](https://www.minimax.io/blog/minimax-m3), [2](https://huggingface.co/MiniMaxAI/MiniMax-M3/commit/3a41b311ffa5719cef48fed3974ccf2cc03733ea) |
| MiniMax M2.7 | 2026-03-18 | 2026-03-18 | Retained | [1](https://www.minimax.io/news/minimax-m27-en) |
| MiniMax M2.5 | 2026-02-12 | 2026-02-12 | Retained | [1](https://www.minimax.io/news/minimax-m25) |
| MiniMax M2.1 | 2025-12-23 | 2025-12-23 | Retained | [1](https://www.minimax.io/blog/minimax-m21) |
| MiniMax M2 | 2025-10-27 | 2025-10-27 | Retained | [1](https://www.minimax.io/blog/minimax-m2-en-1748600000) |
| MiniMax-M1 | 2025-06-16 | 2025-06-16 | Retained | [1](https://www.minimax.io/news/minimaxm1) |
| MiniMax-Text-01 | 2025-01-15 | 2025-01-15 | Retained | [1](https://www.minimax.io/news/minimax-01-series-2) |

### OpenAI (78)

| Model | Announcement | Access | Result | Sources |
|---|---|---|---|---|
| GPT-6 Luna | 2026-09-22 | 2026-09-22 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| GPT-6 Sol | 2026-09-22 | 2026-09-22 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| GPT-6 Pro | 2026-09-05 | 2026-09-04 | Retained | [1](https://x.com/OpenAI/status/2095998532692140283) |
| GPT-6 Astra | 2026-09-03 | 2026-09-03 | Retained | [1](https://openai.com/index/gpt-6-astra/), [2](https://x.com/OpenAI/status/2095968413646737608) |
| GPT-5.6 Cyber | 2026-08-07 | 2026-08-07 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| chat-latest (August 2026 update) | 2026-08-06 | 2026-08-06 | Corrected / clarified | [1](https://developers.openai.com/api/docs/changelog) |
| GPT-5.6 Luna | 2026-06-26 | 2026-06-26 | Retained | [1](https://openai.com/index/previewing-gpt-5-6-sol/), [2](https://developers.openai.com/api/docs/changelog) |
| GPT-5.6 Sol | 2026-06-26 | 2026-06-26 | Retained | [1](https://openai.com/index/previewing-gpt-5-6-sol/), [2](https://developers.openai.com/api/docs/changelog) |
| GPT-5.6 Terra | 2026-06-26 | 2026-06-26 | Retained | [1](https://openai.com/index/previewing-gpt-5-6-sol/), [2](https://developers.openai.com/api/docs/changelog) |
| Chat latest (June snapshot) | 2026-06-24 | 2026-06-24 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| GPT-5.5 Instant (May update) | 2026-05-28 | 2026-05-28 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| GPT-5.5 Instant / chat-latest | 2026-05-05 | 2026-05-05 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| GPT-5.5 | 2026-04-23 | 2026-04-23 | Retained | [1](https://openai.com/index/introducing-gpt-5-5/), [2](https://developers.openai.com/api/docs/changelog) |
| GPT-5.5-pro | 2026-04-23 | 2026-04-23 | Retained | [1](https://openai.com/index/introducing-gpt-5-5/), [2](https://developers.openai.com/api/docs/changelog) |
| GPT-Rosalind | 2026-04-16 | 2026-04-16 | Retained | [1](https://openai.com/index/introducing-gpt-rosalind/) |
| GPT-5.4-mini | 2026-03-17 | 2026-03-17 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| GPT-5.4-nano | 2026-03-17 | 2026-03-17 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| GPT-5.3 Instant (March update) | 2026-03-16 | 2026-03-16 | Retained | [1](https://help.openai.com/en/articles/9624314-model-release-notes) |
| GPT-5.4 | 2026-03-05 | 2026-03-05 | Retained | [1](https://openai.com/index/introducing-gpt-5-4/) |
| GPT-5.4-pro | 2026-03-05 | 2026-03-05 | Retained | [1](https://openai.com/index/introducing-gpt-5-4/) |
| GPT-5.3 Instant | 2026-03-03 | 2026-03-03 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| GPT-5.3 Codex Spark | 2026-02-12 | 2026-02-12 | Retained | [1](https://openai.com/index/introducing-gpt-5-3-codex-spark/) |
| GPT-5.2 Instant (February update) | 2026-02-10 | 2026-02-10 | Retained | [1](https://help.openai.com/en/articles/9624314-model-release-notes) |
| GPT-5.3 Codex | 2026-02-05 | 2026-02-05 | Retained | [1](https://learn.chatgpt.com/docs/changelog), [2](https://developers.openai.com/api/docs/changelog) |
| GPT-5.2 Codex | 2025-12-18 | 2025-12-18 | Retained | [1](https://learn.chatgpt.com/docs/changelog), [2](https://developers.openai.com/api/docs/changelog) |
| GPT-5.2 Instant | 2025-12-11 | 2025-12-11 | Retained | [1](https://openai.com/index/introducing-gpt-5-2/) |
| GPT-5.2 Pro | 2025-12-11 | 2025-12-11 | Retained | [1](https://openai.com/index/introducing-gpt-5-2/) |
| GPT-5.2 Thinking | 2025-12-11 | 2025-12-11 | Retained | [1](https://openai.com/index/introducing-gpt-5-2/) |
| GPT-5.1 Codex Max | 2025-11-19 | 2025-11-18 | Retained | [1](https://learn.chatgpt.com/docs/changelog), [2](https://openai.com/index/gpt-5-1-codex-max/), [3](https://developers.openai.com/api/docs/changelog) |
| GPT-5.1 Pro | 2025-11-19 | 2025-11-19 | Retained | [1](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) |
| GPT-5.1 Codex | 2025-11-13 | 2025-11-13 | Retained | [1](https://learn.chatgpt.com/docs/changelog) |
| GPT-5.1 Codex mini | 2025-11-13 | 2025-11-13 | Retained | [1](https://learn.chatgpt.com/docs/changelog) |
| GPT-5.1 Instant | 2025-11-12 | 2025-11-12 | Retained | [1](https://openai.com/index/gpt-5-1/), [2](https://developers.openai.com/api/docs/changelog) |
| GPT-5.1 Thinking | 2025-11-12 | 2025-11-12 | Retained | [1](https://openai.com/index/gpt-5-1/), [2](https://developers.openai.com/api/docs/changelog) |
| GPT-5 Codex mini | 2025-11-07 | 2025-11-07 | Retained | [1](https://learn.chatgpt.com/docs/changelog) |
| GPT-5 Instant (October update) | 2025-10-03 | 2025-10-03 | Retained | [1](https://help.openai.com/en/articles/9624314-model-release-notes) |
| GPT-5 Codex | 2025-09-15 | 2025-09-15 | Retained | [1](https://learn.chatgpt.com/docs/changelog), [2](https://developers.openai.com/api/docs/changelog) |
| GPT-5 | 2025-08-08 | 2025-08-07 | Retained | [1](https://openai.com/index/introducing-gpt-5-for-developers/), [2](https://x.com/OpenAI/status/1953504357821165774) |
| GPT-5 Instant | 2025-08-08 | 2025-08-07 | Retained | [1](https://openai.com/index/introducing-gpt-5/), [2](https://x.com/OpenAI/status/1953504357821165774) |
| GPT-5 Pro | 2025-08-08 | 2025-08-07 | Retained | [1](https://openai.com/index/introducing-gpt-5/), [2](https://x.com/OpenAI/status/1953504357821165774), [3](https://developers.openai.com/api/docs/changelog) |
| GPT-5-mini | 2025-08-07 | 2025-08-07 | Retained | [1](https://openai.com/index/introducing-gpt-5-for-developers/) |
| GPT-5-nano | 2025-08-07 | 2025-08-07 | Retained | [1](https://openai.com/index/introducing-gpt-5-for-developers/) |
| gpt-oss-120b | 2025-08-05 | 2025-08-05 | Retained | [1](https://openai.com/index/introducing-gpt-oss/) |
| gpt-oss-20b | 2025-08-05 | 2025-08-05 | Retained | [1](https://openai.com/index/introducing-gpt-oss/) |
| o3 deep research | 2025-06-24 | 2025-06-24 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| o4-mini deep research | 2025-06-24 | 2025-06-24 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| o3-pro | 2025-06-10 | 2025-06-10 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| Codex mini | 2025-05-16 | 2025-05-15 | Retained | [1](https://developers.openai.com/api/docs/changelog), [2](https://openai.com/index/introducing-codex/) |
| codex-1 | 2025-05-16 | 2025-05-16 | Retained | [1](https://openai.com/index/introducing-codex/) |
| GPT-4o (April update; reverted) | 2025-04-25 | 2025-04-25 | Retained | [1](https://help.openai.com/en/articles/9624314-model-release-notes) |
| o4-mini | 2025-04-16 | 2025-04-16 | Retained | [1](https://openai.com/index/introducing-o3-and-o4-mini/) |
| GPT-4.1 | 2025-04-14 | 2025-04-14 | Retained | [1](https://openai.com/index/gpt-4-1/) |
| GPT-4.1-mini | 2025-04-14 | 2025-04-14 | Retained | [1](https://openai.com/index/gpt-4-1/) |
| GPT-4.1-nano | 2025-04-14 | 2025-04-14 | Retained | [1](https://openai.com/index/gpt-4-1/) |
| GPT-4o (March update) | 2025-03-27 | 2025-03-27 | Retained | [1](https://help.openai.com/en/articles/9624314-model-release-notes) |
| Computer use preview | 2025-03-11 | 2025-03-11 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| GPT-4o mini search preview | 2025-03-11 | 2025-03-11 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| GPT-4o search preview | 2025-03-11 | 2025-03-11 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| GPT-4.5 preview | 2025-02-27 | 2025-02-27 | Retained | [1](https://openai.com/index/introducing-gpt-4-5/) |
| GPT-4o (January ChatGPT update) | 2025-01-29 | 2025-01-29 | Retained | [1](https://help.openai.com/en/articles/9624314-model-release-notes) |
| o3 | 2024-12-20 | 2025-04-16 | Retained | [1](https://openai.com/index/introducing-o3-and-o4-mini/), [2](https://www.youtube.com/watch?v=SKBG1sqdyIU) |
| o3-mini | 2024-12-20 | 2025-01-31 | Retained | [1](https://openai.com/index/openai-o3-mini/), [2](https://www.youtube.com/watch?v=SKBG1sqdyIU) |
| o1 | 2024-12-05 | 2024-12-05 | Retained | [1](https://openai.com/index/introducing-chatgpt-pro/), [2](https://developers.openai.com/api/docs/changelog) |
| o1 pro | 2024-12-05 | 2024-12-05 | Retained | [1](https://openai.com/index/introducing-chatgpt-pro/), [2](https://developers.openai.com/api/docs/changelog) |
| GPT-4o (November snapshot) | 2024-11-20 | 2024-11-20 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| GPT-4o mini (November ChatGPT update) | 2024-11-05 | 2024-11-05 | Retained | [1](https://help.openai.com/en/articles/9624314-model-release-notes) |
| GPT-4o with canvas | 2024-10-03 | 2024-10-03 | Retained | [1](https://openai.com/index/introducing-canvas/) |
| o1-mini | 2024-09-12 | 2024-09-12 | Retained | [1](https://openai.com/index/introducing-openai-o1-preview/) |
| o1-preview | 2024-09-12 | 2024-09-12 | Retained | [1](https://openai.com/index/introducing-openai-o1-preview/) |
| GPT-4o (September ChatGPT update) | 2024-09-03 | 2024-09-03 | Retained | [1](https://help.openai.com/en/articles/9624314-model-release-notes) |
| ChatGPT-4o latest | 2024-08-15 | 2024-08-15 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| GPT-4o (August ChatGPT update) | 2024-08-12 | 2024-08-12 | Retained | [1](https://help.openai.com/en/articles/9624314-model-release-notes) |
| GPT-4o (August API snapshot) | 2024-08-06 | 2024-08-06 | Retained | [1](https://openai.com/index/introducing-structured-outputs-in-the-api/) |
| GPT-4o mini | 2024-07-18 | 2024-07-18 | Retained | [1](https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/) |
| GPT-4o | 2024-05-14 | 2024-05-13 | Retained | [1](https://openai.com/index/hello-gpt-4o/), [2](https://x.com/OpenAI/status/1790072174117613963) |
| GPT-4 Turbo with Vision | 2024-04-09 | 2024-04-09 | Retained | [1](https://developers.openai.com/api/docs/changelog) |
| GPT-3.5 Turbo (0125) | 2024-01-25 | 2024-02-01 | Retained | [1](https://developers.openai.com/api/docs/changelog), [2](https://openai.com/index/new-embedding-models-and-api-updates/) |
| GPT-4 Turbo preview (January update) | 2024-01-25 | 2024-01-25 | Retained | [1](https://openai.com/index/new-embedding-models-and-api-updates/) |

### Alibaba Qwen (20)

| Model | Announcement | Access | Result | Sources |
|---|---|---|---|---|
| Qwen3.8-27B | 2026-08-14 | 2026-08-14 | Retained | [1](https://github.com/QwenLM/Qwen3.8/blob/main/README.md) |
| Qwen3.8-Max | 2026-08-03 | 2026-08-03 | Corrected / clarified | [1](https://qwen.ai/blog?id=qwen3.8), [2](https://github.com/QwenLM/Qwen3.8/blob/main/README.md) |
| Qwen3.7-Max | 2026-05-20 | 2026-05-20 | Retained | [1](https://qwen.ai/blog?id=qwen3.7) |
| Qwen3.6-27B | 2026-04-22 | 2026-04-22 | Corrected / clarified | [1](https://qwen.ai/blog?id=qwen3.6-27b), [2](https://github.com/QwenLM/Qwen3.8/blob/main/README.md) |
| Qwen3.6-Max-Preview | 2026-04-18 | Not documented | Retained | [1](https://qwen.ai/blog?id=qwen3.6-max-preview) |
| Qwen3.6-35B-A3B | 2026-04-15 | 2026-04-16 | Date caveat | [1](https://qwen.ai/blog?id=qwen3.6-35b-a3b), [2](https://github.com/QwenLM/Qwen3.8/blob/main/README.md) |
| Qwen3.5-397B-A17B | 2026-02-16 | 2026-02-16 | Corrected / clarified | [1](https://qwen.ai/blog?id=qwen3.5), [2](https://github.com/QwenLM/Qwen3.8/blob/main/README.md) |
| Qwen3.5-Plus | 2026-02-16 | 2026-02-16 | Corrected / clarified | [1](https://qwen.ai/blog?id=qwen3.5) |
| Qwen3-Coder-Next | 2026-02-03 | 2026-02-03 | Corrected / clarified | [1](https://qwen.ai/blog?id=qwen3-coder-next) |
| Qwen3-Max-Thinking | 2026-01-26 | 2026-01-26 | Corrected / clarified | [1](https://qwen.ai/blog?id=qwen3-max-thinking) |
| Qwen3-Max | 2025-09-24 | 2025-09-24 | Retained | [1](https://qwen.ai/blog?from=research.latest-advancements-list&id=241398b9cd6353de490b0f82806c7848c5d2777d) |
| Qwen3-Next-80B-A3B | 2025-09-11 | 2025-09-11 | Retained | [1](https://github.com/QwenLM/Qwen3.8/blob/main/README.md) |
| Qwen3-Coder | 2025-07-22 | 2025-07-22 | Retained | [1](https://qwenlm.github.io/blog/qwen3-coder/) |
| Qwen3 | 2025-04-29 | 2025-04-29 | Retained | [1](https://qwenlm.github.io/blog/qwen3/) |
| QwQ-32B | 2025-03-06 | 2025-03-06 | Retained | [1](https://qwenlm.github.io/blog/qwq-32b/) |
| Qwen2.5-Max | 2025-01-28 | 2025-01-28 | Retained | [1](https://qwenlm.github.io/blog/qwen2.5-max/) |
| Qwen2.5-1M | 2025-01-27 | 2025-01-27 | Retained | [1](https://qwenlm.github.io/blog/qwen2.5-1m/) |
| Qwen2.5-Coder-32B | 2024-11-12 | 2024-11-12 | Retained | [1](https://qwenlm.github.io/blog/qwen2.5-coder-family/) |
| Qwen2.5 | 2024-09-19 | 2024-09-19 | Retained | [1](https://qwenlm.github.io/blog/qwen2.5/) |
| Qwen2 | 2024-06-07 | 2024-06-07 | Retained | [1](https://qwenlm.github.io/blog/qwen2/) |

### xAI (19)

| Model | Announcement | Access | Result | Sources |
|---|---|---|---|---|
| Grok 4.3 (Bedrock) | Not documented | 2026-06-17 | Retained | [1](https://x.ai/news/grok-amazon-bedrock) |
| Grok 4.7 | 2026-09-21 | 2026-09-21 | Retained | [1](https://x.ai/news/grok-4-7) |
| Grok 4.6 | 2026-08-12 | 2026-08-12 | Retained | [1](https://x.ai/news/grok-4-6), [2](https://docs.x.ai/developers/release-notes) |
| Grok 4.5 | 2026-07-16 | 2026-07-08 | Retained | [1](https://x.ai/news/grok-4-5), [2](https://docs.x.ai/developers/release-notes), [3](https://x.ai/news/grok-4-5-everywhere) |
| Grok Build 0.1 | 2026-05-19 | 2026-05-19 | Corrected / clarified | [1](https://x.ai/news/grok-build-0-1), [2](https://docs.x.ai/developers/release-notes) |
| Grok 4.20 | 2026-03-10 | 2026-03-10 | Corrected / clarified | [1](https://docs.x.ai/developers/release-notes) |
| Grok 4.1 Fast | 2025-11-19 | 2025-11-19 | Retained | [1](https://x.ai/news/grok-4-1-fast) |
| Grok 4.1 | 2025-11-17 | 2025-11-17 | Retained | [1](https://x.ai/news/grok-4-1) |
| Grok 4 Fast | 2025-09-19 | 2025-09-19 | Retained | [1](https://x.ai/news/grok-4-fast) |
| Grok Code Fast 1 | 2025-08-28 | 2025-08-28 | Retained | [1](https://x.ai/news/grok-code-fast-1) |
| Grok 4 | 2025-07-09 | 2025-07-09 | Retained | [1](https://x.ai/news/grok-4) |
| Grok 4 Heavy | 2025-07-09 | 2025-07-09 | Retained | [1](https://x.ai/news/grok-4) |
| Grok 3 | 2025-02-19 | 2025-02-19 | Corrected / clarified | [1](https://x.ai/news/grok-3), [2](https://docs.x.ai/developers/release-notes) |
| Grok 3 mini | 2025-02-19 | Not documented | Retained | [1](https://x.ai/news/grok-3) |
| Grok-2 | 2024-08-13 | 2024-08-13 | Retained | [1](https://x.ai/news/grok-2) |
| Grok-2 mini | 2024-08-13 | 2024-08-13 | Retained | [1](https://x.ai/news/grok-2) |
| Grok-1.5V | 2024-04-12 | Not documented | Retained | [1](https://x.ai/news/grok-1.5v) |
| Grok-1.5 | 2024-03-28 | Not documented | Retained | [1](https://x.ai/news/grok-1.5) |
| Grok-1 (open weights) | 2024-03-17 | 2024-03-17 | Retained | [1](https://x.ai/news/grok-os) |
