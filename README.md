"# AI-Budy" 
---

![Prompt-to-Website-Generator-04-27-2025_01_18_PM (1)](https://github.com/user-attachments/assets/867e3814-1e78-4115-ac5b-4baf92b0bab8)

![Prompt-to-Website-Generator-04-27-2025_01_18_PM](https://github.com/user-attachments/assets/287afcaa-e017-430a-b0af-cc932dc7f49a)

![Prompt-to-Website-Generator-04-26-2025_05_47_PM](https://github.com/user-attachments/assets/a7db9d8c-fd22-40b6-95c9-8b2b73da5a98)

# Node.js Project Setup

This project uses Node.js and requires API keys and configuration for AI model integrations (Gemini, OpenAI, Azure OpenAI).  
Follow the steps below to set up and run the project locally.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)
- Valid API keys for:
  - Google Gemini
  - OpenAI
  - Azure OpenAI (self-deployed)

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
```

2. **Install dependencies:**

```bash
npm install
```
_or, if you prefer Yarn:_
```bash
yarn install
```

---

## Configuration

Before running the project, you must configure the required API keys.

1. Create a `.env` file in the project root:

```bash
touch .env
```

2. Add the following environment variables inside `.env`:

```dotenv
# Google Gemini API Key
GEMINI_API_KEY=your-api-key-here

# OpenAI Secret Key
OPENAI_SECRATE_KEY=your-openai-secret-key-here

# Azure OpenAI Deployment (For Self-deployed Models)
AZURE_OPENAI_API_BASE=https://your-azure-openai-instance-url/
AZURE_OPENAI_DEPLOYMENT_ID=your-azure-deployment-id-here
```

> **Note:**  
> - Make sure there are no extra spaces around the `=` sign.
> - Do not commit your `.env` file to version control (it is already included in `.gitignore`).

---

## Running the Application

After completing the setup:

```bash
npm run dev
```
_or with Yarn:_
```bash
yarn dev
```

The application will start, and you can access it at:

```bash
http://localhost:3000
```

---

## Environment Variable Summary

| Variable                  | Description                                  |
| :------------------------ | :------------------------------------------- |
| `GEMINI_API_KEY`           | API Key for Gemini model access              |
| `OPENAI_SECRATE_KEY`       | Secret key for OpenAI usage                  |
| `AZURE_OPENAI_API_BASE`    | Base URL for your Azure-hosted OpenAI service |
| `AZURE_OPENAI_DEPLOYMENT_ID` | Deployment ID for your Azure OpenAI model     |

---

## Notes

- **Mandatory:**  
  At least one valid API key must be provided based on the model you are planning to use.

- **Priority Order (If all are present):**  
  1. **Azure OpenAI** (self-deployed)
  2. **OpenAI**
  3. **Gemini**

- **Security Tip:**  
  Never expose or hard-code your API keys inside the codebase.

---

## License

This project is licensed under the MG. You are not allowed to use this for commercial purposes without permission



Of course! Here's the **React version** of the `README.md`, keeping it in the same clean and professional format you liked:

---
=========================================================================================================
# React Project Setup

Follow the instructions below to set up and run the project locally.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Backend API running at the specified URL (default is `http://localhost:3002`)

---

## Installation

1. **Clone the repository:**

```bash
git clone the_repo_url
cd your-project-name
```

2. **Install dependencies:**

```bash
npm install
```
_or if you prefer Yarn:_
```bash
yarn install
```

---

## Configuration

Before running the project, configure your API endpoint.

1. Create a `.env` file in the project root:

```bash
touch .env
```

2. Add the following environment variable inside `.env`:

```dotenv
# Base URL for API Requests
REACT_APP_API_URL=http://localhost:3002
```

> **Important:**  
> - In React, **all environment variables must start with `REACT_APP_`** to be accessible in the frontend.
> - Do not commit your `.env` file (it's already listed in `.gitignore`).

---

## Running the Application

After setting up the environment:

```bash
npm run dev
```
_or with Yarn:_
```bash
yarn dev
```

The app will be available at:

```bash
http://localhost:5173
```

---

## Environment Variable Summary

| Variable           | Description                    |
| :----------------- | :----------------------------- |
| `REACT_APP_API_URL` | Base URL of your backend server |

---

## Notes

- If you change the API server URL (e.g., deploy to production), remember to update the `REACT_APP_API_URL` accordingly.
- After modifying `.env`, you must **restart** the development server for changes to take effect.

---

## License
This project is licensed under the MG. You are not allowed to use this for commercial purposes without permission
