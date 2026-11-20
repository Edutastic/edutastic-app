# Edutastic

Edutastic is a learning web application for children aged 4–12. Parents create and manage accounts; child profiles and age-specific learning activities are handled separately.

This guide explains how to set up **Edutastic locally**, including PostgreSQL, Docker, Prisma, Better Auth, and the GitHub workflow.

## 1. How the local setup works

- **Next.js** runs on your computer using `npm run dev`.
- **PostgreSQL** runs in a Docker container defined by `compose.yaml`.
- **Prisma 7** manages the database schema through version-controlled migrations.
- **Better Auth** handles parent registration, login, and sessions.
- **GitHub** shares application code, database schema, migrations, and Docker configuration—not private secrets or database records.

Each developer gets **their own local PostgreSQL database**. Everyone shares the *same structure* through Prisma migrations, but accounts and test data created on one computer do not appear on another.

### Expected local connection

| Setting | Value |
| --- | --- |
| Database | `edutastic` |
| PostgreSQL user | `edutastic` |
| PostgreSQL password | `edutastic_dev_password` (local-development example) |
| Host from Next.js/Prisma | `localhost` |
| Host port | `5433` |
| PostgreSQL container port | `5432` |
| Next.js URL | `http://localhost:3000` |

These values must match the repository's `compose.yaml`. We use host port **5433** to avoid a conflict with PostgreSQL already installed on the computer on port 5432.

## 2. Prerequisites

Before starting, install:

1. **Git** — to clone and update the repository.
2. **Node.js and npm** — use a Node.js version supported by the versions in this repository's `package.json` and lockfile.
3. **Docker Desktop** — **required for the team's standard Windows/macOS setup**; start Docker Desktop and leave it running while developing. On Linux, install Docker Engine and the Compose plugin instead.
4. **VS Code** (recommended) or another editor.

Docker Desktop download: https://www.docker.com/products/docker-desktop/

### Additional Windows requirements

Docker Desktop uses Windows virtualization and commonly the **WSL 2** backend:

1. Open **Task Manager → Performance → CPU** and check that **Virtualization** says **Enabled**.
2. Press `Win + R`, type `optionalfeatures`, and make sure **Virtual Machine Platform** and **Windows Subsystem for Linux** are enabled.
3. Restart Windows if features were changed.
4. If needed, open PowerShell as Administrator and run `wsl --update`.
5. Start **Docker Desktop** and wait for its engine to be running.

Verify the tools in PowerShell:

```powershell
git --version
node --version
npm --version
docker --version
docker compose version
docker info
```

`docker info` must show **Server** information. If it only shows client information and a connection error, Docker Desktop's engine is not running yet.

## 3. First-time setup (Windows / PowerShell)

Run all commands from the **root of the cloned Edutastic repository** (the folder containing `package.json` and `compose.yaml`).

### A. Get the project

For a new team member, clone the GitHub repository using its actual URL:

```powershell
git clone <YOUR-EDUTASTIC-REPOSITORY-URL>
cd <YOUR-REPOSITORY-FOLDER>
```

If the repository is already cloned, update it:

```powershell
git pull
```

### B. Install dependencies

```powershell
npm ci
```

`npm ci` installs the dependencies from the committed npm lockfile.

### C. Create your own private `.env`

The repository should contain a committed `.env.example` file. Copy it into a new local `.env` file:

```powershell
Copy-Item .env.example .env
```

> If you already have a working `.env`, **do not overwrite it**. Instead, compare it with `.env.example` and update only any missing settings.

Expected `.env.example` contents:

```dotenv
# Local PostgreSQL container, configured in compose.yaml
DATABASE_URL="postgresql://edutastic:edutastic_dev_password@localhost:5433/edutastic?schema=public"

# Better Auth
BETTER_AUTH_SECRET="REPLACE_WITH_YOUR_OWN_SECRET"
BETTER_AUTH_URL="http://localhost:3000"
```

**Important difference:**

- `.env.example` is a **public template**. Leave the placeholder `REPLACE_WITH_YOUR_OWN_SECRET` in it and commit the template.
- `.env` is **private**. Each developer replaces that placeholder **in their own `.env`**, never in `.env.example`.

