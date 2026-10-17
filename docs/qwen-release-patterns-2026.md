# Qwen release patterns in 2026

**Analysis date:** October 15, 2026

**Period:** January 1–October 15, 2026

**Timezone:** Malaysia/China time, UTC+8 (`Asia/Kuala_Lumpur`)

Qwen’s clearest pattern in this sample is weekday launch announcements, often late in the evening, followed by smaller or Flash variants later. The first variant’s name changes between families: Qwen3.5 began with a large open model and Plus, Qwen3.6 with Plus, and Qwen3.7 and Qwen3.8 with Max. These are observed tendencies, not a fixed release schedule.

## Scope and method

The analysis covers the timeline’s language, reasoning, coding, and general multimodal models. Standalone image, video generation, speech, embedding, and reranking products are outside this analysis. It is not a census of every Qwen product released in 2026.

Two evidence sets answer different questions:

1. **Weekday and time:** 14 distinct official `@Alibaba_Qwen` launch posts with verified timestamps. Each shared announcement counts once, even when it introduces several models. Previews, dated snapshot updates, later platform rollouts, promotional replies, and records without an exact qualifying X timestamp are excluded. The sample includes new reasoning and coding variants of existing families, such as Qwen3-Max-Thinking and Qwen3-Coder-Next.
2. **Family order and spacing:** dated official launch articles, repository release news, and Alibaba’s release log for the four new numbered families, Qwen3.5–Qwen3.8. These dates describe documented launches or access and can differ from the corresponding X posting date.

X account, post ID, text, and creation time were checked against X’s first-party public syndication data. UTC timestamps were converted to UTC+8 before counting weekdays and time windows. The dashboard’s approximate `~` times were excluded: its date-only display convention does not establish an actual release hour.

The [calculation snapshot](qwen-release-patterns-2026-10-15.json) preserves all 14 source URLs, UTC timestamps, converted local times, counts, and intervals. The broader [Qwen catalog and X audit](qwen-openrouter-audit-2026-10-15.md) documents the underlying records and remaining evidence gaps. This analysis additionally verified the January Qwen3-Max-Thinking and May Qwen3.7-Max posts listed in the appendix; those two posts were not assigned to their timeline records in the earlier catalog audit.

## Weekday pattern

| Weekday in UTC+8 | Distinct launch posts | Share of 14 |
| --- | ---: | ---: |
| Monday | 4 | 28.6% |
| Tuesday | 1 | 7.1% |
| Wednesday | 4 | 28.6% |
| Thursday | 3 | 21.4% |
| Friday | 2 | 14.3% |
| Saturday | 0 | 0% |
| Sunday | 0 | 0% |

Monday and Wednesday tie for the most announcements. All 14 sampled posts occurred on weekdays. The sample does not establish a dependable single release day, nor does it establish that all Qwen releases occur on weekdays. In particular, previews and date-only records are excluded from this count; the timeline has a date-only Qwen3.6-Max-Preview announcement on Saturday, April 18.

## Time-of-day pattern

The windows below are half-open: for example, `20:00–24:00` includes 20:00 and ends immediately before midnight.

| Announcement window in UTC+8 | Distinct launch posts | Share of 14 |
| --- | ---: | ---: |
| 00:00–02:00 | 3 | 21.4% |
| 02:00–09:00 | 0 | 0% |
| 09:00–12:00 | 2 | 14.3% |
| 12:00–20:00 | 1 | 7.1% |
| 20:00–24:00 | 8 | 57.1% |

