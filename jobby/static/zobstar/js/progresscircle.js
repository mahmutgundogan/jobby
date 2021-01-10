function makesvg(c, t="") {
    var r = Math.abs(c).toString()
      , e = c.toString()
      , s = '<svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg"><circle class="circle-chart__background" cx="16.9" cy="16.9" r="15.9" /><circle class="circle-chart__circle ' + (c < 0 ? "danger-stroke circle-chart__circle--negative" : c > 0 && c <= 30 ? "warning-stroke" : "success-stroke") + '"stroke-dasharray="' + r + ',100"    cx="16.9" cy="16.9" r="15.9" /><g class="circle-chart__info">   <text class="circle-chart__percent" x="17.9" y="15.4">' + e + "%</text>";
    return t && (s += '<text class="circle-chart__subline" x="16.91549431" y="23">' + t + "</text>"),
    s += " </g></svg>"
}
!function(c) {
    c.fn.circlechart = function() {
        return this.each(function() {
            var t = c(this).data("percentage")
              , r = c(this).text();
            c(this).html(makesvg(t, r))
        }),
        this
    }
}(jQuery);
