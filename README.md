# Custom Wallet for Interexy - Task for checking technical skills 

## Project Description
The custom wallet for Interexy company for creating and accessing a simple Ethereum wallet. The application has two main parts: a setup phase for wallet creation and a main screen for wallet interaction. Developed as a part of checking technical skills using the following technologies:

`Tauri` - a base for creation of cross-platform applications using JS and Rust.

`Vite with React.js` - a frontend part of  application.

`Ethers.js v6` - library for interacting with the Ethereum Blockchain and its ecosystem 

`MaterialUI & Emotion` - styling libraries used for creation of modern and acceptable UI.

`Redux-Toolkit` - state-management library

`Prettier, Eslint & plugins for them` - for following code style

## Instalation
This project uses `yarn` package manager.

To start the first step is dependencies installation:
###### Bash or Powershell
```
yarn
```

> NOTE: Keep in mind that the build of application will be created for the OS where you ran `yarn`, as it checks for shell you use. For example: `Ubuntu` users using Bash terminal will build application for LinuxOS, while `Windows` users using Powershell to run `yarn` command will build .exe application for Windows OS 

## Run In Development
#### The following commands will install necessary dependencies (depending on the OS & terminal you are using) and run the Application in Development mode.

> NOTE: Some crypto de/encryption functions are a little bit slow in development mode

###### Bash or Powershell
```
yarn

yarn tauri dev
```

## Production Building 

```yarn tauri build``` - builds an application. Build location is `src-tauri/target` folder by default.

> NOTE: Keep in mind that the build of application will be created for the OS where you ran `yarn`, as it checks for shell you use. For example: `Ubuntu` users using Bash terminal will build application for LinuxOS, while `Windows` users using Powershell to run `yarn` command will build .exe application for Windows OS

The way of running built for production application on different OS is different. 

### Windows
##### Step-by-step guide on how to install and run the Custom Wallet on a Windows system.

#### Step 1: Clone a repo via HTTPS or SSH:
##### To get started, clone the repository from GitHub. You can do this via either HTTPS or SSH:

###### Windows Powershell
```
# Clone via SSH
git clone git@github.com:0xvidejk/custom-wallet.git

# Alternatively, clone via HTTPS
git clone https://github.com/0xvidejk/custom-wallet.git
```
#### Step 2: Install Dependencies
##### After cloning the repository, navigate into the project directory and install the necessary dependencies:

###### Windows Powershell
```
cd custom-wallet
yarn
```

#### Step 3: Production Application Building
##### Once the dependencies are installed, you can build the application:

###### Windows Powershell
```
yarn tauri build
```
#### Step 4: Run the Application
##### After a successful build, navigate to the built application directory and run the application:

###### Windows Powershell
```
& ".\src-tauri\target\release\custom-wallet.exe"
```
#### Congratulations! You have successfully installed and run the Custom Wallet on your Windows system. Enjoy using the application!
---

### Linux
##### Step-by-step guide on how to install and run the Custom Wallet on a Linux system.

#### Step 1: Clone a repo via HTTPS or SSH:
##### To get started, clone the repository from GitHub. You can do this via either HTTPS or SSH:

###### Bash
```
# Clone via SSH
git clone git@github.com:0xvidejk/custom-wallet.git

# Alternatively, clone via HTTPS
git clone https://github.com/0xvidejk/custom-wallet.git
```

#### Step 2: Install Dependencies
##### After cloning the repository, navigate into the project directory and install the necessary dependencies:

###### Bash
```
cd custom-wallet
yarn
```

#### Step 3: Production Application Building
##### Once the dependencies are installed, you can build the application:

###### Bash
```
yarn tauri build
```

#### Step 4: Run the Application
##### After a successful build, navigate to the built application directory and run the application:

###### Bash
```
cd src-tauri/target/release/bundle/appimage

./custom-wallet_0.1.0_amd64.AppImage
```
#### Congratulations! You have successfully installed and run the Custom Wallet on your Linux system. Enjoy using the application!


## Important Note

The application store user's generated mnemonic (secret phrase) inside application data os directory. If you have already createad an account and want to start again with new wallet creation you need to remove the Custom wallet's data. To do that use
###### Windows Powershell
```
cd $env:APPDATA

rm -r .\CustomWalletData\
```

###### Linux Bash
```
cd /home/<user>

rm -rf CustomWalletData
```
