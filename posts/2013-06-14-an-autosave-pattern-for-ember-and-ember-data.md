An AutoSave Pattern for Ember and Ember Data
==============================================

Requiring users to click a submit or save button in a web application is great
for developers but can be a burden on users in some situations. Sometimes it is
nice to automatically save the user's data as they fill out forms.

Automatically saving models in Ember can be a little tricky. A first pass might
look like this:

<script src="https://gist.github.com/mitchlloyd/5782436.js"></script>

This solution has some significant problems:

  * Everytime the user types a character an ajax request is sent to the server
    resulting in a flood of requests
  * As the user types, Ember throws errors saying that you can't modify
    attributes when a model is "inFlight"

Debouncing Our Save
-------------------

Let's tackle the "too many saves" problem first. Ideally we want to save the
user's data at some logical time. In many applications saving happens when a
form is submitted or when a field blurs. However handling all of the cases where
we want to save can get a little finicky. The built-in Ember controls work very
reliably for updating model attributes and when I started extending these views to
handle events where the user would want to save (e.g. focusOut, change) I ran
into some edge cases where the events would not fire. For instance, when using
the back button after editing a field I found that the change event would not
fire.

In any event we also want to handle the case where a user is editing a lot of
text in a textarea and wants to save their work as they go. We want to save when
the user types.

This is a good case for a debounce function. Each time a debounce function is
called it resets a timer and waits to call another function. So in this case as
the user types, the debounce function is called repeatedly but only fires the
save function when the user pauses. Here is a simple debounce function based on
[underscore's debounce](http://underscorejs.org/#debounce).

<script src="https://gist.github.com/mitchlloyd/5782662.js"></script>

One bonus feature here is that there is a way to clear out the pending function
call and execute immediately by passing `now: true` to our debounced function.

Let's use that function to implement some saner saving.

<script src="https://gist.github.com/mitchlloyd/5782698.js"></script>

So now when the user stops typing for 1 second, the save function will be called.


Give Our Attributes a Buffer
----------------------------

Even though we're saving less often, we'll still get errors from Ember if the
user stops typing for a second and then immediately starts typing again while
the record is saving.  To solve this problem we'll have users edit a buffer that
holds the attribute instead of editing it directly on the model. Since writing
this code, I've seen this pattern called a
[Buffered Proxy](https://gist.github.com/lukemelia/5632776).

<script src="https://gist.github.com/mitchlloyd/5784462.js"></script>

This mixin can be applied in a controller to provide a buffer between the Ember
fields and the model's attributes so that users can continue to type while
saving. Here is an example of this mixin in use.

<script src="https://gist.github.com/mitchlloyd/5784507.js"></script>


Good Enough?
------------

In practice this mixin has been working for me, but there is definitely some room
for improvement.  For one, it would be nice to let developers signal in the
templates rather than in the controller whether fields should be buffered or
instantly saved. This way there wouldn't be duplication of field names in the
controller and the template. One idea is to give fields special bindings like
`{{input value=bodyBuffered}}` to determine how they should be handled.

Also I still see the possibility of losing data if the model `isSaving` when the
model changes out from under the controller. However, in practice I haven't been
able to produce this behavior.

Have you implemented something to handle autosaving? Have ideas for
improvements? Please let me know!

