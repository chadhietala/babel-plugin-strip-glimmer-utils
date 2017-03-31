export default function (babel) {
  return {
    name: 'strip glimmer utils',
    visitor: {
      Program(path, state) {
        let unwrap = path.scope.getBinding('unwrap');
        if (unwrap.kind === 'module' && unwrap.path.parentPath.node.source.value === state.opts.source) {
          unwrap.referencePaths.forEach(path => {
            if (path.parentPath.isCallExpression()) {
              path.parentPath.replaceWith(path.parentPath.node.arguments[0]);
            }
          });
        }
      }
    }
  }
}
