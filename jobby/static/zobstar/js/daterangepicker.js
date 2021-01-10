!function(a, b) {
    if ("function" === typeof define && define.amd)
        define(["moment", "jquery"], function(a, c) {
            return c.fn || (c.fn = {}),
            "function" !== typeof a && a.default && (a = a.default),
            b(a, c)
        });
    else if ("object" === typeof module && module.exports) {
        var c = "undefined" != typeof window ? window.jQuery : void 0;
        c || (c = require("jquery"),
        c.fn || (c.fn = {}));
        var d = "undefined" != typeof window && "undefined" != typeof window.moment ? window.moment : require("moment");
        module.exports = b(d, c)
    } else
        a.daterangepicker = b(a.moment, a.jQuery)
}(this, function(a, b) {
    var c = function(c, d, e) {
        if (this.parentEl = "body",
        this.element = b(c),
        this.startDate = a().startOf("day"),
        this.endDate = a().endOf("day"),
        this.minDate = !1,
        this.maxDate = !1,
        this.maxSpan = !1,
        this.autoApply = !1,
        this.singleDatePicker = !1,
        this.showDropdowns = !1,
        this.minYear = a().subtract(100, "year").format("YYYY"),
        this.maxYear = a().add(100, "year").format("YYYY"),
        this.showWeekNumbers = !1,
        this.showISOWeekNumbers = !1,
        this.showCustomRangeLabel = !0,
        this.timePicker = !1,
        this.timePicker24Hour = !1,
        this.timePickerIncrement = 1,
        this.timePickerSeconds = !1,
        this.linkedCalendars = !0,
        this.autoUpdateInput = !0,
        this.alwaysShowCalendars = !1,
        this.ranges = {},
        this.opens = "right",
        this.element.hasClass("pull-right") && (this.opens = "left"),
        this.drops = "down",
        this.element.hasClass("dropup") && (this.drops = "up"),
        this.buttonClasses = "btn btn-sm",
        this.applyButtonClasses = "btn-primary",
        this.cancelButtonClasses = "btn-default",
        this.locale = {
            direction: "ltr",
            format: a.localeData().longDateFormat("L"),
            separator: " - ",
            applyLabel: "Apply",
            cancelLabel: "Cancel",
            weekLabel: "W",
            customRangeLabel: "Custom Range",
            daysOfWeek: a.weekdaysMin(),
            monthNames: a.monthsShort(),
            firstDay: a.localeData().firstDayOfWeek()
        },
        this.callback = function() {}
        ,
        this.isShowing = !1,
        this.leftCalendar = {},
        this.rightCalendar = {},
        ("object" !== typeof d || null === d) && (d = {}),
        d = b.extend(this.element.data(), d),
        "string" === typeof d.template || d.template instanceof b || (d.template = '<div class="daterangepicker"><div class="ranges"></div><div class="drp-calendar left"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-calendar right"><div class="calendar-table"></div><div class="calendar-time"></div></div><div class="drp-buttons"><span class="drp-selected"></span><button class="cancelBtn" type="button"></button><button class="applyBtn" disabled="disabled" type="button"></button> </div></div>'),
        this.parentEl = b(d.parentEl && b(d.parentEl).length ? d.parentEl : this.parentEl),
        this.container = b(d.template).appendTo(this.parentEl),
        "object" === typeof d.locale && ("string" === typeof d.locale.direction && (this.locale.direction = d.locale.direction),
        "string" === typeof d.locale.format && (this.locale.format = d.locale.format),
        "string" === typeof d.locale.separator && (this.locale.separator = d.locale.separator),
        "object" === typeof d.locale.daysOfWeek && (this.locale.daysOfWeek = d.locale.daysOfWeek.slice()),
        "object" === typeof d.locale.monthNames && (this.locale.monthNames = d.locale.monthNames.slice()),
        "number" === typeof d.locale.firstDay && (this.locale.firstDay = d.locale.firstDay),
        "string" === typeof d.locale.applyLabel && (this.locale.applyLabel = d.locale.applyLabel),
        "string" === typeof d.locale.cancelLabel && (this.locale.cancelLabel = d.locale.cancelLabel),
        "string" === typeof d.locale.weekLabel && (this.locale.weekLabel = d.locale.weekLabel),
        "string" === typeof d.locale.customRangeLabel)) {
            var f = document.createElement("textarea");
            f.innerHTML = d.locale.customRangeLabel;
            var g = f.value;
            this.locale.customRangeLabel = g
        }
        if (this.container.addClass(this.locale.direction),
        "string" === typeof d.startDate && (this.startDate = a(d.startDate, this.locale.format)),
        "string" === typeof d.endDate && (this.endDate = a(d.endDate, this.locale.format)),
        "string" === typeof d.minDate && (this.minDate = a(d.minDate, this.locale.format)),
        "string" === typeof d.maxDate && (this.maxDate = a(d.maxDate, this.locale.format)),
        "object" === typeof d.startDate && (this.startDate = a(d.startDate)),
        "object" === typeof d.endDate && (this.endDate = a(d.endDate)),
        "object" === typeof d.minDate && (this.minDate = a(d.minDate)),
        "object" === typeof d.maxDate && (this.maxDate = a(d.maxDate)),
        this.minDate && this.startDate.isBefore(this.minDate) && (this.startDate = this.minDate.clone()),
        this.maxDate && this.endDate.isAfter(this.maxDate) && (this.endDate = this.maxDate.clone()),
        "string" === typeof d.applyButtonClasses && (this.applyButtonClasses = d.applyButtonClasses),
        "string" === typeof d.applyClass && (this.applyButtonClasses = d.applyClass),
        "string" === typeof d.cancelButtonClasses && (this.cancelButtonClasses = d.cancelButtonClasses),
        "string" === typeof d.cancelClass && (this.cancelButtonClasses = d.cancelClass),
        "object" === typeof d.maxSpan && (this.maxSpan = d.maxSpan),
        "object" === typeof d.dateLimit && (this.maxSpan = d.dateLimit),
        "string" === typeof d.opens && (this.opens = d.opens),
        "string" === typeof d.drops && (this.drops = d.drops),
        "boolean" === typeof d.showWeekNumbers && (this.showWeekNumbers = d.showWeekNumbers),
        "boolean" === typeof d.showISOWeekNumbers && (this.showISOWeekNumbers = d.showISOWeekNumbers),
        "string" === typeof d.buttonClasses && (this.buttonClasses = d.buttonClasses),
        "object" === typeof d.buttonClasses && (this.buttonClasses = d.buttonClasses.join(" ")),
        "boolean" === typeof d.showDropdowns && (this.showDropdowns = d.showDropdowns),
        "number" === typeof d.minYear && (this.minYear = d.minYear),
        "number" === typeof d.maxYear && (this.maxYear = d.maxYear),
        "boolean" === typeof d.showCustomRangeLabel && (this.showCustomRangeLabel = d.showCustomRangeLabel),
        "boolean" === typeof d.singleDatePicker && (this.singleDatePicker = d.singleDatePicker,
        this.singleDatePicker && (this.endDate = this.startDate.clone())),
        "boolean" === typeof d.timePicker && (this.timePicker = d.timePicker),
        "boolean" === typeof d.timePickerSeconds && (this.timePickerSeconds = d.timePickerSeconds),
        "number" === typeof d.timePickerIncrement && (this.timePickerIncrement = d.timePickerIncrement),
        "boolean" === typeof d.timePicker24Hour && (this.timePicker24Hour = d.timePicker24Hour),
        "boolean" === typeof d.autoApply && (this.autoApply = d.autoApply),
        "boolean" === typeof d.autoUpdateInput && (this.autoUpdateInput = d.autoUpdateInput),
        "boolean" === typeof d.linkedCalendars && (this.linkedCalendars = d.linkedCalendars),
        "function" === typeof d.isInvalidDate && (this.isInvalidDate = d.isInvalidDate),
        "function" === typeof d.isCustomDate && (this.isCustomDate = d.isCustomDate),
        "boolean" === typeof d.alwaysShowCalendars && (this.alwaysShowCalendars = d.alwaysShowCalendars),
        0 != this.locale.firstDay)
            for (var h = this.locale.firstDay; h > 0; )
                this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()),
                h--;
        var i, j, k;
        if ("undefined" === typeof d.startDate && "undefined" === typeof d.endDate && b(this.element).is(":text")) {
            var l = b(this.element).val()
              , m = l.split(this.locale.separator);
            i = j = null,
            2 == m.length ? (i = a(m[0], this.locale.format),
            j = a(m[1], this.locale.format)) : this.singleDatePicker && "" !== l && (i = a(l, this.locale.format),
            j = a(l, this.locale.format)),
            null !== i && null !== j && (this.setStartDate(i),
            this.setEndDate(j))
        }
        if ("object" === typeof d.ranges) {
            for (k in d.ranges) {
                i = "string" === typeof d.ranges[k][0] ? a(d.ranges[k][0], this.locale.format) : a(d.ranges[k][0]),
                j = "string" === typeof d.ranges[k][1] ? a(d.ranges[k][1], this.locale.format) : a(d.ranges[k][1]),
                this.minDate && i.isBefore(this.minDate) && (i = this.minDate.clone());
                var n = this.maxDate;
                if (this.maxSpan && n && i.clone().add(this.maxSpan).isAfter(n) && (n = i.clone().add(this.maxSpan)),
                n && j.isAfter(n) && (j = n.clone()),
                !(this.minDate && j.isBefore(this.minDate, this.timepicker ? "minute" : "day") || n && i.isAfter(n, this.timepicker ? "minute" : "day"))) {
                    var f = document.createElement("textarea");
                    f.innerHTML = k;
                    var g = f.value;
                    this.ranges[g] = [i, j]
                }
            }
            var o = "<ul>";
            for (k in this.ranges)
                o += '<li data-range-key="' + k + '">' + k + "</li>";
            this.showCustomRangeLabel && (o += '<li data-range-key="' + this.locale.customRangeLabel + '">' + this.locale.customRangeLabel + "</li>"),
            o += "</ul>",
            this.container.find(".ranges").prepend(o)
        }
        "function" === typeof e && (this.callback = e),
        this.timePicker || (this.startDate = this.startDate.startOf("day"),
        this.endDate = this.endDate.endOf("day"),
        this.container.find(".calendar-time").hide()),
        this.timePicker && this.autoApply && (this.autoApply = !1),
        this.autoApply && this.container.addClass("auto-apply"),
        "object" === typeof d.ranges && this.container.addClass("show-ranges"),
        this.singleDatePicker && (this.container.addClass("single"),
        this.container.find(".drp-calendar.left").addClass("single"),
        this.container.find(".drp-calendar.left").show(),
        this.container.find(".drp-calendar.right").hide(),
        this.timePicker || this.container.addClass("auto-apply")),
        ("undefined" === typeof d.ranges && !this.singleDatePicker || this.alwaysShowCalendars) && this.container.addClass("show-calendar"),
        this.container.addClass("opens" + this.opens),
        this.container.find(".applyBtn, .cancelBtn").addClass(this.buttonClasses),
        this.applyButtonClasses.length && this.container.find(".applyBtn").addClass(this.applyButtonClasses),
        this.cancelButtonClasses.length && this.container.find(".cancelBtn").addClass(this.cancelButtonClasses),
        this.container.find(".applyBtn").html(this.locale.applyLabel),
        this.container.find(".cancelBtn").html(this.locale.cancelLabel),
        this.container.find(".drp-calendar").on("click.daterangepicker", ".prev", b.proxy(this.clickPrev, this)).on("click.daterangepicker", ".next", b.proxy(this.clickNext, this)).on("mousedown.daterangepicker", "td.available", b.proxy(this.clickDate, this)).on("mouseenter.daterangepicker", "td.available", b.proxy(this.hoverDate, this)).on("change.daterangepicker", "select.yearselect", b.proxy(this.monthOrYearChanged, this)).on("change.daterangepicker", "select.monthselect", b.proxy(this.monthOrYearChanged, this)).on("change.daterangepicker", "select.hourselect,select.minuteselect,select.secondselect,select.ampmselect", b.proxy(this.timeChanged, this)),
        this.container.find(".ranges").on("click.daterangepicker", "li", b.proxy(this.clickRange, this)),
        this.container.find(".drp-buttons").on("click.daterangepicker", "button.applyBtn", b.proxy(this.clickApply, this)).on("click.daterangepicker", "button.cancelBtn", b.proxy(this.clickCancel, this)),
        this.element.is("input") || this.element.is("button") ? this.element.on({
            "click.daterangepicker": b.proxy(this.show, this),
            "focus.daterangepicker": b.proxy(this.show, this),
            "keyup.daterangepicker": b.proxy(this.elementChanged, this),
            "keydown.daterangepicker": b.proxy(this.keydown, this)
        }) : (this.element.on("click.daterangepicker", b.proxy(this.toggle, this)),
        this.element.on("keydown.daterangepicker", b.proxy(this.toggle, this))),
        this.updateElement()
    };
    return c.prototype = {
        constructor: c,
        setStartDate: function(b) {
            "string" === typeof b && (this.startDate = a(b, this.locale.format)),
            "object" === typeof b && (this.startDate = a(b)),
            this.timePicker || (this.startDate = this.startDate.startOf("day")),
            this.timePicker && this.timePickerIncrement && this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement),
            this.minDate && this.startDate.isBefore(this.minDate) && (this.startDate = this.minDate.clone(),
            this.timePicker && this.timePickerIncrement && this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement)),
            this.maxDate && this.startDate.isAfter(this.maxDate) && (this.startDate = this.maxDate.clone(),
            this.timePicker && this.timePickerIncrement && this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement)),
            this.isShowing || this.updateElement(),
            this.updateMonthsInView()
        },
        setEndDate: function(b) {
            "string" === typeof b && (this.endDate = a(b, this.locale.format)),
            "object" === typeof b && (this.endDate = a(b)),
            this.timePicker || (this.endDate = this.endDate.add(1, "d").startOf("day").subtract(1, "second")),
            this.timePicker && this.timePickerIncrement && this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement),
            this.endDate.isBefore(this.startDate) && (this.endDate = this.startDate.clone()),
            this.maxDate && this.endDate.isAfter(this.maxDate) && (this.endDate = this.maxDate.clone()),
            this.maxSpan && this.startDate.clone().add(this.maxSpan).isBefore(this.endDate) && (this.endDate = this.startDate.clone().add(this.maxSpan)),
            this.previousRightTime = this.endDate.clone(),
            this.container.find(".drp-selected").html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format)),
            this.isShowing || this.updateElement(),
            this.updateMonthsInView()
        },
        isInvalidDate: function() {
            return !1
        },
        isCustomDate: function() {
            return !1
        },
        updateView: function() {
            this.timePicker && (this.renderTimePicker("left"),
            this.renderTimePicker("right"),
            this.endDate ? this.container.find(".right .calendar-time select").removeAttr("disabled").removeClass("disabled") : this.container.find(".right .calendar-time select").attr("disabled", "disabled").addClass("disabled")),
            this.endDate && this.container.find(".drp-selected").html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format)),
            this.updateMonthsInView(),
            this.updateCalendars(),
            this.updateFormInputs()
        },
        updateMonthsInView: function() {
            if (this.endDate) {
                if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month && (this.startDate.format("YYYY-MM") == this.leftCalendar.month.format("YYYY-MM") || this.startDate.format("YYYY-MM") == this.rightCalendar.month.format("YYYY-MM")) && (this.endDate.format("YYYY-MM") == this.leftCalendar.month.format("YYYY-MM") || this.endDate.format("YYYY-MM") == this.rightCalendar.month.format("YYYY-MM")))
                    return;
                this.leftCalendar.month = this.startDate.clone().date(2),
                this.rightCalendar.month = this.linkedCalendars || this.endDate.month() == this.startDate.month() && this.endDate.year() == this.startDate.year() ? this.startDate.clone().date(2).add(1, "month") : this.endDate.clone().date(2)
            } else
                this.leftCalendar.month.format("YYYY-MM") != this.startDate.format("YYYY-MM") && this.rightCalendar.month.format("YYYY-MM") != this.startDate.format("YYYY-MM") && (this.leftCalendar.month = this.startDate.clone().date(2),
                this.rightCalendar.month = this.startDate.clone().date(2).add(1, "month"));
            this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate && (this.rightCalendar.month = this.maxDate.clone().date(2),
            this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, "month"))
        },
        updateCalendars: function() {
            if (this.timePicker) {
                var a, b, c;
                if (this.endDate) {
                    if (a = parseInt(this.container.find(".left .hourselect").val(), 10),
                    b = parseInt(this.container.find(".left .minuteselect").val(), 10),
                    c = this.timePickerSeconds ? parseInt(this.container.find(".left .secondselect").val(), 10) : 0,
                    !this.timePicker24Hour) {
                        var d = this.container.find(".left .ampmselect").val();
                        "PM" === d && a < 12 && (a += 12),
                        "AM" === d && 12 === a && (a = 0)
                    }
                } else if (a = parseInt(this.container.find(".right .hourselect").val(), 10),
                b = parseInt(this.container.find(".right .minuteselect").val(), 10),
                c = this.timePickerSeconds ? parseInt(this.container.find(".right .secondselect").val(), 10) : 0,
                !this.timePicker24Hour) {
                    var d = this.container.find(".right .ampmselect").val();
                    "PM" === d && a < 12 && (a += 12),
                    "AM" === d && 12 === a && (a = 0)
                }
                this.leftCalendar.month.hour(a).minute(b).second(c),
                this.rightCalendar.month.hour(a).minute(b).second(c)
            }
            this.renderCalendar("left"),
            this.renderCalendar("right"),
            this.container.find(".ranges li").removeClass("active"),
            null != this.endDate && this.calculateChosenLabel()
        },
        renderCalendar: function(c) {
            var d = "left" == c ? this.leftCalendar : this.rightCalendar
              , e = d.month.month()
              , f = d.month.year()
              , g = d.month.hour()
              , h = d.month.minute()
              , i = d.month.second()
              , j = a([f, e]).daysInMonth()
              , k = a([f, e, 1])
              , l = a([f, e, j])
              , m = a(k).subtract(1, "month").month()
              , n = a(k).subtract(1, "month").year()
              , o = a([n, m]).daysInMonth()
              , p = k.day()
              , d = [];
            d.firstDay = k,
            d.lastDay = l;
            for (var q = 0; q < 6; q++)
                d[q] = [];
            var r = o - p + this.locale.firstDay + 1;
            r > o && (r -= 7),
            p == this.locale.firstDay && (r = o - 6);
            for (var t, u, s = a([n, m, r, 12, h, i]), q = 0, t = 0, u = 0; q < 42; q++,
            t++,
            s = a(s).add(24, "hour"))
                q > 0 && t % 7 === 0 && (t = 0,
                u++),
                d[u][t] = s.clone().hour(g).minute(h).second(i),
                s.hour(12),
                this.minDate && d[u][t].format("YYYY-MM-DD") == this.minDate.format("YYYY-MM-DD") && d[u][t].isBefore(this.minDate) && "left" == c && (d[u][t] = this.minDate.clone()),
                this.maxDate && d[u][t].format("YYYY-MM-DD") == this.maxDate.format("YYYY-MM-DD") && d[u][t].isAfter(this.maxDate) && "right" == c && (d[u][t] = this.maxDate.clone());
            "left" == c ? this.leftCalendar.calendar = d : this.rightCalendar.calendar = d;
            var v = "left" == c ? this.minDate : this.startDate
              , w = this.maxDate
              , z = ("left" == c ? this.startDate : this.endDate,
            "ltr" == this.locale.direction ? {
                left: "chevron-left",
                right: "chevron-right"
            } : {
                left: "chevron-right",
                right: "chevron-left"
            },
            '<table class="table-condensed">');
            z += "<thead>",
            z += "<tr>",
            (this.showWeekNumbers || this.showISOWeekNumbers) && (z += "<th></th>"),
            z += v && !v.isBefore(d.firstDay) || this.linkedCalendars && "left" != c ? "<th></th>" : '<th class="prev available"><span></span></th>';
            var A = this.locale.monthNames[d[1][1].month()] + d[1][1].format(" YYYY");
            if (this.showDropdowns) {
                for (var B = d[1][1].month(), C = d[1][1].year(), D = w && w.year() || this.maxYear, E = v && v.year() || this.minYear, F = C == E, G = C == D, H = '<select class="monthselect">', I = 0; I < 12; I++)
                    H += (!F || I >= v.month()) && (!G || I <= w.month()) ? "<option value='" + I + "'" + (I === B ? " selected='selected'" : "") + ">" + this.locale.monthNames[I] + "</option>" : "<option value='" + I + "'" + (I === B ? " selected='selected'" : "") + " disabled='disabled'>" + this.locale.monthNames[I] + "</option>";
                H += "</select>";
                for (var J = '<select class="yearselect">', K = E; K <= D; K++)
                    J += '<option value="' + K + '"' + (K === C ? ' selected="selected"' : "") + ">" + K + "</option>";
                J += "</select>",
                A = H + J
            }
            if (z += '<th colspan="5" class="month">' + A + "</th>",
            z += w && !w.isAfter(d.lastDay) || this.linkedCalendars && "right" != c && !this.singleDatePicker ? "<th></th>" : '<th class="next available"><span></span></th>',
            z += "</tr>",
            z += "<tr>",
            (this.showWeekNumbers || this.showISOWeekNumbers) && (z += '<th class="week">' + this.locale.weekLabel + "</th>"),
            b.each(this.locale.daysOfWeek, function(a, b) {
                z += "<th>" + b + "</th>"
            }),
            z += "</tr>",
            z += "</thead>",
            z += "<tbody>",
            null == this.endDate && this.maxSpan) {
                var L = this.startDate.clone().add(this.maxSpan).endOf("day");
                (!w || L.isBefore(w)) && (w = L)
            }
            for (var u = 0; u < 6; u++) {
                z += "<tr>",
                this.showWeekNumbers ? z += '<td class="week">' + d[u][0].week() + "</td>" : this.showISOWeekNumbers && (z += '<td class="week">' + d[u][0].isoWeek() + "</td>");
                for (var t = 0; t < 7; t++) {
                    var M = [];
                    d[u][t].isSame(new Date, "day") && M.push("today"),
                    d[u][t].isoWeekday() > 5 && M.push("weekend"),
                    d[u][t].month() != d[1][1].month() && M.push("off"),
                    this.minDate && d[u][t].isBefore(this.minDate, "day") && M.push("off", "disabled"),
                    w && d[u][t].isAfter(w, "day") && M.push("off", "disabled"),
                    this.isInvalidDate(d[u][t]) && M.push("off", "disabled"),
                    d[u][t].format("YYYY-MM-DD") == this.startDate.format("YYYY-MM-DD") && M.push("active", "start-date"),
                    null != this.endDate && d[u][t].format("YYYY-MM-DD") == this.endDate.format("YYYY-MM-DD") && M.push("active", "end-date"),
                    null != this.endDate && d[u][t] > this.startDate && d[u][t] < this.endDate && M.push("in-range");
                    var N = this.isCustomDate(d[u][t]);
                    N !== !1 && ("string" === typeof N ? M.push(N) : Array.prototype.push.apply(M, N));
                    for (var O = "", P = !1, q = 0; q < M.length; q++)
                        O += M[q] + " ",
                        "disabled" == M[q] && (P = !0);
                    P || (O += "available"),
                    z += '<td class="' + O.replace(/^\s+|\s+$/g, "") + '" data-title="r' + u + "c" + t + '">' + d[u][t].date() + "</td>"
                }
                z += "</tr>"
            }
            z += "</tbody>",
            z += "</table>",
            this.container.find(".drp-calendar." + c + " .calendar-table").html(z)
        },
        renderTimePicker: function(a) {
            if ("right" != a || this.endDate) {
                var b, c, d, e = this.maxDate;
                if (!this.maxSpan || this.maxDate && !this.startDate.clone().add(this.maxSpan).isAfter(this.maxDate) || (e = this.startDate.clone().add(this.maxSpan)),
                "left" == a)
                    c = this.startDate.clone(),
                    d = this.minDate;
                else if ("right" == a) {
                    c = this.endDate.clone(),
                    d = this.startDate;
                    var f = this.container.find(".drp-calendar.right .calendar-time");
                    if ("" != f.html() && (c.hour(c.hour() || f.find(".hourselect option:selected").val()),
                    c.minute(c.minute() || f.find(".minuteselect option:selected").val()),
                    c.second(c.second() || f.find(".secondselect option:selected").val()),
                    !this.timePicker24Hour)) {
                        var g = f.find(".ampmselect option:selected").val();
                        "PM" === g && c.hour() < 12 && c.hour(c.hour() + 12),
                        "AM" === g && 12 === c.hour() && c.hour(0)
                    }
                    c.isBefore(this.startDate) && (c = this.startDate.clone()),
                    e && c.isAfter(e) && (c = e.clone())
                }
                b = '<select class="hourselect">';
                for (var h = this.timePicker24Hour ? 0 : 1, i = this.timePicker24Hour ? 23 : 12, j = h; j <= i; j++) {
                    var k = j;
                    this.timePicker24Hour || (k = c.hour() >= 12 ? 12 == j ? 12 : j + 12 : 12 == j ? 0 : j);
                    var l = c.clone().hour(k)
                      , m = !1;
                    d && l.minute(59).isBefore(d) && (m = !0),
                    e && l.minute(0).isAfter(e) && (m = !0),
                    b += k != c.hour() || m ? m ? '<option value="' + j + '" disabled="disabled" class="disabled">' + j + "</option>" : '<option value="' + j + '">' + j + "</option>" : '<option value="' + j + '" selected="selected">' + j + "</option>"
                }
                b += "</select> ",
                b += ': <select class="minuteselect">';
                for (var j = 0; j < 60; j += this.timePickerIncrement) {
                    var n = j < 10 ? "0" + j : j
                      , l = c.clone().minute(j)
                      , m = !1;
                    d && l.second(59).isBefore(d) && (m = !0),
                    e && l.second(0).isAfter(e) && (m = !0),
                    b += c.minute() != j || m ? m ? '<option value="' + j + '" disabled="disabled" class="disabled">' + n + "</option>" : '<option value="' + j + '">' + n + "</option>" : '<option value="' + j + '" selected="selected">' + n + "</option>"
                }
                if (b += "</select> ",
                this.timePickerSeconds) {
                    b += ': <select class="secondselect">';
                    for (var j = 0; j < 60; j++) {
                        var n = j < 10 ? "0" + j : j
                          , l = c.clone().second(j)
                          , m = !1;
                        d && l.isBefore(d) && (m = !0),
                        e && l.isAfter(e) && (m = !0),
                        b += c.second() != j || m ? m ? '<option value="' + j + '" disabled="disabled" class="disabled">' + n + "</option>" : '<option value="' + j + '">' + n + "</option>" : '<option value="' + j + '" selected="selected">' + n + "</option>"
                    }
                    b += "</select> "
                }
                if (!this.timePicker24Hour) {
                    b += '<select class="ampmselect">';
                    var o = ""
                      , p = "";
                    d && c.clone().hour(12).minute(0).second(0).isBefore(d) && (o = ' disabled="disabled" class="disabled"'),
                    e && c.clone().hour(0).minute(0).second(0).isAfter(e) && (p = ' disabled="disabled" class="disabled"'),
                    b += c.hour() >= 12 ? '<option value="AM"' + o + '>AM</option><option value="PM" selected="selected"' + p + ">PM</option>" : '<option value="AM" selected="selected"' + o + '>AM</option><option value="PM"' + p + ">PM</option>",
                    b += "</select>"
                }
                this.container.find(".drp-calendar." + a + " .calendar-time").html(b)
            }
        },
        updateFormInputs: function() {
            this.singleDatePicker || this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)) ? this.container.find("button.applyBtn").removeAttr("disabled") : this.container.find("button.applyBtn").attr("disabled", "disabled")
        },
        move: function() {
            var c, a = {
                top: 0,
                left: 0
            }, d = b(window).width();
            this.parentEl.is("body") || (a = {
                top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                left: this.parentEl.offset().left - this.parentEl.scrollLeft()
            },
            d = this.parentEl[0].clientWidth + this.parentEl.offset().left),
            c = "up" == this.drops ? this.element.offset().top - this.container.outerHeight() - a.top : this.element.offset().top + this.element.outerHeight() - a.top,
            this.container["up" == this.drops ? "addClass" : "removeClass"]("drop-up"),
            "left" == this.opens ? (this.container.css({
                top: c,
                right: d - this.element.offset().left - this.element.outerWidth(),
                left: "auto"
            }),
            this.container.offset().left < 0 && this.container.css({
                right: "auto",
                left: 9
            })) : "center" == this.opens ? (this.container.css({
                top: c,
                left: this.element.offset().left - a.left + this.element.outerWidth() / 2 - this.container.outerWidth() / 2,
                right: "auto"
            }),
            this.container.offset().left < 0 && this.container.css({
                right: "auto",
                left: 9
            })) : (this.container.css({
                top: c,
                left: this.element.offset().left - a.left,
                right: "auto"
            }),
            this.container.offset().left + this.container.outerWidth() > b(window).width() && this.container.css({
                left: "auto",
                right: 0
            }))
        },
        show: function() {
            this.isShowing || (this._outsideClickProxy = b.proxy(function(a) {
                this.outsideClick(a)
            }, this),
            b(document).on("mousedown.daterangepicker", this._outsideClickProxy).on("touchend.daterangepicker", this._outsideClickProxy).on("click.daterangepicker", "[data-toggle=dropdown]", this._outsideClickProxy).on("focusin.daterangepicker", this._outsideClickProxy),
            b(window).on("resize.daterangepicker", b.proxy(function(a) {
                this.move(a)
            }, this)),
            this.oldStartDate = this.startDate.clone(),
            this.oldEndDate = this.endDate.clone(),
            this.previousRightTime = this.endDate.clone(),
            this.updateView(),
            this.container.show(),
            this.move(),
            this.element.trigger("show.daterangepicker", this),
            this.isShowing = !0)
        },
        hide: function() {
            this.isShowing && (this.endDate || (this.startDate = this.oldStartDate.clone(),
            this.endDate = this.oldEndDate.clone()),
            this.startDate.isSame(this.oldStartDate) && this.endDate.isSame(this.oldEndDate) || this.callback(this.startDate.clone(), this.endDate.clone(), this.chosenLabel),
            this.updateElement(),
            b(document).off(".daterangepicker"),
            b(window).off(".daterangepicker"),
            this.container.hide(),
            this.element.trigger("hide.daterangepicker", this),
            this.isShowing = !1)
        },
        toggle: function() {
            this.isShowing ? this.hide() : this.show()
        },
        outsideClick: function(a) {
            var c = b(a.target);
            "focusin" == a.type || c.closest(this.element).length || c.closest(this.container).length || c.closest(".calendar-table").length || (this.hide(),
            this.element.trigger("outsideClick.daterangepicker", this))
        },
        showCalendars: function() {
            this.container.addClass("show-calendar"),
            this.move(),
            this.element.trigger("showCalendar.daterangepicker", this)
        },
        hideCalendars: function() {
            this.container.removeClass("show-calendar"),
            this.element.trigger("hideCalendar.daterangepicker", this)
        },
        clickRange: function(a) {
            var b = a.target.getAttribute("data-range-key");
            if (this.chosenLabel = b,
            b == this.locale.customRangeLabel)
                this.showCalendars();
            else {
                var c = this.ranges[b];
                this.startDate = c[0],
                this.endDate = c[1],
                this.timePicker || (this.startDate.startOf("day"),
                this.endDate.endOf("day")),
                this.alwaysShowCalendars || this.hideCalendars(),
                this.clickApply()
            }
        },
        clickPrev: function(a) {
            var c = b(a.target).parents(".drp-calendar");
            c.hasClass("left") ? (this.leftCalendar.month.subtract(1, "month"),
            this.linkedCalendars && this.rightCalendar.month.subtract(1, "month")) : this.rightCalendar.month.subtract(1, "month"),
            this.updateCalendars()
        },
        clickNext: function(a) {
            var c = b(a.target).parents(".drp-calendar");
            c.hasClass("left") ? this.leftCalendar.month.add(1, "month") : (this.rightCalendar.month.add(1, "month"),
            this.linkedCalendars && this.leftCalendar.month.add(1, "month")),
            this.updateCalendars()
        },
        hoverDate: function(a) {
            if (b(a.target).hasClass("available")) {
                var c = b(a.target).attr("data-title")
                  , d = c.substr(1, 1)
                  , e = c.substr(3, 1)
                  , f = b(a.target).parents(".drp-calendar")
                  , g = f.hasClass("left") ? this.leftCalendar.calendar[d][e] : this.rightCalendar.calendar[d][e]
                  , h = this.leftCalendar
                  , i = this.rightCalendar
                  , j = this.startDate;
                this.endDate || this.container.find(".drp-calendar tbody td").each(function(a, c) {
                    if (!b(c).hasClass("week")) {
                        var d = b(c).attr("data-title")
                          , e = d.substr(1, 1)
                          , f = d.substr(3, 1)
                          , k = b(c).parents(".drp-calendar")
                          , l = k.hasClass("left") ? h.calendar[e][f] : i.calendar[e][f];
                        l.isAfter(j) && l.isBefore(g) || l.isSame(g, "day") ? b(c).addClass("in-range") : b(c).removeClass("in-range")
                    }
                })
            }
        },
        clickDate: function(a) {
            if (b(a.target).hasClass("available")) {
                var c = b(a.target).attr("data-title")
                  , d = c.substr(1, 1)
                  , e = c.substr(3, 1)
                  , f = b(a.target).parents(".drp-calendar")
                  , g = f.hasClass("left") ? this.leftCalendar.calendar[d][e] : this.rightCalendar.calendar[d][e];
                if (this.endDate || g.isBefore(this.startDate, "day")) {
                    if (this.timePicker) {
                        var h = parseInt(this.container.find(".left .hourselect").val(), 10);
                        if (!this.timePicker24Hour) {
                            var i = this.container.find(".left .ampmselect").val();
                            "PM" === i && h < 12 && (h += 12),
                            "AM" === i && 12 === h && (h = 0)
                        }
                        var j = parseInt(this.container.find(".left .minuteselect").val(), 10)
                          , k = this.timePickerSeconds ? parseInt(this.container.find(".left .secondselect").val(), 10) : 0;
                        g = g.clone().hour(h).minute(j).second(k)
                    }
                    this.endDate = null,
                    this.setStartDate(g.clone())
                } else if (!this.endDate && g.isBefore(this.startDate))
                    this.setEndDate(this.startDate.clone());
                else {
                    if (this.timePicker) {
                        var h = parseInt(this.container.find(".right .hourselect").val(), 10);
                        if (!this.timePicker24Hour) {
                            var i = this.container.find(".right .ampmselect").val();
                            "PM" === i && h < 12 && (h += 12),
                            "AM" === i && 12 === h && (h = 0)
                        }
                        var j = parseInt(this.container.find(".right .minuteselect").val(), 10)
                          , k = this.timePickerSeconds ? parseInt(this.container.find(".right .secondselect").val(), 10) : 0;
                        g = g.clone().hour(h).minute(j).second(k)
                    }
                    this.setEndDate(g.clone()),
                    this.autoApply && (this.calculateChosenLabel(),
                    this.clickApply())
                }
                this.singleDatePicker && (this.setEndDate(this.startDate),
                this.timePicker || this.clickApply()),
                this.updateView(),
                a.stopPropagation()
            }
        },
        calculateChosenLabel: function() {
            var a = !0
              , b = 0;
            for (var c in this.ranges) {
                if (this.timePicker) {
                    var d = this.timePickerSeconds ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD HH:mm";
                    if (this.startDate.format(d) == this.ranges[c][0].format(d) && this.endDate.format(d) == this.ranges[c][1].format(d)) {
                        a = !1,
                        this.chosenLabel = this.container.find(".ranges li:eq(" + b + ")").addClass("active").attr("data-range-key");
                        break
                    }
                } else if (this.startDate.format("YYYY-MM-DD") == this.ranges[c][0].format("YYYY-MM-DD") && this.endDate.format("YYYY-MM-DD") == this.ranges[c][1].format("YYYY-MM-DD")) {
                    a = !1,
                    this.chosenLabel = this.container.find(".ranges li:eq(" + b + ")").addClass("active").attr("data-range-key");
                    break
                }
                b++
            }
            a && (this.chosenLabel = this.showCustomRangeLabel ? this.container.find(".ranges li:last").addClass("active").attr("data-range-key") : null,
            this.showCalendars())
        },
        clickApply: function() {
            this.hide(),
            this.element.trigger("apply.daterangepicker", this)
        },
        clickCancel: function() {
            this.startDate = this.oldStartDate,
            this.endDate = this.oldEndDate,
            this.hide(),
            this.element.trigger("cancel.daterangepicker", this)
        },
        monthOrYearChanged: function(a) {
            var c = b(a.target).closest(".drp-calendar").hasClass("left")
              , d = c ? "left" : "right"
              , e = this.container.find(".drp-calendar." + d)
              , f = parseInt(e.find(".monthselect").val(), 10)
              , g = e.find(".yearselect").val();
            c || (g < this.startDate.year() || g == this.startDate.year() && f < this.startDate.month()) && (f = this.startDate.month(),
            g = this.startDate.year()),
            this.minDate && (g < this.minDate.year() || g == this.minDate.year() && f < this.minDate.month()) && (f = this.minDate.month(),
            g = this.minDate.year()),
            this.maxDate && (g > this.maxDate.year() || g == this.maxDate.year() && f > this.maxDate.month()) && (f = this.maxDate.month(),
            g = this.maxDate.year()),
            c ? (this.leftCalendar.month.month(f).year(g),
            this.linkedCalendars && (this.rightCalendar.month = this.leftCalendar.month.clone().add(1, "month"))) : (this.rightCalendar.month.month(f).year(g),
            this.linkedCalendars && (this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, "month"))),
            this.updateCalendars()
        },
        timeChanged: function(a) {
            var c = b(a.target).closest(".drp-calendar")
              , d = c.hasClass("left")
              , e = parseInt(c.find(".hourselect").val(), 10)
              , f = parseInt(c.find(".minuteselect").val(), 10)
              , g = this.timePickerSeconds ? parseInt(c.find(".secondselect").val(), 10) : 0;
            if (!this.timePicker24Hour) {
                var h = c.find(".ampmselect").val();
                "PM" === h && e < 12 && (e += 12),
                "AM" === h && 12 === e && (e = 0)
            }
            if (d) {
                var i = this.startDate.clone();
                i.hour(e),
                i.minute(f),
                i.second(g),
                this.setStartDate(i),
                this.singleDatePicker ? this.endDate = this.startDate.clone() : this.endDate && this.endDate.format("YYYY-MM-DD") == i.format("YYYY-MM-DD") && this.endDate.isBefore(i) && this.setEndDate(i.clone())
            } else if (this.endDate) {
                var j = this.endDate.clone();
                j.hour(e),
                j.minute(f),
                j.second(g),
                this.setEndDate(j)
            }
            this.updateCalendars(),
            this.updateFormInputs(),
            this.renderTimePicker("left"),
            this.renderTimePicker("right")
        },
        elementChanged: function() {
            if (this.element.is("input") && this.element.val().length) {
                var b = this.element.val().split(this.locale.separator)
                  , c = null
                  , d = null;
                2 === b.length && (c = a(b[0], this.locale.format),
                d = a(b[1], this.locale.format)),
                (this.singleDatePicker || null === c || null === d) && (c = a(this.element.val(), this.locale.format),
                d = c),
                c.isValid() && d.isValid() && (this.setStartDate(c),
                this.setEndDate(d),
                this.updateView())
            }
        },
        keydown: function(a) {
            (9 === a.keyCode || 13 === a.keyCode) && this.hide(),
            27 === a.keyCode && (a.preventDefault(),
            a.stopPropagation(),
            this.hide())
        },
        updateElement: function() {
            if (this.element.is("input") && this.autoUpdateInput) {
                var a = this.startDate.format(this.locale.format);
                this.singleDatePicker || (a += this.locale.separator + this.endDate.format(this.locale.format)),
                a !== this.element.val() && this.element.val(a).trigger("change")
            }
        },
        remove: function() {
            this.container.remove(),
            this.element.off(".daterangepicker"),
            this.element.removeData()
        }
    },
    b.fn.daterangepicker = function(a, d) {
        var e = b.extend(!0, {}, b.fn.daterangepicker.defaultOptions, a);
        return this.each(function() {
            var a = b(this);
            a.data("daterangepicker") && a.data("daterangepicker").remove(),
            a.data("daterangepicker", new c(a,e,d))
        }),
        this
    }
    ,
    c
});
