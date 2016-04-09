var headmap = {
    map: null,
    lines: []
};

var CFG = {
    users: [
        {
            letter: "A",
            name: "ataa.P",
            head: "img/avatar01.png",
        },
        {
            letter: "H",
            name: "hack.PI",
            head: "img/avatar02.png"
        },
        {
            letter: "N",
            name: "nunn.L",
            head: "img/avatar_b_01.png"
            // isActive: true
        }
    ]
}

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
            style,
            } = this.props;

        return <div style={style} >{children}</div>
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
        headmap.map = new yuantu.Map({ container: 'amap' });
        headmap.map.active();
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
                    <div className="map" id="amap">
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
        this.props.modal().open("添加好友", this.renderUseList());
    },

    _handleSelect: function(e){
        var id = null;
        if(id = e.target.title){
            CFG.users[id].isActive = !CFG.users[id].isActive;
            this.forceUpdate();
            this.props.modal().close();
        }
    },

    renderItems: function(data){
        var items = [];

        data.forEach(function(o, i){
            // if(!o.isActive){
            var _class = o.isActive ? "curr" : "";

            items.push(
                <dl key={i}>
                    <dt>{o.letter}</dt>
                    <dd title={i} className={_class}>
                        <span  title={i} className="avatar"><img title={i} src={o.head} alt="" /></span>
                        <big  title={i}>{o.name}</big>
                    </dd>
                </dl>
            )
        });
        return items;
    },

    renderUseList: function(){
        var data = CFG.users;
        return (
            <div className="main-viewport">
                <div className="user-list" onClick={this._handleSelect}>
                    {this.renderItems(data)}
                </div>
            </div>
        )
    },

    render: function(){
        var data = CFG.users;

        var activeUsers = [];
        data.forEach(function(o, i){
            if(o.isActive){
                activeUsers.push(<p key={'avatar_'+i}><span className="avatar"><img src={o.head} alt={o.name} /></span></p>);
            }
        });

        return (
            <div className="user-box">
                <div className="users">
                    {activeUsers}
                    <p className="avatar addmore" onClick={this._handleAdd}></p>
                </div>
            </div>
        )
    }
});


