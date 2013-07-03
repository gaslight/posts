Ember Controller Concepts
=========================

<p>
<img src="http://gaslight.github.io/posts/assets/images/2013-06-14-an-autosave-pattern-for-ember-and-ember-data-01.png"/>
</p>

I've been finding issues in an Ember application I'm working on where the author
(me) didn't fully grasp Ember controllers. Here are a few controller concepts
I've learned.


Controller Concepts
-------------------

* A controller is a decorator for your models. It proxies all
  the `get` and `set` calls to the underlying model unless that property is
  defined on the controller itself.

* Controllers are fleeting, but models are forever (if you're taking an Ember
  Data-like approach). As you route around your application, controllers will be
  destroyed so don't count on them surviving very long. An exception to this is
  the immortal application controller.

* You don't necessarily need a controller, especially if you're not holding onto
  application state. The router `events` object is a great place to save,
  create, and delete models.

A Day in the Life of a Controller
---------------------------------

In this example I'm going to show a list of items and let the user select one at
a time. This is a pretty common use case where controllers shine.

First we'll setup a route with some dummy data and render a list of names.

```coffee
App.IndexRoute = Ember.Route.extend
  model: ->
    [
      {firstName: 'Gut', lastName: 'Bomb'}
      {firstName: 'Rock', lastName: 'Tastic'}
      {firstName: 'The', lastName: 'Fish'}
    ]
```

```handlebars
<ul>
  {{#each}}
    <li>
      {{firstName}} {{lastName}}
    </li>
  {{/each}}
</ul>
```

Earth shattering stuff.

But now it gets interesting. When the user clicks on an item we want it to appear
selected.

```handlebars
<ul>
  {{#each itemController="name"}}
    <li {{action select}} {{bindAttr class="isSelected"}}>
      {{firstName}} {{lastName}}
    </li>
  {{/each}}
</ul>
```

```coffee
App.NameController = Ember.ObjectController.extend
  select: ->
    @set('isSelected', true)

  unselect: ->
    @set('isSelected', false)
```

First we're telling `each` to use the `nameController` to wrap each name. Then we
send the `select` action to the `nameController` when an item is clicked.  The
`select` action changes the `isSelected` property which in turn adds the
`is-selected` class to the `li` element.

But oh no! If we click another item it also gets selected without unselecting
the other one. [Try it out](http://jsbin.com/ikusok/5).

We need a way to unselect names. Let's introduce an array controller to manage the
array of names.

```coffee
App.IndexController = Ember.ArrayController.extend
  toggleSelect: (controller) ->
    @get('selectedName').unselect() if @get('selectedName')
    @set('selectedName', controller)
    controller.select()
```

In this new controller we're calling our action `toggleSelect` to more
explicitly describe our behavior. Next we're accepting the clicked controller as
an argument to this function. We need this argument because without it the
`IndexController` doesn't know which item was clicked.

This warrants a change to the template.

```handlebars
<ul>
  {{#each itemController="name"}}
    <li {{action toggleSelect controller}} {{bindAttr class="isSelected"}}>
      {{firstName}} {{lastName}}
    </li>
  {{/each}}
</ul>
```

There's a lot going on in this new `action` call. The `toggleSelect` action gets
sent up the chain of controllers all the way up the router unless something
implements that method along the way. In this case, our `IndexController` will
catch this call. Also notice that we're passing in `controller` to `action`. This
is important because we want to set properties on the controller, not on the
model itself. If we used `this`, the controller would be unwrapped and we would
be working with the naked model.

So [now check it out](http://jsbin.com/ucanam/257). It works!

However we have committed a huge sin without even realizing it. Even though it looks
like we're changing the `isSelected` property on the controller we're actually
changing it on the model! Here is the fix.

```coffee
App.NameController = Ember.ObjectController.extend
  # Initialize the property on the controller
  isSelected: false

  select: ->
    @set('isSelected', true)

  unselect: ->
    @set('isSelected', false)
```

So remember that every property will be proxied to the model unless you define
it on the controller.

