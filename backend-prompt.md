# Prompt for Creating Express and Mongoose Backend

This prompt is designed to guide the creation of a backend project using Express and Mongoose. It is structured as multiple tasks, each dedicated to a specific module. The backend should be based on a ready-made template that includes User model and Authentication system (Auth). Incorporate the following notes:

- No file uploads to the backend; all media are handled via links.
- Images and files are uploaded to Cloudinary, stored as URLs.
- Videos are uploaded to YouTube, stored as video IDs or URLs.

Assume the template provides:

- User model with fields like username, email, password (hashed), role.
- Auth routes for register, login, JWT authentication.

## Task 1: Project Setup

- Initialize Express app with Mongoose connection to MongoDB.
- Set up middleware: CORS, body-parser, error handling.
- Integrate the Auth and Users from the template.

## Task 2: Article Module

- Create Article model based on schema: id, title, excerpt, content, image (URL from Cloudinary), date, views, category, readTime, author, tags.
- Implement CRUD routes for articles, protected by auth.
- For image: Store Cloudinary URL.

## Task 3: Event Module

- Create Event model: id, title, description, fullDescription, image (Cloudinary URL), date, time, endTime, location, attendees, status, organizer, contact.
- Implement CRUD routes.

## Task 4: Media Module

- Create a unified Media model with fields: id, type (enum: 'image', 'video', 'document'), title, description, date, category (for images), src (Cloudinary URL for images/documents), videoId (YouTube for videos), duration (for videos), views (for videos), size (for documents), downloads (for documents).
- Implement CRUD routes for media items, protected by auth.
- Handle different types with conditional logic in routes and validation.

## Task 5: MediaCoverage Module

- Model: id, title, outlet, date, type, description, thumbnail (Cloudinary URL), link, views, duration.
- CRUD routes.

## Task 6: PersonalInfo Module

- Model: name, title, email, phone, location, summary, image (Cloudinary URL), education (array), experience (array), languages (array).
- Routes for updating personal info (likely singleton, protected).

## Task 7: PressStatement Module

- Model: id, title, excerpt, content, date, category, urgent, views, shares, author, tags.
- CRUD routes.

## Task 8: Achievement Module

- Model: id, title, organization, year.
- CRUD routes, protected by auth.

## Task 9: Integration and Testing

- Add relationships if needed (e.g., reference User in author fields, PersonalInfo references Achievements).
- Implement API documentation (e.g., Swagger).
- Test all endpoints, ensure auth protection where necessary.
- Handle media links appropriately without direct uploads.
