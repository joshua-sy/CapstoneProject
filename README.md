# CapstoneProject Spring 2023
# Project Members

-   Isha Shroff  -   z5316569@ad.unsw.edu.au / ishasshroff@gmail.com (preferred)

# CapstoneProject Spring 2022
# Project Members

-   Aung Soe Kyaw   -   aung.s.kyaw@student.uts.edu.au
-   Tien Long Lam   -   lamtienlong9@gmail.com (preferred) / lamtienlong@student.uts.edu.au

# Installation guide
Note: These instructions are for linux, which this project is most compatible with. This can be accessed using WSL if using windows.

## 1. Install Nodejs
```
sudo apt install nodejs

```
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04

## 2. Install Angular
```
sudo npm install -g @angular/cli

```
https://angular.io/guide/setup-local

## 3. Clone this repo
```
git clone https://github.com/Re-Tails/CapstoneProject.git
```

## 4. Install Dotnet

### Add the Microsoft package signing key
```
wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb
```

### Install the SDK
```
sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-3.1
```

### Install the runtime
```
sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update && \
  sudo apt-get install -y aspnetcore-runtime-3.1
```
https://docs.microsoft.com/en-au/dotnet/core/install/linux-ubuntu#2004-

## 7. Update the app
```
cd  ClientApp \
npm install \
npm run start //note: this will only run the Client App
```
## 6. Run the app
Run the following command from the CapstoneProject repo folder:
```
dotnet run
```

## Notes

Install the SVF dependencies if required
```
npm i svf-lib
```
