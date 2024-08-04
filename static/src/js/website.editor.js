/* © 2019 Nedas Žilinskas <nedas.zilinskas@gmail.com>
 * License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
 */
odoo.define('website_sale_product_slider.editor', function(require) {
    "use strict";

    var core = require('web.core');
    var website = require('website.utils');
    var options = require('web_editor.snippets.options');

    var _t = core._t;

    options.registry.website_sale_product_slider = options.Class.extend({

        on_prompt: function() {
            var self = this;
            return website.prompt({
                window_title: _t("Select Product Slider"),
                select: _t("Product Slider"),
                init: function(field) {
                    var current_id = parseInt(self.$target.attr('data-id'));
                    var select = field[0];
                    self._rpc({
                        model: 'website.product_slider',
                        method: 'search_read',
                    }).then(function(sliders) {
                        for (var i in sliders) {
                            var option_id = sliders[i].id;
                            var option_name = sliders[i].name;
                            var option_select = current_id == option_id ? true : false;
                            var option = new Option(option_name, option_id);
                            if (option_select) {
                                option.selected = true;
                            }
                            select.options[select.options.length] = option;
                        }
                    });
                },
            }).then(function(res) {
                self.$target.attr('data-id', res.val);
            });
        },

        onBuilt: function() {
            var self = this;
            return self.on_prompt().catch(function() {
                self.$target.remove();
            });
        },

        switchSlider: function(previewMode) {
            return this.on_prompt();
        },

        cleanForSave: function() {
            this.$target.empty();
        }

    });
});
