webpackJsonp([119], {
    152: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(98)
          , r = i(a)
          , o = n(35)
          , s = i(o)
          , u = n(36)
          , c = i(u)
          , l = (n(432),
        n(97));
        t.default = {
            GET_LIST_DATA: function() {
                function e(e, n) {
                    return t.apply(this, arguments)
                }
                var t = (0,
                c.default)(s.default.mark(function e(t, n) {
                    var i, a, r, o, u, c, d = t.commit, p = t.dispatch, f = t.state, h = n.isChannel, m = n.channelId, v = n.childId, g = n.deviceId, I = n.isServer;
                    return s.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                if (f.channelList.length) {
                                    e.next = 3;
                                    break
                                }
                                return e.next = 3,
                                p("GET_CHANNEL_LIST");
                            case 3:
                                if ("recomend" == m && (m = 0),
                                i = f.allChannels.find(function(e) {
                                    return e.alias == m || e.channelId == m
                                }) || {},
                                a = {},
                                r = void 0,
                                void 0 == i.channelId) {
                                    e.next = 11;
                                    break
                                }
                                a = i,
                                e.next = 25;
                                break;
                            case 11:
                                if (o = void 0,
                                e.prev = 12,
                                !h) {
                                    e.next = 20;
                                    break
                                }
                                return e.next = 16,
                                (0,
                                l.getChannelByAlias)({
                                    alias: m
                                });
                            case 16:
                                return u = e.sent,
                                o = u.data,
                                e.next = 20,
                                d("ADD_CHANNEL", {
                                    channel: u.data
                                });
                            case 20:
                                e.next = 24;
                                break;
                            case 22:
                                e.prev = 22,
                                e.t0 = e.catch(12);
                            case 24:
                                a = o || f.channelList.length && f.channelList[0] || {};
                            case 25:
                                return r = a.kind,
                                a.childList && a.childList.length ? (c = a.childList.find(function(e) {
                                    return e.alias == v || e.channelId == v
                                }),
                                v = c && c.channelId || a.childList[0].channelId,
                                r = c && c.kind || a.childList[0].kind) : v = void 0,
                                e.next = 29,
                                p("CHANGE_CHANNEL", {
                                    channelId: a.channelId,
                                    childId: v,
                                    deviceId: g,
                                    channelType: r,
                                    isServer: I
                                });
                            case 29:
                            case "end":
                                return e.stop()
                            }
                    }, e, this, [[12, 22]])
                }));
                return e
            }(),
            CHANGE_CHANNEL: function() {
                function e(e, n) {
                    return t.apply(this, arguments)
                }
                var t = (0,
                c.default)(s.default.mark(function e(t, n) {
                    var i = t.commit
                      , a = t.dispatch
                      , r = (t.state,
                    n.channelId)
                      , o = n.childId
                      , u = n.deviceId
                      , c = n.channelType;
                    n.isServer;
                    return s.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                i("SET_ACTIVE_CHANNEL", {
                                    channelId: r,
                                    childId: o
                                });
                            case 2:
                                a("GET_NEWS_LIST", {
                                    channelId: o || r,
                                    deviceId: u,
                                    channelType: c,
                                    action: "popDown"
                                });
                            case 3:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return e
            }(),
            GET_CHANNEL_LIST: function() {
                function e(e) {
                    return t.apply(this, arguments)
                }
                var t = (0,
                c.default)(s.default.mark(function e(t) {
                    var n, i = t.commit;
                    return s.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                (0,
                                l.getChannelList)();
                            case 2:
                                return n = e.sent,
                                e.next = 5,
                                i("SET_CHANNEL_LIST", {
                                    data: n.data.list
                                });
                            case 5:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return e
            }(),
            GET_NEWS_LIST: function() {
                function e(e, n) {
                    return t.apply(this, arguments)
                }
                var t = (0,
                c.default)(s.default.mark(function e(t, n) {
                    var i = t.commit
                      , a = t.state
                      , r = n.channelId
                      , o = n.channelType
                      , u = void 0 === o ? 3 : o
                      , c = n.deviceId
                      , d = n.action
                      , p = n.pageNum
                      , f = void 0 === p ? 1 : p;
                    return s.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return i("SET_REQUESTING", {
                                    channelId: r,
                                    status: !0
                                }),
                                e.abrupt("return", (0,
                                l.getUniteChannelNews)({
                                    channelId: r,
                                    deviceId: c,
                                    localOldestNewsTime: "popDown" !== d && a.newsList[r] && a.newsList[r].localOldestNewsTime || 0,
                                    refreshType: "popDown" === d ? 0 : 1,
                                    channelType: u,
                                    pageNum: f
                                }).then(function(e) {
                                    i("SET_NEWS_LIST", {
                                        channelId: r,
                                        data: e.data.items,
                                        action: d
                                    }),
                                    i("SAVE_NEWS_LIST", {
                                        channelId: r
                                    })
                                }).catch(function() {
                                    i("SET_REQUESTING", {
                                        channelId: r,
                                        status: !1
                                    })
                                }));
                            case 2:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return e
            }(),
            GET_TV_MENU_OR_PROGRAM: function() {
                function e(e, n) {
                    return t.apply(this, arguments)
                }
                var t = (0,
                c.default)(s.default.mark(function e(t, n) {
                    var i, a = (t.commit,
                    n.tvProgramPk), r = n.channelPk;
                    return s.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                (0,
                                l.getTvMenuOrProgramReview)({
                                    tvProgramPk: a,
                                    channelPk: r
                                });
                            case 2:
                                return i = e.sent,
                                e.abrupt("return", i.data);
                            case 4:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return e
            }(),
            INIT_SHARE: function() {
                function e(e) {
                    return t.apply(this, arguments)
                }
                var t = (0,
                c.default)(s.default.mark(function e(t) {
                    var n, i, a, o, u, c, d, p, f, h, m, v = t.state;
                    return s.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return n = v.activeChannel,
                                i = v.allChannels,
                                a = void 0 === i ? [] : i,
                                o = a.filter(function(e) {
                                    return e.channelId == n
                                }),
                                u = (0,
                                r.default)(o, 1),
                                c = u[0],
                                d = void 0 === c ? {} : c,
                                p = d.shareInfo,
                                f = void 0 === p ? {} : p,
                                h = d.channelName,
                                m = {
                                    title: f.title || h + "频道",
                                    shareText: f.description || "湾区资讯服务第一端",
                                    shareImg: f.logo || l.defaultShareImg,
                                    titleWithOutTouchtv: !!f.title,
                                    wxOpenLaunchWeapp: !0
                                },
                                e.abrupt("return", (0,
                                l.wxSharePost)(m));
                            case 5:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return e
            }()
        }
    },
    158: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(28)
          , r = i(a)
          , o = n(241)
          , s = i(o)
          , u = n(98)
          , c = i(u)
          , l = n(34)
          , d = i(l)
          , p = n(459)
          , f = i(p)
          , h = function() {
            return {
                version: 0,
                isRequesting: !1,
                localOldestNewsTime: 0,
                noMore: !1,
                list: [],
                pageNum: 0
            }
        }
          , m = function(e) {
            var t = (0,
            d.default)({}, e);
            t.id = t.channelId,
            t.name = t.channelName;
            var n = {}
              , i = {};
            try {
                t.theme && (n = JSON.parse(t.theme) || {})
            } catch (e) {}
            try {
                t.shareInfo && (i = JSON.parse(t.shareInfo) || {})
            } catch (e) {}
            return t.theme = {
                frontColor: "#" + (n.frontColor || "333333"),
                backgroundColorBegin: "#" + (n.backgroundColorBegin || "ffffff"),
                backgroundColorEnd: "#" + (n.backgroundColorEnd || "ffffff"),
                wholeColor: n.wholeColor
            },
            t.shareInfo = i || {},
            t
        };
        t.default = {
            SET_ACTIVE_CHANNEL: function(e, t) {
                var n = t.channelId
                  , i = t.childId;
                e.activeChannel = n,
                e.activeChannelChild = i
            },
            ADD_CHANNEL: function(e, t) {
                var n = t.channel
                  , i = m(n);
                e.allChannels.push(i),
                e.newsList[i.channelId] = (0,
                d.default)({}, h(), e.newsList[i.channelId] || {})
            },
            SET_REQUESTING: function(e, t) {
                var n = t.channelId
                  , i = t.status;
                e.newsList[n] && (e.newsList[n].isRequesting = i,
                e.newsList[n].noMore = !1)
            },
            SET_CHANNEL_LIST: function(e, t) {
                var n = t.data
                  , i = []
                  , a = (n || []).reduce(function(t, n) {
                    var a = (0,
                    d.default)({}, n);
                    if (n.childList && n.childList.length > 0)
                        if (1 == n.kind) {
                            var r = (0,
                            c.default)(n.childList, 1);
                            a = r[0]
                        } else
                            a.childList = n.childList.map(function(t) {
                                return t = m(t),
                                e.newsList[t.channelId] = (0,
                                d.default)({}, h(), e.newsList[t.channelId] || {}),
                                i.push((0,
                                d.default)({}, t)),
                                t
                            });
                    return -3 !== a.channelId && "本地" !== a.channelName && "快点" !== a.channelName && (a = m(a),
                    t.push(a),
                    i.push((0,
                    d.default)({}, a)),
                    e.newsList[a.channelId] = (0,
                    d.default)({}, h(), e.newsList[a.channelId] || {})),
                    t
                }, []);
                e.allChannels = i,
                e.channelList = a
            },
            SET_NEWS_LIST: function(e, t) {
                var n = t.channelId
                  , i = t.data
                  , a = t.action
                  , r = [].concat((0,
                s.default)(i));
                r = r.map(function(e) {
                    var t = e.data && JSON.parse(e.data);
                    return (0,
                    d.default)({}, e, t instanceof Array ? {
                        dataList: t
                    } : t || {})
                });
                var o = e.newsList[n];
                if (o || (o = (0,
                d.default)({}, h()),
                e.newsList[n] = o),
                !r[0])
                    return o.noMore = !0,
                    o.isRequesting = !1,
                    void (e.newsList = (0,
                    d.default)({}, e.newsList));
                var u = "popDown" === a ? [].concat((0,
                s.default)(r)) : [].concat((0,
                s.default)(o.list || []), (0,
                s.default)(r));
                if (o.list = u,
                void 0 !== o.localOldestNewsTime) {
                    var c = o.list.length || 1
                      , l = o.list[c - 1] ? o.list[c - 1].updateTime : 0;
                    o.localOldestNewsTime = l
                }
                o.version += 1,
                o.pageNum += 1,
                o.isRequesting = !1,
                o.noMore = !1,
                e.newsList = (0,
                d.default)({}, e.newsList)
            },
            SET_HOTNEWS_SNAPSHOT: function(e, t) {
                var n = t.snapShotNumber
                  , i = t.operationHash
                  , a = t.newsAlertsHash
                  , r = t.focusPictureHash;
                e.hotNewsSnapShot = n || 0,
                e.operationHash = i || "",
                e.newsAlertsHash = a || "",
                e.focusPictureHash = r || ""
            },
            READ_NEWS_LIST: function(e, t) {
                var n = t.channelId;
                if (f.default.get("channelNews_" + n))
                    try {
                        var i = f.default.get("channelNews_" + n);
                        e.newsList[n].list = JSON.parse(i)
                    } catch (e) {}
            },
            SAVE_NEWS_LIST: function(e, t) {
                var n = t.channelId;
                try {
                    e.newsList[n] && e.newsList[n].list && e.newsList[n].list.length && f.default.set("channelNews_" + n, (0,
                    r.default)(e.newsList[n].list.slice(0, 20)))
                } catch (e) {}
            }
        }
    },
    159: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = {
            metaKeyWords: function(e) {
                var t = "";
                return e.channelList.map(function(e) {
                    t += e.channelName + "，"
                }),
                t.slice(0, t.length - 1)
            },
            getChannelNewsList: function(e) {
                var t = e.activeChannel && e.activeChannelChild || e.activeChannel;
                return t && e.newsList[t] && e.newsList[t].list || []
            },
            allChannels: function(e) {
                return e.allChannels
            }
        }
    },
    160: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(24)
          , r = i(a)
          , o = n(34)
          , s = i(o)
          , u = n(86)
          , c = i(u)
          , l = n(35)
          , d = i(l)
          , p = n(36)
          , f = i(p)
          , h = n(460)
          , m = i(h)
          , v = n(97);
        t.default = {
            GET_APP_GLOBAL_CONFIG: function() {
                function e(e) {
                    return t.apply(this, arguments)
                }
                var t = (0,
                f.default)(d.default.mark(function e(t) {
                    var n, i = t.commit, a = t.state;
                    return d.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                if (!a.appGlobalConfig) {
                                    e.next = 2;
                                    break
                                }
                                return e.abrupt("return");
                            case 2:
                                return e.next = 4,
                                (0,
                                v.getAppGlobalConfig)();
                            case 4:
                                n = e.sent,
                                i("SET_APP_GLOBAL_CONFIG", n.data);
                            case 6:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return e
            }(),
            GET_ACTIVITY_INFO: function() {
                function e(e) {
                    return t.apply(this, arguments)
                }
                var t = (0,
                f.default)(d.default.mark(function e(t) {
                    var n;
                    t.commit,
                    t.state;
                    return d.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                (0,
                                v.getActivityInfo)();
                            case 2:
                                if (n = e.sent,
                                !(n.data && n.data.activityInfoList && n.data.activityInfoList.length)) {
                                    e.next = 5;
                                    break
                                }
                                return e.abrupt("return", n.data.activityInfoList[0]);
                            case 5:
                                return e.abrupt("return", null);
                            case 6:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return e
            }(),
            GET_HOTTEST_NEWS: function() {
                function e(e, n) {
                    return t.apply(this, arguments)
                }
                var t = (0,
                f.default)(d.default.mark(function e(t, n) {
                    var i, a = t.commit;
                    t.state;
                    return d.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                (0,
                                v.getHottestNews)(n);
                            case 2:
                                return i = e.sent,
                                e.next = 5,
                                a("SET_HOTTEST_NEWS", i.data);
                            case 5:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return e
            }(),
            POST_BIGDATA_LOG: function() {
                function e(e, n) {
                    return t.apply(this, arguments)
                }
                var t = (0,
                f.default)(d.default.mark(function e(t, n) {
                    var i;
                    t.commit,
                    t.state;
                    return d.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                (0,
                                v.postBigDataLog)(n);
                            case 2:
                                i = e.sent;
                            case 3:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return e
            }(),
            SCROLL_EVENT: function() {},
            GET_CAPTCHA: function() {
                function e(e, n) {
                    return t.apply(this, arguments)
                }
                var t = (0,
                f.default)(d.default.mark(function e(t, n) {
                    var i, a = (t.commit,
                    t.state,
                    n.captchaType), r = n.clientUid, o = n.ts;
                    return d.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                (0,
                                v.getCaptcha)({
                                    captchaType: a,
                                    clientUid: r,
                                    ts: o
                                });
                            case 2:
                                return i = e.sent,
                                e.abrupt("return", i);
                            case 4:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return e
            }(),
            INIT_SHARE: function() {
                function e(e) {
                    return t.apply(this, arguments)
                }
                var t = (0,
                f.default)(d.default.mark(function e(t) {
                    var n, i = (t.state,
                    arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}), a = (i.home,
                    i.title), r = i.desc, o = i.coverUrl, s = i.link;
                    return d.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return n = {
                                    title: a || "触电新闻",
                                    shareText: r || "触电新闻",
                                    shareImg: v.defaultShareImg || o,
                                    link: s
                                },
                                e.abrupt("return", (0,
                                v.wxSharePost)(n));
                            case 2:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return e
            }(),
            WEIXIN_LOGIN: function() {
                function e(e, n) {
                    return t.apply(this, arguments)
                }
                var t = (0,
                f.default)(d.default.mark(function e(t, n) {
                    var i, a = (t.commit,
                    t.dispatch,
                    n.expireTime), r = void 0 === a ? 10 : a, o = n.isForce, u = (0,
                    c.default)(n, ["expireTime", "isForce"]);
                    return d.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                (0,
                                v.wxAuth)((0,
                                s.default)({
                                    validNameSpace: "weixinAuth",
                                    expireTime: r,
                                    isForce: o
                                }, u));
                            case 2:
                                return i = e.sent,
                                e.abrupt("return", i);
                            case 4:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return e
            }(),
            NEW_WEIXIN_LOGIN: function() {
                function e() {
                    return t.apply(this, arguments)
                }
                var t = (0,
                f.default)(d.default.mark(function e() {
                    var t;
                    return d.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                (0,
                                v.newWxAuth)();
                            case 2:
                                return t = e.sent,
                                e.abrupt("return", t);
                            case 4:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return e
            }(),
            WEIXIN_LOGIN_FROM_COMMON_PAGE: function() {
                function e() {
                    return t.apply(this, arguments)
                }
                var t = (0,
                f.default)(d.default.mark(function e() {
                    var t;
                    return d.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                (0,
                                v.WxAuthFromCommonPage)({
                                    validNameSpace: "weixinAuth"
                                });
                            case 2:
                                return t = e.sent,
                                e.abrupt("return", t);
                            case 4:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return e
            }(),
            VOTE: function() {
                function e(e, n) {
                    return t.apply(this, arguments)
                }
                var t = (0,
                f.default)(d.default.mark(function e(t, n) {
                    var i, a, r = (t.commit,
                    t.dispatch), o = n.objectPk, s = n.votePk, u = n.voteOptionPks, c = n.objectType, l = void 0 === c ? 0 : c;
                    return d.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                r("WEIXIN_LOGIN", {});
                            case 2:
                                if (i = e.sent,
                                a = void 0,
                                i) {
                                    e.next = 6;
                                    break
                                }
                                return e.abrupt("return", a);
                            case 6:
                                return e.prev = 6,
                                e.next = 9,
                                (0,
                                v.vote)({
                                    userPk: i.userId,
                                    objectPk: o,
                                    votePk: s,
                                    voteOptionPks: u,
                                    jwt: i.jwt,
                                    objectType: l
                                });
                            case 9:
                                a = "success",
                                e.next = 15;
                                break;
                            case 12:
                                e.prev = 12,
                                e.t0 = e.catch(6),
                                a = e.t0.response && e.t0.response.data && 10011 == e.t0.response.data.errorCode ? "voted" : "fail";
                            case 15:
                                return e.abrupt("return", a);
                            case 16:
                            case "end":
                                return e.stop()
                            }
                    }, e, this, [[6, 12]])
                }));
                return e
            }(),
            GET_USER_VIP_DATA: function() {
                function e(e, n) {
                    return t.apply(this, arguments)
                }
                var t = (0,
                f.default)(d.default.mark(function e(t, n) {
                    var i, a, r, o, s, u = (t.commit,
                    t.state,
                    t.dispatch,
                    n.jwt), c = n.userId;
                    return d.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                (0,
                                v.getUserVip)({
                                    jwt: u,
                                    userId: c
                                });
                            case 2:
                                return i = e.sent,
                                a = i.data,
                                r = a.vipStatus,
                                o = a.status,
                                s = a.vipEndSec,
                                e.abrupt("return", {
                                    vipStatus: r,
                                    status: o,
                                    vipEndSec: s
                                });
                            case 8:
                            case "end":
                                return e.stop()
                            }
                    }, e, this)
                }));
                return e
            }(),
            WEIXIN_PAY: function(e, t) {
                var n = (e.state,
                t.timeStamp)
                  , i = t.nonceStr
                  , a = t.sign
                  , o = t.packageValue;
                return new r.default(function(e, t) {
                    window.wx.ready(function() {
                        window.wx.chooseWXPay({
                            appId: "wxcae29d5033bbc074",
                            timestamp: n,
                            nonceStr: i,
                            package: o,
                            signType: "MD5",
                            paySign: a,
                            success: function(t) {
                                t.errMsg,
                                e(t.errMsg)
                            },
                            fail: function(e, n) {
                                t(e)
                            },
                            cancel: function() {
                                t("cancel")
                            }
                        })
                    })
                }
                )
            },
            BTN_CLICK_CNT: function(e, t) {
                var n = (e.commit,
                e.state,
                e.dispatch,
                t.btnName)
                  , i = t.jwt
                  , a = t.userId;
                return (0,
                v.btnClickCnt)({
                    btnName: n,
                    jwt: i,
                    userId: a
                })
            },
            BIND_QUICK_USER: function() {
                function e(e, n) {
                    return t.apply(this, arguments)
                }
                var t = (0,
                f.default)(d.default.mark(function e(t, n) {
                    var i = t.commit
                      , a = (t.state,
                    n.cooperateUserId)
                      , r = n.cooperateToken
                      , o = n.jwt
                      , s = n.userId;
                    return d.default.wrap(function(e) {
                        for (; ; )
                            switch (e.prev = e.next) {
                            case 0:
                                if (e.prev = 0,
                                a || r) {
                                    e.next = 3;
                                    break
                                }
                                return e.abrupt("return");
                            case 3:
                                i("SET_REQUESTING", {
                                    status: !0
                                }),
                                (0,
                                v.bindQuickUser)({
                                    cooperateUserId: a,
                                    cooperateToken: r,
                                    jwt: o,
                                    userId: s
                                }),
                                e.next = 10;
                                break;
                            case 7:
                                e.prev = 7,
                                e.t0 = e.catch(0),
                                i("SET_REQUESTING", {
                                    status: !1
                                });
                            case 10:
                            case "end":
                                return e.stop()
                            }
                    }, e, this, [[0, 7]])
                }));
                return e
            }(),
            INIT_FROMSOURCE: function(e, t) {
                var n = e.commit
                  , i = t.fromSource
                  , a = t.ct
                  , r = t.ci;
                try {
                    if (!i)
                        return;
                    window.ShareTrace.init({
                        appkey: "62b38af93a8c7d2e",
                        param: m.default.stringify({
                            t: 1,
                            fromSource: i,
                            ct: a,
                            ci: r
                        })
                    }),
                    n("SET_FROMSOURCE", {
                        fromSource: i,
                        ct: a,
                        ci: r
                    })
                } catch (e) {}
            }
        }
    },
    161: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(19);
        t.default = {
            SET_APP_GLOBAL_CONFIG: function(e, t) {
                e.appGlobalConfig = t
            },
            SET_ACTIVITY_INFO: function(e, t) {
                t.targetUrl,
                t.coverUrl
            },
            SET_HOTTEST_NEWS: function(e, t) {
                var n = t.result
                  , i = void 0 === n ? [] : n;
                i.length > 0 && (e.hottestList = i)
            },
            SET_REFRESHED_TV_PROGRAM: function(e, t) {
                e.refreshedTvProgram = t
            },
            SET_SHOW_VIEW: function(e, t) {
                e.showView = t
            },
            SET_SHARE_DATA: function(e, t) {
                var n = t.query;
                e.query = {
                    shareData: n.share_data ? (0,
                    i.deCodeBase64)(n.share_data) : {
                        shareId: n.shareId
                    }
                }
            },
            SET_LIVEREVIEW_FOCUS_BOTTOM_SPACE: function(e) {
                e.liveReviewFocusBottomSpace = "nospace"
            },
            SET_LIVEREVIEW_FOCUS_CHECKED_INDEX: function(e, t) {
                var n = t.index;
                e.liveReviewFocusCheckedIndex = n
            },
            SET_FOOTER_BAR_VISIBLE: function(e, t) {
                var n = t.status;
                e.footerBarVisible = n
            },
            SET_FOOTER_BAR_HIDE_IN_SESSIONSTORAGE: function() {
                sessionStorage.setItem("FooterBar_isHide", 1)
            },
            UPDATE_SCROLL_EVENT: function() {},
            SET_FROMSOURCE: function(e, t) {
                var n = t.fromSource
                  , i = t.ct
                  , a = t.ci;
                e.fromSource = n,
                e.ct = i,
                e.ci = a
            }
        }
    },
    162: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = {
            getHottestList: function(e) {
                return e.hottestList || []
            },
            appGlobalConfig: function(e) {
                return e.appGlobalConfig
            },
            fromSource: function(e) {
                return e.fromSource
            },
            ct: function(e) {
                return e.ct
            },
            ci: function(e) {
                return e.ci
            }
        }
    },
    173: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e, t, n) {
            var i = {
                qlImg1: "http://img1.cloud.itouchtv.cn/",
                qlImg2: "http://ochz1y8tu.bkt.clouddn.com/",
                alImg1: "http://img2-cloud.itouchtv.cn/",
                alImg2: "http://image-touchtv.oss-cn-shenzhen.aliyuncs.com/"
            }
              , a = (0,
            h.getUrlParam)(e)
              , r = new URL(e)
              , o = r.origin
              , s = r.pathname;
            return a.Signature ? e : (e = "" + o + s,
            -1 != e.indexOf(i.qlImg1) || -1 != e.indexOf(i.qlImg2) ? e + "?imageView2/1/w/" + n + "/h/" + t : -1 != e.indexOf(i.alImg1) || -1 != e.indexOf(i.alImg2) ? e + "?x-oss-process=image/resize,m_fill,h_" + t + ",w_" + n : e)
        }
        function r(e) {
            if (!e)
                return null;
            var t = JSON.parse(e);
            return t && t.S ? t.S[0] : t.L ? t.L[0] : null
        }
        function o(e) {
            var t = {};
            t.type = "live",
            t.feature = "功能名称",
            t.stage = "阶段名称",
            t.channel = "渠道名称",
            t.tags = "标签名称",
            t.ios_custom_url = "",
            t.ios_direct_open = "",
            t.android_custom_url = "",
            t.android_direct_open = "";
            var n = {
                key1: e
            };
            return t.params = (0,
            f.default)(n),
            t
        }
        function s(e) {
            var t = function(e) {
                return Math.round(10 * e) / 10
            };
            if (!e)
                return 0;
            return e = e.toString(),
            e.length >= 5 && e.length < 8 ? t(1 * e / 1e4) + "万" : 8 === e.length ? t(1 * e / 1e7) + "千万" : e.length >= 9 ? t(1 * e / 1e8) + "亿" : e
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.dateFormat = t.getOpenAppTypeFromContentType = t.getLinkUrl = void 0;
        var u = n(63)
          , c = i(u)
          , l = n(24)
          , d = i(l)
          , p = n(28)
          , f = i(p);
        t.imgManage = a,
        t.getCoverUrl = r,
        t.linkDataSet = o,
        t.countShow = s;
        var h = n(19);
        t.getLinkUrl = function(e, t, n) {
            return new d.default(function(i, a) {
                var r = window.linkedme || {}
                  , s = o(e);
                r.link(s, function(e, a) {
                    e || (t(a.url, n),
                    i(a.url))
                }, !1, !1)
            }
            )
        }
        ,
        t.getOpenAppTypeFromContentType = function(e) {
            return {
                0: "news",
                1: "video",
                2: "atlas",
                3: "ldsLiving",
                4: "newsTopic",
                5: "liveTopic",
                6: "setNewsTopic",
                7: "videoTopic",
                9: "tvProgram"
            }[e.contentType]
        }
        ,
        t.dateFormat = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "YYYY-MM-DD";
            "date" !== e.constructor.name.toLowerCase() && (e = new Date(e));
            var n = void 0
              , i = {
                "Y+": e.getFullYear().toString(),
                "M+": (e.getMonth() + 1).toString(),
                "D+": e.getDate().toString(),
                "H+": e.getHours().toString(),
                "m+": e.getMinutes().toString(),
                "S+": e.getSeconds().toString()
            };
            return (0,
            c.default)(i).forEach(function(e) {
                (n = new RegExp("(" + e + ")").exec(t)) && (t = t.replace(n[1], 1 === n[1].length ? i[e] : i[e].padStart(n[1].length, "0")))
            }),
            t
        }
    },
    174: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a() {
            return !!navigator.userAgent.match(/(iphone|ipod|ipad);?/i)
        }
        function r() {
            var e = navigator.userAgent.toLowerCase();
            return !!e.match(/micromessenger/gi) || !!e.match(/qq/i)
        }
        function o() {
            return !!navigator.userAgent.toLowerCase().match(/micromessenger/gi)
        }
        function s() {
            if (a())
                u("ios", !1)();
            else {
                u("android", "http://dev-image-touchtv.oss-cn-shenzhen.aliyuncs.com/upload/20190111/tRJteyh7wS1547196505.png", {
                    height: "1.5rem",
                    width: "2.68rem"
                })()
            }
        }
        function u(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
              , i = arguments[3]
              , a = {
                android: "http://img2-cloud.itouchtv.cn/manual/0330/android.png",
                ios: "http://img2-cloud.itouchtv.cn/manual/0330/ios.png",
                zhishi: "http://img2-cloud.itouchtv.cn/manual/0330/zhishi.png"
            }
              , r = a[e]
              , o = a.zhishi;
            return function() {
                if (document.querySelector(".tipsBox"))
                    return "";
                var e = document.createElement("div");
                return e.setAttribute("class", "tipsBox"),
                e.setAttribute("id", "common-tipsBox"),
                e.innerHTML = t ? '\n            <div style="position:fixed;z-index:996;background:rgba(0,0,0,0.5);top:0;left:0;right:0;bottom:0;"></div>\n            <div style="width:' + (n.width || "4.2rem") + ";height:" + (n.height || "1.2rem") + ";background-image:url(" + t + ');background-size:100% 100%;position:fixed;z-index:996;top:0.1rem;right:0.1rem"></div>' : '\n        <div style="position:fixed;z-index:996;background:rgba(0,0,0,0.3);top:0;left:0;right:0;bottom:0;"></div>\n        <div style="width:4.2rem;height:1.2rem;background-image:url(' + r + ');background-size:100% 100%;position:fixed;z-index:996;top:1.05rem;right:1rem"></div>\n        <div style="position:fixed;width:0.82rem;height:auto;z-index:996;top:0.2rem;right:.5rem"><img style="display:block;width:0.82rem" src="' + o + '"/></div>',
                document.body.appendChild(e),
                e.onclick = function() {
                    i && i(),
                    document.body.removeChild(e),
                    e = null
                }
                ,
                e
            }
        }
        function c(e, t) {
            var n = void 0
              , i = new P.default(function(e) {
                n = e
            }
            )
              , a = l(e, t)
              , r = "";
            t && t.internalLink && (r = t.internalLink);
            var o = A(a, r);
            return n(o),
            i
        }
        function l(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            switch (t.openAppType) {
            case M.liveOb:
            case M.liveRich:
                var n = (0,
                v.default)({}, t);
                return n.mediaLive = {
                    mediaId: n.mediaLive.mediaId
                },
                n;
            case M.newsTopic:
            case M.product:
            case M.liveTopic:
            case M.tvProgram:
            case M.setNewsTopic:
            case M.videoTopic:
            case M.worldLive:
            case M.baoliaodetail:
            case M.simulcastDetail:
            default:
                if (e == k.news || t.openAppType && x.filter(function(e) {
                    return t.openAppType == e
                }).length) {
                    var i = {};
                    i.openAppType = t.openAppType || R[t.contentType];
                    var r = t.thisNews || t;
                    return a() ? (i.thisNews = {
                        sid: r.pk
                    },
                    i.sidInAES = r.sid) : (i.sidInAES = r.sid,
                    i.thisNews = {
                        sid: r.pk
                    },
                    1 == r.contentType && navigator.userAgent.match(/android/i) && (i.thisNews.videoUrl = window.btoa(r.videoUrl))),
                    i.mediaAppDownloadChannel = t.mediaAppDownloadChannel,
                    i.ct = t.ct,
                    i.ci = t.ci,
                    i
                }
                return t
            }
        }
        function d() {
            var e = navigator.userAgent.toLowerCase();
            return e.match(/micromessenger/i) ? "1" : e.match(/weibo/i) ? "2" : e.match(/mqqbrowser|qzone|qqbrowser/i) ? "3" : "0"
        }
        function p(e, t) {
            return {
                operator_code: e,
                operator_list: "00046" == e && 6 == t ? "6$" + d(t) : t
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var f = n(98)
          , h = i(f)
          , m = n(40)
          , v = i(m)
          , g = n(28)
          , I = i(g)
          , T = n(180)
          , w = i(T)
          , _ = n(35)
          , S = i(_)
          , E = n(24)
          , P = i(E)
          , y = n(36)
          , O = i(y)
          , A = function() {
            var e = (0,
            O.default)(S.default.mark(function e(t, n) {
                var i, r, u, c, l, d, p, f, h, m, v, g, T, w, _, E;
                return S.default.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            if (i = navigator.userAgent.toLowerCase(),
                            r = i.match(/weibo/i),
                            u = i.match(/mqqbrowser/i),
                            c = i.match(/ipadqq/i),
                            l = i.match(/qq/i),
                            d = (0,
                            I.default)(t),
                            p = (0,
                            N.getUrlParam)(),
                            f = j.get(p && p.branch || "ios"),
                            h = "touchtvnews://com.touchtv.touchtv/openApp?&newsjson=" + d,
                            m = a() ? j.get("ios") + "://?newsjson=" + encodeURIComponent(d) : "" + h,
                            v = a() ? f + "://?newsjson=" + encodeURIComponent(d) : "" + h,
                            n && (h = n,
                            m = n,
                            v = n),
                            !(o() || l && !u)) {
                                e.next = 17;
                                break
                            }
                            return g = encodeURIComponent(m),
                            T = a() ? "http://a.app.qq.com/o/simple.jsp?pkgname=com.touchtv.touchtv&ckey=CK1391511965753&ios_scheme=" + g : "http://a.app.qq.com/o/simple.jsp?pkgname=com.touchtv.touchtv&&ckey=CK1391511965753&&android_schema=" + g,
                            w = function() {
                                window.ShareTrace.preDownload(),
                                location.href = T
                            }
                            ,
                            e.abrupt("return", w);
                        case 17:
                            if (!r) {
                                e.next = 20;
                                break
                            }
                            return _ = function() {
                                s()
                            }
                            ,
                            e.abrupt("return", _);
                        case 20:
                            return E = function() {
                                var e = void 0;
                                void 0 !== document.hidden ? e = "hidden" : void 0 !== document.mozHidden ? e = "mozHidden" : void 0 !== document.msHidden ? e = "msHidden" : void 0 !== document.webkitHidden && (e = "webkitHidden"),
                                location.href = m;
                                var n = setTimeout(function() {
                                    document[e] || (location.href = v)
                                }, 2e3)
                                  , i = setTimeout(function() {
                                    if (!document[e]) {
                                        var n = new URL("http://www.itouchtv.cn/newsapp/redirect.html");
                                        n.searchParams.append("fromSource", t.mediaAppDownloadChannel),
                                        n.searchParams.append("ct", t.ct),
                                        n.searchParams.append("ci", t.ci),
                                        n.searchParams.append("from2", "h5bigdata"),
                                        location.href = n.href
                                    }
                                }, 3e3);
                                document.addEventListener("visibilitychange", function() {
                                    clearTimeout(n),
                                    clearTimeout(i)
                                })
                            }
                            ,
                            e.abrupt("return", E);
                        case 22:
                        case "end":
                            return e.stop()
                        }
                }, e, this)
            }));
            return function(t, n) {
                return e.apply(this, arguments)
            }
        }();
        t.handleGoToApp = c;
        var b = n(206)
          , L = i(b)
          , C = n(173)
          , N = n(19)
          , D = new L.default({
            timeout: 2e3,
            mask: !0,
            mode: 2
        })
          , k = (function() {
            function e() {
                return t.apply(this, arguments)
            }
            var t = (0,
            O.default)(S.default.mark(function e() {
                var t;
                return S.default.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return this.requesting = !0,
                            t = this.queue.splice(0, this.per),
                            e.next = 4,
                            P.default.all(t.map(function(e) {
                                return (0,
                                C.getLinkUrl)(e.obj, function() {}).then(function(t) {
                                    e.resolve(t)
                                })
                            }));
                        case 4:
                            this.queue.length ? this.start() : this.requesting = !1;
                        case 5:
                        case "end":
                            return e.stop()
                        }
                }, e, this)
            }))
        }(),
        {
            news: "news",
            liveOb: "live",
            liveRich: "liveRich",
            newsTopic: "newsTopic",
            product: "product",
            liveTopic: "liveTopic",
            tvProgram: "tvProgram"
        })
          , M = {
            liveOb: "lds",
            news: "news",
            video: "video",
            atlas: "atlas",
            liveRich: "ldsLiving",
            newsTopic: "newsTopic",
            product: "product",
            liveTopic: "liveTopic",
            tvProgram: "tvProgram",
            setNewsTopic: "setNewsTopic",
            videoTopic: "videoTopic",
            worldLive: "worldLive",
            baoliaodetail: "baoliaodetail",
            simulcastDetail: "simulcastDetail"
        }
          , R = {
            0: "news",
            1: "video",
            2: "atlas"
        }
          , x = ["news", "video", "atlas"]
          , j = new w.default([["ios_vip", "touchtvnewspro"], ["ios", "touchtvnews"]])
          , U = {
            id: "gotoApp",
            definition: {
                inserted: function(e, t, n) {
                    var i = t.value
                      , o = i.data
                      , s = void 0 === o ? {} : o
                      , u = i.type
                      , l = i.bigDataOp
                      , d = i.bigDataExtList
                      , f = i.callback
                      , m = void 0 === f ? function(e) {
                        return null
                    }
                    : f;
                    s.bigDataOp = l,
                    s.mediaAppDownloadChannel = n.context.$store.getters["common/fromSource"],
                    s.ct = n.context.$store.getters["common/ct"],
                    s.ci = n.context.$store.getters["common/ci"],
                    c(u, s).then(function(t) {
                        function i() {
                            var e = this;
                            "function" == typeof t ? t() : (location.href = t,
                            a() && r() && setTimeout((0,
                            O.default)(S.default.mark(function t() {
                                return S.default.wrap(function(e) {
                                    for (; ; )
                                        switch (e.prev = e.next) {
                                        case 0:
                                            location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.touchtv.touchtv&ckey=CK1391511965753";
                                        case 1:
                                        case "end":
                                            return e.stop()
                                        }
                                }, t, e)
                            })), 0))
                        }
                        var o = function() {
                            if (D.init(),
                            d && Array.isArray(d)) {
                                d.map(function(e, t) {
                                    var i = (0,
                                    h.default)(e, 3)
                                      , a = i[0]
                                      , r = i[1]
                                      , o = i[2];
                                    return n.context.$track(p(a, r), o)
                                }).forEach(function(e) {
                                    n.context.$store.dispatch("common/POST_BIGDATA_LOG", e)
                                })
                            }
                            if (l) {
                                var e = n.context.$track(p("00046", l));
                                n.context.$store.dispatch("common/POST_BIGDATA_LOG", e)
                            }
                            i(),
                            m && m()
                        };
                        if (e.onclick = o,
                        "open-app-button" === e.className) {
                            var s = document.querySelectorAll(".open-app-button");
                            s && s.length > 2 && (s[0].onclick = s[s.length - 2].onclick,
                            s[s.length - 2 + 1].onclick = s[1].onclick)
                        }
                    })
                },
                unbind: function(e) {
                    e.onclick = null
                }
            }
        };
        t.default = U
    },
    19: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e) {
            e.onerror = function(t, n, i, a, r) {
                var o = {
                    message: t,
                    url: n,
                    line: i,
                    column: a || e.event && e.event.errorCharacter || 0,
                    navigator: e.navigator || null
                };
                return r && r.stack && (o.stack = (r.stack || r.stacktrace).toString()),
                !0
            }
        }
        function r() {
            return Boolean(navigator.userAgent.match(/android/i))
        }
        function o() {
            return Boolean(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))
        }
        function s() {
            return Boolean(navigator.userAgent.toLowerCase().match(/micromessenger/i))
        }
        function u() {
            return Boolean(navigator.userAgent.toLowerCase().match(/qq/i))
        }
        function c() {
            return Boolean(navigator.userAgent.toLowerCase().match(/qq/i))
        }
        function l() {
            return Boolean(navigator.userAgent.toLowerCase().match(/weibo/i))
        }
        function d() {
            return Boolean(navigator.userAgent.toLowerCase().match(/touchtv-hm-cards/i))
        }
        function p(e) {
            var t = e ? e.split("?")[1] : window.location.href.split("?")[1];
            if (!t)
                return {};
            var n = t.split("&")
              , i = {};
            return n.map(function(e) {
                i[e.split("=")[0]] = e.split("=")[1]
            }),
            i
        }
        function f(e) {
            if (!e)
                return {};
            var t = n(376).Base64
              , i = t.atob(e.replace(/\s/g, "+"))
              , a = i.split("&");
            if (!a.length)
                return {};
            var r = {};
            return a.map(function(e) {
                r[e.split("=")[0]] = decodeURIComponent(encodeURIComponent(e.split("=")[1]).replace(/\%00/g, ""))
            }),
            r
        }
        function h(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd hh:mm:ss";
            ["string", "number"].includes(void 0 === e ? "undefined" : (0,
            D.default)(e)) && (e = new Date(e));
            var n = {
                "M+": e.getMonth() + 1,
                "d+": e.getDate(),
                "h+": e.getHours(),
                "m+": e.getMinutes(),
                "s+": e.getSeconds(),
                "q+": Math.floor((e.getMonth() + 3) / 3),
                S: e.getMilliseconds()
            };
            return /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))),
            (0,
            C.default)(n).forEach(function(e) {
                new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? n[e] : ("00" + n[e]).substr(("" + n[e]).length)))
            }),
            t
        }
        function m() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
              , t = arguments[1]
              , n = arguments[2]
              , i = arguments[3]
              , a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "/format,jpg";
            if (!e)
                return "";
            var r = void 0
              , o = p(e)
              , s = new URL(e)
              , u = s.origin
              , c = s.pathname
              , l = (parseInt(t, 10),
            parseInt(n, 10),
            {
                qlImg1: "img1.cloud.itouchtv.cn",
                qlImg2: "ochz1y8tu.bkt.clouddn.com",
                alImg1: "img2-cloud.itouchtv.cn",
                alImg2: "image-touchtv.oss-cn-shenzhen.aliyuncs.com"
            })
              , d = t && n
              , f = -1 != e.indexOf(".gif");
            if (o.Signature)
                return e;
            if (e = "" + u + c,
            -1 != e.indexOf(l.qlImg1) || -1 != e.indexOf(l.qlImg2))
                r = e + "?imageView2/1" + (d ? "/w/" + n + "/h/" + t : "") + (f ? "" : "/format/jpg");
            else if (d && -1 != e.indexOf(l.alImg1) || -1 != e.indexOf(l.alImg2)) {
                var h = t < 4090 ? ",h_" + t : ""
                  , m = d ? "/resize,m_" + (i || "fill") + h + ",w_" + n : "";
                r = e.replace(/^http:\/\//, "https://") + "?" + (f ? "" : "x-oss-process=image" + a) + m + "/quality,q_80"
            } else
                r = e;
            return r
        }
        function v(e) {
            if (!e)
                return "";
            var t = new Date(e)
              , n = t.getFullYear() !== (new Date).getFullYear()
              , i = t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1
              , a = t.getDate() < 10 ? "0" + t.getDate() : t.getDate();
            return (n ? t.getFullYear() + "-" : "") + i + "-" + a
        }
        function g(e, t) {
            function n(e) {
                return e < 10 ? "0" + e : e
            }
            if (!e)
                return "";
            var i = 0
              , a = 0
              , r = Math.floor(e / 1e3);
            return r > 60 && (a = parseInt(r / 60, 10),
            r = parseInt(r % 60, 10),
            a > 60 && (i = parseInt(a / 60, 10),
            a = parseInt(a % 60, 10))),
            i || t ? n(i) + ":" + n(a) + ":" + n(r) : n(a) + ":" + n(r)
        }
        function I(e) {
            function t(e) {
                return e < 10 ? "0" + e : e
            }
            var n = parseInt(e / 60, 10)
              , i = e % 60;
            return t(n) + ":" + t(i)
        }
        function T(e) {
            var t = (new Date).getTime()
              , n = t - e;
            if (n < 0)
                return "";
            var i = n / 864e5
              , a = n / 36e5
              , r = n / 6e4;
            return i >= 1 ? parseInt(i, 10) + "天前" : a >= 1 ? parseInt(a, 10) + "小时前" : r >= 1 ? parseInt(r, 10) + "分钟前" : "刚刚"
        }
        function w(e) {
            var t = function(e) {
                return Math.round(10 * e) / 10
            };
            if (!e)
                return 0;
            return e = e.toString(),
            e.length >= 5 && e.length < 8 ? t(1 * e / 1e4) + "万" : 8 === e.length ? t(1 * e / 1e7) + "千万" : e.length >= 9 ? t(1 * e / 1e8) + "亿" : e
        }
        function _(e) {
            if (!e)
                return null;
            try {
                var t = JSON.parse(e);
                if (t && t.S && t.S.length > 0)
                    return t.S[0];
                if (t && t.L && t.L.length > 0)
                    return t.L[0]
            } catch (t) {
                return e
            }
            return null
        }
        function S() {
            var e = navigator.userAgent
              , t = /(?:Windows Phone)/.test(e)
              , n = /(?:SymbianOS)/.test(e) || t
              , i = /(?:Android)/.test(e)
              , a = /(?:Firefox)/.test(e)
              , r = (/(?:Chrome|CriOS)/.test(e),
            /(?:iPad|PlayBook)/.test(e) || i && !/(?:Mobile)/.test(e) || a && /(?:Tablet)/.test(e))
              , o = /(?:iPhone)/.test(e) && !r;
            return {
                isTablet: r,
                isPhone: o,
                isAndroid: i,
                isPc: !(o || i || n || r)
            }
        }
        function E(e) {
            return new b.default(function(t) {
                setTimeout(function() {
                    t()
                }, e)
            }
            )
        }
        function P() {
            return y() || O() ? new Date((new Date).getTime() + 6e4) : 10
        }
        function y(e) {
            var t = ["localhost"];
            return "undefined" != typeof window ? Boolean(t.filter(function(e) {
                return e == window.location.hostname
            })[0]) : Boolean(t.filter(function(t) {
                return t == e
            })[0])
        }
        function O(e) {
            return "undefined" != typeof window ? window.location.hostname.startsWith("test") : e.startsWith("test")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var A = n(24)
          , b = i(A)
          , L = n(63)
          , C = i(L)
          , N = n(99)
          , D = i(N);
        t.dateFtt = h,
        e.exports = {
            errorLog: a,
            isAndroid: r,
            isIos: o,
            isWeixin: s,
            isQQ: u,
            isQQBrowser: c,
            isWeibo: l,
            isHmCards: d,
            getUrlParam: p,
            deCodeBase64: f,
            imgManage: m,
            turnTime: v,
            turnTimeToHours: g,
            countShow: w,
            getCoverUrl: _,
            turnTimeToMinute: I,
            dateFtt: h,
            os: S,
            delay: E,
            getWechatExpireTime: P,
            getDateDiff: T,
            isLocalHost: y,
            isTestHost: O
        }
    },
    196: function(e, t, n) {
        "use strict";
        "function" != typeof String.prototype.startsWith && (String.prototype.startsWith = function(e) {
            return e && this.slice(0, e.length) === e
        }
        ),
        "function" != typeof String.prototype.endsWith && (String.prototype.endsWith = function(e) {
            return e && -1 !== this.indexOf(e, this.length - e.length)
        }
        ),
        "function" != typeof Array.prototype.find && (Array.prototype.find = function(e) {
            return e && (this.filter(e) || [])[0]
        }
        )
    },
    200: function(e, t, n) {
        "use strict";
        function i(e) {
            n(384)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(385)
          , r = n.n(a)
          , o = n(386)
          , s = n(33)
          , u = i
          , c = s(r.a, o.a, u, null, null);
        t.default = c.exports
    },
    206: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(427)
          , a = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(i)
          , r = function(e) {
            var t = this;
            return this.message = e.message || "加载中",
            this.timeout = e.timeout || 1500,
            this.mask = e.mask || !1,
            this.destroyTimeOut = null,
            this.div = null,
            this.callback = e.cb || null,
            this.mode = e.mode || 1,
            this.init = function() {
                t.div = document.createElement("div"),
                t.div.className = t.mask ? a.default["global-spin-mask"] : a.default["global-spin"];
                var e = 1 == t.mode ? '<div class="' + a.default["global-spin-content"] + '"><img src="' + n(428) + '" /></div>' : '<div class="' + a.default["global-spin-content"] + " " + a.default["no-black"] + '"><img src="' + n(429) + '" /></div>';
                return t.div.innerHTML = e,
                document.body.appendChild(t.div),
                "wait" != t.timeout && (t.destroyTimeOut = setTimeout(function() {
                    t.destroy(),
                    t.callback && t.callback()
                }, t.timeout || 1500)),
                t
            }
            ,
            this.destroy = function() {
                t.div && document.body.removeChild(t.div),
                t.div = null,
                t.destroyTimeOut = clearTimeout(t.destroyTimeOut)
            }
            ,
            {
                init: this.init,
                destroy: this.destroy
            }
        };
        t.default = r
    },
    239: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.MEDIA_TYPE_NAME = t.MEDIA_TYPE = t.COVER_MODE = t.GIFT_TYPE = t.MQTT_SDK_CDN = t.MSG_TYPE = t.MEDIA_VISIBLE_STATUS = t.LIVE_STATUS = t.LIVE_TYPE = t.DISPLAY_TYPE = t.PROGRAM_CT = t.NEW_CT = t.NEWS_PATH = t.NEWS_CONTENT_TYPE = t.OBJECT_TYPE = void 0;
        var i, a, r, o, s = n(240), u = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(s), c = t.OBJECT_TYPE = {
            ADVERTISEMENT: 0,
            MEDIA_LIVE: 1,
            MEDIA_LIVE_TOPIC: 2,
            TV_PROGRAM: 3,
            NEWS: 4,
            NEWS_COMMON_TOPIC: 5,
            NEWS_AGGREGATE_TOPIC: 6,
            OUT_LINK: 7,
            TV_PROGRAM_REVIEW: 8,
            ACTIVITY: 9,
            TV_PROGRAM_CLIPS: 10,
            SINGLE_PROG_AUTO_UPDATE: 11,
            CHANNEL: 12,
            NONE: 13,
            GUESS: 14,
            COMMUNITY_SELF_MEDIA: 15,
            MEDIA: 16,
            TIME_LINE: 17,
            SHOPMAIL: 18,
            WXAPP: 19,
            NEWS_TOPIC_ALBUM: 20,
            MEDIA_lATEST_NEWS: 21,
            APP_LINK: 23,
            ZR_EXAM: 25,
            CHANNEL_FOCUS_PICTURE: 30,
            NEWS_ALERTS: 31,
            SSE_INDEX: 32,
            WEATHER_REPORT: 33,
            FINANCE_LIVE: 34,
            MATCH_PLUG_IN: 35,
            COMMUNITY_TOPIC_DAODAO: 36,
            COMMUNITY_TOPIC_VOTE: 37,
            POINT_COMMODITY: 38,
            TOPIC_GUESS_PLUGIN: 39,
            COLUMN_PLUGIN: 40,
            MEDIA_PLUGIN: 41,
            CHANNEL_BIG_FOCUS_PICTURE: 42,
            NONSTANDARD_AD_ONLY_IMAGE: 43,
            COLUMN_BIG_PLUGIN: 44,
            TV_CHANNEL: 45,
            VERTICAL_SCREEN_VIDEO_PLUGIN: 46,
            MEDIA_MATRIX: 47,
            COLUMN_SERVICE_PLUGIN: 48,
            MEDIA_AUDIO: 49,
            APP_INFO: 50,
            SMALL_CIRCLE_PIC_PLUGIN: 51,
            ZJY_MEDIA_MATRIX_PLUGIN: 52,
            ZJY_MEDIA_MATRIX: 53,
            HOT_RANK_APP_PLUGIN: 54,
            ZJY_APP_PUBLISH_NEWS_AMOUNT_INFO: 55,
            ZJY_APP_PUBLISH_NEWS_AMOUNT_RANK_PLUGIN: 56,
            ZJY_RANK_HOT_NEWS_PLUGIN: 57,
            ZJY_GOVERNMENT_MEDIA_POPULARITY_INFO: 58,
            ZJY_GOVERNMENT_MEDIA_POPULARITY_RANK_PLUGIN: 59,
            ONE_LINE_THREE_ITEM_PLUGIN: 60,
            PORTRAIT_LEFT_PLUGIN: 61,
            PORTRAIT_RIGHT_PLUGIN: 62,
            ONE_PIC_PLUGIN: 63,
            ONE_LINE_TWO_ITEM_PLUGIN: 64,
            ANCHOR_PLUGIN: 65,
            TV_CHANEL_LIST: 66,
            BIGDATA_REC_MEDIA_LIST: 67,
            ZJY_QUESTION_ANSWER_PLUGIN: 68,
            BIGDATA_REC_VERTICAL_VIDEO_LIST: 69,
            MEDIA_LIVE_PREVIEW_PLUGIN: 70,
            AUDIO_TOPIC_PAGE: 71,
            AUDIO_PLAYBACK: 72,
            NEW_COLUMN_PLUGIN: 73,
            AUDIO_PORTRAIT_LEFT_PLUGIN: 74,
            GRTN_POLITICS_RANK_PLUGIN: 75,
            CUSTOM_LAYOUT_PLUGIN: 76,
            TV_PROGRAM_PLUGIN: 77,
            MINSHENG_HOTLINE_MEDIALIVE_PLUGIN: 78,
            CAN_SUBSCRIBE_MEDIA_PLUGIN: 79,
            MINSHENG_ONLINE_GOVERNMENT_ANSWER_PLUGIN: 80,
            BAOLIAO: 100,
            BAOLIAO_TOPIC: 101,
            BAOLIAO_FOCUS_PICTURE: 102,
            ZR_TEST_PAPER: 110,
            ZR_WORDS_PRACTISE: 111,
            DRAW: 150,
            DRAW_POINT_ENTRANCE: 151,
            XSD_ACTIVITY: 200,
            XSD_WISH: 201,
            XSD_COURSE: 202,
            GDT_AD: 1e3,
            HS_AD: 1001,
            CHANNEL_FEED_NON_STANDARD_AD: 1002,
            MULTI_CREATIVE_AD: 1003
        }, l = t.NEWS_CONTENT_TYPE = {
            ARTICLE: 0,
            VIDEO: 1,
            GALLERY: 2
        }, d = (t.NEWS_PATH = (i = {},
        (0,
        u.default)(i, l.ARTICLE, "article"),
        (0,
        u.default)(i, l.VIDEO, "video"),
        (0,
        u.default)(i, l.GALLERY, "gallery"),
        i),
        t.NEW_CT = (a = {},
        (0,
        u.default)(a, l.ARTICLE, 1),
        (0,
        u.default)(a, l.VIDEO, 2),
        (0,
        u.default)(a, l.GALLERY, 3),
        a),
        t.PROGRAM_CT = (r = {},
        (0,
        u.default)(r, c.TV_PROGRAM_REVIEW, 5),
        (0,
        u.default)(r, c.TV_PROGRAM_CLIPS, 6),
        (0,
        u.default)(r, c.TV_PROGRAM, 7),
        r),
        t.DISPLAY_TYPE = {
            NEWS: 0,
            IMAGE: 1,
            LANSCAPE_VIDEO: 2,
            LANSCAPE_LIVE: 3,
            PROTRAIT_LIVE: 4,
            PROTRAIT_VIDEO: 5,
            NEWS_TOPIC: 6,
            MEDIA_AUDIO: 7,
            MEDIA_VIDEO: 8
        },
        t.LIVE_TYPE = {
            MULTI_CAMERA: 2
        },
        t.LIVE_STATUS = {
            APPOINTMENT: 0,
            LIVING: 1,
            OVER_HAS_PLAYBACK: 2,
            OVER_WITHOUT_PLAYBACK: 3
        },
        t.MEDIA_VISIBLE_STATUS = {
            VISIBLE_CAN: 0,
            VISIBLE_CANT: 1,
            INVISIBLE: 2
        },
        t.MSG_TYPE = {
            1: "comment",
            2: "gift",
            3: "join",
            7: "subscribe",
            8: "beginPush",
            9: "stop",
            10: "banComment",
            11: "over",
            12: "share",
            16: "liveDataUpdate",
            17: "deleteComment",
            18: "liveRecommendGoodsUpdate",
            19: "liveGoodsListUpdate",
            20: "mediaLiveRoomBuoy",
            21: "updateLivePlayUrl",
            26: "updateAuditStatus"
        },
        t.MQTT_SDK_CDN = "//img2-cloud.itouchtv.cn/sitecdn/utils/mqtt_sdk_19f5d630.js",
        t.GIFT_TYPE = {
            FREE_UNLIMITED: 0,
            FREE_LIMITED_TIME: 1,
            FREE_LIMITED_POINT: 2,
            PAY: 3,
            FREE_LIMITED: 4,
            GIFT_LOVE: 6
        },
        t.COVER_MODE = {
            TIMELINE: 5
        },
        t.MEDIA_TYPE = {
            ENTERPRISE: 1,
            GOVERNMENT: 2,
            MEDIA: 3,
            PERSON: 4,
            OTHERS: 5
        });
        t.MEDIA_TYPE_NAME = (o = {},
        (0,
        u.default)(o, d.ENTERPRISE, "企业"),
        (0,
        u.default)(o, d.GOVERNMENT, "政府"),
        (0,
        u.default)(o, d.MEDIA, "媒体机构"),
        (0,
        u.default)(o, d.PERSON, "自媒体"),
        (0,
        u.default)(o, d.OTHERS, "其他"),
        o)
    },
    242: function(e, t, n) {
        "use strict";
        function i(e) {
            var t = e.data
              , n = e.storeChannels
              , i = e.type;
            t.targetType || (i === s.VERTICAL && (t.targetType = t.objectType),
            i === s.CHANNELOPERATION && (t.targetType = t.objectType)),
            t.target || (i === s.VERTICAL && (t.target = t.objectPk),
            i === s.CHANNELOPERATION && (t.target = t.externalLinks));
            var a = t.targetType
              , c = t.target
              , l = t.content
              , d = t.pk;
            try {
                switch (+a) {
                case o.OBJECT_TYPE.ADVERTISEMENT:
                    return c;
                case o.OBJECT_TYPE.MEDIA_LIVE:
                    if (i === s.LIVEFLOATWINDOW) {
                        return "/liveOb/" + JSON.parse(c).id
                    }
                    return "/liveOb/" + c;
                case o.OBJECT_TYPE.MEDIA_LIVE_TOPIC:
                    if (i === s.LIVEFLOATWINDOW) {
                        return "/liveTopic/" + JSON.parse(c).topicId
                    }
                    return "/liveTopic/" + c;
                case o.OBJECT_TYPE.TV_PROGRAM:
                case o.OBJECT_TYPE.TV_PROGRAM_REVIEW:
                    if (i === s.NEWSALERTS)
                        return "/program/" + t.programId;
                    if (i === s.FOUCS) {
                        return "/program/" + JSON.parse(t.content).tvProgramId
                    }
                    return i === s.VERTICAL ? "/program/" + t.tvProgramId : i === s.OPERATIONALACTIVITIES ? "/program/" + t.target : i === s.LIVEFLOATWINDOW ? "/program/" + c : "";
                case o.OBJECT_TYPE.NEWS:
                    if (i === s.NEWSALERTS)
                        return "/" + o.NEWS_PATH[t.contentType] + "/" + c;
                    if (i === s.FOUCS) {
                        var p = JSON.parse(t.content)
                          , f = p.contentType;
                        return "/" + o.NEWS_PATH[f] + "/" + c
                    }
                    if (i === s.VERTICAL)
                        return "/" + o.NEWS_PATH[t.contentType] + "/" + t.sid;
                    if (i === s.OPERATIONALACTIVITIES)
                        return "/article/" + c;
                    if (i === s.LIVEFLOATWINDOW) {
                        var h = JSON.parse(c)
                          , m = h.sid
                          , v = h.contentType;
                        return "/" + o.NEWS_PATH[v] + "/" + m
                    }
                    return "";
                case o.OBJECT_TYPE.NEWS_COMMON_TOPIC:
                    if (i === s.LIVEFLOATWINDOW) {
                        return "/newsTopic/" + JSON.parse(c).topicId
                    }
                    return "/newsTopic/" + c;
                case o.OBJECT_TYPE.NEWS_AGGREGATE_TOPIC:
                    if (i === s.LIVEFLOATWINDOW) {
                        return "/setNewsTopic/" + JSON.parse(c).topicId
                    }
                    return "/setNewsTopic/" + c;
                case o.OBJECT_TYPE.OUT_LINK:
                    return c;
                case o.OBJECT_TYPE.CHANNEL:
                    if (i === s.LIVEFLOATWINDOW) {
                        return "/channel/" + JSON.parse(c).channelId
                    }
                    if (i === s.OPERATIONALACTIVITIES) {
                        return "/channel/" + JSON.parse(c).channelId
                    }
                    var g = n.allChannels
                      , I = void 0 === g ? [] : g
                      , T = JSON.parse(c)
                      , w = T.channelId
                      , _ = ((0,
                    r.default)(T, ["channelId"]),
                    I.find(function(e) {
                        return e.channelId == w
                    }));
                    return "/channel/" + (_.alias || _.channelId || w);
                case o.OBJECT_TYPE.TV_PROGRAM_CLIPS:
                    if (i === s.LIVEFLOATWINDOW)
                        return "/program/" + d + "/" + a + "/" + c;
                    if (i === s.OPERATIONALACTIVITIES)
                        return "/program/" + d + "/" + a + "/" + c;
                    var S = JSON.parse(l);
                    return "/program/" + S.tvProgramId + "/" + a + "/" + S.objectId;
                case o.OBJECT_TYPE.APP_LINK:
                    var E = JSON.parse(new URL(c).searchParams.get("newsjson"));
                    return u({
                        openAppType: E.openAppType,
                        newsjsonObj: E
                    }) || c;
                default:
                    return ""
                }
            } catch (e) {
                return ""
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.openAppType2h5link = t.COMPONENT_TYPE = void 0;
        var a = n(86)
          , r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(a);
        t.getTargetUrlGlobal = i;
        var o = n(239)
          , s = t.COMPONENT_TYPE = {
            FOUCS: 1,
            NEWSALERTS: 2,
            VERTICAL: 3,
            CHANNELOPERATION: 4,
            OPERATIONALACTIVITIES: 5,
            LIVEFLOATWINDOW: 6
        }
          , u = t.openAppType2h5link = function(e) {
            var t = e.openAppType
              , n = e.newsjsonObj;
            if (!t)
                return !1;
            try {
                switch (t) {
                case "mediaDetail":
                    return "/mediaDetail/" + n.id;
                case "gambitVote":
                    return "/gambitVote/" + n.pk;
                case "rattleDetail":
                    return "/gambit/" + n.pk;
                case "simulcastDetail":
                    return "/simulcastDetail/" + n.tvProgramId + "?objectId=" + n.objectId;
                case "channelDetail":
                    return "/channel/" + n.channelId;
                default:
                    return !1
                }
            } catch (e) {
                return !1
            }
        }
    },
    321: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e) {
            if (!e)
                return "?fromSource=" + O;
            var t = "?fromSource=" + O;
            return (0,
            f.default)(e).forEach(function(n) {
                (e[n] && "undefined" != e[n] || 0 === e[n] || "0" === e[n] || !1 === e[n]) && (t += "&" + n + "=" + e[n])
            }),
            t
        }
        function r() {
            var e = {};
            return e.get = function(e, t, n, i) {
                return new d.default(function(r, o) {
                    var s = (i ? "" : y.host) + e + a(t)
                      , u = {};
                    n && n.userId && (u["X-ITOUCHTV-USER-ID"] = n.userId),
                    n && n.jwt && (u.Authorization = "Bearer " + n.jwt),
                    n && n.deviceId && (u["X-ITOUCHTV-DEVICE-ID"] = n.deviceId),
                    u["X-ITOUCHTV-APP-VERSION"] = E;
                    var l = (0,
                    T.default)("GET", s, "")
                      , d = {};
                    g.default.get("X-ITOUCHTV-USER-ID") && (d["X-ITOUCHTV-USER-ID"] = g.default.get("X-ITOUCHTV-USER-ID")),
                    g.default.get("X-ITOUCHTV-DEVICE-ID") && (d["X-ITOUCHTV-DEVICE-ID"] = g.default.get("X-ITOUCHTV-DEVICE-ID"));
                    var p = (0,
                    c.default)({}, d, u);
                    n && n.multiCallLog && (0,
                    S.default)(s, "get", n.multiCallLog.pattern, P),
                    (0,
                    m.default)({
                        method: "get",
                        url: s,
                        timeout: y.timeout,
                        headers: (0,
                        c.default)({}, l, p)
                    }).then(function(e) {
                        r(e)
                    }).catch(function(e) {
                        o(e)
                    })
                }
                )
            }
            ,
            e.post = function(e, t, n, i) {
                return new d.default(function(a, r) {
                    var o = (i ? "" : y.host) + e
                      , u = {};
                    n && n.userId && g.default.set("X-ITOUCHTV-USER-ID", n.userId),
                    n && n.jwt && (u.Authorization = "Bearer " + n.jwt),
                    n && n.ded && g.default.set("X-ITOUCHTV-DEVICE-ID", n.ded),
                    u["X-ITOUCHTV-APP-VERSION"] = E;
                    var l = g.default.get()
                      , d = (0,
                    c.default)({}, l, u);
                    n && n.multiCallLog && (0,
                    S.default)(o, "post", n.multiCallLog.pattern, P),
                    (0,
                    m.default)({
                        method: "post",
                        url: o,
                        timeout: y.timeout,
                        headers: (0,
                        c.default)({}, (0,
                        T.default)("POST", o, (0,
                        s.default)(t)), d),
                        data: t && (0,
                        s.default)(t)
                    }).then(function(e) {
                        a(e)
                    }).catch(function(e) {
                        r(e)
                    })
                }
                )
            }
            ,
            e.put = function(e, t, n) {
                return new d.default(function(i, r) {
                    var o = y.host + e + a(t)
                      , u = {};
                    n && n.userId && g.default.set("X-ITOUCHTV-USER-ID", n.userId),
                    n && n.jwt && (u.Authorization = "Bearer " + n.jwt),
                    n && n.ded && g.default.set("X-ITOUCHTV-DEVICE-ID", n.ded),
                    u["X-ITOUCHTV-APP-VERSION"] = E;
                    var l = g.default.get()
                      , d = (0,
                    c.default)({}, l, u);
                    (0,
                    m.default)({
                        method: "put",
                        url: o,
                        timeout: y.timeout,
                        headers: (0,
                        c.default)({}, (0,
                        T.default)("PUT", o, (0,
                        s.default)(t)), d),
                        data: t && (0,
                        s.default)(t)
                    }).then(function(e) {
                        i(e)
                    }).catch(function(e) {
                        r(e)
                    })
                }
                )
            }
            ,
            e
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.isProd = void 0;
        var o = n(28)
          , s = i(o)
          , u = n(40)
          , c = i(u)
          , l = n(24)
          , d = i(l)
          , p = n(63)
          , f = i(p);
        t.default = r;
        var h = n(393)
          , m = i(h)
          , v = n(85)
          , g = i(v)
          , I = n(412)
          , T = i(I)
          , w = n(19)
          , _ = n(414)
          , S = i(_)
          , E = "1.0.0"
          , P = t.isProd = !((0,
        w.isTestHost)() || (0,
        w.isLocalHost)())
          , y = {
            host: P ? "https://api.itouchtv.cn" : "https://test1.itouchtv.cn:8090",
            timeout: 8e3
        }
          , O = "share"
    },
    326: function(e, t, n) {
        "use strict";
        function i(e) {
            n(508)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(509)
          , r = n.n(a)
          , o = n(510)
          , s = n(33)
          , u = i
          , c = s(r.a, o.a, u, "data-v-fb220e9c", null);
        t.default = c.exports
    },
    331: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e) {
            var t = e.$options
              , n = t.toAppDataKey
              , i = t.footerBarPosition
              , a = t.noFetchHotList
              , r = ""
              , o = i;
            "recomend" === e.$route.params.id && (o = "none");
            var s = "function" == typeof n ? n(e) : n;
            s && (Array.isArray(s) ? (r = s.filter(function(t) {
                return e[t] && "" !== e[t].toString() && e[t]
            }),
            r = r.map(function(t) {
                return e[t]
            }),
            r[0].thisNews && 2 == r[0].thisNews.contentType && (o = "top")) : (r = "home" != s ? e[s] : "",
            r.thisNews && 2 == r.thisNews.contentType && (o = "top")),
            Q.initial(r, o, a))
        }
        var r = n(35)
          , o = i(r)
          , s = n(24)
          , u = i(s)
          , c = n(36)
          , l = i(c)
          , d = n(34)
          , p = i(d)
          , f = n(62)
          , h = i(f);
        n(343),
        n(345),
        n(196);
        var m = n(353)
          , v = i(m)
          , g = n(355)
          , I = n(326)
          , T = i(I)
          , w = n(511)
          , _ = i(w)
          , S = n(200)
          , E = i(S)
          , P = n(515)
          , y = i(P)
          , O = n(521)
          , A = i(O)
          , b = n(526)
          , L = n(174)
          , C = i(L)
          , N = n(536)
          , D = i(N)
          , k = n(537)
          , M = i(k)
          , R = n(538)
          , x = i(R)
          , j = n(539)
          , U = i(j)
          , V = n(540)
          , H = i(V)
          , G = n(541)
          , W = i(G)
          , B = n(545)
          , $ = n(19)
          , q = n(546)
          , z = i(q)
          , F = ((0,
        $.isTestHost)() || (0,
        $.isLocalHost)(),
        (0,
        g.createApp)())
          , Y = F.app
          , K = F.router
          , J = F.store;
        window.__INITIAL_STATE__ && (J.replaceState(window.__INITIAL_STATE__),
        document.getElementById("initialState") && document.body.removeChild(document.getElementById("initialState")),
        delete window.__INITIAL_STATE__),
        (0,
        W.default)(),
        h.default.directive(C.default.id, C.default.definition),
        h.default.directive(D.default.id, D.default.definition),
        h.default.directive(M.default.id, M.default.definition),
        h.default.directive(x.default.id, x.default.definition),
        h.default.directive(H.default.id, H.default.definition),
        h.default.directive(U.default.id, U.default.definition),
        h.default.use(v.default),
        h.default.prototype.$toast = new h.default(T.default).$mount(),
        h.default.prototype.$goToApp = new h.default(_.default).$mount();
        var X = h.default.prototype.$pageShell = new h.default(E.default).$mount()
          , Q = h.default.prototype.$footerBar = new h.default((0,
        p.default)({}, y.default, {
            store: J
        })).$mount();
        if (document.body.appendChild(X.$el),
        document.body.appendChild(Q.$el),
        !(0,
        $.isHmCards)()) {
            var Z = h.default.prototype.$floatWindow = new h.default((0,
            p.default)({}, A.default, {
                store: J
            })).$mount()
              , ee = window.location.pathname;
            ee.startsWith("/mediaDetail") || ee.startsWith("/quick") || ee.startsWith("/live") || document.body.appendChild(Z.$el)
        }
        h.default.prototype.$track = b.track,
        h.default.mixin({
            beforeRouteLeave: function(e, t, n) {
                this.$goToApp.show && this.$goToApp.destroy(),
                n()
            },
            beforeRouteUpdate: function(e, t, n) {
                var i = this;
                if (e.path == t.path)
                    return n();
                var r = this.$options
                  , o = r.asyncData
                  , s = r.shareKey
                  , u = r.head
                  , c = this.mountVote;
                return o ? n(o({
                    store: this.$store,
                    route: e
                }).then(function() {
                    if (c && c(),
                    s && ("home" == s ? i.$store.dispatch("common/INIT_SHARE", {
                        home: !0
                    }) : i.$store.dispatch(s + "/INIT_SHARE")),
                    u) {
                        var e = u.call(i)
                          , t = e.title
                          , n = e.keywords
                          , r = e.description;
                        document.title = t,
                        document.getElementsByName("keywords").content = n,
                        document.getElementsByName("description").content = r || "触电新闻"
                    }
                    a(i)
                })) : n()
            },
            beforeRouteEnter: function(e, t, n) {
                n(a)
            },
            mounted: function() {
                var e = this.$options.shareKey;
                e && ("home" == e ? this.$store.dispatch("common/INIT_SHARE", {
                    home: !0
                }) : this.$store.dispatch(e + "/INIT_SHARE"))
            }
        }),
        K.onReady((0,
        l.default)(o.default.mark(function e() {
            var t;
            return o.default.wrap(function(e) {
                for (; ; )
                    switch (e.prev = e.next) {
                    case 0:
                        return K.beforeResolve(function(e, t, n) {
                            var i = K.getMatchedComponents(e)
                              , a = K.getMatchedComponents(t)
                              , r = !1
                              , s = i.filter(function(e, t) {
                                return !r && (r = a[t] !== e),
                                r
                            });
                            return s.length ? (X.begin(),
                            J.commit("common/SET_SHARE_DATA", {
                                query: e.query
                            }),
                            u.default.all(s.map(function() {
                                var t = (0,
                                l.default)(o.default.mark(function t(n) {
                                    return o.default.wrap(function(t) {
                                        for (; ; )
                                            switch (t.prev = t.next) {
                                            case 0:
                                                if (!n.asyncData) {
                                                    t.next = 6;
                                                    break
                                                }
                                                return t.next = 4,
                                                (0,
                                                z.default)(e, J);
                                            case 4:
                                                return t.next = 6,
                                                n.asyncData({
                                                    store: J,
                                                    route: e
                                                });
                                            case 6:
                                                return t.abrupt("return", void 0);
                                            case 7:
                                            case "end":
                                                return t.stop()
                                            }
                                    }, t, void 0)
                                }));
                                return function(e) {
                                    return t.apply(this, arguments)
                                }
                            }())).then(function() {
                                return X.end(),
                                n()
                            }).catch(function(e) {
                                return X.end(),
                                n((0,
                                B.handleErrorUrl)(e))
                            })) : (J.commit("common/SET_SHARE_DATA", {
                                query: e.query
                            }),
                            n())
                        }),
                        e.prev = 2,
                        e.next = 5,
                        J.dispatch("common/GET_APP_GLOBAL_CONFIG");
                    case 5:
                        e.next = 10;
                        break;
                    case 7:
                        e.prev = 7,
                        e.t0 = e.catch(2);
                    case 10:
                        if (J.state.common.showView) {
                            e.next = 26;
                            break
                        }
                        return X.begin(),
                        t = K.getMatchedComponents(K.currentRoute),
                        J.commit("common/SET_SHARE_DATA", {
                            query: K.currentRoute.query
                        }),
                        e.prev = 15,
                        e.next = 18,
                        u.default.all(t.map(function() {
                            var e = (0,
                            l.default)(o.default.mark(function e(t) {
                                return o.default.wrap(function(e) {
                                    for (; ; )
                                        switch (e.prev = e.next) {
                                        case 0:
                                            if (!t.asyncData) {
                                                e.next = 5;
                                                break
                                            }
                                            return e.next = 3,
                                            (0,
                                            z.default)(K.currentRoute, J);
                                        case 3:
                                            return e.next = 5,
                                            t.asyncData({
                                                store: J,
                                                route: K.currentRoute
                                            });
                                        case 5:
                                            return e.abrupt("return", void 0);
                                        case 6:
                                        case "end":
                                            return e.stop()
                                        }
                                }, e, void 0)
                            }));
                            return function(t) {
                                return e.apply(this, arguments)
                            }
                        }()));
                    case 18:
                        e.next = 24;
                        break;
                    case 20:
                        e.prev = 20,
                        e.t1 = e.catch(15),
                        K.replace((0,
                        B.handleErrorUrl)(e.t1));
                    case 24:
                        e.next = 28;
                        break;
                    case 26:
                        return e.next = 28,
                        (0,
                        z.default)(K.currentRoute, J);
                    case 28:
                        Y.$mount("#app");
                    case 29:
                    case "end":
                        return e.stop()
                    }
            }, e, void 0, [[2, 7], [15, 20]])
        })))
    },
    355: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a() {
            var e = (0,
            c.createRouter)()
              , t = (0,
            l.createStore)();
            return (0,
            d.sync)(t, e),
            {
                app: new o.default({
                    router: e,
                    store: t,
                    render: function(e) {
                        return e(u.default)
                    }
                }),
                router: e,
                store: t
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.createApp = a;
        var r = n(62)
          , o = i(r);
        n(356);
        var s = n(357)
          , u = i(s)
          , c = n(372)
          , l = n(94)
          , d = n(463)
          , p = n(464)
          , f = i(p)
          , h = n(19)
          , m = i(h);
        n(196),
        n(465),
        o.default.prototype.$utils = m.default,
        o.default.mixin(f.default),
        o.default.config.ignoredElements = ["wx-open-launch-weapp"]
    },
    357: function(e, t, n) {
        "use strict";
        function i(e) {
            n(358),
            n(359)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(360)
          , r = n.n(a)
          , o = n(371)
          , s = n(33)
          , u = i
          , c = s(r.a, o.a, u, "data-v-09aad170", null);
        t.default = c.exports
    },
    358: function(e, t) {},
    359: function(e, t) {},
    360: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(34)
          , r = i(a)
          , o = n(172)
          , s = n(361)
          , u = i(s)
          , c = n(370)
          , l = i(c);
        t.default = {
            name: "app",
            computed: (0,
            r.default)({}, (0,
            o.mapGetters)("common", {
                appGlobalConfig: "appGlobalConfig"
            }), {
                showView: function() {
                    return this.$store.state.common.showView
                }
            }),
            created: function() {
                this.appGlobalConfig && this.appGlobalConfig.isBlackWhiteTheme && document.body.parentElement.classList.add("g-theme-black-white")
            },
            mounted: function() {
                this.$store.commit("common/SET_SHOW_VIEW", !0),
                this.$pageShell.end(),
                this.bindScroll(),
                (0,
                l.default)()
            },
            methods: {
                bindScroll: function() {
                    this.scrollEvent = (0,
                    u.default)(this.handleScroll, 100),
                    window.addEventListener("scroll", this.scrollEvent, !1)
                },
                handleScroll: function(e) {
                    this.$store.commit("common/UPDATE_SCROLL_EVENT", e)
                }
            }
        }
    },
    370: function(e, t, n) {
        "use strict";
        function i() {
            var e = window.location.pathname.split("/")[1];
            return !!r[e]
        }
        function a() {
            if (i() && !o) {
                var e = /([http|https]:\/\/[a-zA-Z0-9\_\.]+\.baidu\.com)/gi
                  , t = window.location.href.split("?")[0]
                  , n = window.location.protocol.split(":")[0]
                  , a = encodeURIComponent(document.referrer);
                if (!e.test(t)) {
                    var r = ("https" == n ? "https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif" : "//api.share.baidu.com/s.gif") + "?l=" + t;
                    a && (r += "&r=" + a);
                    (new Image).src = r
                }
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = {
            article: !0,
            video: !0,
            news: !0,
            gallery: !0,
            images: !0,
            setNewsTopic: !0,
            newsTopic: !0,
            videoTopic: !0
        }
          , o = !0;
        t.default = a
    },
    371: function(e, t, n) {
        "use strict";
        var i = function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("div", {
                attrs: {
                    id: "app"
                }
            }, [n("router-view", {
                staticClass: "view",
                attrs: {
                    name: "pageShell"
                }
            }), e.showView ? n("router-view", {
                staticClass: "view",
                attrs: {
                    id: "docView"
                }
            }) : e._e()], 1)
        }
          , a = []
          , r = {
            render: i,
            staticRenderFns: a
        };
        t.a = r
    },
    372: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a() {
            var e = new u.default({
                mode: "history",
                scrollBehavior: function(e, t, n) {
                    return n || {
                        y: 0
                    }
                },
                routes: [{
                    path: "/news/:id/:childId?",
                    components: {
                        default: p,
                        pageShell: (0,
                        d.default)({
                            isHome: !0
                        })
                    },
                    meta: {
                        scrollKey: "home",
                        store: "channels"
                    }
                }, {
                    path: "/channel/:id",
                    components: {
                        default: p,
                        pageShell: (0,
                        d.default)({
                            isChannel: !0
                        })
                    },
                    meta: {
                        scrollKey: "home",
                        store: "channels",
                        isChannel: !0,
                        noHeader: !0
                    }
                }, {
                    path: "/more",
                    component: h,
                    store: "channels"
                }, {
                    path: "/article/:sid",
                    components: {
                        default: f,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "news"
                    }
                }, {
                    path: "/video/:sid",
                    components: {
                        default: f,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "news"
                    }
                }, {
                    path: "/gallery/:sid",
                    components: {
                        default: f,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "news"
                    }
                }, {
                    path: "/liveRich/:mediaLiveSid",
                    components: {
                        default: A,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "live"
                    }
                }, {
                    path: "/newsTopic/:topicId",
                    components: {
                        default: I,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "newsTopic"
                    }
                }, {
                    path: "/setNewsTopic/:topicId",
                    components: {
                        default: T,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "setNewsTopic"
                    }
                }, {
                    path: "/liveTopic/:topicId",
                    components: {
                        default: w,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "liveTopic"
                    }
                }, {
                    path: "/liveOb/:mediaLiveSid",
                    components: {
                        default: A,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "live",
                        wechatAuth: !1
                    }
                }, {
                    path: "/livePortrait/:mediaLiveSid",
                    components: {
                        default: A,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "live",
                        wechatAuth: !1
                    }
                }, {
                    path: "/live/:mediaLiveSid",
                    components: {
                        default: A,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "live"
                    }
                }, {
                    path: "/m-hotline-screen/satisfied/:mediaLiveSid?",
                    components: {
                        default: j,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "live",
                        wechatAuth: !1
                    }
                }, {
                    path: "/m-hotline-screen/:mediaLiveSid?",
                    components: {
                        default: x,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "live",
                        wechatAuth: !1
                    }
                }, {
                    path: "/d-hotline-screen-l/:mediaLiveSid?",
                    components: {
                        default: U,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "live",
                        wechatAuth: !1
                    }
                }, {
                    path: "/d-hotline-screen-r/:mediaLiveSid?",
                    components: {
                        default: V,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "live",
                        wechatAuth: !1
                    }
                }, {
                    path: "/program/:programId(\\d+)/:type(\\d+)?/:objId(\\d+)?",
                    components: {
                        default: g,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "program"
                    }
                }, {
                    path: "/malldetail/:categoryPk/:goodsPk",
                    components: {
                        default: _,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "mallDetail"
                    }
                }, {
                    path: "/videoTopic/:topicId",
                    components: {
                        default: S,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "videoTopic"
                    }
                }, {
                    path: "/gambit/:topicPk",
                    components: {
                        default: E,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "gambit"
                    }
                }, {
                    path: "/gambitVote/:topicPk",
                    components: {
                        default: P,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "gambitVote"
                    }
                }, {
                    path: "/worldLive",
                    components: {
                        default: y,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "worldLive"
                    }
                }, {
                    path: "/mediaDetail/:mediaId",
                    components: {
                        default: O,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "mediaDetail"
                    }
                }, {
                    path: "/mediaAbout/:mediaId",
                    components: {
                        default: G,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "mediaDetail"
                    }
                }, {
                    path: "/pluginDetail/:pluginPk(\\d+)/:pluginType(\\d+)",
                    components: {
                        default: b,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "pluginDetail"
                    }
                }, {
                    path: "/rule/:type",
                    components: {
                        default: N,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "rule"
                    }
                }, {
                    path: "/agreement/:type",
                    components: {
                        default: D,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "agreement"
                    }
                }, {
                    path: "/baoliao/:sid",
                    components: {
                        default: k,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "baoliao"
                    }
                }, {
                    path: "/simulcastDetail/:tvProgramPk",
                    components: {
                        default: M,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "simulcastDetail"
                    }
                }, {
                    path: "/consultGov/:questionPk",
                    components: {
                        default: H,
                        pageShell: (0,
                        d.default)()
                    },
                    meta: {
                        scrollKey: "detail",
                        store: "consultGov"
                    }
                }, {
                    path: "/player",
                    component: R
                }, {
                    path: "/wxauth",
                    component: L
                }, {
                    path: "/wxpay",
                    component: C
                }, {
                    path: "/",
                    redirect: "/news/recomend"
                }, {
                    path: "/error",
                    component: m
                }, {
                    path: "/empty",
                    component: v
                }, {
                    path: "*",
                    component: m
                }]
            });
            return e.beforeEach(function(e, t, n) {
                if ((0,
                c.isWeixin)() && e.meta && e.meta.wechatAuth && -1 == document.cookie.indexOf("weixinAuth") && !e.query.code) {
                    var i = window
                      , a = i.location
                      , r = encodeURIComponent("http://m.itouchtv.cn/wxauth?url=" + a.protocol + "//" + a.host + a.pathname)
                      , o = encodeURIComponent("https://m.itouchtv.cn" + a.pathname)
                      , s = "m.itouchtv.cn" !== a.host ? r : o
                      , u = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcae29d5033bbc074&redirect_uri=" + s + "&response_type=code&scope=snsapi_userinfo&state=" + (new Date).getTime() + "&connect_redirect=1#wechat_redirect";
                    a.href = u
                } else
                    n()
            }),
            e
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.createRouter = a;
        var r = n(62)
          , o = i(r)
          , s = n(373)
          , u = i(s)
          , c = n(19)
          , l = n(380)
          , d = i(l);
        o.default.use(u.default);
        var p = function() {
            return n.e(106).then(n.bind(null, 548))
        }
          , f = function() {
            return n.e(92).then(n.bind(null, 549))
        }
          , h = function() {
            return n.e(107).then(n.bind(null, 550))
        }
          , m = function() {
            return n.e(110).then(n.bind(null, 551))
        }
          , v = function() {
            return n.e(117).then(n.bind(null, 552))
        }
          , g = function() {
            return n.e(96).then(n.bind(null, 553))
        }
          , I = function() {
            return n.e(105).then(n.bind(null, 554))
        }
          , T = function() {
            return n.e(93).then(n.bind(null, 555))
        }
          , w = function() {
            return n.e(111).then(n.bind(null, 556))
        }
          , _ = function() {
            return n.e(114).then(n.bind(null, 557))
        }
          , S = function() {
            return n.e(104).then(n.bind(null, 558))
        }
          , E = function() {
            return n.e(102).then(n.bind(null, 559))
        }
          , P = function() {
            return n.e(101).then(n.bind(null, 560))
        }
          , y = function() {
            return n.e(103).then(n.bind(null, 561))
        }
          , O = function() {
            return n.e(94).then(n.bind(null, 562))
        }
          , A = function() {
            return n.e(108).then(n.bind(null, 563))
        }
          , b = function() {
            return n.e(100).then(n.bind(null, 564))
        }
          , L = function() {
            return n.e(112).then(n.bind(null, 565))
        }
          , C = function() {
            return n.e(109).then(n.bind(null, 566))
        }
          , N = function() {
            return n.e(97).then(n.bind(null, 567))
        }
          , D = function() {
            return n.e(115).then(n.bind(null, 568))
        }
          , k = function() {
            return n.e(98).then(n.bind(null, 569))
        }
          , M = function() {
            return n.e(95).then(n.bind(null, 570))
        }
          , R = function() {
            return n.e(113).then(n.bind(null, 571))
        }
          , x = function() {
            return n.e(89).then(n.bind(null, 572))
        }
          , j = function() {
            return n.e(88).then(n.bind(null, 573))
        }
          , U = function() {
            return n.e(91).then(n.bind(null, 574))
        }
          , V = function() {
            return n.e(90).then(n.bind(null, 575))
        }
          , H = function() {
            return n.e(99).then(n.bind(null, 576))
        }
          , G = function() {
            return n.e(116).then(n.bind(null, 577))
        }
    },
    380: function(e, t, n) {
        "use strict";
        function i() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
              , t = e.isHome
              , n = e.isChannel;
            return {
                name: (t && "Home" || n && "Channel" || "Article") + "-pageShell-view",
                render: function(e) {
                    return e(r.default, {
                        props: {
                            isHome: t,
                            isChannel: n
                        }
                    })
                }
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(381)
          , r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(a);
        t.default = i
    },
    381: function(e, t, n) {
        "use strict";
        function i(e) {
            n(382)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(383)
          , r = n.n(a)
          , o = n(389)
          , s = n(33)
          , u = i
          , c = s(r.a, o.a, u, null, null);
        t.default = c.exports
    },
    382: function(e, t) {},
    383: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(200)
          , a = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(i);
        t.default = {
            name: "articlePageShell",
            props: {
                isHome: {
                    type: Boolean
                },
                isChannel: {
                    type: Boolean
                }
            },
            components: {
                PageShell: a.default
            },
            data: function() {
                return {
                    show: !0
                }
            },
            mounted: function() {
                this.show = !1
            },
            methods: {
                disableTouch: function(e) {
                    e.preventDefault()
                }
            }
        }
    },
    384: function(e, t) {},
    385: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = {
            name: "PageShell",
            props: {
                defaultShow: {
                    type: Boolean
                },
                defaultIsHome: {
                    type: Boolean
                },
                defaultIsChannel: {
                    type: Boolean
                }
            },
            data: function() {
                return {
                    show: this.defaultShow,
                    isHome: this.defaultIsHome,
                    isChannel: this.defaultIsChannel
                }
            },
            methods: {
                begin: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                      , t = e.isHome;
                    return this.isHome = t || !1,
                    this.show = !0,
                    this
                },
                end: function() {
                    return this.show = !1,
                    this
                },
                disableTouch: function(e) {
                    e.preventDefault()
                }
            }
        }
    },
    386: function(e, t, n) {
        "use strict";
        var i = function() {
            var e = this
              , t = e.$createElement
              , i = e._self._c || t;
            return i("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.show,
                    expression: "show"
                }],
                staticClass: "body-placeholder",
                attrs: {
                    id: "bodyShell"
                },
                on: {
                    touchStart: function(t) {
                        e.disableTouch(t)
                    },
                    touchmove: function(t) {
                        e.disableTouch(t)
                    }
                }
            }, [e.isHome ? i("img", {
                staticClass: "img",
                attrs: {
                    src: n(387)
                }
            }) : e.isChannel ? i("img", {
                staticClass: "img",
                attrs: {
                    src: n(388)
                }
            }) : i("img", {
                staticClass: "img"
            })])
        }
          , a = []
          , r = {
            render: i,
            staticRenderFns: a
        };
        t.a = r
    },
    387: function(e, t, n) {
        e.exports = n.p + "images/home_body_706f3739dab72169fb35fa6862004631.png?"
    },
    388: function(e, t, n) {
        e.exports = n.p + "images/channel_body_da8f3b5e67ab101cdce449461b23ac84.png?"
    },
    389: function(e, t, n) {
        "use strict";
        var i = function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return e.show ? n("div", [n("PageShell", {
                attrs: {
                    defaultShow: e.show,
                    defaultIsHome: e.isHome,
                    defaultIsChannel: e.isChannel
                }
            })], 1) : e._e()
        }
          , a = []
          , r = {
            render: i,
            staticRenderFns: a
        };
        t.a = r
    },
    412: function(e, t, n) {
        "use strict";
        (function(e) {
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(t, n, i) {
                var a = "YES" === e.env.ISLOCAL ? "NEWS_APP" : "ITOUCHTV_WEB_M"
                  , r = (new Date).getTime()
                  , s = ""
                  , c = "";
                i && (s = (0,
                o.default)(i),
                c = u.default.stringify(s));
                var d = t + "\n" + n + "\n" + r + "\n" + c;
                return {
                    "Content-Type": "application/json",
                    "X-ITOUCHTV-CLIENT": a,
                    "X-ITOUCHTV-Ca-Timestamp": r,
                    "X-ITOUCHTV-Ca-Signature": u.default.stringify((0,
                    l.default)(d, "HGXimfS2hcAeWbsCW19JQ7PDasYOgg1lY2UWUDVX8nNmwr6aSaFznnPzKrZ84VY1")),
                    "X-ITOUCHTV-Ca-Key": "28778826534697375418351580924221"
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.default = a;
            var r = n(102)
              , o = i(r)
              , s = n(177)
              , u = i(s)
              , c = n(413)
              , l = i(c)
        }
        ).call(t, n(72))
    },
    414: function(e, t, n) {
        "use strict";
        function i(e, t) {
            return !e || !t || e.test(t)
        }
        function a(e) {
            var t = (arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "");
            arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if (i(t, e)) {
                var n = (s.get(e) || 0) + 1;
                if (s.set(e, n),
                !(n < 2))
                    ;
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(180)
          , o = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(r);
        t.default = a;
        var s = new o.default
    },
    427: function(e, t) {
        e.exports = {
            "global-spin-mask": "global-spin-mask_1bjzAhNQ",
            "global-spin-content": "global-spin-content_31Io35o5",
            "no-black": "no-black_2PBLCJwv"
        }
    },
    428: function(e, t, n) {
        e.exports = n.p + "images/loader_0b0f6703f12eecd5ad44dbdddbc8b4e4.gif?"
    },
    429: function(e, t, n) {
        e.exports = n.p + "images/loading2_05992d3434d3589b38a3a5431842d38f.gif?"
    },
    459: function(e, t, n) {
        "use strict";
        function i(e) {
            this.version = "m.itouchtv.cn" === location.host ? e : "t" + e,
            this.hasLocalStorage = !!localStorage,
            this.list = [],
            this.inited = !1,
            this.init = function() {
                if (!this.inited && this.hasLocalStorage) {
                    var e = localStorage.l_v
                      , t = localStorage.l_v_l;
                    t ? this.list = JSON.parse(t) : localStorage.l_v_l = (0,
                    r.default)(this.list),
                    e != this.version && (this.list.map(function(e) {
                        localStorage.removeItem(e)
                    }),
                    localStorage.l_v = this.version),
                    this.inited = !0
                }
            }
            ,
            this.set = function(e, t) {
                if (this.hasLocalStorage) {
                    this.init();
                    try {
                        localStorage[e] = t,
                        -1 === this.list.indexOf(e) && (this.list.push(e),
                        localStorage.l_v_l = (0,
                        r.default)(this.list))
                    } catch (e) {}
                }
            }
            ,
            this.get = function(e) {
                if (this.hasLocalStorage) {
                    this.init();
                    var t = void 0;
                    try {
                        t = localStorage[e]
                    } catch (e) {}
                    return t
                }
            }
            ,
            this.remove = function(e) {
                if (this.hasLocalStorage) {
                    this.init();
                    try {
                        localStorage.removeItem(e),
                        -1 !== this.list.indexOf(e) && this.list.splice(this.list.indexOf(e), 1)
                    } catch (e) {}
                }
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(28)
          , r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(a);
        t.default = new i(.2)
    },
    464: function(e, t, n) {
        "use strict";
        function i(e) {
            var t = e.$options.head;
            if (t)
                return "function" == typeof t ? t.call(e) : t
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = "触电新闻客户端是针对广电媒体深度融合的移动端产品，具备主流视频资讯客户端的产品特征和性能，并对广电行业做了针对性优化，在批量生产短视频、产出优质直播内容和汇聚地方资源方面有明显优势，同时也在自主研发基于数据挖掘的智能推荐系统，通过内容画像、用户画像和实时计算达到千人千面的优质内容推荐。"
          , r = "触电新闻，视频资讯，短视频，新闻直播，移动直播，新闻推荐，新闻定制，广电媒体"
          , o = ["广东卫视社会纵横", "社会纵横", "城事特搜", "一派微视频", "中国南粤古驿道", "广东新闻联播", "小马大哈", "珠江新闻眼", "DV现场", "天眼追击", "直通粤港澳", "南方财经报道", "法案追踪", "中国南派纪录片", "你会怎么做", "廉政观察", "翻译中心", "新闻早高峰", "粤港财富通", "今日财经", "广东体育频道"]
          , s = {
            mounted: function() {
                var e = i(this);
                if (e) {
                    var t = e.title
                      , n = e.keywords
                      , s = e.description
                      , u = e.originMedia;
                    if (document.title = t || "触电新闻 - 湾区资讯服务第一端",
                    document.getElementById("metaKeywords").content = n || r,
                    document.getElementById("metaDescription").content = s || a,
                    u && o.filter(function(e) {
                        return e == u
                    }).length) {
                        var c = document.createElement("link");
                        c.setAttribute("ref", "canonical"),
                        c.setAttribute("href", "http://www.itouchtv.cn" + location.pathname),
                        document.getElementsByTagName("head")[0].appendChild(c),
                        c = null
                    }
                }
            }
        };
        t.default = s
    },
    465: function(e, t, n) {
        "use strict";
        var i = n(62)
          , a = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(i)
          , r = n(466);
        (function(e) {
            if (e && e.__esModule)
                return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e,
            t
        }
        )(r).init({
            Vue: a.default,
            dsn: "https://1975291e991e435eaefc33554ae56f9f@sentry.itouchtv.cn/40",
            sampleRate: .05,
            logErrors: !0
        })
    },
    508: function(e, t) {},
    509: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = {
            center: "center",
            top: "top",
            bottom: "bottom"
        };
        t.default = {
            name: "toast",
            data: function() {
                return {
                    show: !1,
                    message: "加载中",
                    isMask: !1,
                    position: ""
                }
            },
            methods: {
                init: function() {
                    var e = this
                      , t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                      , n = t.message
                      , a = t.timeout
                      , r = t.mask
                      , o = t.position;
                    return this.show && this.destroy(),
                    this.position = i[o] || "center",
                    this.isMask = void 0 === r || r,
                    this.message = n || "加载中",
                    this.timeout = a || 1500,
                    document.body.appendChild(this.$el),
                    this.show = !0,
                    "wait" !== this.timeout && (this.destroyTimeOut = setTimeout(function() {
                        e.destroy()
                    }, this.timeout)),
                    this
                },
                destroy: function() {
                    return this.show = !1,
                    this.destroyTimeOut = clearTimeout(this.destroyTimeOut),
                    this
                }
            }
        }
    },
    510: function(e, t, n) {
        "use strict";
        var i = function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return e.show ? n("div", {
                staticClass: "global-toast-mask"
            }, [n("div", {
                staticClass: "global-toast-message",
                class: e.position
            }, [e._v(e._s(e.message))])]) : e._e()
        }
          , a = []
          , r = {
            render: i,
            staticRenderFns: a
        };
        t.a = r
    },
    511: function(e, t, n) {
        "use strict";
        function i(e) {
            n(512)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(513)
          , r = n.n(a)
          , o = n(514)
          , s = n(33)
          , u = i
          , c = s(r.a, o.a, u, "data-v-c2bd412e", null);
        t.default = c.exports
    },
    512: function(e, t) {},
    513: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(19);
        t.default = {
            name: "goToAppMask",
            data: function() {
                return {
                    show: !1,
                    imgSrc: (0,
                    i.isAndroid)() ? "http://img2-cloud.itouchtv.cn/manual/0330/android.png" : "http://img2-cloud.itouchtv.cn/manual/0330/ios.png"
                }
            },
            methods: {
                handleClick: function() {
                    this.show = !1
                },
                init: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    return this.handleAction(e),
                    this
                },
                destroy: function() {
                    return this.show = !1,
                    this
                },
                handleAction: function(e) {
                    var t = navigator.userAgent.toLowerCase()
                      , n = t.match(/micromessenger/gi)
                      , i = (t.match(/weibo/i),
                    t.match(/mqqbrowser/i),
                    t.match(/ipadqq/i),
                    t.match(/qq/i));
                    if (n || i) {
                        var a = "touchtvnews://com.touchtv.touchtv/openApp?&newsjson=" + e
                          , r = encodeURIComponent(a);
                        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.touchtv.touchtv&android_schema=" + r
                    } else
                        window.setTimeout(function() {
                            window.location.href = "http://www.itouchtv.cn/newsapp/redirect.html?fromSource=share_download&from2=h5bigdata"
                        }, 2e3)
                }
            }
        }
    },
    514: function(e, t, n) {
        "use strict";
        var i = function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return e.show ? n("div", {
                staticClass: "tipsBox",
                on: {
                    click: e.handleClick
                }
            }, [n("div", {
                staticClass: "a"
            }), n("img", {
                staticClass: "b",
                attrs: {
                    src: e.imgSrc
                }
            }), e._m(0)]) : e._e()
        }
          , a = [function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("div", {
                staticClass: "c"
            }, [n("img", {
                staticClass: "img-text",
                attrs: {
                    src: "http://img2-cloud.itouchtv.cn/manual/0330/zhishi.png"
                }
            })])
        }
        ]
          , r = {
            render: i,
            staticRenderFns: a
        };
        t.a = r
    },
    515: function(e, t, n) {
        "use strict";
        function i(e) {
            n(516)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(517)
          , r = n.n(a)
          , o = n(518)
          , s = n(33)
          , u = i
          , c = s(r.a, o.a, u, null, null);
        t.default = c.exports
    },
    516: function(e, t) {},
    517: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(35)
          , r = i(a)
          , o = n(36)
          , s = i(o)
          , u = n(181)
          , c = i(u)
          , l = n(173);
        t.default = {
            name: "footerBar",
            data: function() {
                return {
                    show: !1,
                    hide: !1,
                    onTop: !1,
                    currentNewsdata: {},
                    updateCnt: 1,
                    hottestList: [],
                    isPc: this.$utils.os().isPc,
                    pcStyle: {
                        width: "750px",
                        transform: "translateX(-50%)",
                        left: "50%"
                    }
                }
            },
            computed: {
                HottestList: function() {
                    return this.$store.getters["common/getHottestList"] || []
                },
                swiperOption: function() {
                    var e = this
                      , t = this.hottestList;
                    return {
                        initialSlide: 0,
                        loop: t && t.length,
                        setWrapperSize: !0,
                        mousewheelControl: !0,
                        observeParents: !0,
                        lazyLoading: !0,
                        autoplay: 2500,
                        pagination: ".swiper-pagination",
                        on: {
                            resize: function() {
                                e.$refs.footbarSwiper.swiper.update(!0)
                            }
                        }
                    }
                }
            },
            beforeMount: function() {
                this.$utils.isHmCards() && this.$store.commit("common/SET_FOOTER_BAR_HIDE_IN_SESSIONSTORAGE")
            },
            mounted: function() {
                var e = this;
                setTimeout(function() {
                    (0,
                    c.default)(document.querySelectorAll(".footbar-container .flex-right .close")).forEach(function(t) {
                        t.onclick = e.handleClose
                    })
                }, 1e3)
            },
            beforeDestroy: function() {
                this.mySwiper && this.mySwiper.destroy()
            },
            methods: {
                createBigdata: function(e) {
                    var t = {
                        operator_code: "00003"
                    }
                      , n = {
                        newsList: [{
                            sid: e.sid
                        }],
                        Module: 85
                    }
                      , i = this.$track(t, n);
                    this.$store.dispatch("common/POST_BIGDATA_LOG", i)
                },
                initial: function() {
                    function e(e, n, i) {
                        return t.apply(this, arguments)
                    }
                    var t = (0,
                    s.default)(r.default.mark(function e(t, n, i) {
                        var a, o = this;
                        return r.default.wrap(function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    if (!(a = sessionStorage.getItem("FooterBar_isHide"))) {
                                        e.next = 4;
                                        break
                                    }
                                    return this.handleClose(),
                                    e.abrupt("return");
                                case 4:
                                    if (this.show = !1,
                                    e.prev = 5,
                                    i) {
                                        e.next = 9;
                                        break
                                    }
                                    return e.next = 9,
                                    this.$store.dispatch("common/GET_HOTTEST_NEWS", 5);
                                case 9:
                                    Array.isArray(t) && t.length > 0 ? this.currentNewsdata = t[0] : this.currentNewsdata = t,
                                    this.hottestList = this.HottestList,
                                    "top" == n ? this.top() : "none" === n || this.bottom(),
                                    this.hottestList.forEach(function(e) {
                                        e.isRelative && o.createBigdata(e)
                                    }),
                                    e.next = 18;
                                    break;
                                case 15:
                                    e.prev = 15,
                                    e.t0 = e.catch(5);
                                case 18:
                                case "end":
                                    return e.stop()
                                }
                        }, e, this, [[5, 15]])
                    }));
                    return e
                }(),
                handleClose: function() {
                    this.show = !1,
                    this.$store.commit("common/SET_LIVEREVIEW_FOCUS_BOTTOM_SPACE"),
                    this.$store.commit("common/SET_FOOTER_BAR_VISIBLE", {
                        status: !1
                    })
                },
                handleShow: function() {
                    return this.show = !0,
                    this
                },
                handleIsHide: function(e) {
                    this.hide = e
                },
                top: function() {
                    return this.onTop || (this.onTop = !0),
                    this.show = !0,
                    this
                },
                bottom: function() {
                    return this.onTop && (this.onTop = !1),
                    this.show = !0,
                    this
                },
                setPosition: function(e) {
                    "top" == e ? this.top() : this.bottom()
                },
                updateCurrent: function(e) {
                    this.currentNewsdata = e,
                    this.updateCnt += 1
                },
                getCoverUrlN: function(e) {
                    var t = (0,
                    l.getCoverUrl)(e);
                    return t && this.$utils.imgManage(t, 30, 50)
                },
                handleResize: function() {
                    window.addEventListener("resize", function() {}, !1)
                }
            }
        }
    },
    518: function(e, t, n) {
        "use strict";
        var i = function() {
            var e = this
              , t = e.$createElement
              , i = e._self._c || t;
            return i("transition", {
                attrs: {
                    name: "fade"
                }
            }, [e.show && !e.hide ? i("div", {
                class: {
                    "footbar-container": !0,
                    top: e.onTop,
                    bottom: !e.onTop
                },
                style: e.isPc ? e.pcStyle : {}
            }, [i("div", {
                directives: [{
                    name: "swiper",
                    rawName: "v-swiper:mySwiper",
                    value: e.swiperOption,
                    expression: "swiperOption",
                    arg: "mySwiper"
                }],
                ref: "footbarSwiper"
            }, [i("div", {
                staticClass: "swiper-wrapper"
            }, [i("div", {
                staticClass: "swiper-slide"
            }, [i("div", {
                staticClass: "container"
            }, [i("div", {
                staticClass: "flex-left"
            }, [i("img", {
                staticClass: "logo",
                attrs: {
                    src: n(519)
                }
            }), i("div", {
                staticClass: "text-container"
            }, [i("img", {
                staticClass: "title",
                attrs: {
                    src: n(520)
                }
            }), i("div", {
                staticClass: "slogan"
            }, [e._v("湾区资讯服务第一端")])])]), i("div", {
                staticClass: "flex-right"
            }, [i("div", {
                directives: [{
                    name: "gotoApp",
                    rawName: "v-gotoApp",
                    value: {
                        data: e.currentNewsdata || {},
                        bigDataOp: 6
                    },
                    expression: "{ data: currentNewsdata || {}, bigDataOp: 6 }"
                }],
                key: e.updateCnt,
                staticClass: "open-app-button"
            }, [e._v("打开")]), i("div", {
                staticClass: "close",
                on: {
                    click: e.handleClose
                }
            })])])]), e._l(e.hottestList, function(t, n) {
                return i("div", {
                    key: n,
                    staticClass: "swiper-slide"
                }, [i("div", {
                    staticClass: "container relaNews"
                }, [i("div", {
                    staticClass: "flex-left"
                }, [t.coverUrl ? i("img", {
                    staticClass: "logo",
                    attrs: {
                        src: e.getCoverUrlN(t.coverUrl)
                    }
                }) : e._e(), i("div", {
                    staticClass: "text-container"
                }, [i("div", {
                    staticClass: "slogan"
                }, [e._v(e._s(t.title))])])]), i("div", {
                    staticClass: "flex-right"
                }, [i("div", {
                    directives: [{
                        name: "gotoApp",
                        rawName: "v-gotoApp",
                        value: {
                            type: "news",
                            data: t,
                            bigDataOp: 7,
                            bigDataExtList: t.isRelative ? [["00004", void 0, {
                                newsId: t.sid,
                                Module: 85
                            }]] : void 0
                        },
                        expression: "{\n                                type: 'news',\n                                data: list,\n                                bigDataOp: 7,\n                                bigDataExtList: list.isRelative ? [['00004', undefined, { newsId: list.sid, Module: 85 }]] : undefined\n                            }"
                    }],
                    staticClass: "open-app-button"
                }, [e._v("打开")]), i("div", {
                    staticClass: "close",
                    on: {
                        click: e.handleClose
                    }
                })])])])
            })], 2), i("div", {
                staticClass: "swiper-pagination swiper-pagination-bullets"
            })])]) : e._e()])
        }
          , a = []
          , r = {
            render: i,
            staticRenderFns: a
        };
        t.a = r
    },
    519: function(e, t, n) {
        e.exports = n.p + "images/logo_0b15d798f0a2b805cb09a770cc00c49d.png?"
    },
    520: function(e, t, n) {
        e.exports = n.p + "images/logo_text_380623d84f109a5a85016667fd7e78db.png?"
    },
    521: function(e, t, n) {
        "use strict";
        function i(e) {
            n(522)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(523)
          , r = n.n(a)
          , o = n(524)
          , s = n(33)
          , u = i
          , c = s(r.a, o.a, u, null, null);
        t.default = c.exports
    },
    522: function(e, t) {},
    523: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(34)
          , a = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(i)
          , r = n(174)
          , o = n(242);
        t.default = {
            name: "floatWindow",
            data: function() {
                return {
                    show: !1,
                    coverUrl: null,
                    target: null,
                    showIcon: !1,
                    goHidden: !1,
                    goShow: !1,
                    styleRight: 0,
                    bigDataStr: "",
                    bigdataPost: "",
                    bigdataTarget: "",
                    targetType: 0,
                    TARGET_TYPE: [19]
                }
            },
            mounted: function() {
                var e = this;
                this.inited = !1,
                this.isClosed = !1,
                this.floatBody = this.$refs.floatBody,
                this.$store.dispatch("common/GET_ACTIVITY_INFO").then(function(t) {
                    t && e.init({
                        target: t.target,
                        coverUrl: t.logoUrl,
                        targetType: t.targetType
                    })
                })
            },
            methods: {
                init: function() {
                    var e = this
                      , t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                      , n = t.target
                      , i = t.coverUrl
                      , a = t.targetType;
                    this.coverUrl = i ? this.$utils.imgManage(i, 64, 64, "", "") : null,
                    this.target = n || null,
                    this.targetType = a,
                    this.show = !0,
                    setTimeout(function() {
                        e.goHidden = !0
                    }, 6e3),
                    !this.inited && this.floatBody.addEventListener("webkitAnimationEnd", this.animationEnd),
                    this.inited = !0
                },
                destroy: function() {
                    this.show = !1,
                    this.isClosed = !0
                },
                handleClose: function() {
                    this.destroy()
                },
                handleClick: function() {
                    var e = this
                      , t = {
                        operator_code: "00046",
                        operator_list: "1"
                    }
                      , n = this.$track(t);
                    this.$store.dispatch("common/POST_BIGDATA_LOG", n).then(function() {
                        e.jump()
                    }).catch(function() {
                        e.jump()
                    })
                },
                handleClickIcon: function() {
                    this.showIcon = !1,
                    this.goHidden = !1,
                    this.goShow = !0
                },
                jump: function() {
                    if (23 === this.targetType) {
                        if (this.target && this.target.startsWith("touchtvnews://")) {
                            var e = JSON.parse(new URL(this.target).searchParams.get("newsjson"))
                              , t = (0,
                            o.openAppType2h5link)({
                                openAppType: e.openAppType,
                                newsjsonObj: e
                            });
                            if (t)
                                return window.location.href = t,
                                t;
                            (0,
                            r.handleGoToApp)(e.openAppType, (0,
                            a.default)({}, e, {
                                internalLink: this.target
                            })).then(function(e) {
                                "function" == typeof e ? e() : location.href = e
                            })
                        }
                        return null
                    }
                    var n = {};
                    try {
                        n = 0 != this.targetType ? JSON.parse(this.target) : this.target
                    } catch (e) {}
                    0 == this.targetType ? window.location.href = this.target : 1 == this.targetType ? window.location.href = "/article/" + n.sid : 2 == this.targetType ? window.location.href = "/liveOb/" + n.id : 3 == this.targetType ? window.location.href = "/newsTopic/" + n.topicId : 4 == this.targetType ? window.location.href = "/liveTopic/" + n.topicId : 5 == this.targetType ? window.location.href = "/setNewsTopic/" + n.topicId : 7 == this.targetType && this.target ? window.location.href = this.target : 12 == this.targetType && (window.location.href = "/channel/" + n.channelId)
                },
                animationEnd: function() {
                    this.showIcon = !0,
                    !this.styleRight && (this.styleRight = "-64px"),
                    this.goHidden = !1,
                    this.goShow = !1
                }
            }
        }
    },
    524: function(e, t, n) {
        "use strict";
        var i = function() {
            var e = this
              , t = e.$createElement
              , i = e._self._c || t;
            return i("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.show,
                    expression: "show"
                }],
                staticClass: "float-container"
            }, [i("img", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.showIcon,
                    expression: "showIcon"
                }],
                staticClass: "out-icon",
                attrs: {
                    src: n(525)
                },
                on: {
                    click: e.handleClickIcon
                }
            }), i("div", {
                ref: "floatBody",
                class: {
                    body: !0,
                    goShow: e.goShow,
                    goHidden: e.goHidden
                },
                style: {
                    right: e.styleRight
                }
            }, [e.coverUrl ? i("div", [e.TARGET_TYPE.indexOf(+e.targetType) < 0 ? i("div", {
                staticClass: "img",
                style: {
                    backgroundImage: "url(" + e.coverUrl + ")"
                },
                on: {
                    click: e.handleClick
                }
            }) : i("div", {
                directives: [{
                    name: "gotoApp",
                    rawName: "v-gotoApp",
                    value: {
                        data: {}
                    },
                    expression: "{ data: {} }"
                }],
                staticClass: "img",
                style: {
                    backgroundImage: "url(" + e.coverUrl + ")"
                }
            })]) : e._e(), i("div", {
                staticClass: "close",
                on: {
                    click: e.handleClose
                }
            })])])
        }
          , a = []
          , r = {
            render: i,
            staticRenderFns: a
        };
        t.a = r
    },
    525: function(e, t, n) {
        e.exports = n.p + "images/btn_icon_out_be2712cfc43a9458922b6cb5b2be8a91.png?"
    },
    526: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e, t) {
            t = r(t);
            var i = n(328)
              , a = n(534)
              , o = n(535);
            return i.encrypt(e, a.parse(t), {
                iv: a.parse("0102030405060708"),
                padding: o
            }).toString()
        }
        function r(e) {
            return e = (0,
            g.default)(e).toString(),
            e.substring(8, 24)
        }
        function o(e, t) {
            return !!e && e.split("$").length - 1 == t
        }
        function s(e) {
            var t = e.code
              , n = e.newsList
              , i = e.channelId
              , a = e.newsId
              , r = e.readTime
              , s = e.readPer
              , u = e.bigDataLogInfo
              , c = e.Module
              , l = e.newsTopicId
              , d = e.newsTopicType
              , p = e.plId
              , f = e.programId
              , h = e.listStatus
              , m = e.playStatus
              , v = e.listId
              , g = c || j;
            if (t === x.VIEW) {
                var I = ""
                  , T = n ? n.length : 0;
                return n.map(function(e, t) {
                    I += t !== T - 1 ? g + "$" + (i || "0") + "$" + e.sid + (e.bigDataLogInfo ? "$" + e.bigDataLogInfo : "") + "^" : g + "$" + (i || "0") + "$" + e.sid + (e.bigDataLogInfo ? "$" + e.bigDataLogInfo : "")
                }),
                I
            }
            return t === x.READ ? (p || "") + "$" + (i || "0") + "$" + a + "$" + r + "$" + s + (u ? "$" + u : "$$$$") + "$" + l + "$" + d : t == x.PROGRAM_READ ? (p || "") + "$" + (i || "0") + "$" + v + "$" + f + "$" + r + "$" + s + "$" + m + (u ? "$" + u : "$$$$") + "$" + h : t == x.CLICK ? g + "$" + (i || "0") + "$" + a + (u && o(u, 4) ? u : "$$$$") + "$$" : g + "$" + i + "$" + a + "$" + u || "$$$"
        }
        function u() {
            function e(e) {
                return e < 10 ? "0" + e : e
            }
            var t = new Date
              , n = t.getFullYear()
              , i = t.getMonth() + 1
              , a = t.getDate()
              , r = t.getHours()
              , o = t.getMinutes()
              , s = t.getSeconds();
            return "" + n + e(i) + e(a) + e(r) + e(o) + e(s)
        }
        function c(e, t) {
            var n = {
                product_id: C,
                logTime: u(),
                os: S || null,
                os_version: E || null,
                rom: e.rom || null,
                model: "",
                deviceId: w.default.get("X-ITOUCHTV-DEVICE-ID") || null,
                canals: N,
                client_version: V || null,
                deviceType: L,
                longitude: e.longitude || null,
                latitude: e.latitude || null,
                province: e.province || null,
                city: e.city || null,
                isRoot: D,
                network_type: e.network_type || "0",
                carrier_operator: k,
                mac: M,
                ip: R,
                resolution: U,
                userId: w.default.get("X-ITOUCHTV-USER-ID") || null,
                server_version: H,
                operator_code: e.operator_code || null,
                operator_list: e.operator_list || null
            };
            !n.operator_list && n.operator_code && t && (n.operator_list = s((0,
            m.default)({}, t, {
                code: n.operator_code
            })));
            var i = ""
              , r = (0,
            f.default)(n)
              , o = r.length;
            r.map(function(e, t) {
                i += t !== o - 1 ? (n[e] || "") + "|" : n[e] || ""
            });
            var c = {
                log: [i]
            }
              , l = (0,
            I.gzip)((0,
            d.default)(c), {
                to: "string"
            });
            return l = window.btoa(l),
            l = a(l, "28778826534697375418351580924221"),
            {
                bigdatalog: l
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.DETAIL_RELATIVE_MODULE = t.MODULE = t.track = t.getOperationList = t.OPERATOR_CODE = void 0;
        var l = n(28)
          , d = i(l)
          , p = n(63)
          , f = i(p)
          , h = n(34)
          , m = i(h)
          , v = n(102)
          , g = i(v)
          , I = n(527)
          , T = n(85)
          , w = i(T)
          , _ = navigator.userAgent.toLowerCase()
          , S = ""
          , E = "";
        if (_.match(/(iPhone|iPod|iPad);?/i)) {
            var P = _.match(/cpu iphone os (\d+)_(\d+) like/i) ? _.match(/cpu iphone os (\d+)_(\d+) like/i) : "";
            E = P ? P[1].replace(/_/g, ".") : "",
            S = "iOS"
        } else
            E = _.substr(_.indexOf("android") + 8, 3),
            S = "android";
        var y = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
          , O = /(?:Android)/.test(_)
          , A = /(?:Firefox)/.test(_)
          , b = /(?:iPad|PlayBook)/.test(_) || O && !/(?:Mobile)/.test(_) || A && /(?:Tablet)/.test(_)
          , L = "0";
        L = b ? "2" : _.match(y) ? "1" : "0";
        var C = "3"
          , N = "H5"
          , D = "-1"
          , k = "0"
          , M = null
          , R = null
          , x = {
            START: "00000",
            REGISTER: "00001",
            LOGIN: "00002",
            VIEW: "00003",
            CLICK: "00004",
            READ: "00005",
            USE: "00006",
            PROGRAM_READ: "00068"
        }
          , j = 11
          , U = window.screen.width + "*" + window.screen.height
          , V = "V1.2"
          , H = "v6";
        t.OPERATOR_CODE = x,
        t.getOperationList = s,
        t.track = c,
        t.MODULE = j,
        t.DETAIL_RELATIVE_MODULE = 14
    },
    536: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a() {
            if ((0,
            f.isIos)())
                r("ios", !1)();
            else {
                r("android", "http://dev-image-touchtv.oss-cn-shenzhen.aliyuncs.com/upload/20190111/tRJteyh7wS1547196505.png", {
                    height: "1.5rem",
                    width: "2.68rem"
                })()
            }
        }
        function r(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
              , i = arguments[3]
              , a = {
                android: "http://img2-cloud.itouchtv.cn/manual/0330/android.png",
                ios: "http://img2-cloud.itouchtv.cn/manual/0330/ios.png",
                zhishi: "http://img2-cloud.itouchtv.cn/manual/0330/zhishi.png"
            }
              , r = a[e]
              , o = a.zhishi;
            return function() {
                if (document.querySelector(".tipsBox"))
                    return "";
                var e = document.createElement("div");
                return e.setAttribute("class", "tipsBox"),
                e.setAttribute("id", "common-tipsBox"),
                e.innerHTML = t ? '\n            <div style="position:fixed;z-index:996;background:rgba(0,0,0,0.5);top:0;left:0;right:0;bottom:0;"></div>\n            <div style="width:' + (n.width || "4.2rem") + ";height:" + (n.height || "1.2rem") + ";background-image:url(" + t + ');background-size:100% 100%;position:fixed;z-index:996;top:0.1rem;right:0.1rem"></div>' : '\n        <div style="position:fixed;z-index:996;background:rgba(0,0,0,0.3);top:0;left:0;right:0;bottom:0;"></div>\n        <div style="width:4.2rem;height:1.2rem;background-image:url(' + r + ');background-size:100% 100%;position:fixed;z-index:996;top:1.05rem;right:1rem"></div>\n        <div style="position:fixed;width:0.82rem;height:auto;z-index:996;top:0.2rem;right:.5rem"><img style="display:block;width:0.82rem" src="' + o + '"/></div>',
                document.body.appendChild(e),
                e.onclick = function() {
                    i && i(),
                    document.body.removeChild(e),
                    e = null
                }
                ,
                e
            }
        }
        function o(e) {
            var t = e.url
              , n = {
                target: t,
                appName: "",
                url: t
            };
            return t.match(/taobao.com/i) || t.match(/tb.cn/i) || t.match(/tmall.com/i) ? (n.appName = "taobao",
            n.target = "tbopen://m.taobao.com/tbopen/index.html?action=ali.open.nav&module=h5&bootImage=0&h5Url=" + encodeURI(t)) : t.match(/jd.com/i) ? (n.appName = "jd",
            n.target = 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","sourceType":"Item","sourceValue":"view-ware","url":"' + t + '"}') : (t.match(/pinduoduo.com/i) || t.match(/yangkeduo.com/i)) && (n.appName = "pinduoduo",
            n.target = "pinduoduo://com.xunmeng.pinduoduo/duo_coupon_landing.html?url=" + encodeURI(t)),
            n
        }
        function s(e) {
            var t = function() {
                a()
            };
            return ((0,
            f.isWeixin)() || (0,
            f.isWeibo)()) && "taobao" == e.appName ? t : function() {
                h.init(),
                location.href = e.target,
                setTimeout(function() {
                    location.href = e.target
                }, 50),
                setTimeout(function() {
                    location.href = e.url
                }, 2e3)
            }
        }
        function u() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                url: ""
            }
              , t = void 0
              , n = new l.default(function(e) {
                t = e
            }
            )
              , i = o(e)
              , a = s(i);
            return t(a),
            n
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = n(24)
          , l = i(c)
          , d = n(206)
          , p = i(d)
          , f = n(19)
          , h = new p.default({
            timeout: 3e3,
            mask: !0,
            mode: 2
        })
          , m = {
            id: "gotoThridPartyApp",
            definition: {
                inserted: function(e, t, n) {
                    var i = t.value
                      , a = i.data
                      , r = i.callback
                      , o = void 0 === r ? function(e) {
                        return null
                    }
                    : r;
                    u(a).then(function(t) {
                        function n() {
                            "function" == typeof t ? t() : (location.href = t,
                            setTimeout(function() {
                                location.href = t
                            }, 50))
                        }
                        var i = function() {
                            n(),
                            o && o()
                        };
                        if (e.onclick = i,
                        "open-thrid-party-app-button" === e.className) {
                            var a = document.querySelectorAll(".open-thrid-party-app-button");
                            a && a.length > 2 && (a[0].onclick = a[a.length - 2].onclick,
                            a[a.length - 2 + 1].onclick = a[1].onclick)
                        }
                    })
                },
                unbind: function(e) {
                    e.onclick = null
                }
            }
        };
        t.default = m
    },
    537: function(e, t, n) {
        "use strict";
        function i(e, t) {
            return {
                operator_code: e,
                operator_list: t
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = {
            id: "track",
            definition: {
                inserted: function(e, t, n) {
                    var a = t.value
                      , r = (a.type,
                    a.code)
                      , o = a.opList
                      , s = a.cb
                      , u = a.listData
                      , c = i(r || "00046", o)
                      , l = n.context.$track(c, u);
                    e.onclick = function() {
                        n.context.$store.dispatch("common/POST_BIGDATA_LOG", l).then(function() {
                            s && s()
                        }).catch(function() {
                            s && s()
                        })
                    }
                },
                unbind: function(e) {
                    e.onclick = null
                }
            }
        };
        t.default = a
    },
    538: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(40)
          , a = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(i)
          , r = {
            id: "scrollTrack",
            definition: {
                inserted: function(e, t, n) {
                    function i(e) {
                        d.readPer = e,
                        d.readTime = Math.round((+new Date - r) / 1e3);
                        var t = s.$track({
                            operator_code: "00005"
                        }, d);
                        u.dispatch("common/POST_BIGDATA_LOG", t)
                    }
                    var r = +new Date
                      , o = {
                        twenty: !1,
                        forty: !1,
                        sixty: !1,
                        eighty: !1,
                        full: !1
                    }
                      , s = n.context
                      , u = s.$store
                      , c = (0,
                    a.default)({}, u.state.news.data || {})
                      , l = c.thisNews || {}
                      , d = {
                        newsId: l.sid,
                        channelId: u.state.common.shareData.chd || "0",
                        bigDataLogInfo: l.bigDataLogInfo,
                        newsTopicId: l.newsTopicId,
                        newsTopicType: l.newsTopicType
                    };
                    s.unsubscribe = u.subscribe(function(t, n) {
                        if ("common/UPDATE_SCROLL_EVENT" == t.type) {
                            if (o.full)
                                return;
                            var a = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
                              , r = Math.round((parseInt(.6 * document.documentElement.clientHeight, 10) + a) / e.clientHeight * 10);
                            !o.full && r >= 10 ? (o.full = !0,
                            i(r)) : !o.eighty && r >= 8 ? (o.eighty = !0,
                            i(r)) : !o.sixty && r >= 6 ? (o.sixty = !0,
                            i(r)) : !o.forty && r >= 4 ? (o.forty = !0,
                            i(r)) : !o.twenty && r >= 2 && (o.twenty = !0,
                            i(r))
                        }
                    })
                },
                unbind: function(e, t, n) {
                    n.context.unsubscribe()
                }
            }
        };
        t.default = r
    },
    539: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(19)
          , a = {
            id: "imageProcessor",
            definition: function(e, t, n) {
                if (t.value && (!t.oldValue || t.value.width != t.oldValue.width && t.value.height != t.oldValue.height)) {
                    var a = t.value
                      , r = a.width
                      , o = a.height
                      , s = a.errorImg;
                    r && o && (e.src = (0,
                    i.imgManage)(e.src, o, r, "lfit")),
                    e.onerror = s ? function() {
                        this.setAttribute("src", s)
                    }
                    : null
                }
            }
        };
        t.default = a
    },
    540: function(e, t, n) {
        "use strict";
        function i(e, t) {
            var n = t.$store
              , i = void 0;
            if ("news" == e) {
                var a = (0,
                r.default)({}, n.state.news.data || {})
                  , o = a.thisNews || {};
                i = {
                    newsId: o.sid,
                    channelId: n.state.common.shareData.chd || "0",
                    bigDataLogInfo: o.bigDataLogInfo,
                    newsTopicId: o.newsTopicId,
                    newsTopicType: o.newsTopicType
                }
            } else if ("program" == e) {
                var s = t.$parent.currentPlayingProgram;
                i = {
                    channelId: n.state.common.shareData.chd || "0",
                    programId: s.tvProgramId,
                    playStatus: 0 == s.playStatus ? 1 : 2,
                    listStatus: t.$parent.isShowMoreProgram ? 1 : 0,
                    bigDataLogInfo: s.bigDataLogInfo,
                    listId: n.state.common.shareData.tvCId || "0"
                }
            }
            return i
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(40)
          , r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(a)
          , o = {
            id: "videoTrack",
            definition: {
                inserted: function(e, t, n) {
                    function a(e) {
                        m.readPer = e,
                        m.readTime = Math.round((+new Date - l) / 1e3);
                        var t = f.$track({
                            operator_code: p
                        }, m);
                        h.dispatch("common/POST_BIGDATA_LOG", t)
                    }
                    function r(e) {
                        if (!d.full) {
                            var t = Math.round(e.target.currentTime / e.target.duration * 10);
                            !d.full && t >= 10 ? (d.full = !0,
                            a(t)) : !d.eighty && t >= 8 ? (d.eighty = !0,
                            a(t)) : !d.sixty && t >= 6 ? (d.sixty = !0,
                            a(t)) : !d.forty && t >= 4 ? (d.forty = !0,
                            a(t)) : !d.twenty && t >= 2 && (d.twenty = !0,
                            a(t))
                        }
                    }
                    var o = t.value
                      , s = o.isTrack
                      , u = o.type
                      , c = void 0 === u ? "news" : u;
                    if (s) {
                        var l = +new Date
                          , d = {
                            twenty: !1,
                            forty: !1,
                            sixty: !1,
                            eighty: !1,
                            full: !1
                        }
                          , p = "news" == c ? "00005" : "00068"
                          , f = n.context
                          , h = f.$store
                          , m = i(c, f);
                        e.addEventListener("timeupdate", r, !1)
                    }
                }
            }
        };
        t.default = o
    },
    541: function(e, t, n) {
        "use strict";
        function i() {
            return a()
        }
        function a() {
            u.default.get("N-VERSION") != c && (u.default.remove("N-VERSION"),
            u.default.remove("X-ITOUCHTV-USER-ID"),
            u.default.set("N-VERSION", c)),
            r()
        }
        function r() {
            var e = u.default.get("X-ITOUCHTV-DEVICE-ID");
            e && !o(e) || u.default.set("X-ITOUCHTV-DEVICE-ID", "WEBM_" + n(542)())
        }
        function o(e) {
            return -1 != e.indexOf("IMEI_") || -1 != e.indexOf("OPENUDID_")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = n(85)
          , u = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(s)
          , c = "0.4";
        t.default = i
    },
    545: function(e, t, n) {
        "use strict";
        (function(t) {
            function i(e, n) {
                var i = "";
                return e.response && e.response && e.response.data && o[e.response.data.errorCode] && (i = encodeURIComponent((0,
                r.default)(e.response.data))),
                "undefined" != typeof window ? "/error?f=" + encodeURIComponent(window.location.href) + "&e=" + new t(e.stack.toString()).toString("base64") + (i ? "&d=" + i : "") : n ? "/error?f=" + encodeURIComponent(n.url || "") + "&e=" + new t(e.stack.toString()).toString("base64") + (i ? "&d=" + i : "") : "/error?e=" + new t(e.stack.toString()).toString("base64") + (i ? "&d=" + i : "")
            }
            var a = n(28)
              , r = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(a)
              , o = {
                509: !0,
                42014: !0,
                42001: !0,
                49021: !0
            };
            e.exports = {
                handleErrorUrl: i
            }
        }
        ).call(t, n(199).Buffer)
    },
    546: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e, t) {
            return !!(0,
            p.default)(e).filter(function(e) {
                return e.split("/")[0] == t
            }).length
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(35)
          , o = i(r)
          , s = n(40)
          , u = i(s)
          , c = n(36)
          , l = i(c)
          , d = n(63)
          , p = i(d)
          , f = function() {
            var e = (0,
            l.default)(o.default.mark(function e(t, i) {
                var r, s, c;
                return o.default.wrap(function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            if (!t.meta || !t.meta.store || a(i.getters, t.meta.store)) {
                                e.next = 8;
                                break
                            }
                            return e.next = 4,
                            n(547)("./" + t.meta.store);
                        case 4:
                            r = e.sent,
                            s = !!i.state[t.meta.store],
                            c = s ? (0,
                            u.default)({}, r.default(), {
                                state: i.state[t.meta.store]
                            }) : r.default(),
                            i.registerModule(t.meta.store, c, {
                                preserveState: s
                            });
                        case 8:
                        case "end":
                            return e.stop()
                        }
                }, e, this)
            }));
            return function(t, n) {
                return e.apply(this, arguments)
            }
        }();
        t.default = f
    },
    547: function(e, t, n) {
        function i(e) {
            var t = a[e];
            return t ? Promise.all(t.slice(1).map(n.e)).then(function() {
                return n(t[0])
            }) : Promise.reject(new Error("Cannot find module '" + e + "'."))
        }
        var a = {
            "./": [94],
            "./agreement": [110, 21],
            "./agreement/": [110, 21],
            "./agreement/actions": [253, 87],
            "./agreement/actions.js": [253, 87],
            "./agreement/getters": [254, 86],
            "./agreement/getters.js": [254, 86],
            "./agreement/index": [110, 21],
            "./agreement/index.js": [110, 21],
            "./agreement/mutations": [255, 85],
            "./agreement/mutations.js": [255, 85],
            "./baoliao": [111, 20],
            "./baoliao/": [111, 20],
            "./baoliao/actions": [256, 84],
            "./baoliao/actions.js": [256, 84],
            "./baoliao/getters": [257, 83],
            "./baoliao/getters.js": [257, 83],
            "./baoliao/index": [111, 20],
            "./baoliao/index.js": [111, 20],
            "./baoliao/mutations": [258, 82],
            "./baoliao/mutations.js": [258, 82],
            "./channels": [78],
            "./channels/": [78],
            "./channels/actions": [152],
            "./channels/actions.js": [152],
            "./channels/getters": [159],
            "./channels/getters.js": [159],
            "./channels/index": [78],
            "./channels/index.js": [78],
            "./channels/mutations": [158],
            "./channels/mutations.js": [158],
            "./common": [80],
            "./common/": [80],
            "./common/actions": [160],
            "./common/actions.js": [160],
            "./common/getters": [162],
            "./common/getters.js": [162],
            "./common/index": [80],
            "./common/index.js": [80],
            "./common/mutations": [161],
            "./common/mutations.js": [161],
            "./consultGov": [112, 0],
            "./consultGov/": [112, 0],
            "./consultGov/actions": [259, 81],
            "./consultGov/actions.js": [259, 81],
            "./consultGov/getters": [260, 80],
            "./consultGov/getters.js": [260, 80],
            "./consultGov/index": [112, 0],
            "./consultGov/index.js": [112, 0],
            "./consultGov/mutations": [261, 22],
            "./consultGov/mutations.js": [261, 22],
            "./gambit": [113, 19],
            "./gambit/": [113, 19],
            "./gambit/actions": [262, 79],
            "./gambit/actions.js": [262, 79],
            "./gambit/getters": [263, 78],
            "./gambit/getters.js": [263, 78],
            "./gambit/index": [113, 19],
            "./gambit/index.js": [113, 19],
            "./gambit/mutations": [264, 77],
            "./gambit/mutations.js": [264, 77],
            "./gambitVote": [114, 18],
            "./gambitVote/": [114, 18],
            "./gambitVote/actions": [265, 76],
            "./gambitVote/actions.js": [265, 76],
            "./gambitVote/getters": [266, 75],
            "./gambitVote/getters.js": [266, 75],
            "./gambitVote/index": [114, 18],
            "./gambitVote/index.js": [114, 18],
            "./gambitVote/mutations": [267, 74],
            "./gambitVote/mutations.js": [267, 74],
            "./hotline": [81],
            "./hotline/": [81],
            "./hotline/index": [81],
            "./hotline/index.js": [81],
            "./index": [94],
            "./index.js": [94],
            "./live": [115, 17],
            "./live/": [115, 17],
            "./live/actions": [268, 73],
            "./live/actions.js": [268, 73],
            "./live/getters": [269, 72],
            "./live/getters.js": [269, 72],
            "./live/index": [115, 17],
            "./live/index.js": [115, 17],
            "./live/mutations": [270, 71],
            "./live/mutations.js": [270, 71],
            "./liveOb": [116, 16],
            "./liveOb/": [116, 16],
            "./liveOb/actions": [271, 70],
            "./liveOb/actions.js": [271, 70],
            "./liveOb/getters": [272, 69],
            "./liveOb/getters.js": [272, 69],
            "./liveOb/index": [116, 16],
            "./liveOb/index.js": [116, 16],
            "./liveOb/mutations": [273, 68],
            "./liveOb/mutations.js": [273, 68],
            "./liveRich": [117, 15],
            "./liveRich/": [117, 15],
            "./liveRich/actions": [274, 67],
            "./liveRich/actions.js": [274, 67],
            "./liveRich/getters": [275, 66],
            "./liveRich/getters.js": [275, 66],
            "./liveRich/index": [117, 15],
            "./liveRich/index.js": [117, 15],
            "./liveRich/mutations": [276, 65],
            "./liveRich/mutations.js": [276, 65],
            "./liveTopic": [118, 14],
            "./liveTopic/": [118, 14],
            "./liveTopic/actions": [277, 64],
            "./liveTopic/actions.js": [277, 64],
            "./liveTopic/getters": [278, 63],
            "./liveTopic/getters.js": [278, 63],
            "./liveTopic/index": [118, 14],
            "./liveTopic/index.js": [118, 14],
            "./liveTopic/mutations": [279, 62],
            "./liveTopic/mutations.js": [279, 62],
            "./mallDetail": [119, 13],
            "./mallDetail/": [119, 13],
            "./mallDetail/actions": [280, 61],
            "./mallDetail/actions.js": [280, 61],
            "./mallDetail/getters": [281, 60],
            "./mallDetail/getters.js": [281, 60],
            "./mallDetail/index": [119, 13],
            "./mallDetail/index.js": [119, 13],
            "./mallDetail/mutations": [282, 59],
            "./mallDetail/mutations.js": [282, 59],
            "./mediaDetail": [120, 12],
            "./mediaDetail/": [120, 12],
            "./mediaDetail/actions": [283, 58],
            "./mediaDetail/actions.js": [283, 58],
            "./mediaDetail/getters": [284, 57],
            "./mediaDetail/getters.js": [284, 57],
            "./mediaDetail/index": [120, 12],
            "./mediaDetail/index.js": [120, 12],
            "./mediaDetail/mutations": [285, 56],
            "./mediaDetail/mutations.js": [285, 56],
            "./news": [121, 11],
            "./news/": [121, 11],
            "./news/actions": [286, 55],
            "./news/actions.js": [286, 55],
            "./news/getters": [287, 54],
            "./news/getters.js": [287, 54],
            "./news/index": [121, 11],
            "./news/index.js": [121, 11],
            "./news/mutations": [288, 53],
            "./news/mutations.js": [288, 53],
            "./newsTopic": [122, 10],
            "./newsTopic/": [122, 10],
            "./newsTopic/actions": [289, 52],
            "./newsTopic/actions.js": [289, 52],
            "./newsTopic/getters": [290, 51],
            "./newsTopic/getters.js": [290, 51],
            "./newsTopic/index": [122, 10],
            "./newsTopic/index.js": [122, 10],
            "./newsTopic/mutations": [291, 50],
            "./newsTopic/mutations.js": [291, 50],
            "./pluginDetail": [123, 9],
            "./pluginDetail/": [123, 9],
            "./pluginDetail/actions": [292, 49],
            "./pluginDetail/actions.js": [292, 49],
            "./pluginDetail/getters": [293, 48],
            "./pluginDetail/getters.js": [293, 48],
            "./pluginDetail/index": [123, 9],
            "./pluginDetail/index.js": [123, 9],
            "./pluginDetail/mutations": [294, 47],
            "./pluginDetail/mutations.js": [294, 47],
            "./program": [124, 1],
            "./program/": [124, 1],
            "./program/actions": [295, 23],
            "./program/actions.js": [295, 23],
            "./program/getters": [296, 46],
            "./program/getters.js": [296, 46],
            "./program/index": [124, 1],
            "./program/index.js": [124, 1],
            "./program/mutations": [297, 45],
            "./program/mutations.js": [297, 45],
            "./quick": [125, 8],
            "./quick/": [125, 8],
            "./quick/actions": [298, 44],
            "./quick/actions.js": [298, 44],
            "./quick/getters": [299, 43],
            "./quick/getters.js": [299, 43],
            "./quick/index": [125, 8],
            "./quick/index.js": [125, 8],
            "./quick/mutations": [300, 42],
            "./quick/mutations.js": [300, 42],
            "./quickPay": [126, 7],
            "./quickPay/": [126, 7],
            "./quickPay/actions": [301, 41],
            "./quickPay/actions.js": [301, 41],
            "./quickPay/getters": [302, 40],
            "./quickPay/getters.js": [302, 40],
            "./quickPay/index": [126, 7],
            "./quickPay/index.js": [126, 7],
            "./quickPay/mutations": [303, 39],
            "./quickPay/mutations.js": [303, 39],
            "./rule": [127, 6],
            "./rule/": [127, 6],
            "./rule/actions": [304, 38],
            "./rule/actions.js": [304, 38],
            "./rule/getters": [305, 37],
            "./rule/getters.js": [305, 37],
            "./rule/index": [127, 6],
            "./rule/index.js": [127, 6],
            "./rule/mutations": [306, 36],
            "./rule/mutations.js": [306, 36],
            "./setNewsTopic": [128, 5],
            "./setNewsTopic/": [128, 5],
            "./setNewsTopic/actions": [307, 35],
            "./setNewsTopic/actions.js": [307, 35],
            "./setNewsTopic/getters": [308, 34],
            "./setNewsTopic/getters.js": [308, 34],
            "./setNewsTopic/index": [128, 5],
            "./setNewsTopic/index.js": [128, 5],
            "./setNewsTopic/mutations": [309, 33],
            "./setNewsTopic/mutations.js": [309, 33],
            "./simulcastDetail": [129, 4],
            "./simulcastDetail/": [129, 4],
            "./simulcastDetail/actions": [310, 32],
            "./simulcastDetail/actions.js": [310, 32],
            "./simulcastDetail/getters": [311, 31],
            "./simulcastDetail/getters.js": [311, 31],
            "./simulcastDetail/index": [129, 4],
            "./simulcastDetail/index.js": [129, 4],
            "./simulcastDetail/mutations": [312, 30],
            "./simulcastDetail/mutations.js": [312, 30],
            "./videoTopic": [130, 3],
            "./videoTopic/": [130, 3],
            "./videoTopic/actions": [313, 29],
            "./videoTopic/actions.js": [313, 29],
            "./videoTopic/getters": [314, 28],
            "./videoTopic/getters.js": [314, 28],
            "./videoTopic/index": [130, 3],
            "./videoTopic/index.js": [130, 3],
            "./videoTopic/mutations": [315, 27],
            "./videoTopic/mutations.js": [315, 27],
            "./worldLive": [131, 2],
            "./worldLive/": [131, 2],
            "./worldLive/actions": [316, 26],
            "./worldLive/actions.js": [316, 26],
            "./worldLive/getters": [317, 25],
            "./worldLive/getters.js": [317, 25],
            "./worldLive/index": [131, 2],
            "./worldLive/index.js": [131, 2],
            "./worldLive/mutations": [318, 24],
            "./worldLive/mutations.js": [318, 24]
        };
        i.keys = function() {
            return Object.keys(a)
        }
        ,
        i.id = 547,
        e.exports = i
    },
    78: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(152)
          , r = i(a)
          , o = n(158)
          , s = i(o)
          , u = n(159)
          , c = i(u);
        t.default = function() {
            return {
                namespaced: !0,
                state: {
                    allChannels: [],
                    channelList: [],
                    newsList: {},
                    activeChannel: null,
                    activeChannelChild: void 0,
                    hotNewsSnapShot: 0,
                    operationHash: "",
                    newsAlertsHash: "",
                    focusPictureHash: ""
                },
                actions: r.default,
                mutations: s.default,
                getters: c.default
            }
        }
    },
    80: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(160)
          , r = i(a)
          , o = n(161)
          , s = i(o)
          , u = n(162)
          , c = i(u);
        t.default = function() {
            return {
                namespaced: !0,
                state: {
                    appGlobalConfig: void 0,
                    fromSource: "share_download",
                    ct: "",
                    ci: "",
                    activityInfo: {
                        targetUrl: null,
                        coverUrl: null
                    },
                    hottestList: [],
                    showView: !1,
                    query: {},
                    liveReviewFocusBottomSpace: "hasSpace",
                    liveReviewFocusCheckedIndex: -1,
                    footerBarVisible: !0,
                    error: null
                },
                actions: r.default,
                mutations: s.default,
                getters: c.default
            }
        }
    },
    81: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(86)
          , r = i(a)
          , o = n(35)
          , s = i(o)
          , u = n(36)
          , c = i(u)
          , l = n(97);
        t.default = {
            namespaced: !0,
            state: {
                programList: [],
                pageSize: 10,
                lastPostParms: 0,
                cloudWordData: [],
                voteMessage: [],
                voteAreaMessage: {},
                thisLive: {}
            },
            actions: {
                fetchProgramList: function() {
                    function e(e) {
                        return t.apply(this, arguments)
                    }
                    var t = (0,
                    c.default)(s.default.mark(function e(t) {
                        var n, i, a, r, o = t.state, u = t.commit;
                        return s.default.wrap(function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return n = o.pageSize,
                                    i = o.lastPostParms,
                                    e.next = 3,
                                    (0,
                                    l.getHotlineMediaLive)({
                                        pageSize: n,
                                        lastPostParms: i
                                    });
                                case 3:
                                    return a = e.sent,
                                    r = a.data,
                                    u("FETCH_PROGRAM_LIST", r),
                                    e.abrupt("return", (r.resultList || []).length < n);
                                case 7:
                                case "end":
                                    return e.stop()
                                }
                        }, e, this)
                    }));
                    return e
                }(),
                fetchCloudWord: function() {
                    function e(e, n) {
                        return t.apply(this, arguments)
                    }
                    var t = (0,
                    c.default)(s.default.mark(function e(t, n) {
                        var i, a, o = (t.commit,
                        n.pageSize), u = void 0 === o ? 50 : o, c = (0,
                        r.default)(n, ["pageSize"]);
                        return s.default.wrap(function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2,
                                    (0,
                                    l.getHotlineCloudWord)(c);
                                case 2:
                                    return i = e.sent,
                                    a = i.data,
                                    e.abrupt("return", a.wordCloudList.slice(0, u).map(function(e, t) {
                                        return t < 10 ? {
                                            name: e.word,
                                            value: e.weight,
                                            color: "#FF6622"
                                        } : t < 30 ? {
                                            name: e.word,
                                            value: e.weight,
                                            color: "#333333"
                                        } : {
                                            name: e.word,
                                            value: e.weight,
                                            color: "#999999"
                                        }
                                    }));
                                case 5:
                                case "end":
                                    return e.stop()
                                }
                        }, e, this)
                    }));
                    return e
                }(),
                fetchVoteMessage: function() {
                    function e(e, n) {
                        return t.apply(this, arguments)
                    }
                    var t = (0,
                    c.default)(s.default.mark(function e(t, n) {
                        var i, a, r = t.commit;
                        return s.default.wrap(function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2,
                                    (0,
                                    l.getMediaLiveContent)(n);
                                case 2:
                                    return i = e.sent,
                                    a = i.data,
                                    r("FETCH_VOTE_MESSAGE", a),
                                    e.abrupt("return", a);
                                case 6:
                                case "end":
                                    return e.stop()
                                }
                        }, e, this)
                    }));
                    return e
                }(),
                fetchAreaVoteMessage: function() {
                    function e(e, n) {
                        return t.apply(this, arguments)
                    }
                    var t = (0,
                    c.default)(s.default.mark(function e(t, n) {
                        var i, a, r = t.commit;
                        return s.default.wrap(function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2,
                                    (0,
                                    l.getAreaVote)(n);
                                case 2:
                                    return i = e.sent,
                                    a = i.data,
                                    r("FETCH_AREA_VOTE_MESSAGE", a),
                                    e.abrupt("return", a);
                                case 6:
                                case "end":
                                    return e.stop()
                                }
                        }, e, this)
                    }));
                    return e
                }(),
                fetchVoteImmediate: function() {
                    function e(e, n) {
                        return t.apply(this, arguments)
                    }
                    var t = (0,
                    c.default)(s.default.mark(function e(t, n) {
                        var i, a;
                        t.commit;
                        return s.default.wrap(function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2,
                                    (0,
                                    l.getAreaImmediate)(n);
                                case 2:
                                    return i = e.sent,
                                    a = i.data,
                                    e.abrupt("return", a);
                                case 5:
                                case "end":
                                    return e.stop()
                                }
                        }, e, this)
                    }));
                    return e
                }()
            },
            mutations: {
                FETCH_PROGRAM_LIST: function(e, t) {
                    e.programList = e.programList.concat(t.resultList || []),
                    e.lastPostParms = t.lastPostParms
                },
                FETCH_VOTE_MESSAGE: function(e, t) {
                    e.voteAreaMessage = JSON.parse(t.areaStatInfo || "{}"),
                    e.thisLive = t.thisLive || {}
                },
                FETCH_AREA_VOTE_MESSAGE: function(e, t) {
                    e.voteAreaMessage = t
                }
            }
        }
    },
    94: function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a() {
            return new u.default.Store({
                modules: {
                    channels: (0,
                    l.default)(),
                    common: (0,
                    p.default)(),
                    hotline: h.default
                }
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.createStore = a;
        var r = n(62)
          , o = i(r)
          , s = n(172)
          , u = i(s)
          , c = n(78)
          , l = i(c)
          , d = n(80)
          , p = i(d)
          , f = n(81)
          , h = i(f);
        o.default.use(u.default)
    },
    97: function(e, t, n) {
        "use strict";
        (function(e) {
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a() {
                setTimeout(a, Me.refreshCache)
            }
            function r(e) {
                var t = e.store
                  , n = e.cookies
                  , i = e.isServer;
                return i && n && (Me.cookies = n),
                function(e) {
                    return Ae.default.all(e.map(function(e) {
                        var n = e.action
                          , a = e.payload
                          , r = function() {
                            return (0,
                            ye.default)({}, t.state.common.query.shareData || {})
                        };
                        return Me.getShareDataOrId = r,
                        t.dispatch(n, (0,
                        Ee.default)({}, a, {
                            getShareDataOrId: r,
                            isServer: i
                        }))
                    }))
                }
            }
            function o() {
                return Me.get("https://" + (xe ? "" : "debug-") + "tcdn-api.itouchtv.cn/getParam", {}, {}, !0)
            }
            function s(e) {
                var t = e.title
                  , n = void 0 === t ? "触电新闻" : t
                  , i = e.shareText
                  , a = void 0 === i ? "触电新闻" : i
                  , r = e.shareImg
                  , o = void 0 === r ? je : r
                  , s = e.shareSuccess
                  , u = void 0 === s ? function() {}
                : s
                  , c = e.shareCancel
                  , l = void 0 === c ? function() {}
                : c
                  , d = e.shareTrigger
                  , p = void 0 === d ? function() {}
                : d
                  , f = e.shareComplete
                  , h = void 0 === f ? function() {}
                : f
                  , m = e.toZoomTitle
                  , v = void 0 === m ? "" : m
                  , g = e.toZoomText
                  , I = void 0 === g ? "" : g
                  , T = e.link
                  , w = void 0 === T ? window.location.href.split("#")[0] : T
                  , _ = e.wxOpenLaunchWeapp
                  , S = void 0 !== _ && _
                  , E = e.chooseWXPay
                  , P = void 0 !== E && E
                  , y = e.isHideCopyUrl
                  , O = void 0 !== y && y
                  , A = e.titleWithOutTouchtv
                  , b = void 0 !== A && A;
                if (Me) {
                    w = w || window.location.href.split("#")[0],
                    -1 == w.indexOf("http") && (w = "" + location.origin + w);
                    var L = {
                        url: w,
                        type: 2
                    }
                      , C = {
                        title: n + (b ? "" : "_触电新闻"),
                        desc: a,
                        link: w.replace(/[?||&]code=[\s\S]+&state=STATE/, "").replace(/[?||&]votePk=[^&]+/, "").replace(/[?||&]voteOptionPks=[^&]+/, "").replace(/[?||&]userId=[^&]+/, "").replace(/[?||&]token=[^&]+/, ""),
                        imgUrl: o,
                        success: u,
                        cancel: l,
                        trigger: p,
                        complete: h
                    }
                      , N = v || I ? {
                        title: v,
                        desc: I,
                        link: w.replace(/[?||&]code=[\s\S]+&state=STATE/, "").replace(/[?||&]votePk=[^&]+/, "").replace(/[?||&]voteOptionPks=[^&]+/, "").replace(/[?||&]userId=[^&]+/, "").replace(/[?||&]token=[^&]+/, ""),
                        imgUrl: o,
                        success: u,
                        cancel: l,
                        trigger: p,
                        complete: h
                    } : C
                      , D = [S && "wx-open-launch-weapp" || ""]
                      , k = ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareQZone", "onMenuShareWeibo", "previewImage"];
                    return P && k.push("chooseWXPay"),
                    O && k.push("hideMenuItems"),
                    Me.post("https://api.itouchtv.cn/supplementservice/v1/wechatSignature", (0,
                    Ee.default)({}, L), {}, !0).then(function(e) {
                        var t = e.data
                          , n = window.wx || {};
                        n.config({
                            debug: !1,
                            appId: Re,
                            timestamp: t.timestamp,
                            nonceStr: t.nonceStr,
                            signature: t.signature,
                            jsApiList: k,
                            openTagList: D
                        }),
                        n.ready(function() {
                            n.updateAppMessageShareData ? n.updateAppMessageShareData(C) : (n.onMenuShareAppMessage(C),
                            n.onMenuShareQQ(C)),
                            n.updateTimelineShareData ? n.updateTimelineShareData(N) : (n.onMenuShareTimeline(N),
                            n.onMenuShareQZone(N)),
                            n.onMenuShareWeibo(N),
                            O && n.hideMenuItems({
                                menuList: ["menuItem:copyUrl"]
                            })
                        }),
                        n.error(function(e) {})
                    }).catch(function(e) {})
                }
            }
            function u(e) {
                var t = e.title
                  , n = void 0 === t ? "触电新闻" : t
                  , i = e.shareText
                  , a = void 0 === i ? "触电新闻" : i
                  , r = e.shareImg
                  , o = void 0 === r ? je : r
                  , s = e.shareSuccess
                  , u = void 0 === s ? function() {}
                : s
                  , c = e.shareCancel
                  , l = void 0 === c ? function() {}
                : c
                  , d = e.shareTrigger
                  , p = void 0 === d ? function() {}
                : d
                  , f = e.shareComplete
                  , h = void 0 === f ? function() {}
                : f
                  , m = e.toZoomTitle
                  , v = void 0 === m ? "" : m
                  , g = e.toZoomText
                  , I = void 0 === g ? "" : g
                  , T = e.link
                  , w = void 0 === T ? window.location.href.split("#")[0] : T
                  , _ = (e.wxOpenLaunchWeapp,
                e.chooseWXPay)
                  , S = void 0 !== _ && _
                  , E = e.isHideCopyUrl
                  , P = void 0 !== E && E
                  , y = e.titleWithOutTouchtv
                  , O = void 0 !== y && y;
                w = w || window.location.href.split("#")[0],
                -1 == w.indexOf("http") && (w = "" + location.origin + w);
                var A = {
                    title: n + (O ? "" : "_触电新闻"),
                    desc: a,
                    link: w.replace(/[?||&]code=[\s\S]+&state=STATE/, "").replace(/[?||&]votePk=[^&]+/, "").replace(/[?||&]voteOptionPks=[^&]+/, "").replace(/[?||&]userId=[^&]+/, "").replace(/[?||&]token=[^&]+/, ""),
                    imgUrl: o,
                    success: u,
                    cancel: l,
                    trigger: p,
                    complete: h
                }
                  , b = v || I ? {
                    title: v,
                    desc: I,
                    link: w.replace(/[?||&]code=[\s\S]+&state=STATE/, "").replace(/[?||&]votePk=[^&]+/, "").replace(/[?||&]voteOptionPks=[^&]+/, "").replace(/[?||&]userId=[^&]+/, "").replace(/[?||&]token=[^&]+/, ""),
                    imgUrl: o,
                    success: u,
                    cancel: l,
                    trigger: p,
                    complete: h
                } : A
                  , L = ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareQZone", "onMenuShareWeibo", "previewImage"];
                S && L.push("chooseWXPay"),
                P && L.push("hideMenuItems");
                var C = window.wx || {};
                C.ready(function() {
                    C.updateAppMessageShareData ? C.updateAppMessageShareData(A) : (C.onMenuShareAppMessage(A),
                    C.onMenuShareQQ(A)),
                    C.updateTimelineShareData ? C.updateTimelineShareData(b) : (C.onMenuShareTimeline(b),
                    C.onMenuShareQZone(b)),
                    C.onMenuShareWeibo(b),
                    P && C.hideMenuItems({
                        menuList: ["menuItem:copyUrl"]
                    })
                }),
                C.error(function(e) {})
            }
            function c() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , t = e.validNameSpace
                  , n = void 0 === t ? "weixinAuth" : t
                  , i = e.expireTime
                  , a = e.isForce
                  , r = (0,
                _e.default)(e, ["validNameSpace", "expireTime", "isForce"]);
                if (Me) {
                    var o = void 0
                      , s = void 0
                      , u = new Ae.default(function(e, t) {
                        o = e,
                        s = t
                    }
                    );
                    n || s("no namespace");
                    var c = localStorage.getItem(n)
                      , l = ke.default.get(n)
                      , d = Ne.default.getUrlParam();
                    if (c && l)
                        o(JSON.parse(c).data);
                    else {
                        if (!(!a || d && d.code))
                            return o(null);
                        var p = location.href.replace(/[?||&]code=[\s\S]+&state=STATE/, "")
                          , f = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Re + "&redirect_uri=" + p + "&response_type=code&scope=snsapi_userinfo&state=" + (new Date).getTime() + "&connect_redirect=1#wechat_redirect";
                        if (d && d.code) {
                            var h = (0,
                            Ee.default)({
                                code: d.code,
                                os: "wap_m",
                                thirdPartyType: "weixin"
                            }, r);
                            Me.post("/userservice/v2/thirdPartyAccount/signin", h).then(function(e) {
                                if (e.data && e.data.userId) {
                                    var t = {
                                        timestamp: +new Date,
                                        data: e.data,
                                        version: 1
                                    };
                                    localStorage[n] = (0,
                                    Te.default)(t),
                                    ke.default.set(n, d.code, {
                                        expires: i || 10
                                    }),
                                    o(e.data)
                                } else
                                    s(null)
                            }).catch(function(e) {
                                e.response && e.response.data && 49002 == e.response.data.errorCode ? "m.itouchtv.cn" === window.location.hostname ? window.location.href = f : window.location.replace("https://m.itouchtv.cn/wxauth?url=" + encodeURIComponent(p) + "&random=" + +new Date) : s(e)
                            })
                        } else
                            "m.itouchtv.cn" === window.location.hostname ? window.location.href = f : window.location.replace("https://m.itouchtv.cn/wxauth?url=" + encodeURIComponent(p) + "&random=" + +new Date),
                            o(null)
                    }
                    return u
                }
            }
            function l() {
                var e = void 0
                  , t = void 0
                  , n = new Ae.default(function(n, i) {
                    e = n,
                    t = i
                }
                )
                  , i = location.href.replace(/[?||&]code=[\s\S]+&state=STATE/, "")
                  , a = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Re + "&redirect_uri=" + i + "&response_type=code&scope=snsapi_userinfo&state=" + (new Date).getTime() + "#wechat_redirect"
                  , r = Ne.default.getUrlParam();
                return r && r.code ? (delete r.state,
                delete r.url,
                e((0,
                Ee.default)({}, r))) : (window.location.replace(a),
                e(null)),
                n
            }
            function d() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , t = e.validNameSpace
                  , n = void 0 === t ? "weixinAuth" : t
                  , i = e.expireTime;
                if (Me) {
                    var a = void 0
                      , r = void 0
                      , o = new Ae.default(function(e, t) {
                        a = e,
                        r = t
                    }
                    );
                    n || r("no namespace");
                    var s = localStorage.getItem(n);
                    if (s && +new Date - JSON.parse(s).timestamp < JSON.parse(s).expireTime)
                        a(JSON.parse(s).data);
                    else {
                        var u = location.href.replace(/[?||&]code=[\s\S]+&state=STATE/, "")
                          , c = encodeURIComponent(u)
                          , l = Ne.default.getUrlParam();
                        if (l && l.refuse)
                            a(null);
                        else if (l && l.code) {
                            var d = {
                                code: l.code,
                                os: "wap_m",
                                thirdPartyType: "weixin"
                            };
                            Me.post("/userservice/v2/thirdPartyAccount/signin", d).then(function(e) {
                                if (e.data && e.data.userId) {
                                    var t = {
                                        timestamp: +new Date,
                                        expireTime: i || 864e6,
                                        data: e.data,
                                        version: 1
                                    };
                                    localStorage[n] = (0,
                                    Te.default)(t),
                                    a(e.data)
                                } else
                                    r(null)
                            }).catch(function(e) {
                                e.response && e.response.data && 49002 == e.response.data.errorCode && window.location.replace("https://m.itouchtv.cn/wxauth?url=" + c + "&random=" + (new Date).getTime()),
                                r(e)
                            })
                        } else
                            a(null),
                            window.location.replace("https://m.itouchtv.cn/wxauth?url=" + c + "&random=" + (new Date).getTime())
                    }
                    return o
                }
            }
            function p(e) {
                return Me.post("/supplementservice/v3/log", e)
            }
            function f() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , t = e.sid;
                return Me.put("/newsservice/v1/newsshare/" + t + "/WEIXIN")
            }
            function h() {
                return Me.get("/newsservice/v2/appGlobalConfig")
            }
            function m(e) {
                var t = e.captchaType
                  , n = e.clientUid
                  , i = e.ts;
                return Me.post("/newsservice/v1/captcha/get", {
                    captchaType: t,
                    clientUid: n,
                    ts: i
                })
            }
            function v() {
                return Me.get("/newsservice/v8/channel", null, {
                    cache: !0
                })
            }
            function g(e) {
                var t = e.alias;
                return Me.get("/newsservice/v1/channelByAlias", {
                    alias: t
                }, {
                    cache: !0
                })
            }
            function I(e) {
                var t = e.channelId
                  , n = (e.deviceId,
                e.localOldestNewsTime)
                  , i = e.refreshType
                  , a = e.channelType
                  , r = e.pageNum;
                return Me.get("/newsservice/v4/uniteChannelNews", {
                    channelId: t,
                    size: 15,
                    oldestTime: n || 0,
                    refreshType: i,
                    channelType: a,
                    pageNum: r
                }, {
                    cache: !0
                })
            }
            function T(e) {
                e.deviceId;
                return Me.get("/newsservice/v9/recommendNews", null, {
                    cache: !0
                })
            }
            function w(e) {
                var t = (e.deviceId,
                e.snapShotNumber)
                  , n = e.operationHash
                  , i = e.newsAlertsHash
                  , a = e.focusPictureHash;
                return Me.get("/newsservice/v9/hotNews", {
                    pageSize: 15,
                    snapShotNumber: t || 0,
                    operationHash: n,
                    newsAlertsHash: i,
                    focusPictureHash: a
                }, {
                    cache: !0
                })
            }
            function _(e) {
                var t = e.channelId
                  , n = (e.deviceId,
                e.localOldestNewsTime)
                  , i = e.refreshType;
                return Me.get("/newsservice/v9/channelNews", {
                    channelId: t,
                    pageSize: 15,
                    localOldestNewsTime: n || 0,
                    refreshType: i
                }, {
                    cache: !0
                })
            }
            function S(e) {
                var t = e.sid
                  , n = e.jwt
                  , i = e.userId;
                return Me.get("/newsservice/v13/newscontent", {
                    sid: t,
                    fromSourceParm: Me.getShareDataOrId().userId,
                    shareId: Me.getShareDataOrId().shareId
                }, {
                    jwt: n,
                    userId: i
                })
            }
            function E(e) {
                var t = e.sid;
                e.jwt,
                e.userId;
                return Me.get("/newsservice/v13/newsRelate", {
                    sid: t,
                    fromSourceParm: Me.getShareDataOrId().userId,
                    shareId: Me.getShareDataOrId().shareId
                })
            }
            function P(e) {
                var t = e.sid
                  , n = e.lastPostParam
                  , i = void 0 === n ? 0 : n
                  , a = e.size
                  , r = void 0 === a ? 20 : a
                  , o = e.page
                  , s = void 0 === o ? 1 : o;
                return Me.get("/newsservice/v5/comment", {
                    sid: t,
                    lastPostParam: i,
                    size: r,
                    page: s
                })
            }
            function y() {
                return Me.get("/userservice/v4/activity", {
                    type: 1
                })
            }
            function O(e) {
                var t = e.userPk
                  , n = e.objectType
                  , i = void 0 === n ? 0 : n
                  , a = e.objectPk
                  , r = e.votePk
                  , o = e.voteOptionPks
                  , s = e.captcha
                  , u = e.jwt;
                return Me.post("/newsservice/v3/vote", {
                    fromSource: "share",
                    userPk: t,
                    objectType: i,
                    objectPk: a,
                    votePk: r,
                    voteOptionPks: o,
                    captcha: s
                }, {
                    userId: t,
                    jwt: u
                })
            }
            function A(e) {
                var t = e.topicId
                  , n = e.lastPostParam
                  , i = void 0 === n ? 0 : n
                  , a = e.size
                  , r = void 0 === a ? 20 : a;
                return Me.get("/newsservice/v11/newsTopic", {
                    newsTopicId: t,
                    size: r,
                    lastPostParam: i,
                    fromSourceParm: Me.getShareDataOrId().userId,
                    shareId: Me.getShareDataOrId().shareId
                })
            }
            function b(e) {
                var t = e.topicId;
                return Me.get("/newsservice/v11/aggregateNewsTopic", {
                    newsTopicId: t,
                    fromSourceParm: Me.getShareDataOrId().userId,
                    shareId: Me.getShareDataOrId().shareId
                })
            }
            function L(e) {
                var t = e.childrenId
                  , n = e.lastPostParam
                  , i = void 0 === n ? 0 : n;
                return Me.get("/newsservice/v9/aggregateNewsTopicMembers/" + t, {
                    lastPostParam: i,
                    fromSourceParm: Me.getShareDataOrId().userId,
                    shareId: Me.getShareDataOrId().shareId
                })
            }
            function C(e) {
                var t = e.topicPk
                  , n = void 0 === t ? 97 : t
                  , i = e.pageSize
                  , a = void 0 === i ? 10 : i
                  , r = e.pageNum
                  , o = void 0 === r ? 1 : r;
                return Me.get("/liveservice/v2/mediaLiveTopicMembers", {
                    topicPk: n,
                    pageSize: a,
                    pageNum: o,
                    fromSourceParm: Me.getShareDataOrId().userId,
                    shareId: Me.getShareDataOrId().shareId
                })
            }
            function N(e) {
                var t = e.tvProgramId
                  , n = e.objectType
                  , i = e.objectId
                  , a = e.node;
                return Me.get("/liveservice/v5/tvProgramContent", {
                    tvProgramId: t,
                    objectType: n,
                    objectId: i,
                    node: a,
                    fromSourceParm: Me.getShareDataOrId().userId,
                    shareId: Me.getShareDataOrId().shareId
                })
            }
            function D(e) {
                var t = e.tvClipsParentId
                  , n = e.tvClipsPageUpPara
                  , i = e.tvClipsPageDownPara
                  , a = e.pageSize;
                return Me.get("/liveservice/v2/tvReviewClips", {
                    tvClipsParentId: t,
                    tvClipsPageUpPara: n,
                    tvClipsPageDownPara: i,
                    pageSize: a,
                    fromSourceParm: Me.getShareDataOrId().userId,
                    shareId: Me.getShareDataOrId().shareId
                })
            }
            function k(e) {
                var t = e.tvprogrampk
                  , n = e.beginAt
                  , i = e.endAt
                  , a = e.keyWord
                  , r = e.pageSize
                  , o = void 0 === r ? 10 : r
                  , s = e.pageNum
                  , u = void 0 === s ? 0 : s;
                return Me.post("/supplementservice/v1/searchTvProgram", {
                    tvprogrampk: t,
                    beginAt: n,
                    endAt: i,
                    keyWord: a,
                    pageSize: o,
                    pageNum: u,
                    fromSourceParm: Me.getShareDataOrId().userId,
                    shareId: Me.getShareDataOrId().shareId
                })
            }
            function M(e) {
                var t = e.tvProgramPk
                  , n = e.tvReviewPageDownPara
                  , i = e.tvReviewPageUpPara
                  , a = e.pageSize
                  , r = void 0 === a ? 10 : a
                  , o = e.gotoTvReviewId;
                return Me.get("/liveservice/v1/tvPrograms/" + t, {
                    tvReviewPageDownPara: n,
                    tvReviewPageUpPara: i,
                    pageSize: r,
                    fromSourceParm: Me.getShareDataOrId().userId,
                    shareId: Me.getShareDataOrId().shareId,
                    gotoTvReviewId: o
                })
            }
            function R(e) {
                var t = e.tvProgramPk
                  , n = e.channelPk;
                return Me.get("/liveservice/v1/tvMenuOrProgramReviewByCategoryPk", {
                    tvProgramPk: t,
                    channelPk: n,
                    fromSourceParm: Me.getShareDataOrId().userId,
                    shareId: Me.getShareDataOrId().shareId
                })
            }
            function x(e) {
                var t = e.mediaLiveId
                  , n = (e.fromSource,
                e.isStat)
                  , i = void 0 === n || n
                  , a = e.isH5Share
                  , r = void 0 === a || a;
                return Me.get("/liveservice/v8/mediaLiveDetail", {
                    mediaLiveId: t,
                    isStat: i,
                    isH5Share: r,
                    fromSourceParm: Me.getShareDataOrId().userId,
                    shareId: Me.getShareDataOrId().shareId
                }, {})
            }
            function j(e) {
                var t = e.mediaLiveId;
                return Me.get("/liveservice/v7/relevantLives", {
                    mediaLiveId: t,
                    fromSourceParm: Me.getShareDataOrId().userId,
                    shareId: Me.getShareDataOrId().shareId
                }, {})
            }
            function U(e) {
                var t = e.mediaLiveId
                  , n = (e.fromSource,
                e.latestTime)
                  , i = void 0 === n ? 0 : n
                  , a = e.olderTime
                  , r = void 0 === a ? 0 : a
                  , o = e.pageSize
                  , s = void 0 === o ? 10 : o
                  , u = e.shareId
                  , c = e.order
                  , l = void 0 === c ? 1 : c;
                return Me.get("/liveservice/v5/mediaLiveContent/" + t, {
                    mediaLiveId: t,
                    shareId: u,
                    latestTime: i,
                    olderTime: r,
                    order: l,
                    pageSize: s
                })
            }
            function V(e) {
                var t = e.mediaLiveId
                  , n = (e.fromSource,
                e.pageSize)
                  , i = void 0 === n ? 20 : n
                  , a = e.pageNum
                  , r = void 0 === a ? 1 : a;
                return Me.get("/liveservice/v5/mediaLiveComments/" + t, {
                    pageSize: i,
                    pageNum: r
                })
            }
            function H(e) {
                var t = e.mediaLiveId
                  , n = e.userPk
                  , i = void 0 === n ? 0 : n;
                return Me.get("/liveservice/v4/mediaLiveVoteList/" + t, {
                    userPk: i
                })
            }
            function G(e) {
                var t = e.mediaLiveId;
                return Me.get("/liveservice/v4/mediaLiveStatus", {
                    mediaLiveId: t
                })
            }
            function W(e) {
                var t = e.mediaLiveId;
                return Me.get("/liveservice/v1/currentCount/" + t)
            }
            function B(e) {
                var t = e.mediaLivePk
                  , n = e.goodsPk
                  , i = e.currentPage
                  , a = e.pageSize;
                return Me.get("/liveservice/v1/mediaLive/" + t + "/goods", {
                    goodsPk: n,
                    currentPage: i,
                    pageSize: a
                })
            }
            function $(e) {
                return Me.post("/liveservice/v6/checkMediaLivePassword", {
                    mediaLivePk: e.mediaLivePk,
                    password: e.password
                })
            }
            function q(e) {
                var t = e.mediaLivePk;
                return Me.get("/liveservice/v1/mediaLive/" + t + "/currentRecommendGoods")
            }
            function z(e) {
                var t = e.mediaLivePk;
                return Me.get("/userservice/v2/mediaLiveGifts", {
                    mediaLivePk: t
                })
            }
            function F(e) {
                var t = e.mediaLivePk
                  , n = e.giftNum
                  , i = e.quantity
                  , a = e.chatRoomId
                  , r = e.userId
                  , o = e.nickName
                  , s = e.userAvatar
                  , u = e.jwt;
                return Me.post("/userservice/v3/redeemMediaLiveGift", {
                    mediaLivePk: t,
                    giftNum: n,
                    quantity: i,
                    platform: 0,
                    hxChatRoomId: 1,
                    itChatRoomId: a,
                    userId4HX: r,
                    userId4IT: r,
                    nickName4IM: o,
                    userAvatar: s
                }, {
                    jwt: u,
                    userId: r
                })
            }
            function Y(e) {
                var t = e.mediaLivePk;
                return Me.get("/newsservice/v1/getMatchByMediaLivePk", {
                    mediaLivePk: t
                })
            }
            function K(e) {
                var t = e.mediaId;
                return Me.get("/newsservice/v1/weMediaDetail", {
                    weMediaSid: t
                }, {
                    cache: !0
                })
            }
            function J(e) {
                var t = e.categoryPk
                  , n = e.goodsPk;
                return Me.get("/userservice/v1/goods/detail", {
                    categoryPk: t,
                    goodsPk: n,
                    fromSourceParm: Me.getShareDataOrId().userId,
                    shareId: Me.getShareDataOrId().shareId
                })
            }
            function X() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5;
                return Me.get("/newsservice/v9/hottestNews", {
                    size: e
                })
            }
            function Q(e) {
                var t = e.sid
                  , n = e.contentType;
                return Me.put("/newsservice/v9/newslike/" + t, {
                    contentType: n
                })
            }
            function Z(e) {
                var t = e.topicPk
                  , n = e.jwt
                  , i = e.userId;
                return Me.get("/newsservice/v1/communityTopic/" + t, {}, {
                    jwt: n,
                    userId: i,
                    deviceId: i
                })
            }
            function ee(e) {
                var t = e.topicPk
                  , n = e.size
                  , i = e.type
                  , a = e.lastPostParam;
                e.sto;
                return Me.get("/newsservice/v1/communityTopic/" + t + "/comments", {
                    size: n,
                    type: i,
                    lastPostParam: a,
                    fromSourceParm: Me.getShareDataOrId().userId,
                    shareId: Me.getShareDataOrId().shareId
                })
            }
            function te(e) {
                var t = e.publishTime
                  , n = e.pageSize
                  , i = void 0 === n ? "30" : n
                  , a = e.gtOrLtPublishTime;
                return Me.get("/newsservice/v1/stock/live", {
                    publishTime: t,
                    pageSize: i,
                    gtOrLtPublishTime: a,
                    fromSourceParm: Me.getShareDataOrId().userId,
                    shareId: Me.getShareDataOrId().shareId
                })
            }
            function ne(e) {
                var t = e.randomSize;
                return Me.get("/userservice/v1/randomRobotUsers", {
                    randomSize: t
                })
            }
            function ie(e) {
                var t = e.mediaId;
                return Me.get("/newsservice/v3/weMediaDetail", {
                    weMediaSid: t
                })
            }
            function ae(e) {
                var t = e.mediaId
                  , n = e.pageSize
                  , i = void 0 === n ? 15 : n
                  , a = e.pageNum
                  , r = void 0 === a ? 1 : a;
                return Me.get("/newsservice/v10/weMediaNews", {
                    weMediaSid: t,
                    pageSize: i,
                    pageNum: r
                })
            }
            function re(e) {
                var t = e.mediaId
                  , n = e.pageSize
                  , i = void 0 === n ? 15 : n
                  , a = e.pageNum
                  , r = void 0 === a ? 1 : a;
                return Me.get("/liveservice/v4/weMediaLives", {
                    mediaId: t,
                    pageSize: i,
                    pageNum: r
                })
            }
            function oe(e) {
                var t = e.mediaId
                  , n = e.pageSize
                  , i = void 0 === n ? 15 : n
                  , a = e.tvReviewPageDownPara
                  , r = void 0 === a ? 0 : a;
                return Me.get("/liveservice/v1/mediaTvPrograms", {
                    mediaId: t,
                    pageSize: i,
                    tvReviewPageDownPara: r
                })
            }
            function se(e) {
                var t = e.jwt
                  , n = e.userId;
                return Me.get("/userservice/v1/userVip", void 0, {
                    jwt: t,
                    userId: n
                })
            }
            function ue(e) {
                var t = e.platform
                  , n = e.jwt
                  , i = e.userId;
                return Me.get("/userservice/v1/vipProducts", {
                    platform: t
                }, {
                    jwt: n,
                    userId: i
                })
            }
            function ce(e) {
                var t = e.code
                  , n = e.paymentType
                  , i = e.commodityNumber
                  , a = e.jwt
                  , r = e.userId;
                return Me.post("/userservice/v1/vipOrder/wxJsPay", {
                    openId: t,
                    commodityNumber: i,
                    paymentType: n
                }, {
                    jwt: a,
                    userId: r
                })
            }
            function le(e) {
                var t = e.orderNum
                  , n = e.paymentType
                  , i = e.jwt
                  , a = e.userId;
                return Me.post("/userservice/v1/vipOrder/wxJsPayComplete", {
                    orderNum: t,
                    paymentType: n
                }, {
                    jwt: i,
                    userId: a
                })
            }
            function de(e) {
                var t = e.cooperateUserId
                  , n = e.cooperateToken
                  , i = e.jwt
                  , a = e.userId;
                return Me.post("/userservice/v1/cooperation/user", {
                    cooperateUserId: t,
                    cooperation: 1,
                    cooperateToken: n
                }, {
                    jwt: i,
                    userId: a
                })
            }
            function pe(e) {
                var t = e.btnName
                  , n = e.jwt
                  , i = e.userId;
                return Me.post("/userservice/act/stat/btnClickCnt?statDaily=1", {
                    btnName: t,
                    delta: 1,
                    actPk: 245
                }, {
                    jwt: n,
                    userId: i
                })
            }
            function fe(e) {
                return Me.get("/userservice/v6/activity/chatRoom/" + e.mediaLiveId, null)
            }
            function he(e) {
                return Me.post("/newsservice/v1/newsTopic/stat/btnClickCnt", e)
            }
            function me(e) {
                var t = e.pluginType
                  , n = e.pluginPk
                  , i = e.userType
                  , a = e.pageSize
                  , r = e.pageNum
                  , o = e.channelId;
                return Me.get("/newsservice/v1/pluginContentList", {
                    pluginType: t,
                    pluginPk: n,
                    userType: i,
                    pageSize: a,
                    pageNum: r,
                    channelId: o
                })
            }
            function ve(e) {
                var t = e.type;
                return Me.get("/supplementservice/v1/agreementRule", {
                    type: t
                })
            }
            function ge(e) {
                var t = e.sid;
                return Me.get("/baoliaoservice/v4/baoliao/" + t, {})
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.getMediaDetailExtraInfoApi = t.postQuestionCommentUnlike = t.postQuestionCommentLike = t.getQuestionComments = t.getQuestionDetail = t.getAreaImmediate = t.getAreaVote = t.getHotlineVote = t.getHotlineCloudWord = t.getHotlineMediaLive = t.defaultShareImg = void 0;
            var Ie = n(28)
              , Te = i(Ie)
              , we = n(86)
              , _e = i(we)
              , Se = n(34)
              , Ee = i(Se)
              , Pe = n(40)
              , ye = i(Pe)
              , Oe = n(24)
              , Ae = i(Oe);
            t.prefetchApi = r,
            t.getTcdnNode = o,
            t.wxSharePost = s,
            t.wxSharePostWithoutApi = u,
            t.wxAuth = c,
            t.newWxAuth = l,
            t.WxAuthFromCommonPage = d,
            t.postBigDataLog = p,
            t.putNewsShare = f,
            t.getAppGlobalConfig = h,
            t.getCaptcha = m,
            t.getChannelList = v,
            t.getChannelByAlias = g,
            t.getUniteChannelNews = I,
            t.getRecommendNews = T,
            t.getHotNews = w,
            t.getChannelNews = _,
            t.getNewsDetail = S,
            t.getRelateNewsList = E,
            t.getWonderfulComment = P,
            t.getActivityInfo = y,
            t.vote = O,
            t.getNewstopicDetail = A,
            t.getSetNewstopicDetail = b,
            t.getMoreSetNewstopicDetail = L,
            t.getlivetopicDetail = C,
            t.getTvProgramContent = N,
            t.getTvProgramReviews = D,
            t.searchTvProgram = k,
            t.getTvProgramReviewByPk = M,
            t.getTvMenuOrProgramReview = R,
            t.getMediaLiveDetail = x,
            t.getRelevantLives = j,
            t.getMediaLiveContent = U,
            t.getMediaLiveComments = V,
            t.getMediaLiveVoteList = H,
            t.getLiveStatus = G,
            t.getLiveCount = W,
            t.getLiveGoods = B,
            t.checkMediaLivePassword = $,
            t.getRecommendGoods = q,
            t.getLiveGift = z,
            t.redeemLiveGift = F,
            t.getMatchByMediaLivePk = Y,
            t.getMediaDetail = K,
            t.getMallDetail = J,
            t.getHottestNews = X,
            t.putlikethis = Q,
            t.getGambitdata = Z,
            t.getGambitComments = ee,
            t.getWordLivedetail = te,
            t.getRandomRobotUsers = ne,
            t.getMediaDetails = ie,
            t.getMediaNews = ae,
            t.getMediaLives = re,
            t.getMediaTvPrograms = oe,
            t.getUserVip = se,
            t.getVipProducts = ue,
            t.getVipOrder = ce,
            t.wxJsPayComplete = le,
            t.bindQuickUser = de,
            t.btnClickCnt = pe,
            t.getLiveActivity = fe,
            t.topicBtnClickCnt = he,
            t.getPluginContentList = me,
            t.getAgreement = ve,
            t.getBaoliaoDetail = ge;
            var be = n(321)
              , Le = i(be)
              , Ce = n(19)
              , Ne = i(Ce)
              , De = n(85)
              , ke = i(De)
              , Me = (0,
            Le.default)()
              , Re = "wxcae29d5033bbc074"
              , xe = !0;
            e.env.ISLOCAL;
            Me.onServer && a();
            var je = t.defaultShareImg = "https://sitecdn.itouchtv.cn/sitecdn/assets/ico/itouchtv_logo_with_bg_1024_1024.jpg";
            t.getHotlineMediaLive = function(e) {
                var t = e.lastPostParms
                  , n = e.pageSize;
                return Me.get("/userservice/v1/minsheng/hotline/medialive", {
                    lastPostParms: t,
                    pageSize: n
                })
            }
            ,
            t.getHotlineCloudWord = function(e) {
                var t = e.mediaLivePk;
                return Me.get("/userservice/v1/minsheng/hotline/" + t + "/wordCloud", {})
            }
            ,
            t.getHotlineVote = function(e) {
                var t = e.mediaLivePk;
                return Me.get("/liveservice/v1/mediaLive/voteAreaStat", {
                    mediaLivePk: t,
                    type: 3
                })
            }
            ,
            t.getAreaVote = function(e) {
                var t = e.votePk;
                return Me.get("/newsservice/v1/vote/areaStat", {
                    votePk: t
                })
            }
            ,
            t.getAreaImmediate = function(e) {
                var t = e.votePkList;
                return Me.post("/newsservice/v1/vote/simpleQuery", {
                    votePkList: t
                })
            }
            ,
            t.getQuestionDetail = function(e) {
                var t = e.questionPk;
                return Me.get("/userservice/v1/zjy/unify/question", {
                    questionPk: t
                })
            }
            ,
            t.getQuestionComments = function(e) {
                var t = e.questionAnswerPk
                  , n = e.beginScore
                  , i = void 0 === n ? 0 : n
                  , a = e.pageSize
                  , r = void 0 === a ? 10 : a;
                return Me.get("/newsservice/v1/questionComments", {
                    questionAnswerPk: t,
                    beginScore: i,
                    pageSize: r
                })
            }
            ,
            t.postQuestionCommentLike = function(e) {
                var t = e.questionAnswerPk
                  , n = e.commentsPk;
                return Me.put("/newsservice/v1/questionComments/like", {
                    questionAnswerPk: t,
                    commentsPk: n
                })
            }
            ,
            t.postQuestionCommentUnlike = function(e) {
                var t = e.questionAnswerPk
                  , n = e.commentsPk;
                return Me.put("/newsservice/v1/questionComments/unlike", {
                    questionAnswerPk: t,
                    commentsPk: n
                })
            }
            ,
            t.getMediaDetailExtraInfoApi = function(e) {
                var t = e.weMediaSid;
                return Me.get("/newsservice/v1/weMediaDetailExtraInfo", {
                    weMediaSid: t
                })
            }
        }
        ).call(t, n(72))
    }
}, [331]);
