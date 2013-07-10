Sometimes being a geezer programmer ain't all bad. True, sometimes it's
incredibly annoying to those around us: "Back in my day we had a trash 80, a
cassette player, and some duct tape AND WE LIKED IT!". But other times, we get
to look back over decades of programming with some valuable perspective.

I've been doing web development in some form since about the time there was a
web, let's say mid to early nineties. I've recounted all the phases we went
through in other posts and I won't bore you with that now. What I'd like to
focus on today is a particular dichotomy (I hope that word means what I think
it means) in server side development: MVC vs component oriented frameworks. I
felt a very strong echo from this in my recent experience with Angular lately
and I wanted to try to capture my thoughts.

### Two Approaches to Server Side Development: MVC & Component 

First, I want to describe very briefly the examples of each type of server
side framework that I had the most experience with at the time: Struts and
Tapestry. Struts was the big gorilla at the time (sadly, it's likely still in
widespread use). Struts was classic server side MVC: it was all about mapping
URLs to java controller classes at it's heart. It was certainly possible to
build complicated web apps this way, but it was not a lot of fun. The best
description I ever heard was that it felt like "sewing with buttered boxing
gloves".

Tapestry, on the other hand, takes a completely different approach. Rather
than being chiefly concerned with mapping urls to actions, Tapestry is all
about modeling a web page as a nested structure of components (hence the term
component-oriented). Text fields, radio buttons, anything from a simple span
of dynamic text to as complex as a sorted and paginated table, are represented
as server side components. Components can contain and re-use other components.
It was really easy (and fun!) to make your own components. For server side
framework in the mid-2000s this was really radical. Building interactive web
applications rather than page-oriented web sites felt incredibly more
productive. The awkward dance of mapping URLs and parameters and http requests
was abstracted away (with great effort on Tapestry's part mind you) and you
were free to focus on the bits of your app that mattered. Incredibly powerful
high-level components evolved that made it that much easier.

##Goodbye to Templates

Tapestry also takes what at the time was a novel approach to templating:
instead of embedding java code in your web page a la jsp, you marked which
sections of the page should be handled by a tapestry component by adding
attributes to your html. This made the process of integrating design and
development really enjoyable. Instead of having to turn a designer's original
html into java method calls or taglibs, you could work directly with the
original markup. You simply added a few attributes here and there and let your
designer know what they were doing and why they were needed. If there were
tweaks, the designer could continue to make changes to the html without a
painful reconversion process. It was some of the most fun I've ever had doing
web development.

What got me reminiscing about all of this was some experiences working with
[Angular](http://angularjs.org/) recently. One of the things that intrigues me particularly about
Angular is it's similarity to Tapestry. Though you can build simple apps
without them, if you get very far into Angular you're going to end up using
directives. Directives remind me very strongly of Tapestry's components (and
map very well onto the upcoming web component standard). They let you add
application behavior via html elements and attributes. The Angular approach to
templates also harkens back to Tapestry: you use plain old html decorated with
elements and attributes that map to Angular directives. My strong hope is that
this will let us work with designers in the same way: the html/css we build
initially doesn't have to be translated into some other template language by
developers.

###Reduce, Reuse

The component approach of Angular also has also resulted in a similarly
ecosystem of reusable components. Though I've heard developers scoff at the
idea of a component library being valuable, as a wise friend once remarked:
"No code is faster than no code". Though he was talking about performance, it
applies to development as well: nothing takes less time to develop that something I
don't have to write at all. My experience so far working with Angular
directives has been very productive.

I'm still pretty new to Angular, so it may be I'm in that "honeymoon period"
where everything is new and bright and shiny. But so far the experience has
really been enjoyable. I'm looking forward to more.
