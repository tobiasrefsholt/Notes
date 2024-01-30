# Markdown notes

Webapplication for taking notes in markdown, and organizing them into categories.

Create an accout and try it out on [mdnotes.no](https://mdnotes.no/)

## Tech Stack

**Client:** React, Vite, Typescript

**Server:** C# 12, .NET 8.0, ASP.NET, EntityFrameworkCore, MariaDB/MySql
## Lessons Learned

The main motivation behind this project was to learn React, and try out user authentication in using ASP.NET Core Identity.

The biggest problem i had, was managing state between components in the react app. But i feel like i have leard alot after starting this project.
## Deployment

### Dependencies
- .NET SDK 8
- .NET Runtime 8
- ASP.NET Core Runtime 8
- mariaDB
- nodejs

### Backend

#### Configure database

  1. Setup MariaDB database and user
  2. Update connection string

#### Configuration

```bash
  cd ApiEndpoints
  dotnet ef migrations add InitialCreate
  dotnet ef database update
  dotnet run
```

### Frontend

#### Setup for development
```bash
  cd frontend

  # Setup environment variables for local testing
  cp .env.example .env.development

  # Run for local development
  npm run dev
```

#### Build for production
```bash
  cd frontend

  # Setup environment variables.
  cp .env.example .env.production

  # Build project
  npm run build
```

## Acknowledgements

 - [react-md-editor](https://github.com/uiwjs/react-md-editor)
 - [readme.so](https://readme.so/editor)
 - [Exploring Identity Endpoints in .NET 8](https://dev.to/grontis/exploring-identity-endpoints-in-net-8-3lid)
