# DeepSeek, GLM, and Kimi release patterns in UTC+8

Checked October 16, 2026. This is an observational sample of **27 verified official launch/introduction posts**, not a release schedule or a census of every model.

## Main observations

| Lab | Verified posts | Most frequent announcement weekdays | Broad time window, UTC+8 |
| --- | ---: | --- | --- |
| DeepSeek | 11 | Monday and Thursday: 4 each (36.4% each) | 18:00–22:00: 7/11 (63.6%) |
| GLM / Z.ai | 8 | Tuesday and Friday: 2 each (25% each); no strong preference | 22:00–02:00: 5/8 (62.5%) |
| Kimi / Moonshot AI | 8 | Friday: 4/8 (50%) | 21:00–03:00: 5/8 (62.5%); 4/8 fall at 21:00–24:00 |

Windows include their start and exclude their end; overnight windows wrap through midnight. They are broad descriptive bins chosen after inspection, not independently tested predictions.

## Recent 2026 subset

| Lab | 2026 posts | Weekdays | Time-of-day qualification |
| --- | ---: | --- | --- |
| DeepSeek | 3 | Friday 2; Thursday 1 | 11:24, 17:17, 14:10. All fall in 11:00–18:00; none in the historical evening bin. |
| GLM | 6 | Friday 2; Monday, Wednesday, Thursday, Saturday 1 each | 3/6 in 22:00–02:00; others at 13:17, 15:56, 19:21. |
| Kimi | 4 | Friday 2; Monday 1; Tuesday 1 | 2/4 in 21:00–03:00; others at 13:42, 18:16. |

These recent samples are small. DeepSeek's older evening pattern is not a sound exclusive monitoring window today.

## Method and limits

The sample covers language, reasoning, coding, and general multimodal releases already represented in the local timeline. Count distinct official launch posts, not model variants or individual thread replies. DeepSeek V3.2/Speciale and V4-Pro/Flash each contribute one shared post. Kimi k1.5 contributes its research introduction. Verified author, post ID, launch-identifying text, and UTC creation time came from X's public first-party syndication JSON. Local conversion was cross-checked against Snowflake timestamps.

