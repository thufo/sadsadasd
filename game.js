
var global = (function () { return this })(); if (!global && typeof GameGlobal !== 'undefined') global = GameGlobal; var pluginInfoMap = {};; global.requirePlugin = global.requirePlugin || function (path) { var position = path.indexOf('/'); var alias = ''; var pagePath = ''; if (position !== -1) { alias = path.substr(0, position); pagePath = path.substr(position + 1, path.length); } else { alias = path; } if (pluginInfoMap.hasOwnProperty(alias)) { var realPath = ''; if (pagePath.length === 0) { realPath = '__plugin__/' + pluginInfoMap[alias].appid; return require(realPath); } else { realPath = '__plugin__/' + pluginInfoMap[alias].appid + '/' + pagePath; return require(realPath); } } else { console.error('not found alias: ', alias); throw new Error('Plugin ' + alias + ' is not defined.') } }; define("subpackages/game/game.js", function (require, module, exports) {
	"use strict";

	var _typeof2 = require("../../@babel/runtime/helpers/typeof");

	window.__require = function e(t, a, s) {
		function c(n, o) {
			if (!a[n]) {
				if (!t[n]) {
					var r = n.split("/");

					if (r = r[r.length - 1], !t[r]) {
						var l = "function" == typeof __require && __require;
						if (!o && l) return l(r, !0);
						if (i) return i(r, !0);
						throw new Error("Cannot find module '" + n + "'");
					}

					n = r;
				}

				var h = a[n] = {
					exports: {}
				};
				t[n][0].call(h.exports, function (e) {
					return c(t[n][1][e] || e);
				}, h, h.exports, e, t, a, s);
			}

			return a[n].exports;
		}

		for (var i = "function" == typeof __require && __require, n = 0; n < s.length; n++) {
			c(s[n]);
		}

		return c;
	}({
		APath: [function (e, t) {
			"use strict";

			cc._RF.push(t, "c6352ylNVpDgYQVugjxxJ8w", "APath");

			var a = cc.Class({
				init: function init(e) {
					this.cell = e, this.g = 0, this.h = 0, this.f = 0, this.parent = null, this.next = null, this.prev = null, this.state = 0, this.special_node = null;
				}
			}),
				s = cc.Class({
					init: function init(e) {
						this.head = null, this.state = e;
					},
					insert: function insert(e) {
						e.prev = null, e.next = this.head, this.head && (this.head.prev = e), this.head = e, e.state = this.state;
					},
					delete: function _delete(e) {
						e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e == this.head && (this.head = e.next), e.state = 0;
					}
				}),
				c = cc.Class({
					init: function init(e) {
						4 == cc.GameRoomType || 8 == cc.GameRoomType ? this.setMapDataFanFan(e) : this.setMapData(e), this._OpenNodeList = new s(), this._OpenNodeList.init(1), this._CloseNodeList = new s(), this._CloseNodeList.init(2);
					},
					setMapData: function setMapData(e) {
						this._MapNodeGridArr = [];

						for (var t = 0; t < 17; t++) {
							for (var s = [], c = 0; c < 17; c++) {
								var i = e[t][c];
								null == i || 2 != i._Type && 3 != i._Type ? s.push(null) : (s.push(new a()), s.back().init(i));
							}

							this._MapNodeGridArr.push(s);
						}

						for (s = [[11, 6, 10, 5], [6, 5, 5, 6], [5, 10, 6, 11], [11, 10, 10, 11]], t = 0; t < s.length; t++) {
							this._MapNodeGridArr[s[t][0]][s[t][1]].special_node = this._MapNodeGridArr[s[t][2]][s[t][3]], this._MapNodeGridArr[s[t][2]][s[t][3]].special_node = this._MapNodeGridArr[s[t][0]][s[t][1]];
						}
					},
					setMapDataFanFan: function setMapDataFanFan(e) {
						this._MapNodeGridArr = [];

						for (var t = 0; t < 13; t++) {
							for (var s = [], c = 0; c < 5; c++) {
								var i = e[t][c];
								null == i || 2 != i._Type && 3 != i._Type ? s.push(null) : (s.push(new a()), s.back().init(i));
							}

							this._MapNodeGridArr.push(s);
						}
					},
					getValueH: function getValueH(e, t) {
						return Math.abs(t._CellPos.x - e._CellPos.x) + Math.abs(t._CellPos.y - e._CellPos.y);
					},
					getMinFValueNode: function getMinFValueNode() {
						for (var e = 4095, t = null, a = this._OpenNodeList.head; a;) {
							a.f < e && (t = a, e = a.f), a = a.next;
						}

						return t;
					},
					isValidNewNode: function isValidNewNode(e, t) {
						return null != e && (e.cell._ChessCellState != cc.ChessCellType.ChessCell_Chess || e.cell == t) && 2 != e.state;
					},
					getBoundNodeArr: function getBoundNodeArr(e, t) {
						for (var a = this._MapNodeGridArr.length, s = this._MapNodeGridArr.front().length, c = [], i = [[0, 1], [-1, 0], [0, -1], [1, 0]], n = 0; n < i.length; n++) {
							var o = e.cell._CellPos.x + i[n][0],
								r = e.cell._CellPos.y + i[n][1];

							if (!(o < 0 || o >= a || r < 0 || r >= s)) {
								var l = this._MapNodeGridArr[o][r];
								null != l && (3 != l.cell._Type ? this.isValidNewNode(l, t) && c.push(l) : (i[n][0] *= 2, i[n][1] *= 2, n--));
							}
						}

						return this.isValidNewNode(e.special_node, t) && c.push(e.special_node), c;
					},
					findPath: function findPath(e, t) {
						for ((a = this._MapNodeGridArr[e._CellPos.x][e._CellPos.y]).g = 0, a.h = this.getValueH(e, t), a.f = a.g + a.h, this._OpenNodeList.insert(a); ;) {
							var a;
							if (null == (a = this.getMinFValueNode())) break;
							this._OpenNodeList.delete(a), this._CloseNodeList.insert(a);

							for (var s = this.getBoundNodeArr(a, t), c = 0; c < s.length; c++) {
								if (1 == s[c].state) {
									if (!(a.g + 1 < s[c].g)) continue;
									s[c].g = a.g + 1, s[c].f = a.g + a.h, s[c].parent = a, this._OpenNodeList.delete(s[c]);
								} else s[c].g = a.g + 1, s[c].h = this.getValueH(s[c].cell, t), s[c].f = a.g + a.h, s[c].parent = a;

								if (this._OpenNodeList.insert(s[c]), s[c].cell == t) return !0;
							}
						}

						return !1;
					},
					getPathNodeList: function getPathNodeList() {
						for (var e = [], t = this._OpenNodeList.head; t;) {
							e.push_front(t.cell), t = t.parent;
						}

						return e;
					}
				});
			t.exports = c, cc._RF.pop();
		}, {}],
		AccountSettings: [function (e, t) {
			"use strict";

			cc._RF.push(t, "ec45cRD/TJFxrqC9b1kYMsR", "AccountSettings"), cc.Class({
				extends: cc.Component,
				properties: {
					actorPartListPrefab: {
						default: null,
						type: cc.Prefab
					},
					headFramePrefab: {
						default: null,
						type: cc.Prefab
					},
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					var e = this;
					this.node.getChildByName("BtnClose").on("click", function () {
						cc.audioEngine.playEffect(e.buttonAudio), e.node.destroy();
					}), this._ActorPartArr = [];

					for (var t = 0; t < 3; t++) {
						var a = cc.instantiate(this.actorPartListPrefab).getComponent("ActorPartList");
						this.node.addChild(a.node), a.node.scale = .8, a.node.y = 5 - 90 * t, a.init(t), this._ActorPartArr.push(a);
					}

					this._HeadFrame = cc.instantiate(this.headFramePrefab).getComponent("HeadFrame"), this.node.getChildByName("HeadFrameBg").addChild(this._HeadFrame.node), this._HeadFrame.setGameActorPreview(), this._HeadFrame.showActor(cc.GameCache.getActor()), this.node.on("preview", function () {
						e.node && e.showGameActorPreview();
					}), this._EditBox = this.node.getChildByName("EditBox").getComponent(cc.EditBox), this._EditBox.string = cc.GameCache.getName(), this._EditBox.node.on("editing-did-ended", function (e) {
						if (1 == cc.PlatformType) {
							var t = cc.GameCache.getOpenID();
							if ("" != t) return void cc.Websocket.Send(cc.ClientProtocol.CheckStringValidEx(t, e.string));
						}

						cc.Websocket.Send(cc.ClientProtocol.CheckStringValid(e.string));
					}), this.node.getChildByName("BtnOk").on("click", function () {
						cc.AppUtil.showWXVideoAd(function () {
							null != e.node && (e.saveUserInfo(), e.node.destroy());
						});
					}), this.node.getChildByName("BtnHelp").on("click", function () {
						cc.audioEngine.playEffect(e.buttonAudio), cc.AppUtil.addPrefabToNode("GameHelp", e.node);
					});
				},
				onEnable: function onEnable() {
					cc.AppUtil.showWXGameBannerAd(!0);
				},
				onDisable: function onDisable() {
					cc.AppUtil.showWXGameBannerAd(!1);
				},
				showGameActorPreview: function showGameActorPreview() {
					for (var e = {
						clothes: 0,
						face: 0,
						head: 0
					}, t = ["head", "face", "clothes"], a = 0; a < this._ActorPartArr.length; a++) {
						e[t[a]] = this._ActorPartArr[a].getGameItemSelected();
					}

					this._HeadFrame.showActor(e);
				},
				onCheckStringValid: function onCheckStringValid(e) {
					1 != e && (this._EditBox.string = cc.GameCache.getName(), cc.AppUtil.showToast("昵称中不能含有敏感字符！"));
				},
				saveUserInfo: function saveUserInfo() {
					var e = this._EditBox.string;

					if ("" != e) {
						e != cc.GameCache.getName() && (cc.GameCache.setName(e), cc.Websocket.Send(cc.ClientProtocol.ChangeNickName(e)));

						for (var t = cc.GameCache.getActor(), a = ["head", "face", "clothes"], s = !1, c = 0; c < this._ActorPartArr.length; c++) {
							var i = this._ActorPartArr[c].getGameItemSelected();

							i != t[a[c]] && (t[a[c]] = i, s = !0);
						}

						s && cc.Websocket.Send(cc.ClientProtocol.ChangeActor(t.clothes, t.face, t.head));
					} else cc.AppUtil.showToast("请输入您的游戏昵称！");
				}
			}), cc._RF.pop();
		}, {}],
		ActorPartList: [function (e, t) {
			"use strict";

			cc._RF.push(t, "52a8b8QoyxOuIxAy5/2AjS4", "ActorPartList"), cc.Class({
				extends: cc.Component,
				properties: {
					clothes_images: {
						default: [],
						type: cc.SpriteFrame
					},
					face_images: {
						default: [],
						type: cc.SpriteFrame
					},
					head_images: {
						default: [],
						type: cc.SpriteFrame
					},
					actor_item_prefab: {
						default: null,
						type: cc.Prefab
					},
					tapAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				ctor: function ctor() {
					this._ListViewIndex = 0, this._ItemsSelected = -1;
				},
				onLoad: function onLoad() {
					var e = this;
					this._ScrollView = this.node.getChildByName("ScrollView").getComponent(cc.ScrollView), this._ScrollView.node.on("scroll-ended", function (t) {
						e._ListViewIndex = Math.floor((Math.abs(t.getScrollOffset().x) + 60) / 120);
					}), this._GameItemsArr = [];

					for (var t = 1; t <= 10; t++) {
						var a = cc.instantiate(this.actor_item_prefab);
						this._ScrollView.content.addChild(a), (s = a.getChildByName("Btn")).name = t.toString(), s.on("click", function (t) {
							e.node && (cc.audioEngine.playEffect(e.tapAudio), e.showGameItemSelected(parseInt(t.name) - 1, !1), e.node.parent.emit("preview"));
						}), this._GameItemsArr.push(a);
					}

					for (this._ScrollView.content.getComponent(cc.Layout).updateLayout(), this._DirBtnArr = [], t = 1; t <= 2; t++) {
						var s;
						(s = this.node.getChildByName("BtnTap_" + t)).name = t.toString(), s.on("click", function (t) {
							e.node && (1 == parseInt(t.name) ? e._ListViewIndex > 0 && e._ListViewIndex-- : e._ListViewIndex < 6 && e._ListViewIndex++, e._ScrollView.scrollToOffset(cc.v2(120 * e._ListViewIndex, 0), 1), cc.audioEngine.playEffect(e.tapAudio));
						}), this._DirBtnArr.push(s);
					}
				},
				update: function update() {
					this._DirBtnArr[0].opacity = this._ListViewIndex <= 0 ? 100 : 255, this._DirBtnArr[1].opacity = this._ListViewIndex >= 6 ? 100 : 255;
				},
				init: function init(e) {
					this._ActorIndex = e, this._ListViewIndex = 0, this._ItemsSelected = -1;

					for (var t = cc.GameCache.getActor(), a = [t.head, t.face, t.clothes], s = [this.head_images, this.face_images, this.clothes_images], c = 0; c < this._GameItemsArr.length; c++) {
						this._GameItemsArr[c].getChildByName("Selected").active = !1, this._GameItemsArr[c].getChildByName("Item").getComponent(cc.Sprite).spriteFrame = s[e][c];
					}

					a[e] > 0 && this.showGameItemSelected(a[e] - 1, !0);
				},
				showGameItemSelected: function showGameItemSelected(e, t) {
					-1 != e && (this._ItemsSelected == e ? (this._GameItemsArr[e].getChildByName("Selected").active = !1, this._ItemsSelected = -1) : (-1 != this._ItemsSelected && (this._GameItemsArr[this._ItemsSelected].getChildByName("Selected").active = !1), this._GameItemsArr[e].getChildByName("Selected").active = !0, this._ItemsSelected = e), t && (this._ScrollView.scrollToOffset(cc.v2(120 * e, 0), 0), this._ListViewIndex = e));
				},
				getGameItemSelected: function getGameItemSelected() {
					return this._ItemsSelected + 1;
				}
			}), cc._RF.pop();
		}, {}],
		AlertView: [function (e, t) {
			"use strict";

			cc._RF.push(t, "06306Bp1AdD7rkK7ntdnVZd", "AlertView"), cc.Class({
				extends: cc.Component,
				properties: {
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					this._AlertBg = this.node.getChildByName("AlertBg"), this._btn_1 = this._AlertBg.getChildByName("BtnOk"), this._btn_1.on("click", this.onBtnClicked, this), this._btn_2 = this._AlertBg.getChildByName("BtnCancel"), this._btn_2.on("click", this.onBtnClicked, this), this._CallbackFunc = null, this._RichTextCtrl = this._AlertBg.getChildByName("Text").getComponent(cc.RichText);
				},
				onBtnClicked: function onBtnClicked(e) {
					cc.AppUtil.playAudioEffect(this.buttonAudio), this.node.active = !1, this._CallbackFunc && this._CallbackFunc("BtnOk" == e.node.name), this._CallbackFunc = null, this._RichTextCtrl.string = "";
				},
				showAlertView: function showAlertView(e, t, a) {
					this.node.active = !0, this._RichTextCtrl.string = e, this._CallbackFunc = t, this._btn_2.active = a, this._btn_1.x = a ? 80 : 0, this._AlertBg.scale = 0, this._AlertBg.opacity = 0;
					var s = cc.scaleTo(.1, 1),
						c = cc.fadeIn(.1);
					this._AlertBg.runAction(cc.spawn(s, c)), this.setButtonsText(["\u786E\u5B9A", "\u53D6\u6D88"]);
				},
				setButtonsText: function setButtonsText(e) {
					for (var t = [this._btn_1, this._btn_2], a = 0; a < 2; a++) {
						t[a].getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = e[a];
					}
				}
			}), cc._RF.pop();
		}, {}],
		AppUtil: [function (e, t) {
			"use strict";

			cc._RF.push(t, "35ffcUSFplHf7W9kkzMvV3a", "AppUtil");

			var a = cc.Class({
				ctor: function ctor() {
					this._WXGameInterstitialAd = null, this._RewardedVideoAd = null, this._WXCustomAd = null, this._WXGameClubBtn = null, this._ShowAdTime = 0, this._BannerWArr = [300, 300, 128, 0, 0, 600, 320];
				},
				addLoading: function addLoading() {
					var e = cc.find("Loading");
					e && (e.active = !0);
				},
				delLoading: function delLoading() {
					var e = cc.find("Loading");
					e && (e.active = !1);
				},
				loadResFromBundle: function loadResFromBundle(e, t, a) {
					cc.assetManager.getBundle("game").load(e, t, function (e, t) {
						a(t);
					});
				},
				getChildByNameLoop: function getChildByNameLoop(e, t) {
					if (null == t && (t = cc.Canvas.instance.node), t.name == e) return t;

					for (var a = 0; a < t.children.length; a++) {
						var s = this.getChildByNameLoop(e, t.children[a]);
						if (s) return s;
					}

					return null;
				},
				addPrefabToNode: function addPrefabToNode(e, t, a, s, c, i) {
					null == t && (t = cc.Canvas.instance.node), this.loadResFromBundle(cc.js.formatStr("prefab/%s", e), cc.Prefab, function (n) {
						if (t.children) {
							var o = cc.instantiate(n);
							t.addChild(o), o.name = e, a && o.setPosition(a), s && o.setScale(s), c && o.runAction(cc.sequence(cc.delayTime(c - .3), cc.fadeOut(.5), cc.callFunc(cc.AppUtil.onDestroyFromParent, cc.AppUtil))), i && i(o);
						}
					});
				},
				showToast: function showToast(e, t) {
					null == t && (t = 0), this.addPrefabToNode("ToastNode", cc.director.getScene(), null, null, null, function (a) {
						a.getComponent("ToastNode").initData({
							content: e,
							type: t
						}), a.zIndex = cc.macro.MAX_ZINDEX;
					});
				},
				onDestroyFromParent: function onDestroyFromParent(e) {
					e.destroy();
				},
				showExpression: function showExpression(e, t, a) {
					var s = new cc.Node(),
						c = s.addComponent(cc.Sprite);
					e.addChild(s), c.spriteFrame = t;
					var i = cc.scaleTo(.15, a + .1 * a),
						n = cc.scaleTo(.15, a),
						o = cc.repeat(cc.sequence(i, n), 5),
						r = cc.sequence(o, cc.fadeOut(.5), cc.callFunc(this.onDestroyFromParent, this));
					s.runAction(r);
				},
				shareAppMessageForByteDance: function shareAppMessageForByteDance(e) {
					var t = function t() {
						wx.shareAppMessage({
							templateId: "1di02876g5dl11ij90",
							query: e,
							fail: function fail() {
								wx.showToast({
									title: "\u5206\u4EAB\u5931\u8D25\uFF01",
									icon: "none",
									duration: 800
								});
							}
						});
					};

					wx.checkSession({
						success: function success() {
							t();
						},
						fail: function fail() {
							wx.login({
								success: function success() {
									t();
								},
								fail: function fail() {
									wx.showToast({
										title: "登录后再分享好友！",
										icon: "none",
										duration: 800
									});
								}
							});
						}
					});
				},
				shareAppMessage: function shareAppMessage(e, t, a, s) {
					if (3 != cc.PlatformType) {
						if (cc.sys.isNative) {
							var c = "?" + e;
							return cc.sys.OS_ANDROID === cc.sys.os && jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showShare", "(Ljava/lang/String;)V", c), void (cc.sys.OS_IOS === cc.sys.os && jsb.reflection.callStaticMethod("AppController", "ShareWXFriend:", c));
						}

						wx && wx.shareAppMessage ? wx.shareAppMessage({
							title: t,
							imageUrlId: a,
							imageUrl: s,
							query: e
						}) : this.showToast("\u8BE5\u6E38\u620F\u529F\u80FD\u672C\u6E20\u9053\u6682\u4E0D\u652F\u6301\uFF01");
					} else this.shareAppMessageForByteDance(e);
				},
				shareAppMessageWatch: function shareAppMessageWatch() {
					var e = cc.js.formatStr("t=%d&r=%d&g=%d&w=%d", new Date().getTime(), cc.GameRoomType, cc.GameTableNumber, cc.GameCache.getPlayerID());
					this.shareAppMessage(e, "\u56DB\u56FD\u5927\u6218\u9080\u60A8\u6765\u89C2\u6218\uFF01", "ToeJ5sCUStW429mM8zclvg==", "https://mmocgame.qpic.cn/wechatgame/T0y0ZmAyJ7ozia2acbiaSo5yic2RnAXAsZbAUQ4B1ob8zZDylhyRacaDGUiaygGH0WFH/0");
				},
				shareAppMessageForReview: function shareAppMessageForReview(e) {
					var t = cc.js.formatStr("k=%s", e);
					this.shareAppMessage(t, "\u56DB\u56FD\u519B\u68CB\u6E38\u620F\u590D\u76D8\uFF01", "b3JzSXvuROmc9ZInFGcVKQ==", "https://mmocgame.qpic.cn/wechatgame/T0y0ZmAyJ7qFRjNl52XMiacC0LmBYiaWGH4GmavpPu0Vf3JnRnVurgn4SVow5dTa8v/0");
				},
				shareAppMessageNormal: function shareAppMessageNormal() {
					var e = cc.js.formatStr("t=%d&r=%d&g=%d", new Date().getTime(), cc.GameRoomType, cc.GameTableNumber);
					this.shareAppMessage(e, "\u4F53\u9A8C\u8FD0\u7B79\u5E37\u5E44\u53AE\u6740\u6218\u573A\u7684\u611F\u89C9\uFF01", "9W0Wln6WQjWjgKQJQw/2PQ==", "https://mmocgame.qpic.cn/wechatgame/T0y0ZmAyJ7rnRKmQsBb5B73zjh39v2busqjubTibPl42u4BGA0v9EZZonBtiariagibN/0");
				},
				createWXVideoAd: function createWXVideoAd() {
					if (this._RewardedVideoAd = null, wx && wx.createRewardedVideoAd) {
						var e = this;
						this._RewardedVideoAd = wx.createRewardedVideoAd({
							adUnitId: ["adunit-d9eed6a4500afa45", "00d07df45e00dc24ad824e79e05f7435", "186e938iikk4ekei3f", "279930", "0f6a4a52a673411db75dbee1e461a0c5", "3a167d097c32bd0b239a27981e29bbe3", "", "8676450"][cc.PlatformType - 1],
							appSid: "b920f74d"
						}), this._RewardedVideoAd.onError(function (e) {
							cc.AppUtil.showToast(cc.js.formatStr("\u52A0\u8F7D\u89C6\u9891\u5931\u8D25\uFF0C\u9519\u8BEF\u7801\uFF1A%d", e.errCode));
						}), this._RewardedVideoAd.onClose(function (t) {
							(t && t.isEnded || void 0 === t) && (e._RewardedVideoFunc(), cc.Websocket.Send(cc.ClientProtocol.SetVideoEvent())), cc.audioEngine.resumeMusic(), cc.audioEngine.resumeAllEffects(), e.showWXCustomAd(!0);
						}), this._RewardedVideoAd.load();
					}

					wx && wx.getRewardedVideoAsync && (e = this, FBInstant.getRewardedVideoAsync("1012579529885501_1013164746493646").then(function (t) {
						return e._RewardedVideoAd = t, t.loadAsync();
					}).catch(function () {
						e._RewardedVideoAd = null;
					}));
				},
				showWXVideoAd: function showWXVideoAd(e) {
					if (cc.sys.isNative) {
						if (cc.JavaToJsCallFunc = function () {
							cc.AppUtil.delLoading(), e(), cc.Websocket.Send(cc.ClientProtocol.SetVideoEvent());
						}, cc.sys.OS_ANDROID === cc.sys.os) {
							var t = jsb.get_android_signature();
							"33607e358cd2f0e829f8567c2100a4de" != t && "" != t || jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "sdkShowVideoAD", "()V");
						}

						cc.sys.OS_IOS === cc.sys.os && (cc.AppUtil.addLoading(), jsb.reflection.callStaticMethod("AppController", "TTAdRewardOpen"));
					} else {
						var a = this;
						9 != cc.PlatformType ? this._RewardedVideoAd ? (this._RewardedVideoFunc = e, this._RewardedVideoAd.show().catch(function () {
							cc.AppUtil.showToast("\u64AD\u653E\u89C6\u9891\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\uFF01"), a._RewardedVideoAd.load().then(function () {
								a._RewardedVideoAd.show();
							});
						}), cc.audioEngine.pauseMusic(), cc.audioEngine.pauseAllEffects(), this.showWXCustomAd(!1)) : 0 == cc.PlatformType ? e() : cc.AppUtil.showToast("\u64AD\u653E\u89C6\u9891\u6682\u672A\u52A0\u8F7D\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\uFF01") : this._RewardedVideoAd && (this._RewardedVideoFunc = e, a._RewardedVideoAd.showAsync().then(function () {
							a._RewardedVideoFunc(), cc.Websocket.Send(cc.ClientProtocol.SetVideoEvent());
						}).catch(function () {
							a._RewardedVideoAd.loadAsync().then(function () {
								a._RewardedVideoAd.showAsync().then(function () {
									a._RewardedVideoFunc(), cc.Websocket.Send(cc.ClientProtocol.SetVideoEvent());
								});
							});
						}));
					}
				},
				createWXGameBannerAd: function createWXGameBannerAd() {
					if (this._OVGameIconAd = null, this._AdBannerList = [], this._WXGameBannerAd = null, !(cc.PlatformType >= 8) && wx && wx.createBannerAd) {
						var e = wx.getSystemInfoSync(),
							t = 7 == cc.PlatformType ? e.pixelRatio : 1,
							a = e.screenWidth * t,
							s = e.screenHeight * t,
							c = this._BannerWArr[cc.PlatformType - 1] * t,
							i = 60 * t,
							n = (a - c) / 2;
						this._WXGameBannerAd = wx.createBannerAd({
							adUnitId: ["adunit-8998504ba4c195b4", "f8f1fcb1597c0a329e0851312588c40c", "4avk86mbsl61igppc4", "279935", "65e913db346e42f4afbfea190bf4752e", "0d8ba869f257dc2686384191080c83cc"][cc.PlatformType - 1],
							style: cc.PlatformType > 3 && cc.PlatformType < 6 ? {} : {
								left: n,
								top: s - i,
								width: c,
								height: i
							}
						});
						var o = this;
						this._WXGameBannerAd.onError(function () {
							o._WXGameBannerAd = null;
						}), 5 == cc.PlatformType ? this._WXGameBannerAd.onClose(function () {
							o._WXGameBannerAd = null;
						}) : this._WXGameBannerAd.onResize(function (e) {
							o._WXGameBannerAd.style.left = (a - e.width) / 2, o._WXGameBannerAd.style.top = s - e.height - (6 == cc.PlatformType ? 0 : 10);
						});
					}
				},
				checkCanShowAd: function checkCanShowAd() {
					if (4 != cc.PlatformType) return !0;
					var e = parseInt(new Date().getTime() / 1e3);
					return !(e - this._ShowAdTime < 30 || (this._ShowAdTime = e, 0));
				},
				addBanner: function addBanner(e, t) {
					var a = null;

					if (t ? (4 == cc.PlatformType && e.iconUrlList.length > 0 && (a = e.iconUrlList[0]), 5 == cc.PlatformType && e.icon && "" != e.icon && (a = e.icon)) : (4 == cc.PlatformType && (e.imgUrlList.length > 0 ? a = e.imgUrlList[0] : e.iconUrlList.length > 0 && (a = e.iconUrlList[0])), 5 == cc.PlatformType && e.imgUrlList.length > 0 && (a = e.imgUrlList[0])), null != a) {
						var s = this;
						this.loadResFromBundle(t ? "prefab/GameIconAd" : "prefab/BannerAd", cc.Prefab, function (c) {
							var i = cc.instantiate(c);
							cc.director.getScene().addChild(i);
							var n = i.getChildByName("Button");
							n.on("click", function () {
								s._OVGameIconAd.reportAdClick({
									adId: e.adId.toString()
								});
							}), i.zIndex = cc.macro.MAX_ZINDEX, t ? (cc.loader.load({
								url: a,
								type: "png"
							}, function (e, t) {
								n.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t);
							}), i.getChildByName("BtnClose").on("click", function () {
								cc.AppUtil.delBannerList();
							})) : (n.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = e.clickBtnTxt, cc.loader.load({
								url: a,
								type: "png"
							}, function (e, t) {
								i.getChildByName("Image").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t);
							}), i.getChildByName("BtnClose").on("click", function () {
								cc.AppUtil.delBannerList();
							})), s._AdBannerList.push(i);
						});
					}
				},
				delBannerList: function delBannerList() {
					for (var e = 0; e < this._AdBannerList.length; e++) {
						this._AdBannerList[e].destroy();
					}

					this._AdBannerList.clear();
				},
				showOriginGameAd: function showOriginGameAd(e, t) {
					if (e) {
						if (!this.checkCanShowAd()) return;
						var a = this;
						if (null == this._OVGameIconAd && (this._OVGameIconAd = qg.createNativeAd({
							adUnitId: ["279942", "ac18614a3c2945d89d7dcbab6355b219"][cc.PlatformType - 4]
						})), this._OVGameIconAd.onError(function (e) {
							a._OVGameIconAd = null, console.log(e);
						}), null == this._OVGameIconAd) return;
						this._OVGameIconAd.onLoad(function (e) {
							for (var s = 0; s < e.adList.length; s++) {
								var c = e.adList[s];
								a._OVGameIconAd.reportAdShow({
									adId: c.adId.toString()
								}), cc.AppUtil.addBanner(c, t);
							}

							console.log(e);
						}), this._OVGameIconAd.load();
					} else 4 == cc.PlatformType && this._OVGameIconAd && this._OVGameIconAd.destroy(), this._OVGameIconAd = null, this.delBannerList();
				},
				showWXGameBannerAd: function showWXGameBannerAd(e) {
					if (cc.sys.isNative) return cc.sys.OS_ANDROID === cc.sys.os && jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "sdkShowBannerAD", "(Z)V", e), void (cc.sys.OS_IOS === cc.sys.os && jsb.reflection.callStaticMethod("AppController", "TTAdBannerShow:", e));
					this._WXGameBannerAd && (e ? this._WXGameBannerAd.show() : this._WXGameBannerAd.hide());
				},
				createWXGameInterstitialAd: function createWXGameInterstitialAd() {
					// if (4 != cc.PlatformType && 8 != cc.PlatformType && (6 == cc.PlatformType && (wx.createInterstitialAd = qg.createInterstitialAd), tt && wx.createInterstitialAd)) {
					// 	var e = this;
					// 	this._WXGameInterstitialAd = wx.createInterstitialAd({
					// 		adUnitId: ["adunit-80d728c64e090fb0", "e321b1559a28f5e26b1dda9568f45d74", "bhl5ikdl69h22ecm0a", "", "c7c9efec460b49e2a94ad0278930b005", "45027d19cdb867d30e75391118842cec"][cc.PlatformType - 1]
					// 	}), this._WXGameInterstitialAd.onError(function () {
					// 		e._WXGameInterstitialAd = null;
					// 	});
					// }
				},
				showWXGameInterstitialAd: function showWXGameInterstitialAd() {
					if (cc.sys.isNative) return cc.sys.OS_ANDROID === cc.sys.os && jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "sdkShowInteractAD", "()V"), void (cc.sys.OS_IOS === cc.sys.os && jsb.reflection.callStaticMethod("AppController", "TTAdInsertShow"));

					if (this._WXGameInterstitialAd) {
						var e = this;

						this._WXGameInterstitialAd.show().catch(function () {
							e._WXGameInterstitialAd.load().then(function () {
								e._WXGameInterstitialAd.show();
							});
						});
					}
				},
				createWXCustomAd: function createWXCustomAd() {
					if (this._WXCustomAd = null, wx && wx.createCustomAd) {
						var e = wx.getSystemInfoSync().screenWidth;
						this._WXCustomAd = wx.createCustomAd({
							adUnitId: "adunit-406e93dd386fb37d",
							adIntervals: 300,
							style: {
								left: e - 70,
								top: -15,
								fixed: !0
							}
						});
						var t = this;

						this._WXCustomAd.onError(function () {
							t._WXCustomAd = null;
						});
					}

					wx && wx.createBlockAd && (e = wx.getSystemInfoSync().screenWidth, this._WXCustomAd = wx.createBlockAd({
						adUnitId: "2e8d77470052daf31cdff19f11a59587",
						size: 1,
						orientation: "landscape",
						style: {
							left: e - 70,
							top: -15
						}
					}), t = this, this._WXCustomAd.onError(function () {
						t._WXCustomAd = null;
					}), this._WXCustomAd.onLoad(function () {
						t._WXCustomAd && t._WXCustomAd.show();
					}));
				},
				showWXCustomAd: function showWXCustomAd(e) {
					this._WXCustomAd && (e ? this._WXCustomAd.show() : this._WXCustomAd.hide());
				},
				createWXGameClubBtn: function createWXGameClubBtn() {
					var e = wx.getSystemInfoSync();
					// this._WXGameClubBtn = wx.createGameClubButton({
					// 	type: "image",
					// 	image: "images/chat.png",
					// 	style: {
					// 		left: e.screenWidth / 2 - 24,
					// 		top: e.screenHeight - 60,
					// 		width: 48,
					// 		height: 42
					// 	}
					// }), this._WXGameClubBtn.hide();
				},
				showWXGameClubBtn: function showWXGameClubBtn(e) {
					null != this._WXGameClubBtn && (e ? this._WXGameClubBtn.show() : this._WXGameClubBtn.hide());
				},
				createGameNavigateAd: function createGameNavigateAd() {
					if (this._WXNavigateAd = null, qg.getSystemInfoSync().platformVersionCode >= 1076) {
						var e = this;
						this._WXNavigateAd = qg.createGamePortalAd({
							adUnitId: "279939"
						}), this._WXNavigateAd.onClose(function () {
							e._WXNavigateAd.load();
						}), this._WXNavigateAd.load();
					} else cc.AppUtil.showToast("\u60A8\u7684\u6E38\u620F\u7248\u672C\u592A\u4F4E\uFF0C\u6682\u4E0D\u652F\u6301\u4E92\u63A8\u76D2\u5B50\uFF01");
				},
				showGameNavigateAd: function showGameNavigateAd() {
					if (this._WXNavigateAd) {
						if (!this.checkCanShowAd()) return void this.showToast("\u70B9\u51FB\u4E92\u63A8\u5E7F\u544A\u7EC4\u4EF6\u4E0D\u80FD\u592A\u9891\u7E41\uFF01");
						var e = this;

						this._WXNavigateAd.show().then(function () { }).catch(function () {
							cc.AppUtil.showToast("\u70B9\u51FB\u4E92\u63A8\u5E7F\u544A\u7EC4\u4EF6\u4E0D\u80FD\u592A\u9891\u7E41\uFF01"), e._WXNavigateAd.load();
						});
					}
				},
				createDesktopIcon: function createDesktopIcon() {
					qg.hasShortcutInstalled({
						success: function success(e) {
							0 == e && qg.installShortcut({
								success: function success() {
									cc.AppUtil.showToast("\u606D\u559C\u60A8\u6210\u529F\u521B\u5EFA\u684C\u9762\u56FE\u6807\uFF01");
								}
							});
						},
						fail: function fail() {
							cc.AppUtil.showToast("\u60A8\u65E0\u9700\u91CD\u590D\u521B\u5EFA\u684C\u9762\u56FE\u6807\uFF01");
						}
					});
				},
				vibrateShort: function vibrateShort() {
					cc.GameCache.getSettingOptionValue(2) && (cc.sys.isNative ? cc.sys.OS_IOS === cc.sys.os ? jsb.reflection.callStaticMethod("AppController", "VibrateShort") : jsb.Device.vibrate(.015) : wx && wx.vibrateShort && wx.vibrateShort());
				},
				playAudioEffect: function playAudioEffect(e) {
					cc.GameCache.getSettingOptionValue(1) && cc.audioEngine.playEffect(e);
				},
				showModal: function showModal(e, t, a) {
					this.addPrefabToNode("AlertView", null, null, null, null, function (s) {
						s.getComponent("AlertView").showAlertView(e, t, a);
					});
				},
				isFullScreen: function isFullScreen() {
					if (!cc.isFullScreen) {
						var e = cc.view.getFrameSize();
						cc.isFullScreen = e.height / e.width > 2;
					}

					return cc.isFullScreen;
				},
				isIPADScreen: function isIPADScreen() {
					if (!cc.isIPADScreen) {
						var e = cc.view.getFrameSize();
						cc.isIPADScreen = e.height / e.width < 1.4;
					}

					return cc.isIPADScreen;
				},
				getCurrentViewScale: function getCurrentViewScale() {
					var e = cc.view.getCanvasSize(),
						t = cc.view.getDesignResolutionSize(),
						a = t.width / t.height,
						s = e.width / e.height,
						c = 1,
						i = 1;
					return a < s ? c = s / a : i = a / s, {
						scaleW: c,
						scaleH: i
					};
				},
				updateCanvasAlignment: function updateCanvasAlignment() {
					if (this.isIPADScreen()) {
						var e = this.getCurrentViewScale().scaleW;
						cc.Canvas.instance.fitHeight = !0, cc.Canvas.instance.node.scaleX = e;
					}
				}
			});
			cc.AppUtil = new a(), cc._RF.pop();
		}, {}],
		Array: [function (e, t) {
			"use strict";

			cc._RF.push(t, "da867rnw7NPSJY6/64gPbIu", "Array");
			Array.prototype.push_front = function (e) {
				this.unshift(e);
			};
			Array.prototype.push_back = function (e) {
				this.push(e);
			};
			Array.prototype.pop_front = function () {
				this.shift();
			};
			Array.prototype.pop_back = function () {
				this.pop();
			};
			Array.prototype.clear = function () {
				this.erase(0, this.length);
			};
			Array.prototype.initial = function (e, t) {
				for (var a = 0; a < e; a++) {
					this.push(t);
				}
			};
			Array.prototype.empty = function () {
				return 0 == this.length;
			};
			Array.prototype.size = function () {
				for (var e = 0, t = 0; t < this.length; t++) {
					null != this[t] && void 0 !== this[t] && (e += 1);
				}

				return e;
			};
			Array.prototype.back = function () {
				return this.empty() ? null : this[this.length - 1];
			};
			Array.prototype.front = function () {
				return this.empty() ? null : this[0];
			};
			Array.prototype.erase = function (e, t) {
				e >= 0 && e < this.length && this.splice(e, t);
			};
			Array.prototype.remove = function (e) {
				this.erase(this.indexOf(e), 1);
			};
			Array.prototype.insert = function (e, t) {
				this.splice(e, 0, t);
			};
			Array.prototype.swap = function (e, t) {
				var a = this[e];
				this[e] = this[t], this[t] = a;
			};
			Array.prototype.shuffle = function () {
				for (var e = 0; e < this.length; e++) {
					var t = Math.floor(Math.random() * this.length),
						a = this[e];
					this[e] = this[t], this[t] = a;
				}
			};
			Array.prototype.clone = function () {
				return [].concat(this);
			};
			Array.prototype.push_array = function (e) {
				for (var t = 0; t < e.length; t++) {
					this.push(e[t]);
				}
			};
			Array.prototype.subarray = function (e, t) {
				return this.slice(e, e + t);
			};
			cc._RF.pop();
		}, {}],
		AutoFluxay: [function (e, t) {
			"use strict";

			cc._RF.push(t, "80788Ii/5hPc74yM17ilYke", "AutoFluxay"), cc.Class({
				extends: cc.Component,
				properties: {
					times: {
						default: 1
					}
				},
				ctor: function ctor() {
					this._start = 0, this._max = 65535;
				},
				onLoad: function onLoad() {
					var e = this.node.getComponent(cc.Sprite);
					this._material = e.getMaterial(0);
				},
				update: function update(e) {
					var t = this._start;
					t > this._max && (t = 0), t += e * this.times, this._material.setProperty("time", t), this._start = t;
				}
			}), cc._RF.pop();
		}, {}],
		Base64: [function (e, t) {
			"use strict";

			cc._RF.push(t, "6dc86N4XQ1IU7DkivEt5Vxr", "Base64");

			var Base64Class = cc.Class({
				ctor: function constructor() {
					this.keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
				},

				encode: function encode(inputString) {
					let char1, char2, char3;
					let byte1, byte2, byte3, byte4;
					let encodedString = "";
					let index = 0;

					inputString = this._utf8_encode(inputString);

					while (index < inputString.length) {
						char1 = inputString.charCodeAt(index++);
						byte1 = char1 >> 2;
						byte2 = ((char1 & 3) << 4) | (char2 = inputString.charCodeAt(index++)) >> 4;
						byte3 = ((char2 & 15) << 2) | (char3 = inputString.charCodeAt(index++)) >> 6;
						byte4 = char3 & 63;

						if (isNaN(char2)) {
							byte3 = byte4 = 64;
						} else if (isNaN(char3)) {
							byte4 = 64;
						}

						encodedString += this.keyString.charAt(byte1) + this.keyString.charAt(byte2) + this.keyString.charAt(byte3) + this.keyString.charAt(byte4);
					}

					return encodedString;
				},
				decode: function decode(input) {
					let firstChar, secondChar, thirdChar, fourthChar;
					let firstByte, secondByte, thirdByte;
					let decodedString = "";
					let index = 0;
					input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
					while (index < input.length) {
						firstChar = this.keyString.indexOf(input.charAt(index++));
						secondChar = this.keyString.indexOf(input.charAt(index++));
						thirdChar = this.keyString.indexOf(input.charAt(index++));
						fourthChar = this.keyString.indexOf(input.charAt(index++));

						firstByte = (firstChar << 2) | (secondChar >> 4);
						secondByte = ((secondChar & 15) << 4) | (thirdChar >> 2);
						thirdByte = ((thirdChar & 3) << 6) | fourthChar;

						decodedString += String.fromCharCode(firstByte);
						if (thirdChar != 64) {
							decodedString += String.fromCharCode(secondByte);
						}
						if (fourthChar != 64) {
							decodedString += String.fromCharCode(thirdByte);
						}
					}

					return this.decodeUTF8(decodedString); // Assuming this.decodeUTF8 is a function to decode UTF8
				}
				,
				_utf8_encode: function _utf8_encode(inputString) {
					inputString = inputString.replace(/\r\n/g, "\n");
					let encodedString = "";

					for (let i = 0; i < inputString.length; i++) {
						let charCode = inputString.charCodeAt(i);

						if (charCode < 128) {
							encodedString += String.fromCharCode(charCode);
						} else if (charCode > 127 && charCode < 2048) {
							encodedString += String.fromCharCode(charCode >> 6 | 192);
							encodedString += String.fromCharCode(63 & charCode | 128);
						} else {
							encodedString += String.fromCharCode(charCode >> 12 | 224);
							encodedString += String.fromCharCode(charCode >> 6 & 63 | 128);
							encodedString += String.fromCharCode(63 & charCode | 128);
						}
					}

					return encodedString;
				},
				decodeUTF8: function decodeUTF8(inputString) {
					let result = "";
					let index = 0;
					let charCode, charCode2, charCode3;
					while (index < inputString.length) {
						charCode = inputString.charCodeAt(index);
						if (charCode < 128) {
							result += String.fromCharCode(charCode);
							index++;
						} else if (charCode > 191 && charCode < 224) {
							charCode2 = inputString.charCodeAt(index + 1);
							result += String.fromCharCode((31 & charCode) << 6 | 63 & charCode2);
							index += 2;
						} else {
							charCode2 = inputString.charCodeAt(index + 1);
							charCode3 = inputString.charCodeAt(index + 2);
							result += String.fromCharCode((15 & charCode) << 12 | (63 & charCode2) << 6 | 63 & charCode3);
							index += 3;
						}
					}
					return result;
				}


			});
			t.exports = Base64Class, cc._RF.pop();
		}, {}],
		BitStream: [function (e, t) {
			"use strict";

			cc._RF.push(t, "93b2cVtEqNLFK+tYqezfQbm", "BitStream");

			var a = cc.Class({
				ctor: function ctor() {
					var e = arguments[0];
					this.buf = void 0 !== e ? Array.from(new Uint8Array(e)) : [], this.pos = 0;
				},
				getBufferLength: function getBufferLength() {
					return this.buf.length - this.pos;
				},
				getBuffer: function getBuffer() {
					return this.buf;
				},
				finish: function finish() {
					for (var e = new Uint8Array(this.buf.length), t = 0; t < this.buf.length; t++) {
						e[t] = this.buf[t];
					}

					return e.buffer;
				},
				writeBuffer: function writeBuffer(e) {
					this.buf.push_array(e);
				},
				writeByte: function writeByte(e) {
					this.buf.push(255 & e);
				},
				writeShort: function writeShort(e) {
					this.writeByte(255 & e), this.writeByte(e >>> 8 & 255);
				},
				writeInt: function writeInt(e) {
					this.writeShort(65535 & e), this.writeShort(e >>> 16 & 65535);
				},
				writeString: function writeString(e) {
					var t = this.writeUtf8(e);
					this.writeShort(t.length), this.writeBuffer(t);
				},
				readBuffer: function readBuffer(e) {
					for (var t = [], a = 0; a < e; a++) {
						t.push(this.buf[this.pos++]);
					}

					return t;
				},
				toNumber: function toNumber(e) {
					for (var t = 0, a = e.length - 1; a >= 0; a--) {
						t = t << 8 | e[a];
					}

					return t;
				},
				readByte: function readByte() {
					var e = this.toNumber(this.readBuffer(1));
					return e > 127 && (e -= 256), e;
				},
				readShort: function readShort() {
					var e = this.toNumber(this.readBuffer(2));
					return e > 32767 && (e -= 65536), e;
				},
				readInt: function readInt() {
					var e = this.toNumber(this.readBuffer(4));
					return e > 2147483647 && (e -= 4294967296), e;
				},
				readUByte: function readUByte() {
					return this.toNumber(this.readBuffer(1));
				},
				readUInt: function readUInt() {
					return this.toNumber(this.readBuffer(4));
				},
				readString: function readString() {
					return this.readUtf8(this.readBuffer(this.readShort()));
				},
				readUtf8: function readUtf8(e) {
					for (var t = function t(e) {
						if (e < 65536) return String.fromCharCode(e);
						var t = 55296 + (e - 65536 >> 10),
							a = 56320 + (1023 & e);
						return String.fromCharCode(t, a);
					}, a = "", s = e.length, c = 0; c < s;) {
						var i = e[c++];
						a += t(i < 128 ? i : i >> 5 == 6 ? (31 & i) << 6 | 63 & e[c++] : i >> 4 == 14 ? (15 & i) << 12 | (63 & e[c++]) << 6 | 63 & e[c++] : (7 & i) << 18 | (63 & e[c++]) << 12 | (63 & e[c++]) << 6 | 63 & e[c++]);
					}

					return a;
				},
				writeUtf8: function writeUtf8(e) {
					for (var t = [], a = 0; a < e.length; a++) {
						var s = e.charCodeAt(a);
						s < 128 ? t.push(127 & s) : s < 2048 ? (t.push(s >> 6 | 192), t.push(63 & s | 128)) : s < 65536 ? (t.push(s >> 12 & 15 | 224), t.push(s >> 6 & 63 | 128), t.push(63 & s | 128)) : (t.push(cp >> 18 & 7 | 240), t.push(cp >> 12 & 63 | 128), t.push(cp >> 6 & 63 | 128), t.push(63 & cp | 128));
					}

					return t;
				}
			});
			t.exports = a, cc._RF.pop();
		}, {}],
		ChessAIFanFan: [function (e, t) {
			"use strict";

			cc._RF.push(t, "592557671xB4pp0k/CPhg4c", "ChessAIFanFan");

			var a = e("runtime"),
				s = cc.Class({
					ctor: function ctor() {
						this._ChessBoard = arguments[0], this._AI_Color = 0, this._ChessValueArr = [0, 1e4, 120, 10, 20, 40, 100, 150, 300, 600, 1e3, 200, 800], this._MaxDepth = 3, this._PrepareThink = !1, this._PrevTempValue = 0, this.initAllCanReachableCells();
					},
					setAIColor: function setAIColor(e) {
						this._AI_Color = e;
					},
					prepareThinkChess: function prepareThinkChess() {
						this._PrepareThink = !0;
					},
					getChessAIPrepare: function getChessAIPrepare() {
						return this._PrepareThink;
					},
					initAllCanReachableCells: function initAllCanReachableCells() {
						for (var e = this._ChessBoard._ChessCellArr, t = [], a = [], s = 1; s <= 11; s++) {
							6 != s && (t.push(e[s][0]), a.push(e[s][4]));
						}

						var c = [],
							i = [],
							n = [],
							o = [];

						for (s = 0; s <= 4; s++) {
							c.push(e[1][s]), i.push(e[5][s]), n.push(e[7][s]), o.push(e[11][s]);
						}

						var r = function r(e, t) {
							var a = e.clone();
							return a.erase(t, 1), a;
						},
							l = function l(e, t, a) {
								var s = [];
								return s.push(e[t - 1][a - 1]), s.push(e[t - 1][a]), s.push(e[t - 1][a + 1]), s.push(e[t][a - 1]), s.push(e[t][a + 1]), s.push(e[t + 1][a - 1]), s.push(e[t + 1][a]), s.push(e[t + 1][a + 1]), s;
							},
							h = function h(e, t, a) {
								var s = [];
								return s.push(e[t - 1][a]), s.push(e[t][a - 1]), s.push(e[t][a + 1]), s.push(e[t + 1][a]), s;
							},
							C = [[2, 2], [3, 1], [3, 3], [4, 2], [8, 2], [9, 1], [9, 3], [10, 2]];

						for (s = 0; s < C.length; s++) {
							e[(u = C[s])[0]][u[1]]._CanReachableCells = [], e[u[0]][u[1]]._CanReachableCells.push_array(h(e, u[0], u[1]));
						}

						var d = [[2, 1], [2, 3], [3, 2], [4, 1], [4, 3], [8, 1], [8, 3], [9, 2], [10, 1], [10, 3]];

						for (s = 0; s < d.length; s++) {
							var u;
							e[(u = d[s])[0]][u[1]]._CanReachableCells = [], e[u[0]][u[1]]._CanReachableCells.push_array(l(e, u[0], u[1]));
						}

						e[0][0]._CanReachableCells = [e[0][1], e[1][0]], e[0][1]._CanReachableCells = [e[0][0], e[0][2], e[1][1]], e[0][2]._CanReachableCells = [e[0][1], e[0][3], e[1][2]], e[0][3]._CanReachableCells = [e[0][2], e[0][4], e[1][3]], e[0][4]._CanReachableCells = [e[0][3], e[1][4]], e[1][0]._CanReachableCells = [e[0][0], e[2][1]], e[1][0]._CanReachableCells.push_array(r(t, 0)), e[1][0]._CanReachableCells.push_array(r(c, 0)), e[1][1]._CanReachableCells = [e[0][1], e[2][1]], e[1][1]._CanReachableCells.push_array(r(c, 1)), e[1][2]._CanReachableCells = [e[0][2], e[2][2], e[2][1], e[2][3]], e[1][2]._CanReachableCells.push_array(r(c, 2)), e[1][3]._CanReachableCells = [e[0][3], e[2][3]], e[1][3]._CanReachableCells.push_array(r(c, 3)), e[1][4]._CanReachableCells = [e[0][4], e[2][3]], e[1][4]._CanReachableCells.push_array(r(a, 0)), e[1][4]._CanReachableCells.push_array(r(c, 4)), e[2][0]._CanReachableCells = [e[2][1]], e[2][0]._CanReachableCells.push_array(r(t, 1)), e[2][4]._CanReachableCells = [e[2][3]], e[2][4]._CanReachableCells.push_array(r(a, 1)), e[3][0]._CanReachableCells = [e[2][1], e[3][1], e[4][1]], e[3][0]._CanReachableCells.push_array(r(t, 2)), e[3][4]._CanReachableCells = [e[2][3], e[3][3], e[4][3]], e[3][4]._CanReachableCells.push_array(r(a, 2)), e[4][0]._CanReachableCells = [e[4][1]], e[4][0]._CanReachableCells.push_array(r(t, 3)), e[4][4]._CanReachableCells = [e[4][3]], e[4][4]._CanReachableCells.push_array(r(a, 3)), e[5][0]._CanReachableCells = [e[4][1]], e[5][0]._CanReachableCells.push_array(r(t, 4)), e[5][0]._CanReachableCells.push_array(r(i, 0)), e[5][1]._CanReachableCells = [e[4][1]], e[5][1]._CanReachableCells.push_array(r(i, 1)), e[5][2]._CanReachableCells = [e[4][1], e[4][2], e[4][3], e[7][2]], e[5][2]._CanReachableCells.push_array(r(i, 2)), e[5][3]._CanReachableCells = [e[4][3]], e[5][3]._CanReachableCells.push_array(r(i, 3)), e[5][4]._CanReachableCells = [e[4][3]], e[5][4]._CanReachableCells.push_array(r(a, 4)), e[5][4]._CanReachableCells.push_array(r(i, 4)), e[7][0]._CanReachableCells = [e[8][1]], e[7][0]._CanReachableCells.push_array(r(t, 5)), e[7][0]._CanReachableCells.push_array(r(n, 0)), e[7][1]._CanReachableCells = [e[8][1]], e[7][1]._CanReachableCells.push_array(r(n, 1)), e[7][2]._CanReachableCells = [e[8][1], e[8][2], e[8][3], e[5][2]], e[7][2]._CanReachableCells.push_array(r(n, 2)), e[7][3]._CanReachableCells = [e[8][3]], e[7][3]._CanReachableCells.push_array(r(n, 3)), e[7][4]._CanReachableCells = [e[8][3]], e[7][4]._CanReachableCells.push_array(r(n, 4)), e[7][4]._CanReachableCells.push_array(r(a, 5)), e[8][0]._CanReachableCells = [e[8][1]], e[8][0]._CanReachableCells.push_array(r(t, 6)), e[8][4]._CanReachableCells = [e[8][3]], e[8][4]._CanReachableCells.push_array(r(a, 6)), e[9][0]._CanReachableCells = [e[8][1], e[9][1], e[10][1]], e[9][0]._CanReachableCells.push_array(r(t, 7)), e[9][4]._CanReachableCells = [e[8][3], e[9][3], e[10][3]], e[9][4]._CanReachableCells.push_array(r(a, 7)), e[10][0]._CanReachableCells = [e[10][1]], e[10][0]._CanReachableCells.push_array(r(t, 8)), e[10][4]._CanReachableCells = [e[10][3]], e[10][4]._CanReachableCells.push_array(r(a, 8)), e[11][0]._CanReachableCells = [e[10][1], e[12][0]], e[11][0]._CanReachableCells.push_array(r(t, 9)), e[11][0]._CanReachableCells.push_array(r(o, 0)), e[11][1]._CanReachableCells = [e[10][1], e[12][1]], e[11][1]._CanReachableCells.push_array(r(o, 1)), e[11][2]._CanReachableCells = [e[10][1], e[10][2], e[10][3], e[12][2]], e[11][2]._CanReachableCells.push_array(r(o, 2)), e[11][3]._CanReachableCells = [e[10][3], e[12][3]], e[11][3]._CanReachableCells.push_array(r(o, 3)), e[11][4]._CanReachableCells = [e[10][3], e[12][4]], e[11][4]._CanReachableCells.push_array(r(a, 9)), e[11][4]._CanReachableCells.push_array(r(o, 4)), e[12][0]._CanReachableCells = [e[12][1], e[11][0]], e[12][1]._CanReachableCells = [e[12][0], e[11][1], e[12][2]], e[12][2]._CanReachableCells = [e[12][1], e[11][2], e[12][3]], e[12][3]._CanReachableCells = [e[12][2], e[11][3], e[12][4]], e[12][4]._CanReachableCells = [e[12][3], e[11][4]];
					},
					genAllMoveArr: function genAllMoveArr(e) {
						for (var t = [], a = this._ChessBoard._ChessCellArr, s = 0; s < 13; s++) {
							for (var c = 0; c < 5; c++) {
								var i = a[s][c];

								if (null != i && i._ChessCellState == cc.ChessCellType.ChessCell_Chess) {
									var n = i.getChess();
									if (null != n && n.getChessColor() == e && !this._ChessBoard.checkCanNotMoveChess(i)) for (var o = 0; o < i._CanReachableCells.length; o++) {
										this._ChessBoard.checkCanEatChess(i, i._CanReachableCells[o]) && cc.ChessCellUtil.checkCanMove(i, i._CanReachableCells[o], this._ChessBoard._ChessCellArr, null) && t.push([i, i._CanReachableCells[o]]);
									}
								}
							}
						}

						return t;
					},
					calcChessValue: function calcChessValue(e, t) {
						for (var a = this._ChessBoard._ChessCellArr, s = 0, c = 0, i = [10, 0, 0], n = 0; n < 13; n++) {
							for (var o = 0; o < 5; o++) {
								if (null != a[n][o] && a[n][o]._ChessCellState == cc.ChessCellType.ChessCell_Chess) {
									var r = a[n][o].getChess(),
										l = r.getChessColor();

									if (0 != l) {
										var h = 0;
										h += 10 * this._ChessValueArr[r.getChessGrade()], h += i[a[n][o]._Type], l == e && (s += h), l == t && (c += h);
									}
								}
							}
						}

						return s - c;
					},
					calcCurSituation: function calcCurSituation() {
						return this.calcChessValue(this._AI_Color, 3 - this._AI_Color);
					},
					makeMoveChess: function makeMoveChess(e, t) {
						var a = e.getChessCellNode(),
							s = t.getChessCellNode(),
							c = t._ChessCellState,
							i = cc.ChessCellUtil.compareTwoChessCell(e, t);
						return e.setChessCellNode(null), -1 != i && 1 != i || t.setChessCellNode(a), 0 == i && t.setChessCellNode(null), [a, s, c];
					},
					unmakeMoveChess: function unmakeMoveChess(e, t, a) {
						e.setChessCellNode(a[0]), t.setChessCellNode(a[1]), t._ChessCellState = a[2];
					},
					thinkChess: function thinkChess() {
						this._BestMove = null, this._doCoroutine = null;
						var e = a.mark(function e(t, s, c, i, n) {
							var o, r, l, h;
							return a.wrap(function (a) {
								for (; ;) {
									switch (a.prev = a.next) {
										case 0:
											if (!(c <= 0)) {
												a.next = 2;
												break;
											}

											return a.abrupt("return", t.calcCurSituation());

										case 2:
											o = t.genAllMoveArr(s ? t._AI_Color : 3 - t._AI_Color), r = 0;

										case 4:
											if (!(r < o.length)) {
												a.next = 24;
												break;
											}

											return l = t.makeMoveChess(o[r][0], o[r][1]), a.delegateYield(e(t, !s, c - 1, i, n), "t0", 7);

										case 7:
											if (h = a.t0, t.unmakeMoveChess(o[r][0], o[r][1], l), !s) {
												a.next = 17;
												break;
											}

											if (!(h > i)) {
												a.next = 15;
												break;
											}

											if (i = h, t._MaxDepth == c && (t._BestMove = o[r]), !(i >= n)) {
												a.next = 15;
												break;
											}

											return a.abrupt("return", n);

										case 15:
											a.next = 21;
											break;

										case 17:
											if (!(h < n)) {
												a.next = 21;
												break;
											}

											if (!(i >= (n = h))) {
												a.next = 21;
												break;
											}

											return a.abrupt("return", i);

										case 21:
											r++, a.next = 4;
											break;

										case 24:
											return a.next = 26, s ? i : n;

										case 26:
											return a.abrupt("return", a.sent);

										case 27:
										case "end":
											return a.stop();
									}
								}
							}, e);
						});
						this._doCoroutine = e(this, !0, this._MaxDepth, -1048575, 1048575), this._PrepareThink = !1;
					},
					sendFlipChessAI: function sendFlipChessAI() {
						for (var e = function e(_e, t) {
							return Math.floor(Math.random() * (_e - t) + t);
						}, t = 0; t < 1e3; t++) {
							var a = e(0, 13),
								s = e(0, 5),
								c = this._ChessBoard._ChessCellArr[a][s];

							if (c && c._ChessCellState == cc.ChessCellType.ChessCell_Chess) {
								var i = c.getChess();
								if (i && 0 == i.getChessColor()) return this._ChessBoard.sendFlipChessTrace(c, !0), !0;
							}
						}

						return !1;
					},
					update: function update() {
						if (this._doCoroutine) {
							var e = this._doCoroutine.next(this._TempValue);

							if (this._TempValue = e.value, e.done) {
								if ((null == this._BestMove || -1048575 == this._TempValue || 1048575 == this._TempValue || this._PrevTempValue == this._TempValue) && this.sendFlipChessAI()) return void (this._doCoroutine = null);
								this._BestMove && (cc.ChessCellUtil.checkCanMove(this._BestMove[0], this._BestMove[1], this._ChessBoard._ChessCellArr, this._ChessBoard._RailroadCellArr) && this._ChessBoard.sendMoveChessTrace(!0), this._PrevTempValue = this._TempValue), this._doCoroutine = null;
							}
						}
					}
				});
			t.exports = s, cc._RF.pop();
		}, {
			runtime: "runtime"
		}],
		ChessAI: [function (e, t) {
			"use strict";

			cc._RF.push(t, "8d74aLMMExOxo+RKDKANmRU", "ChessAI");

			var a = e("runtime"),
				s = cc.Class({
					ctor: function ctor() {
						this._ChessBoard = arguments[0], this._AI_Color = arguments[1], this._ChessValueArr = [0, 1e4, 50, 10, 20, 40, 100, 150, 300, 600, 1e3, 200, 100], this._MaxDepth = 3, this._PrepareThink = !1, this.initAllCanReachableCells();
					},
					prepareThinkChess: function prepareThinkChess() {
						this._PrepareThink = !0;
					},
					getChessAIPrepare: function getChessAIPrepare() {
						return this._PrepareThink;
					},
					initAllCanReachableCells: function initAllCanReachableCells() {
						var e = this._ChessBoard._ChessCellArr;
						e[0][6]._CanReachableCells = [e[1][6], e[0][7]], e[0][8]._CanReachableCells = [e[0][7], e[1][8], e[0][9]], e[0][10]._CanReachableCells = [e[0][9], e[1][10]], e[1][6]._CanReachableCells = [e[2][6], e[3][6], e[4][6], e[5][6], e[6][5], e[6][4], e[6][3], e[6][2], e[6][1], e[6][6], e[8][6], e[10][6], e[11][6], e[12][6], e[13][6], e[14][6], e[15][6], e[2][7], e[1][7], e[1][8], e[1][9], e[1][10], e[0][6]], e[1][7]._CanReachableCells = [e[1][6], e[2][7], e[1][8], e[1][9], e[1][10], e[0][7]], e[1][8]._CanReachableCells = [e[1][7], e[1][6], e[2][7], e[2][8], e[2][9], e[1][9], e[1][10], e[0][8]], e[1][9]._CanReachableCells = [e[1][8], e[1][7], e[1][6], e[2][9], e[1][10], e[0][9]], e[1][10]._CanReachableCells = [e[1][9], e[1][8], e[1][7], e[1][6], e[2][9], e[2][10], e[3][10], e[4][10], e[5][10], e[6][10], e[8][10], e[10][10], e[11][10], e[12][10], e[13][10], e[14][10], e[15][10], e[6][11], e[6][12], e[6][13], e[6][14], e[6][15], e[0][10]], e[2][6]._CanReachableCells = [e[3][6], e[4][6], e[5][6], e[6][5], e[6][4], e[6][3], e[6][2], e[6][1], e[6][6], e[8][6], e[10][6], e[11][6], e[12][6], e[13][6], e[14][6], e[15][6], e[2][7], e[1][6]], e[2][7]._CanReachableCells = [e[2][6], e[3][6], e[3][7], e[3][8], e[2][8], e[1][8], e[1][7], e[1][6]], e[2][8]._CanReachableCells = [e[2][7], e[3][8], e[2][9], e[1][8]], e[2][9]._CanReachableCells = [e[2][8], e[3][8], e[3][9], e[3][10], e[2][10], e[1][10], e[1][9], e[1][8]], e[2][10]._CanReachableCells = [e[2][9], e[3][10], e[4][10], e[5][10], e[6][10], e[8][10], e[10][10], e[11][10], e[12][10], e[13][10], e[14][10], e[15][10], e[6][11], e[6][12], e[6][13], e[6][14], e[6][15], e[1][10]], e[3][6]._CanReachableCells = [e[4][6], e[5][6], e[6][5], e[6][4], e[6][3], e[6][2], e[6][1], e[6][6], e[8][6], e[10][6], e[11][6], e[12][6], e[13][6], e[14][6], e[15][6], e[4][7], e[3][7], e[2][7], e[2][6], e[1][6]], e[3][7]._CanReachableCells = [e[3][6], e[4][7], e[3][8], e[2][7]], e[3][8]._CanReachableCells = [e[3][7], e[4][7], e[4][8], e[4][9], e[3][9], e[2][9], e[2][8], e[2][7]], e[3][9]._CanReachableCells = [e[3][8], e[4][9], e[3][10], e[2][9]], e[3][10]._CanReachableCells = [e[3][9], e[4][9], e[4][10], e[5][10], e[6][10], e[8][10], e[10][10], e[11][10], e[12][10], e[13][10], e[14][10], e[15][10], e[6][11], e[6][12], e[6][13], e[6][14], e[6][15], e[2][10], e[1][10], e[2][9]], e[4][6]._CanReachableCells = [e[5][6], e[6][5], e[6][4], e[6][3], e[6][2], e[6][1], e[6][6], e[8][6], e[10][6], e[11][6], e[12][6], e[13][6], e[14][6], e[15][6], e[4][7], e[3][6], e[2][6], e[1][6]], e[4][7]._CanReachableCells = [e[4][6], e[5][6], e[5][7], e[5][8], e[4][8], e[3][8], e[3][7], e[3][6]], e[4][8]._CanReachableCells = [e[4][7], e[5][8], e[4][9], e[3][8]], e[4][9]._CanReachableCells = [e[4][8], e[5][8], e[5][9], e[5][10], e[4][10], e[3][10], e[3][9], e[3][8]], e[4][10]._CanReachableCells = [e[4][9], e[5][10], e[6][10], e[8][10], e[10][10], e[11][10], e[12][10], e[13][10], e[14][10], e[15][10], e[6][11], e[6][12], e[6][13], e[6][14], e[6][15], e[3][10], e[2][10], e[1][10]], e[5][6]._CanReachableCells = [e[6][5], e[6][4], e[6][3], e[6][2], e[6][1], e[6][6], e[8][6], e[10][6], e[11][6], e[12][6], e[13][6], e[14][6], e[15][6], e[5][7], e[5][8], e[5][9], e[5][10], e[4][7], e[4][6], e[3][6], e[2][6], e[1][6]], e[5][7]._CanReachableCells = [e[5][6], e[5][8], e[5][9], e[5][10], e[4][7]], e[5][8]._CanReachableCells = [e[5][7], e[5][6], e[6][8], e[8][8], e[10][8], e[11][8], e[5][9], e[5][10], e[4][9], e[4][8], e[4][7]], e[5][9]._CanReachableCells = [e[5][8], e[5][7], e[5][6], e[5][10], e[4][9]], e[5][10]._CanReachableCells = [e[5][9], e[5][8], e[5][7], e[5][6], e[6][10], e[8][10], e[10][10], e[11][10], e[12][10], e[13][10], e[14][10], e[15][10], e[6][11], e[6][12], e[6][13], e[6][14], e[6][15], e[4][10], e[3][10], e[2][10], e[1][10], e[4][9]], e[6][0]._CanReachableCells = [e[6][1], e[7][0]], e[6][1]._CanReachableCells = [e[6][0], e[7][1], e[8][1], e[9][1], e[10][1], e[7][2], e[6][2], e[6][3], e[6][4], e[6][5], e[6][6], e[6][8], e[6][10], e[6][11], e[6][12], e[6][13], e[6][14], e[6][15], e[5][6], e[4][6], e[3][6], e[2][6], e[1][6]], e[6][2]._CanReachableCells = [e[6][1], e[7][2], e[6][3], e[6][4], e[6][5], e[6][6], e[6][8], e[6][10], e[6][11], e[6][12], e[6][13], e[6][14], e[6][15], e[5][6], e[4][6], e[3][6], e[2][6], e[1][6]], e[6][3]._CanReachableCells = [e[6][2], e[6][1], e[7][2], e[7][3], e[7][4], e[6][4], e[6][5], e[6][6], e[6][8], e[6][10], e[6][11], e[6][12], e[6][13], e[6][14], e[6][15], e[5][6], e[4][6], e[3][6], e[2][6], e[1][6]], e[6][4]._CanReachableCells = [e[6][3], e[6][2], e[6][1], e[7][4], e[6][5], e[6][6], e[6][8], e[6][10], e[6][11], e[6][12], e[6][13], e[6][14], e[6][15], e[5][6], e[4][6], e[3][6], e[2][6], e[1][6]], e[6][5]._CanReachableCells = [e[6][4], e[6][3], e[6][2], e[6][1], e[7][4], e[7][5], e[8][5], e[9][5], e[10][5], e[6][6], e[6][8], e[6][10], e[6][11], e[6][12], e[6][13], e[6][14], e[6][15], e[5][6], e[4][6], e[3][6], e[2][6], e[1][6]], e[6][6]._CanReachableCells = [e[6][5], e[6][4], e[6][3], e[6][2], e[6][1], e[8][6], e[10][6], e[11][6], e[12][6], e[13][6], e[14][6], e[15][6], e[6][8], e[6][10], e[6][11], e[6][12], e[6][13], e[6][14], e[6][15], e[5][6], e[4][6], e[3][6], e[2][6], e[1][6]], e[6][8]._CanReachableCells = [e[6][6], e[6][5], e[6][4], e[6][3], e[6][2], e[6][1], e[8][8], e[10][8], e[11][8], e[6][10], e[6][11], e[6][12], e[6][13], e[6][14], e[6][15], e[5][8]], e[6][10]._CanReachableCells = [e[6][8], e[6][6], e[6][5], e[6][4], e[6][3], e[6][2], e[6][1], e[8][10], e[10][10], e[11][10], e[12][10], e[13][10], e[14][10], e[15][10], e[6][11], e[6][12], e[6][13], e[6][14], e[6][15], e[5][10], e[4][10], e[3][10], e[2][10], e[1][10]], e[6][11]._CanReachableCells = [e[6][10], e[6][8], e[6][6], e[6][5], e[6][4], e[6][3], e[6][2], e[6][1], e[7][11], e[8][11], e[9][11], e[10][11], e[7][12], e[6][12], e[6][13], e[6][14], e[6][15], e[5][10], e[4][10], e[3][10], e[2][10], e[1][10]], e[6][12]._CanReachableCells = [e[6][11], e[5][10], e[4][10], e[3][10], e[2][10], e[1][10], e[6][10], e[6][8], e[6][6], e[6][5], e[6][4], e[6][3], e[6][2], e[6][1], e[7][12], e[6][13], e[6][14], e[6][15]], e[6][13]._CanReachableCells = [e[6][12], e[6][11], e[5][10], e[4][10], e[3][10], e[2][10], e[1][10], e[6][10], e[6][8], e[6][6], e[6][5], e[6][4], e[6][3], e[6][2], e[6][1], e[7][12], e[7][13], e[7][14], e[6][14], e[6][15]], e[6][14]._CanReachableCells = [e[6][13], e[6][12], e[6][11], e[5][10], e[4][10], e[3][10], e[2][10], e[1][10], e[6][10], e[6][8], e[6][6], e[6][5], e[6][4], e[6][3], e[6][2], e[6][1], e[7][14], e[6][15]], e[6][15]._CanReachableCells = [e[6][14], e[6][13], e[6][12], e[6][11], e[5][10], e[4][10], e[3][10], e[2][10], e[1][10], e[6][10], e[6][8], e[6][6], e[6][5], e[6][4], e[6][3], e[6][2], e[6][1], e[7][14], e[7][15], e[8][15], e[9][15], e[10][15], e[6][16]], e[6][16]._CanReachableCells = [e[6][15], e[7][16]], e[7][1]._CanReachableCells = [e[7][0], e[8][1], e[9][1], e[10][1], e[7][2], e[6][1]], e[7][2]._CanReachableCells = [e[7][1], e[8][1], e[8][2], e[8][3], e[7][3], e[6][3], e[6][2], e[6][1]], e[7][3]._CanReachableCells = [e[7][2], e[8][3], e[7][4], e[6][3]], e[7][4]._CanReachableCells = [e[7][3], e[8][3], e[8][4], e[8][5], e[7][5], e[6][5], e[6][4], e[6][3]], e[7][5]._CanReachableCells = [e[7][4], e[8][5], e[9][5], e[10][5], e[6][5]], e[7][11]._CanReachableCells = [e[6][11], e[8][11], e[9][11], e[10][11], e[7][12]], e[7][12]._CanReachableCells = [e[7][11], e[8][11], e[8][12], e[8][13], e[7][13], e[6][13], e[6][12], e[6][11]], e[7][13]._CanReachableCells = [e[7][12], e[8][13], e[7][14], e[6][13]], e[7][14]._CanReachableCells = [e[7][13], e[8][13], e[8][14], e[8][15], e[7][15], e[6][15], e[6][14], e[6][13]], e[7][15]._CanReachableCells = [e[7][14], e[8][15], e[9][15], e[10][15], e[7][16], e[6][15]], e[8][0]._CanReachableCells = [e[7][0], e[8][1], e[9][0]], e[8][1]._CanReachableCells = [e[8][0], e[9][1], e[10][1], e[9][2], e[8][2], e[7][2], e[7][1], e[6][1]], e[8][2]._CanReachableCells = [e[8][1], e[9][2], e[8][3], e[7][2]], e[8][3]._CanReachableCells = [e[8][2], e[9][2], e[9][3], e[9][4], e[8][4], e[7][4], e[7][3], e[7][2]], e[8][4]._CanReachableCells = [e[8][3], e[9][4], e[8][5], e[7][4]], e[8][5]._CanReachableCells = [e[8][4], e[9][4], e[9][5], e[10][5], e[8][6], e[8][8], e[8][10], e[8][11], e[7][5], e[6][5], e[7][4]], e[8][6]._CanReachableCells = [e[8][5], e[10][6], e[11][6], e[12][6], e[13][6], e[14][6], e[15][6], e[8][8], e[8][10], e[8][11], e[6][6], e[5][6], e[4][6], e[3][6], e[2][6], e[1][6]], e[8][8]._CanReachableCells = [e[8][6], e[8][5], e[10][8], e[11][8], e[8][10], e[8][11], e[6][8], e[5][8]], e[8][10]._CanReachableCells = [e[8][8], e[8][6], e[8][5], e[10][10], e[11][10], e[12][10], e[13][10], e[14][10], e[15][10], e[8][11], e[6][10], e[5][10], e[4][10], e[3][10], e[2][10], e[1][10]], e[8][11]._CanReachableCells = [e[8][10], e[8][8], e[8][6], e[8][5], e[9][11], e[10][11], e[9][12], e[8][12], e[7][12], e[7][11], e[6][11]], e[8][12]._CanReachableCells = [e[8][11], e[9][12], e[8][13], e[7][12]], e[8][13]._CanReachableCells = [e[8][12], e[9][12], e[9][13], e[9][14], e[8][14], e[7][14], e[7][13], e[7][12]], e[8][14]._CanReachableCells = [e[8][13], e[9][14], e[8][15], e[7][14]], e[8][15]._CanReachableCells = [e[8][14], e[9][14], e[9][15], e[10][15], e[8][16], e[7][15], e[6][15], e[7][14]], e[8][16]._CanReachableCells = [e[8][15], e[9][16], e[7][16]], e[9][1]._CanReachableCells = [e[9][0], e[10][1], e[9][2], e[8][1], e[7][1], e[6][1]], e[9][2]._CanReachableCells = [e[9][1], e[10][1], e[10][2], e[10][3], e[9][3], e[8][3], e[8][2], e[8][1]], e[9][3]._CanReachableCells = [e[9][2], e[10][3], e[9][4], e[8][3]], e[9][4]._CanReachableCells = [e[9][3], e[10][3], e[10][4], e[10][5], e[9][5], e[8][5], e[8][4], e[8][3]], e[9][5]._CanReachableCells = [e[9][4], e[10][5], e[8][5], e[7][5], e[6][5]], e[9][11]._CanReachableCells = [e[10][11], e[9][12], e[8][11], e[7][11], e[6][11]], e[9][12]._CanReachableCells = [e[9][11], e[10][11], e[10][12], e[10][13], e[9][13], e[8][13], e[8][12], e[8][11]], e[9][13]._CanReachableCells = [e[9][12], e[10][13], e[9][14], e[8][13]], e[9][14]._CanReachableCells = [e[9][13], e[10][13], e[10][14], e[10][15], e[9][15], e[8][15], e[8][14], e[8][13]], e[9][15]._CanReachableCells = [e[9][14], e[10][15], e[9][16], e[8][15], e[7][15], e[6][15]], e[10][0]._CanReachableCells = [e[9][0], e[10][1]], e[10][1]._CanReachableCells = [e[10][0], e[10][2], e[10][3], e[10][4], e[10][5], e[11][6], e[12][6], e[13][6], e[14][6], e[15][6], e[10][6], e[10][8], e[10][10], e[10][11], e[10][12], e[10][13], e[10][14], e[10][15], e[9][2], e[9][1], e[8][1], e[7][1], e[6][1]], e[10][2]._CanReachableCells = [e[10][1], e[10][3], e[10][4], e[10][5], e[11][6], e[12][6], e[13][6], e[14][6], e[15][6], e[10][6], e[10][8], e[10][10], e[10][11], e[10][12], e[10][13], e[10][14], e[10][15], e[9][2]], e[10][3]._CanReachableCells = [e[10][2], e[10][1], e[10][4], e[10][5], e[11][6], e[12][6], e[13][6], e[14][6], e[15][6], e[10][6], e[10][8], e[10][10], e[10][11], e[10][12], e[10][13], e[10][14], e[10][15], e[9][4], e[9][3], e[9][2]], e[10][4]._CanReachableCells = [e[10][3], e[10][2], e[10][1], e[10][5], e[11][6], e[12][6], e[13][6], e[14][6], e[15][6], e[10][6], e[10][8], e[10][10], e[10][11], e[10][12], e[10][13], e[10][14], e[10][15], e[9][4]], e[10][5]._CanReachableCells = [e[10][4], e[10][3], e[10][2], e[10][1], e[11][6], e[12][6], e[13][6], e[14][6], e[15][6], e[10][6], e[10][8], e[10][10], e[10][11], e[10][12], e[10][13], e[10][14], e[10][15], e[9][5], e[8][5], e[7][5], e[6][5], e[9][4]], e[10][6]._CanReachableCells = [e[10][5], e[10][4], e[10][3], e[10][2], e[10][1], e[11][6], e[12][6], e[13][6], e[14][6], e[15][6], e[10][8], e[10][10], e[10][11], e[10][12], e[10][13], e[10][14], e[10][15], e[8][6], e[6][6], e[5][6], e[4][6], e[3][6], e[2][6], e[1][6]], e[10][8]._CanReachableCells = [e[10][6], e[10][5], e[10][4], e[10][3], e[10][2], e[10][1], e[11][8], e[10][10], e[10][11], e[10][12], e[10][13], e[10][14], e[10][15], e[8][8], e[6][8], e[5][8]], e[10][10]._CanReachableCells = [e[10][8], e[10][6], e[10][5], e[10][4], e[10][3], e[10][2], e[10][1], e[11][10], e[12][10], e[13][10], e[14][10], e[15][10], e[10][11], e[10][12], e[10][13], e[10][14], e[10][15], e[8][10], e[6][10], e[5][10], e[4][10], e[3][10], e[2][10], e[1][10]], e[10][11]._CanReachableCells = [e[10][10], e[10][8], e[10][6], e[10][5], e[10][4], e[10][3], e[10][2], e[10][1], e[11][10], e[12][10], e[13][10], e[14][10], e[15][10], e[10][12], e[10][13], e[10][14], e[10][15], e[9][12], e[9][11], e[8][11], e[7][11], e[6][11]], e[10][12]._CanReachableCells = [e[10][11], e[10][10], e[10][8], e[10][6], e[10][5], e[10][4], e[10][3], e[10][2], e[10][1], e[11][10], e[12][10], e[13][10], e[14][10], e[15][10], e[10][13], e[10][14], e[10][15], e[9][12]], e[10][13]._CanReachableCells = [e[10][12], e[10][11], e[10][10], e[10][8], e[10][6], e[10][5], e[10][4], e[10][3], e[10][2], e[10][1], e[11][10], e[12][10], e[13][10], e[14][10], e[15][10], e[10][14], e[10][15], e[9][14], e[9][13], e[9][12]], e[10][14]._CanReachableCells = [e[10][13], e[10][12], e[10][11], e[10][10], e[10][8], e[10][6], e[10][5], e[10][4], e[10][3], e[10][2], e[10][1], e[11][10], e[12][10], e[13][10], e[14][10], e[15][10], e[10][15], e[9][14]], e[10][15]._CanReachableCells = [e[10][14], e[10][13], e[10][12], e[10][11], e[10][10], e[10][8], e[10][6], e[10][5], e[10][4], e[10][3], e[10][2], e[10][1], e[11][10], e[12][10], e[13][10], e[14][10], e[15][10], e[10][16], e[9][15], e[8][15], e[7][15], e[6][15], e[9][14]], e[10][16]._CanReachableCells = [e[10][15], e[9][16]], e[11][6]._CanReachableCells = [e[10][5], e[10][4], e[10][3], e[10][2], e[10][1], e[10][6], e[8][6], e[6][6], e[5][6], e[4][6], e[3][6], e[2][6], e[1][6], e[11][7], e[11][8], e[11][9], e[11][10], e[12][7], e[12][6], e[13][6], e[14][6], e[15][6]], e[11][7]._CanReachableCells = [e[11][6], e[12][7], e[11][8], e[11][9], e[11][10]], e[11][8]._CanReachableCells = [e[11][7], e[11][6], e[12][7], e[12][8], e[12][9], e[11][9], e[11][10], e[10][8], e[8][8], e[6][8], e[5][8]], e[11][9]._CanReachableCells = [e[11][8], e[11][7], e[11][6], e[12][9], e[11][10]], e[11][10]._CanReachableCells = [e[11][9], e[11][8], e[11][7], e[11][6], e[12][9], e[12][10], e[13][10], e[14][10], e[15][10], e[10][11], e[10][12], e[10][13], e[10][14], e[10][15], e[10][10], e[8][10], e[6][10], e[5][10], e[4][10], e[3][10], e[2][10], e[1][10]], e[12][6]._CanReachableCells = [e[11][6], e[10][5], e[10][4], e[10][3], e[10][2], e[10][1], e[10][6], e[8][6], e[6][6], e[5][6], e[4][6], e[3][6], e[2][6], e[1][6], e[12][7], e[13][6], e[14][6], e[15][6]], e[12][7]._CanReachableCells = [e[12][6], e[13][6], e[13][7], e[13][8], e[12][8], e[11][8], e[11][7], e[11][6]], e[12][8]._CanReachableCells = [e[12][7], e[13][8], e[12][9], e[11][8]], e[12][9]._CanReachableCells = [e[12][8], e[13][8], e[13][9], e[13][10], e[12][10], e[11][10], e[11][9], e[11][8]], e[12][10]._CanReachableCells = [e[12][9], e[13][10], e[14][10], e[15][10], e[11][10], e[10][10], e[8][10], e[6][10], e[5][10], e[4][10], e[3][10], e[2][10], e[1][10], e[10][11], e[10][12], e[10][13], e[10][14], e[10][15]], e[13][6]._CanReachableCells = [e[12][6], e[11][6], e[10][5], e[10][4], e[10][3], e[10][2], e[10][1], e[10][6], e[8][6], e[6][6], e[5][6], e[4][6], e[3][6], e[2][6], e[1][6], e[14][6], e[15][6], e[14][7], e[13][7], e[12][7]], e[13][7]._CanReachableCells = [e[13][6], e[14][7], e[13][8], e[12][7]], e[13][8]._CanReachableCells = [e[13][7], e[14][7], e[14][8], e[14][9], e[13][9], e[12][9], e[12][8], e[12][7]], e[13][9]._CanReachableCells = [e[13][8], e[14][9], e[13][10], e[12][9]], e[13][10]._CanReachableCells = [e[12][9], e[13][9], e[14][9], e[14][10], e[15][10], e[12][10], e[11][10], e[10][10], e[8][10], e[6][10], e[5][10], e[4][10], e[3][10], e[2][10], e[1][10], e[10][11], e[10][12], e[10][13], e[10][14], e[10][15]], e[14][6]._CanReachableCells = [e[13][6], e[12][6], e[11][6], e[10][5], e[10][4], e[10][3], e[10][2], e[10][1], e[10][6], e[8][6], e[6][6], e[5][6], e[4][6], e[3][6], e[2][6], e[1][6], e[15][6], e[14][7]], e[14][7]._CanReachableCells = [e[14][6], e[15][6], e[15][7], e[15][8], e[14][8], e[13][8], e[13][7], e[13][6]], e[14][8]._CanReachableCells = [e[14][7], e[15][8], e[14][9], e[13][8]], e[14][9]._CanReachableCells = [e[14][8], e[15][8], e[15][9], e[15][10], e[14][10], e[13][10], e[13][9], e[13][8]], e[14][10]._CanReachableCells = [e[14][9], e[15][10], e[13][10], e[12][10], e[11][10], e[10][10], e[8][10], e[6][10], e[5][10], e[4][10], e[3][10], e[2][10], e[1][10], e[10][11], e[10][12], e[10][13], e[10][14], e[10][15]], e[15][6]._CanReachableCells = [e[14][6], e[13][6], e[12][6], e[11][6], e[10][5], e[10][4], e[10][3], e[10][2], e[10][1], e[10][6], e[8][6], e[6][6], e[5][6], e[4][6], e[3][6], e[2][6], e[1][6], e[15][7], e[15][8], e[15][9], e[15][10], e[14][7], e[16][6]], e[15][7]._CanReachableCells = [e[15][6], e[14][7], e[15][8], e[15][9], e[15][10], e[16][7]], e[15][8]._CanReachableCells = [e[15][7], e[15][6], e[16][8], e[15][9], e[15][10], e[14][9], e[14][8], e[14][7]], e[15][9]._CanReachableCells = [e[15][8], e[15][7], e[15][6], e[16][9], e[15][10], e[14][9]], e[15][10]._CanReachableCells = [e[14][9], e[15][9], e[15][8], e[15][7], e[15][6], e[14][10], e[13][10], e[12][10], e[11][10], e[10][10], e[8][10], e[6][10], e[5][10], e[4][10], e[3][10], e[2][10], e[1][10], e[10][11], e[10][12], e[10][13], e[10][14], e[10][15], e[16][10]], e[16][6]._CanReachableCells = [e[15][6], e[16][7]], e[16][8]._CanReachableCells = [e[16][7], e[15][8], e[16][9]], e[16][10]._CanReachableCells = [e[16][9], e[15][10]];
					},
					genAllMoveArr: function genAllMoveArr(e) {
						for (var t = [], a = this._ChessBoard._ChessCellArr, s = 16; s >= 0; s--) {
							for (var c = 0; c < 17; c++) {
								if (null != a[s][c] && a[s][c]._ChessCellState == cc.ChessCellType.ChessCell_Chess) {
									var i = a[s][c].getChess();
									if (null != i && i.getChessColor() == e && !this._ChessBoard.checkCanNotMoveChess(a[s][c])) for (var n = 0; n < a[s][c]._CanReachableCells.length; n++) {
										cc.ChessCellUtil.checkCanMove(a[s][c], a[s][c]._CanReachableCells[n], this._ChessBoard._ChessCellArr, this._ChessBoard._RailroadCellArr) && t.push([a[s][c], a[s][c]._CanReachableCells[n]]);
									}
								}
							}
						}

						return t.shuffle(), t;
					},
					calcChessValue: function calcChessValue(e, t) {
						for (var a = this._ChessBoard._ChessCellArr, s = 0, c = 0, i = [2, 0, 1], n = 0; n < 17; n++) {
							for (var o = 0; o < 17; o++) {
								if (null != a[n][o] && a[n][o]._ChessCellState == cc.ChessCellType.ChessCell_Chess) {
									var r = a[n][o].getChess(),
										l = 0;
									4 == a[n][o]._Type ? 1 == r.getChessGrade() && (l += this._ChessValueArr[r.getChessGrade()]) : (l += this._ChessValueArr[r.getChessGrade()], l += i[a[n][o]._Type]), r.getChessColor() == e && (s += l), r.getChessColor() == t && (c += l);
								}
							}
						}

						return s - c;
					},
					calcCurSituation: function calcCurSituation() {
						return this.calcChessValue(this._AI_Color, 2 - this._AI_Color);
					},
					makeMoveChess: function makeMoveChess(e, t) {
						var a = e.getChessCellNode(),
							s = t.getChessCellNode(),
							c = t._ChessCellState,
							i = cc.ChessCellUtil.compareTwoChessCell(e, t);
						return e.setChessCellNode(null), -1 != i && 1 != i || t.setChessCellNode(a), 0 == i && t.setChessCellNode(null), [a, s, c];
					},
					unmakeMoveChess: function unmakeMoveChess(e, t, a) {
						e.setChessCellNode(a[0]), t.setChessCellNode(a[1]), t._ChessCellState = a[2];
					},
					minSearch: function minSearch(e, t, a) {
						if (e <= 0) return this.calcCurSituation();

						for (var s = this.genAllMoveArr(2 - this._AI_Color), c = 0; c < s.length; c++) {
							var i = this.makeMoveChess(s[c][0], s[c][1]),
								n = this.maxSearch(e - 1, t, a);
							if (this.unmakeMoveChess(s[c][0], s[c][1], i), n < a && t >= (a = n)) return t;
						}

						return a;
					},
					maxSearch: function maxSearch(e, t, a) {
						if (e <= 0) return this.calcCurSituation();

						for (var s = this.genAllMoveArr(this._AI_Color), c = 0; c < s.length; c++) {
							var i = this.makeMoveChess(s[c][0], s[c][1]),
								n = this.minSearch(e - 1, t, a);
							if (this.unmakeMoveChess(s[c][0], s[c][1], i), n > t && (t = n, this._MaxDepth == e && (this._BestMove = s[c]), t >= a)) return a;
						}

						return t;
					},
					thinkChess: function thinkChess() {
						this._BestMove = null, this._doCoroutine = null;
						var e = a.mark(function e(t, s, c, i, n) {
							var o, r, l, h;
							return a.wrap(function (a) {
								for (; ;) {
									switch (a.prev = a.next) {
										case 0:
											if (!(c <= 0)) {
												a.next = 2;
												break;
											}

											return a.abrupt("return", t.calcCurSituation());

										case 2:
											o = t.genAllMoveArr(s ? t._AI_Color : 2 - t._AI_Color), r = 0;

										case 4:
											if (!(r < o.length)) {
												a.next = 24;
												break;
											}

											return l = t.makeMoveChess(o[r][0], o[r][1]), a.delegateYield(e(t, !s, c - 1, i, n), "t0", 7);

										case 7:
											if (h = a.t0, t.unmakeMoveChess(o[r][0], o[r][1], l), !s) {
												a.next = 17;
												break;
											}

											if (!(h > i)) {
												a.next = 15;
												break;
											}

											if (i = h, t._MaxDepth == c && (t._BestMove = o[r]), !(i >= n)) {
												a.next = 15;
												break;
											}

											return a.abrupt("return", n);

										case 15:
											a.next = 21;
											break;

										case 17:
											if (!(h < n)) {
												a.next = 21;
												break;
											}

											if (!(i >= (n = h))) {
												a.next = 21;
												break;
											}

											return a.abrupt("return", i);

										case 21:
											r++, a.next = 4;
											break;

										case 24:
											return a.next = 26, s ? i : n;

										case 26:
											return a.abrupt("return", a.sent);

										case 27:
										case "end":
											return a.stop();
									}
								}
							}, e);
						});
						this._doCoroutine = e(this, !0, this._MaxDepth, -1048575, 1048575), this._PrepareThink = !1;
					},
					update: function update() {
						if (this._doCoroutine) {
							var e = this._doCoroutine.next(this._TempValue);

							this._TempValue = e.value, this._BestMove && e.done && (cc.ChessCellUtil.checkCanMove(this._BestMove[0], this._BestMove[1], this._ChessBoard._ChessCellArr, this._ChessBoard._RailroadCellArr) && this._ChessBoard.sendMoveChessTrace(!0), this._doCoroutine = null);
						}
					}
				});
			t.exports = s, cc._RF.pop();
		}, {
			runtime: "runtime"
		}],
		ChessBoardFanFan: [function (e, t) {
			"use strict";

			cc._RF.push(t, "f4583KOvctOjrIsr8d5j7bV", "ChessBoardFanFan");

			var a = e("ChessCell");
			cc.Class({
				extends: cc.Component,
				properties: {
					can_not_move_sprite: {
						default: null,
						type: cc.SpriteFrame
					},
					can_move_sprite: {
						default: null,
						type: cc.SpriteFrame
					},
					chess_empty_sprite: {
						default: null,
						type: cc.SpriteFrame
					},
					move_arrow_sprite: {
						default: null,
						type: cc.SpriteFrame
					},
					chess_node: {
						default: null,
						type: cc.Prefab
					},
					moveAudio: {
						default: null,
						type: cc.AudioClip
					},
					moveBanAudio: {
						default: null,
						type: cc.AudioClip
					},
					selectAudio: {
						default: null,
						type: cc.AudioClip
					},
					eatAudio: {
						default: null,
						type: cc.AudioClip
					},
					killedAudio: {
						default: null,
						type: cc.AudioClip
					},
					bombAudio: {
						default: null,
						type: cc.AudioClip
					},
					showflagAudio: {
						default: null,
						type: cc.AudioClip
					},
					deadAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					this._Game = this.node.parent.getComponent("game_fanfan"), this._ChessCellArr = null, this._IsMovingGameChess = !1, this._GameChessSelected = null, this._FlipChessColorArr = [];
				},
				// 初始化游戏棋盘
				initGameQiPan: function initGameQiPan(e) {
					// 定义一个二维数组，代表棋盘的初始状态
					var t = [
						[1, 1, 1, 1, 1],
						[2, 2, 2, 2, 2],
						[2, 0, 1, 0, 2],
						[2, 1, 0, 1, 2],
						[2, 0, 1, 0, 2],
						[2, 2, 2, 2, 2],
						[3, -1, 3, -1, 3],
						[2, 2, 2, 2, 2],
						[2, 0, 1, 0, 2],
						[2, 1, 0, 1, 2],
						[2, 0, 1, 0, 2],
						[2, 2, 2, 2, 2],
						[1, 1, 1, 1, 1]
					];

					// 初始化棋子数组
					this._ChessCellArr = [];

					// 遍历棋盘的每一行
					for (var s = 0; s < 13; s++) {
						var c = []; // 用于存储当前行的棋子

						// 遍历当前行的每一列
						for (var i = 0; i < 5; i++) {
							var n = t[s][i]; // 获取当前位置的棋子类型

							// 如果棋子类型为-1，则将null添加到当前行数组中
							if (-1 == n) {
								c.push(null);
							} else {
								// 否则，创建一个新的棋子并初始化它
								c.push(new a(this, n));
								c.back().initRect(s, i);

								// 如果棋子类型为1或2，则更改棋子状态并设置棋子的颜色和编号
								if (1 == n || 2 == n) {
									c.back().changeChessCellState(cc.ChessCellType.ChessCell_Chess);
									var o = e.front();
									e.pop_front();
									c.back().getChess().setGameChess(o < 100 ? 1 : 2, o < 100 ? o : o - 100, false);
								}
							}
						}

						// 将当前行数组添加到棋子数组中
						this._ChessCellArr.push(c);
					}

					// 清除翻转棋子的颜色数组，并重置我的棋子颜色和未吃棋子计数器
					this._FlipChessColorArr.clear();
					this._MineChessColor = 0;
					this._NotEatChessCount = 0;
				},
				clearGameBoard: function clearGameBoard() {
					// 重置未吃棋子的计数器
					this.notEatenChessCount = 0;

					// 如果棋子数组存在
					if (this.chessCellArray) {
						// 遍历棋盘的每一行和每一列
						for (var row = 0; row < 13; row++) {
							for (var col = 0; col < 5; col++) {
								// 如果当前位置有棋子，则将其状态更改为“空”
								this.chessCellArray[row][col] && this.chessCellArray[row][col].changeChessCellState(cc.ChessCellType.ChessCell_Empty);
							}
						}

						// 如果有正在移动的棋子
						if (this.isMovingGameChess()) {
							// 停止所有棋子的动作并销毁它
							this.movingChessNode && (this.movingChessNode.stopAllActions(), this.movingChessNode.destroy());
							// 重置移动棋子的节点和状态
							this.movingChessNode = null;
							this.isChessMoving = false;
						}
					}
				},

				// 根据棋子的颜色和等级获取棋子的数量
				getChessCountByGrade: function getChessCountByGrade(e, t) {
					var a = 0; // 初始化棋子计数器

					// 遍历棋盘的每一行和每一列
					for (var s = 0; s < 13; s++) {
						for (var c = 0; c < 5; c++) {
							var i = this._ChessCellArr[s][c];

							// 如果当前位置有棋子且棋子的状态为“棋子”
							if (i && i._ChessCellState == cc.ChessCellType.ChessCell_Chess) {
								var n = i.getChess();
								// 如果棋子的颜色和等级与给定的参数匹配，则增加棋子计数器
								if (n._ChessColor == e && n._ChessGrade == t) {
									a++;
								}
							}
						}
					}

					// 返回棋子的数量
					return a;
				},

				// 检查一个棋子是否可以吃另一个棋子
				checkCanEatChess: function checkCanEatChess(sourceChessCell, targetChessCell) {
					// 如果源棋子或目标棋子为空，则返回false
					if (null == sourceChessCell || null == targetChessCell) return false;

					// 如果两个棋子都是真正的棋子
					if (sourceChessCell._ChessCellState == cc.ChessCellType.ChessCell_Chess && targetChessCell._ChessCellState == cc.ChessCellType.ChessCell_Chess) {
						var sourceChess = sourceChessCell.getChess(),
							targetChess = targetChessCell.getChess();

						// 如果源棋子或目标棋子为空，则返回false
						if (null == sourceChess || null == targetChess) return false;

						// 如果目标棋子的颜色为0，则返回false
						if (0 == targetChess.getChessColor()) return false;

						// 如果两个棋子的颜色相同，则返回false
						if (sourceChess.getChessColor() == targetChess.getChessColor()) return false;

						// 如果两个棋子之间的距离为2，则返回false
						if (2 == cc.ChessCellUtil.compareTwoChessCell(sourceChessCell, targetChessCell)) return false;

						// 如果目标棋子的等级为1且该颜色的12级棋子数量大于0，则返回false
						if (1 == targetChess.getChessGrade() && this.getChessCountByGrade(targetChess.getChessColor(), 12) > 0) return false;
					}

					return true;
				},

				// 检查棋子是否不能移动
				checkCanNotMoveChess: function checkCanNotMoveChess(chessCell) {
					// 如果棋子的状态不是真正的棋子，则返回true
					if (chessCell._ChessCellState != cc.ChessCellType.ChessCell_Chess) return true;

					var chessGrade = chessCell.getChess().getChessGrade();

					// 如果棋子的等级为12或1，则返回true
					return 12 == chessGrade || 1 == chessGrade;
				},

				// 检查指定颜色的棋子是否不能移动
				checkCanNotMoveChessColor: function checkCanNotMoveChessColor(chessColor, excludedChessCells) {
					for (var row = 0; row < 13; row++) {
						for (var col = 0; col < 5; col++) {
							var currentChessCell = this._ChessCellArr[row][col];

							// 如果当前棋子不为空且其状态为真正的棋子且不在排除列表中
							if (null != currentChessCell && currentChessCell._ChessCellState == cc.ChessCellType.ChessCell_Chess && -1 == excludedChessCells.indexOf(currentChessCell)) {
								var currentChessColor = currentChessCell.getChess().getChessColor();

								// 如果当前棋子的颜色为0，则返回false
								if (0 == currentChessColor) return false;

								// 如果当前棋子的颜色与指定的颜色相同且该棋子可以移动，则返回false
								if (currentChessColor == chessColor && !this.checkCanNotMoveChess(currentChessCell)) return false;
							}
						}
					}

					return true;
				},

				checkGameChessDead: function checkGameChessDead(e, t) {
					var a = [],
						s = this._Game.getMineSeatID();

					switch (cc.ChessCellUtil.compareTwoChessCell(e, t)) {
						case 1:
							var c = t.getChess().getChessGrade(),
								i = t.getChess().getChessColor();
							(1 == c || this.checkCanNotMoveChessColor(i, [t])) && a.push(i == this._MineChessColor ? s : 2 - s);
							break;

						case 2:
							i = e.getChess().getChessColor(), this.checkCanNotMoveChessColor(i, [e]) && a.push(i == this._MineChessColor ? s : 2 - s);
							break;

						case 0:
							var n = e.getChess().getChessGrade(),
								o = e.getChess().getChessColor(),
								r = t.getChess().getChessGrade(),
								l = t.getChess().getChessColor();
							(1 == n || this.checkCanNotMoveChessColor(o, [e, t])) && a.push(o == this._MineChessColor ? s : 2 - s), (1 == r || this.checkCanNotMoveChessColor(l, [e, t])) && a.push(l == this._MineChessColor ? s : 2 - s);
					}

					return a;
				},
				sendChessTrace: function sendChessTrace(e, t, a) {
					for (var s = [], c = 0; c < e.length; c++) {
						s.push(e[c]._CellPos.x), s.push(e[c]._CellPos.y);
					}

					cc.Websocket.Send(cc.ClientProtocol.MoveChess(s, t, a ? 1 : 0)), this._Game.changeGameState(cc.GameStateType.GameState_PlayingWait);
				},
				sendFlipChessTrace: function sendFlipChessTrace(e, t) {
					this.sendChessTrace([e], [], t);
				},
				sendMoveChessTrace: function sendMoveChessTrace(e) {
					var t = cc.ChessCellUtil.getChessMoveTrace(),
						a = this.checkGameChessDead(t.front(), t.back());
					this.sendChessTrace(t, a, e);
				},
				getGameChessMoveTrace: function getGameChessMoveTrace(e) {
					for (var t = [], a = 1; a < e.pool.length; a += 2) {
						var s = e.pool[a].value,
							c = e.pool[a + 1].value;
						t.push(this._ChessCellArr[s][c]);
					}

					return t;
				},
				checkGameChessColor: function checkGameChessColor(e, t) {
					if (0 == e || 1 == e) {
						for (var a = 0, s = 0, c = e; c < this._FlipChessColorArr.length; c += 2) {
							var i = this._FlipChessColorArr[c];

							if (0 != i && (i == s ? a++ : (s = i, a = 1), 2 == a)) {
								this._FlipChessColorArr.clear();

								var n = this._Game.getMineSeatID(),
									o = 0 == n && 0 == e || 2 == n && 1 == e;

								this._MineChessColor = o ? s : 3 - s, this._Game.showGameChessCamp(this._MineChessColor, t);
							}
						}

						this.checkGameChessColor(e + 1, t);
					}
				},
				showMoveGameChess: function showMoveGameChess(e, t, a) {
					switch (this._NotEatChessCount = -1 == this._ChessResult ? this._NotEatChessCount + 1 : 0, this._ChessResult) {
						case -1:
							e.back().setChessCellNode(t), a ? e.back().setGameChessSelected(2) : t.setPosition(e.back()._Rect.center);
							break;

						case 0:
							t.destroy(), e.back().changeChessCellState(a ? cc.ChessCellType.ChessCell_NoChessFlag : cc.ChessCellType.ChessCell_Empty), a && (e.back().getChessCellNode().y -= 4, e.back().getChessCellNode().scale = .75, cc.ChessCellUtil.addGameEffect(this.node, e.back(), "EatExplode"), cc.AppUtil.playAudioEffect(this.bombAudio));
							break;

						case 1:
							e.back().changeChessCellState(cc.ChessCellType.ChessCell_Empty), e.back().setChessCellNode(t), a ? (e.back().setGameChessSelected(2), cc.ChessCellUtil.addGameEffect(this.node, e.back(), "EatChess"), cc.AppUtil.playAudioEffect(this.eatAudio)) : t.setPosition(e.back()._Rect.center);
							break;

						case 2:
							t.destroy(), a && (e.back().setGameChessSelected(2), cc.ChessCellUtil.addGameEffect(this.node, e.back(), "EatChessFailed"), cc.AppUtil.playAudioEffect(this.killedAudio));
					}

					this._Game.updateGameStepTip(a);
				},
				getNotEatChessCount: function getNotEatChessCount() {
					return this._NotEatChessCount;
				},
				moveChessAction: function moveChessAction(e, t) {
					var a = t[0],
						s = t[1];

					if (s < a.length - 1) {
						var c = cc.ChessCellUtil.getCellDirection(a[s], a[s + 1]);
						a[s].changeChessCellState(cc.ChessCellType.ChessCell_MoveTrace + c - 1), e.runAction(cc.sequence(cc.moveTo(.05, a[s + 1]._Rect.center), cc.callFunc(this.moveChessAction, this, [a, s + 1]))), cc.AppUtil.playAudioEffect(this.moveAudio);
					} else this.showMoveGameChess(a, e, !0), this._IsMovingGameChess = !1;
				},
				updateFlipChessColor: function updateFlipChessColor() {
					0 == this._MineChessColor && this._FlipChessColorArr.push(0);
				},
				showMoveChess: function showMoveChess(e) {
					cc.ChessCellUtil.clearChessBoardMoveTraceAndState(this._ChessCellArr);
					var t = this.getGameChessMoveTrace(e);

					if (1 == t.length) {
						var a = t[0].getChess();
						a.showChess(), a.setGameChessSelected(2), 0 == this._MineChessColor && (this._FlipChessColorArr.push(a.getChessColor()), this.checkGameChessColor(0, !0)), cc.AppUtil.playAudioEffect(this.selectAudio), this._NotEatChessCount = 0, this._Game.updateGameStepTip(!0);
					} else {
						this._IsMovingGameChess = !0, this._ChessResult = cc.ChessCellUtil.compareTwoChessCell(t.front(), t.back());
						var s = t.front().getChessCellNode();
						t.front().setChessCellNode(null), s && this.moveChessAction(s, [t, 0]), this._MovingChessNode = s;
					}
				},
				setMoveGameChess: function setMoveGameChess(e) {
					var t = this.getGameChessMoveTrace(e);

					if (1 == t.length) {
						var a = t[0].getChess();
						a.showChess(), 0 == this._MineChessColor && (this._FlipChessColorArr.push(a.getChessColor()), this.checkGameChessColor(0, !1)), this._NotEatChessCount = 0, this._Game.updateGameStepTip(!1);
					} else {
						this._ChessResult = cc.ChessCellUtil.compareTwoChessCell(t.front(), t.back());
						var s = t.front().getChessCellNode();
						t.front().setChessCellNode(null), s && this.showMoveGameChess(t, s, !1);
					}
				},
				isMovingGameChess: function isMovingGameChess() {
					return this._IsMovingGameChess;
				},
				cancelChessSelected: function cancelChessSelected() {
					this._GameChessSelected && this._GameChessSelected._ChessCellState == cc.ChessCellType.ChessCell_Chess && this._GameChessSelected.setGameChessNormal(), this._GameChessSelected = null;
				},
				isSelectNewChess: function isSelectNewChess(e) {
					return e._ChessCellState == cc.ChessCellType.ChessCell_Chess && 0 == e.getChess().getChessColor();
				},
				onTouchEvent: function onTouchEvent(e) {
					this._PrePoint = this._CurPoint, this._CurPoint = this.node.convertToNodeSpaceAR(e.getLocation());
					var t = cc.ChessCellUtil.checkTouchGameChess(this._ChessCellArr, this._CurPoint);
					if (null != t) if (null == this._GameChessSelected) {
						if (t._ChessCellState != cc.ChessCellType.ChessCell_Chess) return;
						var a = t.getChess().getChessColor();
						a != this._MineChessColor && 0 != a || (0 == a || 0 == this._MineChessColor ? this.sendFlipChessTrace(t, !1) : this.checkCanNotMoveChess(t) || (this._GameChessSelected = t, this._GameChessSelected.setGameChessSelected(1), cc.AppUtil.playAudioEffect(this.selectAudio)));
					} else if (t == this._GameChessSelected) this.cancelChessSelected(), cc.AppUtil.playAudioEffect(this.selectAudio); else {
						if (this.isSelectNewChess(t)) return void this.sendFlipChessTrace(t, !1);

						if (cc.ChessCellUtil.isMineChess(t, this._MineChessColor)) {
							if (this.checkCanNotMoveChess(t)) return;
							this._GameChessSelected.setGameChessNormal(), this._GameChessSelected = t, this._GameChessSelected.setGameChessSelected(1), cc.AppUtil.playAudioEffect(this.selectAudio);
						} else {
							if (this.checkCanEatChess(this._GameChessSelected, t) && (2 == this._GameChessSelected.getChess().getChessGrade() ? cc.ChessCellUtil.checkCanFly : cc.ChessCellUtil.checkCanMove).apply(cc.ChessCellUtil, [this._GameChessSelected, t, this._ChessCellArr, null])) return t.addAttackTarget(), this.cancelChessSelected(), void this.sendMoveChessTrace(!1);
							t.addCanNotMoveFlag(), cc.AppUtil.playAudioEffect(this.moveBanAudio);
						}
					}
				}
			}), cc._RF.pop();
		}, {
			ChessCell: "ChessCell"
		}],
		ChessBoard: [function (e, t) {
			"use strict";

			cc._RF.push(t, "ae5f7Vl0h9GvIKbWkEzAtDx", "ChessBoard");

			var a = e("ChessCell");
			cc.GameStateType = {
				GameState_Idle: 1,
				GameState_Ready: 2,
				GameState_Review: 3,
				GameState_Watching: 4,
				GameState_Playing: 5,
				GameState_PlayingWait: 6,
				GameState_GameLayout: 7
			}, cc.Class({
				extends: cc.Component,
				properties: {
					can_not_move_sprite: {
						default: null,
						type: cc.SpriteFrame
					},
					can_move_sprite: {
						default: null,
						type: cc.SpriteFrame
					},
					chess_empty_sprite: {
						default: null,
						type: cc.SpriteFrame
					},
					move_arrow_sprite: {
						default: null,
						type: cc.SpriteFrame
					},
					chess_node: {
						default: null,
						type: cc.Prefab
					},
					mark_chess_dlg: {
						default: null,
						type: cc.Prefab
					},
					moveAudio: {
						default: null,
						type: cc.AudioClip
					},
					moveBanAudio: {
						default: null,
						type: cc.AudioClip
					},
					selectAudio: {
						default: null,
						type: cc.AudioClip
					},
					eatAudio: {
						default: null,
						type: cc.AudioClip
					},
					killedAudio: {
						default: null,
						type: cc.AudioClip
					},
					bombAudio: {
						default: null,
						type: cc.AudioClip
					},
					showflagAudio: {
						default: null,
						type: cc.AudioClip
					},
					deadAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				ctor: function ctor() {
					this._IsMovingGameChess = !1, this._GameChessSelected = null, this._ShowJunQiColors = [], this._SelectChessArr = [], this._EatChessArr = [];
				},
				onLoad: function onLoad() {
					this._Game = this.node.parent.getComponent("game"), this.initGameQiPan(), this.initPlayerCell(), this.initRailroadCell(), this.initTrappedCell();
				},
				initGameQiPan: function initGameQiPan() {
					var e = [[-1, -1, -1, -1, -1, -1, 1, 4, 1, 4, 1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, 2, 2, 2, 2, 2, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, 2, 0, 1, 0, 2, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, 2, 1, 0, 1, 2, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, 2, 0, 1, 0, 2, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, 2, 2, 2, 2, 2, -1, -1, -1, -1, -1, -1], [1, 2, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 1], [4, 2, 0, 1, 0, 2, 3, -1, 3, -1, 3, 2, 0, 1, 0, 2, 4], [1, 2, 1, 0, 1, 2, 2, 3, 2, 3, 2, 2, 1, 0, 1, 2, 1], [4, 2, 0, 1, 0, 2, 3, -1, 3, -1, 3, 2, 0, 1, 0, 2, 4], [1, 2, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 1], [-1, -1, -1, -1, -1, -1, 2, 2, 2, 2, 2, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, 2, 0, 1, 0, 2, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, 2, 1, 0, 1, 2, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, 2, 0, 1, 0, 2, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, 2, 2, 2, 2, 2, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, 1, 4, 1, 4, 1, -1, -1, -1, -1, -1, -1]];
					this._ChessCellArr = [], this._JunQiCellArr = [];

					for (var t = 0; t < 17; t++) {
						for (var s = [], c = 0; c < 17; c++) {
							-1 == e[t][c] ? s.push(null) : (s.push(new a(this, e[t][c])), s.back().initRect(t, c), 4 == s.back()._Type && this._JunQiCellArr.push(s.back()));
						}

						this._ChessCellArr.push(s);
					}

					this._ChessBoardLookMode = !1;
				},
				initPlayerCell: function initPlayerCell() {
					this._PlayerChessCellArr = [[], [], [], []], this._SKGameChessCellArr = [];

					for (var e = 11; e <= 16; e++) {
						for (var t = 6; t <= 10; t++) {
							!(12 != e && 14 != e || 7 != t && 9 != t) || 13 == e && 8 == t || this._PlayerChessCellArr[0].push(this._ChessCellArr[e][t]);
						}
					}

					for (t = 11; t <= 16; t++) {
						for (e = 10; e >= 6; e--) {
							!(7 != e && 9 != e || 12 != t && 14 != t) || 8 == e && 13 == t || this._PlayerChessCellArr[1].push(this._ChessCellArr[e][t]);
						}
					}

					for (e = 5; e >= 0; e--) {
						for (t = 10; t >= 6; t--) {
							!(2 != e && 4 != e || 7 != t && 9 != t) || 3 == e && 8 == t || this._PlayerChessCellArr[2].push(this._ChessCellArr[e][t]);
						}
					}

					for (t = 5; t >= 0; t--) {
						for (e = 6; e <= 10; e++) {
							!(7 != e && 9 != e || 2 != t && 4 != t) || 8 == e && 3 == t || this._PlayerChessCellArr[3].push(this._ChessCellArr[e][t]);
						}
					}

					10 == cc.GameRoomType && (this._SKGameChessCellArr.push_array(this._PlayerChessCellArr[0]), this._SKGameChessCellArr.push_array(this._PlayerChessCellArr[2]));
				},
				initRailroadCell: function initRailroadCell() {
					this._RailroadCellArr = [[], [], [], []];

					for (var e = 15, t = 6, a = 0; a < 10; a++) {
						this._RailroadCellArr[0].push(this._ChessCellArr[e][t]), a < 4 ? e-- : 4 == a ? (e--, t--) : t--;
					}

					for (e = 15, t = 10, a = 0; a < 10; a++) {
						this._RailroadCellArr[1].push(this._ChessCellArr[e][t]), a < 4 ? e-- : 4 == a ? (e--, t++) : t++;
					}

					for (e = 1, t = 6, a = 0; a < 10; a++) {
						this._RailroadCellArr[2].push(this._ChessCellArr[e][t]), a < 4 ? e++ : 4 == a ? (e++, t--) : t--;
					}

					for (e = 1, t = 10, a = 0; a < 10; a++) {
						this._RailroadCellArr[3].push(this._ChessCellArr[e][t]), a < 4 ? e++ : 4 == a ? (e++, t++) : t++;
					}
				},
				initTrappedCell: function initTrappedCell() {
					this._TrappedCellArr1 = [], this._TrappedCellArr2 = [];

					for (var e = [[0, 6], [0, 8], [0, 10], [16, 6], [16, 8], [16, 10], [6, 0], [8, 0], [10, 0], [6, 16], [8, 16], [10, 16]], t = [[1, 6], [1, 8], [1, 10], [15, 6], [15, 8], [15, 10], [6, 1], [8, 1], [10, 1], [6, 15], [8, 15], [10, 15]], a = 0; a < e.length; a++) {
						this._TrappedCellArr1.push(this._ChessCellArr[e[a][0]][e[a][1]]), this._TrappedCellArr2.push(this._ChessCellArr[t[a][0]][t[a][1]]);
					}
				},
				getMineChessDataArr: function getMineChessDataArr(e) {
					for (var t = !0, a = [], s = 0; s < this._PlayerChessCellArr[e].length; s++) {
						var c = this._PlayerChessCellArr[e][s].getChess();

						if (!c) {
							t = !1;
							break;
						}

						a.push(c.getChessGrade());
					}

					return t ? a : cc.GameCache.getDefaultChessLayout();
				},
				getMineChessDataArrEx: function getMineChessDataArrEx() {
					var e = [];
					return e.push_array(this.getMineChessDataArr(0)), 10 == cc.GameRoomType && e.push_array(this.getMineChessDataArr(2)), e;
				},
				scaleToChessBoard: function scaleToChessBoard(e) {
					cc.isIPADScreen || (this.node.stopAllActions(), this.node.runAction(cc.spawn(cc.moveTo(.35, cc.v2(0, 0)), cc.scaleTo(.35, e))));
				},
				setChessBoardLookMode: function setChessBoardLookMode(e) {
					if (e) {
						if (!cc.GameCache.getSettingOptionValue(3)) return;
						this._ChessBoardLookMode || this.scaleToChessBoard(1.5);
					} else this.scaleToChessBoard(1);

					this._ChessBoardLookMode = e;
				},
				checkTouchChessBoard: function checkTouchChessBoard(e) {
					for (var t = 1; t <= 2; t++) {
						if (this.node.getChildByName("Node_" + t).getBoundingBox().contains(e)) return !0;
					}

					return !1;
				},
				swapChessNode: function swapChessNode(e, t) {
					var a = e.getChessCellNode();
					e.setChessCellNode(t.getChessCellNode()), t.setChessCellNode(a);
				},
				swapChessNodeEx: function swapChessNodeEx(e, t) {
					this.swapChessNode(this._PlayerChessCellArr[0][e], this._PlayerChessCellArr[0][t]);
				},
				swapGameChessLayout: function swapGameChessLayout(e, t) {
					this.swapChessNode(e, this._GameChessSelected);
					var a = cc.GameCache.checkGameChessLayoutValid(this.getMineChessDataArr(t));
					if (a > 0) this.swapChessNode(this._GameChessSelected, e), this._GameChessSelected = null, cc.AppUtil.showToast(["", "\u5F39\u4E0D\u80FD\u653E\u7B2C\u4E00\u6392", "\u96F7\u53EA\u80FD\u653E\u6700\u540E\u4E24\u6392", "\u65D7\u53EA\u80FD\u653E\u53F8\u4EE4\u90E8"][a]); else {
						var s = this._GameChessSelected.getChessCellNode(),
							c = e.getChessCellNode(),
							i = s.getPosition(),
							n = c.getPosition();

						if (s.runAction(cc.moveTo(.1, n)), c.runAction(cc.moveTo(.1, i)), 9 == cc.GameRoomType) {
							var o = this._PlayerChessCellArr[0].indexOf(e),
								r = this._PlayerChessCellArr[0].indexOf(this._GameChessSelected);

							this._Game._ChessDataArr[this._Game._SeatID].swap(o, r), cc.Websocket.Send(cc.ClientProtocol.SwapChess(o + 1, r + 1));
						} else cc.GameCache.setTempChessLayout(2 == t ? 1 : 0, this.getMineChessDataArr(t));

						this.clearSelectChessCache(), this._GameChessSelected = null;
					}
				},
				getTeamChessColor: function getTeamChessColor(e) {
					return (e + 2) % 4;
				},
				isTeamFriendChess: function isTeamFriendChess(e) {
					if (3 == cc.GameRoomType) return !1;
					var t = e.getChess();
					return null != t && this.getTeamChessColor(t.getChessColor()) == this._MineChessColor;
				},
				cancelChessSelected: function cancelChessSelected() {
					this._GameChessSelected && this._GameChessSelected._ChessCellState == cc.ChessCellType.ChessCell_Chess && this._GameChessSelected.setGameChessNormal(), this._GameChessSelected = null;
				},
				checkGameChessDead: function checkGameChessDead(e, t) {
					var a = [];

					switch (cc.ChessCellUtil.compareTwoChessCell(e, t)) {
						case 1:
							var s = e.getChess().getChessColor(),
								c = t.getChess().getChessGrade(),
								i = t.getChess().getChessColor();
							4 == t._Type && this.checkCanNotMoveChessColor(s, [e]) && a.push(s), (1 == c || this.checkCanNotMoveChessColor(i, [t])) && a.push(i);
							break;

						case 2:
							var n = e.getChess().getChessColor();
							this.checkCanNotMoveChessColor(n, [e]) && a.push(n);
							break;

						case 0:
							var o = e.getChess().getChessGrade();
							s = e.getChess().getChessColor(), c = t.getChess().getChessGrade(), i = t.getChess().getChessColor(), (1 == o || this.checkCanNotMoveChessColor(s, [e, t])) && a.push(s), (1 == c || this.checkCanNotMoveChessColor(i, [e, t])) && a.push(i);
					}

					return a;
				},
				sendMoveChessTrace: function sendMoveChessTrace(e) {
					for (var t = cc.ChessCellUtil.getChessMoveTrace(), a = this.checkGameChessDead(t.front(), t.back()), s = [], c = 0; c < t.length; c++) {
						s.push_array(this._Game.getWorldCoordinate(t[c]._CellPos));
					}

					cc.Websocket.Send(cc.ClientProtocol.MoveChess(s, a, e ? 1 : 0)), this._Game.changeGameState(cc.GameStateType.GameState_PlayingWait);
				},
				checkCanNotMoveChess: function checkCanNotMoveChess(e) {
					if (4 == e._Type) return !0;
					if (e._ChessCellState != cc.ChessCellType.ChessCell_Chess) return !0;
					var t = e.getChess();
					if (t && 12 == t.getChessGrade()) return !0;

					var a = this._TrappedCellArr1.indexOf(e);

					if (-1 != a) {
						var s = this._TrappedCellArr2[a];

						if (s) {
							var c = s.getChess();
							if (c && 12 == c.getChessGrade()) return !0;
						}
					}

					return !1;
				},
				checkCanNotMoveChessColor: function checkCanNotMoveChessColor(e, t) {
					for (var a = 0; a < 17; a++) {
						for (var s = 0; s < 17; s++) {
							var c = this._ChessCellArr[a][s];

							if (null != c && c._ChessCellState == cc.ChessCellType.ChessCell_Chess) {
								var i = c.getChess();
								if (null != i && i.getChessColor() == e && -1 == t.indexOf(c) && !this.checkCanNotMoveChess(c)) return !1;
							}
						}
					}

					return !0;
				},
				loadChessLayout: function loadChessLayout(e, t, a, s) {
					for (var c = 0; c < t.length; c++) {
						var i = this._PlayerChessCellArr[e][c].getChess();

						i && i.setGameChess(a, s, t[c]);
					}
				},
				loadChessLayoutDefault: function loadChessLayoutDefault(e) {
					this.loadChessLayout(0, e, this._MineChessColor, !0), cc.GameCache.setTempChessLayout(0, e);
				},
				showGameChessSelected: function showGameChessSelected() {
					null != this._GameChessSelected && this._GameChessSelected.setGameChessSelected(0);
				},
				clearChessBoard: function clearChessBoard() {
					if (this._NotEatChessCount = 0, this._EatChessArr.clear(), this._ShowJunQiColors.clear(), null != this._ChessCellArr) {
						for (var e = 0; e < 17; e++) {
							for (var t = 0; t < 17; t++) {
								this._ChessCellArr[e][t] && this._ChessCellArr[e][t].changeChessCellState(cc.ChessCellType.ChessCell_Empty);
							}
						}

						this.isMovingGameChess() && (this._MovingChessNode && (this._MovingChessNode.stopAllActions(), this._MovingChessNode.destroy()), this._MovingChessNode = null, this._IsMovingGameChess = !1);
					}
				},
				clearColorChessFromBoard: function clearColorChessFromBoard(e, t) {
					t && cc.AppUtil.playAudioEffect(this.deadAudio);

					for (var a = 0; a < 17; a++) {
						for (var s = 0; s < 17; s++) {
							var c = this._ChessCellArr[a][s];
							null != c && c._ChessCellState == cc.ChessCellType.ChessCell_Chess && c.getChess().getChessColor() == e && c.changeChessCellState(cc.ChessCellType.ChessCell_Empty);
						}
					}
				},
				setMineChessColor: function setMineChessColor(e) {
					this._MineChessColor = e;
				},
				updateChessBoard: function updateChessBoard(e, t, a, s) {
					for (var c = this._PlayerChessCellArr[e], i = 0; i < c.length; i++) {
						c[i].changeChessCellState(cc.ChessCellType.ChessCell_Chess);
					}

					var n = !1;
					0 == e && (0 == a[0] && (a = cc.GameCache.getTempChessLayout(0)), n = !0, this._MineChessColor = t), 2 == e && 10 == cc.GameRoomType && (0 == a[0] && (a = cc.GameCache.getTempChessLayout(1)), n = !0), this.loadChessLayout(e, a, t, n), null != s && this.updateChessBoard((e + 2) % 4, this.getTeamChessColor(t), s);
				},
				getGameChessJunQi: function getGameChessJunQi(e) {
					for (var t = 0; t < this._JunQiCellArr.length; t++) {
						var a = this._JunQiCellArr[t].getChess();

						if (null != a && 1 == a.getChessGrade() && a.getChessColor() == e) return a;
					}

					return null;
				},
				showGameChessFlag: function showGameChessFlag() {
					if (this._CommanderDead) for (var e = 0; e < this._CommanderColorArr.length; e++) {
						var t = this._CommanderColorArr[e];
						-1 != this._ShowJunQiColors.indexOf(t) && (t = this.getTeamChessColor(t));
						var a = this.getGameChessJunQi(t);
						a && a.showChess(), this._ShowJunQiColors.push(t);
					}
				},
				getEatGameChess: function getEatGameChess() {
					return this._EatChessArr.clone();
				},
				saveEatGameChess: function saveEatGameChess(e, t) {
					if (-1 != this._ChessResult) {
						var a = e.getComponent(cc.Component),
							s = t.getChess();
						null != a && null != s && (2 == this._ChessResult ? s.getChessColor() == this._MineChessColor && this._EatChessArr.push(a.getChessGrade()) : 1 == this._ChessResult ? a.getChessColor() == this._MineChessColor && this._EatChessArr.push(s.getChessGrade()) : a.getChessColor() == this._MineChessColor ? this._EatChessArr.push(s.getChessGrade()) : s.getChessColor() == this._MineChessColor && this._EatChessArr.push(a.getChessGrade()));
					}
				},
				showMoveGameChess: function showMoveGameChess(e, t, a) {
					switch (this._NotEatChessCount = -1 == this._ChessResult ? this._NotEatChessCount + 1 : 0, this.saveEatGameChess(t, e.back()), this._ChessResult) {
						case -1:
							e.back().setChessCellNode(t), a ? e.back().setGameChessSelected(1) : t.setPosition(e.back()._Rect.center);
							break;

						case 0:
							t.destroy(), e.back().changeChessCellState(a ? cc.ChessCellType.ChessCell_NoChessFlag : cc.ChessCellType.ChessCell_Empty), this.showGameChessFlag(), a && (cc.ChessCellUtil.addGameEffect(this.node, e.back(), "EatExplode"), cc.AppUtil.playAudioEffect(this._CommanderDead ? this.showflagAudio : this.bombAudio));
							break;

						case 1:
							e.back().changeChessCellState(cc.ChessCellType.ChessCell_Empty), e.back().setChessCellNode(t), a ? (e.back().setGameChessSelected(1), cc.ChessCellUtil.addGameEffect(this.node, e.back(), "EatChess"), cc.AppUtil.playAudioEffect(this.eatAudio)) : t.setPosition(e.back()._Rect.center);
							break;

						case 2:
							t.destroy(), this.showGameChessFlag(), a && (e.back().setGameChessSelected(1), cc.ChessCellUtil.addGameEffect(this.node, e.back(), "EatChessFailed"), cc.AppUtil.playAudioEffect(this._CommanderDead ? this.showflagAudio : this.killedAudio));
					}

					this._Game.updateGameStepTip(a);
				},
				getNotEatChessCount: function getNotEatChessCount() {
					return this._NotEatChessCount;
				},
				moveChessAction: function moveChessAction(e, t) {
					var a = t[0],
						s = t[1];

					if (s < a.length - 1) {
						var c = cc.ChessCellUtil.getCellDirection(a[s], a[s + 1]);
						a[s].changeChessCellState(cc.ChessCellType.ChessCell_MoveTrace + c - 1), e.runAction(cc.sequence(cc.moveTo(.05, a[s + 1]._Rect.center), cc.callFunc(this.moveChessAction, this, [a, s + 1]))), cc.AppUtil.playAudioEffect(this.moveAudio);
					} else this.showMoveGameChess(a, e, !0), this._IsMovingGameChess = !1;
				},
				getGameChessMoveTrace: function getGameChessMoveTrace(e) {
					for (var t = [], a = 1; a < e.pool.length; a += 2) {
						var s = e.pool[a].value,
							c = e.pool[a + 1].value,
							i = this._Game.getLocalCoordinate(s, c);

						t.push(this._ChessCellArr[i[0]][i[1]]);
					}

					return t;
				},
				showMoveChess: function showMoveChess(e) {
					var t = this.getGameChessMoveTrace(e);
					this._IsMovingGameChess = !0, cc.ChessCellUtil.clearChessBoardMoveTraceAndState(this._ChessCellArr), this._ChessResult = cc.ChessCellUtil.compareTwoChessCell(t.front(), t.back()), this._CommanderDead = cc.ChessCellUtil.getCommanderDead(), this._CommanderColorArr = cc.ChessCellUtil.getCommanderColorArr();
					var a = t.front().getChessCellNode();
					t.front().setChessCellNode(null), a && this.moveChessAction(a, [t, 0]), this._MovingChessNode = a;
				},
				setMoveGameChess: function setMoveGameChess(e) {
					var t = this.getGameChessMoveTrace(e);
					this._ChessResult = cc.ChessCellUtil.compareTwoChessCell(t.front(), t.back()), this._CommanderDead = cc.ChessCellUtil.getCommanderDead(), this._CommanderColorArr = cc.ChessCellUtil.getCommanderColorArr();
					var a = t.front().getChessCellNode();
					t.front().setChessCellNode(null), a && this.showMoveGameChess(t, a, !1);
				},
				isMovingGameChess: function isMovingGameChess() {
					return this._IsMovingGameChess;
				},
				showTeamFriendChess: function showTeamFriendChess() {
					for (var e = this.getTeamChessColor(this._MineChessColor), t = 0; t < 17; t++) {
						for (var a = 0; a < 17; a++) {
							var s = this._ChessCellArr[t][a];

							if (null != s) {
								var c = s.getChess();
								c && c.getChessColor() == e && c.showChess();
							}
						}
					}
				},
				getCurrentChessGongBing: function getCurrentChessGongBing(e) {
					var t = e.getChess();
					return !!t && 2 == t.getChessGrade();
				},
				clearSelectChessCache: function clearSelectChessCache() {
					this._SelectChessArr.clear();
				},
				addGameChessMarker: function addGameChessMarker(e) {
					if (e._ChessCellState == cc.ChessCellType.ChessCell_Chess) {
						var t = e.getChess();

						if (t && !t.getGameChessShow()) {
							var a = cc.instantiate(this.mark_chess_dlg);
							a.getComponent(cc.Component).setGameChess(t, this._Game.getWorldCoordinate(e._CellPos)), this.node.parent.addChild(a);
						}
					}
				},
				addChessMarker: function addChessMarker(e, t) {
					var a = this._ChessCellArr[e[0]][e[1]];

					if (null != a) {
						var s = a.getChess();
						s && s.showChessFlag(t);
					}
				},
				onTouchEvent: function onTouchEvent(e, t) {
					if (this._PrePoint = this._CurPoint, this._CurPoint = this.node.convertToNodeSpaceAR(e.getLocation()), !this.checkTouchChessBoard(this._CurPoint)) return this.setChessBoardLookMode(!1), !1;
					if (this._Game._GameState == cc.GameStateType.GameState_Review) return !1;
					this._Game._GameState != cc.GameStateType.GameState_Idle && this._Game._GameState != cc.GameStateType.GameState_Playing && this._Game._GameState != cc.GameStateType.GameState_GameLayout || 3 == t && this.setChessBoardLookMode(!0);
					var a = cc.ChessCellUtil.checkTouchGameChess(this._ChessCellArr, this._CurPoint);
					if (null == a) return !0;
					if (1 == t && (this._SelectChessArr.clear(), this._SelectChessArr.push(a)), 3 == t && this._SelectChessArr.push(a), 2 != this._SelectChessArr.size() || this._SelectChessArr[0] != this._SelectChessArr[1]) return !0;

					switch (a = this._SelectChessArr.front(), this._Game._GameState) {
						case cc.GameStateType.GameState_Idle:
						case cc.GameStateType.GameState_GameLayout:
							var s = (10 == cc.GameRoomType ? this._SKGameChessCellArr : this._PlayerChessCellArr[0]).indexOf(a);
							a._ChessCellState == cc.ChessCellType.ChessCell_Chess && -1 != s && (null == this._GameChessSelected ? (this._GameChessSelected = a, this._GameChessSelected.setGameChessSelected(0)) : a != this._GameChessSelected ? (this._GameChessSelected.setGameChessNormal(), a.getChess().getChessColor() == this._GameChessSelected.getChess().getChessColor() ? this.swapGameChessLayout(a, s > 24 ? 2 : 0) : (this._GameChessSelected = a, this._GameChessSelected.setGameChessSelected(0))) : this.cancelChessSelected(), cc.AppUtil.playAudioEffect(this.selectAudio));
							break;

						case cc.GameStateType.GameState_Playing:
							if (null == this._GameChessSelected) {
								if (cc.ChessCellUtil.isMineChess(a, this._MineChessColor)) {
									if (this.checkCanNotMoveChess(a)) return !0;
									this._GameChessSelected = a, this._GameChessSelected.setGameChessSelected(0), cc.AppUtil.playAudioEffect(this.selectAudio);
								} else this.addGameChessMarker(a);
							} else if (a == this._GameChessSelected) this.cancelChessSelected(), cc.AppUtil.playAudioEffect(this.selectAudio); else if (cc.ChessCellUtil.isMineChess(a, this._MineChessColor)) {
								if (this.checkCanNotMoveChess(a)) return !0;
								this._GameChessSelected.setGameChessNormal(), this._GameChessSelected = a, this._GameChessSelected.setGameChessSelected(0), cc.AppUtil.playAudioEffect(this.selectAudio);
							} else {
								if (this.isTeamFriendChess(a)) return !0;
								(this.getCurrentChessGongBing(this._GameChessSelected) ? cc.ChessCellUtil.checkCanFly : cc.ChessCellUtil.checkCanMove).apply(cc.ChessCellUtil, [this._GameChessSelected, a, this._ChessCellArr, this._RailroadCellArr]) ? (a.addAttackTarget(), this.cancelChessSelected(), this.sendMoveChessTrace(!1)) : (a.addCanNotMoveFlag(), cc.AppUtil.playAudioEffect(this.moveBanAudio));
							}
							break;

						case cc.GameStateType.GameState_PlayingWait:
							this.addGameChessMarker(a);
					}

					return !0;
				},
				showAllGameChess: function showAllGameChess() {
					for (var e = 0; e < 17; e++) {
						for (var t = 0; t < 17; t++) {
							var a = this._ChessCellArr[e][t];
							null != a && a._ChessCellState == cc.ChessCellType.ChessCell_Chess && a.getChess().showChess();
						}
					}
				}
			}), cc._RF.pop();
		}, {
			ChessCell: "ChessCell"
		}],
		ChessCellUtil: [function (e, t) {
			"use strict";

			cc._RF.push(t, "2a54d6ftytPbI/F3SqaELTh", "ChessCellUtil");

			var a = e("APath"),
				s = cc.Class({
					ctor: function ctor() {
						this._ChessMoveTrace = [];
					},
					createDebugDraw: function createDebugDraw(e) {
						var t = new cc.Node();
						e.addChild(t), this._DebugDraw = t.addComponent(cc.Graphics), this._DebugDraw.strokeColor = cc.Color.RED, this._DebugDraw.lineWidth = 5, t.zIndex = cc.macro.MAX_ZINDEX;
					},
					updateMapDrawer: function updateMapDrawer(e) {
						var t = e.length,
							a = e.front().length;

						this._DebugDraw.clear();

						for (var s = 0; s < t; s++) {
							for (var c = 0; c < a; c++) {
								var i = e[s][c];
								i && i._Rect && (this._DebugDraw.rect(i._Rect.x, i._Rect.y, i._Rect.width, i._Rect.height), this._DebugDraw.stroke());
							}
						}
					},
					checkTouchGameChess: function checkTouchGameChess(e, t) {
						for (var a = e.length, s = e.front().length, c = 0; c < a; c++) {
							for (var i = 0; i < s; i++) {
								var n = e[c][i];
								if (n && n._Rect && n._Rect.contains(t)) return n;
							}
						}

						return null;
					},
					isMineChess: function isMineChess(e, t) {
						return e._ChessCellState == cc.ChessCellType.ChessCell_Chess && e.getChess().getChessColor() == t;
					},
					getCellDirection: function getCellDirection(e, t) {
						return e._CellPos.x == t._CellPos.x ? t._CellPos.y > e._CellPos.y ? 3 : 7 : e._CellPos.y == t._CellPos.y ? t._CellPos.x > e._CellPos.x ? 5 : 1 : t._CellPos.x < e._CellPos.x && t._CellPos.y > e._CellPos.y ? 2 : t._CellPos.x > e._CellPos.x && t._CellPos.y > e._CellPos.y ? 4 : t._CellPos.x > e._CellPos.x && t._CellPos.y < e._CellPos.y ? 6 : t._CellPos.x < e._CellPos.x && t._CellPos.y < e._CellPos.y ? 8 : void 0;
					},
					clearChessBoardMoveTraceAndState: function clearChessBoardMoveTraceAndState(e) {
						for (var t = e.length, a = e.front().length, s = 0; s < t; s++) {
							for (var c = 0; c < a; c++) {
								null != e[s][c] && (e[s][c]._ChessCellState >= cc.ChessCellType.ChessCell_MoveTrace && e[s][c].changeChessCellState(cc.ChessCellType.ChessCell_Empty), e[s][c]._ChessCellState == cc.ChessCellType.ChessCell_Chess && e[s][c].setGameChessNormal());
							}
						}
					},
					checkCanMove: function checkCanMove(e, t, a, s) {
						if (3 == t._Type) return !1;

						if (t._ChessCellState == cc.ChessCellType.ChessCell_Chess) {
							if (0 == t._Type) return !1;
							var c = e.getChess(),
								i = t.getChess();
							if (null != c && null != i && c.getChessColor() == i.getChessColor()) return !1;
						}

						var n = e._CellPos.x,
							o = e._CellPos.y,
							r = t._CellPos.x,
							l = t._CellPos.y;

						if (this._ChessMoveTrace.clear(), 2 == e._Type && 2 == t._Type) {
							if (n == r) {
								for (var h = o < l ? o : l, C = o + l - h, d = h; d <= C; d++) {
									if (null == a[n][d]) return !1;

									if (3 != a[n][d]._Type) {
										if (2 != a[n][d]._Type) return !1;
										if (a[n][d] != e && a[n][d] != t && a[n][d]._ChessCellState == cc.ChessCellType.ChessCell_Chess) return !1;
										h == o ? this._ChessMoveTrace.push(a[n][d]) : this._ChessMoveTrace.push_front(a[n][d]);
									}
								}

								return !0;
							}

							if (o == l) {
								var u = n < r ? n : r,
									m = n + r - u;

								for (d = u; d <= m; d++) {
									if (null == a[d][o]) return !1;

									if (3 != a[d][o]._Type) {
										if (2 != a[d][o]._Type) return !1;
										if (a[d][o] != e && a[d][o] != t && a[d][o]._ChessCellState == cc.ChessCellType.ChessCell_Chess) return !1;
										u == n ? this._ChessMoveTrace.push(a[d][o]) : this._ChessMoveTrace.push_front(a[d][o]);
									}
								}

								return !0;
							}

							if (s) for (d = 0; d < 4; d++) {
								var p = s[d].indexOf(e);

								if (-1 != p) {
									var _ = s[d].indexOf(t);

									if (-1 != _) {
										for (var f = p < _ ? p : _, g = p + _ - f, G = f; G <= g; G++) {
											if (s[d][G] != e && s[d][G] != t && s[d][G]._ChessCellState == cc.ChessCellType.ChessCell_Chess) return !1;
											f == p ? this._ChessMoveTrace.push(s[d][G]) : this._ChessMoveTrace.push_front(s[d][G]);
										}

										return !0;
									}
								}
							}
						}

						if (this._ChessMoveTrace.push(e), this._ChessMoveTrace.push(t), 0 == e._Type) {
							if (n == r && 1 == Math.abs(l - o) || o == l && 1 == Math.abs(r - n) || 1 == Math.abs(r - n) && 1 == Math.abs(l - o)) return !0;
						} else if (2 == e._Type) {
							if (0 == t._Type && 1 == Math.abs(r - n) && 1 == Math.abs(l - o) || n == r && 1 == Math.abs(l - o) || o == l && 1 == Math.abs(r - n)) return !0;
						} else if (1 == e._Type && (n == r && 1 == Math.abs(l - o) || o == l && 1 == Math.abs(r - n))) return !0;

						return !1;
					},
					checkCanFly: function checkCanFly(e, t, s, c) {
						if (this.checkCanMove(e, t, s, c)) return !0;
						if (2 != e._Type) return !1;
						var i = new a();
						return i.init(s), !!i.findPath(e, t) && (this._ChessMoveTrace = i.getPathNodeList(), !0);
					},
					getChessMoveTrace: function getChessMoveTrace() {
						return this._ChessMoveTrace;
					},
					compareTwoChessCell: function compareTwoChessCell(e, t) {
						if (this._CommanderDead = !1, e._ChessCellState == cc.ChessCellType.ChessCell_Chess && t._ChessCellState == cc.ChessCellType.ChessCell_Chess) {
							var a = e.getChess(),
								s = t.getChess();
							if (null == a || null == s) return -1;
							var c = a.getChessGrade(),
								i = s.getChessGrade();
							return 11 == c || 11 == i || c == i ? (this._CommanderDead = 10 == c || 10 == i, this._CommanderColorArr = [], 10 == c && this._CommanderColorArr.push(a.getChessColor()), 10 == i && this._CommanderColorArr.push(s.getChessColor()), 0) : c > i && 2 != c || 2 == c && (12 == i || 1 == i) ? 1 : (this._CommanderDead = 10 == c, this._CommanderColorArr = [a.getChessColor()], 2);
						}

						return -1;
					},
					getCommanderDead: function getCommanderDead() {
						return this._CommanderDead;
					},
					getCommanderColorArr: function getCommanderColorArr() {
						return this._CommanderColorArr;
					},
					addGameEffect: function addGameEffect(e, t, a) {
						cc.AppUtil.loadResFromBundle("prefab/" + a, cc.Prefab, function (a) {
							if (e) {
								var s = cc.instantiate(a);
								e.addChild(s), s.setPosition(t._Rect.center), s.getComponent(cc.Animation).on("finished", function () {
									s.destroy();
								});
							}
						});
					}
				});
			cc.ChessCellUtil = new s(), cc._RF.pop();
		}, {
			APath: "APath"
		}],
		ChessCell: [function (e, t) {
			"use strict";

			cc._RF.push(t, "87c50RjyGxFB6Z9m4QJvLMF", "ChessCell"), cc.ChessCellType = {
				ChessCell_Empty: 0,
				ChessCell_Chess: 1,
				ChessCell_MoveTrace: 2,
				ChessCell_NoChessFlag: 100
			};
			var a = cc.Class({
				ctor: function ctor() {
					this._ChessBoard = arguments[0], this._Rect = null, this._Type = arguments[1], this._ChessCellState = cc.ChessCellType.ChessCell_Empty, this._ChessCellNode = null, this._CanReachableCells = null;
				},
				getChess: function getChess() {
					return this._ChessCellNode && this._ChessCellState == cc.ChessCellType.ChessCell_Chess ? this._ChessCellNode.getComponent(cc.Component) : null;
				},
				getChessCellNode: function getChessCellNode() {
					return this._ChessCellNode;
				},
				setChessCellNode: function setChessCellNode(e) {
					this._ChessCellNode = e, this._ChessCellState = null != e ? cc.ChessCellType.ChessCell_Chess : cc.ChessCellType.ChessCell_Empty;
				},
				initRect: function initRect(e, t) {
					3 != this._Type && (4 == cc.GameRoomType || 8 == cc.GameRoomType ? this._Rect = cc.rect(112.5 * t - 225 - 45, 360 - 60 * e - 16, 90, 40) : this._Rect = cc.rect(37 * t - 296 - 16, 298 - 37 * e - 16, 32, 32)), this._CellPos = cc.v2(e, t);
				},
				addSpriteFrameNode: function addSpriteFrameNode(e) {
					var t = new cc.Node();
					this._ChessBoard.node.addChild(t), t.setPosition(this._Rect.center);
					var a = t.addComponent(cc.Sprite);
					return a.spriteFrame = e, a.sizeMode = cc.Sprite.SizeMode.RAW, t;
				},
				onDestroyFromParent: function onDestroyFromParent(e) {
					e.destroy();
				},
				addAttackTarget: function addAttackTarget() {
					this.addSpriteFrameNode(this._ChessBoard.can_move_sprite).runAction(cc.sequence(cc.fadeIn(.1), cc.fadeOut(.2), cc.callFunc(this.onDestroyFromParent, this)));
				},
				addCanNotMoveFlag: function addCanNotMoveFlag() {
					this.addSpriteFrameNode(this._ChessBoard.can_not_move_sprite).runAction(cc.sequence(cc.fadeIn(.1), cc.fadeOut(.5), cc.callFunc(this.onDestroyFromParent, this)));
				},
				changeChessCellState: function changeChessCellState(e) {
					switch (this._ChessCellNode && this._ChessCellNode.destroy(), this._ChessCellNode = null, e) {
						case cc.ChessCellType.ChessCell_Empty:
							break;

						case cc.ChessCellType.ChessCell_Chess:
							this._ChessCellNode = cc.instantiate(this._ChessBoard.chess_node), this._ChessBoard.node.addChild(this._ChessCellNode), this._ChessCellNode.setPosition(this._Rect.center);
							break;

						case cc.ChessCellType.ChessCell_NoChessFlag:
							this._ChessCellNode = this.addSpriteFrameNode(this._ChessBoard.chess_empty_sprite), this._ChessCellNode.setScale(.8), this._ChessCellNode.runAction(cc.repeatForever(cc.sequence(cc.fadeIn(.3), cc.delayTime(.3), cc.fadeOut(.2))));
							break;

						default:
							this._ChessCellNode = this.addSpriteFrameNode(this._ChessBoard.move_arrow_sprite), this._ChessCellNode.setScale(.8), this._ChessCellNode.rotation = 45 * (e - cc.ChessCellType.ChessCell_MoveTrace);
					}

					this._ChessCellState = e;
				},
				setGameChessSelected: function setGameChessSelected(e) {
					var t = this.getChess();
					t && t.setGameChessSelected(e);
				},
				setGameChessNormal: function setGameChessNormal() {
					var e = this.getChess();
					e && e.setGameChessNormal();
				}
			});
			t.exports = a, cc._RF.pop();
		}, {}],
		ChessColorFlag: [function (e, t) {
			"use strict";

			cc._RF.push(t, "17917E8M4NGwa+TM6sPcHdn", "ChessColorFlag"), cc.Class({
				extends: cc.Component,
				properties: {
					chess_flag_sprites: {
						default: [],
						type: cc.SpriteFrame
					}
				},
				showChessFlagColor: function showChessFlagColor(e) {
					null == cc.GameViewMode && this.node.getComponent(cc.Animation).play("ChessColorFlag"), this.node.getChildByName("Flag").getComponent(cc.Sprite).spriteFrame = this.chess_flag_sprites[e];
				},
				hideChessFlagColor: function hideChessFlagColor() {
					this.node.getChildByName("Flag").getComponent(cc.Sprite).spriteFrame = this.chess_flag_sprites[0];
				}
			}), cc._RF.pop();
		}, {}],
		ChessLayoutPage: [function (e, t) {
			"use strict";

			cc._RF.push(t, "f1c8fA0RmxLhJPniLLhR8HP", "ChessLayoutPage"), cc.Class({
				extends: cc.Component,
				properties: {
					chess_node: {
						default: null,
						type: cc.Prefab
					},
					selectAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				ctor: function ctor() {
					this._ChessBoard = null;
				},
				onLoad: function onLoad() {
					this._GameChessArr = [], this._GameChessSelected = -1, this.node.getComponent("TouchPanel").setCallbackFunc(this.onTouchEvent, this);
				},
				onTouchEvent: function onTouchEvent(e, t) {
					if (1 == t) for (var a = this.node.convertToNodeSpaceAR(e.getLocation()), s = 0; s < this._GameChessArr.length; s++) {
						if (this._GameChessArr[s].node.getBoundingBox().contains(a)) return cc.AppUtil.playAudioEffect(this.selectAudio), void (-1 == this._GameChessSelected ? (this._GameChessSelected = s, this._GameChessArr[s].setGameChessSelected(0)) : s != this._GameChessSelected && (this._GameChessArr[this._GameChessSelected].setGameChessNormal(), this.swapGameChessLayout(s)));
					}
				},
				getGameChessValueArr: function getGameChessValueArr() {
					for (var e = [], t = 0; t < this._GameChessArr.length; t++) {
						e.push(this._GameChessArr[t].getChessGrade());
					}

					return e;
				},
				swapGameChessLayout: function swapGameChessLayout(e) {
					var t = this._GameChessArr.clone();

					this._GameChessArr.swap(this._GameChessSelected, e);

					var a = cc.GameCache.checkGameChessLayoutValid(this.getGameChessValueArr());
					if (a > 0) this._GameChessSelected = -1, this._GameChessArr = t, cc.AppUtil.showToast(["", "\u5F39\u4E0D\u80FD\u653E\u7B2C\u4E00\u6392", "\u96F7\u53EA\u80FD\u653E\u6700\u540E\u4E24\u6392", "\u65D7\u53EA\u80FD\u653E\u53F8\u4EE4\u90E8"][a]); else {
						var s = t[this._GameChessSelected].node,
							c = t[e].node,
							i = s.getPosition(),
							n = c.getPosition();
						s.runAction(cc.moveTo(.1, n)), c.runAction(cc.moveTo(.1, i)), this._GameChessSelected = -1;
					}
				},
				setChessLayoutIndex: function setChessLayoutIndex(e) {
					var t = this;
					this._BtnSave = this.node.getChildByName("BtnSave"), this._BtnSave.on("click", function () {
						cc.GameCache.saveChessLayout(t._ChessLayoutIndex, t.getGameChessValueArr()), cc.AppUtil.showToast("\u5E03\u5C40\u4FDD\u5B58\u6210\u529F\uFF01");
					}), this._BtnOpen = this.node.getChildByName("BtnOpen"), this._BtnOpen.on("click", function () {
						t._ChessBoard.loadChessLayoutDefault(t.getGameChessValueArr()), cc.AppUtil.showToast("\u8C03\u5165\u5E03\u5C40\u6210\u529F\uFF01");

						for (var e = t.node.parent; "ChessLayout" != e.name;) {
							e = e.parent;
						}

						e.destroy();
					}), this._BtnUnLock = this.node.getChildByName("BtnUnLock"), this._BtnUnLock.on("click", function () {
						cc.AppUtil.showWXVideoAd(function () {
							t.node && t.unLockChessLayout();
						});
					}), this._ChessLayoutIndex = e, this.updateGameBtns();
				},
				updateGameBtns: function updateGameBtns() {
					var e = cc.GameCache.isChessLayoutLocked(this._ChessLayoutIndex);
					this.node.getChildByName("Lock").active = e, this._BtnSave.active = !e, this._BtnOpen.active = !e, this._BtnUnLock.active = e, e || this.initGameChessNodes();
				},
				unLockChessLayout: function unLockChessLayout() {
					cc.GameCache.unLockChessLayout(this._ChessLayoutIndex), this.updateGameBtns(), this.updateOpenButton();
					var e = this;
					cc.AppUtil.loadResFromBundle("particles/levelUp", cc.ParticleAsset, function (t) {
						if (e.node) {
							var a = new cc.Node(),
								s = a.addComponent(cc.ParticleSystem);
							s.file = t, s.autoRemoveOnFinish = !0, a.y = -100, e.node.addChild(a);
						}
					});
				},
				initGameChessNodes: function initGameChessNodes() {
					var e = cc.GameCache.getChessLayout(this._ChessLayoutIndex),
						t = 0;

					this._GameChessArr.clear();

					for (var a = 0; a < 6; a++) {
						for (var s = 0; s < 5; s++) {
							if ((1 != a && 3 != a || 1 != s && 3 != s) && (2 != a || 2 != s)) {
								var c = cc.instantiate(this.chess_node);
								this.node.addChild(c), c.setScale(1.4), c.setPosition(58.6 * s - 117, 152 - 55.2 * a);
								var i = c.getComponent(cc.Component);
								i.setGameChess(3, !0, e[t++]), this._GameChessArr.push(i);
							}
						}
					}
				},
				setChessBoard: function setChessBoard(e) {
					this._ChessBoard = e, this.updateOpenButton();
				},
				updateOpenButton: function updateOpenButton() {
					null == this._ChessBoard && (this._BtnOpen.active && (this._BtnOpen.active = !1), this._BtnSave.x = 0);
				}
			}), cc._RF.pop();
		}, {}],
		ChessLayout: [function (e, t) {
			"use strict";

			cc._RF.push(t, "e9e03GJNMBMlZdmdiQU++G6", "ChessLayout"), cc.Class({
				extends: cc.Component,
				properties: {
					chess_layout_page: {
						default: null,
						type: cc.Prefab
					},
					tapAudio: {
						default: null,
						type: cc.AudioClip
					},
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				ctor: function ctor() {
					this._ChessBoard = null;
				},
				onLoad: function onLoad() {
					var e = this;
					this.node.getChildByName("BtnClose").on("click", function () {
						e.node && (cc.AppUtil.playAudioEffect(e.buttonAudio), e.node.destroy());
					}), this.initGamePageView();
				},
				onEnable: function onEnable() {
					4 == cc.PlatformType && cc.AppUtil.showOriginGameAd(!1, !1), cc.AppUtil.showWXGameBannerAd(!0);
				},
				onDisable: function onDisable() {
					cc.AppUtil.showWXGameBannerAd(!1);
				},
				initGamePageView: function initGamePageView() {
					this._PageView = this.node.getChildByName("PageView").getComponent(cc.PageView);

					for (var e = 0; e < 5; e++) {
						var t = cc.instantiate(this.chess_layout_page),
							a = t.getComponent(cc.Component);
						this._PageView.addPage(t), a.setChessLayoutIndex(e), a.setChessBoard(this._ChessBoard);
					}

					var s = ["L", "R"];

					for (e = 0; e < 2; e++) {
						this.node.getChildByName("Btn" + s[e]).on("click", this.onBtnLayoutLRClicked, this);
					}
				},
				onBtnLayoutLRClicked: function onBtnLayoutLRClicked(e) {
					var t = this._PageView.getCurrentPageIndex();

					"BtnL" == e.node.name ? t > 0 && t-- : t < 4 && t++, this._PageView.scrollToPage(t), cc.AppUtil.playAudioEffect(this.tapAudio);
				},
				setChessBoard: function setChessBoard(e) {
					this._ChessBoard = e;
				}
			}), cc._RF.pop();
		}, {}],
		ChessNodeFanFan: [function (e, t) {
			"use strict";

			cc._RF.push(t, "9c8b1lKwyZEcbThzuy3h2mO", "ChessNodeFanFan"), cc.Class({
				extends: cc.Component,
				properties: {
					chess_bg_sprites: {
						default: [],
						type: cc.SpriteFrame
					},
					chess_sprites: {
						default: [],
						type: cc.SpriteFrame
					}
				},
				showChess: function showChess() {
					this.setGameChess(this._ChessColor, this._ChessGrade, !0);
				},
				setGameChess: function setGameChess(e, t, a) {
					this._ChessColor = e, this._ChessGrade = t, this._ShowChess = a, this.node.getChildByName("Chess").getComponent(cc.Sprite).spriteFrame = this.chess_bg_sprites[this._ShowChess ? this._ChessColor : 0];
					var s = this.node.getChildByName("Value");
					s.getComponent(cc.Sprite).spriteFrame = this.chess_sprites[t - 1], s.active = a;
				},
				getChessColor: function getChessColor() {
					return this._ShowChess ? this._ChessColor : 0;
				},
				getChessGrade: function getChessGrade() {
					return this._ChessGrade;
				},
				setGameChessSelected: function setGameChessSelected(e) {
					this.setGameChessNormal();
					var t = this.node.getChildByName("ChessHint_" + e);
					t.active = !0, t.stopAllActions(), t.runAction(cc.repeatForever(cc.sequence(cc.fadeIn(.1), cc.fadeOut(.8))));
				},
				setGameChessNormal: function setGameChessNormal() {
					this.node.getChildByName("ChessHint_1").active = !1, this.node.getChildByName("ChessHint_2").active = !1;
				}
			}), cc._RF.pop();
		}, {}],
		ChessNode: [function (e, t) {
			"use strict";

			cc._RF.push(t, "3218bNPETpK+b19g+e+jZ04", "ChessNode"), cc.Class({
				extends: cc.Component,
				properties: {
					chess_bg_sprites: {
						default: [],
						type: cc.SpriteFrame
					},
					chess_sprites: {
						default: [],
						type: cc.SpriteFrame
					},
					chess_flag_sprites: {
						default: [],
						type: cc.SpriteFrame
					},
					chess_effect_sprites: {
						default: [],
						type: cc.SpriteFrame
					}
				},
				showChess: function showChess() {
					this.setGameChess(this.getChessColor(), !0, this.getChessGrade());
				},
				setGameChess: function setGameChess(e, t, a) {
					var s = cc.js.formatStr("ChessSprite%s", t ? "" : "Bg"),
						c = this.node.getChildByName(s);
					c.getComponent(cc.Sprite).spriteFrame = t ? this.chess_sprites[e] : this.chess_bg_sprites[e], c.active = !0;
					var i = this.node.getChildByName("Label");
					i.getComponent(cc.Label).string = ["", "\u65D7", "\u5175", "\u6392", "\u8FDE", "\u8425", "\u56E2", "\u65C5", "\u5E08", "\u519B", "\u53F8", "\u5F39", "\u96F7"][a], i.active = t, this._ChessColor = e, this._ChessGrade = a;
				},
				getGameChessShow: function getGameChessShow() {
					return this.node.getChildByName("Label").active;
				},
				getChessColor: function getChessColor() {
					return this._ChessColor;
				},
				getChessGrade: function getChessGrade() {
					return this._ChessGrade;
				},
				setGameChessSelected: function setGameChessSelected(e) {
					var t = this.node.getChildByName("Effect");
					t.getComponent(cc.Sprite).spriteFrame = this.chess_effect_sprites[e], t.active = !0, t.stopAllActions(), t.runAction(cc.repeatForever(cc.sequence(cc.fadeIn(.1), cc.fadeOut(.8))));
				},
				setGameChessNormal: function setGameChessNormal() {
					this.node.getChildByName("Effect").active = !1;
				},
				showChessFlag: function showChessFlag(e) {
					var t = this.node.getChildByName("Flag");
					t.getComponent(cc.Sprite).spriteFrame = this.chess_flag_sprites[e], t.active = !0;
				},
				hideChessFlag: function hideChessFlag() {
					this.node.getChildByName("Flag").active = !1;
				},
				showChessFlagNode: function showChessFlagNode() {
					this.node.getChildByName("FlagNode").active = !0, this.node.zIndex = cc.macro.MAX_ZINDEX;
				},
				hideChessFlagNode: function hideChessFlagNode() {
					this.node.getChildByName("FlagNode").active = !1, this.node.zIndex = 0;
				}
			}), cc._RF.pop();
		}, {}],
		ClockTimer: [function (e, t) {
			"use strict";

			cc._RF.push(t, "fe59aX0xiBNCoHkMzXM18/9", "ClockTimer"), cc.Class({
				extends: cc.Component,
				properties: {
					timerAudio: {
						default: null,
						type: cc.AudioClip
					},
					timer_sprites: {
						default: [],
						type: cc.SpriteFrame
					}
				},
				onLoad: function onLoad() {
					this._TimerText = this.node.getChildByName("Text").getComponent(cc.Label), this._TimerClock = this.node.getChildByName("Clock").getComponent(cc.Sprite), this._TimerCount = 25, this.updateTimerText();
				},
				onEnable: function onEnable() {
					this.schedule(this.onTimer, 1);
				},
				onDisable: function onDisable() {
					this.unschedule(this.onTimer);
				},
				updateTimerText: function updateTimerText() {
					this._TimerText.string = this._TimerCount.toString(), this._TimerClock.spriteFrame = this.timer_sprites[[0, 1, 2, 1][this._TimerCount % 4]];
				},
				startTimer: function startTimer(e) {
					this._TimerCount = e, this.updateTimerText(), this._TimerCount = e + 1;
				},
				onTimer: function onTimer() {
					this._TimerCount > 0 && this._TimerCount--, this._TimerCount < 10 && cc.AppUtil.playAudioEffect(this.timerAudio), this.updateTimerText();
				}
			}), cc._RF.pop();
		}, {}],
		GameCache: [function (e, t) {
			"use strict";

			cc._RF.push(t, "ebf19ozoPNHkpa+sdcHtQCO", "GameCache");

			var a = e("Base64"),
				s = cc.Class({
					ctor: function ctor() {
						// 初始化Base64编码工具
						this._Base64 = new a();

						// 从本地存储中获取游戏数据
						var gameData = cc.sys.localStorage.getItem("NTSQ_JunQi_Data");

						// 如果游戏数据为空或不存在，则初始化游戏缓存
						if ("" == gameData || null == gameData) {
							this.initGameCache();
						} else {
							// 否则，解码并解析存储的游戏数据
							this._GameCache = JSON.parse(this._Base64.decode(gameData));
						}
						this._GameGradeArr = [
							["\u9003\u5175", 1, -100, cc.color(0, 250, 250)],
							["\u5C0F\u5175", 1, 0, cc.color(0, 250, 200)],
							["\u526F\u73ED\u957F", 2, 10, cc.color(0, 250, 150)],
							["\u73ED\u957F", 2, 20, cc.color(0, 250, 100)],
							["\u526F\u6392\u957F", 3, 30, cc.color(0, 250, 50)],
							["\u6392\u957F", 3, 50, cc.color(0, 250, 0)],
							["\u526F\u8FDE\u957F", 4, 100, cc.color(50, 250, 0)],
							["\u8FDE\u957F", 4, 150, cc.color(100, 250, 0)],
							["\u526F\u8425\u957F", 5, 250, cc.color(150, 250, 0)],
							["\u8425\u957F", 5, 350, cc.color(200, 250, 0)],
							["\u526F\u56E2\u957F", 6, 500, cc.color(250, 250, 0)],
							["\u56E2\u957F", 6, 800, cc.color(250, 200, 0)],
							["\u526F\u65C5\u957F", 7, 1200, cc.color(250, 150, 0)],
							["\u65C5\u957F", 7, 1800, cc.color(250, 100, 0)],
							["\u526F\u5E08\u957F", 8, 2500, cc.color(250, 50, 0)],
							["\u5E08\u957F", 8, 3500, cc.color(250, 0, 0)],
							["\u526F\u519B\u957F", 9, 5e3, cc.color(250, 0, 50)],
							["\u519B\u957F", 9, 7e3, cc.color(250, 0, 100)],
							["\u526F\u53F8\u4EE4", 10, 1e4, cc.color(250, 0, 150)],
							["\u53F8\u4EE4", 11, 15e3, cc.color(250, 0, 200)],
							["\u5143\u5E05", 12, 25e3, cc.color(250, 0, 250)]
						]
						this.initPlayerInfo("", null, 0, -1);
					},
					initGameCache: function initGameCache() {
						var e = function e() {
							return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
						},
							t = e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e(),
							a = Math.ceil(1e3 * Math.random());

						cc.sys.isNative && (cc.onGetDeviceID = function (e) {
							t = e;
						}, cc.sys.OS_IOS === cc.sys.os ? jsb.reflection.callStaticMethod("AppController", "GetDeviceID") : jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "GetDeviceID", "()V")), this._GameCache = {
							game_id: t,
							chess_data_arr: [null, null, null, null, null],
							egg_count: 10 ^ a,
							speaker_count: 10 ^ a,
							double_score_count: 0 ^ a,
							mark_chess_count: 20 ^ a,
							game_data_list: [],
							pass_guidance: !1,
							open_id: "",
							protect_score_count: 0 ^ a,
							head_decorate: 0,
							head_decorate_time: "",
							game_privacy: !1,
							game_music: !0,
							game_audio_effect: !0,
							vibrate_tip: !0,
							chess_board_scale: !0,
							value_mask: a,
							default_chess_layout: [null, null]
						}, this.saveGameCacheData();
					},
					saveGameCacheData: function saveGameCacheData() {
						cc.sys.localStorage.setItem("NTSQ_JunQi_Data", this._Base64.encode(JSON.stringify(this._GameCache)));
					},
					isPassGuidance: function isPassGuidance() {
						return this._GameCache.pass_guidance;
					},
					setPassGuidance: function setPassGuidance() {
						this._GameCache.pass_guidance = !0, this.saveGameCacheData();
					},
					isShowGamePrivacy: function isShowGamePrivacy() {
						return this._GameCache.game_privacy;
					},
					setShowGamePrivacy: function setShowGamePrivacy() {
						this._GameCache.game_privacy = !0, this.saveGameCacheData();
					},
					getGUID: function getGUID() {
						return this._GameCache.game_id;
					},
					getOpenID: function getOpenID() {
						return this._GameCache.open_id;
					},
					setOpenID: function setOpenID(e) {
						this._GameCache.open_id = e, this.saveGameCacheData();
					},
					initPlayerInfo: function initPlayerInfo(e, t, a, s) {
						this._Name = e, this._Actor = t || {
							clothes: 0,
							face: 0,
							head: 0
						}, this._Score = a, this._PlayerID = s;
					},
					setName: function setName(e) {
						this._Name = e;
					},
					getName: function getName() {
						return this._Name;
					},
					getActor: function getActor() {
						return this._Actor;
					},
					getScore: function getScore() {
						return this._Score;
					},
					getPlayerID: function getPlayerID() {
						return this._PlayerID;
					},
					addScore: function addScore(e) {
						var t = this.getGameScoreTitle(this._Score);
						this._Score += e;
						var a = this.getGameScoreTitle(this._Score);

						if (t[0] != a[0]) {
							var s = cc.js.formatStr("\u3010\u7CFB\u7EDF\u6D88\u606F\u3011\uFF1A%s<color=#00ff00>\u3010%s\u3011</c>%s\u6210\u4E3A<color=#00ff00>\u3010%s\u3011</c>\uFF01", e > 0 ? "\u795D\u8D3A" : "", this.getName(), e > 0 ? "\u664B\u7EA7" : "\u964D\u7EA7", a[0]);
							cc.Websocket.Send(cc.ClientProtocol.NotifyGameMsg(s));
						}
					},
					clearGameScore: function clearGameScore() {
						this._Score = 0, cc.Websocket.Send(cc.ClientProtocol.ClearGameScore());
					},
					getGameScoreTitle: function getGameScoreTitle(e) {
						for (var t = 1; t < this._GameGradeArr.length; t++) {
							if (e < this._GameGradeArr[t][2]) return this._GameGradeArr[t - 1];
						}

						return this._GameGradeArr.back();
					},
					isChessLayoutLocked: function isChessLayoutLocked(e) {
						return null == this._GameCache.chess_data_arr[e];
					},
					getDefaultChessLayout: function getDefaultChessLayout() {
						return [8, 4, 5, 6, 3, 11, 2, 10, 9, 11, 2, 6, 7, 5, 4, 3, 8, 7, 2, 12, 12, 1, 12, 3, 4];
					},
					unLockChessLayout: function unLockChessLayout(e) {
						this._GameCache.chess_data_arr[e] = this.getDefaultChessLayout(), this.saveGameCacheData();
						var t = cc.js.formatStr("\u3010\u7CFB\u7EDF\u6D88\u606F\u3011\uFF1A\u606D\u559C<color=#00ff00>\u3010%s\u3011</c>\u89E3\u9501\u65B0\u7684\u5E03\u5C40\uFF01", this.getName());
						cc.Websocket.Send(cc.ClientProtocol.NotifyGameMsg(t));
					},
					saveChessLayout: function saveChessLayout(e, t) {
						this._GameCache.chess_data_arr[e] = t, this.saveGameCacheData();
					},
					getChessLayout: function getChessLayout(e) {
						return this._GameCache.chess_data_arr[e];
					},
					setTempChessLayout: function setTempChessLayout(e, t) {
						this._GameCache.default_chess_layout[e] = t, this.saveGameCacheData();
					},
					getTempChessLayout: function getTempChessLayout(e) {
						return null == this._GameCache.default_chess_layout && (this._GameCache.default_chess_layout = []), this._GameCache.default_chess_layout[e] ? this._GameCache.default_chess_layout[e] : this.getDefaultChessLayout();
					},
					checkGameChessLayoutValid: function checkGameChessLayoutValid(e) {
						for (var t = 0; t < 5; t++) {
							if (11 == e[t]) return 1;
						}

						for (t = 0; t < 15; t++) {
							if (12 == e[t]) return 2;
						}

						return 1 != e[21] && 1 != e[23] ? 3 : 0;
					},
					getDoubleScoreCount: function getDoubleScoreCount() {
						return this._GameCache.double_score_count ^ this._GameCache.value_mask;
					},
					addDoubleScoreCount: function addDoubleScoreCount(e) {
						this._GameCache.double_score_count = this.getDoubleScoreCount() + e ^ this._GameCache.value_mask, this.saveGameCacheData();
					},
					getMarkChessCount: function getMarkChessCount() {
						return this._GameCache.mark_chess_count ^ this._GameCache.value_mask;
					},
					addMarkChessCount: function addMarkChessCount(e) {
						this._GameCache.mark_chess_count = this.getMarkChessCount() + e ^ this._GameCache.value_mask, this.saveGameCacheData();
					},
					getEggCount: function getEggCount() {
						return this._GameCache.egg_count ^ this._GameCache.value_mask;
					},
					addEggCount: function addEggCount(e) {
						this._GameCache.egg_count = this.getEggCount() + e ^ this._GameCache.value_mask, this.saveGameCacheData();
					},
					getSpeakerCount: function getSpeakerCount() {
						return this._GameCache.speaker_count ^ this._GameCache.value_mask;
					},
					addSpeakerCount: function addSpeakerCount(e) {
						this._GameCache.speaker_count = this.getSpeakerCount() + e ^ this._GameCache.value_mask, this.saveGameCacheData();
					},
					getProtectScoreCount: function getProtectScoreCount() {
						return this._GameCache.protect_score_count ^ this._GameCache.value_mask;
					},
					addProtectScoreCount: function addProtectScoreCount(e) {
						this._GameCache.protect_score_count = this.getProtectScoreCount() + e ^ this._GameCache.value_mask, this.saveGameCacheData();
					},
					getGameItemCount: function getGameItemCount(e) {
						switch (e) {
							case 0:
								return this.getDoubleScoreCount();

							case 1:
								return 0;

							case 2:
								return this.getMarkChessCount();

							case 3:
								return this.getEggCount();

							case 4:
								return this.getSpeakerCount();

							case 5:
								return this.getProtectScoreCount();

							default:
								return this.getShowHeadDecorate(e);
						}
					},
					setShowHeadDecorate: function setShowHeadDecorate(e) {
						var t = new Date().getTime() / 1e3 + 86400;
						this._GameCache.head_decorate = e, this._GameCache.head_decorate_time = t.toString(), this.saveGameCacheData();
					},
					getShowHeadDecorate: function getShowHeadDecorate(e) {
						var t = 0,
							a = new Date().getTime() / 1e3;

						if (e >= 6 && e <= 11 && e - 5 == this._GameCache.head_decorate && (t = parseInt(this._GameCache.head_decorate_time)), t > a) {
							var s = t - a,
								c = Math.floor(s / 3600),
								i = Math.floor(s % 3600 / 60);
							return 0 == s && 0 == i ? "- \u5373\u5C06\u505C\u6B62\u663E\u793A -" : cc.js.formatStr("- \u5269\u4F59%s\u65F6%d\u5206 -", c, i);
						}

						return "";
					},
					getGameHeadDecorate: function getGameHeadDecorate() {
						if (this._GameCache.head_decorate > 0) {
							var e = new Date().getTime() / 1e3;
							parseInt(this._GameCache.head_decorate_time) < e && (this._GameCache.head_decorate = 0, this.saveGameCacheData());
						}

						return this._GameCache.head_decorate;
					},
					checkHasHeadDecorate: function checkHasHeadDecorate() {
						return this._GameCache.head_decorate > 0;
					},
					getDateNowString: function getDateNowString() {
						for (var e = function e(_e2) {
							return _e2 < 10 ? "0" + _e2.toString() : _e2.toString();
						}, t = new Date(), a = [t.getFullYear(), t.getMonth() + 1, t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds()], s = 0; s < a.length; s++) {
							a[s] = e(a[s]);
						}

						return a.slice(0, 3).join("-") + " " + a.slice(3).join(":");
					},
					addGameData: function addGameData(e, t) {
						this._GameCache.game_data_list.push_front([this.getDateNowString(), t, e, cc.GameRoomType]), this._GameCache.game_data_list.length > 30 && this._GameCache.game_data_list.pop_back(), this.saveGameCacheData();
					},
					getGameData: function getGameData() {
						return this._GameCache.game_data_list;
					},
					clearGameData: function clearGameData() {
						this._GameCache.game_data_list.clear(), this.saveGameCacheData();
					},
					getSettingOptionValue: function getSettingOptionValue(e) {
						return [this._GameCache.game_music, this._GameCache.game_audio_effect, this._GameCache.vibrate_tip, this._GameCache.chess_board_scale][e];
					},
					toggleSettingOptionValue: function toggleSettingOptionValue(e) {
						switch (e) {
							case 0:
								this._GameCache.game_music = !this._GameCache.game_music;
								break;

							case 1:
								this._GameCache.game_audio_effect = !this._GameCache.game_audio_effect;
								break;

							case 2:
								this._GameCache.vibrate_tip = !this._GameCache.vibrate_tip;
								break;

							case 3:
								this._GameCache.chess_board_scale = !this._GameCache.chess_board_scale;
						}

						this.saveGameCacheData();
					}
				});
			cc.GameCache = new s(), cc._RF.pop();
		}, {
			Base64: "Base64"
		}],
		GameChat: [function (e, t) {
			"use strict";

			cc._RF.push(t, "a4d51U8Mb1OkqJ0w2CehG4V", "GameChat"), cc.Class({
				extends: cc.Component,
				properties: {
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					this._ChatBQ_Panel = this.node.getChildByName("GameChatPanel"), this._ChatBQ_Panel.active = !1, this._EditBox = this._ChatBQ_Panel.getChildByName("EditBox").getComponent(cc.Component), this.updateGameSpeakerCount();
					var e = this;
					this._ChatBQ_Panel.getChildByName("BtnSend").on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio);
						var t = e._EditBox.string;

						if ("" != t) {
							if (e._ChatBQ_Panel.active = !1, cc.GameCache.getSpeakerCount() <= 0) return cc.AppUtil.showToast("\u4EB2\u3001\u60A8\u7684\u5C0F\u5587\u53ED\u6570\u91CF\u4E0D\u8DB3\uFF01"), void e.triggerVideoGameSpeaker();
							cc.Websocket.Send(cc.ClientProtocol.GameChatText(t)), e._EditBox.string = "", cc.GameCache.addSpeakerCount(-1), e.updateGameSpeakerCount();
						} else cc.AppUtil.showToast("\u4EB2\u3001\u8BF7\u8F93\u5165\u5C0F\u5587\u53ED\u5185\u5BB9\uFF01");
					}), this.node.getChildByName("BtnLBChat").on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), e._ChatBQ_Panel.active = !e._ChatBQ_Panel.active;
					});
				},
				updateGameSpeakerCount: function updateGameSpeakerCount() {
					this.node.getChildByName("BtnLBChat").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = cc.js.formatStr("%d", cc.GameCache.getSpeakerCount());
				},
				triggerVideoGameSpeaker: function triggerVideoGameSpeaker() {
					if (3 != cc.PlatformType || 0 != cc.GameTrick) {
						var e = this;
						cc.AppUtil.showModal("\u89C2\u770B\u89C6\u9891\u540E\u5C06\u83B7\u5F9710\u4E2A\u5C0F\u5587\u53ED\uFF01", function (t) {
							if (t) {
								var a = e;
								cc.AppUtil.showWXVideoAd(function () {
									cc.GameCache.addSpeakerCount(10), a.node && a.updateGameSpeakerCount();
								});
							}
						}, !0);
					}
				},
				hideChatBQPanel: function hideChatBQPanel() {
					this._ChatBQ_Panel.active = !1;
				}
			}), cc._RF.pop();
		}, {}],
		GameChessMark: [function (e, t) {
			"use strict";

			cc._RF.push(t, "919786/WjdKOoscPYtcYIaC", "GameChessMark"), cc.Class({
				extends: cc.Component,
				properties: {
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					for (var e = this, t = 1; t <= 20; t++) {
						var a = this.node.getChildByName("Btn_" + t);
						a.name = t.toString(), a.on("click", function (t) {
							if (null != e.node) {
								cc.AppUtil.playAudioEffect(e.buttonAudio);
								var a = parseInt(t.node.name);
								20 == a ? e.hideGameChessFlag() : cc.GameCache.getMarkChessCount() <= 0 ? cc.AppUtil.showToast("\u60A8\u7684\u6807\u8BB0\u5269\u4F59\u6B21\u6570\u4E3A0\uFF01") : (e.showGameChessFlag(a - 1), cc.GameCache.addMarkChessCount(-1)), e.hideChessFlagNode(), e.node.destroy();
							}
						});
					}

					this.node.getChildByName("Text").getComponent(cc.Label).string = cc.js.formatStr("\u60A8\u5F53\u524D\u6807\u8BB0\u5269\u4F59\u6B21\u6570\uFF1A%d", cc.GameCache.getMarkChessCount()), this.node.getChildByName("Bg").getComponent("TouchPanel").setCallbackFunc(this.onTouchEvent, this);
				},
				setGameChess: function setGameChess(e, t) {
					this._GameChess = e, this._ChessPos = t, null != this._GameChess.node && this._GameChess.showChessFlagNode();
				},
				hideChessFlagNode: function hideChessFlagNode() {
					null != this._GameChess.node && this._GameChess.hideChessFlagNode();
				},
				showGameChessFlag: function showGameChessFlag(e) {
					null != this._GameChess.node && (this._GameChess.showChessFlag(e), cc.Websocket.Send(cc.ClientProtocol.AddChessMarker(this._ChessPos[0], this._ChessPos[1], e)));
				},
				hideGameChessFlag: function hideGameChessFlag() {
					null != this._GameChess.node && (this._GameChess.hideChessFlag(), cc.Websocket.Send(cc.ClientProtocol.DelChessMarker(this._ChessPos[0], this._ChessPos[1])));
				},
				onTouchEvent: function onTouchEvent() {
					this.node && (this.hideChessFlagNode(), this.node.destroy());
				}
			}), cc._RF.pop();
		}, {}],
		GameGuide: [function (e, t) {
			"use strict";

			cc._RF.push(t, "056800B9fZLgrKL0/gDUBAn", "GameGuide"), cc.Class({
				extends: cc.Component,
				properties: {
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					var e = this;
					this.node.getChildByName("BtnCancel").on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), e.node.destroy();
					}), this.node.getChildByName("BtnOk").on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), cc.AppUtil.addPrefabToNode("GameHelp", e.node);
					});
				},
				onDisable: function onDisable() {
					0 == cc.GameRoomType && cc.AppUtil.addPrefabToNode("GameLayer");
				}
			}), cc._RF.pop();
		}, {}],
		GameHelp: [function (e, t) {
			"use strict";

			cc._RF.push(t, "b73701CarFAEag8sSfve/V8", "GameHelp"), cc.Class({
				extends: cc.Component,
				properties: {
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					var e = this;
					this.node.getChildByName("BtnClose").on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), e.node.destroy();
					});
					var t = this.node.getChildByName("BtnPrinvacy");
					"GameGuide" != this.node.parent.name && (2 == cc.PlatformType || 4 == cc.PlatformType || 6 == cc.PlatformType ? t.active = !0 : cc.AppUtil.addPrefabToNode("GameScore", this.node, cc.v2(0, -250), .8)), t.on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), cc.AppUtil.addPrefabToNode("ServiceProtocol");
					});
					var a = this.node.getChildByName("BtnOk");
					a.active = "GameGuide" == this.node.parent.name, a.on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), e.node.parent.destroy();
					});
				},
				onEnable: function onEnable() {
					"game" == cc.director.getScene().name && cc.AppUtil.showWXGameBannerAd(!0);
				},
				onDisable: function onDisable() {
					"game" == cc.director.getScene().name && cc.AppUtil.showWXGameBannerAd(!1);
				}
			}), cc._RF.pop();
		}, {}],
		GameIconBtn: [function (e, t) {
			"use strict";

			cc._RF.push(t, "f003676FCxMDZtPBvNwM3C/", "GameIconBtn"), cc.Class({
				extends: cc.Component,
				properties: {
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					},
					game_icon_images: {
						default: [],
						type: cc.SpriteFrame
					}
				},
				ctor: function ctor() {
					this._TitleArr = ["\u66F4\u591A\u7CBE\u5F69", "\u684C\u9762\u56FE\u6807"];
				},
				showIconButton: function showIconButton(e) {
					var t = this.node.getChildByName("Button"),
						a = cc.rotateBy(.1, 10),
						s = cc.rotateBy(.2, -20),
						c = cc.delayTime(.3);
					t.runAction(cc.repeatForever(cc.sequence(a, s, a, c))), t.on("click", function (e) {
						0 == parseInt(e.node.parent.name) ? cc.AppUtil.showGameNavigateAd() : cc.AppUtil.createDesktopIcon();
					});
					var i = t.getChildByName("Background");
					i.getComponent(cc.Sprite).spriteFrame = this.game_icon_images[e], i.getChildByName("Label").getComponent(cc.Label).string = this._TitleArr[e];
				}
			}), cc._RF.pop();
		}, {}],
		GameLayer: [function (e, t) {
			"use strict";

			cc._RF.push(t, "dee290sBclPsrcDjSgw2m9R", "GameLayer"), cc.Class({
				extends: cc.Component,
				properties: {
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					},
					bgMusic: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					this.initGameUI(), this.initGameBullet(), this.initGameButton(), 4 == cc.PlatformType && (this.initOPPOButton(0), this.initOPPOButton(1)), cc.audioEngine.setMusicVolume(.5), cc.audioEngine.setEffectsVolume(.5), cc.GameCache.getSettingOptionValue(0) && (cc.audioEngine.isMusicPlaying() || cc.audioEngine.playMusic(this.bgMusic, !1)), cc.director.preloadScene("lobby");
				},
				start: function start() {
					cc.AppUtil.isFullScreen() && (this._Title_node.getComponent(cc.Widget).top += 1.5 * cc.FringeHeight, this._BtnLayout.paddingTop = this._BtnLayout.paddingBottom = 35, this._BtnLayout.spacingY = 25);
				},
				onEnable: function onEnable() {
					cc.AppUtil.showWXCustomAd(!0), cc.AppUtil.showWXGameClubBtn(!0), cc.Websocket.Send(cc.ClientProtocol.GetOnlineNumber());
				},
				onDisable: function onDisable() {
					cc.AppUtil.showWXGameClubBtn(!1), cc.audioEngine.stopMusic();
				},
				initGameUI: function initGameUI() {
					if (1 == cc.PlatformType || 2 == cc.PlatformType && 1 == cc.GameTrick || 0 == cc.PlatformType && cc.sys.OS_IOS === cc.sys.os) for (var e = 1; e <= 2; e++) {
						cc.AppUtil.addPrefabToNode("BtnMoreGame_" + e, this.node);
					}

					if (this._Title_node = this.node.getChildByName("Title"), this._OnlineText = this._Title_node.getChildByName("Text").getComponent(cc.Label), 4 == cc.PlatformType) {
						var t = this;
						this._Title_node.getChildByName("GameTip").active = !0;

						var a = this._Title_node.getChildByName("BtnGamble");

						a.active = !0, a.on("click", function () {
							cc.AppUtil.playAudioEffect(t.buttonAudio), cc.AppUtil.addPrefabToNode("NotGambleDlg", t.node, null, null, null, function (e) {
								e.getChildByName("GambleDlgBg").getChildByName("BtnOk").on("click", function () {
									cc.AppUtil.playAudioEffect(t.buttonAudio), e.destroy();
								});
							});
						});
					}
				},
				initGameBullet: function initGameBullet() {
					var e = this.node.getChildByName("Title").getChildByName("Bullet"),
						t = cc.moveBy(.3, 10, 10),
						a = cc.moveBy(.5, -20, -30),
						s = cc.moveBy(.4, -10, -20),
						c = cc.moveBy(.6, 20, 40);
					e.runAction(cc.repeatForever(cc.sequence(t, a, s, c)));
				},
				initGameButton: function initGameButton() {
					var e = this;
					this._BtnLayout = this.node.getChildByName("Bg").getComponent(cc.Layout);

					for (var t = this._BtnLayout.node.getComponentsInChildren(cc.Button), a = 0; a < t.length; a++) {
						t[a].node.on("click", function (t) {
							cc.GameViewMode = null, cc.GameRoomType = 1 + parseInt(t.node.name.slice(7)), cc.AppUtil.playAudioEffect(e.buttonAudio), cc.director.loadScene("lobby");
						});
					}
				},
				initOPPOButton: function initOPPOButton(e) {
					cc.AppUtil.addPrefabToNode("GameIconBtn", this.node, cc.v2([-250, 250][e], 80 - .5 * cc.winSize.height), .8, null, function (t) {
						t.name = e.toString(), t.getComponent(cc.Component).showIconButton(e);
					});
				},
				updateOnlineNumber: function updateOnlineNumber(e) {
					this._OnlineText.string = cc.js.formatStr("\u5F53\u524D\u5728\u7EBF\u4EBA\u6570\uFF1A%d", e);
				}
			}), cc._RF.pop();
		}, {}],
		GameLobbyEx: [function (e, t) {
			"use strict";

			cc._RF.push(t, "f28abq6DVlOD4Q6LOfa90Lq", "GameLobbyEx"), cc.Class({
				extends: cc.Component,
				properties: {
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					this.initGameUI();
				},
				initGameUI: function initGameUI() {
					var e = this;
					this.node.getChildByName("BtnQuickGame").on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), cc.GameRoomType >= 6 && cc.GameRoomType <= 8 && !cc.GameCache.checkHasHeadDecorate() ? cc.AppUtil.showToast("\u8BF7\u5728\u9053\u5177\u5546\u57CE\u4F69\u6234\u5934\u50CF\u88C5\u9970\u7269\uFF01") : cc.Websocket.Send(cc.ClientProtocol.QuickEnterGame()) && cc.AppUtil.addLoading();
					});
				},
				initGameTables: function initGameTables() { },
				updateGameTable: function updateGameTable() { },
				showGameTables: function showGameTables() { }
			}), cc._RF.pop();
		}, {}],
		GameLobby: [function (e, t) {
			"use strict";

			cc._RF.push(t, "9ab460EFfFCk4t3Scrb01Ea", "GameLobby"), cc.Class({
				extends: cc.Component,
				properties: {
					game_table: {
						default: null,
						type: cc.Prefab
					}
				},
				ctor: function ctor() {
					this._GameTables = [];
				},
				onLoad: function onLoad() {
					this.initGameUI();
				},
				initGameUI: function initGameUI() {
					this._ScrollView = this.node.getChildByName("ScrollView").getComponent(cc.ScrollView);

					var e = this._ScrollView.node.getComponent(cc.Widget);

					cc.AppUtil.isFullScreen() && (e.top += cc.FringeHeight), e.updateAlignment();

					var t = this._ScrollView.node.getChildByName("view");

					t.height = this._ScrollView.node.height, t.y = this._ScrollView.node.height;
				},
				showGameTables: function showGameTables() {
					this._ScrollView.node.opacity = 0, this._ScrollView.node.runAction(cc.fadeIn(.3));
				},
				update: function update() {
					this._GameTableStates && this.createGameTable();
				},
				initGameTables: function initGameTables(e) {
					if (this._GameTables.empty()) {
						this._GameTableStates = e;

						for (var t = 0; t < 25; t++) {
							this.createGameTable();
						}

						this._ScrollView.content.height = e.pool.length / 4 * 180 + 20;
					} else for (t = 0; t < e.pool.length; t++) {
						this.updateGameTable(t + 1, e.pool[t].value);
					}
				},
				createGameTable: function createGameTable() {
					if (this._GameTables.length >= this._GameTableStates.pool.length) this._GameTableStates = null; else {
						var e = this._GameTables.length,
							t = cc.instantiate(this.game_table);

						this._ScrollView.content.addChild(t);

						var a = t.getComponent("GameTable");
						a.initGameTable(e), a.updateGameTable(this._GameTableStates.pool[e].value), this._GameTables.push(a);
					}
				},
				updateGameTable: function updateGameTable(e, t) {
					e <= this._GameTables.length ? this._GameTables[e - 1].updateGameTable(t) : this._GameTableStates.pool[e - 1].value = t;
				}
			}), cc._RF.pop();
		}, {}],
		GameProtocol_Client: [function (e, t) {
			"use strict";

			cc._RF.push(t, "7f3115GXGZE4buIyMlxHZ91", "GameProtocol_Client");

			var a = e("ProtocolBase"),
				s = e("BitStream"),
				c = cc.Class({
					extends: a.Vector,
					ctor: function ctor() {
						this.create(function () {
							return new a.Char();
						});
					}
				}),
				i = cc.Class({
					extends: a.Vector,
					ctor: function ctor() {
						this.create(function () {
							return new c();
						});
					}
				}),
				n = function n() { };

			n.prototype = {
				write: function write(e) {
					e.writeByte(this.clothes), e.writeByte(this.face), e.writeByte(this.head);
				},
				read: function read(e) {
					this.clothes = e.readByte(), this.face = e.readByte(), this.head = e.readByte();
				}
			};

			var o = function o() {
				this.actor = new n();
			};

			o.prototype = {
				write: function write(e) {
					e.writeByte(this.seat), e.writeString(this.name), this.actor.write(e), e.writeInt(this.score), e.writeByte(this.state), 1 == this.robot ? this.robot = 100 + this.decorate : this.robot = this.decorate, e.writeByte(this.robot);
				},
				read: function read(e) {
					this.seat = e.readByte(), this.name = e.readString(), this.actor.read(e), this.score = e.readInt(), this.state = e.readByte(), this.robot = e.readByte(), this.robot >= 100 ? (this.decorate = this.robot - 100, this.robot = 1) : (this.decorate = this.robot, this.robot = 0);
				}
			};

			var r = cc.Class({
				extends: a.Vector,
				ctor: function ctor() {
					this.create(function () {
						return new o();
					});
				}
			}),
				l = function l() {
					this.actor = new n();
				};

			l.prototype = {
				write: function write(e) {
					e.writeString(this.name), this.actor.write(e), e.writeInt(this.score);
				},
				read: function read(e) {
					this.name = e.readString(), this.actor.read(e), this.score = e.readInt();
				}
			};

			var h = cc.Class({
				extends: a.Vector,
				ctor: function ctor() {
					this.create(function () {
						return new l();
					});
				}
			}),
				C = function C() {
					this.players = new r(), this.chess_data_arr = new i(), this.steps = new i();
				};

			C.prototype = {
				write: function write(e) {
					e.writeByte(this.seat), e.writeByte(this.turn), e.writeByte(this.game_mode), this.players.write(e), this.chess_data_arr.write(e), this.steps.write(e), e.writeByte(this.battle);
				},
				read: function read(e) {
					this.seat = e.readByte(), this.turn = e.readByte(), this.game_mode = e.readByte(), this.players.read(e), this.chess_data_arr.read(e), this.steps.read(e), this.battle = e.readByte();
				},
				save: function save() {
					var e = new s();
					return this.write(e), e.finish();
				},
				load: function load(e) {
					var t = new s(e);
					return this.read(t), this;
				}
			};

			var d = function d() {
				this.actor = new n();
			};

			d.prototype = {
				write: function write(e) {
					e.writeString(this.name), this.actor.write(e), e.writeByte(this.score), e.writeInt(this.total_score), e.writeByte(this.score_tag);
				},
				read: function read(e) {
					this.name = e.readString(), this.actor.read(e), this.score = e.readByte(), this.total_score = e.readInt(), this.score_tag = e.readByte();
				}
			};
			var u = cc.Class({
				extends: a.Vector,
				ctor: function ctor() {
					this.create(function () {
						return new d();
					});
				}
			}),
				m = cc.Class({
					extends: a.Protocol,
					properties: {
						RequestID_Register: 159,				// 注册请求ID
						RequestID_Login: 68,					// 登录请求ID
						RequestID_GetOnlineNumber: 61,			// 获取在线人数请求ID
						RequestID_CheckStringValid: 158,		// 检查字符串是否有效的请求ID
						RequestID_CheckStringValidEx: 227,		// 扩展检查字符串是否有效的请求ID
						RequestID_ChangeNickName: 79,			// 更改昵称请求ID
						RequestID_ChangeActor: 127,				// 更改角色请求ID
						RequestID_EnterRoom: 240,				// 进入房间请求ID
						RequestID_LeaveRoom: 175,				// 离开房间请求ID
						RequestID_EnterGame: 41,				// 进入游戏请求ID
						RequestID_EnterGameEx: 80,				// 扩展进入游戏请求ID
						RequestID_QuickEnterGame: 6,			// 快速进入游戏请求ID
						RequestID_GameWatch: 64,				// 观看游戏请求ID
						RequestID_LeaveGame: 204,				// 离开游戏请求ID
						RequestID_GameReady: 252,				// 游戏准备请求ID
						RequestID_ExchangeSeat: 35,				// 交换座位请求ID
						RequestID_GameEgg: 58,					// 游戏彩蛋请求ID
						RequestID_GameBattle: 88,				// 游戏战斗请求ID
						RequestID_SwapChess: 144,				// 交换棋子请求ID
						RequestID_AddChessMarker: 212,			// 添加棋子标记请求ID
						RequestID_DelChessMarker: 178,			// 删除棋子标记请求ID
						RequestID_MoveChess: 162,				// 移动棋子请求ID
						RequestID_SkipChess: 172,				// 跳过棋子请求ID
						RequestID_Surrender: 237,				// 投降请求ID
						RequestID_RequestPeace: 202,			// 请求和平请求ID
						RequestID_RequestPeaceRet: 107,			// 和平请求返回ID
						RequestID_GameChat: 3,					// 游戏聊天请求ID
						RequestID_GameChatText: 52,				// 游戏文本聊天请求ID
						RequestID_NotifyGameMsg: 39,			// 通知游戏消息请求ID
						RequestID_GetRankList: 133,				// 获取排行榜请求ID
						RequestID_GetMineRank: 216,				// 获取我的排名请求ID
						RequestID_SetVideoEvent: 115,			// 设置视频事件请求ID
						RequestID_ClearGameScore: 248,			// 清除游戏分数请求ID
						RequestID_SaveGameData: 60,				// 保存游戏数据请求ID
						RequestID_SetShareGameData: 146,		// 设置分享游戏数据请求ID
						RequestID_GetShareGameData: 254,		// 获取分享游戏数据请求ID
						CallbackID_OnRegisterSuccess: 43,		// 注册成功回调ID
						CallbackID_OnLoginSuccess: 0,			// 登录成功回调ID
						CallbackID_OnGameData: 22,				// 游戏数据回调ID
						CallbackID_OnChessMarkerData: 118,		// 棋子标记数据回调ID
						CallbackID_OnPlayGameReview: 120,		// 播放游戏回顾回调ID
						CallbackID_OnGetOnlineNumber: 142,		// 获取在线人数回调ID
						CallbackID_OnCheckStringValid: 87,		// 检查字符串是否有效回调ID
						CallbackID_OnEnterRoomSuccess: 196,		// 成功进入房间回调ID
						CallbackID_OnTableStateChanged: 145,	// 桌子状态改变回调ID
						CallbackID_OnWatchGameSuccess: 236,		// 观看游戏成功回调ID
						CallbackID_OnEnterGameSuccess: 235,		// 成功进入游戏回调ID
						CallbackID_OnPlayerEnterGame: 23,		// 玩家进入游戏回调ID
						CallbackID_OnPlayerLeaveGame: 66,		// 玩家离开游戏回调ID
						CallbackID_OnPlayerExchangeSeat: 137,	// 玩家交换座位回调ID
						CallbackID_OnPlayerStateChanged: 191,	// 玩家状态改变回调ID
						CallbackID_OnAddGameWatcher: 47,		// 添加游戏观察者回调ID
						CallbackID_OnDelGameWatcher: 143,		// 删除游戏观察者回调ID
						CallbackID_OnUpdateGameScore: 13,		// 更新游戏分数回调ID
						CallbackID_OnGameChat: 48,				// 游戏聊天回调ID
						CallbackID_OnGameChatText: 123,			// 游戏文本聊天回调ID
						CallbackID_OnGameEgg: 117,				// 游戏彩蛋回调ID
						CallbackID_OnGameStart: 138,			// 游戏开始回调ID
						CallbackID_OnGameBattle: 132,			// 游戏战斗回调ID
						CallbackID_OnSwapChessFailed: 104,		// 交换棋子失败回调ID
						CallbackID_OnGameStartReal: 119,		// 真实游戏开始回调ID
						CallbackID_OnGameTurn: 5,				// 游戏轮回调ID
						CallbackID_OnRequestPeace: 101,			// 请求和平回调ID
						CallbackID_OnRejectPeace: 249,			// 拒绝和平回调ID
						CallbackID_OnUpdateSkipCount: 129,		// 更新跳过计数回调ID
						CallbackID_OnGameAction: 91,			// 游戏动作回调ID
						CallbackID_OnGameOver: 160,				// 游戏结束回调ID
						CallbackID_OnGetRankList: 214,			// 获取排行榜回调ID
						CallbackID_OnGetMineRank: 21,			// 获取我的排名回调ID
						CallbackID_OnSaveGameData: 97,			// 保存游戏数据回调ID
						CallbackID_OnSysMsg: 226,				// 系统消息回调ID
						CallbackID_OnErrMsg: 108,				// 错误消息回调ID
						CallbackID_OnKickGameMsg: 75			// 踢出游戏消息回调ID
					},
					Register: function Register(e, t, a) {
						var c = new s();
						return c.writeByte(this.RequestID_Register), c.writeString(e), c.writeString(t), c.writeByte(a), c;
					},
					Login: function Login(e) {
						var t = new s();
						return t.writeByte(this.RequestID_Login), t.writeString(e), t;
					},
					GetOnlineNumber: function GetOnlineNumber() {
						var e = new s();
						return e.writeByte(this.RequestID_GetOnlineNumber), e;
					},
					CheckStringValid: function CheckStringValid(e) {
						var t = new s();
						return t.writeByte(this.RequestID_CheckStringValid), t.writeString(e), t;
					},
					CheckStringValidEx: function CheckStringValidEx(e, t) {
						var a = new s();
						return a.writeByte(this.RequestID_CheckStringValidEx), a.writeString(e), a.writeString(t), a;
					},
					ChangeNickName: function ChangeNickName(e) {
						var t = new s();
						return t.writeByte(this.RequestID_ChangeNickName), t.writeString(e), t;
					},
					ChangeActor: function ChangeActor(e, t, a) {
						var c = new s();
						return c.writeByte(this.RequestID_ChangeActor), c.writeByte(e), c.writeByte(t), c.writeByte(a), c;
					},
					EnterRoom: function EnterRoom(e) {
						var t = new s();
						return t.writeByte(this.RequestID_EnterRoom), t.writeByte(e), t;
					},
					LeaveRoom: function LeaveRoom() {
						var e = new s();
						return e.writeByte(this.RequestID_LeaveRoom), e;
					},
					EnterGame: function EnterGame(e, t) {
						var a = new s();
						return a.writeByte(this.RequestID_EnterGame), a.writeByte(e), a.writeByte(t), a;
					},
					EnterGameEx: function EnterGameEx(e, t, a) {
						var c = new s();
						return c.writeByte(this.RequestID_EnterGameEx), c.writeByte(e), c.writeByte(t), c.writeByte(a), c;
					},
					QuickEnterGame: function QuickEnterGame(e) {
						var t = new s();
						return t.writeByte(this.RequestID_QuickEnterGame), t.writeByte(e), t;
					},
					GameWatch: function GameWatch(e, t, a) {
						var c = new s();
						return c.writeByte(this.RequestID_GameWatch), c.writeByte(e), c.writeByte(t), c.writeInt(a), c;
					},
					LeaveGame: function LeaveGame() {
						var e = new s();
						return e.writeByte(this.RequestID_LeaveGame), e;
					},
					GameReady: function GameReady(e, t, a) {
						var c = new s();
						return c.writeByte(this.RequestID_GameReady), e.write(c), c.writeByte(t), c.writeByte(a), c;
					},
					ExchangeSeat: function ExchangeSeat() {
						var e = new s();
						return e.writeByte(this.RequestID_ExchangeSeat), e;
					},
					GameEgg: function GameEgg(e) {
						var t = new s();
						return t.writeByte(this.RequestID_GameEgg), t.writeByte(e), t;
					},
					GameBattle: function GameBattle() {
						var e = new s();
						return e.writeByte(this.RequestID_GameBattle), e;
					},
					SwapChess: function SwapChess(e, t) {
						var a = new s();
						return a.writeByte(this.RequestID_SwapChess), a.writeByte(e), a.writeByte(t), a;
					},
					AddChessMarker: function AddChessMarker(e, t, a) {
						var c = new s();
						return c.writeByte(this.RequestID_AddChessMarker), c.writeByte(e), c.writeByte(t), c.writeByte(a), c;
					},
					DelChessMarker: function DelChessMarker(e, t) {
						var a = new s();
						return a.writeByte(this.RequestID_DelChessMarker), a.writeByte(e), a.writeByte(t), a;
					},
					MoveChess: function MoveChess(e, t, a) {
						var c = new s();
						return c.writeByte(this.RequestID_MoveChess), e.write(c), t.write(c), c.writeByte(a), c;
					},
					SkipChess: function SkipChess() {
						var e = new s();
						return e.writeByte(this.RequestID_SkipChess), e;
					},
					Surrender: function Surrender() {
						var e = new s();
						return e.writeByte(this.RequestID_Surrender), e;
					},
					RequestPeace: function RequestPeace() {
						var e = new s();
						return e.writeByte(this.RequestID_RequestPeace), e;
					},
					RequestPeaceRet: function RequestPeaceRet(e) {
						var t = new s();
						return t.writeByte(this.RequestID_RequestPeaceRet), t.writeByte(e), t;
					},
					GameChat: function GameChat(e) {
						var t = new s();
						return t.writeByte(this.RequestID_GameChat), t.writeByte(e), t;
					},
					GameChatText: function GameChatText(e) {
						var t = new s();
						return t.writeByte(this.RequestID_GameChatText), t.writeString(e), t;
					},
					NotifyGameMsg: function NotifyGameMsg(e) {
						var t = new s();
						return t.writeByte(this.RequestID_NotifyGameMsg), t.writeString(e), t;
					},
					GetRankList: function GetRankList() {
						var e = new s();
						return e.writeByte(this.RequestID_GetRankList), e;
					},
					GetMineRank: function GetMineRank() {
						var e = new s();
						return e.writeByte(this.RequestID_GetMineRank), e;
					},
					SetVideoEvent: function SetVideoEvent() {
						var e = new s();
						return e.writeByte(this.RequestID_SetVideoEvent), e;
					},
					ClearGameScore: function ClearGameScore() {
						var e = new s();
						return e.writeByte(this.RequestID_ClearGameScore), e;
					},
					SaveGameData: function SaveGameData() {
						var e = new s();
						return e.writeByte(this.RequestID_SaveGameData), e;
					},
					SetShareGameData: function SetShareGameData(e, t) {
						var a = new s();
						return a.writeByte(this.RequestID_SetShareGameData), a.writeString(e), t.write(a), a;
					},
					GetShareGameData: function GetShareGameData(e) {
						var t = new s();
						return t.writeByte(this.RequestID_GetShareGameData), t.writeString(e), t;
					},
					parse: function parse(e) {
						var t,
							a = new s(e),
							l = a.readUByte();

						if (l == this.CallbackID_OnRegisterSuccess) {
							var d = a.readString();
							return this.HandlerCallback(this.CallbackID_OnRegisterSuccess, [d]), !0;
						}

						if (l == this.CallbackID_OnLoginSuccess) {
							var m = a.readString(),
								p = new n();
							p.read(a);

							var _ = a.readInt(),
								f = a.readByte(),
								g = a.readByte(),
								G = a.readUInt();
							console.log("OnLoginSuccess", m, p, _, f, g, G);
							return this.HandlerCallback(this.CallbackID_OnLoginSuccess, [m, p, _, f, g, G]), !0;
						}

						if (l == this.CallbackID_OnGameData) return (t = new C()).read(a), this.HandlerCallback(this.CallbackID_OnGameData, [t]), !0;
						if (l == this.CallbackID_OnChessMarkerData) return (y = new c()).read(a), this.HandlerCallback(this.CallbackID_OnChessMarkerData, [y]), !0;
						if (l == this.CallbackID_OnPlayGameReview) return (t = new C()).read(a), this.HandlerCallback(this.CallbackID_OnPlayGameReview, [t]), !0;

						if (l == this.CallbackID_OnGetOnlineNumber) {
							var y = a.readInt();
							return this.HandlerCallback(this.CallbackID_OnGetOnlineNumber, [y]), !0;
						}

						if (l == this.CallbackID_OnCheckStringValid) {
							var S = a.readByte();
							return this.HandlerCallback(this.CallbackID_OnCheckStringValid, [S]), !0;
						}

						if (l == this.CallbackID_OnEnterRoomSuccess) {
							var v = new c();
							return v.read(a), this.HandlerCallback(this.CallbackID_OnEnterRoomSuccess, [v]), !0;
						}

						if (l == this.CallbackID_OnTableStateChanged) {
							var A = a.readUByte(),
								b = a.readByte();
							return this.HandlerCallback(this.CallbackID_OnTableStateChanged, [A, b]), !0;
						}

						if (l == this.CallbackID_OnWatchGameSuccess) return this.HandlerCallback(this.CallbackID_OnWatchGameSuccess, []), !0;

						if (l == this.CallbackID_OnEnterGameSuccess) {
							var B = a.readByte(),
								T = new r();
							return T.read(a), this.HandlerCallback(this.CallbackID_OnEnterGameSuccess, [B, T]), !0;
						}

						if (l == this.CallbackID_OnPlayerEnterGame) {
							var k = new o();
							return k.read(a), this.HandlerCallback(this.CallbackID_OnPlayerEnterGame, [k]), !0;
						}

						if (l == this.CallbackID_OnPlayerLeaveGame) return B = a.readByte(), this.HandlerCallback(this.CallbackID_OnPlayerLeaveGame, [B]), !0;

						if (l == this.CallbackID_OnPlayerExchangeSeat) {
							var w = a.readByte(),
								P = a.readByte();
							return this.HandlerCallback(this.CallbackID_OnPlayerExchangeSeat, [w, P]), !0;
						}

						if (l == this.CallbackID_OnPlayerStateChanged) return B = a.readByte(), b = a.readByte(), this.HandlerCallback(this.CallbackID_OnPlayerStateChanged, [B, b]), !0;
						if (l == this.CallbackID_OnAddGameWatcher) return m = a.readString(), this.HandlerCallback(this.CallbackID_OnAddGameWatcher, [m]), !0;
						if (l == this.CallbackID_OnDelGameWatcher) return m = a.readString(), this.HandlerCallback(this.CallbackID_OnDelGameWatcher, [m]), !0;
						if (l == this.CallbackID_OnUpdateGameScore) return _ = a.readByte(), this.HandlerCallback(this.CallbackID_OnUpdateGameScore, [_]), !0;

						if (l == this.CallbackID_OnGameChat) {
							B = a.readByte();
							var R = a.readByte();
							return this.HandlerCallback(this.CallbackID_OnGameChat, [B, R]), !0;
						}

						if (l == this.CallbackID_OnGameChatText) {
							B = a.readByte();
							var N = a.readString();
							return this.HandlerCallback(this.CallbackID_OnGameChatText, [B, N]), !0;
						}

						if (l == this.CallbackID_OnGameEgg) return B = a.readByte(), this.HandlerCallback(this.CallbackID_OnGameEgg, [B]), !0;

						if (l == this.CallbackID_OnGameStart) {
							var I = new i();
							return I.read(a), this.HandlerCallback(this.CallbackID_OnGameStart, [I]), !0;
						}

						if (l == this.CallbackID_OnGameBattle) {
							B = a.readByte();
							var D = new c();
							D.read(a);
							var F = a.readByte();
							return this.HandlerCallback(this.CallbackID_OnGameBattle, [B, D, F]), !0;
						}

						if (l == this.CallbackID_OnSwapChessFailed) {
							var M = a.readByte(),
								E = a.readByte();
							return this.HandlerCallback(this.CallbackID_OnSwapChessFailed, [M, E]), !0;
						}

						if (l == this.CallbackID_OnGameStartReal) return this.HandlerCallback(this.CallbackID_OnGameStartReal, []), !0;
						if (l == this.CallbackID_OnGameTurn) return B = a.readByte(), this.HandlerCallback(this.CallbackID_OnGameTurn, [B]), !0;
						if (l == this.CallbackID_OnRequestPeace) return m = a.readString(), this.HandlerCallback(this.CallbackID_OnRequestPeace, [m]), !0;
						if (l == this.CallbackID_OnRejectPeace) return m = a.readString(), this.HandlerCallback(this.CallbackID_OnRejectPeace, [m]), !0;
						if (l == this.CallbackID_OnUpdateSkipCount) return y = a.readByte(), this.HandlerCallback(this.CallbackID_OnUpdateSkipCount, [y]), !0;

						if (l == this.CallbackID_OnGameAction) {
							var O = new c();
							return O.read(a), this.HandlerCallback(this.CallbackID_OnGameAction, [O]), !0;
						}

						if (l == this.CallbackID_OnGameOver) {
							var x = new u();
							return x.read(a), this.HandlerCallback(this.CallbackID_OnGameOver, [x]), !0;
						}

						if (l == this.CallbackID_OnGetRankList) {
							var L = new h();
							return L.read(a), this.HandlerCallback(this.CallbackID_OnGetRankList, [L]), !0;
						}

						if (l == this.CallbackID_OnGetMineRank) {
							var U = a.readInt();
							return this.HandlerCallback(this.CallbackID_OnGetMineRank, [U]), !0;
						}

						if (l == this.CallbackID_OnSaveGameData) {
							var H = new C();
							H.read(a);
							var W = a.readByte();
							return this.HandlerCallback(this.CallbackID_OnSaveGameData, [H, W]), !0;
						}

						return l == this.CallbackID_OnSysMsg ? (N = a.readString(), this.HandlerCallback(this.CallbackID_OnSysMsg, [N]), !0) : l == this.CallbackID_OnErrMsg ? (N = a.readString(), this.HandlerCallback(this.CallbackID_OnErrMsg, [N]), !0) : l == this.CallbackID_OnKickGameMsg && (N = a.readString(), this.HandlerCallback(this.CallbackID_OnKickGameMsg, [N]), !0);
					}
				});
			t.exports.ClientProtocol = m, t.exports.GameData = C, cc._RF.pop();
		}, {
			BitStream: "BitStream",
			ProtocolBase: "ProtocolBase"
		}],
		GameRank: [function (e, t) {
			"use strict";

			cc._RF.push(t, "e4c8e96SAJC47+cfiH4uZLm", "GameRank"), cc.Class({
				extends: cc.Component,
				properties: {
					ranking_images: {
						default: [],
						type: cc.SpriteFrame
					},
					grade_images: {
						default: [],
						type: cc.SpriteFrame
					},
					clothes_images: {
						default: [],
						type: cc.SpriteFrame
					},
					face_images: {
						default: [],
						type: cc.SpriteFrame
					},
					head_images: {
						default: [],
						type: cc.SpriteFrame
					},
					rankItemPrefab: {
						default: null,
						type: cc.Prefab
					},
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					this._ScrollViewContent = this.node.getChildByName("ScrollView").getChildByName("view").getChildByName("content"), this.initGameUI(), this.getGameRankData();
				},
				update: function update() {
					this._GameRankDatas && this.showGameRankDataEx();
				},
				onEnable: function onEnable() {
					4 == cc.PlatformType && cc.AppUtil.showOriginGameAd(!1, !1), cc.AppUtil.showWXGameBannerAd(!0);
				},
				onDisable: function onDisable() {
					cc.AppUtil.showWXGameBannerAd(!1);
				},
				initGameUI: function initGameUI() {
					var e = this;
					this.node.getChildByName("BtnClose").on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), e.node.destroy();
					}), this._BtnMineRank = this.node.getChildByName("BtnMineRank"), this._BtnMineRank.on("click", function () {
						cc.AppUtil.showWXVideoAd(function () {
							e.node && cc.Websocket.Send(cc.ClientProtocol.GetMineRank()) && cc.AppUtil.addLoading();
						});
					});
				},
				getGameRankData: function getGameRankData() {
					this._GameRankIndex = 0, this._GameRankDatas = null, cc.Websocket.Send(cc.ClientProtocol.GetRankList()) && cc.AppUtil.addLoading();
				},
				showGameRankDataItem: function showGameRankDataItem(e, t, a) {
					a.getChildByName("Ranking_Sprite").active = t < 3, t < 3 && (a.getChildByName("Ranking_Sprite").getComponent(cc.Sprite).spriteFrame = this.ranking_images[t]);

					for (var s = [this.clothes_images, this.head_images, this.face_images], c = [e.actor.clothes, e.actor.head, e.actor.face], i = a.getChildByName("Head").getChildByName("Actor"), n = 0; n < 3; n++) {
						i.getChildByName(["Clothes", "Head", "Face"][n]).getComponent(cc.Sprite).spriteFrame = c[n] > 0 ? s[n][c[n] - 1] : null;
					}

					a.getChildByName("Ranking_Text").active = t >= 3, a.getChildByName("Ranking_Text").getComponent(cc.Label).string = (t + 1).toString(), a.getChildByName("Name").getComponent(cc.Label).string = e.name;
					var o = cc.GameCache.getGameScoreTitle(e.score);
					a.getChildByName("Grade").getComponent(cc.Sprite).spriteFrame = this.grade_images[o[1] - 1], a.getChildByName("Score").getComponent(cc.Label).string = e.score.toString();
					var r = a.getChildByName("Title");
					r.getComponent(cc.Label).string = cc.js.formatStr("\u3010%s\u3011", o[0]), r.color = o[3];
				},
				showGameRankDataEx: function showGameRankDataEx() {
					var e = Math.min(100, this._GameRankDatas.pool.length);
					if (this._GameRankIndex >= e) return this._GameRankDatas = null, void this.showSlideFingerTip();
					var t = cc.instantiate(this.rankItemPrefab);
					this._ScrollViewContent && this._ScrollViewContent.addChild(t), t.y = -40 - 80 * this._GameRankIndex, this.showGameRankDataItem(this._GameRankDatas.pool[this._GameRankIndex], this._GameRankIndex, t), this._GameRankIndex++;
				},
				showGameRankData: function showGameRankData(e) {
					this._GameRankDatas = e;

					for (var t = Math.min(10, e.pool.length), a = 0; a < t; a++) {
						this.showGameRankDataEx();
					}

					this._ScrollViewContent.setContentSize(500, 80 * e.pool.length);
				},
				showMineGameRank: function showMineGameRank(e) {
					this._BtnMineRank.destroy();

					var t = cc.instantiate(this.rankItemPrefab);
					this.node.addChild(t), t.setPosition(0, -300);
					var a = {
						name: cc.GameCache.getName(),
						actor: cc.GameCache.getActor(),
						score: cc.GameCache.getScore()
					};
					this.showGameRankDataItem(a, e - 1, t);
				},
				showSlideFingerTip: function showSlideFingerTip() {
					cc.AppUtil.addPrefabToNode("HandTip", this.node, null, 1.2, 3.5, function (e) {
						e.getComponent(cc.Animation).play("HandTip_2");
					});
				}
			}), cc._RF.pop();
		}, {}],
		GameReport: [function (e, t) {
			"use strict";

			cc._RF.push(t, "b815brFH8VGDqIPaKcSz+0K", "GameReport"), cc.Class({
				extends: cc.Component,
				properties: {
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					var e = this;
					this.node.getChildByName("BtnClose").on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), e.node.destroy();
					});
				},
				onEnable: function onEnable() {
					cc.AppUtil.showWXGameInterstitialAd();
				},
				setGameReportData: function setGameReportData(e) {
					this.node.getChildByName("Number").getComponent(cc.Label).string = e.length.toString();

					for (var t = [0, 90, 30, 10, 20, 50, 100, 150, 200, 300, 500, 150, 10], a = 0, s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], c = 0; c < e.length; c++) {
						s[e[c]]++, a += t[e[c]];
					}

					for (c = 1; c <= 12; c++) {
						this.node.getChildByName("Label_" + c).getComponent(cc.Label).string = s[c].toString();
					}

					var i = Math.floor(a / 600);

					for (i < 1 && (i = 1), i > 5 && (i = 5), c = 1; c <= i; c++) {
						this.node.getChildByName("star_" + c).active = !0;
					}
				}
			}), cc._RF.pop();
		}, {}],
		GameResult: [function (e, t) {
			"use strict";

			cc._RF.push(t, "75a83qGsD5H45bD/6RFmPP5", "GameResult"), cc.Class({
				extends: cc.Component,
				properties: {
					grade_images: {
						default: [],
						type: cc.SpriteFrame
					},
					clothes_images: {
						default: [],
						type: cc.SpriteFrame
					},
					face_images: {
						default: [],
						type: cc.SpriteFrame
					},
					head_images: {
						default: [],
						type: cc.SpriteFrame
					},
					camp_images: {
						default: [],
						type: cc.SpriteFrame
					},
					resItemPrefab: {
						default: null,
						type: cc.Prefab
					},
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					var e = this;
					this.node.getChildByName("BtnClose").on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), e.node.destroy();
					}), this._BtnOk = this.node.getChildByName("BtnOk"), this._BtnOk.on("click", function (t) {
						cc.AppUtil.playAudioEffect(e.buttonAudio), cc.Websocket.Send(cc.ClientProtocol.SaveGameData()) && cc.AppUtil.addLoading(), t.interactable = !1, t.node.getChildByName("Background").getChildByName("save-flag").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
					}), this._BtnReport = this.node.getChildByName("BtnReport"), this._BtnReport.on("click", function () {
						cc.AppUtil.addPrefabToNode("GameReport", e.node, null, null, null, function (t) {
							t.getComponent(cc.Component).setGameReportData(e._EatChessArr), t.zIndex = cc.macro.MAX_ZINDEX;
						}), cc.AppUtil.playAudioEffect(e.buttonAudio);
					});
				},
				onEnable: function onEnable() {
					cc.AppUtil.showWXGameBannerAd(!0);
				},
				onDisable: function onDisable() {
					cc.AppUtil.showWXGameBannerAd(!1);
				},
				showGameResult: function showGameResult(e, t, a) {
					var s = [this.clothes_images, this.head_images, this.face_images];
					3 != cc.GameRoomType && 4 != cc.GameRoomType && 8 != cc.GameRoomType || 2 != t || (t = 1);

					for (var c = 0; c < e.pool.length; c++) {
						var i = e.pool[c],
							n = cc.instantiate(this.resItemPrefab);
						this.node.addChild(n), n.y = 120 - 100 * c, n.getChildByName("Index_Text").getComponent(cc.Label).string = (c + 1).toString();

						for (var o = [i.clothes, i.head, i.face], r = n.getChildByName("Head").getChildByName("Actor"), l = 0; l < 3; l++) {
							r.getChildByName(["Clothes", "Head", "Face"][l]).getComponent(cc.Sprite).spriteFrame = o[l] > 0 ? s[l][o[l] - 1] : null;
						}

						var h = i.score_tag >> 4 & 15,
							C = 15 & i.score_tag;
						t == c ? (1 == C && cc.GameCache.addDoubleScoreCount(-1), 1 == h && cc.GameCache.addProtectScoreCount(-1), r.parent.getChildByName("Camp").getComponent(cc.Sprite).spriteFrame = this.camp_images[1], n.getChildByName("Bg").color = cc.color(250, 200, 50, 255)) : r.parent.getChildByName("Camp").getComponent(cc.Sprite).spriteFrame = this.camp_images[Math.abs(c - t) % 2 == 0 ? 2 : 0];
						var d = i.score.toString();
						i.score > 0 && (d = "+" + d), n.getChildByName("Score").getComponent(cc.Label).string = d, n.getChildByName("DoubleFlag").active = 1 == C, n.getChildByName("ProtectFlag").active = 1 == h, n.getChildByName("Name").getComponent(cc.Label).string = i.name;
						var u = cc.GameCache.getGameScoreTitle(i.score + i.total_score),
							m = n.getChildByName("Title");
						m.getComponent(cc.Label).string = cc.js.formatStr("\u3010%s\u3011", u[0]), m.color = u[3], n.getChildByName("Grade").getComponent(cc.Sprite).spriteFrame = this.grade_images[u[1] - 1];
					}

					this._EatChessArr = a, null == a && (this._BtnOk.x = 0, this._BtnReport.active = !1), this.showHandFingerTip(this._BtnOk.getPosition());
				},
				onShowSavedFinished: function onShowSavedFinished() {
					cc.AppUtil.showWXGameInterstitialAd();
				},
				showGameSavedFlag: function showGameSavedFlag() {
					var e = this.node.getChildByName("GameSavedFlag");
					e.opacity = 0, e.active = !0, e.scale = 8, e.zIndex = cc.macro.MAX_ZINDEX;
					var t = cc.scaleTo(.3, 2),
						a = cc.fadeIn(.3),
						s = cc.sequence(cc.spawn(t, a), cc.callFunc(this.onShowSavedFinished, this));
					e.runAction(s);
				},
				setBtnVideoShare: function setBtnVideoShare(e) {
					var t = this,
						a = this.node.getChildByName("BtnVideo");
					a.on("click", function () {
						cc.AppUtil.playAudioEffect(t.buttonAudio), wx.showToast({
							title: "\u6B63\u5728\u51C6\u5907\u89C6\u9891\u53D1\u5E03\uFF01",
							icon: "none",
							duration: 3e3
						}), wx.shareAppMessage({
							channel: "video",
							title: "\u56DB\u56FD\u519B\u68CB",
							extra: {
								videoPath: e,
								videoTopics: ["\u56DB\u56FD\u519B\u68CB\u89C6\u9891"]
							},
							fail: function fail() {
								wx.showToast({
									title: "\u5206\u4EAB\u89C6\u9891\u5931\u8D25\uFF01",
									icon: "none",
									duration: 800
								});
							}
						});
					}), a.active = null != e, a.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.4, .8), cc.scaleTo(.1, .6))));
				},
				showHandFingerTip: function showHandFingerTip(e) {
					cc.AppUtil.addPrefabToNode("HandTip", this.node, cc.v2(e.x + 50, e.y - 30), null, 3.5, function (e) {
						e.getComponent(cc.Animation).play("HandTip_1");
					});
				}
			}), cc._RF.pop();
		}, {}],
		GameReviewCtrl: [function (e, t) {
			"use strict";

			cc._RF.push(t, "7fda0IsOc5GCIAvNYRdi03t", "GameReviewCtrl"), cc.Class({
				extends: cc.Component,
				onLoad: function onLoad() {
					var e = this;
					this._GameSlider = this.node.getChildByName("Slider").getComponent(cc.Slider), this._GameSlider.node.on("slide", function (t) {
						e._Progress.width = 300 * t.progress, e._isUpdateGameStep = !0;
					}), this._Progress = this._GameSlider.node.getChildByName("Progress"), this._BtnPlay = this.node.getChildByName("BtnPlay"), this._BtnPlay.on("click", function () {
						e.onGamePlayOrPause(!0);
					}), this._BtnPause = this.node.getChildByName("BtnPause"), this._BtnPause.on("click", function () {
						e.onGamePlayOrPause(!1);
					}), this._BtnNext = this.node.getChildByName("BtnNext").getComponent(cc.Button), this._BtnNext.node.on("click", function () {
						e.nextGameStep(), e.showGameStepSnap(), e.updateGameCtrl();
					}), this._BtnPrev = this.node.getChildByName("BtnPrev").getComponent(cc.Button), this._BtnPrev.node.on("click", function () {
						e.prevGameStep(), e.showGameStepSnap(), e.updateGameCtrl();
					}), this.resetReviewCtrl();
				},
				onEnable: function onEnable() {
					this.schedule(this.onAutoPlayGameChess, 1.5);
				},
				onDisable: function onDisable() {
					this.unschedule(this.onAutoPlayGameChess);
				},
				update: function update() {
					this._BtnNext.interactable = !this._Game.getChessBoard().isMovingGameChess(), this._BtnPrev.interactable = !this._Game.getChessBoard().isMovingGameChess();
				},
				resetReviewCtrl: function resetReviewCtrl() {
					this._isUpdateGameStep = !1, this._nGameStep = -1, this.onGamePlayOrPause(!1);
				},
				onGamePlayOrPause: function onGamePlayOrPause(e) {
					this._isPlaying = e, this._BtnPlay.active = !e, this._BtnPause.active = e;
				},
				onAutoPlayGameChess: function onAutoPlayGameChess() {
					if (this._isUpdateGameStep) {
						var e = Math.floor(this._GameActionSteps.pool.length * this._GameSlider.progress) - 1;
						e != this._nGameStep && (this._nGameStep = e, this.showGameStepSnap()), this._isUpdateGameStep = !1;
					} else this._isPlaying && (this.showGameStepSnap(), this.nextGameStep(), this.updateGameCtrl());
				},
				nextGameStep: function nextGameStep() {
					this._nGameStep < this._GameActionSteps.pool.length - 1 ? this._nGameStep++ : this.resetReviewCtrl();
				},
				prevGameStep: function prevGameStep() {
					this._nGameStep >= 0 && this._nGameStep--;
				},
				updateGameCtrl: function updateGameCtrl() {
					var e = this._GameActionSteps;
					this._GameSlider.progress = (this._nGameStep + 1) / e.pool.length, this._Progress.width = 300 * this._GameSlider.progress;
				},
				showGameSteps: function showGameSteps(e, t) {
					this._GameActionSteps = t, this._Game = e, this.showGameStepSnap();
				},
				showGameStepSnap: function showGameStepSnap() {
					var e = this._GameActionSteps,
						t = this._nGameStep;
					if (t >= e.pool.length) this.onGamePlayOrPause(!1); else {
						this._Game.initGameQiPanState(), 4 != cc.GameRoomType && 8 != cc.GameRoomType && this._Game.getChessBoard().showAllGameChess();

						for (var a = 0; a < t; a++) {
							this._Game.doGameChessAction(e.pool[a], !1, !1, !1);
						}

						t >= 0 && this._Game.doGameChessAction(e.pool[t], !0, !0, !0), this._Game.updateShowGameStep();
					}
				}
			}), cc._RF.pop();
		}, {}],
		GameReview: [function (e, t) {
			"use strict";

			cc._RF.push(t, "65bf89ac2JEYYXOgJGje4SW", "GameReview");

			var a = e("md5");
			cc.Class({
				extends: cc.Component,
				properties: {
					reviewItemPrefab: {
						default: null,
						type: cc.Prefab
					},
					game_result_images: {
						default: [],
						type: cc.SpriteFrame
					},
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					this._ScrollViewContent = this.node.getChildByName("ScrollView").getChildByName("view").getChildByName("content");
					var e = this;
					this.node.getChildByName("BtnClose").on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), e.node.destroy();
					}), this.node.getChildByName("BtnHelp").on("click", function () {
						cc.audioEngine.playEffect(e.buttonAudio), cc.AppUtil.addPrefabToNode("GameHelp", e.node);
					}), this.node.getChildByName("BtnClear").on("click", function () {
						cc.AppUtil.showWXVideoAd(function () {
							e.node && (cc.GameCache.clearGameData(), e.reloadGameDataList());
						});
					});
				},
				onEnable: function onEnable() {
					4 == cc.PlatformType && cc.AppUtil.showOriginGameAd(!1, !1), cc.AppUtil.showWXGameBannerAd(!0);
				},
				onDisable: function onDisable() {
					cc.AppUtil.showWXGameBannerAd(!1);
				},
				start: function start() {
					this.reloadGameDataList();
				},
				reloadGameDataList: function reloadGameDataList() {
					this._ScrollViewContent.removeAllChildren();

					for (var e = cc.GameCache.getGameData(), t = 0; t < e.length; t++) {
						var s = cc.instantiate(this.reviewItemPrefab);
						this._ScrollViewContent.addChild(s), s.y = -35 - 70 * t, s.getChildByName("Text").getComponent(cc.Label).string = (t + 1).toString();
						var c = "\u3010\u672A\u77E5\u3011";
						void 0 !== e[t][3] && (c = ["\u3010\u56DB\u56FD\u53CC\u660E\u3011", "\u3010\u56DB\u56FD\u6697\u68CB\u3011", "\u3010\u5355\u6311\u6697\u68CB\u3011", "\u3010\u5355\u6311\u7FFB\u68CB\u3011", "\u3010\u56DB\u56FD\u5168\u660E\u3011", "\u3010\u56DB\u56FD\u6697\u68CB\u3011", "\u3010\u56DB\u56FD\u53CC\u660E\u3011", "\u3010\u5355\u6311\u7FFB\u68CB\u3011", "\u3010\u56DB\u56FD\u4E71\u6597\u3011", "\u3010\u5355\u6311\u53CC\u63A7\u3011"][e[t][3] - 1]), s.getChildByName("Name").getComponent(cc.Label).string = c, s.getChildByName("Time").getComponent(cc.Label).string = e[t][0], s.getChildByName("GameResultFlag").getComponent(cc.Sprite).spriteFrame = this.game_result_images[e[t][1]];
						var i = s.getChildByName("BtnPlay");
						i.name = t.toString(), i.on("click", function (e) {
							cc.AppUtil.addLoading(), cc.MainGame.OnLoadGameData(parseInt(e.node.name));
						});
						var n = s.getChildByName("BtnShare");
						n.name = t.toString(), n.on("click", function (e) {
							var t = parseInt(e.node.name),
								s = cc.GameCache.getGameData()[t][2],
								c = cc.MainGame.convertStrToGameData(s),
								i = a(cc.js.formatStr("%s-%s", cc.GameCache.getGUID(), cc.GameCache.getGameData()[t][0]));
							cc.Websocket.Send(cc.ClientProtocol.SetShareGameData(i, c)), cc.AppUtil.shareAppMessageForReview(i);
						}), cc.PlatformType >= 0 && cc.PlatformType <= 2 && (i.x = 125, n.active = !0);
					}

					this._ScrollViewContent.height = 70 * e.length;
				}
			}), cc._RF.pop();
		}, {
			md5: "md5"
		}],
		GameScore: [function (e, t) {
			"use strict";

			cc._RF.push(t, "9f6c0M/+dpAIYEUo39sQyDs", "GameScore"), cc.Class({
				extends: cc.Component,
				properties: {
					grade_images: {
						default: [],
						type: cc.SpriteFrame
					}
				},
				onLoad: function onLoad() {
					this.updateGameScore();
				},
				updateGameScore: function updateGameScore() {
					this.node.getChildByName("Score").getComponent(cc.Label).string = cc.GameCache.getScore().toString();
					var e = cc.GameCache.getGameScoreTitle(cc.GameCache.getScore());
					this.node.getChildByName("Grade").getComponent(cc.Sprite).spriteFrame = this.grade_images[e[1] - 1];
					var t = this.node.getChildByName("Title");
					t.getComponent(cc.Label).string = cc.js.formatStr("\u3010%s\u3011", e[0]), t.color = e[3];
				}
			}), cc._RF.pop();
		}, {}],
		GameSettings: [function (e, t) {
			"use strict";

			cc._RF.push(t, "d93f9zfBzxLULRzmlG5Yr4n", "GameSettings"), cc.Class({
				extends: cc.Component,
				properties: {
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					},
					tapAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					var e = this;
					this.node.getChildByName("BtnClose").on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), e.node.destroy();
					});
					var t = this.node.getChildByName("BtnPrinvacy");
					2 == cc.PlatformType || 4 == cc.PlatformType || 6 == cc.PlatformType ? t.active = !0 : cc.AppUtil.addPrefabToNode("GameScore", this.node, cc.v2(0, -240), .8), t.on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), cc.AppUtil.addPrefabToNode("ServiceProtocol");
					}), this._ToggleArr = [];

					for (var a = 1; a <= 4; a++) {
						var s = this.node.getChildByName("Toggle_" + a);
						s.name = a.toString(), s.on("click", function (t) {
							cc.AppUtil.playAudioEffect(e.tapAudio);
							var a = parseInt(t.name) - 1;
							cc.GameCache.toggleSettingOptionValue(a), 0 == a && cc.audioEngine.pauseMusic();
						}), this._ToggleArr.push(s.getComponent(cc.Toggle));
					}

					this.updateGameSettings();
				},
				onEnable: function onEnable() {
					cc.AppUtil.showWXGameBannerAd(!0);
				},
				onDisable: function onDisable() {
					cc.AppUtil.showWXGameBannerAd(!1);
				},
				update: function update() {
					for (var e = 0; e < this._ToggleArr.length; e++) {
						this._ToggleArr[e].node.getChildByName("Background").active = !this._ToggleArr[e].isChecked;
					}
				},
				updateGameSettings: function updateGameSettings() {
					for (var e = 0; e < this._ToggleArr.length; e++) {
						this._ToggleArr[e].isChecked = cc.GameCache.getSettingOptionValue(e);
					}
				}
			}), cc._RF.pop();
		}, {}],
		GameShop: [function (e, t) {
			"use strict";

			cc._RF.push(t, "ca465qYFzpHsbv8Olf4RrDq", "GameShop"), cc.Class({
				extends: cc.Component,
				properties: {
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					},
					rewardAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				ctor: function ctor() {
					this._GameScorePanel = null;
				},
				onLoad: function onLoad() {
					var e = this;
					this.node.getChildByName("BtnClose").on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), e.node.destroy();
					});
					var t = this.node.getChildByName("ScrollView").getComponent(cc.ScrollView);
					this._GameItemsCountArr = [];

					for (var a = [], s = 1; s <= 12; s++) {
						var c = t.content.getChildByName("GameShopItem_" + s);
						c.name = s.toString(), c.getChildByName("BtnOk").on("click", function (t) {
							var s = parseInt(t.node.parent.name);

							if (2 == s) {
								if (cc.GameShopGuide) {
									var c = e.node.getChildByName("GameShopGuide");
									c && c.destroy(), cc.GameShopGuide = !1;
								}

								if (cc.GameCache.getScore() >= 0) return void cc.AppUtil.showModal("\u60A8\u7684\u5F53\u524D\u79EF\u5206\u975E\u8D1F\u3001\u65E0\u9700\u6E05\u96F6\uFF01");
							}

							cc.AppUtil.showWXVideoAd(function () {
								if (e.node) {
									switch (cc.AppUtil.playAudioEffect(e.rewardAudio), s) {
										case 1:
											cc.GameCache.addDoubleScoreCount(1);
											break;

										case 2:
											cc.GameCache.clearGameScore(), e.updateGameScore();
											break;

										case 3:
											cc.GameCache.addMarkChessCount(20);
											break;

										case 4:
											cc.GameCache.addEggCount(10);
											break;

										case 5:
											cc.GameCache.addSpeakerCount(10);
											break;

										case 6:
											cc.GameCache.addProtectScoreCount(1);
											break;

										default:
											s >= 7 && s <= 12 && cc.GameCache.setShowHeadDecorate(s - 6);
									}

									var t = cc.js.formatStr("\u3010\u7CFB\u7EDF\u6D88\u606F\u3011\uFF1A\u606D\u559C<color=#00ff00>\u3010%s\u3011</c>\u83B7\u5F97<color=#00ff00>\u3010%s\u3011</c>\u9053\u5177\uFF01", cc.GameCache.getName(), a[s - 1]);
									cc.Websocket.Send(cc.ClientProtocol.NotifyGameMsg(t)), cc.AppUtil.showToast(cc.js.formatStr("\u606D\u559C\u83B7\u5F97%s", a[s - 1])), e.showCaiDaiEffect(), e.updateGameItemsCount();
								}
							});
						}), this._GameItemsCountArr.push(c.getChildByName("Count").getComponent(cc.Label)), a.push(c.getChildByName("Name").getComponent(cc.Label).string);
					}

					this.showGameScore(), this.updateGameItemsCount(), cc.GameShopGuide || (this.showSlideFingerTip(), t.scrollToBottom(1.5));
				},
				updateGameItemsCount: function updateGameItemsCount() {
					for (var e = 0; e < 6; e++) {
						this._GameItemsCountArr[e].string = cc.js.formatStr("- %d -", cc.GameCache.getGameItemCount(e));
					}

					for (e = 6; e < this._GameItemsCountArr.length; e++) {
						this._GameItemsCountArr[e].string = cc.GameCache.getGameItemCount(e);
					}
				},
				showGameScore: function showGameScore() {
					var e = this;
					cc.AppUtil.addPrefabToNode("GameScore", this.node, cc.v2(0, -300), .9, null, function (t) {
						e._GameScorePanel = t.getComponent("GameScore"), cc.GameShopGuide && cc.AppUtil.addPrefabToNode("GameShopGuide", e.node, null, .8);
					});
				},
				updateGameScore: function updateGameScore() {
					this._GameScorePanel && this._GameScorePanel.updateGameScore();
				},
				onEnable: function onEnable() {
					4 == cc.PlatformType && cc.AppUtil.showOriginGameAd(!1, !1), cc.AppUtil.showWXGameBannerAd(!0);
				},
				onDisable: function onDisable() {
					cc.AppUtil.showWXGameBannerAd(!1);
				},
				showCaiDaiEffect: function showCaiDaiEffect() {
					var e = this;
					cc.AppUtil.loadResFromBundle("particles/caidai", cc.ParticleAsset, function (t) {
						if (e.node) {
							var a = new cc.Node(),
								s = a.addComponent(cc.ParticleSystem);
							s.file = t, s.autoRemoveOnFinish = !0, e.node.addChild(a), a.y = cc.sys.isNative ? cc.winSize.height : cc.winSize.height / 2;
						}
					});
				},
				showSlideFingerTip: function showSlideFingerTip() {
					cc.AppUtil.addPrefabToNode("HandTip", this.node, cc.v2(80, 0), 1.2, 3.5, function (e) {
						e.getComponent(cc.Animation).play("HandTip_2");
					});
				}
			}), cc._RF.pop();
		}, {}],
		GameTable: [function (e, t) {
			"use strict";

			cc._RF.push(t, "2d3692qnG5Mn6O+AFPTz1/z", "GameTable"), cc.Class({
				extends: cc.Component,
				properties: {
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					},
					table_image: {
						default: null,
						type: cc.SpriteFrame
					},
					table_gray_image: {
						default: null,
						type: cc.SpriteFrame
					}
				},
				onLoad: function onLoad() {
					this._HeadNodeArr = [];

					for (var e = this.node.getChildByName("Background"), t = 0; t < 4; t++) {
						this._HeadNodeArr.push(e.getChildByName("Head_" + (t + 1)));
					}

					this._TableButton = this.node.getComponent(cc.Button), this._TableSprite = this.node.getChildByName("Background").getComponent(cc.Sprite), this._TableStates = 0;
				},
				updateGameTable: function updateGameTable(e) {
					if (this._TableStates != e) {
						for (var t = 0; t < 4; t++) {
							this._HeadNodeArr[t].active = 1 == (e >> t & 1);
						}

						var a = 1 == (e >> 4 & 15);
						this._TableButton.interactable = !a, this._TableSprite.spriteFrame = a ? this.table_image : this.table_gray_image, this._TableStates = e;
					}
				},
				initGameTable: function initGameTable(e) {
					var t = this;
					this.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = cc.js.formatStr("\u7B2C %d \u684C", e + 1), this.node.name = (e + 1).toString(), this.node.on("click", function (e) {
						cc.AppUtil.playAudioEffect(t.buttonAudio), cc.GameRoomType >= 6 && cc.GameRoomType <= 8 && !cc.GameCache.checkHasHeadDecorate() ? cc.AppUtil.showToast("\u8BF7\u5728\u9053\u5177\u5546\u57CE\u4F69\u6234\u5934\u50CF\u88C5\u9970\u7269\uFF01") : (cc.GameTableNumber = parseInt(e.node.name), cc.Websocket.Send(cc.ClientProtocol.EnterGame(cc.GameTableNumber, cc.GameCache.getGameHeadDecorate())) && cc.AppUtil.addLoading());
					});
					var a = Math.floor(e / 4),
						s = e % 4;
					this.node.setPosition([-225, -75, 75, 225][s], -10 - 180 * a);
				}
			}), cc._RF.pop();
		}, {}],
		HeadFrame: [function (e, t) {
			"use strict";

			cc._RF.push(t, "71d88sp6s1DNadUZzFfoEOV", "HeadFrame"), cc.Class({
				extends: cc.Component,
				properties: {
					head_decorate_images: {
						default: [],
						type: cc.SpriteFrame
					},
					grade_images: {
						default: [],
						type: cc.SpriteFrame
					},
					player_state_images: {
						default: [],
						type: cc.SpriteFrame
					},
					clothes_images: {
						default: [],
						type: cc.SpriteFrame
					},
					face_images: {
						default: [],
						type: cc.SpriteFrame
					},
					head_images: {
						default: [],
						type: cc.SpriteFrame
					},
					camp_images: {
						default: [],
						type: cc.SpriteFrame
					},
					chess_color_images: {
						default: [],
						type: cc.SpriteFrame
					}
				},
				onLoad: function onLoad() {
					var e = this.node.getChildByName("Head").getChildByName("Actor");
					this._ActorArr = [];

					for (var t = 0; t < 3; t++) {
						this._ActorArr.push(e.getChildByName(["Clothes", "Head", "Face"][t]).getComponent(cc.Sprite));
					}

					this.delPlayer();
				},
				getPlayer: function getPlayer() {
					return this._GamePlayerInfo;
				},
				getPlayerName: function getPlayerName() {
					return this._GamePlayerInfo.name;
				},
				addPlayer: function addPlayer(e) {
					this._GamePlayerInfo = e, this.showActor(e.actor);

					for (var t = [], a = ["Name", "Title", "Grade", "HeadFrameAvartar"], s = 0; s < a.length; s++) {
						t.push_back(this.node.getChildByName(a[s]));
					}

					t[0].getComponent(cc.Label).string = e.name, t[0].active = !0;
					var c = cc.GameCache.getGameScoreTitle(e.score);
					t[1].getComponent(cc.Label).string = cc.js.formatStr("\u3010%s\u3011", c[0]), t[1].color = c[3], t[1].active = !0, t[2].getComponent(cc.Sprite).spriteFrame = this.grade_images[c[1] - 1], t[2].active = !0, e.decorate > 0 ? (t[3].active = !0, t[3].getComponent(cc.Sprite).spriteFrame = this.head_decorate_images[e.decorate - 1]) : t[3].active = !1, this.node.active = !0;
				},
				delPlayer: function delPlayer() {
					this._GamePlayerInfo = null, this.node.active = !1;
				},
				showActor: function showActor(e) {
					for (var t = [e.clothes, e.head, e.face], a = [this.clothes_images, this.head_images, this.face_images], s = 0; s < this._ActorArr.length; s++) {
						this._ActorArr[s].spriteFrame = t[s] > 0 ? a[s][t[s] - 1] : null;
					}
				},
				showLeaveEffect: function showLeaveEffect() {
					cc.AppUtil.addPrefabToNode("LeaveEffect", this.node.parent, this.node.getPosition(), null, 3);
				},
				showGamePlayerState: function showGamePlayerState(e) {
					var t = this.node.getChildByName("GameFlag");
					t.getComponent(cc.Sprite).spriteFrame = this.player_state_images[e - 4], t.active = !0;
				},
				updatePlayerState: function updatePlayerState(e) {
					if (null != this._GamePlayerInfo) {
						var t = this.node.getChildByName("GameFlag");
						t.active = !1, e >= 4 && (t.stopAllActions(), t.getComponent(cc.Sprite).spriteFrame = this.player_state_images[e - 4], t.active = !0, this._GamePlayerInfo.state != e && (t.opacity = 0, t.scale = 2, t.runAction(cc.spawn(cc.scaleTo(.2, 1), cc.fadeIn(.2))))), this.node.getChildByName("Ready").active = 2 == e, this._GamePlayerInfo.state = e;
					}
				},
				showHeadFrameHint: function showHeadFrameHint() {
					var e = this.node.getChildByName("HeadHint");
					e.active = !0, e.stopAllActions(), e.runAction(cc.repeatForever(cc.sequence(cc.fadeIn(.2), cc.fadeOut(.8))));
				},
				hideHeadFrameHint: function hideHeadFrameHint() {
					this.node.getChildByName("HeadHint").active = !1;
				},
				showHeadCampFlag: function showHeadCampFlag(e) {
					this.node.getChildByName("Camp").getComponent(cc.Sprite).spriteFrame = this.camp_images[e];
				},
				setChessColor: function setChessColor(e) {
					var t = this.node.getChildByName("Chess_Color");
					t.active = !0, t.getComponent(cc.Sprite).spriteFrame = this.chess_color_images[e];
				},
				getBoundingBox: function getBoundingBox() {
					return null == this._GamePlayerInfo ? cc.rect(0, 0, 0, 0) : this.node.getBoundingBox();
				},
				setGameActorPreview: function setGameActorPreview() {
					for (var e = 0; e < this.node.children.length; e++) {
						"Head" != this.node.children[e].name && this.node.children[e].destroy();
					}

					this.node.active = !0, this.node.y = -10;
				}
			}), cc._RF.pop();
		}, {}],
		MainGame: [function (e, t) {
			"use strict";

			cc._RF.push(t, "42b049vaqxKjaudGcQDyyu+", "MainGame");

			var a = e("GameProtocol_Client"),
				s = e("Websocket"),
				c = cc.Class({
					ctor: function ctor() {
						this.IsLoadingGame = !1, this.GameMsgCaches = [], this.WebSocketValid = !1;
					},
					convertGameDataToStr: function convertGameDataToStr(e) {
						for (var t = "", a = new Uint8Array(e.save()), s = 0; s < a.byteLength; s++) {
							s > 0 && (t += ","), t += a[s].toString();
						}

						return t;
					},
					convertStrToGameData: function convertStrToGameData(e) {
						for (var t = e.split(","), s = new Uint8Array(t.length), c = 0; c < e.length; c++) {
							s[c] = parseInt(t[c]);
						}

						var i = new a.GameData();
						return i.load(s.buffer), i;
					},
					execCallback: function execCallback(e, t, a) {
						var s = cc.AppUtil.getChildByNameLoop(e);
						null == s && (s = cc.find(e)), s && s.getComponent(e)[t](a);
					},
					// 创建WebSocket连接
					createWebSocket: function initializeWebSocketConnection() {
						// 如果WebSocket未初始化
						if (!this.WebSocketValid) {
							// 创建新的WebSocket对象
							cc.Websocket = new s();
							// 根据平台类型选择合适的WebSocket地址
							var webSocketUrl = "wss://game-junqi.taoufo.com:20110/socketJunQi";
							webSocketUrl = "wss://www.junqiworld.top:15005/websocket";
							// 初始化WebSocket并设置回调
							cc.Websocket.init(webSocketUrl, this, this.onConnected, this.onClose, this.onRecv);
							// 初始化游戏协议
							this.initGameProtocol();
						}
						this.WebSocketValid = true;
					},

					// 初始化游戏协议
					initGameProtocol: function setupGameProtocol() {
						cc.ClientProtocol = new a.ClientProtocol(this), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnRegisterSuccess, this.OnRegisterSuccess), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnLoginSuccess, this.OnLoginSuccess), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnCheckStringValid, this.OnCheckStringValid), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnGetOnlineNumber, this.OnGetOnlineNumber), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnGameData, this.OnGameData), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnChessMarkerData, this.OnChessMarkerData), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnPlayGameReview, this.OnPlayGameReview), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnEnterRoomSuccess, this.OnEnterRoomSuccess), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnTableStateChanged, this.OnTableStateChanged), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnUpdateGameScore, this.OnUpdateGameScore), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnWatchGameSuccess, this.OnWatchGameSuccess), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnEnterGameSuccess, this.OnEnterGameSuccess), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnPlayerEnterGame, this.OnPlayerEnterGame), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnPlayerLeaveGame, this.OnPlayerLeaveGame), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnPlayerExchangeSeat, this.OnPlayerExchangeSeat), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnPlayerStateChanged, this.OnPlayerStateChanged), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnAddGameWatcher, this.OnAddGameWatcher), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnDelGameWatcher, this.OnDelGameWatcher), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnGameChat, this.OnGameChat), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnGameChatText, this.OnGameChatText), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnGameEgg, this.OnGameEgg), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnGameStart, this.OnGameStart), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnGameBattle, this.OnGameBattle), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnSwapChessFailed, this.OnSwapChessFailed), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnGameStartReal, this.OnGameStartReal), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnGameTurn, this.OnGameTurn), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnRequestPeace, this.OnRequestPeace), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnRejectPeace, this.OnRejectPeace), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnUpdateSkipCount, this.OnUpdateSkipCount), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnGameAction, this.OnGameAction), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnGameOver, this.OnGameOver), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnGetRankList, this.OnGetRankList), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnGetMineRank, this.OnGetMineRank), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnSaveGameData, this.OnSaveGameData), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnSysMsg, this.OnSysMsg), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnErrMsg, this.OnErrMsg), cc.ClientProtocol.RegHandler(cc.ClientProtocol.CallbackID_OnKickGameMsg, this.OnKickGameMsg);
					},

					// 连接WebSocket
					connect: function connectToServer() {
						// 创建WebSocket连接
						this.createWebSocket();
						cc.Websocket.Connect();
						// 如果WebSocket已连接
						if (cc.Websocket.IsConnected()) {
							console.log(" WebSocket连接 成功")
							// 登录成功回调
							this.OnLoginSuccess(cc.GameCache.getName(), cc.GameCache.getActor(), cc.GameCache.getScore(), 0, cc.GameTrick, cc.GameCache.getPlayerID());
						} else {
							// 否则，尝试连接WebSocket
							console.log(" 重试链接")
							cc.Websocket.Connect();
							this.connect();
						}
					},
					// 当连接成功时的回调函数
					onConnected: function onConnected() {
						// 初始化房间层和游戏场景为null
						this._RoomLayer = null;
						this._GameScene = null;

						// 设置游戏加载状态为false
						this.IsLoadingGame = !1;

						// 清空游戏消息缓存
						this.GameMsgCaches.clear();
						console.log("登陆信息", cc.PlatformType, cc.GameCache.isShowGamePrivacy());
						// 检查平台类型并决定是否显示游戏隐私
						if (6 != cc.PlatformType && 4 != cc.PlatformType && 2 != cc.PlatformType || cc.GameCache.isShowGamePrivacy()) {
							// 根据不同的平台类型进行登录操作
							if (cc.PlatformType > 0 && cc.PlatformType < 8) {
								var userID = cc.GameCache.getOpenID();
								console.log("userID", userID)
								if ("" != userID) {
									cc.Websocket.Send(cc.ClientProtocol.Login(userID));
								} else {
									var code = "";
									var platformLogin = (6 == cc.PlatformType ? qg.login : wx.login);
									platformLogin({
										force: !1,
										success: function success(response) {

											if (response.code) {
												code = response.code;
											}
											if (response.token) {
												code = response.token;
											}
											if (6 != cc.PlatformType && 7 != cc.PlatformType) {
												return;
											}
											userID = (6 == cc.PlatformType ? response.data.appAccountId : response.uid).toString();

											cc.GameCache.setOpenID(userID);
											cc.Websocket.Send(cc.ClientProtocol.Login(userID));
										},
										complete: function complete() {
											if (6 != cc.PlatformType && 7 != cc.PlatformType) {
												if ("" != code) {
													cc.Websocket.Send(cc.ClientProtocol.Register(cc.GameCache.getGUID(), code, cc.PlatformType));
												} else {
													cc.Websocket.Send(cc.ClientProtocol.Login(cc.GameCache.getGUID()));
												}
											}
										}
									});
								}
							} else if (9 == cc.PlatformType) {
								var fbUserID = FBInstant.player.getID();
								cc.GameCache.setOpenID(fbUserID);
								cc.Websocket.Send(cc.ClientProtocol.Login(fbUserID));
							} else {
								cc.Websocket.Send(cc.ClientProtocol.Login(cc.GameCache.getGUID()));
							}
						} else {
							cc.AppUtil.addPrefabToNode("ServiceProtocol");
						}
					},
					onClose: function onClose() {
						cc.AppUtil.delLoading(), cc.AppUtil.showModal("\u7F51\u7EDC\u72B6\u6001\u4E0D\u4F73\u3001\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8BBE\u7F6E\uFF01", function () {
							cc.director.loadScene("homepage");
						}, !1);
					},
					onRecv: function onRecv(e) {
						this.IsLoadingGame ? this.GameMsgCaches.push(e) : cc.ClientProtocol.parse(e);

					},
					leaveGame: function leaveGame(e, t) {
						this._RoomLayer = null, this._GameScene = null, e && cc.Websocket.Send(cc.ClientProtocol.LeaveGame()), cc.director.loadScene("lobby", t);
					},
					backToHomepage: function backToHomepage() {
						this._RoomLayer = null, this._GameScene = null, cc.Websocket.Send(cc.ClientProtocol.LeaveRoom()), cc.director.loadScene("homepage");
					},
					OnRegisterSuccess: function OnRegisterSuccess(e) {
						cc.GameCache.setOpenID(e);
					},
					OnLoginSuccess: function (playerInfo, token, avatar, status, gameTrick, additionalInfo) {
						this._RoomLayer = null
						this._GameScene = null
						cc.GameTrick = gameTrick
						cc.GameCache.initPlayerInfo(playerInfo, token, avatar, additionalInfo);
						if (status == 1) {
							cc.AppUtil.addLoading();
						} else {
							var handleQuery = function (launchOptions) {
								if (launchOptions && launchOptions.query) {
									let shareKey = launchOptions.query.k;
									if (shareKey) {
										cc.Websocket.Send(cc.ClientProtocol.GetShareGameData(shareKey));
										cc.AppUtil.addLoading();
										return;
									}
									let timestamp = parseInt(launchOptions.query.t),
										roomType = parseInt(launchOptions.query.r),
										tableNumber = parseInt(launchOptions.query.g),
										watchId = parseInt(launchOptions.query.w);

									if (isNaN(timestamp) || isNaN(roomType) || isNaN(tableNumber)) return;

									let gameHeadDecorate = cc.GameCache.getGameHeadDecorate();
									if (new Date().getTime() - timestamp > 1800000) return;

									if (isNaN(watchId)) {
										if (!cc.Websocket.Send(cc.ClientProtocol.EnterGameEx(roomType, tableNumber, gameHeadDecorate))) return;
									} else {
										if (!cc.Websocket.Send(cc.ClientProtocol.GameWatch(roomType, tableNumber, watchId))) return;
									}

									cc.GameRoomType = roomType;
									cc.GameTableNumber = tableNumber;
									cc.AppUtil.addLoading();
								}
							};

							var onPlatformShow = function () {
								if (cc.PlatformType >= 1 && cc.PlatformType <= 3 && cc.ShowCallback) {
									wx.onShow(handleQuery);
									handleQuery(wx.getLaunchOptionsSync());
									cc.ShowCallback = false;
								}
							};
							// 新代码
							let loadResFromBundle = cc.GameCache.isPassGuidance() ? 'prefab/GameLayer' : 'prefab/GameGuide';
							cc.AppUtil.loadResFromBundle(loadResFromBundle, cc.Prefab, function (prefab) {
								cc.director.getScene().getChildByName("Canvas").addChild(cc.instantiate(prefab));
								onPlatformShow();
							});
							if (!cc.GameCache.isPassGuidance()) {
								cc.GameCache.setPassGuidance();
							}
						}
					},
					OnCheckStringValid: function OnCheckStringValid(e) {
						this.execCallback("AccountSettings", "onCheckStringValid", e);
					},
					OnGetOnlineNumber: function OnGetOnlineNumber(e) {
						this.execCallback("GameLayer", "updateOnlineNumber", e);
					},
					doGameSceneData: function doGameSceneData(e, t, a, s, c, i) {
						this.IsLoadingGame = !0, this.GameMsgCaches.clear();
						var n = 4 == cc.GameRoomType || 8 == cc.GameRoomType ? "game_fanfan" : "game",
							o = this;
						cc.director.loadScene(n, function (r, l) {
							var h = l.getChildByName("Canvas");
							o._GameScene = h.getComponent(n), o._GameScene.initRoomData(e, t, a), o._GameScene.initGameDataSteps(s, c, i);

							for (var C = 0; C < o.GameMsgCaches.length; C++) {
								cc.ClientProtocol.parse(o.GameMsgCaches[C]);
							}

							o.GameMsgCaches.clear(), o.IsLoadingGame = !1, cc.AppUtil.delLoading();
						}), this._RoomLayer = null;
					},
					OnGameData: function OnGameData(e) {
						cc.GameRoomType = e.game_mode, cc.GameViewMode = null, cc.EggSpriteTip = !1, this.doGameSceneData(e.seat, e.players, e.battle, e.chess_data_arr, e.steps, e.turn);
					},
					OnPlayGameReview: function OnPlayGameReview(e) {
						cc.GameRoomType = e.game_mode, cc.GameViewMode = e.game_mode, cc.EggSpriteTip = !1, this.doGameSceneData(e.seat, e.players, e.battle, e.chess_data_arr, e.steps, e.turn);
					},
					OnEnterRoomSuccess: function OnEnterRoomSuccess(e) {
						this._GameScene = null, this._RoomLayer = cc.Canvas.instance.node.getComponent("lobby"), this._RoomLayer && this._RoomLayer.initGameTables(e), cc.AppUtil.delLoading();
					},
					OnTableStateChanged: function OnTableStateChanged(e, t) {
						this._RoomLayer && this._RoomLayer.updateGameTable(e, t);
					},
					OnUpdateGameScore: function OnUpdateGameScore(e) {
						cc.GameCache.addScore(e);
					},
					OnEnterGameSuccess: function OnEnterGameSuccess(e, t) {
						this.doGameSceneData(e, t, 0, null, null, null);
					},
					OnWatchGameSuccess: function OnWatchGameSuccess() {
						this._GameScene && this._GameScene.changeGameState(cc.GameStateType.GameState_Watching);
					},
					OnPlayerExchangeSeat: function OnPlayerExchangeSeat(e, t) {
						this._GameScene && this._GameScene.exchangePlayerSeat(e, t);
					},
					OnPlayerStateChanged: function OnPlayerStateChanged(e, t) {
						this._GameScene && this._GameScene.updatePlayerState(e, t);
					},
					OnAddGameWatcher: function OnAddGameWatcher(e) {
						cc.AppUtil.showToast(cc.js.formatStr("\u3010%s\u3011\u8FDB\u5165\u4E86\u6E38\u620F\uFF01", e), 1);
					},
					OnDelGameWatcher: function OnDelGameWatcher(e) {
						cc.AppUtil.showToast(cc.js.formatStr("\u3010%s\u3011\u79BB\u5F00\u4E86\u6E38\u620F\uFF01", e), 1);
					},
					OnGameChat: function OnGameChat(e, t) {
						this._GameScene && this._GameScene.onGameChat(e, t);
					},
					OnGameChatText: function OnGameChatText(e, t) {
						this._GameScene && this._GameScene.onGameChatText(e, t);
					},
					OnGameEgg: function OnGameEgg(e) {
						this._GameScene && this._GameScene.onGameEgg(e);
					},
					OnPlayerEnterGame: function OnPlayerEnterGame(e) {
						this._GameScene && this._GameScene.addPlayer(e, !0);
					},
					OnPlayerLeaveGame: function OnPlayerLeaveGame(e) {
						this._GameScene && this._GameScene.delPlayer(e);
					},
					OnGameStart: function OnGameStart(e) {
						this._GameScene && this._GameScene.onGameStart(e);
					},
					OnGameBattle: function OnGameBattle(e, t, a) {
						this._GameScene && this._GameScene.onGameBattle(e, t, a);
					},
					OnSwapChessFailed: function OnSwapChessFailed(e, t) {
						this._GameScene && this._GameScene.onSwapChessFailed(e, t);
					},
					OnGameStartReal: function OnGameStartReal() {
						this._GameScene && this._GameScene.onGameStartReal();
					},
					OnGameTurn: function OnGameTurn(e) {
						this._GameScene && this._GameScene.onGameTurn(e, 25);
					},
					OnRequestPeace: function OnRequestPeace(e) {
						this._GameScene && this._GameScene.onRequestPeace(e);
					},
					OnRejectPeace: function OnRejectPeace(e) {
						this._GameScene && this._GameScene.onRejectPeace(e);
					},
					OnUpdateSkipCount: function OnUpdateSkipCount(e) {
						this._GameScene && this._GameScene.onUpdateSkipCount(e);
					},
					OnChessMarkerData: function OnChessMarkerData(e) {
						this._GameScene && this._GameScene.onGameChessMarkerData(e);
					},
					OnGameAction: function OnGameAction(e) {
						this._GameScene && this._GameScene.onGameAction(e);
					},
					OnGameOver: function OnGameOver(e) {
						this._GameScene && this._GameScene.onGameOver(e);
					},
					OnGetRankList: function OnGetRankList(e) {
						this.execCallback("GameRank", "showGameRankData", e), cc.AppUtil.delLoading();
					},
					OnGetMineRank: function OnGetMineRank(e) {
						this.execCallback("GameRank", "showMineGameRank", e), cc.AppUtil.delLoading();
					},
					OnLoadGameData: function OnLoadGameData(e) {
						var t = cc.GameCache.getGameData()[e][2],
							a = this.convertStrToGameData(t);
						cc.GameViewMode = cc.GameRoomType, cc.GameRoomType = a.game_mode, cc.EggSpriteTip = !1, this.doGameSceneData(a.seat, a.players, a.battle, a.chess_data_arr, a.steps, a.turn);
					},
					OnSaveGameData: function OnSaveGameData(e, t) {
						var a = this.convertGameDataToStr(e);
						cc.GameCache.addGameData(a, t), cc.AppUtil.showToast("\u6E38\u620F\u590D\u76D8\u4FDD\u5B58\u6210\u529F\uFF01"), cc.AppUtil.delLoading(), this.execCallback("GameResult", "showGameSavedFlag");
					},
					OnSysMsg: function OnSysMsg(e) {
						this.execCallback("SystemMsg", "addNotifyMsgCache", e);
					},
					OnErrMsg: function OnErrMsg(e) {
						cc.AppUtil.delLoading(), cc.AppUtil.showToast(e);
					},
					OnKickGameMsg: function OnKickGameMsg(e) {
						this._GameScene && this._GameScene.onKickGameMsg(e);
					}
				});
			cc.MainGame = new c(), cc._RF.pop();
		}, {
			GameProtocol_Client: "GameProtocol_Client",
			Websocket: "Websocket"
		}],
		MoreGame: [function (e, t) {
			"use strict";

			cc._RF.push(t, "b371dc0QFlOmYY9aNLySopw", "MoreGame"), cc.Class({
				extends: cc.Component,
				properties: {
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					},
					app_id_arr: {
						default: [],
						type: cc.String
					},
					game_id_index: {
						default: 0,
						type: cc.Integer
					}
				},
				onLoad: function onLoad() {
					var e = cc.rotateBy(.1, 10),
						t = cc.rotateBy(.2, -20),
						a = cc.rotateBy(.2, 20),
						s = cc.rotateBy(.1, -10),
						c = cc.delayTime(1),
						i = [e, t, a, s, c];
					"BtnMoreGame_1" == this.node.name ? i.push(c) : i.push_front(c), this.node.runAction(cc.repeatForever(cc.sequence(i)));
					var n = this;
					this.node.on("click", function () {
						cc.AppUtil.playAudioEffect(n.buttonAudio), cc.sys.isNative ? cc.sys.OS_IOS === cc.sys.os && jsb.reflection.callStaticMethod("AppController", "OpenOtherGame:", n.game_id_index) : wx.navigateToMiniProgram({
							appId: n.app_id_arr[cc.PlatformType - 1]
						});
					});
				}
			}), cc._RF.pop();
		}, {}],
		ProtocolBase: [function (e, t) {
			"use strict";

			cc._RF.push(t, "40a89GWEcJIAqWxbg01M+sD", "ProtocolBase");

			var a = cc.Class({
				write: function write(e) {
					e.writeByte(this.value);
				},
				read: function read(e) {
					this.value = e.readByte();
				}
			}),
				s = cc.Class({
					create: function create(e) {
						this.pool = [], this.createObj = e;
					},
					write: function write(e) {
						e.writeShort(this.pool.length);

						for (var t = 0; t < this.pool.length; t++) {
							this.pool[t].write(e);
						}
					},
					read: function read(e) {
						for (var t = e.readShort(), a = 0; a < t; a++) {
							var s = this.createObj();
							s.read(e), this.pool.push(s);
						}
					},
					convertToArray: function convertToArray() {
						for (var e = [], t = 0; t < this.pool.length; t++) {
							e.push(this.pool[t].value);
						}

						return e;
					}
				}),
				c = cc.Class({
					ctor: function ctor() {
						this.create(arguments[0]);
					},
					create: function create(e) {
						this.pool = new Map(), this.target = e;
					},
					RegHandler: function RegHandler(e, t) {
						this.pool.set(e, t);
					},
					HandlerCallback: function HandlerCallback(e, t) {
						this.pool.get(e).apply(this.target, t);
					}
				});
			Array.prototype.write = function (e) {
				e.writeShort(this.length);

				for (var t = 0; t < this.length; t++) {
					e.writeByte(this[t]);
				}
			}, t.exports.Char = a, t.exports.Vector = s, t.exports.Protocol = c, cc._RF.pop();
		}, {}],
		RoundRectMask: [function (e, t, a) {
			"use strict";

			cc._RF.push(t, "ab618mkQPZLF6FaTDYHSQaC", "RoundRectMask");

			var _s,
				c = this && this.__extends || (_s = function s(e, t) {
					return (_s = Object.setPrototypeOf || {
						__proto__: []
					} instanceof Array && function (e, t) {
						e.__proto__ = t;
					} || function (e, t) {
						for (var a in t) {
							Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
						}
					})(e, t);
				}, function (e, t) {
					function a() {
						this.constructor = e;
					}

					_s(e, t), e.prototype = null === t ? Object.create(t) : (a.prototype = t.prototype, new a());
				}),
				i = this && this.__decorate || function (e, t, a, s) {
					var c,
						i = arguments.length,
						n = i < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, a) : s;
					if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof2(Reflect)) && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, a, s); else for (var o = e.length - 1; o >= 0; o--) {
						(c = e[o]) && (n = (i < 3 ? c(n) : i > 3 ? c(t, a, n) : c(t, a)) || n);
					}
					return i > 3 && n && Object.defineProperty(t, a, n), n;
				};

			Object.defineProperty(a, "__esModule", {
				value: !0
			}), a.RoundRectMask = void 0;
			var n = cc._decorator.property,
				o = cc._decorator.ccclass,
				r = cc._decorator.executeInEditMode,
				l = cc._decorator.disallowMultiple,
				h = cc._decorator.requireComponent,
				C = cc._decorator.menu;
			cc.macro.ENABLE_WEBGL_ANTIALIAS = !0;

			var d = function (e) {
				function t() {
					var t = null !== e && e.apply(this, arguments) || this;
					return t._radius = 50, t.mask = null, t;
				}

				return c(t, e), Object.defineProperty(t.prototype, "radius", {
					get: function get() {
						return this._radius;
					},
					set: function set(e) {
						this._radius = e, this.updateMask(e);
					},
					enumerable: !1,
					configurable: !0
				}), t.prototype.onEnable = function () {
					this.mask = this.getComponent(cc.Mask), this.updateMask(this.radius);
				}, t.prototype.updateMask = function (e) {
					var t = e >= 0 ? e : 0;
					t < 1 && (t = Math.min(this.node.width, this.node.height) * t), this.mask.radius = t, this.mask.onDraw = this.onDraw.bind(this.mask), this.mask._updateGraphics = this._updateGraphics.bind(this.mask), this.mask.type = cc.Mask.Type.RECT;
				}, t.prototype._updateGraphics = function () {
					var e = this._graphics;
					e && this.onDraw(e);
				}, t.prototype.onDraw = function (e) {
					e.clear(!1);
					var t = this.node,
						a = t.width,
						s = t.height,
						c = -a * t.anchorX,
						i = -s * t.anchorY;
					e.roundRect(c, i, a, s, this.radius || 0), cc.game.renderType === cc.game.RENDER_TYPE_CANVAS ? e.stroke() : e.fill();
				}, i([n()], t.prototype, "_radius", void 0), i([n({
					tooltip: "\u5706\u89D2\u534A\u5F84:\n0-1\u4E4B\u95F4\u4E3A\u6700\u5C0F\u8FB9\u957F\u6BD4\u4F8B\u503C, \n>1\u4E3A\u5177\u4F53\u50CF\u7D20\u503C"
				})], t.prototype, "radius", null), i([o(), r(!0), l(!0), h(cc.Mask), C("\u6E32\u67D3\u7EC4\u4EF6/\u5706\u89D2\u906E\u7F69")], t);
			}(cc.Component);

			a.RoundRectMask = d, cc._RF.pop();
		}, {}],
		SendBQ: [function (e, t) {
			"use strict";

			cc._RF.push(t, "eaa70RWVqpEe6R9nabrR3yy", "SendBQ"), cc.Class({
				extends: cc.Component,
				properties: {
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					this._ChatBQ_Panel = this.node.getChildByName("BQ_Panel"), this._ChatBQ_Panel.active = !1;

					for (var e = 1; e <= 8; e++) {
						var t = this._ChatBQ_Panel.getChildByName(cc.js.formatStr("BtnBQ_%d", e));

						t.setName(e.toString()), t.on("click", this.OnBQBtnClicked, this);
					}

					var a = this;
					this.node.getChildByName("BtnChat").on("click", function () {
						cc.AppUtil.playAudioEffect(a.buttonAudio), a._ChatBQ_Panel.active = !a._ChatBQ_Panel.active;
					});
				},
				hideBQPanel: function hideBQPanel() {
					this._ChatBQ_Panel && (this._ChatBQ_Panel.active = !1);
				},
				OnBQBtnClicked: function OnBQBtnClicked(e) {
					var t = parseInt(e.target.parent.name);
					cc.Websocket.Send(cc.ClientProtocol.GameChat(t)), this._ChatBQ_Panel.active = !1;
				}
			}), cc._RF.pop();
		}, {}],
		ServiceProtocol: [function (e, t) {
			"use strict";

			cc._RF.push(t, "fe1efBCMbVMyK2iJuKWlcIn", "ServiceProtocol"), cc.Class({
				extends: cc.Component,
				properties: {
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					this._GameBg = this.node.getChildByName("GameBg");
					var e = this;
					this._GameBg.getChildByName("BtnOk").on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), e.node.destroy();
					}), this._GameBg.getChildByName("BtnCancel").on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), 2 == cc.PlatformType ? wx.exitMiniProgram({}) : cc.AppUtil.showModal("\u62D2\u7EDD\u8BE5\u534F\u8BAE\u5C06\u65E0\u6CD5\u8FDB\u5165\u6E38\u620F\uFF01");
					});

					for (var t = 1; t <= 2; t++) {
						var a = this._GameBg.getChildByName("Btn_" + t);

						a.name = t.toString(), a.on("click", function (t) {
							cc.AppUtil.loadResFromBundle("prefab/ServiceProtocolShow", cc.Prefab, function (a) {
								if (e.node) {
									var s = parseInt(t.node.name),
										c = 2 != s || 2 != cc.PlatformType && 6 != cc.PlatformType ? 0 : 1,
										i = cc.instantiate(a),
										n = i.getChildByName("ScrollView").getChildByName("view").getChildByName("content");
									i.getChildByName("Title").getComponent(cc.Label).string = ["\u7528\u6237\u534F\u8BAE", "\u9690\u79C1\u653F\u7B56"][s - 1], n.height = s + c == 2 ? 1400 : 1500, n.getChildByName("Label_" + (s + c)).active = !0, i.getChildByName("BtnOk").on("click", function (t) {
										cc.AppUtil.playAudioEffect(e.buttonAudio), t.node.parent.destroy();
									}), e.node.addChild(i);
								}
							});
						});
					}
				},
				start: function start() {
					this._GameBg.scale = 0, this._GameBg.opacity = 0;
					var e = cc.scaleTo(.1, 1),
						t = cc.fadeIn(.1);

					this._GameBg.runAction(cc.spawn(e, t));
				},
				onDisable: function onDisable() {
					cc.GameCache.isShowGamePrivacy() || (cc.GameCache.setShowGamePrivacy(), cc.MainGame.onConnected());
				}
			}), cc._RF.pop();
		}, {}],
		SystemMsg: [function (e, t) {
			"use strict";

			cc._RF.push(t, "4d3fcm0WotC/Ztq+jIz1SeW", "SystemMsg"), cc.Class({
				extends: cc.Component,
				ctor: function ctor() {
					this._NotifyMsgCache = [];
				},
				onLoad: function onLoad() {
					var e = this.node.getChildByName("Mask").getChildByName("ScrollView");
					this._ScrollView = e.getComponent(cc.ScrollView), this._ScrollView.enabled = !1, this._Text = e.getChildByName("Text").getComponent(cc.RichText), this._Text.string = "", this._ScrollViewValue = 4095, this.node.opacity = 0;
				},
				start: function start() {
					cc.AppUtil.isFullScreen() && (this.node.getComponent(cc.Widget).top += cc.FringeHeight / 3);
				},
				update: function update(e) {
					this._ScrollViewValue > 100 ? this.showNotifyMsgFromCache() : (this._ScrollViewValue += 5 * e, this._ScrollView.scrollToPercentHorizontal(1 - this._ScrollViewValue / 100));
				},
				showNotifyMsgFromCache: function showNotifyMsgFromCache() {
					var e = this.getNotifyMsgCache();

					if (e) {
						this.node.stopAllActions(), this.node.opacity = 255, this._Text.string = e;

						var t = this._Text.node.getContentSize();

						this._ScrollView.node.setContentSize(560 + 2 * t.width, 40), this._ScrollView.scrollToPercentHorizontal(1), this._ScrollViewValue = 0;
					} else 4095 != this._ScrollViewValue && (this.node.runAction(cc.fadeOut(.5)), this._ScrollViewValue = 4095);
				},
				addNotifyMsgCache: function addNotifyMsgCache(e) {
					this._NotifyMsgCache.length < 16 && this._NotifyMsgCache.push_back(e);
				},
				getNotifyMsgCache: function getNotifyMsgCache() {
					if (this._NotifyMsgCache.empty()) return null;

					var e = this._NotifyMsgCache.front();

					return this._NotifyMsgCache.pop_front(), e;
				}
			}), cc._RF.pop();
		}, {}],
		ToastNode: [function (e, t) {
			"use strict";

			cc._RF.push(t, "9d195X5T/lBFLYeqo/quWpL", "ToastNode"), cc.Class({
				extends: cc.Component,
				properties: {
					contentLabel: cc.Label
				},
				onLoad: function onLoad() {
					this.node.setPosition(cc.v2(320, cc.winSize.height / 2));
				},
				initData: function initData(e) {
					switch (this.contentLabel.string = e.content, e.type) {
						case 0:
							this.runMoveAction();
							break;

						case 1:
							this.runOpacityAction();
					}
				},
				runMoveAction: function runMoveAction() {
					var e = cc.moveTo(1, cc.v2(320, cc.winSize.height / 2 + 200)),
						t = cc.delayTime(.4),
						a = cc.fadeTo(.6, 0),
						s = cc.callFunc(function () {
							this.runEndAction();
						}, this);
					this.node.runAction(cc.sequence(e, t, a, s));
				},
				runOpacityAction: function runOpacityAction() {
					this.node.opacity = 0, this.node.y = 180;
					var e = cc.fadeIn(.2),
						t = cc.fadeTo(.6, 0),
						a = cc.delayTime(1.2),
						s = cc.callFunc(function () {
							this.runEndAction();
						}, this);
					this.node.runAction(cc.sequence(e, a, t, s));
				},
				runEndAction: function runEndAction() {
					this.node.destroy();
				}
			}), cc._RF.pop();
		}, {}],
		TouchPanel: [function (e, t) {
			"use strict";

			cc._RF.push(t, "d8782+j5exGMIGJk1tlI3Zq", "TouchPanel"), cc.Class({
				extends: cc.Component,
				onEnable: function onEnable() {
					this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this, !0), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoved, this, !0), this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnded, this, !0), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this, !0);
				},
				onDisable: function onDisable() {
					this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this, !0), this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoved, this, !0), this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnded, this, !0), this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this, !0);
				},
				setCallbackFunc: function setCallbackFunc(e, t) {
					this._Callback = e, this._TargetEx = t, this._CanTouch = !1;
				},
				onTouchEvent: function onTouchEvent(e, t) {
					if (e.target == e.currentTarget && (this._CanTouch || 1 == t) && this._Callback && this._TargetEx) for (var a = e.getTouches(), s = 0; s < a.length; s++) {
						var c = a[s],
							i = this._Callback.apply(this._TargetEx, [c, t]);

						1 == t && (this._CanTouch = i);
					}
				},
				onTouchBegan: function onTouchBegan(e) {
					e.getCurrentTarget().getComponent("TouchPanel").onTouchEvent(e, 1);
				},
				onTouchMoved: function onTouchMoved(e) {
					e.getCurrentTarget().getComponent("TouchPanel").onTouchEvent(e, 2);
				},
				onTouchEnded: function onTouchEnded(e) {
					e.getCurrentTarget().getComponent("TouchPanel").onTouchEvent(e, 3);
				},
				onTouchCancel: function onTouchCancel(e) {
					e.getCurrentTarget().getComponent("TouchPanel").onTouchEvent(e, 3);
				}
			}), cc._RF.pop();
		}, {}],
		Websocket: [function (e, t) {
			"use strict";

			cc._RF.push(t, "1e6f4WeYMlHV6REW+J2dD82", "Websocket");

			var WebsocketManager = cc.Class({
				// 初始化Websocket
				init: function initialize(webUrl = null, target = null, onConnectedCallback = null, onCloseCallback = null, onReceiveCallback = null, onErrorCallback = null) {
					this._webUrl = webUrl; // Websocket连接地址
					this._target = target; // 目标对象
					this._onConnected = onConnectedCallback; // 连接成功的回调
					this._onClose = onCloseCallback; // 连接关闭的回调
					this._onError = onErrorCallback; // 连接出错的回调
					this._onReceive = onReceiveCallback; // 接收消息的回调
				},

				// 连接Websocket
				Connect: function connectToServer() {
					if (this.IsConnected()) return;
					var self = this;
					this._websocket = tt.connectSocket({
						url: this._webUrl,
						success: (res) => {
							console.log("创建成功", res);
						},
						fail: (res) => {
							console.log("创建失败", res);
						},
					});
					console.log('websocket connect', this._onReceive)
					this._websocket.binaryType = "arraybuffer"; // 设置数据类型为二进制

					// 当连接打开时
					this._websocket.onOpen(res => {
						console.log("WebSocket 已连接");
						self._onConnected && self._onConnected.apply(self._target);
					});

					// 当接收到消息时
					this._websocket.onMessage(function (message) {
						self._onReceive && self._onReceive.apply(self._target, [message.data]);
					});

					// 当连接出错时
					this._websocket.onError(function () {
						console.error("WebSocket 发生错误:", error);
						self._onError && self._onError.apply(self._target);
						self._websocket = null;
					});

					// 当连接关闭时
					this._websocket.onClose(function () {
						console.log("WebSocket 已断开");
						self._onClose && self._onClose.apply(self._target);
						self._websocket = null;
					});
				},

				// 发送消息
				Send: function sendMessage(message) {
					// 如果连接是打开的，发送消息
					console.log('websocket send', { data: message.finish() });
					return this.IsConnected() && (this._websocket.send({ data: message.finish() }), true);
				},

				// 关闭连接
				Close: function closeConnection() {
					this._websocket && this._websocket.close();
					this._websocket = null;
				},

				// 检查是否连接
				IsConnected: function isConnected() {
					console.log('websocket is connected', this._websocket)
					return this._websocket && this._websocket.OPEN == 1;
				}
			});

			t.exports = WebsocketManager;
			cc._RF.pop();
		}, {}],
		game_fanfan: [function (e, t) {
			"use strict";

			cc._RF.push(t, "e3394zh8LREZaM1pW+VutRC", "game_fanfan");

			var a = e("ChessAIFanFan");
			cc.Class({
				extends: cc.Component,
				properties: {
					head_frame: {
						default: null,
						type: cc.Prefab
					},
					chess_color_flag: {
						default: null,
						type: cc.Prefab
					},
					eggPrefab: {
						default: null,
						type: cc.Prefab
					},
					sendBQPrefab: {
						default: null,
						type: cc.Prefab
					},
					gameChatPrefab: {
						default: null,
						type: cc.Prefab
					},
					gameTipBgPrefab: {
						default: null,
						type: cc.Prefab
					},
					game_clock: {
						default: null,
						type: cc.Prefab
					},
					expression_images: {
						default: [],
						type: cc.SpriteFrame
					},
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					},
					eggAudio: {
						default: null,
						type: cc.AudioClip
					},
					readyAudio: {
						default: null,
						type: cc.AudioClip
					},
					startAudio: {
						default: null,
						type: cc.AudioClip
					},
					turnAudio: {
						default: null,
						type: cc.AudioClip
					},
					timerAudio: {
						default: null,
						type: cc.AudioClip
					},
					notEatAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				ctor: function ctor() {
					this._GameStepCount = 0, this._GameActionArr = [];
					var e = cc.AppUtil.isFullScreen() ? 270 : 220;
					this._HeadFramePosArr = [cc.v2(-150, e), null, cc.v2(150, e), null];
				},
				onLoad: function onLoad() {
					this.initGameUI(), this.changeGameState(cc.GameStateType.GameState_Idle);
				},
				start: function start() {
					cc.AppUtil.isFullScreen() && (this._BottomPanel.getChildByName("VS").y += cc.FringeHeight), cc.AppUtil.updateCanvasAlignment();
				},
				onEnable: function onEnable() {
					4 != cc.PlatformType && 5 != cc.PlatformType || cc.AppUtil.showOriginGameAd(!0, !0), cc.AppUtil.isFullScreen() || cc.AppUtil.showWXCustomAd(!1), cc.sys.isNative && cc.sys.OS_ANDROID === cc.sys.os && jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "sdkShowOriginAD", "(Z)V", !0);
				},
				onDisable: function onDisable() {
					4 != cc.PlatformType && 5 != cc.PlatformType || cc.AppUtil.showOriginGameAd(!1), cc.sys.isNative && cc.sys.OS_ANDROID === cc.sys.os && jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "sdkShowOriginAD", "(Z)V", !1), this._ChessBoard.clearGameChess();
				},
				update: function update() {
					if (!this._ChessBoard.isMovingGameChess()) if (this._GameActionArr.empty()) this._ChessAI && (this._ChessAI.getChessAIPrepare() ? this._ChessAI.thinkChess() : this._ChessAI.update()); else {
						var e = this._GameActionArr.front();

						this._GameActionArr.pop_front(), this.doGameChessAction(e, !0, !0, !0), this.updateShowGameStep();
					}
				},
				getChessBoard: function getChessBoard() {
					return this._ChessBoard;
				},
				onGameEggEnd: function onGameEggEnd(e, t) {
					e.children && (e.setScale(1.2), e.setPosition(this._EggGameBtnPos), e.angle = 0, e.opacity = 255, this.initGameEggBtn(), cc.Websocket.Send(cc.ClientProtocol.GameEgg(t)));
				},
				onTouchEvent: function onTouchEvent(e, t) {
					if (this._PrePoint = this._CurPoint, this._CurPoint = this.node.convertToNodeSpaceAR(e.getLocation()), 1 == t) return this._GameState == cc.GameStateType.GameState_Playing && this._ChessBoard.onTouchEvent(e, t), this._EggGameBtn.getBoundingBox().contains(this._CurPoint) ? (this._EggGameBtn.setScale(2), !0) : (this._SendBQ.hideBQPanel(), this._GameChat.hideChatBQPanel(), !1);

					if (2 == t) {
						var a = this._EggGameBtn.getPosition();

						this._EggGameBtn.setPosition(a.add(this._CurPoint.sub(this._PrePoint)));
					}

					if (3 == t) {
						for (var s = 0; s < this._HeadFrames.length; s++) {
							if (null != this._HeadFrames[s]) {
								var c = this._HeadFrames[s].getBoundingBox(),
									i = this._BottomPanel.convertToNodeSpaceAR(e.getLocation());

								if (c.contains(i)) {
									if (this._SeatID == s) {
										cc.AppUtil.showToast("\u4EB2\uFF0C\u4E0D\u80FD\u5BF9\u81EA\u5DF1\u7838\u9E21\u86CB\u54E6\uFF01");
										break;
									}

									if (cc.GameCache.getEggCount() <= 0) {
										cc.AppUtil.showToast("\u4EB2\u3001\u60A8\u5F53\u524D\u9E21\u86CB\u4E2A\u6570\u4E3A\u96F6\uFF01");
										break;
									}

									cc.GameCache.addEggCount(-1), this._EggGameBtn.stopAllActions();
									var n = cc.spawn(cc.scaleTo(.3, .1), cc.fadeOut(.3)),
										o = cc.sequence(n, cc.callFunc(this.onGameEggEnd, this, s + 1));
									return void this._EggGameBtn.runAction(o);
								}
							}
						}

						this._EggGameBtn.runAction(cc.spawn(cc.moveTo(.1, this._EggGameBtnPos), cc.scaleTo(.1, 1.2)));
					}
				},
				initGameUI: function initGameUI() {
					cc.winSize.height > 1136 && (this.node.getChildByName("GameBg").scaleY = cc.winSize.height / 1136);
					var e = this.node.getChildByName("Top");
					cc.AppUtil.isFullScreen() && (e.height += cc.FringeHeight), this._GameStepText = e.getChildByName("TextBg").getChildByName("Text").getComponent(cc.Label), this._BottomPanel = this.node.getChildByName("Bottom"), this._ChessBoard = this.node.getChildByName("ChessBoard").getComponent("ChessBoardFanFan"), this._GameStepTip = this._ChessBoard.node.getChildByName("GameStepTip").getChildByName("Count").getComponent(cc.Label), this._SendBQ = cc.instantiate(this.sendBQPrefab).getComponent("SendBQ"), this.node.addChild(this._SendBQ.node), this._GameChat = cc.instantiate(this.gameChatPrefab).getComponent("GameChat"), this.node.addChild(this._GameChat.node), this._GameClock = cc.instantiate(this.game_clock).getComponent(cc.Component), this._BottomPanel.addChild(this._GameClock.node), this._GameClock.node.zIndex = cc.macro.MAX_ZINDEX, this.node.getChildByName("TouchBg").getComponent("TouchPanel").setCallbackFunc(this.onTouchEvent, this), this._Ready = this._BottomPanel.getChildByName("Ready"), this._TipBg = cc.instantiate(this.gameTipBgPrefab), this._ChessBoard.node.addChild(this._TipBg), this._HeadFrames = [];

					for (var t = 0; t < 4; t++) {
						if (1 == t || 3 == t) this._HeadFrames.push(null); else {
							var a = cc.instantiate(this.head_frame);
							this._BottomPanel.addChild(a), a.setScale(.8), this._HeadFrames.push(a.getComponent("HeadFrame"));
							var s = cc.instantiate(this.chess_color_flag);
							a.addChild(s), s.scale = 1.5, s.zIndex = cc.macro.MIN_ZINDEX;
						}
					}

					this.initGameEggBtn(), this.showGameEggTip(), this.initGameButton(), this.updateShowGameStep();
				},
				changeGameState: function changeGameState(e, t) {
					switch (e) {
						case cc.GameStateType.GameState_Idle:
							for (var a = 0; a < 4; a++) {
								this._GameBtnsArr[a].active = a >= 3, this._GameBtnsArr[a].getComponent(cc.Button).interactable = !0;
							}

							this._GameStepCount = 0, this._GameActionArr.clear(), this._GameClock.node.active = !1, this._GameStepTip.node.parent.active = !1, this._BtnWXShare.active = !1, cc.PlatformType >= 0 && cc.PlatformType <= 3 && (2 != cc.PlatformType || 1 == cc.GameTrick) && (this._BtnWXShare.active = !0, this._BtnWXShare.getChildByName("Background").getChildByName(["WX", "WX", "QQ", "TT"][cc.PlatformType]).active = !0), this._Ready.active = !1, this._TipBg.active = !1, this._ChessBoard.clearGameChess(), this.updateShowGameStep(), this.hideHeadFrameHint(!0), this.showGameEggBtn(!0), this.onUpdateSkipCount(5), this._ChessAI = null;
							break;

						case cc.GameStateType.GameState_Ready:
							for (a = 0; a < 4; a++) {
								this._GameBtnsArr[a].active = !1;
							}

							this._Ready.active = !0;
							break;

						case cc.GameStateType.GameState_Playing:
							for (a = 0; a < 4; a++) {
								this._GameBtnsArr[a].getComponent(cc.Button).interactable = a < 3, this._GameBtnsArr[a].active = a < 3, this._GameBtnsArr[a].opacity = 255, (1 == a && 0 == parseInt(this._SkipLabel.string) || 2 == a && this._GameStepCount < 20 || 0 == a && this._AskForPeaceCount > 5) && (this._GameBtnsArr[a].opacity = 100, this._GameBtnsArr[a].getComponent(cc.Button).interactable = !1);
							}

							this._Ready.active = !1, this._BtnWXShare.active = !1;
							break;

						case cc.GameStateType.GameState_PlayingWait:
							for (a = 0; a < 3; a++) {
								this._GameBtnsArr[a].active = !0, this._GameBtnsArr[a].opacity = 100, this._GameBtnsArr[a].getComponent(cc.Button).interactable = !1;
							}

							this._Ready.active = !1, this._BtnWXShare.active = !1;
							break;

						case cc.GameStateType.GameState_Review:
							for (a = 0; a < 4; a++) {
								this._GameBtnsArr[a].active = !1;
							}

							this._Ready.active = !1, this._BtnWXShare.active = !1, this._SendBQ.node.active = !1, this._GameChat.node.active = !1;
							var s = this;
							cc.AppUtil.addPrefabToNode("GameReviewCtrl", this._BottomPanel, cc.v2(0, 50), null, null, function (e) {
								e.getComponent(cc.Component).showGameSteps(s, t);
							});
					}

					this._GameState = e, this._ChessBoard.cancelChessSelected();
				},
				showGameEggTip: function showGameEggTip() {
					var e = this.node.getChildByName("EggTip");
					if (cc.AppUtil.isFullScreen()) for (var t = [e, this._EggGameBtn], a = 0; a < t.length; a++) {
						var s = t[a].getComponent(cc.Widget);
						s.top += cc.FringeHeight, s.updateAlignment();
					}

					if (this._EggGameBtn.getComponent(cc.Widget).updateAlignment(), this._EggGameBtnPos = this._EggGameBtn.getPosition(), cc.EggSpriteTip) {
						var c = cc.scaleTo(.3, 1.2),
							i = cc.scaleTo(.3, 1),
							n = cc.fadeOut(.5);
						e.runAction(cc.sequence(c, i, c, i, c, i, n, cc.callFunc(cc.AppUtil.onDestroyFromParent, cc.AppUtil)));
					} else e.destroy();
				},
				initGameEggBtn: function initGameEggBtn() {
					this._EggGameBtn = this.node.getChildByName("EggSprite");
					var e = cc.rotateBy(.1, 10),
						t = cc.rotateBy(.2, -20),
						a = cc.rotateBy(.2, 20),
						s = cc.rotateBy(.1, -10),
						c = cc.delayTime(1);
					this._EggGameBtn.runAction(cc.repeatForever(cc.sequence(e, t, a, s, c))), this._EggGameBtn.getChildByName("Label").getComponent(cc.Label).string = cc.GameCache.getEggCount().toString();
				},
				initGameButton: function initGameButton() {
					var e = this;
					this._GameBtnsArr = [];

					for (var t = 1; t <= 4; t++) {
						var a = this._BottomPanel.getChildByName("Btn_" + t);

						a.name = t.toString(), a.on("click", function (t) {
							switch (parseInt(t.node.name)) {
								case 1:
									cc.Websocket.Send(cc.ClientProtocol.RequestPeace()), cc.AppUtil.showToast("\u6210\u529F\u53D1\u9001\u8BF7\u6C42\u5E73\u5C40\uFF01"), t.interactable = !1, t.node.opacity = 100, e._AskForPeaceCount++;
									break;

								case 2:
									cc.Websocket.Send(cc.ClientProtocol.SkipChess()), e.changeGameState(cc.GameStateType.GameState_PlayingWait);
									break;

								case 3:
									cc.AppUtil.showModal("\u60A8\u786E\u5B9A\u8981\u7F34\u68B0\u6295\u964D\uFF1F", function (e) {
										e && (cc.Websocket.Send(cc.ClientProtocol.Surrender()), t.interactable = !1);
									}, !0);
									break;

								case 4:
									e.changeGameState(cc.GameStateType.GameState_Ready), cc.Websocket.Send(cc.ClientProtocol.GameReady([], cc.GameCache.getDoubleScoreCount() > 0 ? 1 : 0, cc.GameCache.getProtectScoreCount() > 0 ? 1 : 0)), cc.AppUtil.playAudioEffect(e.readyAudio);
							}
						}), this._GameBtnsArr.push(a), 2 == t && (this._SkipLabel = a.getChildByName("Background").getChildByName("Label_Number").getComponent(cc.Label));
					}

					var s = this.node.getChildByName("Top").getChildByName("BtnBack");
					s.on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), e._GameState >= cc.GameStateType.GameState_Playing ? 3 == e.getMinePlayerState() ? cc.AppUtil.showModal("\u60A8\u662F\u5426\u8981\u5F3A\u884C\u9000\u51FA\u6E38\u620F\uFF1F(\u62634\u5206)", function (e) {
							e && cc.MainGame.leaveGame(!0);
						}, !0) : (cc.GameCache.getProtectScoreCount() > 0 && cc.GameCache.addProtectScoreCount(-1), cc.MainGame.leaveGame(!0)) : cc.MainGame.leaveGame(!0);
					}), cc.AppUtil.isFullScreen() && (s.y -= .8 * cc.FringeHeight), this._BtnWXShare = this.node.getChildByName("BtnInvite"), this._BtnWXShare.on("click", function () {
						cc.AppUtil.shareAppMessageNormal();
					}), cc.AppUtil.isFullScreen() && (this._BtnWXShare.getComponent(cc.Widget).top += cc.FringeHeight);
				},
				showGameEggBtn: function showGameEggBtn(e) {
					this._EggGameBtn.active = e;
				},
				updateShowGameStep: function updateShowGameStep() {
					this._GameStepText.string = cc.js.formatStr("\u7B2C %d \u6B65", this._GameStepCount);
				},
				updateGameStepTip: function updateGameStepTip(e) {
					if (this._GameState != cc.GameStateType.GameState_Review) {
						var t = this._ChessBoard.getNotEatChessCount();

						this._GameStepTip.string = (40 - t).toString(), this._GameStepTip.node.parent.active = t >= 20, 20 == t && (e && cc.audioEngine.playEffect(this.notEatAudio), this._GameStepTip.node.parent.stopAllActions(), this._GameStepTip.node.parent.opacity = 0, this._GameStepTip.node.parent.runAction(cc.fadeIn(.5)));
					}
				},
				showGameChessCamp: function showGameChessCamp(e, t) {
					if (this._HeadFrames[this._SeatID].node.getChildByName("ChessColorFlag").getComponent("ChessColorFlag").showChessFlagColor(e), this._HeadFrames[2 - this._SeatID].node.getChildByName("ChessColorFlag").getComponent("ChessColorFlag").showChessFlagColor(3 - e), t) {
						var a = this._TipBg.getComponent(cc.Animation),
							s = a.play("GameFlipTipBg");

						a.on("finished", function () {
							s.time = 0, s.sample(), a.node.active = !1;
						}), cc.AppUtil.playAudioEffect(this.turnAudio);
					} else this._TipBg.active = !1;

					this.checkGameChessAI(), this._ChessAI && this._ChessAI.setAIColor(3 - e);
				},
				updateHeadFramePosition: function updateHeadFramePosition(e) {
					var t = this.getLocalPlayerSeat(e);
					this._HeadFrames[e].node.setPosition(this._HeadFramePosArr[t]), this._HeadFrames[e].node.getChildByName("ChessColorFlag").setPosition([-80, 0, 80, 0][t], 30);
				},
				getMineSeatID: function getMineSeatID() {
					return this._SeatID;
				},
				getLocalPlayerSeat: function getLocalPlayerSeat(e) {
					return (e - this._SeatID + 4) % 4;
				},
				initRoomData: function initRoomData(e, t) {
					this._SeatID = e - 1, this._ChessAI = null;

					for (var a = 0; a < t.pool.length; a++) {
						var s = t.pool[a];
						this._HeadFrames[s.seat - 1].addPlayer(s), this._HeadFrames[s.seat - 1].updatePlayerState(s.state), e == s.seat && this._HeadFrames[s.seat - 1].showHeadCampFlag(1), this.updateHeadFramePosition(s.seat - 1);
					}
				},
				initGameQiPanState: function initGameQiPanState() {
					this._ChessBoard.clearGameChess(), this._ChessBoard.initGameQiPan(this._ChessDataArr.clone()), this._GameStepCount = 0;
				},
				initGameDataSteps: function initGameDataSteps(e, t, a) {
					if (null != e) if (this.doGameStartAction(e), cc.GameViewMode) this.changeGameState(cc.GameStateType.GameState_Review, t); else {
						for (var s = 0; s < t.pool.length; s++) {
							this.doGameChessAction(t.pool[s], !1, !1, !1);
						}

						this.updateShowGameStep(), this.onGameTurn(a, 5);
					}
				},
				hideHeadFrameHint: function hideHeadFrameHint(e) {
					for (var t = 0; t < this._HeadFrames.length; t++) {
						null != this._HeadFrames[t] && (this._HeadFrames[t].hideHeadFrameHint(), e && this._HeadFrames[t].node.getChildByName("ChessColorFlag").getComponent("ChessColorFlag").hideChessFlagColor());
					}
				},
				checkGameChessAI: function checkGameChessAI() {
					for (var e = 0; e < this._HeadFrames.length; e++) {
						if (null != this._HeadFrames[e]) {
							var t = this._HeadFrames[e].getPlayer();

							t && 1 == t.robot && null == this._ChessAI && (this._ChessAI = new a(this._ChessBoard));
						}
					}
				},
				addPlayer: function addPlayer(e) {
					this._HeadFrames[e.seat - 1].addPlayer(e), this.updateHeadFramePosition(e.seat - 1), this.updatePlayerState(e.seat, e.state);
				},
				delPlayer: function delPlayer(e) {
					this._HeadFrames[e - 1].delPlayer(), this._HeadFrames[e - 1].showLeaveEffect();
				},
				updatePlayerState: function updatePlayerState(e, t) {
					this._HeadFrames[e - 1].updatePlayerState(t);
				},
				getMinePlayerState: function getMinePlayerState() {
					var e = this._HeadFrames[this._SeatID].getPlayer();

					return e ? e.state : -1;
				},
				exchangePlayerSeat: function exchangePlayerSeat() { },
				showGameRecorderMgr: function showGameRecorderMgr() {
					if (3 == cc.PlatformType) {
						this._TempVideoPath = null, this._IsVideoRecord = !0;
						var e = this,
							t = wx.getGameRecorderManager();
						t.onError(function () {
							e._IsVideoRecord = !1;
						}), t.onStop(function (a) {
							t.clipVideo({
								path: a.videoPath,
								timeRange: [15, 0],
								success: function success(t) {
									e._IsVideoRecord ? e._TempVideoPath = t.videoPath : e.onGameOverEx(e._GameResListEx, t.videoPath), e._IsVideoRecord = !1;
								},
								fail: function fail() {
									e._IsVideoRecord = !1;
								}
							});
						}), t.start({
							duration: 300
						});
					}
				},
				onGameStart: function onGameStart(e) {
					this.doGameStartAction(e), this.showGameRecorderMgr(), cc.AppUtil.addPrefabToNode("GameStartEffect", this.node), cc.audioEngine.stopAllEffects(), cc.AppUtil.playAudioEffect(this.startAudio);
				},
				doGameStartAction: function doGameStartAction(e) {
					this.showGameEggBtn(!1), this._ChessDataArr = e.pool[0].convertToArray();
					console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this._ChessDataArr, e.pool, e.pool[0].convertToArray())
					for (var t = 0; t < this._HeadFrames.length; t++) {
						null != this._HeadFrames[t] && this._HeadFrames[t].updatePlayerState(3);
					}

					this.initGameQiPanState(), this.changeGameState(cc.GameStateType.GameState_PlayingWait), this._AskForPeaceCount = 0, this._TipBg.active = !0;
				},
				onGameTurn: function onGameTurn(e, t) {
					this.hideHeadFrameHint(!1), this._HeadFrames[e].showHeadFrameHint();

					var a = this._HeadFrames[e].node.getPosition();

					this._GameClock.node.active = !0, this._GameClock.node.setPosition(a.x, a.y + (cc.AppUtil.isFullScreen() ? 50 : 0)), this._GameClock.node.setScale(.8), this._GameClock.startTimer(t), this.changeGameState(this._SeatID == e ? cc.GameStateType.GameState_Playing : cc.GameStateType.GameState_PlayingWait), this._SeatID == e && cc.AppUtil.vibrateShort();

					var s = this._HeadFrames[e].getPlayer();

					s && 1 == s.robot && (this.checkGameChessAI(), this._ChessAI.prepareThinkChess());
				},
				onRequestPeace: function onRequestPeace(e) {
					cc.AppUtil.addPrefabToNode("AlertView", null, null, null, null, function (t) {
						var a = t.getComponent("AlertView");
						a.showAlertView(cc.js.formatStr("\u3010<color=#00ff00>%s</c>\u3011\u8BF7\u6C42\u5E73\u5C40\uFF01", e), function (e) {
							cc.Websocket.Send(cc.ClientProtocol.RequestPeaceRet(e ? 1 : 0));
						}, !0), a.setButtonsText(["\u540C\u610F", "\u62D2\u7EDD"]);
					});
				},
				onRejectPeace: function onRejectPeace(e) {
					cc.AppUtil.showModal(cc.js.formatStr("\u3010<color=#00ff00>%s</c>\u3011\u62D2\u7EDD\u4E86\u60A8\u7684\u8BF7\u6C42\uFF01", e), null, !1);
				},
				onUpdateSkipCount: function onUpdateSkipCount(e) {
					this._SkipLabel.string = e.toString();
				},
				doGameChessAction: function doGameChessAction(e, t, a) {
					t && this._ChessBoard.isMovingGameChess() && (t = !1, a = !1);
					var s = e.pool[0].value,
						c = s >> 4 & 15,
						i = s >> 0 & 15;
					if (0 == i) t ? this._ChessBoard.showMoveChess(e) : this._ChessBoard.setMoveGameChess(e), this._GameStepCount++; else if (1 == i || 2 == i) {
						if (a) {
							var n = cc.js.formatStr(['%s 使用跳过（满5次将自动认输）。', '%s 已经超时（满5次将自动认输）。'][i - 1], this._HeadFrames[c].getPlayerName());
							cc.AppUtil.showToast(n);
						}

						this._ChessBoard.updateFlipChessColor();
					}
				},
				onGameAction: function onGameAction(e) {
					this._GameActionArr.push(e);
				},
				onGameOverEx: function onGameOverEx(e, t) {
					var a = this;
					cc.AppUtil.addPrefabToNode("GameResult", this.node, null, null, null, function (s) {
						var c = s.getComponent(cc.Component);
						c.showGameResult(e, a._SeatID, null), 3 == cc.PlatformType && c.setBtnVideoShare(t);
					});

					for (var s = 0; s < this._HeadFrames.length; s++) {
						if (null != this._HeadFrames[s]) {
							var c = this._HeadFrames[s].getPlayer();

							null != c && (5 == c.state || 6 == c.state ? this._HeadFrames[s].delPlayer(s) : this._HeadFrames[s].updatePlayerState(1));
						}
					}

					this.changeGameState(cc.GameStateType.GameState_Idle);
				},
				onGameOver: function onGameOver(e) {
					3 == cc.PlatformType ? this._IsVideoRecord ? (this._GameResListEx = e, this._IsVideoRecord = !1, wx.getGameRecorderManager().stop()) : this.onGameOverEx(e, this._TempVideoPath) : this.onGameOverEx(e, null);
				},
				onGameChat: function onGameChat(e, t) {
					cc.AppUtil.showExpression(this._HeadFrames[e - 1].node, this.expression_images[t - 1], 1.2);
				},
				onGameChatText: function onGameChatText(e, t) {
					cc.AppUtil.addPrefabToNode("GameChatText", this._HeadFrames[e - 1].node, cc.v2(0, 80), null, 3.5, function (e) {
						e.getChildByName("Label").getComponent(cc.Label).string = t;
					});
				},
				onKickGameMsg: function onKickGameMsg(e) {
					cc.MainGame.leaveGame(!0, function () {
						cc.AppUtil.showModal(e, function () {
							cc.Canvas.instance.node.emit("game_shop_guide");
						}, !1);
					});
				},
				onGameEgg: function onGameEgg(e) {
					var t = this,
						a = cc.instantiate(this.eggPrefab);
					this._BottomPanel.addChild(a), a.setPosition(this._HeadFrames[e - 1].node.getPosition()), a.getComponent(cc.Animation).on("finished", function () {
						a.destroy(), e - 1 == t._SeatID && cc.MainGame.leaveGame(!1, function () {
							cc.AppUtil.showModal("\u60A8\u88AB\u5176\u4ED6\u73A9\u5BB6\u8E22\u51FA\u4E86\u623F\u95F4\uFF01", function () {
								cc.AppUtil.showWXGameInterstitialAd();
							}, !1);
						});
					}), cc.AppUtil.playAudioEffect(this.eggAudio), cc.AppUtil.vibrateShort();
				}
			}), cc._RF.pop();
		}, {
			ChessAIFanFan: "ChessAIFanFan"
		}],
		game: [function (e, t) {
			"use strict";

			cc._RF.push(t, "17dd5sa1a5NlpUy3MZu+Phi", "game");

			var a = e("ChessAI");
			cc.Class({
				extends: cc.Component,
				properties: {
					head_frame: {
						default: null,
						type: cc.Prefab
					},
					eggPrefab: {
						default: null,
						type: cc.Prefab
					},
					sendBQPrefab: {
						default: null,
						type: cc.Prefab
					},
					gameChatPrefab: {
						default: null,
						type: cc.Prefab
					},
					game_clock: {
						default: null,
						type: cc.Prefab
					},
					expression_images: {
						default: [],
						type: cc.SpriteFrame
					},
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					},
					tapAudio: {
						default: null,
						type: cc.AudioClip
					},
					eggAudio: {
						default: null,
						type: cc.AudioClip
					},
					readyAudio: {
						default: null,
						type: cc.AudioClip
					},
					d_readyAudio: {
						default: null,
						type: cc.AudioClip
					},
					startAudio: {
						default: null,
						type: cc.AudioClip
					},
					d_startAudio: {
						default: null,
						type: cc.AudioClip
					},
					timerAudio: {
						default: null,
						type: cc.AudioClip
					},
					notEatAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				ctor: function ctor() {
					this._GameStepCount = 0, this._GameActionArr = [], this._HeadFramePosArr = [cc.v2(220, -220), cc.v2(220, 260), cc.v2(-220, 260), cc.v2(-220, -220)];
				},
				onLoad: function onLoad() {
					this._ChessBoard = this.node.getChildByName("ChessBoard").getComponent("ChessBoard"), this._SendBQ = cc.instantiate(this.sendBQPrefab).getComponent("SendBQ"), this.node.addChild(this._SendBQ.node), this._GameChat = cc.instantiate(this.gameChatPrefab).getComponent("GameChat"), this.node.addChild(this._GameChat.node), this._GameClock = cc.instantiate(this.game_clock).getComponent(cc.Component), this.node.addChild(this._GameClock.node), this.initGameUI(), this.changeGameState(cc.GameStateType.GameState_Idle);
				},
				start: function start() {
					cc.AppUtil.updateCanvasAlignment();
				},
				onEnable: function onEnable() {
					4 != cc.PlatformType && 5 != cc.PlatformType || cc.AppUtil.showOriginGameAd(!0, !0), cc.AppUtil.showWXCustomAd(!0), cc.sys.isNative && cc.sys.OS_ANDROID === cc.sys.os && jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "sdkShowOriginAD", "(Z)V", !0);
				},
				onDisable: function onDisable() {
					4 != cc.PlatformType && 5 != cc.PlatformType || cc.AppUtil.showOriginGameAd(!1), cc.sys.isNative && cc.sys.OS_ANDROID === cc.sys.os && jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "sdkShowOriginAD", "(Z)V", !1), this._ChessBoard.clearChessBoard();
				},
				update: function update() {
					// 检查棋子是否正在移动
					if (!this._ChessBoard.isMovingGameChess()) {

						// 检查游戏动作队列是否为空
						if (this._GameActionArr.empty()) {

							// 如果存在Chess AI
							if (this._ChessAI) {
								// 如果Chess AI已经准备好，让它思考下一步动作
								if (this._ChessAI.getChessAIPrepare()) {
									this._ChessAI.thinkChess();
								} else {
									// 否则，更新Chess AI的状态
									this._ChessAI.update();
								}
							}
						} else {
							// 从队列前端获取下一个游戏动作
							var e = this._GameActionArr.front();

							// 从队列前端移除动作
							this._GameActionArr.pop_front();

							// 执行游戏棋子动作
							this.doGameChessAction(e, true, true, true);

							// 更新显示的游戏步骤
							this.updateShowGameStep();
						}
					}
				},
				initChessData: function initChessData() {
					this._ChessDataArr = [[], [], [], []];

					for (var e = 0; e < this._ChessDataArr.length; e++) {
						this._ChessDataArr[e].initial(25, 0);
					}

					this._Battle = 0;
				},
				getChessBoard: function getChessBoard() {
					return this._ChessBoard;
				},
				onGameEggEnd: function onGameEggEnd(e, t) {
					e.children && (e.setScale(1.2), e.setPosition(this._EggGameBtnPos), e.angle = 0, e.opacity = 255, this.initGameEggBtn(), cc.Websocket.Send(cc.ClientProtocol.GameEgg(t)));
				},
				onTouchEvent: function onTouchEvent(e, t) {
					if (this._PrePoint = this._CurPoint, this._CurPoint = this.node.convertToNodeSpaceAR(e.getLocation()), 1 == t) {
						if (this._TouchTargetMode = 0, this._EggGameBtn.getBoundingBox().contains(this._CurPoint)) return this._EggGameBtn.setScale(2), this._TouchTargetMode = 1, !0;
						if (this._ChessBoard.onTouchEvent(e, t)) return this._TouchTargetMode = 2, this._ChessBoardPos = this._ChessBoard.node.getPosition(), !0;

						if (this._CommonBtnBg.x < 320) {
							var a = this._CommonBtnBg.getChildByName("BtnBack").getComponent(cc.Button);

							a.node.emit("click", a);
						}

						return this._SendBQ.hideBQPanel(), this._GameChat.hideChatBQPanel(), !1;
					}

					if (2 == t) {
						if (1 == this._TouchTargetMode) {
							var s = this._EggGameBtn.getPosition();

							this._EggGameBtn.setPosition(s.add(this._CurPoint.sub(this._PrePoint)));
						}

						2 == this._TouchTargetMode && (this._GameState != cc.GameStateType.GameState_Playing && this._GameState != cc.GameStateType.GameState_Idle && this._GameState != cc.GameStateType.GameState_GameLayout || !cc.isIPADScreen && cc.GameCache.getSettingOptionValue(3) && ((s = this._ChessBoard.node.getPosition()).addSelf(this._CurPoint.sub(this._PrePoint)), s.x > 190 && (s.x = 190), s.x < -190 && (s.x = -190), this._ChessBoard.node.setPosition(s), s.sub(this._ChessBoardPos).mag() > 10 && this._ChessBoard.clearSelectChessCache()));
					}

					if (3 == t) {
						if (1 == this._TouchTargetMode) {
							for (var c = 0; c < this._HeadFrames.length; c++) {
								if (null != this._HeadFrames[c] && this._HeadFrames[c].getBoundingBox().contains(this._CurPoint)) {
									if (this._SeatID == c || 10 == cc.GameRoomType && this._SeatID == this._ChessBoard.getTeamChessColor(c)) {
										cc.AppUtil.showToast("\u4EB2\uFF0C\u4E0D\u80FD\u5BF9\u81EA\u5DF1\u7838\u9E21\u86CB\u54E6\uFF01");
										break;
									}

									if (cc.GameCache.getEggCount() <= 0) {
										cc.AppUtil.showToast("\u4EB2\u3001\u60A8\u5F53\u524D\u9E21\u86CB\u4E2A\u6570\u4E3A\u96F6\uFF01");
										break;
									}

									cc.GameCache.addEggCount(-1), this._EggGameBtn.stopAllActions(), 10 == cc.GameRoomType && c > 1 && (c = this._ChessBoard.getTeamChessColor(c));
									var i = cc.spawn(cc.scaleTo(.3, .1), cc.fadeOut(.3)),
										n = cc.sequence(i, cc.callFunc(this.onGameEggEnd, this, c + 1));
									return void this._EggGameBtn.runAction(n);
								}
							}

							this._EggGameBtn.runAction(cc.spawn(cc.moveTo(.1, this._EggGameBtnPos), cc.scaleTo(.1, 1.2)));
						}

						2 == this._TouchTargetMode && this._ChessBoard.onTouchEvent(e, t);
					}
				},
				initGameUI: function initGameUI() {
					var e = this.node.getChildByName("Top");
					cc.AppUtil.isFullScreen() && (e.height += cc.FringeHeight), this._GameStepText = e.getChildByName("TextBg").getChildByName("Text").getComponent(cc.Label), this._BottomPanel = this.node.getChildByName("Bottom"), this._GameStepTip = this._BottomPanel.getChildByName("GameStepTip").getChildByName("Count").getComponent(cc.Label), this._GameSwapTip = this._ChessBoard.node.getChildByName("GameSwapTip"), this._GameSwapTip.zIndex = cc.macro.MAX_ZINDEX, this._HeadFrames = [];

					for (var t = this.node.getChildByName("GamePanel"), a = 0; a < 4; a++) {
						if (1 != a && 3 != a || 3 != cc.GameRoomType) {
							var s = cc.instantiate(this.head_frame);
							t.addChild(s), s.setScale(.85), this._HeadFrames.push(s.getComponent("HeadFrame")), this._HeadFrames.back().setChessColor(a);
						} else this._HeadFrames.push(null);
					}

					t.getComponent("TouchPanel").setCallbackFunc(this.onTouchEvent, this), this.initGameEggBtn(), this.showGameEggTip(), this.initGameButton(), this.updateShowGameStep();
				},
				changeGameState: function changeGameState(e, t) {
					if (this._GameState != cc.GameStateType.GameState_Watching) {
						switch (e) {
							case cc.GameStateType.GameState_Idle:
								this.initChessData();

								for (var a = 0; a < 5; a++) {
									this._GameBtnsArr[a].active = a >= 3, this._GameBtnsArr[a].getComponent(cc.Button).interactable = !0;
								}

								if (this._BottomPanel.getChildByName("Ready").active = !1, this._GameStepCount = 0, this._AskForPeaceCount = 0, this._GameActionArr.clear(), this._GameClock.node.active = !1, this._GameStepTip.node.parent.active = !1, this._BtnWXShare.active = !1, this._GameSwapTip.active = 9 != cc.GameRoomType, cc.PlatformType >= 0 && cc.PlatformType <= 3 && (2 != cc.PlatformType || 1 == cc.GameTrick)) {
									this._BtnWXShare.active = !0;
									var s = ["WX", "WX", "QQ", "TT"];
									this._BtnWXShare.getChildByName("Background").getChildByName(s[cc.PlatformType]).active = !0;
								}

								9 == cc.GameRoomType && (this._GameBtnsArr[3].x = this._GameBtnsArr[4].x = 0, this._GameBtnsArr[4].active = !1, cc.AppUtil.getChildByNameLoop("Label", this._GameBtnsArr[3]).getComponent(cc.Label).string = "\u6E38\u620F\u51C6\u5907"), this.updateShowGameStep(), this.hideHeadFrameHint(), this.showGameEggBtn(!0), this.onUpdateSkipCount(5), this._ChessAI = null;
								break;

							case cc.GameStateType.GameState_Ready:
								for (a = 0; a < 5; a++) {
									this._GameBtnsArr[a].active = !1;
								}

								this._BottomPanel.getChildByName("Ready").active = !0, this._GameSwapTip.active = !1;
								break;

							case cc.GameStateType.GameState_Playing:
								for (a = 0; a < 5; a++) {
									this._GameBtnsArr[a].getComponent(cc.Button).interactable = a < 3, this._GameBtnsArr[a].active = a < 3, this._GameBtnsArr[a].opacity = 255, (1 == a && 0 == parseInt(this._SkipLabel.string) || 2 == a && this._GameStepCount < 20 || 0 == a && this._AskForPeaceCount > 5) && (this._GameBtnsArr[a].opacity = 100, this._GameBtnsArr[a].getComponent(cc.Button).interactable = !1);
								}

								this._BottomPanel.getChildByName("Ready").active = !1, this._BtnWXShare.active = !1, this._GameSwapTip.active = !1;
								break;

							case cc.GameStateType.GameState_PlayingWait:
								for (a = 0; a < 3; a++) {
									this._GameBtnsArr[a].active = !0, this._GameBtnsArr[a].opacity = 100, this._GameBtnsArr[a].getComponent(cc.Button).interactable = !1;
								}

								for (a = 3; a < 5; a++) {
									this._GameBtnsArr[a].active = !1;
								}

								this._BottomPanel.getChildByName("Ready").active = !1, this._BtnWXShare.active = !1, this._GameSwapTip.active = !1;
								break;

							case cc.GameStateType.GameState_GameLayout:
								this._BottomPanel.getChildByName("Ready").active = !1, this._BtnWXShare.active = !1, this._GameBtnsArr[4].active = !0, this._GameSwapTip.active = !0;
								break;

							case cc.GameStateType.GameState_Review:
							case cc.GameStateType.GameState_Watching:
								for (a = 0; a < 5; a++) {
									this._GameBtnsArr[a].active = !1;
								}

								if (this._BottomPanel.getChildByName("Ready").active = !1, this.node.getChildByName("SendBQ").active = !1, this.node.getChildByName("GameChat").active = !1, this._BtnWXShare.active = !1, this._CommonBtnBg.active = !1, this._GameSwapTip.active = !1, e == cc.GameStateType.GameState_Review) {
									var c = this;
									cc.AppUtil.addPrefabToNode("GameReviewCtrl", this._BottomPanel, cc.v2(0, 50), null, null, function (e) {
										e.getComponent(cc.Component).showGameSteps(c, t);
									});
								} else {
									for (a = 0; a < 3; a++) {
										this._GameBtnsArr[a].active = !0, this._GameBtnsArr[a].opacity = 100, this._GameBtnsArr[a].getComponent(cc.Button).interactable = !1;
									}

									for (s = this._SkipLabel.node.parent.children, a = 0; a < s.length; a++) {
										-1 != s[a].name.indexOf("_") ? s[a].active = !1 : s[a].x += 18;
									}
								}

						}

						this._GameState = e, this._ChessBoard.setChessBoardLookMode(!1), this._ChessBoard.cancelChessSelected(), this._ChessBoard.clearSelectChessCache();
					} else e == cc.GameStateType.GameState_Idle && (this._GameClock.node.active = !1, this.hideHeadFrameHint());
				},
				showGameEggTip: function showGameEggTip() {
					var e = this.node.getChildByName("EggTip");
					if (cc.AppUtil.isFullScreen()) for (var t = [e, this._EggGameBtn], a = 0; a < t.length; a++) {
						var s = t[a].getComponent(cc.Widget);
						s.top += cc.FringeHeight, s.updateAlignment();
					}

					if (this._EggGameBtn.getComponent(cc.Widget).updateAlignment(), this._EggGameBtnPos = this._EggGameBtn.getPosition(), cc.EggSpriteTip) {
						var c = cc.scaleTo(.3, 1.2),
							i = cc.scaleTo(.3, 1),
							n = cc.fadeOut(.5);
						e.runAction(cc.sequence(c, i, c, i, c, i, n, cc.callFunc(cc.AppUtil.onDestroyFromParent, cc.AppUtil)));
					} else e.destroy();
				},
				initGameEggBtn: function initGameEggBtn() {
					this._EggGameBtn = this.node.getChildByName("EggSprite");
					var e = cc.rotateBy(.1, 10),
						t = cc.rotateBy(.2, -20),
						a = cc.rotateBy(.2, 20),
						s = cc.rotateBy(.1, -10),
						c = cc.delayTime(1);
					this._EggGameBtn.runAction(cc.repeatForever(cc.sequence(e, t, a, s, c))), this._EggGameBtn.getChildByName("Label").getComponent(cc.Label).string = cc.GameCache.getEggCount().toString();
				},
				initGameButton: function initGameButton() {
					var e = this;
					this._CommonBtnBg = this.node.getChildByName("CommonBtn_Bg"), this._CommonBtnBg.getChildByName("BtnBack").on("click", function (e) {
						var t = e.node.parent.x > 320;
						e.node.parent.stopAllActions(), e.node.parent.runAction(cc.sequence(cc.moveTo(.2, t ? 300 : 365, -240), cc.callFunc(function (e) {
							e.getChildByName("BtnBack").getChildByName("Background").getChildByName("Icon").scaleX = t ? 1 : -1;
						})));
					});

					for (var t = 1; t <= 3; t++) {
						(a = this._CommonBtnBg.getChildByName("Button_" + t)).name = t.toString(), a.on("click", function (t) {
							if (cc.AppUtil.playAudioEffect(e.tapAudio), 1 == (a = parseInt(t.node.name)) || 2 == a) {
								var a = parseInt(t.node.name);
								cc.AppUtil.addPrefabToNode(["GameSettings", "GameHelp"][a - 1], e.node);
							} else e._GameState < cc.GameStateType.GameState_Playing ? cc.AppUtil.showToast("\u6E38\u620F\u5C40\u672A\u5F00\u59CB\u3001\u4E0D\u80FD\u9080\u8BF7\u65C1\u89C2\uFF01") : cc.AppUtil.shareAppMessageWatch();
						});
					}

					for (this._GameBtnsArr = [], t = 1; t <= 5; t++) {
						var a;
						(a = this._BottomPanel.getChildByName("Btn_" + t)).name = t.toString(), a.on("click", function (t) {
							switch (parseInt(t.node.name)) {
								case 1:
									cc.Websocket.Send(cc.ClientProtocol.RequestPeace()), cc.AppUtil.showToast("\u6210\u529F\u53D1\u9001\u8BF7\u6C42\u5E73\u5C40\uFF01"), t.interactable = !1, t.node.opacity = 100, e._AskForPeaceCount++;
									break;

								case 2:
									cc.Websocket.Send(cc.ClientProtocol.SkipChess()), e.changeGameState(cc.GameStateType.GameState_PlayingWait);
									break;

								case 3:
									cc.AppUtil.showModal("\u60A8\u786E\u5B9A\u8981\u7F34\u68B0\u6295\u964D\uFF1F", function (e) {
										e && (cc.Websocket.Send(cc.ClientProtocol.Surrender()), t.interactable = !1);
									}, !0);
									break;

								case 4:
									9 == cc.GameRoomType ? (e.changeGameState(cc.GameStateType.GameState_Ready), cc.Websocket.Send(cc.ClientProtocol.GameReady([], cc.GameCache.getDoubleScoreCount() > 0 ? 1 : 0, cc.GameCache.getProtectScoreCount() > 0 ? 1 : 0)), cc.AppUtil.playAudioEffect(e.d_readyAudio)) : e.showGameChessLayout();
									break;

								case 5:
									9 == cc.GameRoomType ? (e.changeGameState(cc.GameStateType.GameState_PlayingWait), cc.Websocket.Send(cc.ClientProtocol.GameBattle())) : (e.changeGameState(cc.GameStateType.GameState_Ready), cc.Websocket.Send(cc.ClientProtocol.GameReady(e._ChessBoard.getMineChessDataArrEx(), cc.GameCache.getDoubleScoreCount() > 0 ? 1 : 0, cc.GameCache.getProtectScoreCount() > 0 ? 1 : 0))), cc.AppUtil.playAudioEffect(e.readyAudio);
							}
						}), this._GameBtnsArr.push(a), 2 == t && (this._SkipLabel = a.getChildByName("Background").getChildByName("Label_Number").getComponent(cc.Label));
					}

					var s = this.node.getChildByName("Top").getChildByName("BtnBack");
					s.on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), e._GameState >= cc.GameStateType.GameState_Playing ? 3 == e.getMinePlayerState() ? cc.AppUtil.showModal("\u60A8\u662F\u5426\u8981\u5F3A\u884C\u9000\u51FA\u6E38\u620F\uFF1F(\u62634\u5206)", function (e) {
							e && cc.MainGame.leaveGame(!0);
						}, !0) : (cc.GameCache.getProtectScoreCount() > 0 && cc.GameCache.addProtectScoreCount(-1), cc.MainGame.leaveGame(!0)) : cc.MainGame.leaveGame(!0);
					}), cc.AppUtil.isFullScreen() && (s.y -= .8 * cc.FringeHeight), this._BtnExchange = this.node.getChildByName("BtnExchange"), this._BtnExchange.on("click", function () {
						cc.AppUtil.playAudioEffect(e.tapAudio), cc.Websocket.Send(cc.ClientProtocol.ExchangeSeat());
					}), this._BtnWXShare = this.node.getChildByName("BtnInvite"), this._BtnWXShare.on("click", function () {
						cc.AppUtil.shareAppMessageNormal();
					}), cc.AppUtil.isFullScreen() && (this._BtnWXShare.getComponent(cc.Widget).top += cc.FringeHeight, this._BtnExchange.getComponent(cc.Widget).top += cc.FringeHeight);
				},
				showGameEggBtn: function showGameEggBtn(e) {
					this._EggGameBtn.active = e, this._BtnExchange.active = e && 3 != cc.GameRoomType && 10 != cc.GameRoomType;
				},
				updateShowGameStep: function updateShowGameStep() {
					this._GameStepText.string = cc.js.formatStr("\u7B2C %d \u6B65", this._GameStepCount);
				},
				updateGameStepTip: function updateGameStepTip(e) {
					if (this._GameState != cc.GameStateType.GameState_Review) {
						var t = this._ChessBoard.getNotEatChessCount(),
							a = 3 == cc.GameRoomType || 10 == cc.GameRoomType ? 40 : 60;

						this._GameStepTip.string = (a - t).toString(), this._GameStepTip.node.parent.active = t >= 20, 20 == t && (e && cc.audioEngine.playEffect(this.notEatAudio), this._GameStepTip.node.parent.stopAllActions(), this._GameStepTip.node.parent.opacity = 0, this._GameStepTip.node.parent.runAction(cc.fadeIn(.5)));
					}
				},
				getLocalPlayerSeat: function getLocalPlayerSeat(e) {
					return (e - this._SeatID + 4) % 4;
				},
				getWorldCoordinate: function getWorldCoordinate(e) {
					switch (this._SeatID) {
						case 0:
							return [e.x, e.y];

						case 1:
							return [16 - e.y, e.x];

						case 2:
							return [16 - e.x, 16 - e.y];

						case 3:
							return [e.y, 16 - e.x];
					}

					return [];
				},
				getLocalCoordinate: function getLocalCoordinate(e, t) {
					switch (this._SeatID) {
						case 0:
							return [e, t];

						case 1:
							return [t, 16 - e];

						case 2:
							return [16 - e, 16 - t];

						case 3:
							return [16 - t, e];
					}

					return [];
				},
				addGamePlayer: function addGamePlayer(e) {
					if (this._HeadFrames[e.seat - 1].addPlayer(e), this._HeadFrames[e.seat - 1].updatePlayerState(e.state), 10 == cc.GameRoomType) {
						var t = this._ChessBoard.getTeamChessColor(e.seat - 1);

						this._HeadFrames[t].addPlayer(e), this._HeadFrames[t].updatePlayerState(e.state);
					}
				},
				initRoomData: function initRoomData(e, t, a) {
					for (var s = 0; s < t.pool.length; s++) {
						this.addGamePlayer(t.pool[s]);
					}

					this._SeatID = e - 1, this._Battle = a, this._ChessAI = null, this.initGameQiPanState();
				},
				initGameQiPanState: function initGameQiPanState() {
					this._ChessBoard.clearChessBoard();

					for (var e = 0; e < this._HeadFrames.length; e++) {
						if (null != this._HeadFrames[e]) {
							var t = this._HeadFrames[e].getPlayer();

							if (t) {
								var a = this.getLocalPlayerSeat(e);
								this._HeadFrames[e].node.setPosition(this._HeadFramePosArr[a]), this._HeadFrames[e].updatePlayerState(t.state);
								var s = 10 == cc.GameRoomType ? [1, 0, 1, 0] : 3 == cc.GameRoomType ? [1, 0, 0, 0] : [1, 0, 2, 0];

								if (this._HeadFrames[e].showHeadCampFlag(s[a]), (9 == cc.GameRoomType && (this._Battle >> t.seat & 1 || 0 == a && t.state > 2) || 9 != cc.GameRoomType && (t.state > 1 || 0 == a)) && (10 != cc.GameRoomType || e < 2)) {
									var c = 10 == cc.GameRoomType ? this._ChessDataArr[e + 2] : null;

									this._ChessBoard.updateChessBoard(a, e, this._ChessDataArr[e], c);
								}
							}
						}
					}

					this._GameStepCount = 0;
				},
				initGameDataSteps: function initGameDataSteps(e, t, a) {
					if (null != e) if (this.doGameStartAction(e), cc.GameViewMode) this.changeGameState(cc.GameStateType.GameState_Review, t); else {
						for (var s = 0; s < t.pool.length; s++) {
							this.doGameChessAction(t.pool[s], !1, !1, !1);
						}

						this.updateShowGameStep(), 9 == cc.GameRoomType && 30 != this._Battle && (a = this._SeatID), this.onGameTurn(a, 5);
					}
				},
				updateGameChessBoard: function updateGameChessBoard(e) {
					var t = 10 == cc.GameRoomType ? this._ChessDataArr[e + 2] : null;

					this._ChessBoard.updateChessBoard(this.getLocalPlayerSeat(e), e, this._ChessDataArr[e], t);
				},
				hideHeadFrameHint: function hideHeadFrameHint() {
					for (var e = 0; e < this._HeadFrames.length; e++) {
						null != this._HeadFrames[e] && this._HeadFrames[e].hideHeadFrameHint();
					}
				},
				addPlayer: function addPlayer(e) {
					this.addGamePlayer(e), this.initGameQiPanState();
				},
				delGamePlayer: function delGamePlayer(e) {
					this._HeadFrames[e].delPlayer(), this._HeadFrames[e].showLeaveEffect(), this._ChessBoard.clearColorChessFromBoard(e, !1);
				},
				delPlayer: function delPlayer(e) {
					this.delGamePlayer(e - 1), 10 == cc.GameRoomType && this.delGamePlayer(this._ChessBoard.getTeamChessColor(e - 1)), this.checkWatchTargetLeaveGame(e);
				},
				updatePlayerState: function updatePlayerState(e, t) {
					e - 1 != this._SeatID || 4 != t && 7 != t || this._ChessBoard.showTeamFriendChess(), this._HeadFrames[e - 1].updatePlayerState(t), 10 == cc.GameRoomType && this._HeadFrames[this._ChessBoard.getTeamChessColor(e - 1)].updatePlayerState(t), 2 == t && 9 != cc.GameRoomType && this.updateGameChessBoard(e - 1), 6 == t && this.checkWatchTargetLeaveGame(e);
				},
				checkWatchTargetLeaveGame: function checkWatchTargetLeaveGame(e) {
					this._GameState == cc.GameStateType.GameState_Watching && e - 1 == this._SeatID && cc.MainGame.leaveGame(!1, function () {
						cc.AppUtil.showModal("\u60A8\u65C1\u89C2\u5BF9\u8C61\u5DF2\u7ECF\u79BB\u5F00\u623F\u95F4\uFF01", function () {
							cc.AppUtil.showWXGameInterstitialAd();
						}, !1);
					});
				},
				getMinePlayerState: function getMinePlayerState() {
					var e = this._HeadFrames[this._SeatID].getPlayer();

					return e ? e.state : -1;
				},
				exchangePlayerSeat: function exchangePlayerSeat(e, t) {
					var a = this._HeadFrames[e - 1].getPlayer();

					null != a && (a.seat = t, this._SeatID == e - 1 && (this._SeatID = t - 1), this.delPlayer(e), this.addPlayer(a));
				},
				doGameStartAction: function doGameStartAction(e) {
					if (this.showGameEggBtn(!1), 3 == cc.GameRoomType) this._ChessDataArr[0] = e.pool[0].convertToArray(), this._ChessDataArr[2] = e.pool[1].convertToArray(); else if (10 == cc.GameRoomType) for (var t = [[0, 2], [1, 3]], a = 0; a < 2; a++) {
						for (var s = 0; s < 2; s++) {
							for (var c = 0; c < 25; c++) {
								this._ChessDataArr[t[a][s]][c] = e.pool[a].pool[25 * s + c].value;
							}
						}
					} else for (a = 0; a < 4; a++) {
						this._ChessDataArr[a] = e.pool[a].convertToArray();
					}

					for (a = 0; a < this._HeadFrames.length; a++) {
						this._HeadFrames[a] && this._HeadFrames[a].updatePlayerState(3);
					}

					this.initGameQiPanState(), this.changeGameState(9 == cc.GameRoomType ? cc.GameStateType.GameState_GameLayout : cc.GameStateType.GameState_PlayingWait), 1 != cc.GameRoomType && 7 != cc.GameRoomType || this._ChessBoard.showTeamFriendChess(), 5 == cc.GameRoomType && this._ChessBoard.showAllGameChess();
				},
				showGameRecorderMgr: function showGameRecorderMgr() {
					if (3 == cc.PlatformType) {
						this._TempVideoPath = null, this._IsVideoRecord = !0;
						var e = this,
							t = wx.getGameRecorderManager();
						t.onError(function () {
							e._IsVideoRecord = !1;
						}), t.onStop(function (a) {
							t.clipVideo({
								path: a.videoPath,
								timeRange: [15, 0],
								success: function success(t) {
									e._IsVideoRecord ? e._TempVideoPath = t.videoPath : e.onGameOverEx(e._GameResListEx, t.videoPath), e._IsVideoRecord = !1;
								},
								fail: function fail() {
									e._IsVideoRecord = !1;
								}
							});
						}), t.start({
							duration: 300
						});
					}
				},
				onGameStart: function onGameStart(e) {
					this.doGameStartAction(e), 9 == cc.GameRoomType ? (cc.AppUtil.playAudioEffect(this.d_startAudio), this.onGameTurn(this._SeatID, 80)) : this.onGameStartReal();
				},
				onGameBattle: function onGameBattle(e, t, a) {
					this._ChessDataArr[e - 1] = t.convertToArray(), this._Battle = a, this.initGameQiPanState(), this._ChessBoard.showGameChessSelected();
				},
				onSwapChessFailed: function onSwapChessFailed(e, t) {
					this._ChessDataArr[this._SeatID].swap(e - 1, t - 1), this._ChessBoard.swapChessNodeEx(e - 1, t - 1), this._ChessBoard.cancelChessSelected(), this._ChessBoard.clearSelectChessCache();
				},
				onGameStartReal: function onGameStartReal() {
					cc.AppUtil.addPrefabToNode("GameStartEffect", this.node), cc.AppUtil.playAudioEffect(this.startAudio), this.showGameRecorderMgr();
				},
				isGameMyTurn: function isGameMyTurn(e) {
					return e == this._SeatID || 10 == cc.GameRoomType && this._ChessBoard.getTeamChessColor(e) == this._SeatID;
				},
				onGameTurn: function onGameTurn(e, t) {
					this.hideHeadFrameHint(), this._HeadFrames[e].showHeadFrameHint();

					var s = this._HeadFrames[e].node.getPosition();

					this._GameClock.node.active = !0, this._GameClock.node.setPosition(s.x, s.y + 50), this._GameClock.node.setScale(.8), this._GameClock.startTimer(t);
					var c = cc.GameStateType.GameState_PlayingWait;
					9 == cc.GameRoomType ? 30 == this._Battle ? this._SeatID == e && (c = cc.GameStateType.GameState_Playing) : 1 != (this._Battle >> this._SeatID + 1 & 1) && (c = cc.GameStateType.GameState_GameLayout) : this.isGameMyTurn(e) && (c = cc.GameStateType.GameState_Playing, this._ChessBoard.setMineChessColor(e)), this.changeGameState(c), this.isGameMyTurn(e) && cc.AppUtil.vibrateShort();

					var i = this._HeadFrames[e].getPlayer();

					i && 1 == i.robot && (null == this._ChessAI && (this._ChessAI = new a(this._ChessBoard, i.seat - 1)), this._ChessAI.prepareThinkChess());
				},
				onRequestPeace: function onRequestPeace(e) {
					cc.AppUtil.addPrefabToNode("AlertView", null, null, null, null, function (t) {
						var a = t.getComponent("AlertView");
						a.showAlertView(cc.js.formatStr("\u3010<color=#00ff00>%s</c>\u3011\u8BF7\u6C42\u5E73\u5C40\uFF01", e), function (e) {
							cc.Websocket.Send(cc.ClientProtocol.RequestPeaceRet(e ? 1 : 0));
						}, !0), a.setButtonsText(["\u540C\u610F", "\u62D2\u7EDD"]);
					});
				},
				onRejectPeace: function onRejectPeace(e) {
					cc.AppUtil.showModal(cc.js.formatStr("\u3010<color=#00ff00>%s</c>\u3011\u62D2\u7EDD\u4E86\u60A8\u7684\u8BF7\u6C42\uFF01", e), null, !1);
				},
				onUpdateSkipCount: function onUpdateSkipCount(e) {
					this._SkipLabel.string = e.toString();
				},
				onGameChessMarkerData: function onGameChessMarkerData(e) {
					for (var t = e.convertToArray(), a = 0; a < t.length; a += 3) {
						this._ChessBoard.addChessMarker(this.getLocalCoordinate(t[a], t[a + 1]), t[a + 2]);
					}
				},
				doGameChessAction: function processAction(actionData, displayMove, displayAlert, clearColor) {
					// 如果棋盘上的棋子正在移动，则重置相关标志
					if (displayMove && this._ChessBoard.isMovingGameChess()) {
						displayMove = false;
						displayAlert = false;
						clearColor = false;
					}

					// 解析动作数据
					var actionValue = actionData.pool[0].value,
						playerIndex = actionValue >> 4 & 15,
						actionType = actionValue & 15;

					if (actionType == 0) {
						// 动作类型0: 移动棋子
						if (displayMove) {
							this._ChessBoard.showMoveChess(actionData);
						} else {
							this._ChessBoard.setMoveGameChess(actionData);
						}
						this._GameStepCount++;
					} else if (actionType == 1 || actionType == 2) {
						// 动作类型1和2: 显示特定的提示信息
						if (displayAlert) {
							var message = cc.js.formatStr(["%s 使用跳过（连续5次将自动认输）。",
								"%s 已经超时（连续5次将自动认输）。"][actionType - 1],
								this._HeadFrames[playerIndex].getPlayerName());
							cc.AppUtil.showToast(message);
						}
					} else {
						// 其他动作类型
						var playerState = 3;
						if (actionType == 3) {
							playerState = 7;
						} else if (actionType == 4) {
							playerState = 6;
						} else if (actionType == 5) {
							playerState = 4;
						}

						// 显示玩家状态
						if (this._HeadFrames[playerIndex] !== null) {
							this._HeadFrames[playerIndex].showGamePlayerState(playerState);
						}

						// 清除棋盘上指定颜色的棋子
						this._ChessBoard.clearColorChessFromBoard(playerIndex, clearColor);
					}
				},

				onGameAction: function onGameAction(e) {
					this._GameActionArr.push(e);
				},
				onGameOverEx: function onGameOverEx(e, t) {
					var a = this._ChessBoard.getEatGameChess(),
						s = this;

					cc.AppUtil.addPrefabToNode("GameResult", this.node, null, null, null, function (c) {
						var i = c.getComponent(cc.Component);
						i.showGameResult(e, s._SeatID, a), 3 == cc.PlatformType && i.setBtnVideoShare(t);
					});

					for (var c = 0; c < this._HeadFrames.length; c++) {
						if (null != this._HeadFrames[c]) {
							var i = this._HeadFrames[c].getPlayer();

							null != i && (5 == i.state || 6 == i.state ? this._HeadFrames[c].delPlayer(c) : this._HeadFrames[c].updatePlayerState(1));
						}
					}

					this.changeGameState(cc.GameStateType.GameState_Idle), this.initGameQiPanState();
				},
				onGameOver: function onGameOver(e) {
					3 == cc.PlatformType ? this._IsVideoRecord ? (this._GameResListEx = e, this._IsVideoRecord = !1, wx.getGameRecorderManager().stop()) : this.onGameOverEx(e, this._TempVideoPath) : this.onGameOverEx(e, null);
				},
				onGameChat: function onGameChat(e, t) {
					cc.AppUtil.showExpression(this._HeadFrames[e - 1].node, this.expression_images[t - 1], 1.2);
				},
				onGameChatText: function onGameChatText(e, t) {
					var a = this._HeadFrames[e - 1].node.getPosition();

					cc.AppUtil.addPrefabToNode("GameChatText", this.node, cc.v2(a.x, a.y + 50), null, 3.5, function (e) {
						e.getChildByName("Label").getComponent(cc.Label).string = t;
					});
				},
				onKickGameMsg: function onKickGameMsg(e) {
					cc.MainGame.leaveGame(!0, function () {
						cc.AppUtil.showModal(e, function () {
							cc.Canvas.instance.node.emit("game_shop_guide");
						}, !1);
					});
				},
				onGameEgg: function onGameEgg(e) {
					var t = this,
						a = cc.instantiate(this.eggPrefab);
					this.node.addChild(a), a.setPosition(this._HeadFrames[e - 1].node.getPosition()), a.getComponent(cc.Animation).on("finished", function () {
						a.destroy(), e - 1 == t._SeatID && cc.MainGame.leaveGame(!1, function () {
							cc.AppUtil.showModal("\u60A8\u88AB\u5176\u4ED6\u73A9\u5BB6\u8E22\u51FA\u4E86\u623F\u95F4\uFF01", function () {
								cc.AppUtil.showWXGameInterstitialAd();
							}, !1);
						});
					}), cc.AppUtil.playAudioEffect(this.eggAudio), cc.AppUtil.vibrateShort();
				},
				showGameChessLayout: function showGameChessLayout() {
					var e = this;
					cc.AppUtil.loadResFromBundle("prefab/ChessLayout", cc.Prefab, function (t) {
						if (e.node) {
							var a = cc.instantiate(t);
							a.getComponent(cc.Component).setChessBoard(e._ChessBoard), e.node.addChild(a);
						}
					});
				}
			}), cc._RF.pop();
		}, {
			ChessAI: "ChessAI"
		}],
		lobby: [function (e, t) {
			"use strict";

			cc._RF.push(t, "fb2cemyePpMLLG833NU1Zw4", "lobby"), cc.Class({
				extends: cc.Component,
				properties: {
					buttonAudio: {
						default: null,
						type: cc.AudioClip
					}
				},
				onLoad: function onLoad() {
					this.initGameUI(), this.initGameButtons(), cc.EggSpriteTip = !0, cc.director.preloadScene("game"), cc.director.preloadScene("game_fanfan");
				},
				onEnable: function onEnable() {
					4 == cc.PlatformType ? cc.AppUtil.showOriginGameAd(!0, !1) : cc.AppUtil.showWXGameBannerAd(!1), cc.AppUtil.showWXCustomAd(!0);
				},
				onDisable: function onDisable() {
					cc.AppUtil.showOriginGameAd(!1, !1);
				},
				start: function start() {
					cc.GameViewMode && (cc.GameRoomType = cc.GameViewMode, cc.GameViewMode = null), cc.Websocket.Send(cc.ClientProtocol.EnterRoom(cc.GameRoomType)) && cc.AppUtil.addLoading(), cc.AppUtil.updateCanvasAlignment();
				},
				initGameUI: function initGameUI() {
					var e = 4 == cc.PlatformType ? "GameLobbyEx" : "GameLobby";
					this._GameLobby = cc.find(e).getComponent(e), this._GameLobby.showGameTables();
				},
				initGameButtons: function initGameButtons() {
					var e = this,
						t = this.node.getChildByName("Top"),
						a = t.getChildByName("BtnBack");
					a.on("click", function () {
						cc.AppUtil.playAudioEffect(e.buttonAudio), cc.MainGame.backToHomepage();
					}), cc.AppUtil.isFullScreen() && (t.height += cc.FringeHeight, a.y -= cc.FringeHeight);

					for (var s = this.node.getChildByName("Bottom"), c = 1; c <= 5; c++) {
						var i = s.getChildByName("Button_" + c);

						if (i.name = c.toString(), i.on("click", function (t) {
							cc.AppUtil.playAudioEffect(e.buttonAudio);
							var a = parseInt(t.node.name);
							if (2 == cc.PlatformType && 1 == a && 0 == cc.GameTrick) cc.AppUtil.showToast("\u8BE5\u6E20\u9053\u6682\u4E0D\u652F\u6301\u6392\u884C\u699C\uFF01"); else {
								if (cc.GameShopGuide && 5 == a) {
									var c = s.getChildByName("GameShopGuide");
									c && c.destroy();
								}

								cc.AppUtil.addPrefabToNode(["GameRank", "GameReview", "ChessLayout", "AccountSettings", "GameShop"][a - 1], e.node);
							}
						}), 5 == c) {
							var n = cc.rotateBy(.1, 10),
								o = cc.rotateBy(.2, -20),
								r = cc.delayTime(.8);
							i.runAction(cc.repeatForever(cc.sequence(n, o, n, r)));
						}
					}

					this.node.on("game_shop_guide", function () {
						cc.GameShopGuide = !0, cc.AppUtil.addPrefabToNode("GameShopGuide", s);
					});
				},
				updateGameTable: function updateGameTable(e, t) {
					this._GameLobby && this._GameLobby.updateGameTable(e, t);
				},
				initGameTables: function initGameTables(e) {
					this._GameLobby && this._GameLobby.initGameTables(e);
				}
			}), cc._RF.pop();
		}, {}],
		md5: [function (e, t) {
			"use strict";

			cc._RF.push(t, "aad32khL3FInJgAHGx+4ssm", "md5");

			var a = 0;

			function s(e) {
				return o(r(n(e), 8 * e.length));
			}

			function c(e) {
				for (var t, s = a ? "0123456789ABCDEF" : "0123456789abcdef", c = "", i = 0; i < e.length; i++) {
					t = e.charCodeAt(i), c += s.charAt(t >>> 4 & 15) + s.charAt(15 & t);
				}

				return c;
			}

			function i(e) {
				for (var t, a, s = "", c = -1; ++c < e.length;) {
					t = e.charCodeAt(c), a = c + 1 < e.length ? e.charCodeAt(c + 1) : 0, 55296 <= t && t <= 56319 && 56320 <= a && a <= 57343 && (t = 65536 + ((1023 & t) << 10) + (1023 & a), c++), t <= 127 ? s += String.fromCharCode(t) : t <= 2047 ? s += String.fromCharCode(192 | t >>> 6 & 31, 128 | 63 & t) : t <= 65535 ? s += String.fromCharCode(224 | t >>> 12 & 15, 128 | t >>> 6 & 63, 128 | 63 & t) : t <= 2097151 && (s += String.fromCharCode(240 | t >>> 18 & 7, 128 | t >>> 12 & 63, 128 | t >>> 6 & 63, 128 | 63 & t));
				}

				return s;
			}

			function n(e) {
				for (var t = Array(e.length >> 2), a = 0; a < t.length; a++) {
					t[a] = 0;
				}

				for (a = 0; a < 8 * e.length; a += 8) {
					t[a >> 5] |= (255 & e.charCodeAt(a / 8)) << a % 32;
				}

				return t;
			}

			function o(e) {
				for (var t = "", a = 0; a < 32 * e.length; a += 8) {
					t += String.fromCharCode(e[a >> 5] >>> a % 32 & 255);
				}

				return t;
			}

			function r(e, t) {
				e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;

				for (var a = 1732584193, s = -271733879, c = -1732584194, i = 271733878, n = 0; n < e.length; n += 16) {
					var o = a,
						r = s,
						l = c,
						p = i;
					a = h(a, s, c, i, e[n + 0], 7, -680876936), i = h(i, a, s, c, e[n + 1], 12, -389564586), c = h(c, i, a, s, e[n + 2], 17, 606105819), s = h(s, c, i, a, e[n + 3], 22, -1044525330), a = h(a, s, c, i, e[n + 4], 7, -176418897), i = h(i, a, s, c, e[n + 5], 12, 1200080426), c = h(c, i, a, s, e[n + 6], 17, -1473231341), s = h(s, c, i, a, e[n + 7], 22, -45705983), a = h(a, s, c, i, e[n + 8], 7, 1770035416), i = h(i, a, s, c, e[n + 9], 12, -1958414417), c = h(c, i, a, s, e[n + 10], 17, -42063), s = h(s, c, i, a, e[n + 11], 22, -1990404162), a = h(a, s, c, i, e[n + 12], 7, 1804603682), i = h(i, a, s, c, e[n + 13], 12, -40341101), c = h(c, i, a, s, e[n + 14], 17, -1502002290), a = C(a, s = h(s, c, i, a, e[n + 15], 22, 1236535329), c, i, e[n + 1], 5, -165796510), i = C(i, a, s, c, e[n + 6], 9, -1069501632), c = C(c, i, a, s, e[n + 11], 14, 643717713), s = C(s, c, i, a, e[n + 0], 20, -373897302), a = C(a, s, c, i, e[n + 5], 5, -701558691), i = C(i, a, s, c, e[n + 10], 9, 38016083), c = C(c, i, a, s, e[n + 15], 14, -660478335), s = C(s, c, i, a, e[n + 4], 20, -405537848), a = C(a, s, c, i, e[n + 9], 5, 568446438), i = C(i, a, s, c, e[n + 14], 9, -1019803690), c = C(c, i, a, s, e[n + 3], 14, -187363961), s = C(s, c, i, a, e[n + 8], 20, 1163531501), a = C(a, s, c, i, e[n + 13], 5, -1444681467), i = C(i, a, s, c, e[n + 2], 9, -51403784), c = C(c, i, a, s, e[n + 7], 14, 1735328473), a = d(a, s = C(s, c, i, a, e[n + 12], 20, -1926607734), c, i, e[n + 5], 4, -378558), i = d(i, a, s, c, e[n + 8], 11, -2022574463), c = d(c, i, a, s, e[n + 11], 16, 1839030562), s = d(s, c, i, a, e[n + 14], 23, -35309556), a = d(a, s, c, i, e[n + 1], 4, -1530992060), i = d(i, a, s, c, e[n + 4], 11, 1272893353), c = d(c, i, a, s, e[n + 7], 16, -155497632), s = d(s, c, i, a, e[n + 10], 23, -1094730640), a = d(a, s, c, i, e[n + 13], 4, 681279174), i = d(i, a, s, c, e[n + 0], 11, -358537222), c = d(c, i, a, s, e[n + 3], 16, -722521979), s = d(s, c, i, a, e[n + 6], 23, 76029189), a = d(a, s, c, i, e[n + 9], 4, -640364487), i = d(i, a, s, c, e[n + 12], 11, -421815835), c = d(c, i, a, s, e[n + 15], 16, 530742520), a = u(a, s = d(s, c, i, a, e[n + 2], 23, -995338651), c, i, e[n + 0], 6, -198630844), i = u(i, a, s, c, e[n + 7], 10, 1126891415), c = u(c, i, a, s, e[n + 14], 15, -1416354905), s = u(s, c, i, a, e[n + 5], 21, -57434055), a = u(a, s, c, i, e[n + 12], 6, 1700485571), i = u(i, a, s, c, e[n + 3], 10, -1894986606), c = u(c, i, a, s, e[n + 10], 15, -1051523), s = u(s, c, i, a, e[n + 1], 21, -2054922799), a = u(a, s, c, i, e[n + 8], 6, 1873313359), i = u(i, a, s, c, e[n + 15], 10, -30611744), c = u(c, i, a, s, e[n + 6], 15, -1560198380), s = u(s, c, i, a, e[n + 13], 21, 1309151649), a = u(a, s, c, i, e[n + 4], 6, -145523070), i = u(i, a, s, c, e[n + 11], 10, -1120210379), c = u(c, i, a, s, e[n + 2], 15, 718787259), s = u(s, c, i, a, e[n + 9], 21, -343485551), a = m(a, o), s = m(s, r), c = m(c, l), i = m(i, p);
				}

				return Array(a, s, c, i);
			}

			function l(e, t, a, s, c, i) {
				return m((n = m(m(t, e), m(s, i))) << (o = c) | n >>> 32 - o, a);
				var n, o;
			}

			function h(e, t, a, s, c, i, n) {
				return l(t & a | ~t & s, e, t, c, i, n);
			}

			function C(e, t, a, s, c, i, n) {
				return l(t & s | a & ~s, e, t, c, i, n);
			}

			function d(e, t, a, s, c, i, n) {
				return l(t ^ a ^ s, e, t, c, i, n);
			}

			function u(e, t, a, s, c, i, n) {
				return l(a ^ (t | ~s), e, t, c, i, n);
			}

			function m(e, t) {
				var a = (65535 & e) + (65535 & t);
				return (e >> 16) + (t >> 16) + (a >> 16) << 16 | 65535 & a;
			}

			t.exports = function (e) {
				return c(s(i(e)));
			}, cc._RF.pop();
		}, {}],
		runtime: [function (e, t) {
			"use strict";

			cc._RF.push(t, "8d245ZSsvBBObxo+g5+84jX", "runtime"), function (e) {
				var t,
					a = Object.prototype,
					s = a.hasOwnProperty,
					c = "function" == typeof Symbol ? Symbol : {},
					i = c.iterator || "@@iterator",
					n = c.asyncIterator || "@@asyncIterator",
					o = c.toStringTag || "@@toStringTag";

				function r(e, t, a) {
					return Object.defineProperty(e, t, {
						value: a,
						enumerable: !0,
						configurable: !0,
						writable: !0
					}), e[t];
				}

				try {
					r({}, "");
				} catch (I) {
					r = function r(e, t, a) {
						return e[t] = a;
					};
				}

				function l(e, t, a, s) {
					var c = t && t.prototype instanceof _ ? t : _,
						i = Object.create(c.prototype),
						n = new P(s || []);
					return i._invoke = B(e, a, n), i;
				}

				function h(e, t, a) {
					try {
						return {
							type: "normal",
							arg: e.call(t, a)
						};
					} catch (I) {
						return {
							type: "throw",
							arg: I
						};
					}
				}

				e.wrap = l;
				var C = "suspendedStart",
					d = "suspendedYield",
					u = "executing",
					m = "completed",
					p = {};

				function _() { }

				function f() { }

				function g() { }

				var G = {};

				G[i] = function () {
					return this;
				};

				var y = Object.getPrototypeOf,
					S = y && y(y(R([])));
				S && S !== a && s.call(S, i) && (G = S);
				var v = g.prototype = _.prototype = Object.create(G);

				function A(e) {
					["next", "throw", "return"].forEach(function (t) {
						r(e, t, function (e) {
							return this._invoke(t, e);
						});
					});
				}

				function b(e, t) {
					function a(c, i, n, o) {
						var r = h(e[c], e, i);

						if ("throw" !== r.type) {
							var l = r.arg,
								C = l.value;
							return C && "object" == _typeof2(C) && s.call(C, "__await") ? t.resolve(C.__await).then(function (e) {
								a("next", e, n, o);
							}, function (e) {
								a("throw", e, n, o);
							}) : t.resolve(C).then(function (e) {
								l.value = e, n(l);
							}, function (e) {
								return a("throw", e, n, o);
							});
						}

						o(r.arg);
					}

					var c;

					this._invoke = function (e, s) {
						function i() {
							return new t(function (t, c) {
								a(e, s, t, c);
							});
						}

						return c = c ? c.then(i, i) : i();
					};
				}

				function B(e, t, a) {
					var s = C;
					return function (c, i) {
						if (s === u) throw new Error("Generator is already running");

						if (s === m) {
							if ("throw" === c) throw i;
							return N();
						}

						for (a.method = c, a.arg = i; ;) {
							var n = a.delegate;

							if (n) {
								var o = T(n, a);

								if (o) {
									if (o === p) continue;
									return o;
								}
							}

							if ("next" === a.method) a.sent = a._sent = a.arg; else if ("throw" === a.method) {
								if (s === C) throw s = m, a.arg;
								a.dispatchException(a.arg);
							} else "return" === a.method && a.abrupt("return", a.arg);
							s = u;
							var r = h(e, t, a);

							if ("normal" === r.type) {
								if (s = a.done ? m : d, r.arg === p) continue;
								return {
									value: r.arg,
									done: a.done
								};
							}

							"throw" === r.type && (s = m, a.method = "throw", a.arg = r.arg);
						}
					};
				}

				function T(e, a) {
					var s = e.iterator[a.method];

					if (s === t) {
						if (a.delegate = null, "throw" === a.method) {
							if (e.iterator.return && (a.method = "return", a.arg = t, T(e, a), "throw" === a.method)) return p;
							a.method = "throw", a.arg = new TypeError("The iterator does not provide a 'throw' method");
						}

						return p;
					}

					var c = h(s, e.iterator, a.arg);
					if ("throw" === c.type) return a.method = "throw", a.arg = c.arg, a.delegate = null, p;
					var i = c.arg;
					return i ? i.done ? (a[e.resultName] = i.value, a.next = e.nextLoc, "return" !== a.method && (a.method = "next", a.arg = t), a.delegate = null, p) : i : (a.method = "throw", a.arg = new TypeError("iterator result is not an object"), a.delegate = null, p);
				}

				function k(e) {
					var t = {
						tryLoc: e[0]
					};
					1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
				}

				function w(e) {
					var t = e.completion || {};
					t.type = "normal", delete t.arg, e.completion = t;
				}

				function P(e) {
					this.tryEntries = [{
						tryLoc: "root"
					}], e.forEach(k, this), this.reset(!0);
				}

				function R(e) {
					if (e) {
						var a = e[i];
						if (a) return a.call(e);
						if ("function" == typeof e.next) return e;

						if (!isNaN(e.length)) {
							var c = -1,
								n = function a() {
									for (; ++c < e.length;) {
										if (s.call(e, c)) return a.value = e[c], a.done = !1, a;
									}

									return a.value = t, a.done = !0, a;
								};

							return n.next = n;
						}
					}

					return {
						next: N
					};
				}

				function N() {
					return {
						value: t,
						done: !0
					};
				}

				f.prototype = v.constructor = g, g.constructor = f, f.displayName = r(g, o, "GeneratorFunction"), e.isGeneratorFunction = function (e) {
					var t = "function" == typeof e && e.constructor;
					return !!t && (t === f || "GeneratorFunction" === (t.displayName || t.name));
				}, e.mark = function (e) {
					return Object.setPrototypeOf ? Object.setPrototypeOf(e, g) : (e.__proto__ = g, r(e, o, "GeneratorFunction")), e.prototype = Object.create(v), e;
				}, e.awrap = function (e) {
					return {
						__await: e
					};
				}, A(b.prototype), b.prototype[n] = function () {
					return this;
				}, e.AsyncIterator = b, e.async = function (t, a, s, c, i) {
					void 0 === i && (i = Promise);
					var n = new b(l(t, a, s, c), i);
					return e.isGeneratorFunction(a) ? n : n.next().then(function (e) {
						return e.done ? e.value : n.next();
					});
				}, A(v), r(v, o, "Generator"), v[i] = function () {
					return this;
				}, v.toString = function () {
					return "[object Generator]";
				}, e.keys = function (e) {
					var t = [];

					for (var a in e) {
						t.push(a);
					}

					return t.reverse(), function a() {
						for (; t.length;) {
							var s = t.pop();
							if (s in e) return a.value = s, a.done = !1, a;
						}

						return a.done = !0, a;
					};
				}, e.values = R, P.prototype = {
					constructor: P,
					reset: function reset(e) {
						if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(w), !e) for (var a in this) {
							"t" === a.charAt(0) && s.call(this, a) && !isNaN(+a.slice(1)) && (this[a] = t);
						}
					},
					stop: function stop() {
						this.done = !0;
						var e = this.tryEntries[0].completion;
						if ("throw" === e.type) throw e.arg;
						return this.rval;
					},
					dispatchException: function dispatchException(e) {
						if (this.done) throw e;
						var a = this;

						function c(s, c) {
							return o.type = "throw", o.arg = e, a.next = s, c && (a.method = "next", a.arg = t), !!c;
						}

						for (var i = this.tryEntries.length - 1; i >= 0; --i) {
							var n = this.tryEntries[i],
								o = n.completion;
							if ("root" === n.tryLoc) return c("end");

							if (n.tryLoc <= this.prev) {
								var r = s.call(n, "catchLoc"),
									l = s.call(n, "finallyLoc");

								if (r && l) {
									if (this.prev < n.catchLoc) return c(n.catchLoc, !0);
									if (this.prev < n.finallyLoc) return c(n.finallyLoc);
								} else if (r) {
									if (this.prev < n.catchLoc) return c(n.catchLoc, !0);
								} else {
									if (!l) throw new Error("try statement without catch or finally");
									if (this.prev < n.finallyLoc) return c(n.finallyLoc);
								}
							}
						}
					},
					abrupt: function abrupt(e, t) {
						for (var a = this.tryEntries.length - 1; a >= 0; --a) {
							var c = this.tryEntries[a];

							if (c.tryLoc <= this.prev && s.call(c, "finallyLoc") && this.prev < c.finallyLoc) {
								var i = c;
								break;
							}
						}

						i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
						var n = i ? i.completion : {};
						return n.type = e, n.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, p) : this.complete(n);
					},
					complete: function complete(e, t) {
						if ("throw" === e.type) throw e.arg;
						return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), p;
					},
					finish: function finish(e) {
						for (var t = this.tryEntries.length - 1; t >= 0; --t) {
							var a = this.tryEntries[t];
							if (a.finallyLoc === e) return this.complete(a.completion, a.afterLoc), w(a), p;
						}
					},
					catch: function _catch(e) {
						for (var t = this.tryEntries.length - 1; t >= 0; --t) {
							var a = this.tryEntries[t];

							if (a.tryLoc === e) {
								var s = a.completion;

								if ("throw" === s.type) {
									var c = s.arg;
									w(a);
								}

								return c;
							}
						}

						throw new Error("illegal catch attempt");
					},
					delegateYield: function delegateYield(e, a, s) {
						return this.delegate = {
							iterator: R(e),
							resultName: a,
							nextLoc: s
						}, "next" === this.method && (this.arg = t), p;
					}
				};
			}("object" == _typeof2(t) ? t.exports : {}), cc._RF.pop();
		}, {}]
	}, {}, ["APath", "AccountSettings", "ActorPartList", "AlertView", "AppUtil", "Array", "AutoFluxay", "Base64", "BitStream", "ChessAI", "ChessAIFanFan", "ChessBoard", "ChessBoardFanFan", "ChessCell", "ChessCellUtil", "ChessColorFlag", "ChessLayout", "ChessLayoutPage", "ChessNode", "ChessNodeFanFan", "ClockTimer", "GameCache", "GameChat", "GameChessMark", "GameGuide", "GameHelp", "GameIconBtn", "GameLayer", "GameLobby", "GameLobbyEx", "GameProtocol_Client", "GameRank", "GameReport", "GameResult", "GameReview", "GameReviewCtrl", "GameScore", "GameSettings", "GameShop", "GameTable", "HeadFrame", "MainGame", "MoreGame", "ProtocolBase", "RoundRectMask", "SendBQ", "ServiceProtocol", "SystemMsg", "ToastNode", "TouchPanel", "Websocket", "md5", "runtime", "game", "game_fanfan", "lobby"]);
});
require("game.js");