Generate your own Better Auth secret:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the generated value into `BETTER_AUTH_SECRET` **in your local `.env`**. Keep it private. You generally do this **once on initial setup**, not after every `git pull`.

The `DATABASE_URL` password is the **Docker PostgreSQL password**, not the Better Auth secret and not the password from any separately installed PostgreSQL instance.

### D. Start PostgreSQL in Docker

Make sure Docker Desktop is open and the engine is running, then execute:

```powershell
docker compose up -d
docker compose ps
```

The `db` container should be running (and ideally show a `healthy` status). Docker Compose creates the PostgreSQL database defined by `compose.yaml`.

**Do not manually create Prisma tables in pgAdmin.** Prisma migrations create the tables.

### E. Apply Prisma migrations

```powershell
npx prisma migrate status
npx prisma migrate dev
npx prisma generate
```

- `migrate status` reports the migration state.
- `migrate dev` applies existing migrations to your **local development database** (and detects schema differences).
- `generate` builds the Prisma Client used by the application. **Prisma 7 requires this separate command.**

If Prisma warns about resetting the database, data loss, or migration drift, **stop and review the message before agreeing**. Do not use `prisma migrate reset` as a routine setup command.

Optional: inspect tables with Prisma Studio:

```powershell
npx prisma studio
```

### F. Start Edutastic

```powershell
npm run dev
```

Open:

- Application: http://localhost:3000
- Parent registration: http://localhost:3000/register
- Parent login: http://localhost:3000/login

Registration/login require the Better Auth server configuration, API route, Prisma connection, and migrations to be correctly configured. If the application's `ParentAccount` creation hook is enabled, registering a parent should create linked `User`, `Account`, and `ParentAccount` records; sessions are stored by Better Auth.

### macOS / Linux note

Use `cp .env.example .env` instead of PowerShell's `Copy-Item`; the remaining Docker Compose, npm, and Prisma commands are the same (provided a compatible Docker engine is running).

## 4. Daily development workflow

You **do not** need to reinstall Docker Desktop or generate a new Better Auth secret every day.

At the start of a work session:

```powershell
git pull
docker compose up -d
npm run dev
```

If `package.json` / the lockfile changed after pulling, run `npm ci` again. If new Prisma migrations or schema changes were pulled, run:

```powershell
npx prisma migrate dev
npx prisma generate
```

To stop the database without removing it:

```powershell
docker compose stop
```

To start it again:

```powershell
docker compose start
```

To stop and remove the container/network while **keeping the database volume**:

```powershell
docker compose down
```

> **Do not run `docker compose down -v` unless you deliberately want to delete the database volume and local data.**

## 5. Making and sharing database changes

Prisma migrations are the source of truth for **database structure**.

When you change `prisma/schema.prisma`:

1. Agree with teammates on the database change and check that no one is making a conflicting schema change.
2. Format and validate the schema:

   ```powershell
   npx prisma format
   npx prisma validate
   ```

3. Create a migration in your local development database:

   ```powershell
   npx prisma migrate dev --name describe_your_change
   npx prisma generate
   ```

   For potentially destructive changes, consider `npx prisma migrate dev --create-only --name describe_your_change`, review the generated SQL, then run `npx prisma migrate dev` to apply it.

4. Review and commit **both** `prisma/schema.prisma` and the new directory under `prisma/migrations/`.
5. Push your branch / open a pull request and coordinate merging.
6. Teammates pull the change and run `npx prisma migrate dev` and `npx prisma generate` against their own databases.

**Never manually edit another developer's local database.** Do not delete or rewrite already-shared migration history just to resolve a conflict; coordinate the fix with the team.

### Git commands before committing

```powershell
git status
git add .
git diff --cached --name-only
```

Review the staged file list before continuing:

```powershell
git commit -m "Describe your change"
git push
```

Use separate branches / pull requests for concurrent changes whenever practical.

## 6. Which files go into GitHub?

