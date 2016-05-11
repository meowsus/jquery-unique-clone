;(function ($, window, document, undefined) {
    var pluginName = "uniqueClone";

    function Plugin(element, withDataAndEvents, deepWithDataAndEvents, suffix) {
        this.element = element;

        if (typeof withDataAndEvents === 'undefined' || withDataAndEvents === null) {
            withDataAndEvents = false;
        }

        if (typeof deepWithDataAndEvents === 'undefined' || deepWithDataAndEvents === null) {
            deepWithDataAndEvents = withDataAndEvents;
        }

        if (typeof suffix === 'undefined' || suffix === null) {
            suffix = '-clone';
        }

        this._withDataAndEvents = withDataAndEvents;
        this._deepWithDataAndEvents = deepWithDataAndEvents;
        this._suffix = suffix;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        init: function() {
            var suffix = this._suffix;

            this._$clone = $(this.element).clone(this._withDataAndEvents, this._deepWithDataAndEvents);

            this._$clone
                .find('[id]')
                    .addBack('[id]')
                    .attr('id', function (index, id) {
                        return id + suffix;
                    });

            this._$clone
                .find('[for]')
                    .addBack('[for]')
                    .attr('for', function (index, id) {
                        return id + suffix;
                    });
        },
    };

    $.fn[pluginName] = function (withDataAndEvents, deepWithDataAndEvents, suffix) {
        return (new Plugin(this, withDataAndEvents, deepWithDataAndEvents, suffix))._$clone;
    };

})(jQuery, window, document);
