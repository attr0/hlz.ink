/* search */
(function () {
  function onEvent() {
    var filter = search.value.toUpperCase();
    var list = document.getElementById("list");
    var listItems = list.getElementsByTagName("li");
    for (i = 0; i < listItems.length; i++) {
      var item = listItems[i];
      var text = item.innerText.toUpperCase();
      if (text.indexOf(filter) > -1) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    }
  }

  var search = document.getElementById("search");
  if (search) {
    search.addEventListener("keyup", onEvent);
  }
})();



/* Expandable sections */
(function () {
  function toggle (button, target) {
    var expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
    target.hidden = !target.hidden;
  }

  var expanders = document.querySelectorAll('[data-expands]');

  Array.prototype.forEach.call(expanders, function (expander) {
    var target = document.getElementById(expander.getAttribute('data-expands'));

    expander.addEventListener('click', function () {
      toggle(expander, target);
    })
  })
}());

/* Menu button */
(function () {
  
  var button = document.getElementById('menu-button');
  if (button) {
    button.addEventListener('click', function() {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
    })
  }

}());

/* Persist navigation scroll point */
(function () {
  window.onbeforeunload = function () {
    var patternsNav = document.getElementById('patterns-nav');
    if (patternsNav) {
      var scrollPoint = patternsNav.scrollTop;
      localStorage.setItem('scrollPoint', scrollPoint);
    }
  }

  window.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('patterns-nav')) {
      if (window.location.href.indexOf('patterns/') !== -1) {
        document.getElementById('patterns-nav').scrollTop = parseInt(localStorage.getItem('scrollPoint'));
      } else {
        document.getElementById('patterns-nav').scrollTop = 0;
      }
    }
  })
}());


  /* Add "link here" links to <h2> headings */
  (function () {
    var headings = document.querySelectorAll('main > h2');

    Array.prototype.forEach.call(headings, function (heading) {
      var id = heading.getAttribute('id');

      if (id) {
        var newHeading = heading.cloneNode(true);
        newHeading.setAttribute('tabindex', '-1');

        var container = document.createElement('div');
        container.setAttribute('class', 'h2-container');
        container.appendChild(newHeading);

        heading.parentNode.insertBefore(container, heading);

        var link = document.createElement('a');
        link.setAttribute('href', '#' + id);
        link.innerHTML = '<svg aria-hidden="true" class="link-icon" viewBox="0 0 50 50" focusable="false"> <use xlink:href="#link"></use> </svg>';

        container.appendChild(link);

        heading.parentNode.removeChild(heading);
      }
    })
  }());


/* Enable scrolling by keyboard of code samples */
(function () {
  var codeBlocks = document.querySelectorAll('pre, .code-annotated');

  Array.prototype.forEach.call(codeBlocks, function (block) {
    if (block.querySelector('code')) {
      block.setAttribute('role', 'region');
      block.setAttribute('aria-label', 'code sample');
      if (block.scrollWidth > block.clientWidth) {
        block.setAttribute('tabindex', '0');
      }
    }
  });
}());

/* Switch and persist theme */
(function () {
  var checkbox = document.getElementById('themer');

  // 每次修改后有效期为12h
  function persistTheme(val) {
    //localStorage.setItem('darkTheme', val);
	document.cookie = "darkTheme=" + val + ";Max-Age=43200;Path=/;SameSite=Strict";
  }
  
  function getCurrentTheme() {
	  //console.log(document.cookie);
	  if(document.cookie.indexOf("darkTheme") == -1) {
		  return null;
	  } 
	  if(document.cookie.indexOf("true") != -1) {
		  return 'true';
	  }
	  if(document.cookie.indexOf("false") != -1) {
		  return 'false';
	  }
	  return null;
  }

  function applyDarkTheme() {
    var rules = [
      '.intro-and-nav, .main-and-footer { filter: invert(100%); }',
      '* { background-color: inherit; }',
      'img:not([src*=".svg"]), .colors, iframe, .demo-container { filter: invert(100%); }'
    ];
    rules.forEach(function(rule) {
      document.styleSheets[0].insertRule(rule);
    })
	var logoBackground = document.getElementById('myLogo');
	logoBackground.style = "background-color: rgba(0,0,0)";
  }

  function clearDarkTheme() {
    for (let i = 0; i < document.styleSheets[0].cssRules.length; i++) {
      document.styleSheets[0].deleteRule(i);
    }
	var logoBackground = document.getElementById('myLogo');
	logoBackground.style = "background-color: rgba(255,255,255)";
  }

  checkbox.addEventListener('change', function () {
    if (this.checked) {
      applyDarkTheme();
      persistTheme('true');
    } else {
      clearDarkTheme();
      persistTheme('false');
    }
  });

  function showTheme() {
    if (getCurrentTheme() === 'true') {
      applyDarkTheme();
      checkbox.checked = true;
    }
  }

  function showContent() {
    document.body.style.visibility = 'visible';
    document.body.style.opacity = 1;
  }
  
  /* automatic switch to dark mode */
  function automatic_dark() {
	// 如果设置过
	if(getCurrentTheme() != null) {
		return;
	}
	var now = new Date();
	var now_hour = now.getHours();
	if(now_hour <= 6 || now_hour >= 22) {
		persistTheme('true');
		checkbox.checked = true;
	}else {
		persistTheme('false');
		checkbox.checked = false;
	}
  }

  window.addEventListener('DOMContentLoaded', function () {
	automatic_dark();
    showTheme();
    showContent();
  });

}());
