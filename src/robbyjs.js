robbyjs = {
  /*
   Internal
  */

  elements: null,
  selected: null,

  getElements: function(selector, contextSelector) {
    contextElement = contextSelector
      ? (contextElement = document.querySelector(contextSelector))
      : null

    this.elements = contextElement
      ? contextElement.querySelectorAll(selector)
      : document.querySelectorAll(selector)

    this.selected = this.elements

    return this
  },

  fromElement: function(element) {
    this.elements = [element]
    this.selected = this.elements

    return this
  },

  getWindow: function() {
    this.elements = [window]
    this.selected = this.elements
    return this
  },

  getDocument: function() {
    this.elements = [document]
    this.selected = this.elements
    return this
  },

  createHtml: function(html) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = html

    return Array.prototype.slice.call(wrapper.children)
  },

  removeDuplicates: function() {
    var filtered = this.selected.filter(function(value, index, self) {
      return self.indexOf(value) === index
    })

    this.selected = filtered

    return this
  },

  /*
    Selecting elements
  */

  eq: function(i) {
    this.selected = [this.elements[i]]

    return this
  },

  first: function() {
    this.selected = [this.elements[0]]

    return this
  },

  last: function() {
    this.selected = [this.elements[this.elements.length - 1]]

    return this
  },

  all: function() {
    this.selected = this.elements

    return this
  },

  prev: function() {
    var allPrev = []

    this.selected.forEach(function(element) {
      var prev = element.previousElementSibling
      if (prev !== null) allPrev.push(prev)
    })

    this.selected = allPrev

    return this
  },

  next: function() {
    var allNext = []

    this.selected.forEach(function(element) {
      var next = element.nextElementSibling
      if (next !== null) allNext.push(next)
    })

    this.selected = allNext

    return this
  },

  siblings: function() {
    var siblings = []

    this.selected.forEach(function(element) {
      var elementArray = Array.prototype.slice.call(element.parentElement.children)
      elementArray.forEach(function(el) {
        siblings.push(el)
      })
    })

    this.selected = siblings
    this.removeDuplicates()

    return this
  },

  children: function() {
    var children = []

    this.selected.forEach(function(element) {
      var elementArray = Array.prototype.slice.call(element.children)
      elementArray.forEach(function(el) {
        children.push(el)
      })
    })

    this.selected = children

    return this
  },

  parent: function() {
    var allParents = []

    this.selected.forEach(function(element) {
      var parent = element.parentElement
      if (parent) allParents.push(parent)
    })

    this.selected = allParents

    this.removeDuplicates()

    return this
  },

  /*
    Class Manipulation
  */

  addClass: function(className) {
    this.selected.forEach(function(element) {
      element.classList.add(className)
    })

    return this
  },

  removeClass: function(className) {
    this.selected.forEach(function(element) {
      element.classList.remove(className)
    })

    return this
  },

  toggleClass: function(className) {
    this.selected.forEach(function(element) {
      element.classList.toggle(className)
    })

    return this
  },

  hasClass: function(className) {
    var result = true

    for (var i = 0; i < this.selected.length; i++) {
      var element = this.selected[i]

      if (!element.classList.contains(className)) {
        result = false
        break
      }
    }

    return result
  },

  /*
    Event listeners
  */

  on: function(event, call) {
    this.selected.forEach(function(element) {
      element.addEventListener(event, call)
    })

    return this
  },

  ready: function(callback) {
    document.addEventListener('DOMContentLoaded', function() {
      callback()
    })
  },

  /* 
    Loops
  */

  each: function(call) {
    this.selected.forEach(function(element, index) {
      call(element, index)
    })
  },

  /*
    Attribute Manipulation
  */

  setAttr: function(name, value) {
    this.selected.forEach(function(element) {
      element.setAttribute(name, value)
    })

    return this
  },

  getAttr: function(name) {
    var allAttributes = []

    this.selected.forEach(function(element) {
      allAttributes.push(element.getAttribute(name))
    })

    return allAttributes
  },

  removeAttr: function(name) {
    this.selected.forEach(function(element) {
      element.removeAttribute('fuck')
    })

    return this
  },

  /*
    Values
  */

  val: function(value) {
    if (value === undefined) {
      var values = []

      this.selected.forEach(function(input) {
        if (input.type.toLowerCase() == 'checkbox') {
          values.push(input.checked)
        } else if (input.type.toLowerCase() == 'radio') {
          var radios = document.querySelectorAll('input[name="' + input.getAttribute('name') + '"]')

          for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
              values.push(radios[i].value)
              break
            }
          }
        } else {
          values.push(input.value)
        }
      })

      return values.length > 1 ? values : values[0]
    }

    this.selected.forEach(function(input) {
      if (input.type.toLowerCase() == 'checkbox') {
        input.checked = value
      } else if (input.type.toLowerCase() == 'radio') {
        var radios = document.querySelectorAll('input[name="' + input.getAttribute('name') + '"]')

        for (var i = 0; i < radios.length; i++) {
          if (radios[i].value === value) {
            radios[i].checked = true
            break
          }
        }
      } else {
        input.value = value
      }
    })

    return this
  },

  /*
    Add/Remove Manipulation
  */

  remove: function() {
    this.each(function(element) {
      element.remove()
    })

    return this
  },

  append: function(html) {
    var self = this

    this.each(function(element) {
      var children = self.createHtml(html)

      children.forEach(function(child) {
        element.append(child)
      })
    })

    return this
  },

  prepend: function(html) {
    var self = this

    this.each(function(element) {
      var children = self.createHtml(html).reverse()

      children.forEach(function(child) {
        element.insertBefore(child, element.firstChild)
      })
    })

    return this
  },

  /*
    Offsets
  */

  offsetTop: function() {
    var allOffsets = []

    this.selected.forEach(function(element) {
      allOffsets.push(element.offsetTop)
    })

    return allOffsets.length > 1 ? allOffsets : allOffsets[0]
  },

  offsetLeft: function() {
    var allOffsets = []

    this.selected.forEach(function(element) {
      allOffsets.push(element.offsetLeft)
    })

    return allOffsets.length > 1 ? allOffsets : allOffsets[0]
  },

  offset: function() {
    var allOffsets = []

    this.selected.forEach(function(element) {
      allOffsets.push({
        top: element.offsetTop,
        left: element.offsetLeft,
      })
    })

    return allOffsets.length > 1 ? allOffsets : allOffsets[0]
  },

  /*
    Sizes
  */

  height: function() {
    if (this.selected[0] === window) return this.selected[0].innerHeight

    var allHeights = []

    this.selected.forEach(function(element) {
      allHeights.push(element.offsetHeight)
    })

    return allHeights.length > 1 ? allHeights : allHeights[0]
  },

  width: function() {
    if (this.selected[0] === window) return this.selected[0].innerWidth

    var allWidths = []

    this.selected.forEach(function(element) {
      allWidths.push(element.offsetWidth)
    })

    return allWidths.length > 1 ? allWidths : allWidths[0]
  },

  size: function() {
    if (this.selected[0] === window) {
      return {
        width: this.width(),
        height: this.height(),
      }
    }

    var allSizes = []

    this.selected.forEach(function(element) {
      allSizes.push({
        width: element.offsetWidth,
        height: element.offsetHeight,
      })
    })

    return allSizes.length > 1 ? allSizes : allSizes[0]
  },
}

/*
  Selector Shorthand
*/

$ = function(selector, contextSelector) {
  if (selector === window) return robbyjs.getWindow()
  if (selector === document) return robbyjs.getDocument()
  if (selector instanceof HTMLElement) return robbyjs.fromElement(selector)

  return robbyjs.getElements(selector, contextSelector)
}
