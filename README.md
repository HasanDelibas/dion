# Directive Object Notation (.dion)
## Installing

```html
<script src="https://cdn.jsdelivr.net/gh/HasanDelibas/dion@v1.0.3/dion.js"></script>
```

## Usage
### Dion.parse()
```js
Dion.parse( string, DIRECTIVE="-", SEPERATOR="/" , ASSIGN="=")
```

### Dion.define
```js	
Dion.define(object,['path','to'],value)
```

### Dion.default()
```js
let object = {
  path:{
    to:{
      value: "Hello World"
    },
    any:{},
    other:{}
  }
}

Dion.default( object, "path/_/value", "Hello World" )
console.log( object )

{
  path:{
    to:{
      value: "Hello World"
    },
    any:{
      value: "Hello World"
    },
    other:{
      value: "Hello World"
    }
  }
}
```



## Basic Rules
* Every data starts with `-` character.
* Use for access child item ``/`` character for path.
* Use ``=`` for assing inline value.

**.dion**
```
- path/to/value=true
```
**.json**
```json
{
  "path": {
    "to": {
      "value": true
    }
  }
}
```

### Single Line Data

**.dion**
```
- string="Hello World!"
- number=15
- boolean=true
- text="Hello World!\nThis is a new line."
```
**.json**
```json
{
  "string": "Hello World!",
  "number": 15,
  "boolean": true,
  "text": "Hello World!\nThis is a new line."
}
```

### Multi Line Data
**.dion**
```
- files/0/name="main.py"
- files/0/data
import math
print( "math library loaded" )
# calc sin(30)
print( math.sin( math.radians(30) ) )
```
**.json**
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
**.dion**
```
- path/to/"custom/path" = true
```
**.json**
```json
{
  "path": {
    "to": {
      "custom/path": true
    }
  }
}
```

## Minus Character In Data

**.dion**
```
- path/to/value
&minus; This is a minus character
```
**.json**
```json
{
  "path": {
    "to": {
      "value": "- This is a minus character"
    }
  }
}
```


## Prefix
**.dion**
```
- path/to/value:
- name="Hasan"
- surname="Delibas"
# Rebase
- :
- foo="bar"
```


**.json**
```json
{
  "path": {
    "to": {
      "value": {
        "name": "Hasan",
        "surname": "Delibas"
      }
    }
  },
  "foo": "bar"
}
```
