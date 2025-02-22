Write-Output "Building Capacitor Android App..."

# Install dependencies
Write-Output "Installing Node.js dependencies..."
npm install --legacy-peer-deps

# Sync the app with Capacitor
Write-Output "Syncing Capacitor..."
npx cap sync android

# Build the app
Write-Output "Building the web assets..."
npm run build

# Sync again after build
Write-Output "Syncing after build..."
npx cap sync android

# Open Android Studio (optional, you can comment this out if you want to avoid launching Android Studio)
Write-Output "Opening Android Studio..."
npx cap open android

# Run the app on an Android emulator or device (optional)
# Uncomment the line below if you want to automatically run the app after building
# Write-Output "Running on Android Emulator/Device..."
# npx cap run android

Write-Output "Build process complete!"
pause
