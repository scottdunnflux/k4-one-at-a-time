# K4OneAtATime

## What it does

K4OneAtATime prevents users from being logged into multiple K4 (vjoon K4) publications at the same time in InCopy or InDesign.

The script runs automatically when the application starts and polls in the background. When it detects more than one active K4 publication login, it displays a dialog listing all connected publications and asks the user to choose one. It then logs out of the rest.

After prompting once, the script will not prompt again during the same session unless the user returns to a single publication and then connects to multiple again.

## Installation

Choose steps for either `InCopy` or `InDesign` depending on which application you use.

### Method 1 — Terminal

1. Open **Terminal**
2. Create the startup scripts folder (it may not exist by default) and download the script:

   *InCopy 2024*
   ```bash
   mkdir -p "$HOME/Library/Preferences/Adobe InCopy/Version 19.0/en_US/Scripts/startup scripts" && curl -L https://raw.githubusercontent.com/scottdunnflux/k4-one-at-a-time/main/K4OneAtATime.jsx -o "$HOME/Library/Preferences/Adobe InCopy/Version 19.0/en_US/Scripts/startup scripts/K4OneAtATime.jsx"
   ```
   *InDesign 2024*
   ```bash
   mkdir -p "$HOME/Library/Preferences/Adobe InDesign/Version 19.0/en_US/Scripts/startup scripts" && curl -L https://raw.githubusercontent.com/scottdunnflux/k4-one-at-a-time/main/K4OneAtATime.jsx -o "$HOME/Library/Preferences/Adobe InDesign/Version 19.0/en_US/Scripts/startup scripts/K4OneAtATime.jsx"
   ```

3. Start (or restart) the application.

### Method 2 — Finder

Replace {App} with either InCopy or InDesign depending on which application you use.

1. Quit InCopy/InDesign if it is running.
2. In Finder, choose **Go > Go to Folder** (Shift-Command-G) and paste:

   ```
   ~/Library/Preferences/Adobe {App}/Version 19.0/en_US/Scripts/
   ```

3. Inside the **Scripts** folder, create a new folder named exactly:

   ```
   startup scripts
   ```

   No capitalization, two words. If the folder already exists, skip this step.

4. Right-click [K4OneAtATime.jsx](https://raw.githubusercontent.com/scottdunnflux/k4-one-at-a-time/main/K4OneAtATime.jsx) and choose **Save Link As** (or **Download Linked File** in Safari) to download it. Clicking the link directly will display the script as text instead of downloading it.
5. Move `K4OneAtATime.jsx` into the **startup scripts** folder.
6. Start InCopy/InDesign.

## Uninstalling

Delete `K4OneAtATime.jsx` from the startup scripts folder and restart the application.
