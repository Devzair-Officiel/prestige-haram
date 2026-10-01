#!/usr/bin/env bash
input=$(cat)

# Prevent re-entry when a stop hook is already active
if echo "$input" | grep -Eq '"stop_hook_active"[[:space:]]*:[[:space:]]*true'; then exit 0; fi

cd "$CLAUDE_PROJECT_DIR" || exit 0

# Skip if no relevant source files have changed
if git diff --quiet HEAD -- src/ public/ docker/ package.json tsconfig*.json vite.config.* \
   && [ -z "$(git ls-files --others --exclude-standard -- src/ public/ docker/)" ]; then
  exit 0
fi

out=$( { npm run lint && npm run test && npm run build; } 2>&1 ) || {
  echo "Contrôles qualité en échec. Corrige avant de conclure :" >&2
  echo "$out" | tail -40 >&2
  exit 2
}
