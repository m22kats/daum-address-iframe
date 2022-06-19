import { 
  Component, OnInit, OnDestroy, ElementRef, 
  ViewChild, Renderer2, HostListener 
} from "@angular/core";

import { MatDialogRef} from "@angular/material/dialog";
import { Subject} from "rxjs";

import { SnackbarService, ResponseTypeEnum } from "@shared/service/snackbar.service";
import { DaumAddressService } from "@shared/service/daum-address.service";
import { Address, AddressDetail } from "@addresses/address";

@Component({
  selector: 'app-address-create-dialog',
  templateUrl: './address-create-dialog.component.html',
  styleUrls: ['./address-create-dialog.component.scss']
})
export class AddressCreateDialogComponent implements OnInit, OnDestroy {
  @HostListener("window:resize", ["$event"])
  @ViewChild("moreAddress") moreAddrEl: ElementRef;
  @ViewChild("layer") layerEl: ElementRef;

  constructor(public daumAddressService: DaumAddressService,
              private snackbarService: SnackbarService,
              public dialogRef: MatDialogRef<AddressCreateDialogComponent>,
              private renderer: Renderer2
              ) { }

  destroy$ = new Subject();
  daumAddr: string = ""; // Full road address
  createRequest: Address;

  /**
   * Control input box
   */
  daumFullAddrObervable$ = this.daumAddressService.daumAddrSubject$.asObservable();
  daumExtraAddrObervable$ = this.daumAddressService.daumExtraAddrSubject$.asObservable();
  focusExtraAddrObservable$ = this.daumAddressService.focusExtraAddrSubject$.asObservable(); // Put focus on address detail text input box
  layerStyleObservable$ = this.daumAddressService.layerStyleSubject$.asObservable();

  ngOnInit(): void {
    this.initializeCreateRequest();
    this.daumFullAddrObervable$.subscribe({
      next: (daumAddr) => {
        this.daumAddr = daumAddr;
      }
    });
    this.daumExtraAddrObervable$.subscribe({
      next: (daumExtraAddr) => {
        this.createRequest.details.extraAddress = daumExtraAddr;
      }
    });

    this.focusExtraAddrObservable$.subscribe({
      next: (focus) => {
        if (focus) {
          this.moreAddrEl.nativeElement.focus();
        }
      }
    });

    this.layerStyleObservable$.subscribe({
      next: (obj) => {
        if (obj) {
          const keys: Array<string> = Object.keys(obj);
          keys.forEach(k => {
            this.renderer.setStyle(this.layerEl.nativeElement, k, obj[k]);
          });
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Dialog Action
   */
  onSubmit(): void {
    if (!this.createRequest.name) {
      this.snackbarService.openSnackbar("Please input name", ResponseTypeEnum.VALIDATE);
      return;
    }

    const { sido, sigungu, roadAddress } = this.daumAddressService.getAddress();
    this.createRequest.details.sido = sido;
    this.createRequest.details.sigungu = sigungu;
    this.createRequest.details.roadAddress = roadAddress;
    this.dialogRef.close(this.createRequest);
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * Daum Address API Service
   */
  openDaumService(): void {
    this.daumAddressService.execDaumPostcode();
  }
  openDaumPostCode(): void {
    this.daumAddressService.execDaumPostcodeIframe();
  }
  closeDaumPostcode(): void {
    this.daumAddressService.closeDaumPostcode();
  }

  /**
   * Init Create Request
   */
  initializeCreateRequest(): void {
    this.createRequest = new Address();
    this.createRequest.name = "";
    this.createRequest.details = new AddressDetail();
    this.createRequest.details.sido = "";
    this.createRequest.details.sigungu = "";
    this.createRequest.details.roadAddress = "";
    this.createRequest.details.extraAddress = "";
  }
}
