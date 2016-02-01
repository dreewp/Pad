var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var NotebookStore = new Store(AppDispatcher);
var NotebookConstants = require('../constants/notebook_constants');
var _notebooks = {};

NotebookStore.all = function () {
  var notebooks = [];
  for (var id in _notebooks) {
    notebooks.push(_notebooks[id]);
  }
  return notebooks;
};

NotebookStore.find = function (id) {
  return _notebooks[id];
};

function resetNotebooks(notebooks) {
  _notebooks = notebooks;
};

function resetNotebook(notebook) {
  _notebooks[notebook.id] = notebook;
};

function deleteNotebook(notebook) {
  delete _notebooks[notebook.id];
};

NotebookStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case NotebookConstants.NOTEBOOKS_RECEIVED:
      resetNotebooks(payload.notebooks);
      this.__emitChange();
      break;

    case NotebookConstants.NOTEBOOK_RECEIVED:
      resetNotebook(payload.notebook);
      this.__emitChange();
      break;

    case NotebookConstants.DELETE_NOTEBOOK:
      deleteNotebook(payload.notebook);
      this.__emitChange();
      break;
  }
}

module.exports = NotebookStore;
