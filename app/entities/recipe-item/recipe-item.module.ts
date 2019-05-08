import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DelcampoSharedModule } from '../../shared';
import {
    RecipeItemService,
    RecipeItemPopupService,
    RecipeItemComponent,
    RecipeItemDetailComponent,
    RecipeItemDialogComponent,
    RecipeItemPopupComponent,
    RecipeItemDeletePopupComponent,
    RecipeItemDeleteDialogComponent,
    recipeItemRoute,
    recipeItemPopupRoute,
    RecipeItemResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...recipeItemRoute,
    ...recipeItemPopupRoute,
];

@NgModule({
    imports: [
        DelcampoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RecipeItemComponent,
        RecipeItemDetailComponent,
        RecipeItemDialogComponent,
        RecipeItemDeleteDialogComponent,
        RecipeItemPopupComponent,
        RecipeItemDeletePopupComponent,
    ],
    entryComponents: [
        RecipeItemComponent,
        RecipeItemDialogComponent,
        RecipeItemPopupComponent,
        RecipeItemDeleteDialogComponent,
        RecipeItemDeletePopupComponent,
    ],
    providers: [
        RecipeItemService,
        RecipeItemPopupService,
        RecipeItemResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DelcampoRecipeItemModule {}
