# LanternFly TV Browser

![LanternFlyTV Logo](resources/icon256.png "LanternFlyTV Logo")

This is a minimal Electron browser that connects to Firebase in the background and gets URL playlists from it for display in full screen. It is a proof of concept and very early stage. Please proceed with caution. I'm looking for collaboration on this project. If you're interested, please contact me.

What it can do at the moment:

- Connect to Firebase
- Get a list of URLs from Firebase
- Display the URLs in a full screen browser
- Rotate through the URLs in a playlist

What it can't do at the moment:

- Anything else ;)

Known issues:

- The hidden browser is visible and has developer tools open for debugging purposes. This will be fixed in the future.
- On Linux, you may have to delete the ~/.config/lanternflytv folder manually in order to get a unique user id.

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

## Develop

Make sure you have ESLint and Prettier plugins installed in your editor. This will help you keep the code clean and consistent. src/.eslintrc.json is included in the project and set up for both node.js (src/main) and browser (src/renderer) code linting.

```bash
# Clone this repository
git clone https://github.com/tailorvj/lanternflytv
# Go into the repository
cd lanternflytv
# Install dependencies
npm install
# Run the app
npm start
```

## Build

At the moment you have a script that can build for Linux. No other OS builds are available at the moment.
Build your own browser by running the following commands:

```bash
# Clone this repository
git clone https://github.com/tailorvj/lanternflytv
# Go into the repository
cd lanternflytv
# Install dependencies
npm install
# Build the app for Linux
npm run build
```

Full build commands are in the package.json file.

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Resources for Learning Electron

- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [Electron Fiddle](https://electronjs.org/fiddle) - Electron Fiddle, an app to test small Electron experiments

## License

lanternflytv - A full page URL rotator for digital signage
Copyright (C) 2023  Asaf Prihadash TailorVJ.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

[GPLv3](LICENSE.md)
