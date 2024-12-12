$(function() {
    function a() {
        this.element = document.getElementById("canvas"),
        this.waveSpeed = 1e3,
        this.boat = new b(this),
        this.greenLight = $("#green_light"),
        this.flickerOn = !0,
        this.registerSounds(),
        this.addStartListener(),
        this.soundEnabled = !0;
        var a = this;
        $("#btn_sound").click(function() {
            a.toggleSound()
        }).mouseover(function() {
            a.soundSelectHover = createjs.Sound.play("selecthover")
        })
    }
    function b(a) {
        this.par = a,
        this.obj = $('<div class="boat">').appendTo(this.par.element),
        this.nextkey = d,
        this.xpos = 20
    }
    function c(a) {
        this.nudged = !1,
        this.par = a,
        this.obj = $('<div class="wave">').appendTo(this.par.element),
        this.x = 918;
        this.startWave()
    }
    var d = 77
      , e = 78
      , f = "/features/2014/11/gatsby_fix/";
    a.prototype.addStartListener = function() {
        var a = this;
        $(".btn_beginGame_behavior").click(function() {
            $("#title_card,#game_over").fadeOut(),
            a.start()
        }).mouseover(function() {
            a.soundSelectHover = createjs.Sound.play("selecthover")
        })
    }
    ,
    a.prototype.addPauseListener = function() {
        var a = this;
        $(window).unbind("blur").blur(function() {
            a.pauseGame()
        }),
        $("#btn_pause").unbind("click").click(function() {
            a.pauseGame()
        }).mouseover(function() {
            a.soundSelectHover = createjs.Sound.play("selecthover")
        }).mouseout(function() {})
    }
    ,
    a.prototype.playSong = function(a) {
        createjs.Sound.stop(),
        this.music = createjs.Sound.play("Gatsby" + a, 0, 0, 0, -1, .05),
        this.playingSongIndex = a
    }
    ,
    a.prototype.start = function() {
        if (void 0 !== this.checkInterval && clearInterval(this.checkInterval),
        void 0 !== this.waves)
            for (var a = 0; a < this.waves.length; a++)
                this.waves[a].obj.remove();
        void 0 !== this.waveTimeout && clearTimeout(this.waveTimeout),
        this.wavePower = 15,
        this.waveSpeed = 3e3,
        this.waves = [],
        this.boat.obj.css("left", 30),
        this.boat.xpos = 30,
        this.boat.keyListener(),
        this.addPauseListener(),
        this.pushbackon = !1,
        $("#btn_pause").show(),
        this.playSong(0),
        this.messageFlags = [!1, !1, !1],
        this.runGame(),
        this.showArrows()
    }
    ,
    a.prototype.runGame = function() {
        var a = this;
        this.checkInterval = setInterval(function() {
            var b = a.boat.xpos;
            -60 > b && a.gameOver(),
            a.pushbackon || (b > 200 && (a.messageFlags[0] || (a.showMessage("Beat on!"),
            a.messageFlags[0] = !0),
            1 != a.playingSongIndex && 400 > b && a.playSong(1)),
            b > 400 && (a.messageFlags[1] || (a.showMessage("Faster!"),
            a.messageFlags[1] = !0),
            2 != a.playingSongIndex && a.playSong(2)),
            b > 600 && (a.messageFlags[2] || (a.showMessage("Stretch out your arms farther!"),
            a.messageFlags[2] = !0)),
            b > 730 ? a.pushback() : a.waveSpeed = 3e3 - 2900 * (b / 800)),
            a.flickerOn ? (a.greenLight.css("background-position", "-97px 0px"),
            a.flickerOn = !1) : (a.greenLight.css("background-position", "-0px 0px"),
            a.flickerOn = !0)
        }, 1e3),
        this.newWave()
    }
    ,
    a.prototype.gameOver = function() {
        this.haltGame(),
        this.soundGameOver = createjs.Sound.play("GatsbyGameOver", 0, 0, 0, 0, .2),
        $("#game_over").fadeIn(),
        $(window).unbind("blur"),
        $("body").unbind("keyup.listener2")
    }
    ,
    a.prototype.newWave = function() {
        this.waves.push(new c(this));
        var a = this;
        this.waveTimeout = setTimeout(function() {
            a.newWave()
        }, this.waveSpeed)
    }
    ,
    a.prototype.pushback = function() {
        this.pushbackon = !0,
        this.waveSpeed = 130,
        this.wavePower = 40
    }
    ,
    a.prototype.showMessage = function(a) {
        var b = $('<div class="game_message">' + a + "</div>");
        b.appendTo(this.element).fadeTo(1e3, 1, function() {
            setTimeout(function() {
                b.fadeTo(1e3, 0, function() {
                    b.remove()
                })
            }, 3e3)
        })
    }
    ,
    a.prototype.registerSounds = function() {
        var a = [{
            src: f + "music/Gatsby1.mp3|" + f + "music/Gatsby1.ogg",
            id: "Gatsby0"
        }, {
            src: f + "music/Gatsby2.mp3|" + f + "music/Gatsby2.ogg",
            id: "Gatsby1"
        }, {
            src: f + "music/Gatsby3.mp3|" + f + "music/Gatsby3.ogg",
            id: "Gatsby2"
        }, {
            src: f + "music/wavehit.mp3|" + f + "music/wavehit.ogg",
            id: "wavehit"
        }, {
            src: f + "music/selecthover.mp3|" + f + "music/selecthover.ogg",
            id: "selecthover"
        }, {
            src: f + "music/row.mp3|" + f + "music/row.ogg",
            id: "row"
        }, {
            src: f + "music/GatsbyGameOver.mp3|" + f + "music/GatsbyGameOver.ogg",
            id: "GatsbyGameOver"
        }];
        createjs.Sound.registerManifest(a)
    }
    ,
    a.prototype.disableSound = function() {
        createjs.Sound.setMute(!0),
        this.soundEnabled = !1,
        $("#btn_sound").addClass("soundOff")
    }
    ,
    a.prototype.enableSound = function() {
        createjs.Sound.setMute(!1),
        this.soundEnabled = !0,
        $("#btn_sound").removeClass("soundOff")
    }
    ,
    a.prototype.toggleSound = function() {
        this.soundEnabled ? this.disableSound() : this.enableSound()
    }
    ,
    a.prototype.showArrows = function() {
        var a = $("#arrows").fadeIn()
          , b = a.find("#arrow_left")
          , c = a.find("#arrow_right")
          , e = !0;
        c.addClass("on");
        var f = setInterval(function() {
            e ? (c.removeClass("on"),
            b.addClass("on"),
            e = !1) : (b.removeClass("on"),
            c.addClass("on"),
            e = !0)
        }, 150);
        $("body").on("keyup.listener1", function(b) {
            b.keyCode == d && (clearInterval(f),
            a.fadeOut(),
            $("body").unbind("keyup.listener1"),
            b.stopPropagation(),
            b.preventDefault())
        })
    }
    ,
    b.prototype.keyListener = function() {
        var a = this;
        $("body").on("keyup.listener2", function(b) {
            return clearInterval(a.interval),
            b.keyCode == a.nextkey && (a.nextkey == e ? (a.nextkey = d,
            a.obj.css("background-position", "0px 0px")) : (a.nextkey = e,
            a.obj.css("background-position", "-79px 0px"),
            a.moveright()),
            b.stopPropagation(),
            b.preventDefault()),
            !1
        })
    }
    ,
    b.prototype.moveleft = function() {
        this.xpos -= this.par.wavePower,
        this.obj.css("left", this.xpos),
        this.par.soundWaveHit = createjs.Sound.play("wavehit")
    }
    ,
    b.prototype.moveright = function() {
        this.xpos += 10,
        this.obj.css("left", this.xpos),
        this.par.soundRow = createjs.Sound.play("row")
    }
    ,
    c.prototype.moveLeft = function() {
        this.x = this.x - 10;
        var a = this.x;
        if (Math.random() < .5 ? this.obj.css("top", "241px") : this.obj.css("top", "243px"),
        -45 > a)
            this.obj.remove(),
            clearInterval(this.interval);
        else {
            var b = this.par.boat
              , c = b.xpos + 69;
            c > a && (this.nudged || (b.moveleft(),
            this.nudged = !0)),
            this.obj.css("left", a)
        }
    }
    ,
    c.prototype.startWave = function() {
        var a = this;
        this.interval = setInterval(function() {
            a.moveLeft()
        }, 50)
    }
    ,
    c.prototype.pauseWave = function() {
        clearInterval(this.interval)
    }
    ;
    new a
});

