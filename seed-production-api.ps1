# ZenZone Production Database Seeder
$RAILWAY_API = "https://zenzone-production-2f90.up.railway.app"

Write-Host "ZenZone Production Database Seeder" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check current resources
Write-Host "Checking current database state..." -ForegroundColor Yellow
try {
    $currentState = Invoke-RestMethod -Uri "$RAILWAY_API/api/wellness?limit=1" -Method GET
    Write-Host "Current resources: $($currentState.total)" -ForegroundColor Green
}
catch {
    Write-Host "Error checking database: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 2: Clear existing resources
Write-Host ""
Write-Host "Clearing old resources..." -ForegroundColor Yellow
try {
    $deleteResult = Invoke-RestMethod -Uri "$RAILWAY_API/api/wellness/seed" -Method DELETE
    Write-Host "Deleted: $($deleteResult.deletedCount) resources" -ForegroundColor Green
}
catch {
    Write-Host "Error deleting resources: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 3: Seed new comprehensive content
Write-Host ""
Write-Host "Seeding comprehensive wellness content..." -ForegroundColor Yellow
try {
    $seedResult = Invoke-RestMethod -Uri "$RAILWAY_API/api/wellness/init" -Method POST -ContentType "application/json" -Body "{}"
    Write-Host "Added: $($seedResult.resourcesAdded) comprehensive resources" -ForegroundColor Green
}
catch {
    Write-Host "Error seeding resources: $($_.Exception.Message)" -ForegroundColor Red
    # Try to get more details
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errorBody = $reader.ReadToEnd()
        Write-Host "Details: $errorBody" -ForegroundColor Red
    }
    exit 1
}

# Step 4: Verify new content
Write-Host ""
Write-Host "Verification..." -ForegroundColor Yellow
try {
    $verification = Invoke-RestMethod -Uri "$RAILWAY_API/api/wellness?limit=3" -Method GET
    Write-Host "Total resources: $($verification.total)" -ForegroundColor Green
    Write-Host "Sample articles:" -ForegroundColor Green
    foreach ($resource in $verification.resources) {
        Write-Host "  - $($resource.title) ($($resource.duration))" -ForegroundColor Cyan
    }
}
catch {
    Write-Host "Error verifying: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "SUCCESS! Your production database has been updated!" -ForegroundColor Green
Write-Host "Visit your website to see the new content:" -ForegroundColor White
Write-Host "   https://zenzone-xi.vercel.app/wellness" -ForegroundColor Cyan
Write-Host ""
Write-Host "All wellness articles now have comprehensive content!" -ForegroundColor Green
