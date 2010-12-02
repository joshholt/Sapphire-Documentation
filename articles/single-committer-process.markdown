Title: Git Single Committer Process
Author: Josh Holt
Date: Mon Nov 28 2010 17:00:00 GMT-0500 (EST)
Node: v0.1.0 

How to setup up your project for the Single Committer Model
==============================================================================

In your project directory you will need to open the __.git/config__ file in your
favorite text editor..

> # Original Contents of _.git/config_ #
	[core]
		repositoryformatversion = 0
		filemode = true
		bare = false
		logallrefupdates = true
		ignorecase = true
	[remote "origin"]
		fetch = +refs/heads/*:refs/remotes/origin/*
		url = git@github.com:Rigel/Sapphire.git
	[branch "master"]
		remote = origin
		merge = refs/heads/master

> # Modified Contents of _.git/config_ #
	[core]
		repositoryformatversion = 0
		filemode = true
		bare = false
		logallrefupdates = true
		ignorecase = true
	[remote "origin"]
		url   = git@github.com:Rigel/Sapphire.git
		fetch = +refs/heads/*:refs/remotes/origin/*
		push  = +refs/heads/*:refs/remotes/jh2/*
	[branch "master"]
		remote = origin
		merge = refs/heads/master
		

When you are ready to bring _you local master_ in sync with the TOT
==============================================================================

	git checkout master
	git fetch origin
	git rebase origin/master

When you are ready to bring a _&lt;topic branch&gt;_ in sync with _your local master_
==============================================================================
	
	git checkout <topic branch>
	git rebase master

When you encounter conflicts
==============================================================================

	if (conflicts) {
		foreach (confilctedFile) {
			fix confilct
			git add path/to/the/conflicted.file
		}
		
		result = git rebase --continue
		
		if (result == "did you forget to add?") {
			forgotten = git status										// Displays modified files
			if (forgotten) {
				foreach (forgottenFile) {
					git add path/to/forgotten.file	
				}
				git rebase --continue
			}
			else if (!forgotten) {
				git rebase --skip
			}
			else {
				git rebase --abort
				Ask for help....
			}
		}	
	}
	
Decision Points
==============================================================================

When you have an idea or a task that you need to code, you will want to create a local topic branch ( Because branches are cheap in GIT ).

	// First ensure that your master is up-to-date
	git checkout master
	git fetch origin
	git rebase origin/master
	
	// Then create your <topic/task/idea branch> (Long Form)
	git checkout master
	git branch <topic/task/idea branch>
	git checkout <topic/task/idea branch>
	
	// Alternate Form
	git checkout master
	git checkout -b <topic/task/idea branch>
	
Regular Commit Process
==============================================================================

When you have completed a task/thought or you just want to commit your progress
you can follow the following guidelines.. 

(Remember it is helpful to keep your commits small and commit often)

	if (Thought.isComplete) {
		git status									 // Displays changed Files (CRUD)
		git add -i
	
		switch (CRUDOperation) {
			case 'files changed':
				choose Option #2 ('u') [update files]
				select #s of files to add that are related to your thought/task
				press <return/enter>
				break;
				
			case 'new files':
				choose Option #4 ('a') [add new files]
				select #s of files to add that are related to your thought/task
				press <return/enter>
				break;
		}
		
		// When your are finished Staging
		choose Option #7 ('q')
		
		// Then commit your staged changes
		if (readyForIntegration) {
			git commit -m "<my clear commit message>"
		}
		else if (havingTrouble) {
			git commit -m "[BROKEN] <my clear commit message>"
		} 
		else if (fix a forgotten change for last commit) {
			git commit --amend
		}
		else {
			git commit -m "<my clear commit message>"
		}
	}
Prepare to be integrated
==============================================================================

	// First ensure that you local master branch is up-to-date
	git checkout master
	git fetch origin
	git rebase origin/master
	
	// Then ensure that your <topic/though/idea branch> is up-to-date
	git checkout <topic/though/idea branch>
	git rebase master
	-- resolve any conflicts --
	
	// Then merge your <topic/though/idea branch> into your local master and push
	git checkout master
	git merge <topic/though/idea branch>
	git push