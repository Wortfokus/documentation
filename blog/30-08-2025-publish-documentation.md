---
slug: publish-documentation
title: Publish Documentation
authors: [adrian]
tags: [quizapp, documentation]
---

Today, I tried to publish this documentation online, with every possible resource and restrictions.   
The result was that I am now able to automatically publish my documentation on my [developer-portal](https://developer.wortfokus.org) and people are able to read it.   
Have fun!

<!--truncate-->

# Preparation

The first work which needed to be done was preparing a domain. Since I did not want to buy a new domain, I checked what other projects would do in that case.

I found that many have a so-called subdomain on which they publish their documentation. Also multiple applications can be hosted through this way.   
I decided to do it the same way and publish my documentation, although not yet fully finished, under a subdomain.   
_(It's not like the first time I heard about subdomains, but it is kind of the first time to use this possibility.)_

For preparation purposes I organized the subdomain on Ionos. After deciding to stand with Ionos and not change it to an other provider (mainly using Cloudflare as CDN solution), I registered the subdomain on the plattform.   
I also added other domain-ending to my existing domain. Since I am mostly working with german articles, I added the domain-endings [.com | .ch | .at ].

# Automation

Since I use Github as my coding-store, I was also able to implement some automation with Github Actions.   
It is not new to me and I already used Github Actions. But what was new, the deploying part. Until now I only used the CI-part of Github Actions - running tests on pushes and merges.   

But how would deployment work?   
Luckily I was not the first one to question this :)   
With some search I found out that you could publish your code quite easily. **If** your Configuration in your Docusaurus works properly together with your deployment-file.
After running my code multiple times I was able to see the documentation on a github page. But how would I be able to see the result on my subdomain?

# Configuration 

Therefore some more steps needed to be done:
1. Github-Workflow-File needs to be correct.
   1. Exists in the right folder-structure (.github / workflows / deploy.yml)
   2. deploy.yml need to work correctly and result with a build.
   3. Check if Github-Actions has all the needed permissions in your settings (you might need to allow gh-pages to make changes).
2.  My docusaurus-configuration file needs to have the correct url (and it is not the Github-Page, but rather directly on my subdomain).
3.  Set the right settings in my Github-Page Settings.
    1.  Source was "Deploy from a branch" (since I used a prepared way to build - see the last step in my deploy.yml-file)
    2.  Select the right branch: gh-pages and take the root (and not docs as I did it in the beginning).
    3.  And set the custom-domain (you first need to configure in Ionos something too).
4.  Add CNAME in Ionos to point towards my github-page. (It takes maybe some time until it is available).

## Tip

I had for a long time a big issue that my page was not found. It came because of some mistakes of mine.   
First I set the wrong domain in my docusaurus-configuration. _(Although I am not sure if this really helped, because as I understand, this configuration is only needed if you publish directly from your codebase.) But what was needed, is that I put my baseUrl to an empty folder and not showing towards a documentation-folder.

Next thing I had done wrong, was that I did not select the root-folder in my Github-Page-Settings and rather put docs as the value, which is wrong.

And in the end, maybe delete your gh-pages branch after a while. Because I did so many commits and run the Action so often, wrong configuration where not always deleted or overwritten, but rather stood in an own file. So maybe the problem is in your gh-pages branch and you cannot see the mistake because everything else is actually fine.

# Final

After everything was finished, I was able to automate the publication of my documentation.   
You might ask yourself now, why was it so important for me to automate the publication of a simple document?   
The reason is simple:  
I wanted to get familiar with Github-Actions before my fullstack-application needs to be published.

So now, after every merge to my main branch, I can update my public documentation.