var NoteManager = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },
    render: function() {
        return (
            <div className="noteManager">
                <ControlBox/>
                <DirectoryBox url="/directories"  data={this.state.data}/>
            </div>
        );
    },
    loadDataFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    data: data
                });
            }.bind(this),
            error: function(err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadDataFromServer();
        setInterval(this.loadDataFromServer, this.props.pollInterval);
    }
});

var ControlBox = React.createClass({
    render: function() {
        return (
            <div className="controlBox">
                <AddDirectory/>
                <AddNote/>
                <RemoveElement/>
            </div>
        );
    }
});


var AddDirectory = React.createClass({
   render: function() {
       return (
           <div className="addDirectory">
               <i className="fa fa-plus" aria-hidden="true"></i> {"Add folder"}
           </div>
       );
   }
});

var AddNote = React.createClass({
    render: function() {
        return (
            <div className="addNote">
                <i className="fa fa-pencil" aria-hidden="true"></i> {"Add note"}
            </div>
        );
    }
});

var RemoveElement = React.createClass({
    render: function() {
        return (
            <div className="removeElement">
                <i className="fa fa-times" aria-hidden="true"></i> {"Remove item"}
            </div>
        );
    }
});

var DirectoryBox = React.createClass({
    render: function() {
        var DirectoryNodes = this.props.data.map(function(dir) {
            return (
            <div name={dir.name} key={dir.id}>
                <i className="fa fa-folder-open" aria-hidden="true"></i>
                {dir.name}
            </div>
            );
        });
        return (
            <div className="directoryBox">
                 {DirectoryNodes} </div>
        )
    }
});

var Directory = React.createClass({
    render: function() {
        return (
            <div className="directory"></div>
        )
    }
});

ReactDOM.render(
    <NoteManager url="/directories" pollInterval={5000} />,
    document.getElementById('content')
);