/* © 2019 Nedas Žilinskas <nedas.zilinskas@gmail.com>
 * License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
 */
odoo.define('website_sale_product_slider.animation', function(require) {
    "use strict";

    var session = require('web.session');
    var ajax = require('web.ajax');
    var core = require('web.core');
    var Widget = require('web.Widget');
    var animation = require('website.content.snippets.animation');

    var qweb = core.qweb;

    var WebsiteSaleProductSlider = Widget.extend({
        events: {},
        init: function(parent, id) {
            this.template = 'website_sale_product_slider.s_product_slider_' + id;
            this._super(parent);
        },
        start: function() {
            this.$el.find('.carousel').carousel('cycle');

            this.$el.find('.oe_website_sale .a-submit').off('click').on('click', function(event) {
                if (!event.isDefaultPrevented() && !$(this).is(".disabled")) {
                    $(this).closest('form').submit();
                }
            });
        }
    });

    animation.registry.website_sale_product_slider = animation.Class.extend({
        selector: ".website_sale_product_slider",
        widget: null,
        start: function() {
            if (this.editableMode) {
                return;
            }

            var self = this;
            var target = self.$target.empty();
            var id = parseInt(target.attr('data-id'));

            if (!id) {
                return;
            }

            console.log('here')
            return ajax.loadXML('/website_sale_product_slider/' + id, qweb).then(function() {
                self.widget = new WebsiteSaleProductSlider(self, id);
                self.widget.appendTo(target);
            });

        },
        stop: function() {
            this.widget.destroy();
        }
    });

});
