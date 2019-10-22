import './global.scss';

const scripts = {};

function importAllScripts(context) {
  context.keys().forEach(key => scripts[key] = context(key));
}

function importAllStyles(context) {
  context.keys().forEach(key => context(key));
}

importAllScripts(require.context('./components/', true, /^\.\/.*\.js$/));
importAllStyles(require.context('./components/', true, /^\.\/.*\.scss$/));

importAllScripts(require.context('./pages/', true, /^\.\/.*\.js$/));
importAllStyles(require.context('./pages/', true, /^\.\/.*\.scss$/));