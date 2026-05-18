### Backend InnovaLearn

Backend used for project InnovaLearn, a LMS platform still in development for online teaching for everyone.

## ✨ Features 

- **CRUD of Courses**: Teachers will be able to create courses, units, lessons with materials they can upload and even tasks.
- **Grade reviews**: Teachers will be able to download and visualize the files submitted by users to a task.
- **Explore**: Intuitive interface filtered by categories to search for the course that's more interesting for you.
- **Text Formatting**: Teachers will be able to edit the description of their lessons, tasks and courses with a text editor. Also allowing embedded videos. 
- **Calendar**: Users will be able to visualize past / active tasks in a all in one calendar.
- **Graphics**: Teachers can visualize in the dashboard everything related to their courses and students.
- **Messaging service**: Chat in web, where you can text anyone who's already online.


---

## 📌 TODO LIST

- Fix the retrieval of urls when file system is used instead of minio.
- Task creation only works if there's students since when a task is created, it automatically creates the submissions for the assigned students.
  * Simply reconsider if this is logical to do considering the main idea of the project.
- Keycloak and google auth.
- Refactor of dtos and the information sent back from the server.
- Proper management of errors.
- In UserProjects - retrieve the url of the image dynamically.

## How to deploy
1.- Clone project.  
2.- npm install.
3.- Clone env.template and rename it to .env.
4.- Change enviroment variables, specially STORAGE_PROVIDER depending if you're using the file system of minio ('local' | 'minio').
5.- Deploy database with docker-compose up -d.
6.- Use npm run start:dev.
