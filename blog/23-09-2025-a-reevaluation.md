---
slug: reevaluation
title: Reevaluation
authors: [adrian]
tags: [quizapp]
---

A long time went by since my last blog-post. Since the last publication, some ideas where created and tested.
Other ideas where kind of thrown into the trash. Mostly because of timing issues.

We had to think about which tools really make sense and which are not good enough.   
(Although I might should at some point just start developing it, instead of only thinking about it. But until now I was looking for Tutorials about Flutter and tried to learn it. More about this later).

But step by step.
<!-- truncate -->

## School started

First of all my studies started again. This means that I won't have as much time to work on this project as wished anymore.
But the good thing is that I am already in my last semester and I am already very near to finish with a bachelor title in Informatics.
But there remains one big work to do before I can get my degree, and this is my Bachelorthesis.   

So therefore I need to step back a bit with this project, although my vision is still to make an app which can help Christians to understand the bible more with the generated questionsets.  

But still there is some progress going on with my apps.

## Authentication + Wortfokus.org

As you might have seen, there is now a authentication implementated in my wordpress-application [Wortfokus.org](https://wortfokus.org)   
Users are now able to login to my webpage and bookmark specific articles. This is right now the only feature accesible on wordpress through the authentication. Further implementation might be coming. If you have an idea of what could be implemented; don't hesitate to write me (e.g. mail -> kontakt@wortfokus.org).   

As you might have seen I changed the login to Auth0. The reason for it was that the implementation on my wordpress would have cost me too much. There was a free firebase plugin available, but as soon as you wanted to implement social login, you need to pay for the plugin, which was not my intention. We might think of going to an other platform (e. g. own CMS-version on Github).

But for now Authentication is implemented and the user is now able to stick forward with his account registered.   

## Move away from Flutter

Although Flutter seems to be a fun challenge, it took me to much time to understand it. There might be a future project where I could use Flutter. But for now I am interested in setting up the project relatively fast. Therefore Ionic and Angular seems to be a better fit.   
It might also end up in Ionic and Vue, because Vue seems to have a prettier UI. But this is not fixed until now.   
I will have to decide this soon enough, although.   

## Future

What is going on right now?

Since I am constantly reevaluating Wordpress (I have to admit it provides many good features), but it is a constant restructuring and search for new ways - I am considering a CMS-solution like [ghost](https://ghost.org/) 

Next on our list is the start of the implementation. First we need to have an idea about the design of our UI. How to implement it (Angular or Vue) and then our backend.   
The last thing will be the authentification to be implemented. As soon as we get this things, we can start to implement the rest of the application straight forward.