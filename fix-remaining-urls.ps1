#!/usr/bin/env pwsh
# PowerShell script to fix all remaining API URLs

$files = @(
    "src/pages/MoodTracker.jsx",
    "src/pages/WellnessLibrary.jsx",
    "src/pages/Chatbot.jsx",
    "src/pages/CrisisSupport.jsx",
    "src/pages/ArticlePage.jsx",
    "src/pages/WellnessResourceDetail.jsx",
    "src/data/guidedSessions.js",
    "src/pages/Goals.jsx"
)

foreach ($file in $files) {
    Write-Host "Processing $file..." -ForegroundColor Cyan
    
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Add import if not present
        if ($content -notmatch "import API_BASE_URL from") {
            $importLine = "import API_BASE_URL from '../config/api'"
            if ($file -match "guidedSessions\.js") {
                $importLine = "import API_BASE_URL from '../config/api'"
            }
            
            # Find last import line and add after it
            $content = $content -replace "(import .+ from .+[\r\n]+)(?!import)", "`$1$importLine`n"
        }
        
        # Replace all fetch calls with relative URLs
        $content = $content -replace "fetch\(`?`"\/api\/", "fetch(```${API_BASE_URL}/api/"
        $content = $content -replace "fetch\(`?`'/api/", "fetch(```${API_BASE_URL}/api/"
        $content = $content -replace "fetch\(\s*`'\/api\/", "fetch(```${API_BASE_URL}/api/"
        $content = $content -replace "fetch\(\s*`"\/api\/", "fetch(```${API_BASE_URL}/api/"
        
        Set-Content $file $content -NoNewline
        Write-Host "  ✓ Fixed $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ File not found: $file" -ForegroundColor Red
    }
}

Write-Host "`n✨ Done! All API URLs have been updated." -ForegroundColor Green
Write-Host 'Run: git add . ; git commit -m "fix: Update all remaining API URLs" ; git push' -ForegroundColor Yellow
