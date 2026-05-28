Personal website, made with vitepress. 

To preview local copy, npm run dev.

For local installation, may need to do and "npm install" and "npm install csv-parse".

When setting up a new project, include `.github` folder and follow the instructions there to set up automatic publication from github.  Remember to set "base" in `.vitepress/config.mts`.

The current version also publishes the website to `github.io`; since my main server is down, there is a line in `deplay.yml` that suppresses error messages related to that (which I might want back in the future).
