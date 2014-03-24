## Introduction

Chris Moore already [pointed out][gaslight-bem] that CSS is the last frontier
of web development and that we're mostly using [BEM] to structure our CSS at
Gaslight. Six months has passed and we're still using [BEM] so that probably
says something.

We've now used [BEM] on multiple projects and we recently had a discussion
about organizing our stylesheets. We have been relying on [The Silver Searcher]
in order to find CSS blocks due to our lack of convention. When compared to
other assets (models, controllers, etc.) in a project this really didn't make
sense.

## Folder Structure

- application.css
- bootstrap_overrides.css
- components
    - header.css
    - post.css
    - search.css
- elements.css
- fonts.css
- pdf.css
- pdf
    - header.css
    - post.css
- utilities.css
- variables.css

## application.css

In a Rails application this is your manifest file and it is typically included
in your application layout. No styles should exist in this file, it should just
be @import statements.

## bootstrap_overrides.css

We've been using [Bootstrap] recently and this is required if you want to customize.

## components

This folder is possibly the most important part. Any component (block) should
have its own file in this directory. This makes finding where styles are
defined very easy.

Component files are also responsible for media queries that may effect their
presentation.

## elements.css

Despite using BEM we still have styles that will apply to all elements and this
is the place for them.

```sass
h1
  font-size: 4em
  
hr
  padding: 2px 0
```

## fonts.css

Want to know what fonts are available in your project? This is where you look.

```sass
@font-face
  font-family: "Lato"
  src: asset-url('Lato-Regular.ttf', 'font') format('truetype')
  font-weight: normal
```

## helpers.css

These styles are not specific to your application domain and they have a very
limited ruleset.

Below are a few examples of good helper classes.

```sass
.text-left
  text-align: left !important
  
.flush
  margin: 0 !important
```

Below is an example of something that should not be a helper class.

```sass
.featured
  color: green
  font-weight: bold
  font-size: 200%
```

We tend to use a lot of the helper classes from
[inuit.css.](https://github.com/csswizardry/inuit.css/blob/master/generic/_helper.scss)

## variables.css

This is where any of your global variables should be defined. Want to define
specific colors to reference in other stylesheets, do it here.

```sass
$light-green: #1ECA6B
$dark-green: #1AAF5D

$font-base: 1.25rem
$line-height: 1.5rem
```

## Rails Specifics

application.css should only be a manifest and should not include any styles of
its own. You should only include manifest files in your views.

Often you will find that there are subsections of a site and those should have
their own manifest that can be included. The pdf folder above is an example of
this.

[gaslight-bem]: http://gaslight.co/blog/block-element-modifier "Block Element Modifier"
[the silver searcher]: https://github.com/ggreer/the_silver_searcher "The Silver Searcher"
[bem]: http://bem.info/ "bem.info"
