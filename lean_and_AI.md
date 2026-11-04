# A setup guide for AI-assisted formal math

These are a few notes on the setup used by Oliver Buterley in his presentation on October 28th, for those who want to try it out, possibly with modifications.  My intent is to write what I think is most helpful for you to know to get started, leaving out details that you can fill in yourself (possibly with the help of a chatbot).

## Premises

This setup is meant to use a cloud AI agent to work with Lean and LaTeX files on your local machine, organized in a Git repository, to produce, verify, and manipulate mathematical proofs.  You will interact with any or all of these through an IDE.

### Why Lean?

[Lean](https://lean-lang.org) is a specialized programming language for writing mathematical proofs explicitly enough to be verified according to the rules of formal logic, and a compiler which does that verification algorithmically.  Writing or translating a proof into Lean gives an alternative to checking all the details yourself or trusting an AI to check them.

### Why your local machine?

Working with files on your local machine means:

- The files are there for you to look at with all of the tools that you would normally use.
- The AI has access to tools you set up on your computer.  At the moment this is particularly useful for Lean.
- You are free to change just about any element of this setup, for example switching between different AI providers.

### Why NOT your local machine?

Working on your local machine gives the AI access to your files and the possibility of running programs on your computer.  There are safeguards built into the program which is actually doing this, but you may not trust them, and so you may want to take extra precautions to separately enforce restrictions on what it has access to ("sandboxing").  Personally, I have an extra user account on my computer (not admin, obviously) where the AI interface is installed, and a separate GitHub account (with a separate email address) for AI-assisted edits.  A virtual machine would probably be even more secure.

### Why Git?

[Git](https://git-scm.com) is a distributed version control system, meaning that (when used properly) it keeps track of which files in a folder ("repository" or "repo") are changed when, how, and by whom, and gives a very flexible way of synchronizing changes between collaborators working in parallel.  This gives an extra tool for seeing what the AI has done, and fixing unwanted changes.

Git is a free, open-source program that can be used on its own, but is most often used with hosting services such as [GitHub](https://github.com) (which is a commercial service, but the free version is very good).  Even if you are working on a single computer, synchronizing is a good idea since it gives you an off-site backup.

Unlike e.g. Dropbox, Git does not save versions ("commit") or synchronize ("push/pull") automatically.  This can be an advantage when collaborating, and AI agents can help you deal with the complications it creates, but it does still require some attention on your part.

### Which AI?

Oliver and I use Anthropic's [Claude](https://claude.ai), but this is a fairly arbitrary decision, and the systems ("models") available change quite quickly.  Whichever provider you use, you will probably need a paid version to get very far.  If you want to try this without setting up a subscription, you can also use an [API key](https://platform.claude.com/settings/keys) with a small amount of pay-as-you-go credit; however, my impression is that subscriptions can be significantly cheaper if you use them regularly.  If you already have a subscription with another provider, just use that.

### Why an IDE?

An Integrated Development Environment (IDE) is a fancy text editor with a bunch of added tools for programming or similar tasks.  This gives you a common interface for all of the other tools and also helps them work together.

Oliver uses [VS Code](https://code.visualstudio.com/), which is a good choice for getting started.  Personally I also use [Neovim](https://neovim.io/), but that takes more effort both to set up and to get used to.

## Installation

If you use a separate user account (as I do), you may need to do the first two steps in your admin/root account, depending on your OS:

1. [Download and install VS Code](https://code.visualstudio.com/download).
2. Install [Git](https://git-scm.com/install/) and [GitHub CLI, aka `gh`](https://cli.github.com/).

All the subsequent steps should be done in the user account where you will be working.

3. [Install Lean and the Lean plugin for VS Code](https://lean-lang.org/install/).
4. Install the plugin for your AI: [Anthropic Claude](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code), [OpenAI Codex](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt), [Mistral Vibe](https://marketplace.visualstudio.com/items?itemName=mistralai.mistral-vibe-code), etc.
5. Install the [LaTeX Workshop](https://github.com/James-Yu/LaTeX-Workshop/wiki/Install#installation) plugin.

If you haven't already, open a folder (an empty one is fine), and set it as "trusted": look for a button labelled "Restricted Mode" in the lower left corner of the VS Code window.

At this point, near the top of your VS Code window, you should see a $\forall$ icon for Lean and an icon for your AI interface; click on the latter to open a chat window, then get the AI to set up a project and carry on from there.

## What next?

If you just want to try things out, one idea is to take a paper (to start with, preferably a short one on a subject you are familiar with), put a copy in a new folder (in whatever format you want), and tell the AI to try to make a formal version of the proof.

### About AI coding agents

When using AI agents intended for coding, you will probably want to make sure that you have made it reasonably clear what you want before the agent goes too far.  Most of these systems have a "planning mode" or something similar for this.  Like a lot of features, it is basically a set of instructions sent by an intermediate layer of software, so typing something like "let's work out a plan before we get started" is also an option.

AI models have a limited amount of "context", which you can think of as working memory, and for various reasons you will/should regularly start new "sessions", which reset it.  Consequently, agents use [Markdown](https://en.wikipedia.org/wiki/Markdown) text files as something like notes or long-term memory.  You can also use files like this to give instructions, for example with [CLAUDE.md](https://claude.com/resources/articles/using-claude-md-files) or its counterparts for other models.

Besides the command line, agents can call programs on your machine through [MCP](https://en.wikipedia.org/wiki/Model_Context_Protocol).  I recommend telling your agents to use [lean-lsp-mcp](https://github.com/oOo0oOo/lean-lsp-mcp) when writing/editing Lean code; they can walk you through the setup, which usually has to be done for each project.

### Some comments about Lean

All Lean can do is verify that certain conclusions follow from the specified premises according to certain rules, so the fact that a file compiles doesn't mean anything if the premises are inappropriate or the conclusion is not what you actually want to prove.

Ideally, the premises will only be foundational axioms of mathematics; besides the axioms that are built into the structure of the language and compiler, this is [usually understood to mean](https://lean-lang.org/theorem_proving_in_lean4/find/?domain=Verso.Genre.Manual.section&name=axioms-and-computation) the classical axiom of choice (`Classical.choice` in Lean), propositional extensionality (`propext`), and the quotient axiom (`Quot.sound`).

A lot of things have already been proven this way and compiled into a collection called [Mathlib](https://leanprover-community.github.io/mathlib-overview.html); if you are lucky, the main inputs you need will be there.  If not, rather than filling in all the gaps, it is probably a better use of your time to take published results for granted and treat them as `axiom`s.  An AI can set this up for you, but you may have to help it get copies of the papers or books in question, and you should check yourself that the statements actually match before you do anything important with the results.

Just as importantly, Mathlib contains a lot of standard definitions.  Since these have been through a lot of review and are pretty heavily used, I feel confident that they are reasonable versions of the generally accepted definitions; however, they sometimes have some peculiarities related to the structure of Lean.

Lean uses a significant amount of disk space and RAM.  Each active Lean project will include a cache of about 8 GB of compiled files (mostly Mathlib), and the tools I recommend will load a significant part of this into RAM while active.  I have been able to run this setup on a machine with 8 GB of RAM, but it is not ideal.  16 GB is fine but still requires some care (mostly delegated to the AI) to avoid crashes and slowdowns.

Lean's default behavior is to build all dependencies (usually all of Mathlib) from source, which means that the first run of a project (including via an IDE) will be very slow.  You can avoid this by running the command `lake exe cache get` in the project directory (once it is set up with a `lakefile.toml`), which downloads prebuilt versions instead.  Your AI may do this on its own.

Finally, like any piece of software, the Lean compiler is not guaranteed to be perfect; bugs have been found in it (some quite recently) which made it possible to get it to approve invalid proofs until they were fixed.  It is, however, *very* actively maintained, so I think it is reasonable to expect bugs to be found and fixed quickly.

### About GitHub

When using GitHub regularly, you will probably want to set up [SSH access with keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh), ideally one key per account per computer.

Since I already used GitHub regularly, I set up a separate account for AI-aided edits.  This is an extra precaution, since the AI should in any case flag the edits it makes by itself.

GitHub can also be set to run automatic checks on your repo when you update it ("continuous integration"), for example making sure the Lean code compiles cleanly.  The AI can help you set this up and may very well do it without being explicitly told to.  These checks are defined in the subfolder `.github/workflows/`, so keep an eye out for unexpected edits there.
