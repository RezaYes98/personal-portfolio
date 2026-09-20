---
title: "E-wallet Payments Integration: Redirect and Webhook-Based Confirmation"
slug: "e-wallet-integration"
company: "Doitpay"
role: "Product Manager"
date: "2025-04-01"
description: "Delivering reliable e-wallet checkout flow with redirect-based authentication and webhook-based status confirmation to ensure transaction consistency across asynchronous payment flows."
tags:
    [
        "payments",
        "e-wallet",
        "webhooks",
        "fintech",
        "payment-gateway",
        "integration",
        "asynchronous",
    ]
order: 3
---

## Overview

| **Company**            | Doitpay (Payment Gateway)                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| **Theme**              | Shipping a reliable e-wallet checkout flow with strong status consistency                             |
| **Checkout type**      | Redirect and jumpapp only                                                                             |
| **Confirmation model** | Provider callback and merchant webhooks, without polling                                              |
| **Role**               | Product Manager, leading delivery across Engineering, QA, Operations, and Compliance |

## Problem

E-wallet payments are asynchronous and user driven. A customer leaves the merchant checkout to authorize payment in a provider app, then the system must converge to a final status reliably.

The main risks are inconsistent status updates, delayed notifications, duplicate callbacks, and poor merchant experience when confirmation arrives late.

## Goals

- Provide a smooth redirect checkout flow for customers
- Ensure transaction status becomes consistent and final across all channels
- Protect merchants from duplicates and mismatched updates

## Constraints

- Asynchronous confirmation timing that is outside merchant control
- Provider callbacks can be delayed, duplicated, or missing
- Some merchants expect near real time updates, so webhook delivery needs to be reliable
- Early stage systems require strong operational visibility without a heavy process

## What I Delivered

### 1. Standardized checkout flow for redirect

**What the merchant gets:**

- A single create payment call that returns a redirect to the jump-app
- A stable internal transaction reference returned to the merchant
- Clear expiry behavior so merchants can guide customers when a payment is no longer valid

**Why it mattered:** This created a consistent merchant integration pattern that can scale across e-wallet providers.

### 2. Simple, consistent state model

I enforced a small set of canonical states to reduce ambiguity and improve operability.

**Transaction states:**

- CREATED
- PENDING
- PAID
- FAILED
- EXPIRED

**Why it mattered:**

- Fewer states reduce edge case confusion
- Merchants can build simpler logic
- Operations can reason about stuck payments faster

### 3. Webhook based confirmation strategy

**Provider callback path:**

- Verify callback authenticity and validate payload integrity
- Enforce idempotency to safely handle duplicates
- Apply strict state transition rules and write final state once

**Merchant notification path:**

- Publish a webhook event when a transaction reaches a terminal state
- Implement retry with backoff and replay safe delivery
- Provide a status query endpoint as a fallback for merchant initiated checks

**Why it mattered:** Polling can exhaust resources at scale. A webhook based approach reduces system load while still delivering reliable status convergence.

### 4. Webhook contract and merchant experience

**Webhook events:**

- payment.paid
- payment.failed
- payment.expired

**Merchant safety:**

- Stable identifiers for correlation
- Replay safe behavior for duplicate delivery
- Status query endpoint for merchant initiated checks

**Why it mattered:** Merchants can depend on a predictable contract.

### 5. Observability and evidence readiness

To support troubleshooting and audit evidence, I aligned on an evidence contract for each transition.

**Identifiers captured on every transition:**

- order_id
- txn_id
- provider_ref

**Operational signals:**

- Alerts for PENDING payments older than a threshold
- Callback verification failures and mismatch detection
- Dashboard level searchability by txn_id and provider_ref

![Operations dashboard](/case-studies/image-20241115-085811.png)

## Results

- Improved reliability by ensuring status convergence through verified provider callbacks and reliable webhook delivery.
- Reduced duplicate processing risk through idempotent updates keyed by provider references.
- Improved merchant integration quality with a consistent redirect and jumpapp flow and clear terminal states.

## What I would improve next

### 1. Stronger state transition evidence by design

- Emit a structured event record for every status change
- Capture the reason and source of truth, such as callback receipt and verification outcome

### 2. Better merchant debugging experience

- Provide a timeline view per transaction showing key checkpoints
- Include webhook delivery attempts and final delivery status

### 3. Automated reconciliation coverage

- Add periodic reconciliation for edge cases where provider and internal status diverge
- Keep manual intervention for true exceptions only

### 4. Webhook operations hardening

- Add webhook delivery observability, including delivery attempts, latency, and error rates
- Support merchant endpoint health checks and clear guidance for retry safe processing
