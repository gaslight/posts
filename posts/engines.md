We recently realized that this site (the one you're reading at right now) was starting to get a little too large to remain sustainable. We started noticing that large parts of the app provided completely separate fuctionality and didn't really need to communicate with each other. Maintaining these separate parts as a single monolithic application was starting to become painful.

Here's the basic structure:

* Gaslight.co (static pages, newsletter signups, contact forms)
 * BlogApp engine (posts, tags, comments)
 * TrainingApp engine (courses, chapters, instructors, registrations)

Is an engine right for me?

Engines aren't the answer for everything, and building a rails app with engines will increase development time. The benefits are that you can maintain pieces separately. Each engine can be run in isolation having it's own layout, assets, and test suite. Furthermore, architecting an app with engines forces you to really think through your dependencies and makes you isolate things from the get go.

The difficulties:

1. **Gems**. Engines define dependancies with a .gemspec, not a Gemfile, meaning your gems need to be available on a gem server like RubyGems and can't be loaded directly from GitHub. You can always vendor a gem locally, but thats kind of a hassle. You also need to be careful to use similar versions of dependancies between engines. If you're using haml 3 in one engine, use that version everywhere.

1. **Shared assets**. Sharing assets and partials between engines is hard. I've tried to various solutions, but ended up stubbing out the dependent assets within each dummy app. For instance, the newsletter signup form in the sidebar (over there &#8594;) gets pulled in from the main application as `shared/_newsletter.erb`. In the dummy app of our blog engine, we have a blank template under `shared/_newletter.erb` so it doesn't raise a missing partial error when we run the blog in isolation. 

1. **Migrations**. Scoped migrations are great and make it clear which tables go with which engine. Running `rake blog_app:install:migrations` is lame, and can lead to some nasty bugs when migrations get out of sync. Before you start with engines, read [Pivotals Post](http://pivotallabs.com/leave-your-migrations-in-your-rails-engines/) and keep your migrations separate.

The awesomeness:

1. **Separate Tests** 

1. **Quick development**


In the end, you'll have a much more maintainable and scalable systems.
