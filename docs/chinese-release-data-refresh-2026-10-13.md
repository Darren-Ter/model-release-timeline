# Chinese-lab release-data follow-up — October 13, 2026

Added **GLM-Legal**, bringing the dataset from 226 to **227 records**. The four September releases identified in the review—MiniMax M3.1-Flash-Preview, Qwen3.8-Omni-Flash, Kimi K2.8 Preview, and DeepSeek-V4.1-Flash—were already included and are not duplicated. Only Z.ai's research date is advanced to October 13; this is not a new full audit of all nine labs.

## GLM-Legal evidence

The [official Z.ai research article](https://z.ai/blog/glm-legal), read in the browser on October 13, displays **2026-10-12** and describes a legal reasoning and document-workflow model built on GLM-5.3-Flash. This qualifies for the timeline's text and reasoning scope.

- Record ID: `glm-legal`; release kind: **Model preview**.
- Announcement: **October 12, 2026**, at date-only precision.
- Beta API access: the article invites users to [apply for API access](https://z.ai/consultation/legal). An application invitation does not establish a first-access date or general API availability, so no availability event is added.
- AutoClaw: the article describes integration as coming soon, so no availability event or recorded channel is added.
- No downloadable model weights or exact official X announcement post were established by this review.

The card remains visible in availability mode using the existing, labeled announcement-date fallback. Its details report recorded access as **Not documented** and explain the beta application process in the description and notes.

## Scope

Alibaba's [official Qwen-Image-2.1 repository](https://github.com/QwenLM/Qwen-Image-2.1) dates the Qwen-Image-2.1-Turbo weight release and Pro/Turbo API launch to October 9, 2026. These are standalone image-generation and editing models, outside the current timeline scope, so they are not added.

## Validation

All **74 existing tests** pass, including validation and loading of every release record. TypeScript and the production build pass. The built UI shows 227 records, the October 13 research date, and the October 12 GLM-Legal preview. Browser checks confirm its primary source links, **Not documented** recorded access in details, and the explicitly labeled announcement fallback in availability mode. This follow-up is saved locally; no production deployment was performed.
