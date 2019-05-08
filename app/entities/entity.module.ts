import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DelcampoCountryModule } from './country/country.module';
import { DelcampoStateProvinceModule } from './state-province/state-province.module';
import { DelcampoCityModule } from './city/city.module';
import { DelcampoZoneModule } from './zone/zone.module';
import { DelcampoLocationModule } from './location/location.module';
import { DelcampoProductCategoryModule } from './product-category/product-category.module';
import { DelcampoProductTypeModule } from './product-type/product-type.module';
import { DelcampoYoutubeVideoModule } from './youtube-video/youtube-video.module';
import { DelcampoProductModule } from './product/product.module';
import { DelcampoImageModule } from './image/image.module';
import { DelcampoManufacturedProductTypeModule } from './manufactured-product-type/manufactured-product-type.module';
import { DelcampoStockInputModule } from './stock-input/stock-input.module';
import { DelcampoStockInputHasStateModule } from './stock-input-has-state/stock-input-has-state.module';
import { DelcampoPriceListModule } from './price-list/price-list.module';
import { DelcampoDiscountListModule } from './discount-list/discount-list.module';
import { DelcampoRecipeModule } from './recipe/recipe.module';
import { DelcampoRecipeItemModule } from './recipe-item/recipe-item.module';
import { DelcampoInvoiceModule } from './invoice/invoice.module';
import { DelcampoInvoiceItemModule } from './invoice-item/invoice-item.module';
import { DelcampoShoppingCarModule } from './shopping-car/shopping-car.module';
import { DelcampoInvoiceHasStateModule } from './invoice-has-state/invoice-has-state.module';
import { DelcampoVehicleModule } from './vehicle/vehicle.module';
import { DelcampoDeliveryRouteModule } from './delivery-route/delivery-route.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DelcampoCountryModule,
        DelcampoStateProvinceModule,
        DelcampoCityModule,
        DelcampoZoneModule,
        DelcampoLocationModule,
        DelcampoProductCategoryModule,
        DelcampoProductTypeModule,
        DelcampoYoutubeVideoModule,
        DelcampoProductModule,
        DelcampoImageModule,
        DelcampoManufacturedProductTypeModule,
        DelcampoStockInputModule,
        DelcampoStockInputHasStateModule,
        DelcampoPriceListModule,
        DelcampoDiscountListModule,
        DelcampoRecipeModule,
        DelcampoRecipeItemModule,
        DelcampoInvoiceModule,
        DelcampoInvoiceItemModule,
        DelcampoShoppingCarModule,
        DelcampoInvoiceHasStateModule,
        DelcampoVehicleModule,
        DelcampoDeliveryRouteModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DelcampoEntityModule {}
