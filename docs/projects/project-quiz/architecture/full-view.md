---
sidebar_position: 3
sidebar_label: Full view
---

# Full view

On this page we have provided you a full overview of our setup.

# Architecture and Infrastructure Considerations for the Project

This document describes the planned infrastructure and authentication model for a web application consisting of **WordPress**, **Flutter (Web & Mobile)**, a **.NET backend**, and **Postgres** as the database.  
The entire solution will be hosted on **Hetzner Cloud** and will use **Firebase Authentication** as the central login provider.

---

## 1. Objectives
- Unified login for all users (WordPress, Flutter Web, Flutter Mobile, .NET API).  
- Cost-efficient solution, but flexible and scalable.  
- Hosting everything on Hetzner to reduce complexity.  
- Automated deployments via **GitHub Actions**.  

---

## 2. Component Overview
- **WordPress**  
  - Runs on the main domain `example.org`  
  - Uses Firebase Authentication via plugin (or custom integration)  

- **Flutter Web App**  
  - Runs on `quiz.example.org`  
  - Deployed as a static web app (HTML, JS, CSS) via Nginx container  
  - Flutter Mobile apps also connect to the same backend API  

- **Backend (.NET API)**  
  - Runs on `api.example.org`  
  - Delivered as a Docker container  
  - Responsible for business logic and database access  
  - Validates Firebase JWT tokens  

- **Postgres Database**  
  - Runs in a Docker container on Hetzner VPS  
  - Stores application data (not user logins — those come from Firebase)  
  - Optional: Admin UI (pgAdmin or Adminer) for DB management  

- **Firebase Authentication**  
  - Central login solution (Email/Password, Google, Apple, …)  
  - Issues JWT tokens for Flutter and WordPress  
  - Tokens validated in the .NET API  

- **Redis Cache**
  - (Not yet fully defined).
  - Since we might want a fast way to load informations and store them at the same time, we will include Redis.
  - It would preload all the questions for a game and the user only need to load them.

---

## 3. Architecture Diagram

```
              example.org
           ┌───────────────┐
           │   WordPress   │
           │ (Firebase-SSO)│
           └───────────────┘
                    │
                    ▼
              quiz.example.org
           ┌───────────────────────┐
           │   Flutter Web App     │
           │ (and Flutter Mobile)  │
           └───────────────────────┘
                    │
    Login + Token   │
      via Firebase  │
                    ▼
            🔑 Firebase Auth
      - User Login (Mail, Google, etc.)
      - JWT Token for API & WordPress
                    │
                    ▼
              api.example.org
    ┌───────────────────────────────┐
    │ Docker Host / VPS (Hetzner)   │
    │                               │
    │  - .NET API (Container)       │ ← validates JWT
    │  - Postgres (Container)       │ ← stores data
    │  - pgAdmin (optional)         │
    │  - Nginx (Flutter Web)        │
    └───────────────────────────────┘
```

---

## 4. Hosting Strategy (Hetzner)

- **VPS (Hetzner Cloud Server, e.g. CX21 – 2 vCPU, 4 GB RAM, ~6 €/month)**  
  - Docker host for API, Postgres, Nginx (Flutter Web)  
  - Can also run WordPress → everything centralized  

- **Domains**  
  - `example.org` → WordPress  
  - `quiz.example.org` → Flutter Web (Nginx container)  
  - `api.example.org` → .NET API  

- **Security**  
  - HTTPS via Let’s Encrypt (e.g. with [Traefik](https://traefik.io) or [NGINX Proxy Manager](https://nginxproxymanager.com))  
  - Firewall rules (only ports 80, 443, 22 open)  
  - Postgres only accessible inside the Docker network  

---

## 5. Authentication Flow

1. User opens `quiz.example.org` (Flutter Web).  
2. Login is handled through Firebase SDK (Email/Password or Social Login).  
3. Firebase issues a **JWT token**.  
4. Flutter (Web/Mobile) calls `api.example.org` and sends the JWT in the `Authorization` header.  
5. .NET API validates the JWT against Firebase public keys.  
6. API executes business logic (e.g., start quiz, store score) and persists data in Postgres.  
7. WordPress users can also log in through Firebase, ensuring a unified login.  

---

## 6. Deployment (CI/CD with GitHub Actions)

- **GitHub Actions Workflows** for each component:
  - **.NET API**  
    - Build → Docker Image → Push to Docker Hub → Deploy on Hetzner VPS via SSH  
  - **Flutter Web**  
    - `flutter build web` → Result packed in Nginx container → Deploy via Docker  
  - **WordPress**  
    - If containerized: updates & deployments via GitHub Actions  
    - If traditional install: updates via WP-CLI or manually  

- Example Workflow for .NET API:
  ```yaml
  name: Deploy .NET API

  on:
    push:
      branches: [ "main" ]

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - name: Setup .NET
          uses: actions/setup-dotnet@v3
          with:
            dotnet-version: '7.0.x'
        - name: Build API
          run: dotnet publish -c Release -o out
        - name: Docker Build & Push
          run: |
            docker build -t myorg/myapi:latest .
            echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USER }}" --password-stdin
            docker push myorg/myapi:latest
        - name: Deploy to Hetzner
          uses: appleboy/ssh-action@v0.1.10
          with:
            host: ${{ secrets.HETZNER_HOST }}
            username: ${{ secrets.HETZNER_USER }}
            key: ${{ secrets.HETZNER_SSH_KEY }}
            script: |
              docker pull myorg/myapi:latest
              docker-compose -f /opt/app/docker-compose.yml up -d
    ```
---

## 7. Cost Overview

We expect the resulting cost to be around 10 - 15€ with this simple setup.   
_(But other costs can come up, like Github Pro, Firebase or better Servers)_   

- Hetzner Cloud VPS: ~6–8 €/month
- Firebase Authentication: free up to 50,000 logins/month (SMS-based logins are extra)
- Domain: ~1–2 €/month
Optional: Shared Hosting for WordPress (if not containerized) ~3–5 €/month   

---

## 8. Advantages of This Setup

Cost-efficient: low base costs, Firebase Auth free for normal usage

Flexible: Docker containers are easy to scale or replace

Secure: Firebase handles authentication, no password storage in your own DB

Centralized: All components hosted on Hetzner → easy management

Automated: GitHub Actions enables smooth CI/CD pipelines

---

## 9. Outlook

Scaling: If traffic grows → Kubernetes cluster (e.g. Hetzner Cloud + K3s)

Monitoring: Prometheus + Grafana or Hetzner Monitoring

Caching: Redis container for performance improvements

Feature Expansion: Roles & permissions via Firebase custom claims