| File or folder | Commit? | Reason |
| --- | --- | --- |
| `compose.yaml` | **Yes** | Same database container configuration for everyone |
| `.env.example` | **Yes** | Shows required environment variable names and example local values |
| `.env` | **No** | Contains your actual Better Auth secret and local credentials |
| `prisma/schema.prisma` | **Yes** | Prisma database models |
| `prisma/migrations/` | **Yes** | Reproduces the database structure on other computers |
| `prisma.config.ts` | **Yes** | Prisma 7 configuration; ensure it contains no hard-coded secrets |
| `package.json` and `package-lock.json` | **Yes** | Application dependencies and scripts |
| `node_modules/` | **No** | Installed separately by `npm ci` |
| Docker volumes / live PostgreSQL data | **No** | Each developer's local data stays local |
| Generated Prisma Client | Follow the repository's existing `.gitignore` policy | Normally regenerated with `npx prisma generate` |

Make sure `.gitignore` excludes local environment files but **does not exclude `.env.example`**. If a secret file was committed previously, `.gitignore` alone does not remove it from Git history: remove it from tracking and rotate any exposed secrets.

## 7. Common problems

### `Cannot connect to the Docker daemon` or `docker_engine` pipe not found

Docker Desktop is not started, or the engine failed to start. Open Docker Desktop, wait for the engine, and retry `docker info`. On Windows, check WSL 2 and Virtual Machine Platform.

### Docker says Virtual Machine Platform is not enabled

Enable **Virtual Machine Platform** and **Windows Subsystem for Linux** in Windows Features, check hardware virtualization, restart Windows, and update WSL with `wsl --update`.

### Port 5433 is already in use

Another program uses that port. Change the **host-side** mapping in `compose.yaml` (for example, `127.0.0.1:5434:5432`) and update the port in **your own** `.env` to match. Coordinate shared changes to `compose.yaml` with the team.

### Prisma cannot connect to PostgreSQL

Check:

```powershell
docker compose ps
docker compose logs db
```

Then verify that your `.env` has the same database name, username, password, and host port as `compose.yaml`. If credentials were changed **after** the PostgreSQL volume was initialized, updating `POSTGRES_PASSWORD` in Compose alone does not change the existing database user's password.

### Prisma tables are missing

Check `npx prisma migrate status`, then apply reviewed migrations with `npx prisma migrate dev` and run `npx prisma generate`. Confirm that Prisma is using the **Docker connection on port 5433**, not a separately installed PostgreSQL instance on port 5432.

### Authentication fails

Check that `BETTER_AUTH_SECRET` is set in your local `.env`, `BETTER_AUTH_URL` matches your Next.js URL, the Better Auth API handler exists, and the authentication models have been migrated. Inspect the Next.js terminal and the browser Network tab for `/api/auth/` errors.

### I changed my `.env.example`, but my application still uses old values

The application reads the actual **`.env`**, not `.env.example`. Edit your private `.env` and restart the Next.js dev server when changing environment variables.

## 8. Security and team conventions

- Never commit `.env`, real authentication secrets, production passwords, or database dumps containing personal information.
- The PostgreSQL credentials shown in this guide are intentionally for **local, isolated development only**—not staging or production.
- Each developer creates their **own** Better Auth secret for their own database and app instance. Shared deployed app instances require consistent secret configuration.
- Keep the Docker database bound to `127.0.0.1` for local access; do not expose it publicly.
- Don't use real children's personal data as development test records.
- Back up data before destructive schema changes. Keep development, staging, and production environments separate.

## 9. Quick reference

| Task | Command |
| --- | --- |
| Start local database | `docker compose up -d` |
| Check container health | `docker compose ps` |
| Inspect database logs | `docker compose logs db` |
| Stop database | `docker compose stop` |
| Apply local Prisma changes / migrations | `npx prisma migrate dev` |
| Regenerate Prisma Client | `npx prisma generate` |
| View database data | `npx prisma studio` |
| Start Next.js | `npm run dev` |
| Check TypeScript | `npx tsc --noEmit` |

## Official references

- Docker Desktop on Windows: https://docs.docker.com/desktop/setup/install/windows-install/
- Docker Desktop with WSL 2: https://docs.docker.com/desktop/features/wsl/
- Docker Compose commands: https://docs.docker.com/reference/cli/docker/compose/up/
- Prisma 7 `migrate dev`: https://www.prisma.io/docs/cli/v7/migrate/dev

---

**Team setup summary:** Clone the repo → install dependencies → copy `.env.example` to `.env` → generate a private Better Auth secret → start Docker Desktop → `docker compose up -d` → apply Prisma migrations → generate Prisma Client → `npm run dev`.
