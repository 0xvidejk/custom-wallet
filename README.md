# Custom Wallet for Interexy - Task for checking technical skills 

## Project Description
The custom wallet for Interexy company for creating and accessing a simple Ethereum wallet. The application has two main parts: a setup phase for wallet creation and a main screen for wallet interaction. Developed as a part of checking technical skills using the following technologies:

`Tauri` - a base for creation of cross-platform applications using JS and Rust.

`Vite with React.js` - a frontend part of  application.

`MaterialUI & Emotion` - styling libraries used for creation of modern and acceptable UI.

## Instalation
This project uses `yarn` package manager.

To start the first step is dependencies installation:

```yarn```

> NOTE: Keep in mind that the build of application will be created for the OS where you ran `yarn`, as it checks for shell you use. For example: `Ubuntu` users using Bash terminal will build application for LinuxOS, while `Windows` users using Powershell to run `yarn` command will build .exe application for Windows OS 

## Run In Development

```yarn tauri dev```

## Production Building 

```yarn tauri build```  

> NOTE: folder target in `src-tauri` folder will have an executable if it is windows, and AppImage if it is Linux 

## Environment Variables

| Environment Variable  | Value |
| ------------- | ------------- |
| Content Cell  | Content Cell  |

