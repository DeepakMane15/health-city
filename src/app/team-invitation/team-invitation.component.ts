import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/services/api/api.service';
import { APIConstant } from '../common/constants/APIConstant';
import { StatusCode } from '../common/constants/AppEnum';

@Component({
  selector: 'app-team-invitation',
  standalone: false,
  templateUrl: './team-invitation.component.html',
  styleUrl: './team-invitation.component.scss',
})
export class TeamInvitationComponent implements OnInit {
  public token!: string;
  public rid!: string;
  public showSpinner: boolean = false;
  public content!: string;
  public isTokenValid: boolean = false;
  public invitationAcceptStatus: boolean = false;
  public tokenExpired: boolean = false;
  public requestAlreadyAccepted: boolean = false;

  @ViewChild('canvasElement', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  constructor(
    private _authService: AuthService,
    private _apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this._authService.hideHeader();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const type = params['type'];
      this.token = params['rid'];
      this.verifyRid();
    });
  }

  ngAfterViewInit() {
    if (this.canvas?.nativeElement) {
      this.ctx = this.canvas.nativeElement.getContext('2d')!;
      if (this.ctx) {
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#000000';
      }
    }
  }

  public verifyRid() {
    if (this.token) {
      const fd = new FormData();
      fd.append('token', this.token);

      this.showSpinner = true;
      this._apiService.postUnAuth(APIConstant.VERIFY_INVITATION, fd).subscribe(
        (res: any) => {
          if (res.statusCode === StatusCode.OK) {
            this.content = res.data.doc_rule2;
            this.rid = res.data.request_id;
            this.isTokenValid = true;
          } else if (res.statusCode === StatusCode.EXPIRED) {
            this.tokenExpired = true;
            this.isTokenValid = false;
          } else if (res.statusCode === StatusCode.NOT_FOUND) {
            this.requestAlreadyAccepted = true;
            this.isTokenValid = false;
          }
          this.showSpinner = false;
        },
        (error: any) => {
          this.showSpinner = false;
          console.log(error);
        }
      );
    }
  }
  submitSignature() {
    const signatureDataUrl = this.canvas.nativeElement.toDataURL(); // Get the signature as a data URL
    // Send signatureDataUrl to server for further processing
    console.log(signatureDataUrl); // Placeholder for sending data to server

    const fd = new FormData();

    fd.append('signature', signatureDataUrl);
    fd.append('request_id', this.rid);
    fd.append('fromPortal', '1');
    this.showSpinner = true;
    this._apiService.postUnAuth(APIConstant.ACCEPT_INVITATION, fd).subscribe(
      (res: any) => {
        console.log(res.message);
        if (res.status) {
          this.invitationAcceptStatus = true;
        }
        this.showSpinner = false;
      },
      (error: any) => {
        this.showSpinner = false;
        console.log(error);
      }
    );
  }

  clearCanvas() {
    this.ctx?.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
  }

  onMouseDown(event: MouseEvent) {
    this.ctx?.beginPath();
    this.ctx?.moveTo(event.offsetX, event.offsetY);
  }

  onMouseMove(event: MouseEvent) {
    if (event.buttons !== 1) return;
    this.ctx?.lineTo(event.offsetX, event.offsetY);
    this.ctx?.stroke();
  }
}
