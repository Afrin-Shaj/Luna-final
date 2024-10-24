import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb+srv://Afrin-LunaQ:Lunaqfinaldbpassword@clusterlunaqfinal.1b2fq.mongodb.net/?retryWrites=true&w=majority&appName=ClusterLunaqFinal',
  jwtSecret: process.env.JWT_SECRET || 'qwertyuiopasdfghjklzxcvbnm',
  jwtExpiration: '24h'
};