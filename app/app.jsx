var Paper = React.createClass({

    propTypes: {
        children: React.PropTypes.node,
        circle: React.PropTypes.bool,
        rounded: React.PropTypes.bool,
        //style: React.PropTypes.object,
        transitionEnabled: React.PropTypes.bool
    },

    getDefaultProps: function(){
        return {
            circle: false,
            rounded: true,
            transitionEnabled: false
        };
    },

    render: function(){
        const {
            children,
            circle,
            rounded,
            transitionEnabled,
            ...other,
            } = this.props;

        return <div {...other} >{children}</div>
    }
});


var FixMap = React.createClass({

    scrollCallback: debounce(function(e){
        if(document.body.scrollTop > 10){
            this.refs['user'].style.display = "none";
        }else{
            this.refs['user'].style.display = "block";
        }
    },30),

    componentDidMount: function(){
        Events.on(window, "scroll", this.scrollCallback);
    },

    componentWillUnmount: function(){
        Events.off(window, "scroll", this.scrollCallback);
    },

    render: function(){

        return (
            <div style={{"height" : "320px"}}>
                <div className="cm-header opacity" >
                    <span className="cm-header-icon fl">
                        <i className="icon-back"></i>
                    </span>
                    <span className="cm-header-icon icon_share i_bef"></span>
                </div>
                <div className="map-box">
                    <div className="map">
                    </div>
                    <div className="user_me" ref="user">
                        <span className="avatar"><img src="img/avatar_b_01.png" alt="" /></span>
                        <big>patata</big>
                    </div>
                </div>
            </div>
        )
    }
});

var UserBox = React.createClass({

    _handleAdd: function(){
        this.refs['modal'].open()
    },

    _handleSelect: function(){
        this.refs['modal'].close()
    },

    render: function(){
        var data = [
            {
                name: "",
                head: "img/avatar01.png"
            },
            {
                name: "",
                head: "img/avatar02.png"
            },
            {
                name: "",
                head: "img/avatar_b_01.png"
            }
        ];

        return (
            <div className="user-box">
                <div className="users">
                    {data.map(function(o, i){
                        return <p key={'avatar_'+i}><span className="avatar"><img src={o.head} alt={o.name} /></span></p>
                    })}
                    <p className="avatar addmore" onClick={this._handleAdd}></p>
                </div>
                <Modal ref="modal">
                    <div className="user-list" onClick={this._handleSelect}>
                        <dl>
                            <dt>A</dt>
                            <dd className="curr">
                                <span className="avatar"><img src="img/avatar02.png" alt="" /></span>
                                <big>boston.P</big>
                            </dd>
                            <dd>
                                <span className="avatar"><img src="img/avatar01.png" alt="" /></span>
                                <big>atata.P</big>
                            </dd>
                        </dl>
                        <dl>
                            <dt>w</dt>
                            <dd>
                                <span className="avatar"><img src="img/avatar02.png" alt="" /></span>
                                <big>boston.P</big>
                            </dd>
                            <dd>
                                <span className="avatar"><img src="img/avatar01.png" alt="" /></span>
                                <big>atata.P</big>
                            </dd>
                        </dl>
                    </div>
                </Modal>
            </div>
        )
    }
});


var Vinfo = React.createClass({

    render: function(){
        return (
            <div className="v-info">
                <h2>5日4晚 泰国游</h2>
                <ul>
                    <li>
                        <small>出发</small>
                        <big>上海</big>
                    </li>
                    <li>
                        <small>返回</small>
                        <big>新迈</big>
                    </li>
                    <li>
                        <small>时间</small>
                        <big>3.30 - 4.3</big>
                    </li>
                    <li>
                        <small>经费</small>
                        <big>~3300￥</big>
                    </li>
                </ul>
            </div>
        )
    }
});

