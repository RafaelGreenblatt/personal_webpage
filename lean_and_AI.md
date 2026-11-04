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

Working on your local machine gives the AI access to your files and the possibility of running programs on your computer.  There are safeguards built in to the program which is actually doing this, but you may not trust them, and so you may want to take extra precautions to separately enforce restrictions on what it has access to ("sandboxing").  Personally, I have an extra user account on my computer (not admin, obviously) where the AI interface is installed, and a separate email address and GitHub account (see below) for AI-assisted edits.  A virtual machine would probably be an even more secure.

### Why Git?

[Git](git-scm.com) is a distributed version control system, meaning that (when used properly) it keeps track of which files in a folder ("repository" or "repo") are changed when and by who, and gives a very flexible way of synchronizing changes between collaborators working in parallel.  This gives an extra tool for seeing what the AI has done, and fixing unwanted changes.

Git is a free, open-source program that can be used on its own, but is most often used with hosting services such as [GitHub](github.com) (which is a commercial service, but the free version is very good).  Even if you are working on a single computer, synchronizing is a good idea since it gives you an off-site backup.

Unlike e.g. Dropbox, Git does not save versions ("commit") or synchronize ("push/pull") automatically.  This can be an advantage when collaborating, and AI agents can help you deal with the complications it creates.

### Which AI?

Oliver and I use Anthropic's [Claude](claude.ai), but this is a fairly arbitrary decision, and the systems ("models") available change quite quickly.  Whichever provider you use, you will probably need a paid version to get very far.  If you want to try this without setting up a subscription, you can also use an [API key](https://platform.claude.com/settings/keys) with a small amount of pay-as-you-go credit, however my impression is that subscriptions can be significantly cheaper if you use them regularly.  If you already have a subscription with another provider, just use that.

### Why an IDE?

An Integrated Development Environment (IDE) is a fancy text editor with a bunch of added tools for programming or similar tasks.  This gives you a common interface for all of the other tools and also helps them work together.

Oliver uses [VS Code](https://code.visualstudio.com/), which is a good choice for getting started.  Personally I also use [NeoVim](https://neovim.io/), but that takes more effort both to set up and to get used to using.

## Installation

1. [Download and install VS Code](https://code.visualstudio.com/download); if you use a separate user account (like me), you may need to do this step in your admin/root account, depending on your OS.  
All the subsequent steps should be done in the user account.
2. [Install Lean and the Lean plugin for VS Code](https://lean-lang.org/install/).
3. Install the plugin for your AI: [Anthropic Claude](vscode:extension/anthropic.claude-code), [OpenAI Codex](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt), [Mistral Vibe](https://marketplace.visualstudio.com/items?itemName=mistralai.mistral-vibe-code), etc.
4. Install the [LateX Workshop](https://github.com/James-Yu/LaTeX-Workshop/wiki/Install#installation) plugin.

At this point near the top of your VS Code window you should see a $\forall$ icon for Lean and an icon for your AI interface; if not, you probably need to indicate that folder you are working on is "trusted"; look for a button labelled "restricted mode" in the lower left corner of the Code window.

## Some comments about Lean

All Lean can do is verify that certain conclusions follow from the specified premises according to certain rules, so the fact that a file compiles doesn't mean anything if the premises are inapropriate or the conclusion is not what you actually want to prove.

Ideally, the premises will only be foundational axioms of mathematics; besides the axioms that are built into the structure of the language and compiler, this is [usually understood to mean](https://lean-lang.org/theorem_proving_in_lean4/find/?domain=Verso.Genre.Manual.section&name=axioms-and-computation) the classical axiom of choice (`Classical.choice` in Lean), propositional extensionality (`propext`), and the quotient axiom (`Quot.sound`). 

A lot of things have already been proven this way and collected into a collection called [mathlib](https://leanprover-community.github.io/mathlib-overview.html); if you are lucky, the main inputs you need will be there.  If not, rather than fill in all the gaps, it is probably a better use of your time to take published results for granted and treat them as `axiom`s.  An AI can set this up for you, but you may have to help it get copies of the papers or books in question and you should check yourself that the statements actually match.

Just as importantly, Mathlib contains a lot of standard definitions.  Since these have been through a lot of review and are pretty heavily used, I feel confident that they are reasonable versions of the generally accepted definitions; however sometimes they have some peculiarities related to the structure of Lean.

Lean uses a significant amount of disk space and RAM, and can be slow to compile.  Each active Lean project will include a cache of about 8 GB of compiled files (mostly Mathlib), and the tools I recommend will load a significant part of this into RAM while active.  I have been able to run this setup on a machine with 8GB of RAM, but it is not ideal.  16 GB is fine but still requires some care (mostly delegated to the AI) to avoid crashes and slowdowns.

Lean's default behavior is to build all dependencies (usually all of Mathlib) from source, which means that the first run of a project (including via an IDE) will be very slow.  You can avoid this by running the command `lake exe cache get` in the project directory (once it is set up with a `lakefile.toml`) which instructs the compiler to download prebuilt versions.  Your AI may do this on its own.

Finally, like any piece of software, the Lean compiler is not guaranteed to be perfect; bugs have been found in it (some quite recently) which made it possible to get it to approve invalid proofs until they were fixed.  It is however *very* actively maintained.

## About GitHub

When using GitHub regularly, you will probably want to set up [SSH access with keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh), probably one key per account per computer.

Since I already used GitHub regularly, I set up a separate account for AI-aided edits.  This is an extra precaution, since the AI should flag which edits it makes by itself.

## About AI coding agents

AI models have a limited amount of 'context', which you can think of as working memory, and for various reasons you will/should introduce new 'sessions' which resets it.  Consequently, agents use [Markdown](https://en.wikipedia.org/wiki/Markdown) text files as something like notes or long-term memory.  You can also use files like this to give persistent instructions, for example with [CLAUDE.md](https://claude.com/resources/articles/using-claude-md-files) or its counterparts for other models.

Besides the command line, agents can call programs on your machine through [MCP](https://en.wikipedia.org/wiki/Model_Context_Protocol).  I recommend telling your agents to use [lean-lsp-cp](https://github.com/oOo0oOo/lean-lsp-mcp) when writing/editing Lean code; they can walk you through the setup.
