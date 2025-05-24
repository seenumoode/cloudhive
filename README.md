# CloudHive Feature Idea Portal

A lightweight web application for employees to submit, view, vote on, and manage feature ideas. Built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**, it offers a responsive UI and a simple backend for idea and employee management.

## Table of Contents

- [Overview](#overview)
- [How to Run the Project](#how-to-run-the-project)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
- [Design Details](#design-details)
  - [Constraints](#constraints)
  - [Assumptions](#assumptions)
  - [Technical Explanations](#technical-explanations)
- [Potential Future Enhancements](#potential-future-enhancements)
- [Navigation](#navigation)

## Overview

The **CloudHive Feature Idea Portal** enables small teams to collaboratively manage feature ideas. Employees can submit new ideas, view existing ones, vote on them, and delete ideas as needed. The application leverages modern web technologies for a fast, type-safe, and responsive experience, with a file-based backend for simplicity.

## How to Run the Project

### Prerequisites

Ensure the following tools are installed:

- **Node.js**: Version 18.x or higher (check with `node -v`)
- **pnpm**: Version 8.x or higher (check with `pnpm -v`)
- **Git**: For cloning the repository (check with `git --version`)

### Installation Steps

**Clone the Repository**:

```bash

cd cloudhive-portal
```

**Install Dependencies**:

```bash

pnpm install
```

**Run in Development Mode**:

```bash

pnpm dev
```

Access the application at http://localhost:3000.

**Build for Production**:

```bash

pnpm build
```

**Run in Production Mode**:

```bash

pnpm start
```

Access the application at http://localhost:3000.

## Design Details

### Constraints

- File-Based Storage: Uses employees.json and ideas.json for simplicity, limiting scalability and concurrent access.

- Single-User Workflow: No authentication or user roles; assumes all users can submit, vote, and delete ideas.

- Frontend-Driven Pagination: Pagination is handled client-side, which may impact performance with large datasets.

- No Real-Time Updates: Changes (e.g., new ideas, votes) require manual refresh or query invalidation.

### Assumptions

- Small-Scale Use: Designed for small teams with limited concurrent users, as JSON files are not suitable for high traffic.

- Employee Data Availability: Assumes employees.json is pre-populated with valid employee IDs and names.

- Basic Validation: Minimal input validation (e.g., required fields) on idea submission, assuming users provide valid data.

- Local Development: Optimized for local or small-scale deployment, not cloud or distributed environments.

### Technical Explanations

- Next.js App Router: Leverages Next.js 15’s App Router for server-side rendering and API routes, ensuring fast page loads and SEO.

- TanStack Query: Manages data fetching and caching, with query invalidation to refresh ideas after votes or deletions.

- Tailwind CSS: Provides responsive, utility-first styling with custom components (e.g., TWButton, TWSelect) for consistency.

- File System Backend: API routes read/write to JSON files using fs/promises, chosen for simplicity over a database.

- TypeScript: Enforces type safety with interfaces (Idea, Employee) for robust development.

- UUID: Generates unique IDs for ideas, ensuring no collisions.

## Potential Future Enhancements

- Database Integration: Replace JSON files with a database (e.g., MongoDB, PostgreSQL) for scalability and concurrent access.

- Authentication: Add user authentication (e.g., OAuth, JWT) to restrict actions (e.g., only admins can delete ideas).

- Real-Time Updates: Implement WebSockets or Server-Sent Events for live updates on new ideas or votes.

- Advanced Search: Support filtering by priority, employee, or date, with server-side search for performance.

- Input Validation: Add stricter validation (e.g., max length for summary, valid employee IDs) and error feedback.

- Analytics Dashboard: Include metrics (e.g., most upvoted ideas, active employees) for admins.

- Accessibility: Enhance ARIA support and keyboard navigation for better accessibility.

- Cloud Deployment: Optimize for deployment on Vercel or AWS with proper environment variables and scaling.

- File Uploads: Allow attaching images or documents to ideas for richer submissions.

- Testing: Add end-to-end tests with Cypress and improve unit test coverage for edge cases.

## Navigation

- Home (/): Lists ideas with search and pagination. Click an idea’s title for details.

- Create Idea (/create): Submit a new idea with summary, description, employee ID, and priority.

- Idea Details (/ideas/[id]): View idea details, upvote/downvote, or delete.
