const fs = require("fs");
const path = require("path");
const ip = require("ip");

const currentIp = ip.address();

const envPath = path.join(__dirname, ".env");

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, "");
}

console.log("max check commit");

let envContent = fs.readFileSync(envPath, "utf8");
const apiUrlPattern = /^LOCAL_CLIENT_URL=.*$/m;
const apiUrl = `LOCAL_CLIENT_URL=http://${currentIp}:3010`;

if (apiUrlPattern.test(envContent)) {
  envContent = envContent.replace(apiUrlPattern, apiUrl);
} else {
  envContent += `\n${apiUrl}`;
}

fs.writeFileSync(envPath, envContent);

console.log(`Updated LOCAL_CLIENT_URL to ${apiUrl}`);
