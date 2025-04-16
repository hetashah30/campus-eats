# Welcome to CampusEats Project

CampusEats is a modern and responsive Canteen Automation System built to streamline canteen operations in schools, colleges, and universities. This platform enhances the experience for customers, canteen shop owners, and administrators by digitizing food ordering, payment, inventory, and reporting systems.

---

## Working Project video

**URL**: 

---

## Features

### 1. Customer Portal
- Browse the canteen menu with filters (veg/non-veg, snacks, meals)
- Add items to cart and place online orders
- Cashless payments via UPI, card, wallet
- Track real-time order status
- Access order history and submit feedback

### 2. Canteen Shop Owner Panel
- Dashboard to view and process real-time orders
- Manage menu: add, update, delete items
- Track daily and weekly sales reports
- Manage inventory with low stock alerts
- Offer discounts and manage combo deals

### 3. Admin Dashboard
- Manage users: customers and canteen shop owners
- View system-wide analytics (popular items, busiest hours, etc.)
- Approve/reject canteen owner accounts
- Publish announcements and platform-wide notifications

### 4. Additional Highlights
- Mobile-first responsive design
- QR code-based order pickup system
- Optional dark mode and multilingual support
- Notifications for order updates
- Review and rating system for food items

---

## Backend: Supabase

We use **Supabase** as our backend-as-a-service (BaaS) to handle:

- **Authentication**: Secure sign-up, login, and role-based access control for customers, shop owners, and admins.
- **Database**: PostgreSQL database for storing users, orders, menu items, feedback, and analytics.
- **Realtime**: Order updates are reflected in real time using Supabase's built-in capabilities.
- **Storage**: Image uploads for menu items, user profiles, and promotional banners.

Supabase offers a powerful and scalable backend with minimal configuration, making development faster and more efficient.

---

## How can I edit this code?

There are several ways to work with and modify this project:

### Use your preferred IDE

If you prefer to develop locally, you can clone the repository and push changes. Any updates you make will also be reflected in Lovable.

**Pre-requisite**: [Install Node.js & npm using nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Edit a file directly in GitHub

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit them.

### Use GitHub Codespaces

- Navigate to the main page of your repository.
- Click on the "Code" button near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new environment.
- Edit files directly within Codespaces and commit your changes.

---

## What technologies are used for this project?

This project is built with the following technologies:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- **Supabase** (for backend, auth, database, and file storage)

---
