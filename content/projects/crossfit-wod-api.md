---
title: "CrossFit WOD API"
slug: "crossfit-wod-api"
date: "2024-03-15"
description: "REST API for CrossFit workout of the day (WOD) data with Express.js and Node.js. Serves workout data for fitness applications."
tags: ["Node.js", "Express", "API", "REST"]
link: "https://wod-api-v2.onrender.com/"
github: "https://github.com/RezaYes98/crossfit-wod-api"
status: "active"
order: 1
---

## Overview

A lightweight REST API that serves CrossFit workout of the day (WOD) data. Built to learn API design patterns and to provide data for a personal fitness tracking app.

## Technical Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Deployment:** Render

## Key Features

- RESTful endpoints for workout data
- Filtering by workout type (AMRAP, For Time, EMOM)
- Pagination support
- Rate limiting
- Clean API documentation

## What I Learned

Building this project taught me about API versioning strategies, proper error handling patterns, and the importance of consistent response structures. I also learned about deployment best practices and how to structure a Node.js application for maintainability.

## API Endpoints

```
GET /api/v1/workouts - Get all workouts
GET /api/v1/workouts/:workoutId - Get workout by ID
POST /api/v1/workouts - Create new workout
PUT /api/v1/workouts/:workoutId - Update workout
DELETE /api/v1/workouts/:workoutId - Delete workout
```

## Why I Built This

As a PM working in fintech, I wanted to understand API design from a hands-on perspective. This project helped me better collaborate with engineering teams and make more informed technical decisions.
