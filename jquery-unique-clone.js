/**
 * Clones an element, modifying any [id] or [for] attributes found within the
 * element's scope to append a given suffix. Modeled after the core `$.clone()`
 * method.
 *
 * @author   Curt Howard <tooblies@gmail.com>
 * @version  1.0.0
 *
 * @param    {Object}    $         the global jQuery object
 * @param    {Object}    window    the global window object
 * @param    {Object}    document  the global document object
 * @param    {undefined} undefined
 */
;(function ($, window, document, undefined) {
    var pluginName = "uniqueClone";

    /**
     * Plugin boilerplate. Checking and setting of passed arguments.
     *
     * @param {Element} element               the target element
     * @param {Boolean} withDataAndEvents     clone with data and events of element
     * @param {Boolean} deepWithDataAndEvents clone with data and events of element and it's children
     * @param {String}  suffix                the string to append to the attribute value
     */
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

    /**
     * Clones the element, passing in the first two parameters sent to the
     * Plugin. Modifies the value of any [id] or [for] attribute found to append
     * the given suffix.
     *
     * @type {Object}
     */
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

    /**
     * Receives three arguments in order to initialize the Plugin. Returns a
     * property of the Plugin's instance representing the cloned, modified DOM.
     */

    /**
     * Public interface for the Plugin. Receives arguments, passing them to the
     * Plugin's boilerplate for initialization.
     *
     * @param  {Boolean} withDataAndEvents     clone with data and events of element
     * @param  {Boolean} deepWithDataAndEvents clone with data and events of element and it's children
     * @param  {String}  suffix                the string to append to the attribute value
     * @return {jQuery}                        a collection containing a cloned, modified version of element
     */
    $.fn[pluginName] = function (withDataAndEvents, deepWithDataAndEvents, suffix) {
        return (new Plugin(this, withDataAndEvents, deepWithDataAndEvents, suffix))._$clone;
    };

})(jQuery, window, document);
