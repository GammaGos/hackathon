"use strict";

var CFG = {
    users: [{
        letter: "A",
        name: "ataa.P",
        head: "img/avatar01.png"
    }, {
        letter: "H",
        name: "hack.PI",
        head: "img/avatar02.png"
    }, {
        letter: "N",
        name: "nunn.L",
        head: "img/avatar_b_01.png"
        // isActive: true
    }]
};

var Paper = React.createClass({
    displayName: "Paper",


    propTypes: {
        children: React.PropTypes.node,
        circle: React.PropTypes.bool,
        rounded: React.PropTypes.bool,
        //style: React.PropTypes.object,
        transitionEnabled: React.PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
        return {
            circle: false,
            rounded: true,
            transitionEnabled: false
        };
    },

    render: function render() {
        var _props = this.props;
        var children = _props.children;
        var circle = _props.circle;
        var rounded = _props.rounded;
        var transitionEnabled = _props.transitionEnabled;
        var style = _props.style;


        return React.createElement(
            "div",
            { style: style },
            children
        );
    }
});

var FixMap = React.createClass({
    displayName: "FixMap",


    scrollCallback: debounce(function (e) {
        if (document.body.scrollTop > 10) {
            this.refs['user'].style.display = "none";
        } else {
            this.refs['user'].style.display = "block";
        }
    }, 30),

    componentDidMount: function componentDidMount() {
        Events.on(window, "scroll", this.scrollCallback);
        var map = new yuantu.Map({ container: 'amap' });
    },

    componentWillUnmount: function componentWillUnmount() {
        Events.off(window, "scroll", this.scrollCallback);
    },

    render: function render() {

        return React.createElement(
            "div",
            { style: { "height": "320px" } },
            React.createElement(
                "div",
                { className: "cm-header opacity" },
                React.createElement(
                    "span",
                    { className: "cm-header-icon fl" },
                    React.createElement("i", { className: "icon-back" })
                ),
                React.createElement("span", { className: "cm-header-icon icon_share i_bef" })
            ),
            React.createElement(
                "div",
                { className: "map-box" },
                React.createElement("div", { className: "map", id: "amap" }),
                React.createElement(
                    "div",
                    { className: "user_me", ref: "user" },
                    React.createElement(
                        "span",
                        { className: "avatar" },
                        React.createElement("img", { src: "img/avatar_b_01.png", alt: "" })
                    ),
                    React.createElement(
                        "big",
                        null,
                        "patata"
                    )
                )
            )
        );
    }
});

var UserBox = React.createClass({
    displayName: "UserBox",


    _handleAdd: function _handleAdd() {
        this.props.modal().open("添加好友", this.renderUseList());
    },

    _handleSelect: function _handleSelect(e) {
        var id = null;
        if (id = e.target.title) {
            CFG.users[id].isActive = !CFG.users[id].isActive;
            this.forceUpdate();
            this.props.modal().close();
        }
    },

    renderItems: function renderItems(data) {
        var items = [];

        data.forEach(function (o, i) {
            // if(!o.isActive){
            var _class = o.isActive ? "curr" : "";

            items.push(React.createElement(
                "dl",
                { key: i },
                React.createElement(
                    "dt",
                    null,
                    o.letter
                ),
                React.createElement(
                    "dd",
                    { title: i, className: _class },
                    React.createElement(
                        "span",
                        { title: i, className: "avatar" },
                        React.createElement("img", { title: i, src: o.head, alt: "" })
                    ),
                    React.createElement(
                        "big",
                        { title: i },
                        o.name
                    )
                )
            ));
        });
        return items;
    },

    renderUseList: function renderUseList() {
        var data = CFG.users;
        return React.createElement(
            "div",
            { className: "main-viewport" },
            React.createElement(
                "div",
                { className: "user-list", onClick: this._handleSelect },
                this.renderItems(data)
            )
        );
    },

    render: function render() {
        var data = CFG.users;

        var activeUsers = [];
        data.forEach(function (o, i) {
            if (o.isActive) {
                activeUsers.push(React.createElement(
                    "p",
                    { key: 'avatar_' + i },
                    React.createElement(
                        "span",
                        { className: "avatar" },
                        React.createElement("img", { src: o.head, alt: o.name })
                    )
                ));
            }
        });

        return React.createElement(
            "div",
            { className: "user-box" },
            React.createElement(
                "div",
                { className: "users" },
                activeUsers,
                React.createElement("p", { className: "avatar addmore", onClick: this._handleAdd })
            )
        );
    }
});

