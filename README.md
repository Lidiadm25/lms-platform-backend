### Backend InnovaLearn

Backend for **InnovaLearn**, an LMS platform currently in development for accessible online education.

## ✨ Features

- **Course CRUD**: Teachers can create and manage courses, units, lessons, materials, and assignments.
- **Assignment Review**: Teachers can view and download files submitted by students for assignments.
- **Explore Section**: Intuitive interface with category-based filtering to help users discover courses that interest them.
- **Rich Text Formatting**: Teachers can edit course, lesson, and assignment descriptions using a rich text editor with embedded video support.
- **Calendar**: Users can view past and active assignments in an all-in-one calendar.
- **Analytics Dashboard**: Teachers can visualize statistics and insights related to their courses and students.
- **Messaging Service**: Real-time web chat that allows users to communicate with others who are online.

---

## 📌 TODO LIST

- Fix URL retrieval when using the local file system instead of MinIO.
- Task creation currently only works if students are already enrolled, since submissions are automatically generated for assigned students.
  - Reconsider whether this behavior aligns with the project's intended workflow.
- Add Keycloak and Google authentication.
- Refactor DTOs and improve API response structures.
- Implement proper error handling and management.
- In `UserProjects`, retrieve image URLs dynamically.

---

## 🚀 How to Deploy

1. Clone the project.
2. Run `npm install`.
3. Copy `env.template` and rename it to `.env`.
4. Configure the environment variables, especially `STORAGE_PROVIDER` depending on whether you are using the local file system or MinIO (`local` | `minio`).
5. Start the database with:

   ```bash
   docker-compose up -d
