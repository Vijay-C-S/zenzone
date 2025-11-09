# ZenZone Production Crisis Resources Seeder
$RAILWAY_API = "https://zenzone-production-2f90.up.railway.app"

Write-Host "Crisis Resources Production Seeder" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check current resources
Write-Host "Checking current database state..." -ForegroundColor Yellow
try {
    $currentState = Invoke-RestMethod -Uri "$RAILWAY_API/api/crisis" -Method GET
    Write-Host "Current resources: $($currentState.resources.Count)" -ForegroundColor Green
}
catch {
    Write-Host "Error checking database: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 2: Clear existing resources
Write-Host ""
Write-Host "Clearing old resources..." -ForegroundColor Yellow
try {
    $deleteResult = Invoke-RestMethod -Uri "$RAILWAY_API/api/crisis/seed" -Method DELETE
    Write-Host "Deleted: $($deleteResult.deletedCount) resources" -ForegroundColor Green
}
catch {
    Write-Host "Error deleting resources: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 3: Seed new crisis resources
Write-Host ""
Write-Host "Seeding crisis resources..." -ForegroundColor Yellow
try {
    $seedResult = Invoke-RestMethod -Uri "$RAILWAY_API/api/crisis/seed" -Method POST -ContentType "application/json" -Body "{}"
    Write-Host "Added: $($seedResult.resourcesAdded) crisis resources" -ForegroundColor Green
    Write-Host "Total resources in database: $($seedResult.totalResources)" -ForegroundColor Green
}
catch {
    Write-Host "Error seeding resources: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 4: Verify new content
Write-Host ""
Write-Host "Verification..." -ForegroundColor Yellow
try {
    $verification = Invoke-RestMethod -Uri "$RAILWAY_API/api/crisis" -Method GET
    Write-Host "Total resources: $($verification.resources.Count)" -ForegroundColor Green
    Write-Host "Sample resources:" -ForegroundColor Green
    $verification.resources | Select-Object -First 5 | ForEach-Object {
        Write-Host "  - $($_.title) [$($_.category)]" -ForegroundColor Cyan
    }
}
catch {
    Write-Host "Error verifying: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "SUCCESS! Your production crisis resources have been updated!" -ForegroundColor Green
Write-Host "Visit your website to see the crisis support resources:" -ForegroundColor White
Write-Host "   https://zenzone-xi.vercel.app/crisis" -ForegroundColor Cyan
Write-Host ""
Write-Host "All crisis support hotlines and resources are now available!" -ForegroundColor Green
