# Messenger App

**Live Project** → [Messenger App](https://messaging-app-beta-six.vercel.app)  
You can try it out without signing up by using the test account.  
Built as part of [The Odin Project’s messaging app assignment](https://www.theodinproject.com/lessons/nodejs-messaging-app)

---

## Project Overview

The app has three main parts:

1. **Backend API** hosted on Railway
2. **PostgreSQL database** managed with Prisma ORM, also hosted on Railway
3. **Frontend app** built with React and hosted on Vercel

---

## Tech Stack

- React, React Router, Vite, Tailwind
- Node.js, Express, TypeScript
- PostgreSQL, Prisma ORM
- JWT Auth, bcrypt
- API testing with SuperTest
- Analytics using Vercel and Simple Analytics

---

## Lessons Learned

- **Analytics Experiments**  
  I tried out Vercel Analytics and Simple Analytics to compare how they handle user tracking. Vercel uses hashed IP addresses to track unique visitors, so if someone visits more than once in a day, they still count as one. Simple Analytics doesn’t track IPs at all and instead uses referral data, which means each visit counts separately. Both were easy to set up and didn’t need a cookie banner, which I liked.

- **Feature Creep**  
  I started adding a bunch of extras that weren’t part of the core idea. It slowed me down and I ended up removing most of them. I lost time working on features that didn’t make it into the final version.

- **Workflow Improvements**  
  I built the backend completely before starting the frontend, but once I got into the frontend, I had to change a lot of the backend anyway. It made me realize it would have been better to build one feature at a time from start to finish so I could test and adjust as I went. I’ll try that next time to save myself from doing work twice.

---

## Things I'd Do Differently or Expand On

- Switching to WebSockets would make the app feel more real-time by pushing messages directly to users instead of having them refresh to get updates.

- There are a lot of features I could add, like:
  - Message reactions
  - Admin controls for group chats
  - Pinned messages
  - Profile pictures
  - Image and file sharing

---
