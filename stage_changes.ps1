# Check if a commit message is provided
if (-not $args[0]) {
    Write-Host "Error: No commit message provided." -ForegroundColor Red
    Write-Host "Usage: .\script.ps1 'Your commit message'"
    exit 1
}

# Add all changes
git add .

# Commit with the provided message
git commit -m $args[0]

# Push changes
git push
