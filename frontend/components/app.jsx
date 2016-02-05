var React = require('react');
var SessionsApiUtil = require('../util/sessions_api_util');
var CurrentUserStore = require('../stores/current_user_store');
var NotesApiUtil = require('../util/notes_api_util');
var NoteStore = require('../stores/note_store');
var Navbar = require('./navbar/navbar');
var NotesIndex = require('./notes/index');
var Slideout = require('./slideout/slideout');
var Search = require('./search');

var App = React.createClass({
  getInitialState: function () {
    return { slideoutOpen: false, slideoutIndex: "", indexInfo: { header: "notes", title: "notes" } };
  },

  componentWillMount: function () {
    SessionsApiUtil.fetchCurrentUser();
  },

  componentDidMount: function () {
    $('.search').hide();
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.location.query.index === "notes") {
      this.setState({slideoutOpen: false, indexInfo: {header: "notes", title: "notes"}});
      return;
    }
    switch (newProps.location.query.header) {
      case "notebooks":
        var params = newProps.location.query;
        this.setState({slideoutOpen: false, indexInfo: {header: params.header, title: params.title, id: params.id} });
        break;
      case "notes":
        var params = newProps.location.query;
        this.setState({slideoutOpen: false, indexInfo: {header: "notes", title: "notes"}});
      default:
        break;
    }
  },

  slideoutClickHandler: function (clickedIndex) {
    this.setState({slideoutIndex: clickedIndex});
    if (this.state.slideoutOpen) {
      this.closeSlideout();
    } else {
      this.openSlideout();
    }
  },

  closeSlideout: function () {
    this.setState({slideoutOpen: false});
    $('.note-form-outer').fadeTo("slow", 1);
    console.log("entered");
  },

  openSlideout: function () {
    this.setState({slideoutOpen: true});
    $('.note-form-outer').fadeTo("slow", 0.2);
    $('.note-form-outer').on('click', function () {
      this.closeSlideout();
    }.bind(this));
  },

  render: function () {
    if (!CurrentUserStore.userHasBeenFetched()) {
      return <p>Please Wait</p>;
    }

    return (
      <div className="home group">
        <Navbar slideoutClickHandler={this.slideoutClickHandler}/>
        <div className="home-right group">
          <NotesIndex indexInfo={this.state.indexInfo}/>
          <Slideout index={this.state.slideoutIndex}
                    isOpen={this.state.slideoutOpen} />
          {this.props.children}
          <Search />
        </div>

      </div>
    );
  }
});

module.exports = App;
