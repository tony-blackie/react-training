var NoteManager = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
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
    },
    handleFolderAdd: function(folder) {
        this.setState({
            folder: folder
        });
    },
    render: function() {
        return (
            <div className="noteManager">
                <ControlBox handleFolderAdd={this.handleFolderAdd}/>
                <DirectoryBox url="/directories"  data={this.state.data} folder={this.state.folder}/>
            </div>
        );
    }
});

var ControlBox = React.createClass({
    getInitialState: function() {
        return {
            data: {}
        };
    },
    handleFolderAdd: function(data) {
        this.props.handleFolderAdd(data);
    },
    render: function() {
        return (
            <div className="controlBox">
                <AddDirectory onFolderAdd={this.handleFolderAdd}/>
                <AddNote/>
                <RemoveElement/>
            </div>
        );
    }
});


var AddDirectory = React.createClass({
    getInitialState: function() {
        return {
            data: {}
        };
    },
    handleClick: function() {
       var data = {addDirectory: true, name: "newDir"};
       this.props.onFolderAdd(data);
    },
    render: function() {
        return (
           <div className="addDirectory" onClick={this.handleClick}>
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
        console.log(this.props.folder); //TODO: Push folder name to server and generate id there
        console.log(this.props.data);   //TODO: And just get folders from server
        var allFolders = this.props.data;
        if (this.props.folder) {
            allFolders.push(this.props.folder);
            //this.state.folder = '';
        }
        var DirectoryNodes = allFolders.map(function(dir) {
            return (
            <Directory name={dir.name} key={dir.id}>

            </Directory>
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
            <div className="directory">
                <i className="fa fa-folder-open" aria-hidden="true"></i>
                {" " + this.props.name}
            </div>
        )
    }
});

ReactDOM.render(
    <NoteManager url="/directories" pollInterval={5000} />,
    document.getElementById('content')
);