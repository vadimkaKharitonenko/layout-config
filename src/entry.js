import './global.css';

const scripts = {};

function importAllScripts(context) {
  context.keys().forEach(key => scripts[key] = context(key));
}

importAllScripts(require.context('./components/', true, /^\.\/.*\.js$/));
importAllScripts(require.context('./pages/', true, /^\.\/.*\.js$/));
importAllScripts(require.context('./helpers/', true, /^\.\/.*\.js$/));