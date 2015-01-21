(function ($) {
    $.fn.placeholder = function (options) {
        var defaults = {
            pColor: "#ccc",
            pActive: "#999",
            pFont: "14px",
            activeBorder: "#080",
            posL: 8,
            zIndex: "99"
        },
        opts = $.extend(defaults, options);
        //
        return this.each(function () {
            if ("placeholder" in document.createElement("input")) return;
            
            var $this = $(this);
            
            if($this.is(":hidden")) return;
            
            if($this.hasClass('holder-label')) return;

            $this.parent().css({
            	"position": "relative",
            	"zoom" : "1"//触发ie6和ie7下的haslayout
            });
            //console.log($(this).position().top);
            //不支持placeholder的浏览器
            var msg = $this.attr("placeholder"),
                iH = $this.outerHeight(),
                iW = $this.outerWidth(),
                iX = $this.position().left,
                iY = $this.position().top,
                oInput = $("<label>", {
                "class": "holder-label",
                "text": msg,
                "css": {
                    "text-align": "left",
                    "padding-top": "0",
                    "position": "absolute",
                    "left": iX + "px",
                    "top": iY + "px",
                    "width": iW - opts.posL + "px",
                    "padding-left": opts.posL + "px",
                    "height": iH + "px",
                    "line-height": iH + "px",
                    "color": opts.pColor,
                    "font-size": opts.pFont,
                    "z-index": opts.zIndex,
                    "cursor": "text"
                }
                }).insertBefore($this);
            //初始状态就有内容
            var value = $this.val();
            if (value.length > 0) {
            oInput.hide();
            };
  
            //
            $this.on("focus", function () {
                var value = $(this).val();
                if (value.length > 0) {
                    oInput.hide();
                }
                oInput.css("color", opts.pActive);
  
                $(this).on("propertychange input", function () {
                    var value = $(this).val();
                    if (value.length == 0) {
                        oInput.show();
                    } else {
                        oInput.hide();
                    }
                });
  
            }).on("blur", function () {
                var value = $(this).val();
                if (value.length == 0) {
                    oInput.css("color", opts.pColor).show();
                }
            });
            //
            oInput.on("click", function () {
                $this.trigger("focus");
                $(this).css("color", opts.pActive)
            });
            //
            $this.filter(":focus").trigger("focus");
        });
    }
})(jQuery);