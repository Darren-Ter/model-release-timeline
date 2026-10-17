# Qwen catalog and official X audit — October 15, 2026

Reconciled [OpenRouter’s complete Qwen catalog](https://openrouter.ai/qwen) and its [current model API](https://openrouter.ai/api/v1/models) against `data/qwen.json`. The catalog has 90 entries, including historical entries and non-chat products; 42 appear in the current model API. The audit covers 77 entries within the timeline’s text, reasoning, coding, and general multimodal scope. The other 13 are standalone image, speech, embedding, or reranking models.

All 45 previously identified catalog gaps are resolved: 44 separate records were added and Qwen3.8-Max-Prime is a searchable serving variant of the September Max snapshot. Qwen now has 65 timeline records and the full dataset has 271. Original family members, equivalent hosted/open names, and serving variants can share a timeline record; catalog counts are not release counts.

The [machine-readable reconciliation](qwen-openrouter-audit-2026-10-15.json) maps every catalog ID to a release or an explicit scope exclusion. Regression checks require every included ID to resolve to a searchable release and prevent Prime from becoming an extra model launch. This is a dated inventory, not a live completeness claim about all Qwen products.

## Official X verification

Grok CLI located candidate posts. Their status IDs, account handles, post text, and creation timestamps were independently retrieved from X’s first-party public syndication JSON. Public expanded-post data was also checked where long posts truncate in syndication. Only `@Alibaba_Qwen` posts identifying the relevant release are assigned to `announcement_x_url`; a quoted team member, search snippet, later promotion, or launch-thread reply is not sufficient. No X account was used to publish anything.

There are 29 checked company-account posts linked to 36 Qwen records, including 26 of the 44 additions. An empty X field means no exact qualifying company-account launch post was verified, not that none exists. Source-linked records remain valid without a verified X permalink. The JSON audit preserves the checked authors, timestamps, short excerpts, and covered release IDs.

Important recovered originals:

- Qwen3-VL-235B uses [the original launch](https://x.com/Alibaba_Qwen/status/1970594923503391182), which names both variants; the “more cases” reply is not used.
- Qwen3-30B-A3B-Instruct-2507 uses [the original small-update post](https://x.com/Alibaba_Qwen/status/1950227114793586867), recovered from a team member’s quote and checked against X. Its model links identify the exact checkpoint.
- Qwen3.8-Flash uses [the August 26 launch](https://x.com/Alibaba_Qwen/status/2092591393424515114). Flash-Next weights and hosted production access remain separate events; [August 27](https://x.com/Alibaba_Qwen/status/2092857839299826095) confirms OpenRouter access.
- Qwen3.8-Max-0902 uses [the September 2 snapshot announcement](https://x.com/Alibaba_Qwen/status/2094968708288680276), which explicitly confirms API access. It is labeled a model update.

## Date and access decisions

- **Qwen3.5-9B:** [official repository news](https://github.com/QwenLM/Qwen3.8/blob/main/README.md) and [the small-series launch](https://x.com/Alibaba_Qwen/status/2028460046510965160) establish March 2. OpenRouter’s March 10 listing does not replace it.
- **Qwen3.5 medium models:** repository weight release is February 24. The [shared X post](https://x.com/Alibaba_Qwen/status/2026339351530188939) is February 24 at 16:52 UTC, February 25 in UTC+8. Flash has earlier API rollout evidence dated February 23 in the release log.
- **Qwen3.7-Plus:** the [launch post](https://x.com/Alibaba_Qwen/status/2061506641120641494) is June 1 at 17:54 UTC, June 2 in UTC+8. The official API rollout is June 1; May 26 is its snapshot label.
- **Quiet API rollouts:** [Alibaba’s dated release log](https://www.alibabacloud.com/help/en/model-studio/newly-released-models) establishes July 21 for Qwen3.7-Flash, April 16 in China / April 17 internationally for Qwen3.6-Flash, and April 23 for the April 20 Qwen3.5-Plus snapshot. No snapshot suffix supplies an announcement date.
- **Qwen3-Coder-Flash:** the July 31 X post introduces the open 30B checkpoint under the Flash name. The [August 5 UTC post](https://x.com/Alibaba_Qwen/status/1952767585596145773) explicitly launches hosted APIs. The release log has earlier July 29 international/global rollout and August 5 China rollout, recorded without claiming a universal first-access instant.
- **Qwen3-Coder-Plus:** the July 22 [official release article](https://qwenlm.github.io/blog/qwen3-coder/) names the hosted API. The release log dates global rollout July 23. September’s X upgrade is not substituted for the original launch.
- **Qwen3.6-Plus-Preview:** [OpenRouter’s own page](https://openrouter.ai/qwen/qwen3.6-plus-preview) records March 30. This is provider-recorded access only; neither a Qwen announcement date nor first public availability is asserted.
- **Qwen1.5:** the article header says February 4 and repository news says February 5. The four initial Chat sizes retain a visible date caveat. The [32B post](https://x.com/Alibaba_Qwen/status/1776262376700223968) is April 5 although its article header says April 2. The [110B article](https://qwenlm.github.io/blog/qwen1.5-110b/) is April 25, with a team member announcing released weights April 26. Later sizes are not backdated into the initial family.
- **Qwen-VL-Plus:** November 28 repository news is a benchmark result, not an access announcement. The [January 25 joint article](https://qwenlm.github.io/blog/qwen-vl/) documents access; first access remains unknown. Qwen-VL-Max has explicit January 18 introduction and public demo links in [repository news](https://github.com/QwenLM/Qwen-VL/blob/master/README.md).
- **Qwen-Plus/Turbo:** the September Qwen2.5 article documents that generation’s APIs, not the initial creation of these rolling products. Qwen-Plus’s January 25 snapshot has recorded January 30 rollout. The July 28 snapshot has July 29 international/global rollout, with later alias transitions treated separately.
- **Prime:** [Alibaba’s Fast mode documentation](https://www.alibabacloud.com/help/en/model-studio/prime-mode) describes faster serving with the original model’s capabilities. It supplies no separate foundation-model launch.

## X evidence gaps retained explicitly

No exact company-account launch post was verified for Qwen3.7-Flash, Qwen3.6-Flash, Qwen3.6-Plus-Preview, the April Qwen3.5-Plus snapshot, the July Qwen-Plus snapshot, the initial hosted Coder-Plus launch, Qwen2.5-era Plus/Turbo, initial Qwen1.5 sizes and 110B, or legacy Qwen-VL-Plus/Max. Regional release logs, official articles, or explicitly labeled provider access supply the available evidence.

The Qwen2.5-VL family launch post was verified, but its retrieved text does not individually name 3B, 7B, and 72B. Those three per-size cards therefore keep their X icons disabled and cite the official article and repository. The separate 32B card has its exact launch post.

## Added records

| Record | Announcement (UTC+8 when timed) | Documented access | Official X |
| --- | --- | --- | --- |
| [Qwen3.8-Max-0902](https://www.alibabacloud.com/help/en/model-studio/newly-released-models) | 2026-09-02 | 2026-09-02 | [Verified](https://x.com/Alibaba_Qwen/status/2094968708288680276) |
| [Qwen3.8-Flash](https://qwen.ai/blog?id=qwen3.8-flash-next) | 2026-08-26 | 2026-08-26 | [Verified](https://x.com/Alibaba_Qwen/status/2092591393424515114) |
| [Qwen3.7-Flash](https://www.alibabacloud.com/help/en/model-studio/newly-released-models) | Not verified | 2026-07-21 | Not verified |
| [Qwen3.7-Plus](https://qwen.ai/blog?id=qwen3.7-plus) | 2026-06-02 | 2026-06-01 | [Verified](https://x.com/Alibaba_Qwen/status/2061506641120641494) |
| [Qwen3.5-Plus (April 2026 update)](https://www.alibabacloud.com/help/en/model-studio/newly-released-models) | Not verified | 2026-04-23 | Not verified |
| [Qwen3.6-Flash](https://www.alibabacloud.com/help/en/model-studio/newly-released-models) | Not verified | 2026-04-16 (recorded access) | Not verified |
| [Qwen3.6-Plus](https://qwen.ai/blog?id=qwen3.6) | 2026-04-02 | 2026-04-02 | [Verified](https://x.com/Alibaba_Qwen/status/2039705104723611829) |
| [Qwen3.6-Plus-Preview](https://openrouter.ai/qwen/qwen3.6-plus-preview) | Not verified | 2026-03-30 (recorded access) | Not verified |
| [Qwen3.5-9B](https://huggingface.co/Qwen/Qwen3.5-9B) | 2026-03-02 | 2026-03-02 | [Verified](https://x.com/Alibaba_Qwen/status/2028460046510965160) |
| [Qwen3.5-122B-A10B](https://huggingface.co/Qwen/Qwen3.5-122B-A10B) | 2026-02-25 | 2026-02-24 | [Verified](https://x.com/Alibaba_Qwen/status/2026339351530188939) |
| [Qwen3.5-27B](https://huggingface.co/Qwen/Qwen3.5-27B) | 2026-02-25 | 2026-02-24 | [Verified](https://x.com/Alibaba_Qwen/status/2026339351530188939) |
| [Qwen3.5-35B-A3B](https://huggingface.co/Qwen/Qwen3.5-35B-A3B) | 2026-02-25 | 2026-02-24 | [Verified](https://x.com/Alibaba_Qwen/status/2026339351530188939) |
| [Qwen3.5-Flash](https://www.alibabacloud.com/help/en/model-studio/newly-released-models) | 2026-02-25 | 2026-02-23 | [Verified](https://x.com/Alibaba_Qwen/status/2026339351530188939) |
| [Qwen3-VL-32B-Instruct](https://huggingface.co/Qwen/Qwen3-VL-32B-Instruct) | 2025-10-22 | 2025-10-21 | [Verified](https://x.com/Alibaba_Qwen/status/1980665932625383868) |
| [Qwen3-VL-8B-Instruct](https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct) | 2025-10-15 | 2025-10-15 | [Verified](https://x.com/Alibaba_Qwen/status/1978150959621734624) |
| [Qwen3-VL-8B-Thinking](https://huggingface.co/Qwen/Qwen3-VL-8B-Thinking) | 2025-10-15 | 2025-10-15 | [Verified](https://x.com/Alibaba_Qwen/status/1978150959621734624) |
| [Qwen3-VL-30B-A3B-Instruct](https://huggingface.co/Qwen/Qwen3-VL-30B-A3B-Instruct) | 2025-10-04 | 2025-10-04 | [Verified](https://x.com/Alibaba_Qwen/status/1974289216113947039) |
| [Qwen3-VL-30B-A3B-Thinking](https://huggingface.co/Qwen/Qwen3-VL-30B-A3B-Thinking) | 2025-10-04 | 2025-10-04 | [Verified](https://x.com/Alibaba_Qwen/status/1974289216113947039) |
| [Qwen3-VL-235B-A22B-Instruct](https://huggingface.co/Qwen/Qwen3-VL-235B-A22B-Instruct) | 2025-09-24 | 2025-09-23 | [Verified](https://x.com/Alibaba_Qwen/status/1970594923503391182) |
| [Qwen3-VL-235B-A22B-Thinking](https://huggingface.co/Qwen/Qwen3-VL-235B-A22B-Thinking) | 2025-09-24 | 2025-09-23 | [Verified](https://x.com/Alibaba_Qwen/status/1970594923503391182) |
| [Qwen3-Coder-Flash](https://www.alibabacloud.com/help/en/model-studio/newly-released-models) | 2025-08-06 | 2025-07-29 (recorded access) | [Verified](https://x.com/Alibaba_Qwen/status/1952767585596145773) |
| [Qwen3-Coder-30B-A3B-Instruct](https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct) | 2025-07-31 | 2025-07-31 | [Verified](https://x.com/Alibaba_Qwen/status/1950925444057792808) |
| [Qwen3-30B-A3B-Instruct-2507](https://huggingface.co/Qwen/Qwen3-30B-A3B-Instruct-2507) | 2025-07-30 | 2025-07-30 | [Verified](https://x.com/Alibaba_Qwen/status/1950227114793586867) |
| [Qwen3-30B-A3B-Thinking-2507](https://huggingface.co/Qwen/Qwen3-30B-A3B-Thinking-2507) | 2025-07-30 | 2025-07-30 | [Verified](https://x.com/Alibaba_Qwen/status/1950570969036361799) |
| [Qwen-Plus (July 2025 update)](https://www.alibabacloud.com/help/en/model-studio/newly-released-models) | Not verified | 2025-07-29 | Not verified |
| [Qwen3-235B-A22B-Thinking-2507](https://huggingface.co/Qwen/Qwen3-235B-A22B-Thinking-2507) | 2025-07-25 | 2025-07-25 | [Verified](https://x.com/Alibaba_Qwen/status/1948688466386280706) |
| [Qwen3-235B-A22B-Instruct-2507](https://huggingface.co/Qwen/Qwen3-235B-A22B-Instruct-2507) | 2025-07-22 | 2025-07-21 | [Verified](https://x.com/Alibaba_Qwen/status/1947344511988076547) |
| [Qwen3-Coder-Plus](https://qwenlm.github.io/blog/qwen3-coder/) | 2025-07-22 | 2025-07-23 | Not verified |
| [Qwen2.5-VL-32B-Instruct](https://qwenlm.github.io/blog/qwen2.5-vl-32b/) | 2025-03-25 | 2025-03-25 | [Verified](https://x.com/Alibaba_Qwen/status/1904227859616641534) |
| [Qwen2.5-VL-3B-Instruct](https://qwenlm.github.io/blog/qwen2.5-vl/) | 2025-01-28 | 2025-01-28 | Not verified |
| [Qwen2.5-VL-72B-Instruct](https://qwenlm.github.io/blog/qwen2.5-vl/) | 2025-01-28 | 2025-01-28 | Not verified |
| [Qwen2.5-VL-7B-Instruct](https://qwenlm.github.io/blog/qwen2.5-vl/) | 2025-01-28 | 2025-01-28 | Not verified |
| [QwQ-32B-Preview](https://qwenlm.github.io/blog/qwq-32b-preview/) | 2024-11-28 | 2024-11-28 | [Verified](https://x.com/Alibaba_Qwen/status/1861951789467394419) |
| [Qwen-Plus (Qwen2.5 update)](https://qwenlm.github.io/blog/qwen2.5/) | 2024-09-19 | 2024-09-19 (recorded access) | Not verified |
| [Qwen-Turbo (Qwen2.5 update)](https://qwenlm.github.io/blog/qwen2.5/) | 2024-09-19 | 2024-09-19 (recorded access) | Not verified |
| [Qwen2.5-Coder-7B-Instruct](https://qwenlm.github.io/blog/qwen2.5-coder/) | 2024-09-19 | 2024-09-19 | [Verified](https://x.com/Alibaba_Qwen/status/1836449414220779584) |
| [Qwen1.5-110B-Chat](https://qwenlm.github.io/blog/qwen1.5-110b/) | 2024-04-25 | 2024-04-25 (recorded access) | Not verified |
| [Qwen1.5-32B-Chat](https://qwenlm.github.io/blog/qwen1.5-32b/) | 2024-04-05 | 2024-04-05 (recorded access) | [Verified](https://x.com/Alibaba_Qwen/status/1776262376700223968) |
| [Qwen1.5-14B-Chat](https://qwenlm.github.io/blog/qwen1.5/) | 2024-02-04 | 2024-02-05 | Not verified |
| [Qwen1.5-4B-Chat](https://qwenlm.github.io/blog/qwen1.5/) | 2024-02-04 | 2024-02-05 | Not verified |
| [Qwen1.5-72B-Chat](https://qwenlm.github.io/blog/qwen1.5/) | 2024-02-04 | 2024-02-05 | Not verified |
| [Qwen1.5-7B-Chat](https://qwenlm.github.io/blog/qwen1.5/) | 2024-02-04 | 2024-02-05 | Not verified |
| [Qwen-VL-Plus](https://qwenlm.github.io/blog/qwen-vl/) | Not verified | 2024-01-25 (recorded access) | Not verified |
| [Qwen-VL-Max](https://github.com/QwenLM/Qwen-VL/blob/master/README.md) | 2024-01-18 | 2024-01-18 | Not verified |