The sample spans December 26, 2024–September 10, 2026 for DeepSeek; September 30, 2025–August 26, 2026 for GLM; and January 20, 2025–July 17, 2026 for Kimi. Older GLM releases, Kimi-Dev, and Kimi K2.8 Preview lack a qualifying exact post verified in this check. The [Kimi Code changelog](https://www.kimi.com/code/docs/en/kimi-code/whats-new.html) documents K2.8 Preview's September 11 date, but supplies no exact hour here. Missing timestamps are exclusions, not proof that no announcement happened.

GLM has staged rollouts. The principal sample uses the earlier checked GLM-5.1 Coding Plan post (March 27, Friday 19:21) and GLM-5.2 Coding Plan post (June 13, Saturday 15:56), instead of counting later open-weight posts as new models. If these two entries are replaced by their public open-weight posts, the 8-post distribution becomes Monday 1, Tuesday 2, Wednesday 3, Thursday 1, Friday 1, with 7/8 in 22:00–02:00. A Wednesday/late-night impression therefore partly depends on the rollout phase selected. The GLM-5.3 sample uses the main introduction post, one second before the access-details reply linked in the timeline.

Announcement posting time is not automatically the exact time API or weights first became public. Source dates, snapshot suffixes, and the app's assumed 15:00 UTC+8 display time do not establish release hours. The existing model data files were not edited.

## Verified sample

| Lab | Model or shared launch | Date in UTC+8 | Weekday | Time in UTC+8 | Source |
| --- | --- | --- | --- | --- | --- |
| DeepSeek | DeepSeek-V3 | 2024-12-26 | Thursday | 19:26:48 | [Official post](https://x.com/deepseek_ai/status/1872242657348710721) |
| DeepSeek | DeepSeek-R1 | 2025-01-20 | Monday | 20:29:30 | [Official post](https://x.com/deepseek_ai/status/1881318130334814301) |
| DeepSeek | DeepSeek-V3-0324 | 2025-03-25 | Tuesday | 21:32:43 | [Official post](https://x.com/deepseek_ai/status/1904526863604883661) |
| DeepSeek | DeepSeek-R1-0528 | 2025-05-29 | Thursday | 20:11:19 | [Official post](https://x.com/deepseek_ai/status/1928061589107900779) |
| DeepSeek | DeepSeek-V3.1 | 2025-08-21 | Thursday | 14:33:07 | [Official post](https://x.com/deepseek_ai/status/1958417062008918312) |
| DeepSeek | DeepSeek-V3.1-Terminus | 2025-09-22 | Monday | 21:27:43 | [Official post](https://x.com/deepseek_ai/status/1970117808035074215) |
| DeepSeek | DeepSeek-V3.2-Exp | 2025-09-29 | Monday | 18:10:00 | [Official post](https://x.com/deepseek_ai/status/1972604768309871061) |
| DeepSeek | DeepSeek-V3.2 / Speciale | 2025-12-01 | Monday | 19:19:18 | [Official post](https://x.com/deepseek_ai/status/1995452641430651132) |
| DeepSeek | DeepSeek-V4-Pro / Flash Preview | 2026-04-24 | Friday | 11:24:09 | [Official post](https://x.com/deepseek_ai/status/2047516922263285776) |
| DeepSeek | DeepSeek-V4-Flash-Vision-Exp | 2026-08-21 | Friday | 17:17:38 | [Official post](https://x.com/deepseek_ai/status/2090730032574631962) |
| DeepSeek | DeepSeek-V4.1-Flash | 2026-09-10 | Thursday | 14:10:09 | [Official post](https://x.com/deepseek_ai/status/2097930608790167907) |
| GLM | GLM-4.6 | 2025-09-30 | Tuesday | 22:38:09 | [Official post](https://x.com/Zai_org/status/1973034639708344767) |
| GLM | GLM-4.7 | 2025-12-23 | Tuesday | 01:30:10 | [Official post](https://x.com/Zai_org/status/2003156119087382683) |
| GLM | GLM-4.7-Flash | 2026-01-19 | Monday | 22:44:34 | [Official post](https://x.com/Zai_org/status/2013261304060866758) |
| GLM | GLM-5 | 2026-02-12 | Thursday | 01:33:05 | [Official post](https://x.com/Zai_org/status/2021638634739527773) |
| GLM | GLM-5.1 Coding Plan | 2026-03-27 | Friday | 19:21:04 | [Official post](https://x.com/Zai_org/status/2037490078126084514) |
| GLM | GLM-5.2 Coding Plan | 2026-06-13 | Saturday | 15:56:46 | [Official post](https://x.com/Zai_org/status/2065704919299235870) |
| GLM | GLM-5.3 | 2026-08-14 | Friday | 13:17:49 | [Official post](https://x.com/Zai_org/status/2088132965922476159) |
| GLM | GLM-5.3-Flash | 2026-08-26 | Wednesday | 22:12:36 | [Official post](https://x.com/Zai_org/status/2092616204787626030) |
| Kimi | Kimi k1.5 research introduction | 2025-01-20 | Monday | 21:26:29 | [Official post](https://x.com/Kimi_Moonshot/status/1881332472748851259) |
| Kimi | Kimi K2 | 2025-07-11 | Friday | 23:03:29 | [Official post](https://x.com/Kimi_Moonshot/status/1943687594560332025) |
| Kimi | Kimi K2-0905 | 2025-09-05 | Friday | 11:13:40 | [Official post](https://x.com/Kimi_Moonshot/status/1963802687230947698) |
| Kimi | Kimi K2 Thinking | 2025-11-06 | Thursday | 23:04:04 | [Official post](https://x.com/Kimi_Moonshot/status/1986449512538513505) |
| Kimi | Kimi K2.5 | 2026-01-27 | Tuesday | 13:42:44 | [Official post](https://x.com/Kimi_Moonshot/status/2016024049869324599) |
| Kimi | Kimi K2.6 | 2026-04-20 | Monday | 23:28:10 | [Official post](https://x.com/Kimi_Moonshot/status/2046249571882500354) |
| Kimi | Kimi K2.7 Code | 2026-06-12 | Friday | 18:16:02 | [Official post](https://x.com/Kimi_Moonshot/status/2065377579130142937) |
| Kimi | Kimi K3 | 2026-07-17 | Friday | 02:58:25 | [Official post](https://x.com/Kimi_Moonshot/status/2077830229968683203) |

## Later GLM milestones, excluded from the principal count

- [GLM-5.1 open-weight announcement](https://x.com/Zai_org/status/2041550153354519022): 2026-04-08, Wednesday, 00:14:21 UTC+8.
- [GLM-5.2 open-weight announcement](https://x.com/Zai_org/status/2066938937344495629): 2026-06-17, Wednesday, 01:40:19 UTC+8.

## Differences from date-only timeline labels

Kimi K3’s X introduction is **Friday, July 17, 2026, 02:58 UTC+8**, although the date-only timeline source is July 16. It adds a Friday announcement relative to the prior date-only listing. GLM-4.7’s X post is Tuesday, December 23, 2025, 01:30 UTC+8, rather than the December 22 source date. DeepSeek V3-0324’s X post is March 25 (rather than the March 24 recorded access date), and R1-0528’s is May 29 (rather than May 28). These comparisons use different evidence milestones; they do not independently falsify earlier availability dates.

The [calculation snapshot](deepseek-glm-kimi-release-patterns-2026-10-16.json) contains all source URLs, timestamps, counts, and the later GLM milestones.
