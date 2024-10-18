
# Node.js Application Deployment with GitLab CI/CD, PM2, and pnpm

This guide explains how to set up a Node.js app deployment using GitLab CI/CD, PM2, and `pnpm` for package management. The application will be deployed to a VM, and environment variables will be configured.

---

## 1. Install nvm and pnpm on the VM

### Install NodeJS via NVM
To manage Node.js versions, install `nvm`:
Reference: https://nodejs.org/en/download/package-manager


```bash
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.17.0`

# verifies the right npm version is in the environment
npm -v # should print `10.8.2`
```

After installation, install the desired Node.js version (reconnect to the server to relaoad shell):

```bash
nvm install 20
nvm alias default v20.17.0
```

### Install pnpm
Install `pnpm` globally:

```bash
npm install -g pnpm
```

---

## 2. Set Up SSH for GitLab CI/CD

### Generate SSH Key Pair
Generate an SSH key pair:

```bash
ssh-keygen -t rsa -b 4096 -C "Alshaya Validator Server"
```

### Copy Public Key to the VM
Copy the public key to the VM:

```bash
ssh-copy-id user@your_vm_ip_address
```

### Add SSH Private Key to GitLab
1. Go to **Settings → CI/CD → Variables** in your GitLab repository.
2. Add a new variable `SSH_PRIVATE_KEY` with the private key value.

---

## 3. GitLab CI/CD Pipeline Configuration

Create a `.gitlab-ci.yml` file in your GitLab repository:

```yml
stages:
  - deploy_staging
  - deploy_production

deploy_staging:
  stage: deploy_staging
  image: alpine:latest
  before_script:
    - apk update
    - apk add --no-cache openssh
    - eval $(ssh-agent -s)
    - mkdir -p ~/.ssh
    - echo "$ALSHAYA_TEST_SERVER_SSH_PRIVATE_KEY" | tr -d '\r' > ~/.ssh/server_key.pem
    - chmod 600 ~/.ssh/server_key.pem
  script:
    - |
      ssh -o StrictHostKeyChecking=no -i ~/.ssh/server_key.pem $ALSHAYA_TEST_USER_HOST "
      export NVM_DIR=\$HOME/.nvm; source \$NVM_DIR/nvm.sh; cd $PROJECT_PATH; chmod +x deploy.sh; ./deploy.sh --branch=staging"
  only:
    - staging

deploy_production:
  stage: deploy_production
  image: alpine:latest
  before_script:
    - apk update
    - apk add --no-cache openssh
    - eval $(ssh-agent -s)
    - mkdir -p ~/.ssh
    - echo "$ALSHAYA_PRODUCTION_SERVER_SSH_PRIVATE_KEY" | tr -d '\r' > ~/.ssh/server_key.pem
    - chmod 600 ~/.ssh/server_key.pem
  script:
    - |
      ssh -o StrictHostKeyChecking=no -i ~/.ssh/server_key.pem $ALSHAYA_PRODUCTION_USER_HOST "
      export NVM_DIR=\$HOME/.nvm; source \$NVM_DIR/nvm.sh; cd $PROJECT_PATH; chmod +x deploy.sh; ./deploy.sh --branch=master"
  only:
    - master
```

This pipeline will:
1. Install the SSH key for secure access to the VM.
2. Pull the latest code from the repository according to environment (Staging or Master).
4. Use `pnpm` to install dependencies.
5. Use PM2 to reload the app in production mode.

---

## 4. Install and Configure PM2

### Install PM2
Install PM2 globally:

```bash
npm install pm2 -g
```

### Create PM2 Configuration
Create an `ecosystem.config.js` file in your project root:

```javascript
module.exports = {
  apps: [
    {
      name: "your-app-name",
      script: "./server.js",  // Your app entry point
      instances: "max",       // Or specify the number of instances
      exec_mode: "cluster",   // To run in cluster mode
      env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8080
      }
    }
  ]
};
```

### Start the Application with PM2

```bash
pm2 start ecosystem.config.js --env production
```

---

## 5. Environment Variables Management

You can define environment variables in two ways:

### Using a `.env` File

1. Create a `.env` file in your project root:

```bash
PORT=8080
NODE_ENV=production
```

2. Load it in your Node.js app using the `dotenv` package:

```javascript
require('dotenv').config();
```

### Global Environment Variables on the VM

You can also define environment variables globally in your shell profile (`~/.bashrc` or `~/.zshrc`):

```bash
export NODE_ENV=production
export PORT=8080
```

After editing, apply the changes:

```bash
source ~/.bashrc  # Or source ~/.zshrc
```

---

## 6. Automating Deployment

When you push changes to the `main` branch of your GitLab repository, the CI/CD pipeline will:
1. Pull the latest code from your repository.
2. Install dependencies using `pnpm`.
3. Restart the application using PM2 in production mode.
4. Use the specified environment variables.

---

This setup will automate your Node.js app deployment and ensure that your environment is ready to scale with `pnpm` and `PM2`.

---


## 7. Install and Configure Redis

Redis is essential for BullMQ since it serves as the message broker for the queues. Follow these steps to install and configure Redis on your VM.

### Install Redis on the VM

1. **Update your package lists**:
   ```bash
   sudo apt update
   ```

2. **Install Redis**:
   ```bash
   sudo apt install redis-server
   ```

3. **Enable Redis to start on boot**:
   ```bash
   sudo systemctl enable redis-server.service
   ```

4. **Start Redis**:
   ```bash
   sudo systemctl start redis
   ```

### Configure Redis for BullMQ

By default, Redis should work fine for BullMQ. However, you can customize the configuration if needed.

1. **Edit the Redis configuration file**:
   ```bash
   sudo nano /etc/redis/redis.conf
   ```

2. To enable persistence for Redis, find and uncomment the following lines (optional):
   ```bash
   save 900 1
   save 300 10
   save 60 10000
   ```

3. **Restart Redis** after modifying the configuration:
   ```bash
   sudo systemctl restart redis
   ```

### Test Redis

To check if Redis is working properly, run:
```bash
redis-cli ping
```
If everything is set up correctly, it should return `PONG`.

### Update Your Application to Use Redis

In your Node.js application, ensure that BullMQ is using Redis by configuring it correctly:

```javascript
const { Queue } = require('bullmq');

const queue = new Queue('my-queue', {
  connection: {
    host: 'localhost',
    port: 6379
  }
});
```

Ensure that the Redis connection details match your VM's Redis server configuration.

---

This setup will automate your Node.js app deployment and ensure that your environment is ready to scale with `pnpm`, PM2, and Redis.
