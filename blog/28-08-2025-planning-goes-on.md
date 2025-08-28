---
slug: planning-goes-on
title: Planning goes on
authors: [adrian]
tags: [quizapp]
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

The next product I checked was [Firebase](https://firebase.google.com/)