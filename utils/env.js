// tiny wrapper with default env vars
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  GOOGLE_FONT_API_KEY : process.env.GOOGLE_FONT_API_KEY || "AIzaSyDuu5s--zRhePZKvq8svKl6cvIUCUK6hd8",
  CLIENT_SECRET: process.env.CLIENT_SECRET || "gloas-3ded85d2a146723ef921072594a608279c600e3a4d0faffa330acd0033b0027b",
  CLIENT_ID: process.env.CLIENT_ID || "3160dddc6f6aa2f8665bdf5ad44d1d64216aa24b283a4a2214998e6fcd10a59f",
  MELLOWTEL_PUBLIC_KEY: '64681478',
  X_RAPIDAPI_KEY: '7beb977237msh72b897ea645bbbep17ee18jsn6eac093d2219',
  X_RAPIDAPI_HOST: 'text-summarization13.p.rapidapi.com'
};
