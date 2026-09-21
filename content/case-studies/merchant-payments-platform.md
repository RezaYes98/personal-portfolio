---
title: "Merchant Payments Platform: From a Hosted Checkout to a Public SNAP API"
slug: "merchant-payments-platform"
company: "Doitpay"
role: "Product Manager"
date: "2026-09-01"
description: "Taking Payment Link from a hosted checkout to a merchant platform: reusable products, a public SNAP API, roles and permissions, and reporting exports."
tags: ["payments", "payment-link", "platform", "api", "snap", "checkout", "fintech", "payment-gateway"]
order: 1
---

## Overview

- **Live** in production: invoicing and hosted checkout
- **10+** platform specs owned: checkout, API, roles, exports
- **SNAP** public API standard: Bank Indonesia, RSA-SHA256
- **Snapshot** core design call: a product is a template, not a source of truth

| **Company** | Doitpay (Payment Gateway) |
| --- | --- |
| **Product** | Payment Link, a merchant payments platform |
| **Users** | Doitpay's merchant base: UMKM, gaming/top-up, travel, mostly non-technical operators |
| **Scope** | Product strategy, checkout and dashboard UX, the SNAP public API, roles and permissions, and data export |
| **Status** | Live in production |
| **Role** | Product Manager, sole PM on the surface, driving PRDs with engineering, design, and the Finance, Ops, and CS teams |

Payment Link is Doitpay's tool for merchants to collect payments: an invoice generator plus a hosted checkout page they send to customers. I owned it as a product surface and expanded it into a platform: the checkout, a reusable-product layer, a public API, merchant access control, and the reporting exports around it.

All interface visuals below are illustrative mockups with placeholder data only.

## Problem

Payment Link started as a one-shot tool: type in an amount, generate a link, send it. That's fine for an occasional invoice, but Doitpay's real merchants bill the same items repeatedly, run multi-person teams, and increasingly wanted to generate links from their own systems rather than the dashboard.

The product had to grow from a feature into infrastructure without losing the simplicity that made it usable for non-technical merchants.

> A product is a template, not a locked source of truth. Payment Link items store a snapshot at the time the item is added. Editing a Product later must not affect previously created Payment Links.
>
> *Design principle, Products for Payment Link PRD*

## What I Delivered

### 1. The checkout experience

**A hosted page merchants can trust.** The checkout is the one screen a merchant's customer actually sees, so it had to feel legitimate and work across every payment method Doitpay supports. I specced modular payment-method enforcement so each merchant only exposes the methods they are enabled for, no dead options, no failed attempts at the last step.

![Fig. 1. Hosted checkout, only enabled payment methods render. Illustrative mockup, amounts and merchant redacted.](/case-studies/merchant-payments-fig-1-checkout.svg)

**Untangling "Expired Time".** One field was quietly doing two different jobs, controlling both how long an invoice stays valid and how long a customer has to complete payment once they start. I split them into two independent controls, which removed a whole class of merchant confusion about why links expired "early." Before the split, one "Expired Time" governed both, so a short payment window silently killed a still-valid invoice.

![Fig. 2. Decomposing one overloaded field into two intents. Illustrative diagram.](/case-studies/merchant-payments-fig-2-expired-time.svg)

### 2. Reusable products

**Save once, reuse everywhere.** Merchants re-typed the same item details on every link, so I let them save products and reuse them, and made one architectural call that kept the feature safe: a product is a template, not a source of truth. Selecting a product copies a snapshot into the invoice. Editing the product later never rewrites invoices already sent to customers.

![Fig. 3. Product catalog. Illustrative mockup, prices redacted.](/case-studies/merchant-payments-fig-3-products.svg)

- Ruthless MVP scoping: I explicitly cut images, categories, variants, inventory, tax, and storefront to ship the core value first.
- Designed so a non-technical merchant needs no training to adopt it.

### 3. From feature to platform

**A public, bank-standard API.** I took Payment Link from a dashboard-only feature to a programmable product: a Public API built on Indonesia's SNAP standard, with RSA-SHA256 signed B2B tokens. That let larger merchants generate links straight from their own systems, the difference between owning a UI feature and owning a platform.

![Fig. 4. SNAP-style API call. Illustrative, signatures and IDs redacted.](/case-studies/merchant-payments-fig-4-snap-api.svg)

**Enabling the non-technical teams.** An API is only adopted if the people around it understand it, so I built a demo brief that let Finance, Operations, Business, and CS grasp the API without reading code. Owning the rollout and internal enablement, not just the spec, is what makes a platform launch actually land. I paired it with a merchant Data Export API so merchants could pull their own transaction data for reporting and reconciliation.

### 4. Governance and scale

**Merchant access and roles.** As merchant teams grew, "who can do what" mattered. I reshaped access control, renaming the misleading "Admin" role to "Operations," adding consent before someone is added to a business, and defining who can create and view Payment Links. Multi-user, permissioned products are a maturity signal most feature PMs never touch.

![Fig. 5. Role permission matrix. Illustrative, structure only.](/case-studies/merchant-payments-fig-5-roles.svg)

**The reliability layer, cross-linked.** A payments platform lives or dies on whether money actually moves, and that reliability layer is already its own case study, so this one links to it rather than repeating it. See the [Disbursement Scaling](/case-studies/disbursement-scaling) case study for the multi-provider routing and operational controls beneath the platform. Keeping them separate lets the two reinforce each other: this shows the merchant-facing product, that shows the infrastructure that keeps it dependable.

## Outcome and Reflection

### 1. What shipped

**Payment Link went from a single-purpose link generator to a platform merchants use daily and integrate with programmatically.** The reusable-products layer removed repetitive entry, the split time controls removed a recurring support complaint, the SNAP API opened programmatic access, and roles made the product safe for real teams.

### 2. If I did it again

I'd instrument adoption earlier. The strongest version of this case study would carry real numbers, defined up front before shipping: product reuse rate, API-generated link share, and support-ticket reduction after the time-limit split.
