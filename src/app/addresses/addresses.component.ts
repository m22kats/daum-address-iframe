import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Address } from "@addresses/address";
import { AddressDataService } from "@addresses/address-data.service";
import { AddressCreateDialogComponent } from "@addresses/address-create-dialog/address-create-dialog.component";
import { SnackbarService, ResponseTypeEnum } from "@shared/service/snackbar.service";

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  dataSource = new MatTableDataSource<Address>();
  pageIndex: number = 0;
  pageSize: number = 20;
  previousCount: number = 0;

  addressTotal: number = 0;
  addresses: Array<Address> | null;

  constructor(
    private addressDataService: AddressDataService,
    private snackbarService: SnackbarService,
    private matDialog: MatDialog,
  ) {}

  displayedColumns: string[] = [
    "idx",
    "name",
    "address"
  ];

  ngOnInit(): void {
    this.getAddresses();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAddresses(): void {
    this.addressDataService.getAll().pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (!!res && res.length > 0) {
            this.onGetAddresses(res);
          } else {
            this.resetAddressData();
          }
          this.snackbarService.openSnackbar(`${res.length} Address Found`, ResponseTypeEnum.SUCCEED);
        },
        error: (err) => {
          this.resetAddressData();
          this.snackbarService.openSnackbar("Failed to Get Address", ResponseTypeEnum.ERROR);
        }
      })
  }
  onGetAddresses(addresses: Address[]): void {
    this.addresses = addresses;
    this.dataSource = new MatTableDataSource(this.addresses);
    this.addressTotal = !!addresses ? addresses.length : 0;
  }

  resetAddressData(): void {
    this.addresses = [];
    this.dataSource.data = [];
    this.addressTotal = 0;
  }

  openCreateDialog(): void {
    const dialogRef = this.matDialog.open(AddressCreateDialogComponent, {
      width: "600px",
      disableClose: true,
      data: {
        type: "create",
      },
    });
    dialogRef
    .afterClosed()
    .subscribe((dialogOutputData: Address) => {
        if (!!dialogOutputData) {
          this.addressDataService
          .create(dialogOutputData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              this.snackbarService.openSnackbar("Address Created", ResponseTypeEnum.SUCCEED);
              this.getAddresses();
            },
            error: (error) => {
              this.snackbarService.openSnackbar("Address NOT Created", ResponseTypeEnum.ERROR);
            },
          });
        }
      }
    );
  }
}
