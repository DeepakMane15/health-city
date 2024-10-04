import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserTypeConstant } from 'src/app/common/constants/UserTypeConstant';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private permissions!: any[];

  constructor(private _authService: AuthService) {}

  getUserPermissions(): Observable<any[]> {
    // This should be replaced with an actual API call in a real app
    if (!this.permissions) {
      this.setUserPermissions();
    }
    return of(this.permissions);
  }

  setUserPermissions() {
    let userData = this._authService.getUserData();
    this.permissions = userData?.permissions || [];
  }

  hasAnyAccess(title: string) {
    if (this._authService.getUserData()?.type === UserTypeConstant.ADMIN)
      return true;
    if (!this.permissions) {
      this.setUserPermissions();
    }
    const permission = this.permissions.find((p) => p.title === title);
    return permission
      ? (permission['canEdit'] === '1' ||
          permission['canView'] === '1' ||
          permission['canDelete'] === '1')
      : false;
  }

  hasAccess(
    title: string,
    action: 'isEnabled' | 'canView' | 'canEdit' | 'canDelete'
  ): boolean {
    if (this._authService.getUserData()?.type === UserTypeConstant.ADMIN)
      return true;
    if (!this.permissions) {
      this.setUserPermissions();
    }
    const permission = this.permissions.find((p) => p.title === title);
    return permission ? permission[action] === '1' : false;
  }

  hasPermission(
    title: string,
    action: 'isEnabled' | 'canView' | 'canEdit' | 'canDelete'
  ): Observable<boolean> {
    if (this._authService.getUserData()?.type === UserTypeConstant.ADMIN || this._authService.getUserData()?.type === UserTypeConstant.PROFESSIONAL
     || this._authService.getUserData()?.type === UserTypeConstant.GATE_KEEPER || this._authService.getUserData()?.type === UserTypeConstant.RECEPTIONIST)
      return of(true);
    if (!this.permissions) {
      this.setUserPermissions();
    }
    const permission = this.permissions.find((p) => p.title === title);
    return of(permission ? permission[action] === '1' : false);
  }
}
