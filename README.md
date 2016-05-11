# jQuery Unique Clone

Like `$(element).clone()` but will ensure that each ID in the cloned element is unique.


## Useage

With given HTML:
```html
<div class="container">
  <label for="foobar">Foo Bar</label>
  <input type="text" id="foobar">
</div>
```

This JavaScript:
```javascript
$('.container').uniqueClone();
```

Will return a jQuery collection representing:
```html
<div class="container">
  <label for="foobar-clone">Foo Bar</label>
  <input type="text" id="foobar-clone">
</div>
```


## Options

This plugin's API mimics the core `clone` method.

param | type | default value | description
------|------|---------------|------------
`withDataAndEvents` | Boolean | `false` | indicates whether event handlers should be copied along with the elements.
`deepWithDataAndEvents` | Boolean | `value of withDataAndEvents` | indicates whether event handlers and data for all children of the cloned element should be copied. By default it's value matches the first argument's value, which defaults to `false`.
`suffix` | String | `-clone` | the string to be appended to the end of the ID or FOR attribute value.

### Examples

```javascript
$(element).uniqueClone();
$(element).uniqueClone(true);
$(element).uniqueClone(true, false, '-in-dialog')
```


## Running Tests

```
git clone git@github.com:meowsus/jquery-unique-clone.git
cd jquery-unique-clone
npm install
gulp mocha
```