var Vinfo = React.createClass({
    getInitialState: function() {
        return {
            title: "",
            startDate: null,
            endDate: null,
            price: 0,
            startCity: null,
            endCity: null
        };
    },
    render: function(){
        var data = this.state;
        var formatDate = function(d) {
            return d ? d.getMonth() + 1 + '.' + d.getDate() : '?';
        };
        return (
            <div className="v-info">
                <h2>5日4晚 泰国游</h2>
                <ul>
                    <li>
                        <small>起点</small>
                        <big>{data.startCity ? data.startCity : '?' }</big>
                    </li>
                    <li>
                        <small>终点</small>
                        <big>{data.endCity ? data.endCity : '?' }</big>
                    </li>
                    <li>
                        <small>时间</small>
                        <big>
                            {formatDate(data.startDate)} - {formatDate(data.end)}
                        </big>
                    </li>
                    <li>
                        <small>经费</small>
                        <big>￥{data.price}</big>
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

        var data = this.props.data;

        return (
            <div>
                <div className="time-act">
                    {this.renderTimeBar()}
                    <div className="flight-box">
                        <h3>{data.company + data.flight}</h3>
                        <div className="flight-from">
                            <big>上海</big>
                            <small>{data.departAirport}</small>
                            <strong>{data.departTime}</strong>
                        </div>
                        <div className="flight-to">
                            <big>成都</big>
                            <small>{data.arriveAirport}</small>
                            <strong>{data.arriveTime}</strong>
                        </div>
                        <abbr></abbr>
                    </div>
                </div>

                <Comments data={data.comments || []} />
            </div>
        )
    }
});

var TimeTool = React.createClass({

    getInitialState: function(){
        return {
            action: true
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
                this.props.modal().open("选择机票", <SearchPage onSelected={this._handleDone} />)
                break;
            case "hotel":
                this.props.modal().open("选择酒店", <SearchPage onSelected={this._handleDone} />)
                break;
            case "scenic":
                this._key = _key;
                break;
            default:
                //do nothin
        }

    },

    _handleDone: function(data){
        this.props.modal().close();
        this.props.onSelected(data);
    }
});

var TimeLine = React.createClass({

    getInitialState: function(){
        return {
            data: []        // 形成数据
        }
    },

    _handleAdd: function(o){
        var that = this, vinfo = this.props.vinfo();

        // 航班信息
        if (o.flight) {
            var mFrom = new yuantu.Marker({ address: o.departAirport });
            var mTo   = new yuantu.Marker({ address: o.arriveAirport });
            var line  = new yuantu.Line(mFrom, mTo);
            line.focus();
            headmap.lines.push(line);

            // 出发城市
            if (!vinfo.state.startCity) {
                mFrom.queryCity(function(name) {
                    vinfo.setState({ startCity: name });
                });
            }

            // 终点城市
            mTo.queryCity(function(name) {
                vinfo.setState({ endCity: name });
            });

            // 价格计算
            var price = vinfo.state.price;
            var ret = o.price.match(/\d+/);
            if (ret) {
                price += parseInt(ret[0]);
            }
            vinfo.setState({ price: price });

            // 时间计算
            // 没有日期数据。
        }

        this.state.data.push(o)
        this.forceUpdate(function(){
            document.body.scrollTop = 100000;
        });
    },

    render: function(){

        var data = this.state.data;

        return (
            <div className="timeline">
                <div className="time-tag geol"></div>

                {data.map(function(o, i){
                    return <TimeAct data={o} key={"act_"+i} />
                })}
                <TimeTool modal={this.props.modal} onSelected={this._handleAdd} />
            </div>
        )
    }
});

//<div className="time-tag takephoto"></div>

var Comments = React.createClass({

    render: function(){
        var data = this.props.data || []

        return (
            <div className="comments">
                {
                    data.map(function(o, i){
                        return (
                            <div className="comment-text">
                                <span className="avatar"><img src="img/avatar01.png" alt="" /></span>
                                body
                            </div>
                        )
                    })
                }
            </div>
        )

    }
});


var SearchPage = React.createClass({

    getInitialState: function(){
        return {
            data: {
            title: "搜索机票",
                search: [
                    {
                        class: "search-dapart",
                        label: "出发城市",
                        format: "",
                        value: "上海",
                    },
                    {
                        class: "search-dest",
                        label: "到达城市",
                        format: "",
                        value: "成都",
                    },
                    {
                        class: "search-date",
                        label: "出发日期",
                        format: "",
                        value: "yyyy-mm-dd",
                    }
                ],

                flights: flight_shanghai_chengdu
            }
        }
    },

    _handleSelect: function(e){
        var $t = $(e.target).parents("li");

        if($t.length){
            var idx = $t.attr('title');
            if(idx){
                this.props.onSelected(flight_shanghai_chengdu[idx])
            }
        }
    },

    render: function(){
        var data = this.state.data;

        return (
            <div>
                <div className="search-tool">
                    {data.search.map(function(o, i){
                        return <div key={"s"+i} className={"flight-cell "+o.class}><span>{o.label}</span><input placeholder={o.value}/></div>
                    })}
                    <div className="flight-cell search-btn"><span>&nbsp; </span><input className="g-btn" defaultValue="搜索" /></div>
                </div>

                <ul className="mf-list-ul" onClick={this._handleSelect}>
                    {data.flights.map(function(o, i){
                        return (
                            <li key={i} title={i} className="js-open-cabin mf-main-cabin mf-arrow-bottom">
                                <div className="mf-flight-info1">
                                    <div className="mf-date-wrap">
                                        <div className="mf-dtime">
                                            <span className="mf-list-time">{o.departTime}</span>
                                            <span className="mf-airPort">{o.departAirport}</span>
                                        </div>
                                        <div className="mf-middle">
                                             <i className="mf-flight-line-list"></i>
                                        </div>
                                        <div className="mf-atime">
                                            <span className="mf-list-time">{o.arriveTime}</span>
                                            <span className="mf-airPort">{o.arriveAirport}</span>
                                        </div>
                                    </div>
                                    <div className="mf-price-wrap">
                                        <div className="mf-overh clearfix">
                                            <div className="mf-flight-price">
                                                <span className="mf-flight-price-num">
                                                   {o.price}
                                                   </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
})


var Modal = React.createClass({

    getInitialState: function(){
        return {
            display: "",
            content: "",
            title: ""
        }
    },

    open: function(title, content){
        this.setState({
            display: "fadein",
            title: title,
            content: content
        })
    },

    close: function(){
        this.setState({
            display: "fadeout"
        })
    },

    render: function() {

        return (
            <div className={"fly-layer " + this.state.display} id="fly-layer">
                <div className="main-frame">
                    <div className="main-viewport">
                        <div style={{"height":"40px"}}>
                            <div className="cm-header">
                                <h1 className="cm-page-title js_title">{this.state.title}</h1>
                                <span className="cm-header-icon icon_share i_close" onClick={this.close}></span>
                            </div>
                        </div>

                        {this.state.content}
                    </div>
                </div>
            </div>
        );
    }
})

var App = React.createClass({

    modal: function(){
        return this.refs['modal'];
    },

    vinfo: function() {
        return this.refs['vinfo'];
    },

    render: function(){
        return (
            <Paper>
                <Modal ref="modal" />

                <FixMap />
                <div id="main">
                    <div className="main-frame">
                        <div className="main-viewport">
                            <UserBox modal={this.modal} />
                            <Vinfo ref="vinfo" />
                            <TimeLine modal={this.modal} vinfo={this.vinfo} />
                        </div>
                    </div>

                </div>
            </Paper>
        )
    }
});

ReactDOM.render(<App />, document.getElementById("app"));
