import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Subject } from "rxjs";

declare var daum;

export interface DaumAddress {
  sido: string;
  sigungu: string;
  roadAddress: string;
  extraAddress: string;
}

@Injectable({
  providedIn: "root"
})
export class DaumAddressService {
  sido: string = "";
  sigungu: string = "";
  roadAddress: string = "";
  extraAddress: string = "";
  daumAddrSubject$ = new Subject<string>();        // Daum address - sido, sigungu, roadAddress
  daumExtraAddrSubject$ = new Subject<string>();   // Daum address - extraAddr
  focusExtraAddrSubject$ = new Subject<boolean>(); // Put focus on extraAddr text input box after sido, sigungu, roadAddress
  layerStyleSubject$ = new Subject<{}>();          // control css for iframe
  _document: Document;

  constructor(@Inject(DOCUMENT) _document: Document) {
    /**
     * DOCUMENT represents the main rendering context.
     * You can access document no matter what the platform is "Browser" or "Server".
     * From document.getElementByID, you can only access DOM Document
     */
    this._document = _document;
  }

  /**
   * As iframe
   */
  execDaumPostcodeIframe(): void {
    const self = this;
    new daum.Postcode({
        oncomplete(data): void {
          self.sido = data.sido;
          self.sigungu = data.sigungu;
          self.roadAddress = data.roadAddress.split(data.sido + " ")[1].split(data.sigungu + " ")[1]; // Get road by removing city and district
          self.daumAddrSubject$.next(self.sido + " " + self.sigungu + " " + self.roadAddress);
          self.extraAddress = "";

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R"){
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)){
              self.extraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
                self.extraAddress += (self.extraAddress !== "" ? ", " + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (self.extraAddress !== ""){
                self.extraAddress = "(" + self.extraAddress + ")";
            }
            // Address Detail to be used
            self.daumExtraAddrSubject$.next(self.extraAddress);

        } else {
          self.daumExtraAddrSubject$.next("");
        }

          // Move cursor from Address to Address Detail input box
          self.focusExtraAddrSubject$.next(true);

          // Hide iframe outline and close button
          self.layerStyleSubject$.next({display: "none"});
        },
        width : "100%",
        height : "100%",
        maxSuggestItems : 5
    }).embed(this._document.getElementById("layer"));

    // iframe을 넣은 element를 보이게 한다 _ Show iframe
    self.layerStyleSubject$.next({display: "block"});

    // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다 _ Place iframe in the center
    this.initLayerPosition();
  }

  initLayerPosition(): void {
    const width = 550;
    const height = 395;
    const borderWidth = 5;

    // 위에서 선언한 값들을 실제 element에 넣는다. - width, height, border
    // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다. - left, top
    this.layerStyleSubject$.next({width: width + "px", height: height + "px", border: borderWidth + "px solid",
                                  left: (((window.innerWidth || this._document.documentElement.clientWidth) - width) / 2 - borderWidth) + "px",
                                  top: (((window.innerHeight || this._document.documentElement.clientHeight) - height)
                                          / 1.8 - borderWidth) + "px"});
  }

  closeDaumPostcode(): void {
    // Hide iframe
    this.layerStyleSubject$.next({display: "none"});
  }


  /**
   * As Popup
   */
  execDaumPostcode(): any {
    const self = this;

    const width = 600;
    const height = 600;
    const left = 562;
    const top = 260;

    new daum.Postcode({
      width,
      height,
      popupTitle: "도로명주소",
      left,
      top,
      oncomplete(data): any {
      }
    }).open({});
  }

  getAddress(): DaumAddress {
    return {
      sido: this.sido,
      sigungu: this.sigungu,
      roadAddress: this.roadAddress,
      extraAddress: this.extraAddress
    };
  }
}
