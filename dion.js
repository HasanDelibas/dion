(function () {

  window.Dion = {}

  function Define(obj, path, value,SEPERATOR="/") {
    // -- Calcluate the Index --//
    let index = [-1];
    let i = 0;
    let wait = false;
    let list = [];
    for(let i = 0; i < path.length; i++){
      if(path[i] == SEPERATOR && wait==false){
        list.push(path.substring(index[index.length-1]+1,i));
        index.push(i);
      }
      if(path[i] == "\""){
        wait = !wait;
      }
    }
    list.push(path.substring(index[index.length-1]+1,path.length));
    list = list.map(e => e.trim()).filter(e=>e!="");
    list = list.map(e => isNaN(e) == false ? parseInt(e) : e);
    //-- Define Object --//
    let temp = obj;
    for (let i = 0; i < list.length - 1; i++) {
      let key = list[i];
      let nextKey = list[i + 1];
      if (temp[key] == undefined) {
        if (nextKey == parseInt(nextKey)) {
          temp[key] = [];
        } else {
          temp[key] = {};
        }
      }
      if (i != list.length - 1) {
        temp = temp[key];
      }
    }
    let lastKey = list[list.length - 1];
    if (lastKey == parseInt(lastKey)) {
      // CHECK IF ARRAY
      temp.push(value);
    } else {
      temp[lastKey] = value;
    }
  }

  Dion.parse = function (text, DIRECTIVE="-", SEPERATOR="/" , ASSIGN="="){
    text = text.split("\r").join("");
    // ; /path/to/file.js
    let lines = text.split("\n");
    let result = {};

    let currentPath = "";
    let currentText = "";
    for (let line = 0; line < lines.length; line++) {
      let row = lines[line];
      if (row.startsWith(DIRECTIVE)) {
        // Close previous path
        if(currentPath!=""){
          Define(result, currentPath, currentText.substring(0,currentText.length-1));
          currentPath = "";
          currentText = "";
        }

        if(row.trim() == (new Array(row.trim().length)).fill(DIRECTIVE).join("")){
          continue;
        }

        let directive = row.split(DIRECTIVE);
        directive.splice(0, 1);
        directive = directive.join(DIRECTIVE).trim();
        
        // single line define
        if (directive.indexOf(ASSIGN) > -1) {
          let path = directive.split(ASSIGN)[0];
          let value = directive.split(ASSIGN)[1].trim();
          value = JSON.parse(value);
          Define(result, path, value, SEPERATOR);
        }else{
          currentPath = directive;
        }
      }else{
        if(currentPath!=""){
          currentText+=row+"\n";
        }
      }
    }
    return result;
  }
})();
