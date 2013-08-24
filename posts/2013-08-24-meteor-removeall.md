How to Remove All Elements from a Meteor Collection

Meteor collections have a `remove()` method. For example, on a `Post` collection, you can call

```javascript
Post.remove("3WRHexCGhZdSa3H9L") // remove a post with that mongo '_id' 
Post.remove({title:"How to Blog"})` // remove a post with that title
Post.remove({})` // remove every post
```

The catch is that you're not allowed to call `Post.remove({})` from the console. You'll see

```javascript
Error: Not permitted. Untrusted code may only remove documents by ID. [403]
```

You're also not allowed to call `remove({})` from any client side code. If you're app accumulates a bunch of crufty data while you're prototyping, you might be sad about this. Client side code and the console fall under the concept "Untrusted Code" introduced by Meteor in 0.5.8.

> Starting in 0.5.8, client-only code such as event handlers may only update or remove a single document at a time, specified by _id." [More…]("http://www.meteor.com/blog/2013/03/13/meteor-058-security-fix-appcache-db-transforms-new-deps")

"Trusted Code" includes the server code and method code. The key to the solution is that you can call methods defined on the Meteor server from the client using the `Meteor.call` method. Therefore, this will work in the console

```javascript
Meteor.call('removeAllPosts')
```

Assuming you define `removeAllPosts` on the server like so

```javascript
if (Meteor.isServer) {
  Meteor.startup(function() {
    return Meteor.methods({
      removeAllPosts: function() {
        return Posts.remove({});
      }
    });
  });
}
```
