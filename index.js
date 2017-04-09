function stripGlimmerUtils(babel) {
  return {
    name: 'strip glimmer utils',
    visitor: {
      Program(path, state) {
        let source = state.opts.source;
        state.opts.bindings.forEach((binding) => {
          let b = path.scope.getBinding(binding);
          if (b && b.kind === 'module' && b.path.parentPath.node.source.value === source) {
            b.referencePaths.forEach(path => {
              if (path.parentPath.isCallExpression()) {
                path.parentPath.replaceWith(path.parentPath.node.arguments[0]);
              }
            });

            b.path.remove();
          }
        });

        let body = path.get('body');

        for (let i = 0; i < body.length; i++) {
          let decl = body[i];
          let specifiers = decl.node.specifiers;
          if (decl.node.source && decl.node.source.value === source) {
            if (specifiers.length === 0) {
              decl.remove();
            }
          }
        }
      }
    }
  }
}

stripGlimmerUtils.baseDir = function() {
  return __dirname;
}

module.exports = stripGlimmerUtils;