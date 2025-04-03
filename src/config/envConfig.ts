interface EnvConfig {
  API_URL: string;
}

const envConfig: EnvConfig = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
};

export default envConfig;
