---
title: "In-Product Refunds Experience for Worker Retention"
slug: "refunds-experience"
company: "Kanggo"
role: "Product Manager"
date: "2023-03-01"
description: "Building in-product refund flows and semi-automated review processes to improve worker retention, operational efficiency, and customer support effectiveness in a marketplace platform."
tags: ["product-experience", "refunds", "worker-retention", "marketplace", "operations", "customer-support", "ltc"]
order: 4
---

> *Note: I can't show graphs of data due to confidentiality reason but happy to describe at high level*.

**Agenda**

- Context on Refunds: What, Why, Who
- Refunds MVP Spec 
- Challenges
- Outcomes
## Refunds Context

### Not all projects are created equal...

This is the clearest example (i.e. customer cancel the project) but there are other reasons (i.e. getting the same lead twice, project violates ToS, project details change significantly). Some of the pain worker were experiencing was due to the refunds policy rather than the mechanism. 

This resulted in very low pro NPS/LTC 

Problems: 

- Really frustrating user experience
- Inefficient from an operations perspective and application of refund policy. 

### Pain Points

- **Worker**
  - As a worker, there isn't an easy way to request a refund when I receive a bad project. 
  - As a worker, I don't get refunded for all kinds of bad projects (i.e. customer doesn't even view my response). 
  - As a worker, I don't feel that Kanggo has my back because it's overly stingy with how it gives out refunds. 
- **Customer Support agent**
  - As a CS agent, if a worker is on the phone, I feel that I have to give them a refund even if it's not in the policy because it's directly tied with how I get evaluated. 
- **Kanggo**
  - Worker Likelihood to Continue (LTC) score is low and chargeback rate is high, signaling that there are product-market fit issues with our worker product. 
  - There is no central team evaluating refunds, resulting in inefficient application of the refund policy. 

## Refunds MVP Scoping

