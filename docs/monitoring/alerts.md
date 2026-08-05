# Multi-Channel Incident Alerting & Escalation

## Overview

SynoCommerce alert routing engine dispatches SEV1-SEV4 incident alerts to PagerDuty, OpsGenie, Slack, Discord, Email, Webhooks, and SMS.

---

## Alert Routing Matrix

- **SEV1 (Critical)**: PagerDuty + OpsGenie + SMS + Slack.
- **SEV2 (High)**: PagerDuty + Slack + Email.
- **SEV3 (Medium)**: Slack + Discord.
- **SEV4 (Low)**: Email + Dashboard.
