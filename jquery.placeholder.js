/**
 * Created with JetBrains WebStorm.
 * User: Eugene Grebeshkov
 * Date: 13.06.12
 * Time: 9:54
 * To change this template use File | Settings | File Templates.
 */
(function($) {

    $.widget("custom.placeholder", {


        // These options will be used as defaults

        options: {
            placeholderText:""
        },

        txtElem:null,
        // Set up the widget
        _create: function() {
            if(!this._isPlaceholderSupported()){
                //var wrap=$("<div>").addClass("b-vivo-editor-for_placeholder");
                this.txtElem=$("<div>")
                    .addClass("b-vivo-editor-for_placeholder-text")
                    .text(this.options["placeholderText"])
                    .click($.proxy(function(){this.element.focus()},this));
                
                //this.element.wrap(wrap);
                this.txtElem.prependTo(document.body);
                this.positionUpdate();

                //this.element.bind("change.placeholder", $.proxy(this._inputChange, this));
                this.element.bind("focusin.placeholder", $.proxy(this._inputFocusIn, this));
                this.element.bind("focusout.placeholder", $.proxy(this._inputFocusOut, this));

            }
        else return false;
        
        },
        _init: function() {
        },
        positionUpdate:function(){
            if (!this.txtElem) return;
            if (!this.element.is(":visible")||this.element.val()!=""||this.element.is(":focus")){
                //console.info("elmenet is invisible or non-empty"+this.txtElem.html());
                this.txtElem.hide();
                return;
            }
            var offset=this.element.offset();
            this.txtElem.css({top:offset.top+5,left:offset.left+5});
            this.txtElem.show();
        },

        _isPlaceholderSupported:function(){
            var i = document.createElement('input');
            return 'placeholder' in i;
        },
        _inputFocusIn:function(e){

            this.txtElem.hide();

        },
        _inputFocusOut:function(e){
            if (this.element.val()=="")
                this.txtElem.show();

        },

        // Use the _setOption method to respond to changes to options

        _setOption: function(key, value) {

            switch(key) {

                case "clear":
                    // handle changes to clear option

                    break;

            }

            // In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget

            $.Widget.prototype._setOption.apply(this, arguments);
            // In jQuery UI 1.9 and above, you use the _super method instead
            //this._super("_setOption", key, value);

        },

        // Use the destroy method to clean up any modifications your widget has made to the DOM

        destroy: function() {

            // In jQuery UI 1.8, you must invoke the destroy method from the base widget

            $.Widget.prototype.destroy.call(this);
            // In jQuery UI 1.9 and above, you would define _destroy instead of destroy and not call the base method
            this.txtElem.remove();
            this.element.unbind("focusin.placeholder");
            this.element.unbind("focusout.placeholder");

        }

    });

} (jQuery));

