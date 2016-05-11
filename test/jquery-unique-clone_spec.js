var chai   = require('chai'),
    expect = chai.expect,
    sinon  = require('sinon'),
    jQuery = require('jQuery'),
    jsdom  = require('jsdom').jsdom,

    document = global.document = jsdom('<html><body></body></html>'),
    window   = global.window   = document.defaultView,

    $ = global.jQuery = jQuery(window);

chai.use(require('sinon-chai'));

require('../jquery-unique-clone');
describe('uniqueClone', function () {
    var $label, $input;

    $label = $('<label for="foobar">Foo Bar</label>');
    $input = $('<input type="text" id="foobar">');

    beforeEach(function () {
        $('body').append($label);
        $('body').append($input);
    });

    afterEach(function () {
        $('body').empty();
    });

    it('should mimic $.clone', function () {
        var spy = sinon.spy($.prototype, 'clone');

        $label.uniqueClone();
        $label.uniqueClone(true);
        $label.uniqueClone(true, false);

        expect(spy.callCount).to.equal(3);

        expect(spy.getCall(0).args[0]).to.equal(false);
        expect(spy.getCall(0).args[1]).to.equal(false);

        expect(spy.getCall(1).args[0]).to.equal(true);
        expect(spy.getCall(1).args[1]).to.equal(true);

        expect(spy.getCall(2).args[0]).to.equal(true);
        expect(spy.getCall(2).args[1]).to.equal(false);

        spy.restore();
    });

    it('should update the ID attribute value for an element', function () {
        expect($input.uniqueClone().attr('id')).to.equal('foobar-clone');
        expect($input.attr('id')).to.equal('foobar');
    });

    it('should update the FOR attribute value for an element', function () {
        expect($label.uniqueClone().attr('for')).to.equal('foobar-clone');
        expect($label.attr('for')).to.equal('foobar');
    });

    it('should update all ID and FOR attributes within a given scope', function () {
        var $container = $('body').uniqueClone();

        expect($('input', $container).attr('id')).to.equal('foobar-clone');
        expect($('label', $container).attr('for')).to.equal('foobar-clone');
    });
});
