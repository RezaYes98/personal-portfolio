---
title: "PJP2 Compliance Readiness: Service Flows, Test Strategy, and UAT Evidence"
slug: "pjp2-compliance"
company: "Doitpay"
role: "Product Manager"
date: "2025-05-01"
description: "Preparing Doitpay's Bank Indonesia PJP Category 2 submission: service flows, test strategy, and audit-ready UAT evidence."
tags: ["compliance", "fintech", "payment-gateway", "testing", "audit", "qris", "fraud-detection"]
order: 1
---

## Overview

| **Company** | Doitpay (Payment Gateway) |
| --- | --- |
| **Initiative** | Bank Indonesia **PJP Category 2** submission readiness |
| **Status** | Submitted and currently under review |
| **Duration** | Approximately 6 months |
| **Role** | **Product Manager**, leading delivery across Compliance, Engineering, QA, and Operations |

## Problem

Doitpay needed to demonstrate PJP2 operational readiness in a way that auditors could review efficiently. That required more than describing product behavior. It required clear service flows, repeatable testing, and defensible evidence that links scenarios to system outcomes.

At the same time, Doitpay was still in its early stages. Several flows were evolving, and the system did not yet capture all the data points typically expected for audit evidence.

## Constraints

- High bar for audit traceability and reproducibility
- Product and operational flows are still changing during the period
- Evidence gaps due to incomplete event capture and inconsistent identifiers
- Tight timelines, extended by late submission timing and evidence readiness work

## What I Delivered

### 1. Auditor friendly service flow documentation

**Objective:** Create a clear end to end view of how money moves, who acts at each step, and where evidence should exist.

**Deliverable highlights:**

- An end to end QRIS service flow that documents actors, boundaries, and state transitions
- Explicit exception paths such as timeouts, duplicate notifications, and status mismatches
- Evidence hooks that identify where logs, IDs, and reconciliation references should be available

**Why it worked:**

The flow documentation became the source of truth that aligned Compliance, Engineering, QA, and Ops. It also surfaced observability gaps early, which reduced surprises during evidence collection.

![QRIS service flow diagram](/case-studies/QRIS%20FLow.svg)

### 2. Test strategy for PJP2 readiness

**Objective:** Convert compliance expectations into an executable testing program with clear acceptance criteria.

**Key decisions and structure:**

- Focused scope on payment readiness to reduce risk and ambiguity
- Unified test strategy across both Merchant facing and Admin facing modules
- Defined testing tools and operating model
- Established entry and exit criteria and what constitutes acceptable evidence per scenario

**Included modules:**

- Invoice
- Payment
- Dashboard
- Fraud detection controls
- User management
- Reporting
- Adjustment balance as an internal control module

## FDS Rules

| **Code** | **Description** | **Trigger** |
| --- | --- | --- |
| **VEL_SPIKE** | Sudden surge in transaction volume for a merchant relative to historical, and amount average | Real‑time |
| **ODD_HOURS** | Follow VEL_SPIKE rules, with average times historical | Real‑time |
| **DORMANT** | Merchant inactive ≥ 6 months | Daily batch |
| **HIGH_VALUE_DISB** | Cumulative disbursement transactions >= IDR 500 million/day to the same beneficiary account | 30 minutes before closing |

![Fraud detection dashboard](/case-studies/Screenshot%202026-01-17%20at%2019.32.52.png)

![FDS rule configuration](/case-studies/Screenshot%202026-01-17%20at%2019.30.16.png)


### 3. UAT plan and evidence pack

**Objective:** Produce UAT scenarios and an evidence pack that can withstand audit review.

**Coverage:**

- Debit card, virtual account, and e-wallet flows
- Positive and negative scenarios

**Evidence pack format:**

- Scenario index linking each test case to preconditions, steps, expected results, and actual results
- Evidence references using sanitized screenshots and sanitized API logs where appropriate
- Defect references for deviations with resolution notes

![UAT evidence pack](/case-studies/Screenshot%202026-01-17%20at%2019.37.13.png)

## The hardest part and how I addressed it

The most difficult challenge was the evidence format in an immature system. Some flows did not consistently generate the artifacts auditors typically expect, such as stable IDs, complete event logs, or reliable state transitions.

I addressed this with three pragmatic moves.

1. Standardize what counts as acceptable evidence by scenario type, such as UI proof, API proof, and log proof.
2. Created an evidence mapping approach that links each critical step to expected evidence, then marks whether it exists and what remediation is needed.
3. Turned evidence gaps into a prioritized observability backlog so the platform could mature systematically.

## Results

- Successfully packaged the submission documentation, testing strategy, and UAT evidence for PJP2 review. The review is ongoing.
- Reduced cross team ambiguity by establishing shared reference artifacts for flows, scope, and evidence requirements.
- Identified and prioritized missing evidence points, creating a roadmap to mature observability and auditability.

## What I would improve next

The next maturity step is to make evidence generation consistent by design, not assembled after the fact. This is where a Payment Intents architecture becomes a core enabler.

### 1. Introduce Payment Intents as the canonical state machine

**Why:** Payment Intents create a single lifecycle that standardizes state transitions across payment methods, including asynchronous flows.

**What to implement:**

- A clear intent lifecycle with a small set of canonical states
- A transition contract that defines valid transitions, rejection rules, and terminal states
- Idempotency guarantees for create and confirm operations
- Retry behavior that does not require creating new transactions

### 2. Evidence readiness as a product requirement

**Why:** Evidence gaps usually come from features shipped without a defined evidence contract.

**What to implement:**

- A traceability matrix mapping requirement to control, test cases, and evidence
- Version tagging for flows and evidence so reviewers understand changes over time
- Retrieval friendly audit log UI and retention standards