var TimeAct = React.createClass({

    renderTimeBar: function(){
        return (
            <div className="time-bar">
                <span className="time-tag clock"></span>
                <span className="status">已预订</span>
                <p>下午20：16，3月31日</p>
            </div>
        )
    },

    render: function(){

        return (
            <div>
                <div className="time-act">
                    {this.renderTimeBar()}
                    <div className="flight-box">
                        <h3>东方航空MU5401</h3>
                        <div className="flight-from">
                            <big>上海</big>
                            <small>虹桥T2</small>
                            <strong>14:20</strong>
                        </div>
                        <div className="flight-to">
                            <big>北京</big>
                            <small>首都T1</small>
                            <strong>16:20</strong>
                        </div>
                        <abbr></abbr>
                    </div>
                </div>

                <div className="comments">
                    <div className="comment-text">
                        <span className="avatar"><img src="img/avatar01.png" alt="" /></span>
                        都说法国签证已经不再难，但是每天还是能看见几个莫名其妙的拒签
                    </div>
                    <div className="comment-text">
                        <span className="avatar"><img src="img/avatar01.png" alt="" /></span>
                        都说法国签证已经不再难，但是每天还是能看见几个莫名其妙的拒签,都说法国签证已经不再难，但是每天还是能看见几个莫名其妙的拒签
                    </div>
                </div>
            </div>
        )
    }
});

var TimeTool = React.createClass({

    getInitialState: function(){
        return {
            action: false
        }
    },

    renderItem: function(){
        if(this.state.action){
            return (
                <div className="action" onClick={this._handleAdd}>
                    <div className="time-tag flight" title="flight"></div>
                    <div className="time-tag hotel" title="hotel"></div>
                    <div className="time-tag scenic" title="scenic"></div>
                </div>
            )
        }else{
            return
        }
    },

    render: function(){
        return (
            <div className="time-tool">
                <div className="time-tag addact" onClick={this.handleAction}></div>
                {this.renderItem()}

                <Modal ref="flight">
                    <h2 onClick={this._handleDone}><br /><br /><br />Flight</h2>
                </Modal>
                <Modal ref="hotel">
                    <h2 onClick={this._handleDone}><br /><br /><br />hotel</h2>
                </Modal>
                <Modal ref="scenic">
                    <h2 onClick={this._handleDone}><br /><br /><br />scenic</h2>
                </Modal>
            </div>
        )
    },

    handleAction: function(e){
        this.setState({
            action: !this.state.action
        });
    },

    _handleAdd: function(e){
        var _key = e.target.title || "";

        switch(_key){
            case "flight":
            case "hotel":
            case "scenic":
                this._key = _key;
                this.refs[_key].open()
                break;
            default:
                //do nothin
        }

    },
    _handleDone: function(e){
        this.refs[this._key].close();
    }
});


var TimeLine = React.createClass({

    render: function(){

        var data = [1,2,3]

        return (
            <div className="timeline">
                <div className="time-tag geol"></div>

                {data.map(function(o, i){
                    return <TimeAct data={o} key={"act_"+i} />
                })}
                <TimeTool />
            </div>
        )
    }
});

//<div className="time-tag takephoto"></div>

var Comments = React.createClass({


    render: function(){
        return (
            <div>

            </div>
        )

    }
});


var Modal = React.createClass({

    getInitialState: function(){
        return {
            display: "none"
        }
    },

    open: function(){
        this.setState({
            display: "block"
        })
    },

    close: function(){
        this.setState({
            display: "none"
        })
    },

    render: function() {

        var styles ={
            "display": this.state.display,
            "position": "fixed",
            "top": 0,
            "left":0,
            "bottom": 0,
            "width": "100%",
            "background": "#fff",
            "zIndex": 1000
        };

        return (
            <div style={styles}>
                <div className="main-frame">
                    <div className="main-viewport">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
})

var App = React.createClass({


    render: function(){
        return (
            <Paper>
                <FixMap />
                <div id="main">
                    <div className="main-frame">
                        <div className="main-viewport">
                            <UserBox />
                            <Vinfo />
                            <TimeLine />
                        </div>
                    </div>

                </div>
            </Paper>
        )
    }
});

ReactDOM.render(<App />, document.getElementById("app"));