var Vinfo = React.createClass({
    displayName: "Vinfo",


    render: function render() {
        var data = {
            title: "",
            start: "3.30",
            end: "4.3",
            price: "~3300￥"
        };

        return React.createElement(
            "div",
            { className: "v-info" },
            React.createElement(
                "h2",
                null,
                "5日4晚 泰国游"
            ),
            React.createElement(
                "ul",
                null,
                React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "small",
                        null,
                        "出发"
                    ),
                    React.createElement(
                        "big",
                        null,
                        "上海"
                    )
                ),
                React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "small",
                        null,
                        "返回"
                    ),
                    React.createElement(
                        "big",
                        null,
                        "新迈"
                    )
                ),
                React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "small",
                        null,
                        "时间"
                    ),
                    React.createElement(
                        "big",
                        null,
                        data.start,
                        " - ",
                        data.end
                    )
                ),
                React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "small",
                        null,
                        "经费"
                    ),
                    React.createElement(
                        "big",
                        null,
                        data.price
                    )
                )
            )
        );
    }
});

var TimeAct = React.createClass({
    displayName: "TimeAct",


    renderTimeBar: function renderTimeBar() {
        return React.createElement(
            "div",
            { className: "time-bar" },
            React.createElement("span", { className: "time-tag clock" }),
            React.createElement(
                "span",
                { className: "status" },
                "已预订"
            ),
            React.createElement(
                "p",
                null,
                "下午20：16，3月31日"
            )
        );
    },

    render: function render() {

        var data = this.props.data;

        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "time-act" },
                this.renderTimeBar(),
                React.createElement(
                    "div",
                    { className: "flight-box" },
                    React.createElement(
                        "h3",
                        null,
                        data.company + data.flight
                    ),
                    React.createElement(
                        "div",
                        { className: "flight-from" },
                        React.createElement(
                            "big",
                            null,
                            "上海"
                        ),
                        React.createElement(
                            "small",
                            null,
                            data.departAirport
                        ),
                        React.createElement(
                            "strong",
                            null,
                            data.departTime
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "flight-to" },
                        React.createElement(
                            "big",
                            null,
                            "成都"
                        ),
                        React.createElement(
                            "small",
                            null,
                            data.arriveAirport
                        ),
                        React.createElement(
                            "strong",
                            null,
                            data.arriveTime
                        )
                    ),
                    React.createElement("abbr", null)
                )
            ),
            React.createElement(Comments, { data: data.comments || [] })
        );
    }
});

var TimeTool = React.createClass({
    displayName: "TimeTool",


    getInitialState: function getInitialState() {
        return {
            action: true
        };
    },

    renderItem: function renderItem() {
        if (this.state.action) {
            return React.createElement(
                "div",
                { className: "action", onClick: this._handleAdd },
                React.createElement("div", { className: "time-tag flight", title: "flight" }),
                React.createElement("div", { className: "time-tag hotel", title: "hotel" }),
                React.createElement("div", { className: "time-tag scenic", title: "scenic" })
            );
        } else {
            return;
        }
    },

    render: function render() {
        return React.createElement(
            "div",
            { className: "time-tool" },
            React.createElement("div", { className: "time-tag addact", onClick: this.handleAction }),
            this.renderItem()
        );
    },

    handleAction: function handleAction(e) {
        this.setState({
            action: !this.state.action
        });
    },

    _handleAdd: function _handleAdd(e) {
        var _key = e.target.title || "";

        switch (_key) {
            case "flight":
                this.props.modal().open("选择机票", React.createElement(SearchPage, { onSelected: this._handleDone }));
                break;
            case "hotel":
            case "scenic":
                this._key = _key;
                break;
            default:
            //do nothin
        }
    },

    _handleDone: function _handleDone(data) {
        this.props.modal().close();
        this.props.onSelected(data);
    }
});

var TimeLine = React.createClass({
    displayName: "TimeLine",


    getInitialState: function getInitialState() {
        return {
            data: [] // 形成数据
        };
    },

    _handleAdd: function _handleAdd(o) {
        this.state.data.push(o);
        this.forceUpdate(function () {
            document.body.scrollTop = 100000;
        });
    },

    render: function render() {

        var data = this.state.data;

        return React.createElement(
            "div",
            { className: "timeline" },
            React.createElement("div", { className: "time-tag geol" }),
            data.map(function (o, i) {
                return React.createElement(TimeAct, { data: o, key: "act_" + i });
            }),
            React.createElement(TimeTool, { modal: this.props.modal, onSelected: this._handleAdd })
        );
    }
});

//<div className="time-tag takephoto"></div>

var Comments = React.createClass({
    displayName: "Comments",


    render: function render() {
        var data = this.props.data || [];

        return React.createElement(
            "div",
            { className: "comments" },
            data.map(function (o, i) {
                return React.createElement(
                    "div",
                    { className: "comment-text" },
                    React.createElement(
                        "span",
                        { className: "avatar" },
                        React.createElement("img", { src: "img/avatar01.png", alt: "" })
                    ),
                    "body"
                );
            })
        );
    }
});

