---
title: "Disbursement Scaling: Multi-Provider Routing and Operational Controls"
slug: "disbursement-scaling"
company: "Doitpay"
role: "Product Manager"
date: "2025-09-01"
description: "Implementing multi-provider disbursement routing with configurable rules, operational controls, and reconciliation tools to improve payout reliability and reduce single-provider dependency."
tags: ["disbursement", "payouts", "routing", "fintech", "payment-gateway", "operations", "reconciliation"]
order: 3
---

## Overview

| **Company** | Doitpay (Payment Gateway) |
| --- | --- |
| **Theme** | Making payouts reliable and controllable as volume grows |
| **Status** | Multi provider routing is live |
| **Initial constraint** | Limited initial bank coverage |
| **Success metrics** | Reliability and success rate |
| **Role** | Product Manager, leading delivery across Engineering, Operations, and Compliance |

## Problem

Disbursement is a high risk money outflow. In early stage systems, reliability issues often come from single provider dependency, fluctuating provider limits, inconsistent balances, and manual operational handling when real world exceptions happen.

The goal was to increase payout reliability while keeping operations in control and keeping data structures clean enough to audit and evolve.

## Constraints

- Limited initial provider coverage and capacity constraints
- High operational risk due to money out behavior
- Need for deterministic, explainable provider selection
- Need for safe operational handling when automation cannot resolve a case
- Evidence and auditability expectations

## What I Delivered

### 1. Multi provider activation per business

**Objective:** Reduce single provider dependency and enable redundancy.

**What shipped:**

- A configuration model where one business can have multiple active disbursement providers
- Provider enablement is controlled via a simple active or inactive toggle
- Clear admin workflows to view and maintain provider configuration per business

**Why it mattered:**

This created the foundation for reliability improvements by allowing routing to shift based on provider readiness and capacity.

![Multi-provider activation flow](/case-studies/activation%20provider%20flow.png)

### 2. Live routing logic with configurable rules

**Objective:** Select the best provider deterministically while allowing operational flexibility.

**Routing rules and order:**

1. Active
2. Sufficient limit
3. Sufficient balance
4. Provider priority (High, Medium, Low)

**Configurable behavior:**

- Each rule can be toggled on or off per business
- If a rule is off, routing bypasses it for that business

**Why it mattered:**

- Improves the success rate by avoiding providers that are not currently eligible
- Improves reliability by allowing redundancy with predictable behavior
- Reduces operational firefighting because selection is consistent and repeatable

![Routing logic flowchart](/case-studies/routing%20logic.png)

### 3. Disbursement reconciliation tool for operations

**Objective:** Provide a safe way to resolve exceptions and correct transaction status when needed.

**What shipped or designed:**

- An internal reconciliation workflow aligned to how operations triage cases
- Three tabs that represent the lifecycle of manual handling
    - Pending Disbursement
    - Disbursement Approval
    - Disbursement History
- A controlled status model
    - Pending
    - In Review
    - Success
    - Failed

**Why it mattered:**

Disbursement exceptions are inevitable. The tool reduces time to resolution while keeping changes structured and reviewable.

### 4. Policy and data model decisions that reduce risk

**Objective:** Prevent misdirected payouts and ensure the configuration model can scale.

**Policy:**

- The disbursement bank account must match the registered business bank account

**Data model decisions:**

- One disbursement provider can have multiple associated source accounts
- A Disbursement Source Account settings model with internal management
    - Create, read, update only
    - No delete
    - No bulk import

**Why it mattered:**

- The policy reduces fraud and operational error surface area
- The source account model supports growth without forcing workarounds
- The restricted CRUD model preserves control and auditability

## Results

- Increased payout reliability by enabling redundancy and deterministic routing across providers.
- Improved success rate by routing away from providers that fail eligibility checks.
- Reduced operational ambiguity with a clear internal workflow for exceptions and status resolution.

## What I would improve next

### 1. Routing explainability in the admin UI

- Show which provider was selected
- Display which routing rules were applied for that business
- Provide a decision log reference to support investigation

### 2. Decision logging for audit and debugging

- Emit a routing decision record per disbursement attempt
- Include correlation ID, selected provider, rule outcomes, and timestamps

### 3. Stronger reconciliation automation coverage

- Automate reconciliation for common mismatch patterns
- Reserve manual handling for true exceptions