# habit-tracker-mobile

Project created by: Expo
> npx create-expo-app habit-tracker-mobile --template
Blank (TypeScript) - Selected

PACKAGES:
=======
### nativewind
- uses tailwindcss library on react native.

### react-native-svg
SVG Support library for react native, then we can use the logo

1. > npx expo install react-native-svg
2. > npm i react-native-svg-transformer --save-dev 
    Allow using svg as a component
3. Create a file named 'metro.config.js' in the project directory.
4. Inside the file write and save what this link says on step 3: https://github.com/kristerkari/react-native-svg-transformer
5. Create a new file named 'svg.d.ts' inside the folder /src/@types
6. Inside the file write and save what this link says on step "Using Typescript": https://github.com/kristerkari/react-native-svg-transformer

### dayjs
Library to manipulate dates

    1. Install
    > npm i dayjs

    2. Set to pt-br
        A. Create folders and file /src/lib/dayjs.ts
        B. Content: import dayjs from 'dayjs'
                    import 'dayjs/locale/pt-br'
                    dayjs.locale('pt-br')

    3. On App.tsx, import the file:
        import './src/lib/dayjs'


### @expo/vector-icons
Just import {} from '@expo/vector-icons' (Search for vector-icons Expo to browse the icons)


### @react-navigation/native
> npm i @react-navigation/native
Library for navigation, screen navigation: stack overlapping menus, bar menus, etc.
> npx expo install react-native-screens react-native-safe-area-context
react-native-screens -> navigations
area-context -> details on screen for example from Iphone X to current, dealing with the notepad.
> npm i @react-navigation/native-stack
STACK NAVIGATOR (the strategy we are going to use for navigation here)


DEV PACKAGES:
=======
### tailwindcss --save-dev
- CSS Library  
1. > npx tailwindcss init
2. set it up the tailwind.config.js initialized
3. Add the plugin to babel.config.js inside the 'return {' : plugin: ['nativewind/babel']
4. Typing the 'className' for react-native, inside the expo project:
    A. Create the folder /src/@types
    B. Create the file 'app.d.ts' in the @types folder
    C. Write and save the content: /// <reference types="nativewind/types" />



