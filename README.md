# Vadivel Portfolio - Avatar + Email Fixed

## Run

```bash
npm install
npm run dev
```

## Profile photo

Add your photo here:

```text
public/images/profile.jpg
```

This version has a fallback avatar, so the site will not break if the image is missing.

## Resume

Add your resume here:

```text
public/resume.pdf
```

## Contact form email

Create `.env.local` in the project root:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
CONTACT_RECEIVER_EMAIL=vadivelwebdeveloper@gmail.com
```

Then restart:

```bash
npm run dev
```
