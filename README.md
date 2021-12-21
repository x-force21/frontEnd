# frontEnd
proyecto front end de aplicación de gestión de proyectos


Looking to understand how to workflow works... here a little example of it with text:
El archivo tiene las dos opciones para correr el text y build el docker image en Heroku



archivo original:

name: React CI - CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: macos-latest

    strategy:
      matrix:
        node-version: [15.x]
    
    steps:
      - uses: actions/checkout@v1
      - run: npm install
      - run: npm run build
      - run: npm test
      - uses: gonuit/heroku-docker-deploy@v1.3.3 # GitHub action name (leave it as it is).
        with:
          args: --acl public-read --follow-symlinks --delete
        env:
          email: ${{ secrets.HEROKU_EMAIL }}
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: ${{ secrets.HEROKU_APP_NAME }}
          # (Optionals)
          dockerfile_name: Dockerfile
          SOURCE_DIR: 'build'      # optional: defaults to entire repository
          docker_options: "--no-cache"
          process_type: web

