# Coursework for WAD2023 @ HTW Berlin

Team **LoBe**: Louis Beul & Bettina Justus :octocat:

# Project Roadmap

## General Idea

- An interactive map of Berlin that shows climate-related information, i.e.
  - ecologically destructive locations (e.g. fossile power plants)
  - missing green infrastrcuture (e.g. missing park&ride spots)

## Technical Outline

- Single Page Application (SPA)
- Front end in vanilla JS, HTML, and CSS
- Back end in nodeJS
- 2 user roles: admin & normal

### Increment 01:

- Static HTML & CSS

### Increment 02:

- add JavaScript
- no Backend
- no DB/Server
- 2 hardcoded users in JS
- 4 to 6 hardcoded locations in JS

### Increment 03:

- add nodeJS Backend
- add mongoDB

# Miscellaneous

### Git flow

1. Never work directly on `main` -- new feature, new branch
2. We use a `merge`-based flow, so avoid `rebase` on main
3. No local merge&push -- Pull Requests only
4. Ideally, have your PR approved before merging
5. Keep your commit message short, expand to multi-line if necessary

### Setup

- The `/.gitignore` was created using [gitignore.io](https://gitignore.io) and ignores all binary/config files related vim, vscode, nodeJS, and macOS.
