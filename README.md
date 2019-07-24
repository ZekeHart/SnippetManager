# Deployed site:
https://snipmanager.herokuapp.com/

# Instructions

This week, you will be in a team of three or four people working on a project. You should use [GitHub issues](https://guides.github.com/features/issues/) to keep track of who is working on what, and should use [feature branches](https://bocoup.com/blog/git-workflow-walkthrough-feature-branches) for development.

Your team's creativity and common sense should be used as you work. There are common features to web applications that users expect. If they are not mentioned in the project's description, you should still do them. For example: in the Question Box application, users should have avatar images. You don't have to handle file uploads yourself -- you could use Gravatar with [django-gravatar](https://github.com/twaddington/django-gravatar) -- but you need some way of handling that.

Likewise, come up with your own features to make your project unique. You will likely use this project in your portfolio, so make it stand out!

## Trying new things

Each team should try something they don't know how to do on their project. This could be a Python or JavaScript library they haven't used before or a feature of Django they haven't tried.

Some ideas:

* [Allow users to authenticate via Google or other third-party auth](https://www.intenct.nl/projects/django-allauth/)
* [Try Dragula for drag and drop](https://bevacqua.github.io/dragula/)
* [Use Restless to build an API](https://restless.readthedocs.io/en/latest/)

# The Projects

## Project 1: Code Snippet Manager

You need a good way to manage snippets of code you reuse often. You are going to build a web application that has these goals:

- Registered users can add code snippets.
- Registered users can search their own code snippets and get results _quickly_. There should be no page reload involved in this search -- you'll need JS and Ajax.
- Each user has a profile page that shows their public code snippets. Other users can copy a snippet with one click, adding it to their library of snippets.

### How snippets work

A snippet has code (required), a language (required), a title (optional), and whatever other fields make sense. Some ideas to consider: a description or a list of tags.

If you copy a snippet by clicking the copy button (or whatever UI element is used for this purpose), there's a link back to the original snippet. The easiest way to do this is with a foreign key. One should be able to see how many times a snippet has been copied.

The reason why we copy snippets instead of "favorite" them is that they can change. The original snippet creator can edit their snippet; the copying user can edit their copy.

### How search works

Search should look for terms in the title, in other fields like a description or tags, and in the language field. If I search for "javascript auth," I should see any snippets I have about authentication using JavaScript. See [search](https://docs.djangoproject.com/en/2.1/topics/db/search/) and [full text search](https://docs.djangoproject.com/en/2.1/ref/contrib/postgres/search/) in the Django documentation for some ideas.

### How much of this is JavaScript + Ajax?

This can vary, but the three parts that _definitely_ need JavaScript are syntax highlighting, search, and copying snippets. Search and copying snippets will also require Ajax endpoints.

For syntax highlighting, check out [Prism.js](https://prismjs.com/) or [Highlight.js](https://highlightjs.org/).

You probably want to add a button to copy a code snippet to your clipboard as well. See [this article on native browser copy to clipboard](https://css-tricks.com/native-browser-copy-clipboard/) for ideas.

## Project 2: QuestionBox

You want to make an application where people can crowdsource their questions and get answers. You are going to build a web application that has these goals:

* Users can view questions and answers
* Registered users can ask questions
* Registered users can add answers to any question
* The question's creator can mark answers as correct
* Registered users can "star" questions and answers they like

### How questions and answers work

Questions have a title and a body. Allow your users to use [Markdown](https://en.wikipedia.org/wiki/Markdown) for authoring question bodies. [Python-Markdown](https://python-markdown.github.io/) can turn Markdown into HTML for you. You will also want to prevent people from putting unauthorized HTML into your Markdown code. Using [Bleach](https://bleach.readthedocs.io/en/latest/clean.html) and [bleach-whitelist](https://github.com/yourcelf/bleach-whitelist) should help with that. Questions cannot be edited once they have been asked. A question can be deleted by its author. If it is deleted, all associated answers should also be deleted.

Answers just have a body and are connected to a question. Answers can also use Markdown.

Every question and every answer should be associated with a user.  A user should be able to view all their questions on a user profile page.

When a user answers a question, the question's author should receive an email with a link to the answer.

### How much of this is JavaScript and Ajax?

Adding answers should happen in the page with no page load, thereby needing Ajax. Likewise, "starring" questions and answers and marking answers as correct should happen via Ajax.

The rest of the application can be plain old Django views, although you can use JavaScript and Ajax to load questions and answers if you want.

## Project 3: Flashcards

You want to make an application to help people learn via flashcards. You are going to build a web application that has these goals:

- Registered users can create multiple decks of flashcards, each with a prompt or question and an answer.
- Registered users can quiz themselves on a deck.
- Success and failure for each card is recorded.

### How decks and cards work

A user can have multiple decks of flashcards. Each deck has a title. Each flash card has a prompt or question and an answer.

When a user is quizzing themselves on a deck, they _do not_ have to type in answers. They are shown the prompt, they click to see the answer; they then mark whether they answered it correctly or not. They should see one card at a time.

When the user marks success or failure on a card, this should be recorded.

The cards should be shown in a random order at a minimum. A preferable method would be to use something like [the Leitner system](https://www.virtualsalt.com/learn10.html) for flash cards. This system uses review times; you could use that, or just use the idea of multiple boxes, with cards in lower boxes coming up more often.

### Creating decks and running through decks

This application has two very distinct parts -- creating decks and cards and then running through those decks. This is a natural place to split work. Do not forget to make creating decks and cards an easy-to-use experience.

### How much of this is JavaScript + Ajax?

This can vary, but I imagine a lot of it is JavaScript. To show one card at a time without a page reload in between cards will require talking back and forth via Ajax. Recording whether you answered correctly or not would be another Ajax call.

"Flipping" a card (you don't have to animate a card flip, although if you do, that's very cool) will almost certainly require JavaScript.

You could have a page load in between cards and reduce your amount of JavaScript. Depending on how you do this, it could also record success or failure, eliminating most of your JavaScript.
