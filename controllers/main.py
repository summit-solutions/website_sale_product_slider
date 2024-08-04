# © 2019 Nedas Žilinskas <nedas.zilinskas@gmail.com>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

import time
from odoo.http import request, route
from odoo.addons.website_sale.controllers import main
from odoo.addons.http_routing.models.ir_http import slug


class WebsiteSale(main.WebsiteSale):

    @route(
        '/website_sale_product_slider/'
        '<model("website.product_slider"):slider>',
        type='http',
        auth='public',
        website=True,
    )
    def website_sale_product_slider(self, slider, **kw):
        if not request.env.context.get('pricelist'):
            pricelist = request.website.get_current_pricelist()
        else:
            pricelist = request.env['product.pricelist'].browse(
                request.env.context.get('pricelist')
            )

        slider = slider.with_context(pricelist=pricelist.id)

        def chunks(lst, size):
            """Yield successive n-sized chunks from lst."""
            for iteration in range(0, len(lst), size):
                yield lst[iteration:iteration + size]

        def keep(url, **kwargs):
            return url

        # compute_currency = self._get_compute_currency(
        #     pricelist,
        #     slider.products[:1],
        # )

        pager = {
            'page': {
                'num': 1,
            }
        }

        values = {
            'id': slider.id,
            'random_id': "%s%s" % (slider.id, int(time.time())),
            'title': slider.title,
            'rows': list(chunks(slider.products, int(slider.columns))),
            'cols': int(slider.columns),
            'interval': str(slider.interval),
            'pause': "hover" if slider.pause else "false",
            'wrap': "true" if slider.wrap else "false",
            'keep': keep,
            # 'slug': slug,
            # 'compute_currency': compute_currency,
            'pager': pager,
        }

        return request.render(
            "website_sale_product_slider.product_slider_dynamic_template",
            values
        )
