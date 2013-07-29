# Don't fear SVGs!

SVGs are super cool. They're great for icons, charts and just about anything else. They're really small compared to a raster graphics, and they can change on the fly.

We recently did a an internal project that needed a set of line graphs. Kristin put together a really great design for the graphs.

<img src="graph.png"/>

My immediate thought was to use an charting library like [NVD3.js](http://nvd3.org/) or [Raphael.js](http://raphaeljs.com/). We settled on NVD3.js, but after a few days we started seeing some issues ***.

## It's just HTML!

SVG is just HTML with some additional elements and attributes. We work in HTML every day, and we're good at making it clean and concise. When using NVD3, I found myself doing things like `.attr("stroke-width", "2px")` and `.attr("fill", "#fff")`. Then it dawned on me... wait a sec, I'm writing HTML with in javascript! Haven't we learned that that's a really bad idea? On top of that, the HTML coming out had all these nasty in-line styles and useless wrapper elements. What am I doing?

So I started over and just wrote the svg the way I wanted it:

```html
<svg xmlns="http://www.w3.org/2000/svg" class="chart__content">
  <path class="chart__line" d="M20,50 L100,80 L200,40 L280,30"></path>
  <circle class="chart__circle" cx="20" cy="50" r="5"></circle>
  <circle class="chart__circle" cx="100" cy="80" r="5"></circle>
  <circle class="chart__circle" cx="200" cy="40" r="5"></circle>
  <circle class="chart__circle" cx="280" cy="30" r="5"></circle>
</svg>
```

Simple, and I can get it looking alright with just a couple css rules:

```css
chart__content{
  background: #b6e356;
}

.chart__line{
  fill: none;
  stroke: #fff;
  stroke-width: 2px;
}

.chart__circle{
  fill: #fff;
}
```

The key here is we're separating markup from presentation. No more defining colors in javascript. All out styles happen in css, and our markup is clear and clean.

Here's the [complete JSBin](http://jsbin.com/imocuf/22)

## But what about dynamic data?

You'll notice that we're duplicating our point coordinates to draw both the line and the circles, and we have that nasty path string in our html. Thats where a JS framework like Angular or Ember comes in. By binding a couple attributes, we can get a dynamic chart that's backed by real data. This example is in Angular, but it'll translates to anything.

We add bindings to our HTML:

```html
<svg xmlns="http://www.w3.org/2000/svg" ng-controller="GpaController" class="chart__content">
  <path class="chart__line" ng-attr-d="{{linePath()}}"></path>
  <circle ng-repeat="point in points"
          ng-attr-cx="{{point.x}}"
          ng-attr-cy="{{point.y}}"
          r="5"
          class="chart__circle">
  </circle>
</svg>
```

And add our controller:

```javascript
window.App = angular.module('App', []);

App.controller('GpaController', function($scope){
  var points = [
    {x: 20, y: 50},
    {x: 100, y: 80},
    {x: 200, y: 40},
    {x: 280, y: 30}
  ];

  $scope.points = points;

  $scope.linePath = function(){
    var pathParts = [], currentPoint, i;

    for (i = 0; i < points.length; i++) {
      currentPoint = points[i];
      pathParts.push(currentPoint.x + "," + currentPoint.y);
    }

    return "M" + pathParts.join(" L");
  };
});
```
Here's the [complete JSBin](http://jsbin.com/ujasub/10)

The cool part is that our chart updates whenever `points` change.
