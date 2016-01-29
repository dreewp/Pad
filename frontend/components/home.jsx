var React = require('react');
var CurrentUserStore = require('../stores/current_user_store');
var SessionsApiUtil = require('../util/sessions_api_util');
var Navbar = require('./navbar');
var NotesIndex = require('./notes_index/index');


var Home = React.createClass({

  componentDidMount: function () {
    CurrentUserStore.addListener(this.forceUpdate.bind(this));
    SessionsApiUtil.fetchCurrentUser();
  },

  render: function () {
    if (!CurrentUserStore.userHasBeenFetched()) {
      return <p>Please Wait</p>;
    }
    return (
      <div className="home group">
        <Navbar />
        <NotesIndex />
      </div>
    );
  }
});

module.exports = Home;
