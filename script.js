'use strict'

;(function(options) {
    var Second = {
        set digit(value) {
            if (typeof value != 'number' || value < 0)
                throw new Error("Bad parameter")

            this._digit = value
        },

        get digit() {
            return this._digit
        },

        digitName: "seconds",
        DOM_elem: null,
        parentNode: null,
        init: function ({value, title}) {
            this.parentNode = document.createElement("div")
            this.parentNode.classList.add("timer__item")
            var titleElem = document.createElement('p')
            titleElem.classList.add("timer__title")
            titleElem.textContent = title

            

            this.digit = value
            this.title = title

            this.DOM_elem = document.createElement("p")
            this.parentNode.append(this.DOM_elem, titleElem)
            this.DOM_elem.textContent = this.toString()
        },

        toString: function () {
            return String(this._digit).length == 1
                ? `0${this._digit.toString()}` : this._digit.toString()
        },

        decrement: function () {
            this._digit--
            this.update()
        },

        addElementClass: function (...classes) {
            if ([...classes].length == 0) throw new Error("задайте классы")

            this.DOM_elem.classList.add(...classes)
        },

        addStyle: function (styles) {
            this.DOM_elem.style.fontFamily = styles.fontFamily ?? "sans"
            this.DOM_elem.style.fontSize = styles.fontSize ?? "20px"
            this.DOM_elem.style.fontWeight = styles.fontWeight ?? "bold"
        },

        update() {
            this.DOM_elem.innerHTML = this.toString()
        }

    }


    var Minutes = Object.create(Second)
    var Hours = Object.create(Second)


    Second.digit = options.seconds.value ?? 59
    Minutes.digit = options.minutes.value ?? 0
    Hours.digit = options.hours.value ?? 0

    Second.init({
        title: options.seconds.title ?? "Seconds",
        value: options.seconds.value ?? 59
    })

    Minutes.init({
        title: options.minutes.title ?? "Minutes",
        value: options.minutes.value ?? 0
    })

    Hours.init({
        title: options.hours.title ?? "Hourse",
        value: options.hours.value ?? 0
    })

    Second.addElementClass(...options.digitClasses.seconds)
    Minutes.addElementClass(...options.digitClasses.minutes)
    Hours.addElementClass(...options.digitClasses.hours)




    var Timer = {
        second: Second,
        minutes: Minutes,
        hours: Hours,

        _elem: document.getElementById("timer"),
        timerId: null,
        init: function () {
            this._elem.append(this.hours.parentNode, this.minutes.parentNode, this.second.parentNode)
        },

        start: function () {
            this.timerId = setInterval(this.updateTimer.bind(this), 1000);
        },

        changeFontStyle: function (options) {
            this._elem.style.fontSize = options.fontSize ?? "20px"
            this._elem.style.fontFamily = options.fontFamily ?? 'sans-serif'
            this._elem.style.fontWeight = options.fontFamily ?? 'bold'
        },

        updateTimer: function () {
            if (this.hours.digit == 0 && this.second.digit == 0 && this.minutes.digit == 0) {
                clearInterval(this.timerId)
                return
            }

            if (this.second.digit == 0 && this.minutes.digit == 0 && this.hours.digit != 0) {
                this.second.digit = 60
                this.minutes.digit = 60
                this.minutes.decrement()
                this.hours.decrement()
            }

            if (this.hours.digit == 0 && this.minutes.digit != 0 && this.second.digit == 0) {
                this.minutes.decrement()
                this.second.digit = 60
            }

            if (this.hours.digit != 0 && this.minutes.digit != 0 && this.second.digit == 0) {
                this.minutes.decrement()
                this.second.digit = 60
            }

            this.second.decrement()
        }
    }



    Timer.init()
    Timer.start()
    Timer.changeFontStyle({
        fontSize: options.fontSize ?? "18px",
        fontFamily: options.fontFamily ?? "Arial"
    })
})({
    seconds: {
        value: 10,
        title: "Секунды"
    },
    minutes: {
        value: 1,
        title: "Минуты"
    },
    hours: {
        value: 1,
        title: "Часы"
    },
    fontSize: "30px",
    fontFamily: "Georgia",
    digitClasses: {
        seconds: ["digit", "timer__seconds"],
        minutes: ["digit", "timer__minutes"],
        hours: ["digit", "timer__hours"]
    }
})



