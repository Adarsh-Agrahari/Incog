# Incog

Incog is an anonymous messaging web application built with Next.js, MongoDB, and TypeScript. It features OTP verification using Nodemailer and robust input validation with Zod. AI-driven features powered by Gemini include message suggestions, a user recommendation system, and content filtering to enhance the user experience.

## Features

- **Anonymous Messaging:** Users can send and receive anonymous messages while maintaining privacy.
- **OTP Verification:** Secure sign-up and login processes using Nodemailer for OTP verification.
- **AI-Driven Enhancements:** Message suggestion, user recommendations, and content filtering powered by Gemini.
- **Robust Input Validation:** Ensures data integrity and security with Zod validation.

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, TypeScript
- **Backend:** Next.js API routes
- **Database:** MongoDB
- **Email Verification:** Nodemailer
- **AI Integration:** Gemini API
- **Validation:** Zod

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB instance running
- Gemini API key
- Nodemailer configuration

### Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Adarsh-Agrahari/Incog.git
    cd incog
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env.local` file in the root directory with the following content:

    ```env
    MONGO_URI=your_mongodb_connection_string
    GEMINI_API_KEY=your_gemini_api_key
    NODEMAILER_USER=your_nodemailer_email
    NODEMAILER_PASS=your_nodemailer_password
    ```

4. **Run the development server:**
    ```bash
    npm run dev
    ```

5. **Access the application:**
    Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Anonymous Messaging:** Users can send and receive anonymous messages.
- **Sign Up / Login:** Users can sign up and log in using OTP verification.
- **Message Suggestions:** AI-driven message suggestions to enhance communication.
- **User Recommendations:** Personalized user recommendations based on interaction history.
- **Content Filtering:** Filtering out inappropriate or irrelevant content using Gemini.

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, feel free to reach out via email at adarshagrahari0503@gmail.com

## Links

- **GitHub Repository:** [Incog Repo](https://github.com/Adarsh-Agrahari/Incog)
- **Live Site:** [Incog](https://incog-msg.vercel.app/)

