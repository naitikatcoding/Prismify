# Prismify

**Prismify** turns brain dumps, transcripts, and rough ideas into polished content for every place your audience spends time.

## Features

- **Multi-platform output** — Generate LinkedIn posts, X threads, newsletters, and more from a single idea
- **Tone control** — Switch between Professional, Conversational, and Bold tones instantly
- **AI-native workflow** — Powered by Groq for fast, high-quality content generation
- **Creator workspace** — A distraction-free studio built for makers who ship
- **Authentication** — Secure sign-in via NextAuth
- **Private by default** — Your ideas are yours; we never train on your content

## Tech Stack

- [Next.js 16](https://nextjs.org/) — App Router, Server Components
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/) — Authentication
- [MongoDB + Mongoose](https://mongoosejs.com/) — Database
- [Groq SDK](https://console.groq.com/) — LLM inference
- [Nodemailer](https://nodemailer.com/) — Email

## Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/naitikatcoding/Prismify.git
   cd Prismify
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.local.example` to `.env.local` and fill in your credentials:

   ```bash
   cp .env.local.example .env.local
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description |
|---|---|
| `NEXTAUTH_SECRET` | Secret for NextAuth session signing |
| `NEXTAUTH_URL` | Base URL of the app |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `MONGODB_URI` | MongoDB connection string |
| `GROQ_API_KEY` | Groq API key for AI inference |
| `EMAIL_USER` | SMTP email address |
| `EMAIL_PASS` | SMTP email password |

## Project Structure

```
app/
  page.js          # Landing page
  workspace/       # Creator studio
  login/           # Auth page
  contact/         # Contact form
  api/             # API routes (auth, generate, contact)
components/
  Navbar.js
  Footer.js
  HowItWorks.js
  SessionWrapper.js
lib/               # Utility helpers
models/            # Mongoose models
public/            # Static assets
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

MIT © Prismify
