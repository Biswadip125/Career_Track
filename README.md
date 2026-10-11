# Job Application Tracker
 
A simple web application that helps job seekers keep track of the jobs they have applied for. Users can add new applications, view all of them in one place, update their status as the process moves along, and delete the ones they no longer need.
 
## Features
 
- **Create** a new job application (company, role, date applied, status, notes)
- **Read** all applications in a clean, easy-to-scan list
- **Update** an application, e.g. change status from *Applied* to *Interview* or *Offer*
- **Delete** applications that are no longer relevant
- Responsive UI that works on desktop and mobile
- Form validation for required fields
## Technologies Used
 
> Edit this list to match your actual stack.
 
- **Frontend:** React, JavaScript, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Tools:** Git, GitHub, npm, Postman
- **AI Tool:** Kiro / Code0 *(keep the one you used)*
## Setup and Installation
 
### Prerequisites
 
- [Node.js](https://nodejs.org/) (v18 or later)
- npm or yarn
- MongoDB (local installation or a MongoDB Atlas connection string)
### Steps
 
1. **Clone the repository**
```bash
   git clone https://github.com/Biswadip125/Career_Track
   cd Career_Track
```
 
2. **Install backend dependencies**
```bash
   cd backend
   npm install
```
 
3. **Configure environment variables**
   Create a `.env` file inside the `backend` folder:
```env
   PORT=3000
   MONGO_URI=mongodb+srv://biswadipchowdhury114_db_user:LX9rWEXitVdN5Jy6@cluster0.kxk1bnf.mongodb.net/?appName=Cluster0
```
 
4. **Install frontend dependencies**
```bash
   cd ../frontend
   npm install
```
 
## How to Run the Application
 
1. **Start the backend server**
```bash
   cd backend
   npm start
```
 
   The API runs at `http://localhost:3000`.
 
2. **Start the frontend**
```bash
   cd frontend
   npm start
```
 
   The app opens at `http://localhost:5173`.
 
## AI Tool Used
 
**Kiro** *(or Code0, replace as appropriate)*
 
## AI Development Experience
 
I used Kiro as an AI pair-programming assistant throughout development. I used it to scaffold components quickly, generate boilerplate for the API, and debug issues as they came up, then reviewed and adjusted the generated code to fit the project. It sped up repetitive work such as form handling and CRUD wiring, which let me spend more time on structure, user experience, and testing the full flow end to end.
 
### Specific Tasks Where AI Helped
 
1. **Component development:** Built the job application form and list components, including state handling and controlled inputs.
2. **API creation:** Generated the Express routes and controllers for the create, read, update, and delete endpoints.
3. **Debugging:** Tracked down and fixed issues such as state not updating after edits and CORS errors between frontend and backend.
4. **Database integration:** Set up the Mongoose schema and connected the API to MongoDB.
5. **Refactoring:** Cleaned up repeated code by extracting reusable components and API helper functions.
## Project Structure
 
```
.
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
└── README.md
```
 
## Future Improvements
 
- User authentication
- Filter and search by status or company
- Reminders for follow-ups and interview dates
## License
 
This project is open source and available under the [MIT License](LICENSE).
 
