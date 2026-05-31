# Vadivel T Portfolio

A modern personal portfolio website built with **Next.js**, **React**, and **Tailwind CSS** to showcase my experience, skills, projects, blogs, education, and contact details.

Live Website:
https://vadivel-portfolio.vercel.app/

## About the Project

This portfolio website presents my professional background as a Web Developer with experience in WordPress, Next.js, PHP, JavaScript, MySQL, SEO tools, website optimization, automation workflows, MCP testing, FastAPI-based MCP server development, Docker, Linux, and VPS hosting.

The website is designed to be responsive, SEO-friendly, fast-loading, and easy to maintain.

## Key Features

* Responsive portfolio website
* Modern UI with clean card-based layout
* Home page with profile summary and CTA buttons
* Experience section with company details and logo
* Project slider with autoplay animation
* Blog slider with autoplay animation
* Dedicated project detail pages
* Dedicated blog detail pages
* Education page with academic background
* Skills page with technical tools and technologies
* Contact form using Gmail API
* SEO metadata for pages
* Open Graph and Twitter metadata support
* Sitemap and robots support
* Mobile responsive layout
* Optimized local images for blogs and projects

## Tech Stack

* Next.js
* React.js
* TypeScript
* Tailwind CSS
* JavaScript
* Gmail API
* Google APIs package
* Vercel
* GitHub

## Main Pages

* `/` - Home
* `/about` - About
* `/experience` - Experience
* `/projects` - Projects
* `/projects/[slug]` - Project detail page
* `/blogs` - Blogs
* `/blogs/[slug]` - Blog detail page
* `/education` - Education
* `/skills` - Skills
* `/contact` - Contact

## Project Highlights

### WordPress Development Projects

Worked on 50+ WordPress website projects covering custom theme development, ACF-based dynamic content, custom plugin development, WooCommerce setup, website speed optimization, SEO audit fixes, and ongoing website improvements.

### Next.js Website Development

Built a modern portfolio website using Next.js, React, Tailwind CSS, and AI-assisted development workflows to create a clean, responsive, and performance-focused website.

### n8n Workflow Automation

Developed automation workflows for blog publishing, Yoast SEO metadata updates, Google Sheets integration, WordPress API publishing, and PHP-based email automation.

### MCP Server Using FastAPI

Built a custom MCP server using Python and FastAPI to connect selected website data and tools with AI assistants like Claude and ChatGPT.

### Dynamic Website Using PHP and MySQL

Developed a dynamic website using PHP and MySQL with admin panel, database integration, form handling, and responsive frontend layouts.

## Blog Topics

The blog section covers practical topics such as:

* How AI helps in web development
* Vibe coding for web development
* AI image generation for web development
* Prompt engineering for web development, images, and videos
* Analytics tools for website performance
* Website hosting with domains, cPanel, Linux, Docker, and cloud
* AI security for web developers

## Folder Structure

```text
vadivel-portfolio/
├── app/
│   ├── about/
│   ├── api/
│   │   └── contact/
│   ├── blogs/
│   │   └── [slug]/
│   ├── components/
│   ├── contact/
│   ├── data/
│   ├── education/
│   ├── experience/
│   ├── projects/
│   │   └── [slug]/
│   ├── skills/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── public/
│   ├── images/
│   │   ├── blogs/
│   │   ├── projects/
│   │   └── og/
│   └── pdf/
│
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## Local Setup

Clone the repository:

```bash
git clone https://github.com/vadivel-developer/vadivel-portfolio.git
```

Go to the project folder:

```bash
cd vadivel-portfolio
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the project in the browser:

```text
http://localhost:3000
```

## Environment Variables

Create a `.env.local` file in the root folder.

```env
GMAIL_CLIENT_ID=your_google_client_id
GMAIL_CLIENT_SECRET=your_google_client_secret
GMAIL_REFRESH_TOKEN=your_refresh_token
GMAIL_SENDER_EMAIL=your_email@gmail.com
CONTACT_RECEIVER_EMAIL=your_email@gmail.com
```

Important: Do not push `.env.local` to GitHub.

## Build Command

To check production build locally:

```bash
npm run build
```

To run production locally:

```bash
npm run start
```

## Deployment

This project is deployed on Vercel.

Deployment flow:

```text
Local Project → GitHub Repository → Vercel Deployment
```

After pushing changes to GitHub, Vercel automatically redeploys the website.

## SEO Setup

The website includes:

* Page-level metadata
* Canonical URLs
* Open Graph metadata
* Twitter card metadata
* Robots configuration
* Sitemap support
* Optimized WebP images
* Responsive layout for mobile and desktop

## GitHub Push Workflow

After making updates:

```bash
git add .
git commit -m "Update portfolio"
git push
```

Vercel will automatically build and publish the latest version.

## Author

**Vadivel T**
Web Developer

Skills include WordPress, Next.js, PHP, JavaScript, MySQL, Tailwind CSS, SEO tools, website optimization, automation workflows, MCP testing, FastAPI, Docker, Linux, and VPS hosting.

## License

This project is created for personal portfolio and learning purposes.

