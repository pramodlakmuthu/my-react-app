$token = "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"

# Get current commit SHA
$response = Invoke-RestMethod -Uri "https://api.github.com/repos/hasi28/my-react-app/git/refs/heads/main" -Headers @{Authorization = "Bearer $token"}
$sha = $response.object.sha

# Get commit details
$commit = Invoke-RestMethod -Uri "https://api.github.com/repos/hasi28/my-react-app/git/commits/$sha" -Headers @{Authorization = "Bearer $token"}
$treeSha = $commit.tree.sha

# Get tree
$tree = Invoke-RestMethod -Uri "https://api.github.com/repos/hasi28/my-react-app/git/trees/$treeSha?recursive=1" -Headers @{Authorization = "Bearer $token"}

# Read file content
$content = Get-Content -Path "src/MealPlans.js" -Raw -Encoding UTF8
$base64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($content))

# Create blob
$blobBody = @{content = $base64; encoding = "base64"} | ConvertTo-Json
$blob = Invoke-RestMethod -Uri "https://api.github.com/repos/hasi28/my-react-app/git/blobs" -Method Post -Headers @{Authorization = "Bearer $token"; "Content-Type" = "application/json"} -Body $blobBody
$blobSha = $blob.sha

# Create new tree
$newTree = $tree.tree | ForEach-Object {
    if ($_.path -eq "src/MealPlans.js") {
        @{path = $_.path; mode = $_.mode; type = $_.type; sha = $blobSha}
    } else {
        $_
    }
}
$treeBody = @{tree = $newTree; base_tree = $treeSha} | ConvertTo-Json -Depth 10
$treeResponse = Invoke-RestMethod -Uri "https://api.github.com/repos/hasi28/my-react-app/git/trees" -Method Post -Headers @{Authorization = "Bearer $token"; "Content-Type" = "application/json"} -Body $treeBody
$newTreeSha = $treeResponse.sha

# Create commit
$commitBody = @{message = "Fix: MealPlans inline style template literals"; tree = $newTreeSha; parents = @($sha)} | ConvertTo-Json
$commitResponse = Invoke-RestMethod -Uri "https://api.github.com/repos/hasi28/my-react-app/git/commits" -Method Post -Headers @{Authorization = "Bearer $token"; "Content-Type" = "application/json"} -Body $commitBody
$newCommitSha = $commitResponse.sha

# Update ref
$refBody = @{sha = $newCommitSha} | ConvertTo-Json
Invoke-RestMethod -Uri "https://api.github.com/repos/hasi28/my-react-app/git/refs/heads/main" -Method Patch -Headers @{Authorization = "Bearer $token"; "Content-Type" = "application/json"} -Body $refBody

Write-Output "Pushed successfully"