import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Product } from './product.model';
import { ProductService } from './product.service';
import { Image, ImageService } from '../image';
import { User, UserService, Principal } from '../../shared';
import { StockInput, StockInputService } from '../stock-input';
import { StockInputHasState, StockInputHasStateService } from '../stock-input-has-state';
import { PriceList, PriceListService } from '../price-list';
import { DiscountList, DiscountListService } from '../discount-list';
import { ProductPopupService } from './product-popup.service';
import { ProductType, ProductTypeService } from '../product-type';
import { ProductCategory, ProductCategoryService } from '../product-category';
import { ManufacturedProductType, ManufacturedProductTypeService } from '../manufactured-product-type';
import { YoutubeVideo, YoutubeVideoService } from '../youtube-video';

declare var Quill: any;
@Component({
    selector: 'jhi-product-dialog',
    templateUrl: './product-dialog.component.html',
    providers: [ DatePipe ],
    styleUrls: [
       './product-dialog.component.scss'
  ]
})
export class ProductDialogComponent implements OnInit, AfterViewInit {
    eventSubscriber: Subscription;
    image: Image;
    priceList: PriceList = new PriceList();
    product: Product;
    isSaving = false;
    addImage = false;
    imagenAdded = false;
    imageEdited = false;
    priceListAdded = false;
    priceListEdited = false;
    discountListAdded = false;
    discountListEdited = false;
    stockInputToEditState: any;
    products: Product[];
    productImages: Image[];
    imageEditionOption: string;
    priceListEditionOption: string;
    discountListEditionOption: string;
    stockInputEditionOption: string;
    showTabs = 'agregar';
    showPEditor = true;
    producttypes: ProductType[];
    users: User[];
    imageToEdit: any;
    indexImageToEdit: number;
    productcategories: ProductCategory[];
    productImagesAtSave: Image[] = [];
    pricesList: PriceList[] = [];
    discountsList: DiscountList[] = [];
    manufacturedproducttypes: ManufacturedProductType[];
    priceListToEdit: PriceList = new PriceList();
    discountList: DiscountList = new DiscountList();
    stockInput: StockInput = new StockInput();
    stockInputHasState: StockInputHasState = new StockInputHasState();
    stockInputHistorial: StockInputHasState[];
    stockInputs: StockInput[] = [];
    youtubevideos: YoutubeVideo[];
    youtubevideosFiltered: YoutubeVideo[];
    isManufactured: boolean;
    addDiscountListAtCreate: boolean;
    discountListIndex: number;
    login: string;
    descriptionForm: FormGroup;
    quill: any;
    addVideosOptions: string;
    youtubeVideo: YoutubeVideo = new YoutubeVideo();
    myform: FormGroup;
    minDate = new Date();
    disabledAtSaveImage = false;
    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private productService: ProductService,
        private productTypeService: ProductTypeService,
        private productCategoryService: ProductCategoryService,
        private manufacturedProductTypeService: ManufacturedProductTypeService,
        private youtubeVideoService: YoutubeVideoService,
        private eventManager: JhiEventManager,
        private elementRef: ElementRef,
        private imageService: ImageService,
        private priceListService: PriceListService,
        private discountListService: DiscountListService,
        private userService: UserService,
        private principal: Principal,
        private stockInputService: StockInputService,
        private stockInputHasStateService: StockInputHasStateService,
        private datePipe: DatePipe,
        private router: Router,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
      if (!this.product.youtubes) {
        this.product.youtubes = [];
      }
      if (this.product.categoryId) {
        this.findTypeByCategory(this.product.categoryId);
      }
        this.isSaving = false;
        this.registerChangeInPriceLists();
        this.registerChangeInDiscountLists();
        this.getAccount();
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));

        this.productCategoryService.query()
            .subscribe((res: HttpResponse<ProductCategory[]>) =>
                this.productcategories = res.body.filter((e) => e.productCategoryEnabled), (res: HttpErrorResponse) => this.onError(res.message));
        this.manufacturedProductTypeService.query()
            .subscribe((res: HttpResponse<ManufacturedProductType[]>) =>
                this.manufacturedproducttypes = res.body.filter((e) => e.manufacturedProductEnabled), (res: HttpErrorResponse) => this.onError(res.message));
        this.youtubeVideoService.query()
            .subscribe(
                (res: HttpResponse<YoutubeVideo[]>) => { this.youtubevideos = res.body; /* this.youtubevideosFiltered = this.youtubevideos */ },
                (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.findByRole('ROLE_PROV')
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        if (this.product.id) {
            this.findImagesByProduct(this.product.id);
            this.findPricesListByProduct(this.product.id);
            this.findDiscountListsByProduct(this.product.id);
            this.findStockInputsByProduct(this.product.id);
        }
        this.descriptionForm = this.formBuilder.group({
          description: this.product.description
        });
    }

    ngAfterViewInit() {
      const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
      ];

      this.quill = new Quill('.ui-editor-content', {
        modules: {
          toolbar: toolbarOptions
        },
        theme: 'snow'
      });
    }

    showEditor() {
      if (this.showPEditor) {
        this.showPEditor = false;
      } else {
        this.showPEditor = true;
      }
    }

    findTypeByCategory(id) {
      this.productTypeService.findByCategoryId(id)
          .subscribe((res: HttpResponse<ProductType[]>) => { this.producttypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    saveDiscountList(discountList, productId) {
        if (productId) {
            discountList.productId = productId;
        } else {
            discountList.productId = this.product.id;
        }
        if (this.discountList.id !== undefined) {
            this.subscribeToSaveResponse(
                this.discountListService.update(discountList), 'discountListListModification');
        } else {
            this.subscribeToSaveResponse(
                this.discountListService.create(discountList), 'discountListListModification');
        }
    }

    searchFichas($event) {
        this.youtubevideosFiltered = this.youtubevideos.filter((e) => {
            return e.youtubeName.toLowerCase().indexOf($event.query) === 0;
        });
    }

    addYoutubeVideos(item?) {
      console.log(item);
      const video = item ? item : Object.assign({}, this.youtubeVideo);
        this.product.youtubes.push(video);
        this.youtubeVideo = new YoutubeVideo;
    }

    saveEachYoutubeVideo(youtubeVideos: YoutubeVideo[]) {
      const videos: YoutubeVideo[] = [];
      return new Promise((response, rej) => {
        youtubeVideos.forEach((e) => {
          this.youtubeVideoService.create(e)
            .subscribe((res) => {
              videos.push(JSON.parse(JSON.stringify(res.body)));
              if (res.body.youtubeName === youtubeVideos[youtubeVideos.length - 1].youtubeName &&
              res.body.youtubeUrl === youtubeVideos[youtubeVideos.length - 1].youtubeUrl) {
                response(videos);
              }
            });
        });
      });
    }

    removeVideo(index) {
      console.log('INDEX ', index, this.product.youtubes[index]);
      this.product.youtubes.splice(index, 1);
    }

    getAccount() {
        this.principal.identity().then((res) => {
           this.login = res.login;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    backEditListPrice() {
        this.priceListToEdit = new PriceList();
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    findImagesByProduct(idProducto) {
        this.imageService.findByProducto(idProducto)
            .subscribe( (res: HttpResponse<Image[]>) => this.onImagesProductSuccess(res.body),
                (res: HttpErrorResponse) => this.onImagesProductError(res.message));
    }

    findPricesListByProduct(idProduct) {
        this.priceListService.findByProducto(idProduct)
            .subscribe( (res: HttpResponse<PriceList[]>) => this.onPriceListSuccess(res.body),
                (res: HttpErrorResponse) => this.onPriceListError(res.message));
    }

    findDiscountListsByProduct(idProducto) {
         this.discountListService.findByProducto(idProducto)
            .subscribe( (res: HttpResponse<DiscountList[]>) => this.onDiscountListsSuccess(res.body),
                (res: HttpErrorResponse) => this.onDiscountListsError(res.message));
    }

    findStockInputsByProduct(idProducto) {
         this.stockInputService.findByProducto(idProducto)
            .subscribe( (res: HttpResponse<DiscountList[]>) => this.onStockInputsSuccess(res.body),
                (res: HttpErrorResponse) => this.onStockInputsError(res.message));
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    selectPriceList(item) {
        /*item.startDate = this.datePipe
            .transform(item.startDate, 'yyyy-MM-ddTHH:mm:ss');
        item.endDate = this.datePipe
            .transform(item.endDate, 'yyyy-MM-ddTHH:mm:ss');*/
        this.priceListToEdit = item;

    }

    editStockState(stockInput, i) {
        this.stockInputToEditState = { stockInput, i };
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.product.description = this.quill.root.innerHTML;
        const videosToSave = [];
        this.product.youtubes.forEach((e, i) => {
          if (e['id'] === undefined) {
            this.product.youtubes[i] = undefined;
            videosToSave.push(e);
          }
        });
        this.product.youtubes = this.product.youtubes.filter((e) => e !== undefined);
        if (videosToSave.length > 0) {
            this.saveEachYoutubeVideo(videosToSave)
            .then((res) => {
              this.product.youtubes = this.product.youtubes.concat(res);
              if (this.product.id !== undefined) {
                  this.subscribeToSaveResponse(
                      this.productService.update(this.product), 'productListModification');
              } else {
                  this.subscribeToSaveResponse(
                      this.productService.create(this.product), 'productListModification');
              }
            });
        } else {
          if (this.product.id !== undefined) {
              this.subscribeToSaveResponse(
                  this.productService.update(this.product), 'productListModification');
          } else {
              this.subscribeToSaveResponse(
                  this.productService.create(this.product), 'productListModification');
          }
        }

    }

    preAddImage(image) {
        this.productImagesAtSave.push(image);
        this.image = new Image();

    }

    deletePreAddImage(index) {
        this.productImagesAtSave.splice(index, 1);
    }

    saveImage(image, productId) {
        // this.isSaving = true;
        this.disabledAtSaveImage = true;
        image['productId'] = productId;
        this.subscribeToSaveImageResponse(
        this.imageService.create(image));
    }

    saveImages(images, productId) {
        images.forEach(async(e) => {
            await this.saveImage(e, productId);
        });
    }

    updateImage() {
        this.imageService.update(this.imageToEdit)
        .subscribe((res) => {
            this.productImages[this.indexImageToEdit] = JSON.parse(JSON.stringify(this.imageToEdit));
            this.imageToEdit = undefined;
            this.imageEdited = true;
            setTimeout(() => {
                this.imageEdited = false;
            }, 2500);
        });
    }

    getStockInputHistorial(idStockInput: string) {
        this.stockInputHasStateService.findByStockInput(idStockInput)
        .subscribe((res: HttpResponse<StockInputHasState[]>) => { this.stockInputHistorial = res.body; },
            (err) => this.onError(err.message));
    }

    async deleteImage(imageId) {
        await this.activeModal.dismiss('cancel');
        this.router.navigate([{ outlets: { popup: 'image/' +  imageId + '/delete'}}], { replaceUrl: true, queryParamsHandling: 'merge' });
    }

    async deleteDiscountList(discountListId) {
        await this.activeModal.dismiss('cancel');
        this.router.navigate([{ outlets: { popup: 'discount-list/' +  discountListId + '/delete'}}], { replaceUrl: true, queryParamsHandling: 'merge' });
    }

    selectDiscountList(discountList, index) {
        /*discountList.startDate = this.datePipe
            .transform(discountList.startDate, 'yyyy-MM-ddTHH:mm:ss');
        discountList.endDate = this.datePipe
            .transform(discountList.endDate, 'yyyy-MM-ddTHH:mm:ss');*/
        this.discountListIndex = index;
        this.discountList = discountList;
        this.showTabs = 'agregarDescuento';
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.image, this.elementRef, field, fieldContentType, idInput);
    }

    selectImage(image, index) {
        const imagen = JSON.stringify(image);
        this.imageToEdit = JSON.parse(imagen);
        this.indexImageToEdit = index;
    }

    savePriceList(idProduct) {
      console.log('Se intento guardar un price List');
        this.priceList.productId = idProduct;
        this.subscribeToSavePriceListResponse(
            this.priceListService.create(this.priceList), 'priceListListModification');
    }

    updatePriceList() {
        this.subscribeToSavePriceListResponse(
            this.priceListService.update(this.priceListToEdit), 'priceListListModification');
    }

    saveStockInput() {
            if (this.product.id !== undefined) {
                this.stockInput.productId = this.product.id;
                this.stockInput.productName = this.product.name;
                this.stockInput.userLogin = this.login ? this.login : undefined;
                // this.stockInput.registerDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
            }
            this.subscribeToSaveResponse(
                this.stockInputService.create(this.stockInput), 'stockInputListModification');
                this.showTabs = 'lista';
    }

    saveStockInputHasState(stockInputId , stockState) {
        this.stockInputHasState.stockInputId = stockInputId;
        this.stockInputHasState.stockState = stockState;
        console.log('Guardar estado de stock input');
        this.subscribeToSaveResponse(
            this.stockInputHasStateService.create(this.stockInputHasState), 'stockInputHasStateListModification');

    }

    async deletePriceList(pricelistId) {
        await this.activeModal.dismiss('cancel');
        this.router.navigate([{ outlets: { popup: 'price-list/' +  pricelistId + '/delete'}}], { replaceUrl: true, queryParamsHandling: 'merge' });
    }

    updateProductStock() {
        this.productService.update(this.product)
        .subscribe((res) => {
            this.product = res.body;
            this.eventManager.broadcast({ name: 'productListModification', content: 'OK'});
        });
    }

    updateStockInpuState(stockInput) {
        this.stockInputService.update(stockInput)
        .subscribe((res) => {
            this.findStockInputsByProduct(res.body.productId);
        });
    }

    private subscribeToSavePriceListResponse(result: Observable<HttpResponse<PriceList>>, name: string) {
        result.subscribe((res: HttpResponse<PriceList>) =>
            this.onSaveSuccess(res.body, name), (res: HttpErrorResponse) => this.onSaveError());
              this.showTabs = 'editarPrecio';
    }

    private onImagesProductSuccess(data) {
        this.productImages = data;
    }

    private onDiscountListsSuccess(data) {
        this.discountsList = data;
    }

    private onStockInputsSuccess(data) {
        this.stockInputs = data;
    }

    private onStockInputsError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private onImagesProductError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private onDiscountListsError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private onPriceListSuccess(data) {
        console.log('La lista de precios ', data);
        this.pricesList = data;
    }
    private onPriceListError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private subscribeToSaveImageResponse(result: Observable<HttpResponse<Image>>) {
        result.subscribe((res: HttpResponse<Image>) => {
            this.onSaveSuccess(res.body, 'imageListModification'); this.disabledAtSaveImage = false; }, (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccessImage(result: Image) {
        this.imagenAdded = true;
        if (this.productImages) {
            this.productImages.push(result);
        }
        setTimeout(() => {
            this.imagenAdded = false;
        }, 2500);
        this.image = new Image();
    }

    private onSaveSuccessPricesList(result: any) {
        this.priceListAdded = true;
        setTimeout(() => {
            this.priceListAdded = false;
        }, 2500);
        this.priceList = new PriceList();
        if (this.product['id']) {
            this.findPricesListByProduct(this.product.id);
        }
    }

    private onUpdateSuccessPricesList(result: any) {
        this.priceListEdited = true;
        setTimeout(() => {
            this.priceListEdited = false;
        }, 2500);
        this.priceListToEdit = new PriceList();
        if (this.product['id']) {
            this.findPricesListByProduct(this.product.id);
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Product>>, name: string) {
        result.subscribe((res: HttpResponse<Product>) =>
            this.onSaveSuccess(res.body, name), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: any, name: string) {
        if (name === 'productListModification') {
            if (this.productImagesAtSave.length > 0) {
                this.saveImages(this.productImagesAtSave, result.id);
            }
            if (!this.product.id) {
                this.savePriceList(result.id);
                if (this.addDiscountListAtCreate) {
                    this.discountList.productId = result.id;
                    this.saveDiscountList(this.discountList, result.id);
                }
                if (this.product.stock !== undefined) {
                    this.stockInput.productId = result.id;
                    this.stockInput.productName = this.product.name;
                    this.stockInput.quantity = this.product.stock;
                    this.stockInput.userLogin = this.login ? this.login : '';
                    // this.stockInput.registerDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
                    this.saveStockInput();
                }
            }
            this.isSaving = false;
            this.activeModal.dismiss(result);
        }
        if (name === 'imageListModification') {
            this.onSaveSuccessImage(result);
        }
        if (name === 'priceListListModification') {
            if (this.priceListToEdit.productId) {
                this.onUpdateSuccessPricesList(result);
            } else {
                this.onSaveSuccessPricesList(result);
                if (this.product.id) {
                    this.priceListEditionOption = 'editar';
                }
            }

        }
        if (name === 'discountListListModification') {
            if (this.discountList.id !== undefined) {
                this.discountsList[this.discountListIndex] = result;
                this.discountListIndex = undefined;
                this.discountListEdited = true;
                this.discountListEditionOption = 'editar';
                setTimeout(() => {
                    this.discountListEdited = false;
                }, 2500);
            } else {
                this.discountListEditionOption = 'editar';
                this.discountsList.push(result);
                this.discountListAdded = true;
                setTimeout(() => {
                    this.discountListAdded = false;
                }, 2500);
            }
            if (this.product.id) {
                this.discountList = new DiscountList();
            }
        }
        if (name === 'stockInputListModification') {
            this.stockInput.id = result.id;
            this.saveStockInputHasState(this.stockInput.id, this.stockInput.stockState);
            if (this.product.id) {
                this.findStockInputsByProduct(this.product.id);
                this.stockInputEditionOption = 'lista';
                this.product.stock += this.stockInput.quantity;
                this.updateProductStock();
                this.stockInput = new StockInput();
            }
        }
        if (name === 'stockInputHasStateListModification') {
            if (this.stockInputToEditState) {
                this.stockInputToEditState['stockInput']['stockState'] = this.stockInputHasState.stockState;
                this.stockInputToEditState['stockInput']['registerDate'] = this.datePipe.transform(this.stockInputToEditState['stockInput']['registerDate'], 'yyyy-MM-ddTHH:mm:ss');
                this.updateStockInpuState(this.stockInputToEditState['stockInput']);
                this.stockInputToEditState = undefined;
            }
            this.stockInputHasState = new StockInputHasState();
        }
        this.eventManager.broadcast({ name, content: 'OK'});
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackProductTypeById(index: number, item: ProductType) {
        return item.id;
    }

    trackProductCategoryById(index: number, item: ProductCategory) {
        return item.id;
    }

    trackManufacturedProductTypeById(index: number, item: ManufacturedProductType) {
        return item.id;
    }

    trackYoutubeVideoById(index: number, item: YoutubeVideo) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    registerChangeInPriceLists() {
        this.eventSubscriber = this.eventManager.subscribe('priceListListModification', (response) => {
            if (this.product.id) {
                this.findPricesListByProduct(this.product.id);
            }
        });
    }

    registerChangeInDiscountLists() {
        this.eventSubscriber = this.eventManager.subscribe('discountListListModification', (response) => {
            if (this.product.id) {
                this.findDiscountListsByProduct(this.product.id);
            }
        });
    }

    cancelStockInputStateModitication() {
        this.stockInputToEditState = undefined;
        this.stockInputHasState = new StockInputHasState();
    }
}

@Component({
    selector: 'jhi-product-popup',
    template: ''
})
export class ProductPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productPopupService
                    .open(ProductDialogComponent as Component, params['id']);
            } else {
                this.productPopupService
                    .open(ProductDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
