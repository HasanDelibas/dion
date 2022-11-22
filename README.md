# Installing

```html
<script src="https://cdn.jsdelivr.net/gh/HasanDelibas/directive@main/directive.js"></script>
```

# Using
``Directive.parse( string )``

## Directive.parse( string )
```js
Directive.parse( string )
```


# Basic Rules ( Directive Object Notation )
* Every data starts with `;` character.
* Use for access child item ``/`` character for path.
* Use ``=`` for assing inline value.

**Example**
```
; path/to/value=true
```
**Exports**
```json
{
  "path": {
    "to": {
      "value": true
    }
  }
}
```

## Single Line Data

**Example**
```
; string="Hello World!"
; number=15
; boolean=true
; text="Hello World!\nThis is a new line."
```
**Exports**
```json
{
  "string": "Hello World!",
  "number": 15,
  "boolean": true,
  "text": "Hello World!\nThis is a new line."
}
```

## Multi Line Data
```
; files/0/name="main.py"
; files/0/data
import math
print( "math library loaded" )
# calc sin(30)
print( math.sin( math.radians(30) ) )
```
**Exports**
```json
{
  "files": [
    {
      "name": "main.py",
      "data": "import math\nprint( \"math library loaded\" )\n# calc sin(30)\nprint( math.sin( math.radians(30) ) )"
    }
  ]
}
```

## Custom Characters In Path
**Example**
```
; path/to/"custom/path" = true
```
**Exports**
```json
{
  "path": {
    "to": {
      "custom/path": true
    }
  }
}
```
