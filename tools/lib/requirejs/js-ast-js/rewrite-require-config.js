
//---

var esprima = require('esprima'),
    escodegen = require('escodegen');

//---

function checkTargetNode(node) {
  var flag = false;

  if(
    node.type === 'Property' &&
    node.key.type === 'Identifier' &&
    (
      node.key.name === 'paths' ||
      node.key.name === 'deps'
    )
  ) {
    flag = true;
  }

  return flag;
}

function newNodeValue() {
  return {
    type: 'Literal',
    value: 'empty:'
  };
}

//---

function generateAST(codeStr) {

  return esprima.parse(codeStr);

}

function editAST(ast) {

  // get require config object : require( {} )
  var configAST = ast.body[0].expression.arguments[0];

  var oldProperties = configAST.properties,
      newProperties = [],
      paths;

  // get only what is needed
  oldProperties.forEach(function(node) {

    if(checkTargetNode(node)) {
      newProperties.push(node);
      if(node.key.name === 'paths') paths = node;
    }

  });

  // define new value
  paths.value.properties.forEach(function(node) {
    node.value = newNodeValue();
  });

  // update
  configAST.properties = newProperties;

  //---

  // code style options
  var escodegenOptions = {
    format: {
      indent: {
        style: '  '
      }
    }
  };

  // generate new source code
  return escodegen.generate(ast, escodegenOptions);

}

//---

module.exports = function(inputSrc) {

  return editAST(
    generateAST( inputSrc )
  );

};
