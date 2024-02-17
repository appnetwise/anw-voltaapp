import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.voltanotify.com',
  appName: 'voltaapp',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
};

export default config;