**Eleven of 14 announcements, or 78.6%, fell between 20:00 and 02:00.** Late evening is the clearest timing tendency in the sample. Examples include [Qwen3.6-Plus at 22:02](https://x.com/Alibaba_Qwen/status/2039705104723611829), [Qwen3.7-Plus at 01:54](https://x.com/Alibaba_Qwen/status/2061506641120641494), and [Qwen3.8-Flash at 20:34](https://x.com/Alibaba_Qwen/status/2092591393424515114).

There are meaningful exceptions. [Qwen3.8-Max](https://x.com/Alibaba_Qwen/status/2084093402967396594) was announced at 09:46 and [Qwen3.8-Omni-Flash](https://x.com/Alibaba_Qwen/status/2100785962414702599) at 11:16. These are announcement times; the exact start of API or weight availability is a separate question.

## Which variant comes first in a new family?

This comparison uses each family’s main launch, with previews discussed separately below. A new numbered family means Qwen3.5, Qwen3.6, Qwen3.7, or Qwen3.8; January’s Qwen3-Max-Thinking is a later variant of the already existing Qwen3 family.

| Family | First main release and date | Subsequent expansion | Primary evidence |
| --- | --- | --- | --- |
| Qwen3.5 | 397B-A17B open model **and Plus**, February 16 | Flash API February 23; 122B-A10B, 35B-A3B, and 27B weights February 24; small models including 9B March 2 | [Launch article](https://qwen.ai/blog?id=qwen3.5), [repository news](https://github.com/QwenLM/Qwen3.8/blob/main/README.md), [API release log](https://www.alibabacloud.com/help/en/model-studio/newly-released-models) |
| Qwen3.6 | **Plus**, April 2 | Flash and 35B-A3B around April 16; Max Preview April 18; 27B April 22 | [Plus launch](https://qwen.ai/blog?id=qwen3.6), [35B announcement](https://x.com/Alibaba_Qwen/status/2044768734234243427), [Max Preview article](https://qwen.ai/blog?id=qwen3.6-max-preview), [27B announcement](https://x.com/Alibaba_Qwen/status/2046939764428009914) |
| Qwen3.7 | **Max**, May 20 | Plus API June 1; Flash API July 21 | [Max launch article](https://qwen.ai/blog?id=qwen3.7), [Plus announcement](https://x.com/Alibaba_Qwen/status/2061506641120641494), [API release log](https://www.alibabacloud.com/help/en/model-studio/newly-released-models) |
| Qwen3.8 | **Max**, August 3 | Max weights August 12; 27B August 14; Flash/Flash-Next announcement and weights August 26; Omni-Flash September 18 | [Max launch](https://qwen.ai/blog?id=qwen3.8), [repository news](https://github.com/QwenLM/Qwen3.8/blob/main/README.md), [Flash announcement](https://x.com/Alibaba_Qwen/status/2092591393424515114), [Omni announcement](https://x.com/Alibaba_Qwen/status/2100785962414702599) |

**Flash followed the main debut in all four families.** The leading label varies, so a universal Plus → Max → Flash sequence is not supported. The observed sequence is a headline capability release followed by broader choices in model size, cost, or specialization. That description is an inference from these four launches, not a stated Qwen release policy. No Qwen3.8-Plus release was verified in the sources reviewed.

### Preview and date distinctions

- **Qwen3.6:** [OpenRouter records Plus-Preview access on March 30](https://openrouter.ai/qwen/qwen3.6-plus-preview). This is provider-recorded preview access, not a verified company announcement date. Including that preview still makes Plus the first recorded tier in this family.
- **Qwen3.7:** the [May 18 official Arena-preview post](https://x.com/Alibaba_Qwen/status/2056403591464984753) names **Max-Preview and Plus-Preview together**. Thus Max leads the main-release comparison, while the preview stage was shared.
- **Qwen3.7-Max:** the main launch article is dated May 20; its sampled X launch post is May 21 at 21:15 UTC+8. The family-spacing calculation uses May 20 and the posting-time analysis uses May 21.
- **Qwen3.7-Plus:** the dated API rollout is June 1. Its X launch is June 1 at 17:54 UTC, which is June 2 at 01:54 UTC+8.
- **Qwen3.5 medium models:** repository weight release is February 24. The shared X post is February 24 at 16:52 UTC, which is February 25 at 00:52 UTC+8.
- **Qwen3.6-35B-A3B:** the launch article says April 15, while the official repository and X announcement date weight publication to April 16. The timeline retains this disagreement.
- **Qwen3.8-Flash:** the August 26 X post releases Flash-Next weights and says the production API is coming soon. [August 27](https://x.com/Alibaba_Qwen/status/2092857839299826095) explicitly confirms OpenRouter access. The release-log API entry is dated August 26, so an exact first API instant is not established.

## How long does Flash usually follow the first release?

These are calendar-day comparisons from the selected main-family debut to the dated Flash milestone used in this audit. They mix hosted API rollout and open-weight milestones, as labeled, and should not be read as a uniform measurement of API deployment latency.

| Family | Main-family debut | Flash milestone used | Gap |
| --- | --- | --- | ---: |
| Qwen3.5 | February 16 | February 23 API rollout | 7 days |
| Qwen3.6 | April 2 | April 16 recorded China API rollout | 14 days |
| Qwen3.7 | May 20 | July 21 API rollout | 62 days |
| Qwen3.8 | August 3 | August 26 Flash announcement / Flash-Next weights | 23 days |

The observed range is **7–62 days**, roughly one to nine weeks. This supports “Flash usually follows later” within the four-family sample, but does not support a fixed waiting period.

For Qwen3.6-Flash, international/global rollout is dated April 17 rather than April 16. For Qwen3.6-Plus, an international release-log row is dated April 1, while the selected main launch is the explicit April 2 official announcement. These source and regional differences can move a computed interval by a day.

## Spacing between new numbered families

| Main-family transition | Dates used | Gap |
| --- | --- | ---: |
| Qwen3.5 → Qwen3.6 | February 16 → April 2 | 45 days |
| Qwen3.6 → Qwen3.7 | April 2 → May 20 | 48 days |
| Qwen3.7 → Qwen3.8 | May 20 → August 3 | 75 days |

The three observed intervals span **45–75 days**, roughly **6–11 weeks**. This is an irregular cadence rather than a fixed monthly schedule. Three intervals are insufficient to forecast the next family’s release date.

## Evidence limits

The timing results describe the 14 verified launch posts in the appendix, not every model release in 2026. Models with quiet API rollouts or unverified launch posts cannot contribute an exact hour. Four models sharing one post contribute one event; smaller siblings absent from the catalog do not create additional posting events when they share that same announcement. A later provider listing, model snapshot suffix, or dashboard display assumption does not establish the original release time.

The four-family ordering result describes main launches and recorded follow-up milestones. It does not rule out an earlier private test, preview, or regional rollout. Serving variants such as Max Prime and dated snapshot updates are not counted as new family debuts. All observations stop on October 15, 2026.

## Appendix: the 14 official launch posts

Local dates, weekdays, and times below are all UTC+8. Exact UTC timestamps are preserved in the calculation snapshot. Times displayed here are truncated to the minute.

| Local date | Weekday | Local time | Launch represented | Official post |
| --- | --- | --- | --- | --- |
| 2026-01-26 | Monday | 23:13 | Qwen3-Max-Thinking | [X](https://x.com/Alibaba_Qwen/status/2015805330652111144) |
| 2026-02-04 | Wednesday | 00:09 | Qwen3-Coder-Next | [X](https://x.com/Alibaba_Qwen/status/2018718453570707465) |
| 2026-02-16 | Monday | 17:38 | Qwen3.5-397B-A17B | [X](https://x.com/Alibaba_Qwen/status/2023331062433153103) |
| 2026-02-25 | Wednesday | 00:52 | Qwen3.5-Flash, 122B-A10B, 35B-A3B, and 27B; one shared post | [X](https://x.com/Alibaba_Qwen/status/2026339351530188939) |
| 2026-03-02 | Monday | 21:18 | Qwen3.5 small series, including 9B; one shared post | [X](https://x.com/Alibaba_Qwen/status/2028460046510965160) |
| 2026-04-02 | Thursday | 22:02 | Qwen3.6-Plus | [X](https://x.com/Alibaba_Qwen/status/2039705104723611829) |
| 2026-04-16 | Thursday | 21:23 | Qwen3.6-35B-A3B | [X](https://x.com/Alibaba_Qwen/status/2044768734234243427) |
| 2026-04-22 | Wednesday | 21:10 | Qwen3.6-27B | [X](https://x.com/Alibaba_Qwen/status/2046939764428009914) |
| 2026-05-21 | Thursday | 21:15 | Qwen3.7-Max | [X](https://x.com/Alibaba_Qwen/status/2057450220708147250) |
| 2026-06-02 | Tuesday | 01:54 | Qwen3.7-Plus | [X](https://x.com/Alibaba_Qwen/status/2061506641120641494) |
| 2026-08-03 | Monday | 09:46 | Qwen3.8-Max | [X](https://x.com/Alibaba_Qwen/status/2084093402967396594) |
| 2026-08-14 | Friday | 23:02 | Qwen3.8-27B | [X](https://x.com/Alibaba_Qwen/status/2088280182356611304) |
| 2026-08-26 | Wednesday | 20:34 | Qwen3.8-Flash / Flash-Next | [X](https://x.com/Alibaba_Qwen/status/2092591393424515114) |
| 2026-09-18 | Friday | 11:16 | Qwen3.8-Omni-Flash | [X](https://x.com/Alibaba_Qwen/status/2100785962414702599) |