### Goals of Refund MVP
| Metric | Outcome |
| --- | --- |
| Feature adoption & usage | Dominant refunds channel within 2 weeks of full rollout, processing 5+ refunds requests per week. 80% funnel completion rate. |
| Increase in Worker LTC and Retention | LTC increase when compared to comparable channels with similar grant rates (53% vs 47% for email). <br/>Retention: didn't examine until we changed refund policy significantly w/ price assurance, which resulted in ~5% increase.  |
| Improved operational efficiency (support cost per refund case) | Never fully measured. but estimated savings ~IDR 50 millions per year (it's small because the company stage is also still very early, and the market still premature). |
| Guardrail on revenue | Didn't surpass revenue guardrail.  |

### What's the best refund strategy to optimize for the above goals?
| Option | Description | Improve worker retention, LTC, or chargeback? | Improve operational efficiency? | Revenue impact |
| --- | --- | --- | --- | --- |
| A: Be stingy (status quo). | Give fewer refunds and only when there is a clear breach in our promise to the worker (e.g. ToS). | No - Worker currently perceive policy as unfair and inconsistent. | No - Increased operational cost given time/$$ spent scrutinizing. | Minimal given that this is the current world. |
| B: Make workers work for it | Given refund for places even where there isn't a breach in our promise to workers, but require workers to submit extensive proof and/or work. | Maybe, although this sends a message to workers that we don't trust them. | Maybe - we'll have clearer guidelines but it will still require agent time to go through them. | Mixed - Depending on implementation, we could be giving out fewer refunds, but there is still operation cost. |
| **C: Use refunds as "Product experience crutch"** | **Use refunds as a mechanism to close product gaps. This means we would lean towards granting refunds rather than litigating refund requests and will monitor for feature abuse.** | **Yes - We'll give refunds for worker frustration moments, and use as a carrot to educate workers** | **Yes - We'll default to giving out refunds rather than scrutinizing, which will reduce ops time.** | **Some impact as we'll be giving out more refunds, but we'll be saving $$ on operational cost.** |

### Refunds MVP

- **Overall theme:** Build the infrastructure for future changes to refunds. 
  - Workstream 1: Build in-product refund flow in-product across mobile app. 
  - Workstream 2: Semi-automate refunds review process on the operations side. 
- **Post-MVP:** 
  - Iterations to the refunds flow
  - V2 features to refunds flow (i.e. refunds view status page)
  - Make changes to the refunds policy (i.e. unresponsive customer). 

### Refunds MVP Teams + Tasks
| Workstream | High-Level Tasks | Teams |
| --- | --- | --- |
| Build in-product refund flow in-product across mobile app. | Designs completed + research<br/>Build out new backend to track refunds  + status, connect with Qontak for CS tracking<br/>Front-end implementation of refunds flow<br/>GTM rollout | Engineer<br/>UI/UX<br/>Legal<br/><br/>(5 Peoples) |
| Semi-automate refunds review process on the operations side.  | Create new team solely focused on refunds processing, align with Trust & Safety. <br/>Get alignment on V0 refund policy with leadership<br/>Train agents <br/>GTM rollout | Customer Supportt<br/>Legal<br/>Field Officer<br/><br/>(5 Peoples) |

## Challenges

### Challenge 1: MVP designs

- Challenge: to launch this project by end of Q4, we needed designs ASAP so engineer can start scoping. 
  - However, the designer to this project was new to this area, and wanted to conduct research to make sure we were on the right track. 
- Solution: 
  - Designer taken off other projects to solely focus on ramping up on in-product refunds. 
  - Did user research of MVP designs with field officer instead of workers to get feedback faster.  

### Challenge 2: Trust & Safety w/ Operations Rollout

- Challenge: 
  - Trust & Safety (T&S) needs to review all free text responses coming into TT for any T&S concerns, but we didn't consider this requirement in MVP scoping. 
- Solution: 
  - Setup meeting with T&S and refunds operations folks to align on how we'd align the process and SLA for T&S reviewal of refund requests. Didn't require any significant headcount adjustments. 
  - Aligned on scope for how to deal with refund processing if there is a T&S concern (came up with new email copy). 

### Challenge 3: How to define launch readiness + rollout

- Challenge
  - There wasn't a clear idea of what is/isn't a launchblocking bug because no frontend TL. 
  - Customer Support (CS) had concerns about an increase in refund volume after launch and wanted a way to understand how to allocate appropriate staffing to maintain refunds SLA. 
- Solution
  - I put together a process on defining launchblocking bug w/ design + engineer (P0 = blocking critical user journey and/or easy polish, P1 = nice-to-haves medium-sized bugs, P2 = complicated non-launch blocking bugs). 
  - We put together a staged rollout plan (i.e. 5%, 25%, 50%, and 100% rollout) so CS had enough time to get data on refund volume and adjust staffing accordingly. 

## Outcome

> *Note: I left the team in end of Q1.* 

### View of Goals of Refund MVP
| Metric | Outcome |
| --- | --- |
| Feature adoption & usage | Dominant refunds channel within 2 weeks of full rollout, processing 5+ refunds requests per week. 80% funnel completion rate. |
| Increase in Worker LTC and Retention | LTC increase when compared to comparable channels with similar grant rates (53% vs 47% for email). <br/>Retention: didn't examine until we changed refund policy significantly w/ price assurance, which resulted in ~5% increase.  |
| Improved operational efficiency (support cost per refund case) | Never fully measured. but estimated savings ~IDR 50 millions per year (it's small because the company stage is also still very early, and the market still premature). |
| Guardrail on revenue | Didn't surpass revenue guardrail.  |

### Personal Learnings

- Grew by: 
  - First large cross-functional project across two different engineering teams. 
  - First time working intensively with our operations team. 
  - First time at Kanggo building relationships between different types of teams. 
- Could be betters for next time: 
  - Spend more time with engineering scoping MVP. 
  - Conduct product review earlier to capture feedback from broader product development team. 
  - More analytics resources to fully measure outcomes of the project

## Appendix

| 1st week of Nov: | Week 3 Nov: | Week 1 Dec: | Week 2 December: | Week 1 Jan: | Week 1 March: |
| --- | --- | --- | --- | --- | --- |
| kickoff in-product refunds project | Designs finalized | Backend spec finalized | new refunds team finalized, training scheduled.  | 5% rollout for refunds | 100% rollout for refunds |

### What are the entry points for refunds?

- **In-product entry points**
  - On-track to be shipped
    - In-product scam reporting flow (IPSR)
    - Report button within conversation (Decline flow)
    - Payments history
  - Other ideas
    - Automatically grant refunds (with education on how to request refund in the future)
    - Within overflow menu as a separate CTA
- Phone (i.e. agents on phone tell workers who have requested refunds to do it in product)
- Help center
- In-App mail campaign to educate workers

