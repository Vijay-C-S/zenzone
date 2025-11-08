# Fix all hardcoded API URLs in frontend files

$files = @(
    "src\pages\Habits.jsx",
    "src\pages\Meditation.jsx",
    "src\pages\Dashboard.jsx",
    "src\pages\Goals.jsx",
    "src\pages\Journal.jsx",
    "src\pages\MoodTracker.jsx",
    "src\pages\Chatbot.jsx",
    "src\pages\CrisisSupport.jsx",
    "src\pages\WellnessLibrary.jsx",
    "src\pages\WellnessResourceDetail.jsx",
    "src\pages\ArticlePage.jsx",
    "src\data\guidedSessions.js"
)

foreach ($file in $files) {
    $filePath = Join-Path (Get-Location) $file
    if (Test-Path $filePath) {
        Write-Host "Processing $file..."
        $content = Get-Content $filePath -Raw
        
        # Replace localhost URLs
        $content = $content -replace "fetch\('http://localhost:3001/api/", "fetch(`${API_BASE_URL}/api/"
        $content = $content -replace 'fetch\("http://localhost:3001/api/', 'fetch(`${API_BASE_URL}/api/'
        $content = $content -replace 'fetch\(`http://localhost:3001/api/', 'fetch(`${API_BASE_URL}/api/'
        
        # Replace relative URLs
        $content = $content -replace "fetch\('/api/", "fetch(`${API_BASE_URL}/api/"
        $content = $content -replace 'fetch\("/api/', 'fetch(`${API_BASE_URL}/api/'
        $content = $content -replace 'fetch\(`/api/', 'fetch(`${API_BASE_URL}/api/'
        
        # Check if import is needed
        if ($content -notmatch "import API_BASE_URL from") {
            # Add import after other imports
            $lines = $content -split "`n"
            $lastImportIndex = -1
            for ($i = 0; $i -lt $lines.Count; $i++) {
                if ($lines[$i] -match "^import ") {
                    $lastImportIndex = $i
                }
            }
            if ($lastImportIndex -ge 0) {
                $lines = $lines[0..$lastImportIndex] + "import API_BASE_URL from '../config/api'" + $lines[($lastImportIndex+1)..($lines.Count-1)]
                $content = $lines -join "`n"
            }
        }
        
        Set-Content $filePath $content -NoNewline
        Write-Host "  ✓ Fixed $file"
    }
}

Write-Host "`n✓ All files fixed!"
