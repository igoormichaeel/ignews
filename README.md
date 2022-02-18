# ig.news

![cover](public/images/ignews-ignite.png)

## About this project

A JAMStack application of a news page for subscribers developed at [Rocketseat's](https://www.rocketseat.com.br/) _Ignite ReactJS_ course using ReactJS and NextJS. If you're not a subscriber you'll not have full access to the posts, to have it, you need to be logged into an account with active membership. You can login using your GitHub account.

## Technologies and tools

- [ReactJS](https://reactjs.org/) as library
- [NextJS](https://nextjs.org/) as framework
- [TypeScript](https://www.typescriptlang.org/) as programming language
- [SASS](https://sass-lang.com/) for styling
- [Next-Auth](https://next-auth.js.org/) for authentication and login
- [Stripe](https://stripe.com/) for payment and subscriptions
- [FaunaDB](https://fauna.com/) for storing users and subscription
- [Prismic CMS](https://prismic.io/) for post management

## Demonstration

![demonstration](https://user-images.githubusercontent.com/31330416/154574351-008f8654-3d57-432c-b6b6-f692bb216c3c.gif)

## Getting Started

### Requiriments

To run this project in the development mode, you'll need to have:
- [Git](https://git-scm.com/)
- [Yarn](https://classic.yarnpkg.com)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

### Installing

On terminal, clone de repository and go to the directory
```bash
$ git clone https://github.com/igoormichaeel/ignews.git
$ cd ignews
```
And execute the following command to install all de dependencies:

```bash
$ yarn
```

Then, to runs the app in the development mode, execute:

```bash
$ yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
