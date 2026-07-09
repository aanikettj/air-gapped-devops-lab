param(
  [string]$RemoteUrl = 'https://github.com/aanikettj/air-gapped-devops-lab.git',
  [string]$Branch = 'main',
  [string]$CommitMessage = 'Initial commit: add project and CI/CD assets'
)

Set-Location -Path (Split-Path -Parent $MyInvocation.MyCommand.Definition)
Set-Location -Path '..'  # go to repo root

if (-not (Test-Path .git)) {
  git init
  Write-Host "Initialized new git repo"
} else {
  Write-Host ".git already exists"
}

git add .
git commit -m "$CommitMessage" -q

# set remote
$existing = git remote
if ($existing -notlike '*origin*') {
  git remote add origin $RemoteUrl
  Write-Host "Added remote origin: $RemoteUrl"
} else {
  Write-Host "Remote 'origin' already exists"
}

git branch -M $Branch

Write-Host "Pushing to $RemoteUrl (branch $Branch). You may be prompted for credentials."
git push -u origin $Branch
