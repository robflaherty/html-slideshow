/*
 * HTML Slideshow
 * Author: Rob Flaherty | rob@ravelrumba.com
 * Copyright (c) 2011 Rob Flaherty 
 * MIT Licensed: http://www.opensource.org/licenses/mit-license.php
 */
   
var htmlSlides = {
  
  //Vars
  currentSlide: 1,
  slideHash: location.hash,
  deck: $('#deck'),
  slideCount: $('#deck > section').size(),
  prevButton: $('#prev-btn'),
  nextButton: $('#next-btn'),
  slideNumber: $('#slide-number'),
  that: this,
      
  init: function(options) {    
    var defaultSettings = {
      hideMenu: false,
    },
  
    settings = $.extend({}, this.defaultSettings, options);
    
    //Add ids and classes to slides
    $('#deck > section').each(function(index, el) {
      $el = $(el);
      $el.attr('id', 'slide' + (index +1));
      $el.attr('class', 'slide');     
    });

    //Set total slide count in header
    $('#slide-total').html(this.slideCount);
      
    //Check for hash and validate value    
    if (this.slideHash && (parseInt((this.slideHash.substring(1)), 10) <= this.slideCount)) {
      this.currentSlide = this.slideHash.replace('#', '');
    }

    //Hide menubar if hideMenu === true
    if (settings.hideMenu === true) {
      setTimeout(function(){
        $('header').fadeTo(300, 0);
      }, 1500);

      $('header').hover(
        function() {
          $('header').fadeTo(300, 1);
        },
        function() {
          $('header').fadeTo(300, 0);
        }
      );
    }
      
    //Bind control events
    this.prevButton.bind('click', this.prevSlide);
    this.nextButton.bind('click', this.showActions);
    $('html').bind('keydown', this.keyControls);
      
    //Set initial slide
    this.changeSlide(this.currentSlide);
  
  },    
  
  //Change slide
  changeSlide: function(id) {
    var slideID = '#slide' + id;        
    
    //Update slide classes
    this.deck.find('.slide-selected').removeClass('slide-selected');
    $(slideID).addClass('slide-selected');
      
    //Update menu bar
    this.slideNumber.html(this.currentSlide);
    
    //Update hash      
    location.hash = id;
    
    //Trigger newSlide event
    $('html').trigger("newSlide", id);
    
    //Hide arrows on first and last slides
    if ((id != 1) && (id != this.slideCount)) {
      this.prevButton.css('visibility', 'visible');
      this.nextButton.css('visibility', 'visible');
    } else if (id == 1) {
      this.prevButton.css('visibility', 'hidden');
    } else if (id == this.slideCount) {
      this.nextButton.css('visibility', 'hidden');
    }
  },
  
  //Next slide
  prevSlide: function() {
    if (htmlSlides.currentSlide > 1) {
      htmlSlides.currentSlide--;
      htmlSlides.changeSlide(htmlSlides.currentSlide);
    }     
  },
  
  //Previous slide
  nextSlide: function() {
    if (this.currentSlide < this.slideCount) {
      this.currentSlide++;
      this.changeSlide(this.currentSlide); 
    }
  },
  
  //Reveal actions
  showActions: function() {        
    var actions = $('.slide-selected').find('.action'),
      actionOns;
      
    //If actions exist
    if (actions.length > 0) {
      actions.first().removeClass('action').addClass('action-on').fadeIn(250);
          
      //Number of current action
      actionOns = $('.slide-selected').find('.action-on');
          
      //Trigger newAction event
      $('html').trigger("newAction", actionOns.length );
    } else {
      htmlSlides.nextSlide();
    }
  },
  
  //Keyboard controls
  keyControls: function(event) {
    switch(event.keyCode) {
      //Left and up keys
      case 37:
      case 38:
        htmlSlides.prevSlide();
      break;
      //Right, down, and spacebar keys
      case 32:
      case 39:
      case 40:
        htmlSlides.showActions();
      break;
    }
  }

};