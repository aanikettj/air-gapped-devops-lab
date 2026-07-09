#!/usr/bin/env bash
REMOTE_URL=${1:-https://github.com/aanikettj/air-gapped-devops-lab.git}
BRANCH=${2:-main}
COMMIT_MSG=${3:-"Initial commit: add project and CI/CD assets"}

cd "$(dirname "${BASH_SOURCE[0]}")/.." || exit 1

if [ ! -d .git ]; then
  git init
  echo "Initialized new git repo"
else
  echo ".git already exists"
fi

git add .

git commit -m "$COMMIT_MSG" || echo "No changes to commit or commit failed"

if ! git remote | grep -q origin; then
  git remote add origin "$REMOTE_URL"
  echo "Added remote origin: $REMOTE_URL"
else
  echo "Remote 'origin' already exists"
fi

git branch -M "$BRANCH"

echo "Pushing to $REMOTE_URL (branch $BRANCH). You may be prompted for credentials."
git push -u origin "$BRANCH"