var SearchPage = React.createClass({
    displayName: "SearchPage",


    getInitialState: function getInitialState() {
        return {
            data: {
                title: "搜索机票",
                search: [{
                    class: "search-dapart",
                    label: "出发城市",
                    format: "",
                    value: "上海"
                }, {
                    class: "search-dest",
                    label: "到达城市",
                    format: "",
                    value: "成都"
                }, {
                    class: "search-date",
                    label: "出发日期",
                    format: "",
                    value: "yyyy-mm-dd"
                }],

                flights: flight_shanghai_chengdu
            }
        };
    },

    _handleSelect: function _handleSelect(e) {
        var $t = $(e.target).parents("li");

        if ($t.length) {
            var idx = $t.attr('title');
            if (idx) {
                this.props.onSelected(flight_shanghai_chengdu[idx]);
            }
        }
    },

    render: function render() {
        var data = this.state.data;

        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "search-tool" },
                data.search.map(function (o, i) {
                    return React.createElement(
                        "div",
                        { key: "s" + i, className: "flight-cell " + o.class },
                        React.createElement(
                            "span",
                            null,
                            o.label
                        ),
                        React.createElement("input", { placeholder: o.value })
                    );
                }),
                React.createElement(
                    "div",
                    { className: "flight-cell search-btn" },
                    React.createElement(
                        "span",
                        null,
                        "  "
                    ),
                    React.createElement("input", { className: "g-btn", defaultValue: "搜索" })
                )
            ),
            React.createElement(
                "ul",
                { className: "mf-list-ul", onClick: this._handleSelect },
                data.flights.map(function (o, i) {
                    return React.createElement(
                        "li",
                        { key: i, title: i, className: "js-open-cabin mf-main-cabin mf-arrow-bottom" },
                        React.createElement(
                            "div",
                            { className: "mf-flight-info1" },
                            React.createElement(
                                "div",
                                { className: "mf-date-wrap" },
                                React.createElement(
                                    "div",
                                    { className: "mf-dtime" },
                                    React.createElement(
                                        "span",
                                        { className: "mf-list-time" },
                                        o.departTime
                                    ),
                                    React.createElement(
                                        "span",
                                        { className: "mf-airPort" },
                                        o.departAirport
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "mf-middle" },
                                    React.createElement("i", { className: "mf-flight-line-list" })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "mf-atime" },
                                    React.createElement(
                                        "span",
                                        { className: "mf-list-time" },
                                        o.arriveTime
                                    ),
                                    React.createElement(
                                        "span",
                                        { className: "mf-airPort" },
                                        o.arriveAirport
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "mf-price-wrap" },
                                React.createElement(
                                    "div",
                                    { className: "mf-overh clearfix" },
                                    React.createElement(
                                        "div",
                                        { className: "mf-flight-price" },
                                        React.createElement(
                                            "span",
                                            { className: "mf-flight-price-num" },
                                            o.price
                                        )
                                    )
                                )
                            )
                        )
                    );
                })
            )
        );
    }
});

var Modal = React.createClass({
    displayName: "Modal",


    getInitialState: function getInitialState() {
        return {
            display: "",
            content: "",
            title: ""
        };
    },

    open: function open(title, content) {
        this.setState({
            display: "fadein",
            title: title,
            content: content
        });
    },

    close: function close() {
        this.setState({
            display: "fadeout"
        });
    },

    render: function render() {

        return React.createElement(
            "div",
            { className: "fly-layer " + this.state.display, id: "fly-layer" },
            React.createElement(
                "div",
                { className: "main-frame" },
                React.createElement(
                    "div",
                    { className: "main-viewport" },
                    React.createElement(
                        "div",
                        { style: { "height": "40px" } },
                        React.createElement(
                            "div",
                            { className: "cm-header" },
                            React.createElement(
                                "h1",
                                { className: "cm-page-title js_title" },
                                this.state.title
                            ),
                            React.createElement("span", { className: "cm-header-icon icon_share i_close", onClick: this.close })
                        )
                    ),
                    this.state.content
                )
            )
        );
    }
});

var App = React.createClass({
    displayName: "App",


    modal: function modal() {
        return this.refs['modal'];
    },

    render: function render() {
        return React.createElement(
            Paper,
            null,
            React.createElement(Modal, { ref: "modal" }),
            React.createElement(FixMap, null),
            React.createElement(
                "div",
                { id: "main" },
                React.createElement(
                    "div",
                    { className: "main-frame" },
                    React.createElement(
                        "div",
                        { className: "main-viewport" },
                        React.createElement(UserBox, { modal: this.modal }),
                        React.createElement(Vinfo, null),
                        React.createElement(TimeLine, { modal: this.modal })
                    )
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
