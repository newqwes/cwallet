import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ip from 'ip';

const currentIp = ip.address();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, '');
}

let envContent = fs.readFileSync(envPath, 'utf8');
const apiUrlPattern = /^VITE_REACT_APP_API_URL=.*$/m;
const apiUrl = `VITE_REACT_APP_API_URL=http://${currentIp}:3015`;

if (apiUrlPattern.test(envContent)) {
    envContent = envContent.replace(apiUrlPattern, apiUrl);
} else {
    envContent += `\n${apiUrl}`;
}

fs.writeFileSync(envPath, envContent);

console.log(`Updated VITE_REACT_APP_API_URL to ${apiUrl}`);
