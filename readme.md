# HTML Slideshow
## Lightweight HTML5-based slideshow
This is a small app for creating slideshow presentations with HTML and CSS. It doesn't do fancy transitions and all that, but it lets you write stuff in HTML/CSS and it gets you from one slide to the next. You can also reveal content with intraslide animations (like Keynote's Builds, but without the animation effects). And, if you're a Javascripter and need to trigger scrolling T-Rexes or other dinosaur animations, you can bind to events that fire with each new slide.

## Using it
The example slideshow contains instructions. Basically, you build your slides as HTML5 `section` elements like this:

```
<section>
  <hgroup>
    <h1>Hello, interwebs explorer.</h1>
    <h2>How to use this thing</h2>
  </hgroup>
  <p>Press the right arrow, down arrow, or spacebar to advance; press the left arrow or up arrow to move backward.</p>
  <p>You can also click the left and right arrows in the control bar at the top.</p>
</section>
```

To run Javascript for particular slides you can bind to the newSlide events like this: 

```
$('html').bind('newSlide', function(e, id) { 
  switch(id) {
    case 2:
      console.log('This is the second slide.');;
      break;
    case 3:
      console.log('Hello, third slide.');
      break;
  }
});
```
## Demo
[View the demo](http://www.ravelrumba.com/code/demos/html-slideshow/slideshow.html)

## Blog post
[Read the blog post](http://www.ravelrumba.com/blog/html5-slideshow/)

## Variations
* [MVC 3 HTML5 Slideshow Presentation Site Template](https://github.com/jgable/MVC-3-HTML5-Slideshow-Presentation-Template) (by [Jacob Gable](http://jacob4u2.posterous.com/))

## Changelog
05/07/2011 - Added swipe support for touch devices

05/01/2011 - Reorganized file structure