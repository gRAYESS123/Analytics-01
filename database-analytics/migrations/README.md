# Database Migrations

This directory contains database migration scripts for version control of database schema changes.

## Migration Naming Convention

Migration files should be named with the following format:
`YYYYMMDDHHMMSS_description.sql`

Example: `20240112143000_add_user_preferences.sql`

## Running Migrations

Migrations should be run in chronological order. Each migration script should:
1. Be idempotent (safe to run multiple times)
2. Include both UP and DOWN migrations
3. Be tested in development before running in production

## Backup

Always backup the database before running migrations in production.