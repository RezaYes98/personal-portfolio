---
title: "In-Product Refunds Experience for Worker Retention"
slug: "refunds-experience"
company: "Kanggo"
role: "Product Manager"
date: "2023-03-01"
description: "Building an in-product refund flow and a semi-automated review process to turn refunds from an ops cost into a retention tool, plus the number we never fully measured."
tags: ["product-experience", "refunds", "worker-retention", "marketplace", "operations", "customer-support", "ltc"]
order: 4
---

> *I can't show the graphs. That data stays with Kanggo. Happy to describe the numbers at a high level.*

## Overview

| **Company** | Kanggo (Marketplace) |
| --- | --- |
| **Theme** | Turning refunds from an ops cost into a retention tool |
| **Status** | Shipped, the dominant refunds channel within 2 weeks of full rollout |
| **Initial constraint** | No central team owned refunds. Workers saw the policy as unfair and inconsistent |
| **Success metric** | Worker LTC and retention. Support cost per refund case |
| **Role** | Product Manager: scoped the MVP, defined the launch bar with design and engineering, planned the staged rollout with Customer Support |

## Problem

On Kanggo, workers find projects through the marketplace. When a project goes bad (the customer cancels, the same lead reaches two workers, the brief changes, or the project breaks our terms), the only way to ask for a refund was to email support. Those refunds were slow, inconsistent, and stingy, and workers noticed. Pro NPS and likelihood to continue (LTC) were low, and chargebacks were high.

The pain showed up in three places.

**Workers** had no easy way to ask for a refund, and didn't get refunded for many bad projects, including ones where the customer never even viewed their response. The policy read as unfair. Workers didn't feel Kanggo had their back.

**Support agents** on the phone felt they had to grant refunds even when the policy said no. Their performance reviews were tied to it.

**The company** saw low LTC and high chargebacks, signs of a product problem, not just a policy problem. And no central team owned refund evaluation, so the policy was applied inconsistently.

## The decision

| Option | What it means | The catch |
| --- | --- | --- |
| A. Stay stingy | Refund only clear breaches of our promise to the worker (say, ToS violations) | Workers already saw the policy as unfair and inconsistent, and scrutinizing every case cost ops time |
| B. Make workers work for it | Refund more cases, but require extensive proof and effort | Tells workers we don't trust them, and agents still go through every case by hand |
| **C. Refunds as product experience** | Grant refunds by default to close product gaps, educate workers along the way, and watch for abuse | More refunds go out. In exchange, less ops time, and a frustration point turned into a retention mechanism |

We picked C. The MVP's job was to build the infrastructure that made it real.

## What I Delivered

### 1. An in-product refund flow

- Refund requests from inside the mobile app, instead of email
- A new backend to track refunds and their status, wired to Qontak so support could track cases
- Built by a five-person workstream across engineering, design, and legal

### 2. A semi-automated review process

- A dedicated refunds processing team, aligned with Trust & Safety
- A V0 refund policy that leadership signed off on
- Agent training before rollout

Kickoff in November, 5% rollout in January, and 100% by early March. End to end in about four months.

## Challenges

### 1. Design speed vs. research

To hit the Q4 launch, engineering needed designs fast. The designer was new to this area and wanted to run research first. Fix: they were pulled off other projects to focus on refunds, and we tested MVP designs with a field officer instead of workers to get feedback faster.

### 2. A Trust & Safety requirement we'd missed in scoping

Trust & Safety reviews all free-text responses for safety concerns, a requirement we hadn't scoped. Fix: a working session with T&S and refunds ops to align on process and SLA (no new headcount needed), plus new email copy for cases with a T&S concern.

### 3. Defining launch readiness, and a rollout support could staff

No frontend tech lead meant no clear bar for what blocked launch. And Customer Support worried about refund volume after launch. They wanted a way to allocate staffing and hold the refunds SLA. Fix: I put together launch-blocking bug levels with design and engineering (P0 = blocks a critical user journey, P1 = medium bugs, P2 = complicated, non-blocking), and we rolled out in stages (5%, 25%, 50%, 100%), so CS could watch volume and adjust staffing.

## Results

| Metric | Outcome |
| --- | --- |
| Feature adoption and usage | Dominant refunds channel within 2 weeks of full rollout. 5+ requests per week. 80% funnel completion. |
| Worker LTC | 53% vs 47% for email refunds, at comparable grant rates |
| Retention | Not examined at launch. When we later changed the policy significantly (price assurance), retention rose ~5%. |
| Support cost per refund case | Never fully measured. Estimated at ~IDR 50 million per year in savings. Small, because the company and the market were both early. |
| Revenue guardrail | Not crossed |

I left the team at the end of Q1, so the rollout numbers above are from the team's tracking.

## What I would improve next

- Scope the MVP with engineering earlier. More time together before we committed.
- Run product review earlier to capture feedback from the broader product development team.
- Get the analytics resources to measure outcomes properly, instead of estimating them.
