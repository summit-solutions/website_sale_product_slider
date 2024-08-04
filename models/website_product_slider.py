# © 2019 Nedas Žilinskas <nedas.zilinskas@gmail.com>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

from odoo import fields, models


class WebsiteProductSlider(models.Model):

    _name = 'website.product_slider'
    _description = 'Product Slider'

    name = fields.Char(
        string='Name (internal)',
        required=True,
    )

    title = fields.Char(
        required=True,
        translate=True,
    )

    products = fields.Many2many(
        comodel_name='product.template',
        required=True,
    )

    columns = fields.Selection(
        string='Products per Slide',
        selection=[
            ('1', '1'),
            ('2', '2'),
            ('3', '3'),
            ('4', '4'),
            ('6', '6'),
        ],
        required=True,
    )

    interval = fields.Integer(
        string='Slide Interval (ms)',
        required=True,
    )

    pause = fields.Boolean(
        string='Pause on Mouseover',
    )

    wrap = fields.Boolean()
