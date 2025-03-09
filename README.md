This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Requirements

- Node.js 18.x or later
- pnpm 9.x or later

## Local Setup

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

## Getting Started

First, run the development server:

```bash
pnpm dev
```

## Running Playwright Tests

```bash
pnpm exec playwright test
```

## Running Playwright Tests in UI Mode

```bash
pnpm exec playwright test --ui
```

## Show Playwright Test Report

```bash
pnpm exec playwright show-report
```
