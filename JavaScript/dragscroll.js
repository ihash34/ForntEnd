(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this, function (exports) {
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var EventListener = 'EventListener';
    var addEventListener = 'add'+EventListener;
    var removeEventListener = 'remove'+EventListener;
    var newScrollX, newScrollY;

    var dragged = [];
    var reset = function(i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el = el.container || el;
            el[removeEventListener](mousedown, el.md, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
        }

        // cloning into array since HTMLCollection is updated dynamically
        dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
        for (i = 0; i < dragged.length;) {
            (function(el, lastClientX, lastClientY, pushed, scroller, cont){
                (cont = el.container || el)[addEventListener](
                    mousedown,
                    cont.md = function(e) {
                        if (!el.hasAttribute('nochilddrag') ||
                            _document.elementFromPoint(
                                e.pageX, //e.pageY
                            ) == cont
                        ) {
                            pushed = 1;
                            lastClientX = e.clientX;
                           // lastClientY = e.clientY;

                            e.preventDefault();
                        }
                    }, 0
                );

                _window[addEventListener](
                    mouseup, cont.mu = function() {pushed = 0;}, 0
                );

                _window[addEventListener](
                    mousemove,
                    cont.mm = function(e) {
                        if (pushed) {
                            (scroller = el.scroller||el).scrollLeft -=
                                newScrollX = (- lastClientX + (lastClientX=e.clientX));
                           // scroller.scrollTop -= newScrollY = (- lastClientY + (lastClientY=e.clientY));
                            if (el == _document.body) {
                                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                               // scroller.scrollTop -= newScrollY;
                            }
                        }
                    }, 0
                );
             })(dragged[i++]);
        }
    }

      
    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, 0);
    }

    exports.reset = reset;
}));



    $('#right-button').click(function() {
      var leftPos =movbutton.scrollLeft();
      movbutton.animate({
        scrollLeft: leftPos - 200
      }, 800, function() {
        debugger;
        if ($('.movbutton').scrollLeft() <= 0) {
          setInvisible($('.right-button'));
        }
      });
    });

    $('#left-button').click(function() {
      setVisible($('.right-button'));
      var leftPos = movbutton.scrollLeft();
      movbutton.animate({
        scrollLeft: leftPos + 200
      }, 800);
    });

    $(window).resize(function() {
      updateUI();
    });
 
//-------------------------------------------------------------------------------------------------------

$(function() {
    var print = function(msg) {
      alert(msg);
    };

    var setInvisible = function(elem) {
      elem.css('visibility', 'hidden');
    };
    var setVisible = function(elem) {
      elem.css('visibility', 'visible');
    };

    var elem = $(".buttonMove");
    var items = elem.children();

    // Inserting Buttons
    elem.prepend('<div id="right-button" style="visibility: hidden;">	<svg class="pn-Advancer_Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 551 1024"><path d="M445.44 38.183L-2.53 512l447.97 473.817 85.857-81.173-409.6-433.23v81.172l409.6-433.23L445.44 38.18z"/></svg></div>');
    elem.append('  <div id="left-button" style="visibility: hidden;"><svg class="pn-Advancer_Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 551 1024"><path d="M105.56 985.817L553.53 512 105.56 38.183l-85.857 81.173 409.6 433.23v-81.172l-409.6 433.23 85.856 81.174z"/></svg></div>');

    // Inserting Inner
    items.wrapAll('<div id="inner" class="dragscroll" />');

    // Inserting Outer
    debugger;
    elem.find('#inner').wrap('<div id="outer" class="dragscroll" />');

    var outer = $('#outer');

    var updateUI = function() {
      var maxWidth = outer.outerWidth(true);
      var actualWidth = 0;
      $.each($('#inner'), function(i, item) {
        actualWidth += $(item).outerWidth(true);
      });

      if (actualWidth <= maxWidth) {
        setVisible($('#left-button'));
      }
    };
    updateUI();



    $('#right-button').click(function() {
      var leftPos = outer.scrollLeft();
      outer.animate({
        scrollLeft: leftPos - 100
      }, 800, function() {
        debugger;
        if ($('#outer').scrollLeft() <= 0) {
          setInvisible($('#right-button'));
        }
      });
    });

    $('#left-button').click(function() {
      setVisible($('#right-button'));
      var leftPos = outer.scrollLeft();
      outer.animate({
        scrollLeft: leftPos + 100
      }, 800);
    });

    $(window).resize(function() {
      updateUI();
    });
  });


//------------- T A B S --------------------------------------

function setupTabs(){
  document.querySelectorAll(".tabs__button").forEach(button=>{
  button.addEventListener ("click",()=>{
  
    const sideBar=button.parentElement;
    const tabsContainer=sideBar.parentElement;
     const tabNumber=button.dataset.forTab;
    const tabToActivate=tabsContainer.querySelector('.tabs__content[data-tab='+'"'+tabNumber+'"'+"]");

          sideBar.querySelectorAll(".tabs__button").forEach(button=>{
         button.classList.remove("tabs__button--active"); 
        });
  
          tabsContainer.querySelectorAll(".tabs__content").forEach(tab=>{
         tab.classList.remove("tabs__content--active");
        });
  


        button.classList.add("tabs__button--active");
        tabToActivate.classList.add("tabs__content--active");
        
  });
 });
  }
  
  document.addEventListener("DOMContentLoaded",()=>{
  setupTabs();
  
  document.querySelectorAll(".tabs").forEach(tabsContainer=>{
    tabsContainer.querySelector(".tabs__sideBar .tabs__button").click();
     });
  
});
//----------------------------------------------------------------------------

//-----------  C O L O R ----- P I C K E R --------------------------------------




//----------------------------------------------------------------------------