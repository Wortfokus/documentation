---
slug: planning-goes-on
title: Planning goes on
authors: [adrian]
tags: [quizapp, documentation]
---

A little update about the current state of the product. I am still mainly in the planning phase, but I am also certain to be able to start with coding soon. Most of the needed tech-stack is now selected and I could go on working on our application. 💪

<!-- truncate -->

# Current State

After many days of planning and thinking how I could come up with the best solution and how I would implement stuff there are still questions open.

But the architect (@adrian) was able to make some progress by coming up with a tech-stack and planning for the future. (I will explain later what the thought process was).

In the mean time new article where written on the main page and also published. Thanks to everyone who reads them and also comments it. I still hope it is a blessing for anyone using it and that people get strengthened in their belief.

Until now nothing was coded and I am still kind of stuck in the planning part. But I am certain that soon enough the important things are planned, so that the engineers (@adrian) 😅 can start working on the application.

---

## Architectural Planning

On  the planning more things came than first thought. From only thinking about the tech-stack (Flutter, .Net and a Database), I had to think about more stuff. Here some examples:

### Authentication

How would the projects implement authentication? I mean, it should somehow cost little to use it, but in the mean time it should also promise enough security. Could I use a self-hosted solution like [KeyCloak](https://www.keycloak.org/) or is [Auth0](https://auth0.com/) a better solution?

I ended up with [Firebase](https://firebase.google.com/). Here the thought process:

I would love to use a self-hosted solution like already mentioned: [KeyCloak](https://www.keycloak.org/). But right now there is only one developer and I have yet not enough experience to promise a secure authentication if I do it on my own.

But then I could use a third-party solution like [Auth0](https://auth0.com/). It would meet all the needed requirements I had. Those where: I can easily use it in my own coded application. Auth0 provides a SDK for .NET [libraries](https://auth0.com/docs/libraries) and there is also a plugin available to use the login-process on my current Wordpress page. There is only one big issue. It found many comments that it was too expensive. Soon enough I would need to pay a lot of money, for a page which should be actually not cost anything to the users.   

The next product I checked was [SupaBase](https://supabase.com/). It provides an authentication and also a database in the same package. Would be good enough for me. But again, I found comments that it would cost too much and it does not have a direct integration for my Wordpress site.   
And also I wanted to have an own hosted postgres-solution (managed database), for learning purposes. So it was also a nice solution, but it did not handled all my whishes.

The next product I checked was [Firebase](https://firebase.google.com/). It seems to have a cheap option and is easy to implement with my current techstack. It looks like that there is also a plugin available to use it on wordpress.

This makes Firebase probably the best solution overall. But we need to remember that I did not make any implementation but only used internet resources.

### Database

The next problem was which database should I use. I have worked with several kind of databases. From SQL-Databases like [PostgreSQL](https://www.postgresql.org/), to [MongoDB](https://www.mongodb.com/) and a Graph-Databases [Neo4J](https://neo4j.com/). 
All of them have their arguments to be used. For example is Neo4J an easy solution to make relations. Document-based MongoDB with his NoSQL features (I know Neo4J also is a NoSQL-Database). And then PostgreSQL with its tables and relations.

I personally prefer Neo4J as Database (since I like the way it handles relations). But for my case I had to think about the information I wanted to store and how to set up my database. So I had to put my preferences a bit back...   
First I was thinking about the most important data really needed.   

What would it be?🤔   
I mean for sure Users need to be stored. And I am building a quiz-application - so questions? And their answers?   
Something else?   
Oh, yeah in future I have feature I want to implement...

And what do I need to store there:
- Story
- Text 
- Questions between the different texts
- Its answers

For the story-feature, the graphical database looks nice.
But what about the questions? How do I store them? And the answers?   

And as a result, relational databases seemed to be the best solution. (I have to admit, I had to use ChatGPT to convince me, since I would have thought differently).   
So I ended up with PostgreSQL. (For further insights about our decision check also [this page](../docs/projects/project-quiz/architecture/Decisions/adr-001-database-decision))

### Further Elements

We already made some further planning and we made some decisions. Although it might get more important when we have a first production-ready solution.   

We for example checked how we could host our fullstack-application and make it available. There it looks like we use a combination of already using solutions and add new ones.    
This means in our case that Wordpress is still used with Ionos, but our other products are hosted in an other way. But we have yet not decided which provider we will use. It was more about the idea if we host everything (Wordpress and Coded Products) on the same host-provider. But it looks like Ionos is the best when using Wordpress and others are better applying DotNet.     
But we will come back to this, as soon as we go into production.

---

This was the second blog-article. 😁   
I hope you got an idea about what is happening in the background, while planning our application.   
It's though, but we should soon enough be able to start coding. We also already prepared some stuff on Github. (Like Project-Board and automatically move Issues on the board).