# SwasthAI – Indian Lifestyle Intelligence

An AI-powered platform combining Indian rules explanation, personalized diet planning, and basic fitness guidance.

## Features

- **AI Chat System**: Ask questions about Indian traditions and get balanced explanations.
- **Diet Planner**: Generate personalized Indian meal plans based on your profile.
- **Fitness Planner**: Simple workout plans based on available time.
- **Daily Insights**: Learn an Indian rule of the day.
- **User Profile**: Store personal information for customization.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: OpenAI API
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth

## Setup Instructions

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Environment Setup** (Optional for demo):
   - `.env.local` created with placeholders
   - For full AI functionality, get OpenAI API key from [OpenAI](https://platform.openai.com/api-keys)
   - **Demo Mode**: The app works with mock responses if no API key is set, so you can test immediately.

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

5. **Test Features**:
   - **Chat**: Ask Indian lifestyle questions
   - **Diet Planner**: Generate meal plans
   - **Without API Key**: Uses demo data

## Firebase Setup Steps

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Enable Authentication: Go to Authentication > Sign-in method > Enable Email/Password.
4. Enable Firestore: Go to Firestore Database > Create database.
5. Get your config from Project settings > General > Your apps > Add web app.
6. Copy the config to `.env.local`.

## AI Integration

- The app uses OpenAI's GPT-4 for generating responses.
- API routes handle chat and diet planning.
- Ensure your OpenAI API key has sufficient credits.

## Deployment

- Deploy to Vercel for easy Next.js deployment.
- Add environment variables in Vercel dashboard.
- Firebase rules need to be configured for production.

## Contributing

Feel free to contribute by opening issues or pull requests.

## License

MIT

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
