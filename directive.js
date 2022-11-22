(function () {

  window.Directive = {}

  function Define(obj, path, value) {
    // -- Calcluate the Index --//
    let index = [-1];
    let i = 0;
    let wait = false;
    let list = [];
    for(let i = 0; i < path.length; i++){
      if(path[i] == "/" && wait==false){
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

  Directive.parse = function (text) {
    text = text.split("\r").join("");
    // ; /path/to/file.js
    let lines = text.split("\n");
    let result = {};

    let currentPath = "";
    let currentText = "";
    for (let line = 0; line < lines.length; line++) {
      let row = lines[line];
      if (row.startsWith(";")) {
        // Close previous path
        if(currentPath!=""){
          Define(result, currentPath, currentText);
          currentPath = "";
          currentText = "";
        }

        let directive = row.split(";")[1].trim();
        // single line define
        if (directive.indexOf("=") > -1) {
          let path = directive.split("=")[0];
          let value = directive.split("=")[1].trim();
          value = JSON.parse(value);
          Define(result, path, value);
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
