---
sidebar_position: 2
sidebar_label: Authentication
---

# Authentication

Since we want user to be able to use the same login for all the different projects, we are thinking of using SSO.

:::note
## What is SSO

Single sign-on (SSO) is a technology which combines several different application login screens into one. With SSO, a user only has to enter their login credentials (username, password, etc.) one time on a single page to access all of their SaaS applications.
[Cloudflare explanation](https://www.cloudflare.com/learning/access-management/what-is-sso/)
:::

As of right now we have only two logins. The first one being on the website [Wortfokus](https://www.wortfokus.org) and the other one being the quiz-application. We would either use a third-party application, which would probably make the login easier or use the solution provided by wordpress.

Some short thoughts about using any of them:

### Third-Party Solution.

There are some positive parts about this solution. For example we could use a plugin in Wordpress, which might be also for free.
It is maybe also easily applicable to use it in our backend and user should have no problems using it.

The negatives is that we might have to pay some money after a while. Being dependent on a third-party-solution could be a bottleneck in the end.


### Wordpress-Login

We could use the login solution of wordpress. It would be easy to be implemented inside wordpress, but using it in our backend is not safe. We would need to make some research if this is possible.
The other problem could be that sessiontokens might not be available on both sites. We would need to check this.

### Own Solution

Using a solution like jwt-library and building up your own solution. Needs a lot of knowledge.


## Result

The architect decided to give Firebase a go, since it has a good price and seems not to be too expensive.