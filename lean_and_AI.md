# A setup for AI-assistant formal math

These are a few notes on the setup used by Oliver Buterley in his presentation on October 28th, for those who want to try it out, possibly with modifications.  These are written with what I think is most helpful to know to get started, leaving out details that you can fill in yourself (possibly with the help of a chatbot).

## Premises

This setup is meant to use a cloud AI agent to work with Lean and LaTeX files on your local machine organized in a Git repository to produce, verify, and manipulate mathematical proofs.  You will interact with any or all of these through an IDE.

### Why Lean?

[Lean](lean-lang.org) is a specialized programming language for writing mathematical proofs which can be verified according to the rules of formal logic, and a compiler which does that checking algorithmically.  When an AI-generated proof is written or translated into Lean, this gives an alternative to checking all the details yourself or trusting an AI to check it.

### Why your local machine?

Working with files on your local machine means:

- The files are there for you to look at with all of the tools that you would normally use, and not just a web interface.
- The AI has access to tools you set up on your computer.  At the moment this is particularly useful for Lean.

### Why NOT your local machine?

Working on your local machine gives the AI access to your files and the possibility of running programs on your computer.  There are safeguards built in to the program which is actually doing this on your computer, but you may not trust this, and so you may want to take extra precautions to separately enforce restrictions on what it has access to ("sandboxing").  Personally, I have an extra user account on my computer (not admin, obviously) where the AI plugins are installed, and a separate email address and GitHub account (see below) for AI-assisted edits.  A virtual machine would probably be an even more secure.

### Why Git?

[Git](git-scm.com) is a distributed version control system, meaning that (when used properly) it keeps track of which files in a folder ("repository" or "repo") are changed when and by who, and gives a very flexible way of synchronizing changes between collaborators working in parallel.  This gives an extra tool for seeing what the AI is doing, and fixing unwanted changes.

Git is a free, open-source program that can be used on its own, but is most often used with hosting services such as [GitHub](github.com) (which is a commercial service, but the free version is very good).  Even if you are working on a single computer, synchronizing is a good idea since it gives you an off-site backup.

Unlike e.g. Dropbox, Git does not save versions ("commit") or synchronize ("push/pull") automatically.  This can be an advantage when collaborating, and AI agents can help you deal with the complications it creates.

### Which AI?

Oliver and I use Anthropic's [Claude](claude.ai), but this is a fairly arbitrary decision, and the systems ("models") available change quite quickly.  Whichever provider you use, you will probably need a paid version to get very far.  If you want to try this without setting up a subscription, you can also use an [API key](https://platform.claude.com/settings/keys) with a small amount of pay-as-you-go credit.  If you already have a subscription with another provider, just use that instead.

### Why an IDE?

An Integrated Development Environment (IDE) is a fancy text editor with a bunch of added tools for programming or similar tasks.  This gives you a common interface for all of the other tools and also helps them work together.

Oliver uses [VS Code](https://code.visualstudio.com/), which is a good choice for getting started.  Personally I use [NeoVim](https://neovim.io/), but that takes more effort both to set up and to get used to using.

## Installation

1. [Download and install VS Code](https://code.visualstudio.com/download); if you use separate user account (like me), you may need to do this step in your admin/root account, depending on your OS.  
All the subsequent steps should be done in the user account.
2. [Install Lean and the Lean plugin for VS Code](https://lean-lang.org/install/) I redommend that you don't create a new Lean project yet, despite the instructions.
3. Install the plugin for your AI: [Anthropic Claude](vscode:extension/anthropic.claude-code), [OpenAI Codex](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt), [Mistral Vibe](https://marketplace.visualstudio.com/items?itemName=mistralai.mistral-vibe-code), etc.

At this point near the top of your VS Code window you should see a $\forall$ icon for Lean and an icon for your AI interface.

## Some comments about Lean


