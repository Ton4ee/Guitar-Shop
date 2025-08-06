# 🎸 Online Guitar Shop

A 3-page guitar shop web application built with **React**, **TypeScript**, **Apollo Client**, and **GraphQL**, based on a Figma design.

This project was created for the **Software Engineer Intern Assignment**.

---

## 📄 Features

### ✅ Page 1 – Guitar Brands
- Displays all guitar brands from the GraphQL API.
- Clicking a brand navigates to the model list page.

### ✅ Page 2 – Guitar Models
- Shows all models for the selected brand.
- Includes:
  - Search bar to filter models by name.
  - Type filter (Electric, Acoustic, etc.).
  - **Infinite scroll** (loads more models as you scroll).
- Clicking a model navigates to the details page.

### ✅ Page 3 – Guitar Details
- Displayed in two tabs:
  - **Specs** – Shows guitar specifications.
  - **Musicians** – Displays musicians using the guitar.
    - Only 2 musicians shown at a time with "Show More" functionality.

### 🌐 Language Support
- Supports **English**, **Macedonian**, and **Albanian**.
- Language can be changed from the footer.

---

## 🚀 Technologies

- **React + Vite**
- **TypeScript**
- **Apollo Client**
- **GraphQL**
- **React Router**
- **i18next** (internationalization)
- **Styled Components**
- **CSS Modules**

---

## 🔧 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ton4ee/Guitar-Shop.git
   cd Guitar-Shop
2. **Install dependencies**
    ```bash
   npm install
3. **Start the development server**
    ```bash
   npm run dev
4. **Open http://localhost:5173 in your browser.**

🔗 API
GraphQL API used:

https://graphql-api-brown.vercel.app/api/graphql

🎨 Figma Design
Design reference:
https://www.figma.com/design/Q9sgkZlKkPIkiX3eRSKCJP/Design-Task?node-id=1-2&p=f&t=bTP28e3rsrbJdjD2-0

👤 Author
Antonio Puceski

Feel free to reach out if you have any questions. Thank you! 🎸
