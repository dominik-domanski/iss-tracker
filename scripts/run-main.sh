#!/bin/bash
set -e

echo "Discarding local changes and untracked files..."
git reset --hard
git clean -fd

echo "Switching to 'main' branch..."
git checkout main

echo "Removing all node_modules and lock files..."
rm -rf node_modules yarn.lock
rm -rf client/node_modules client/yarn.lock
rm -rf server/node_modules server/yarn.lock

echo "Installing dependencies (root + client + server)..."
yarn bootstrap

echo "Running app in DEV mode..."
yarn dev
