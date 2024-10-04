import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PermissionsService } from './permissions.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private permissionsService: PermissionsService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const requiredPermission = route.data['permission'];
    const requiredPermissionType = route.data['type']
    return this.permissionsService.hasPermission(requiredPermission, requiredPermissionType).pipe(
      map(hasPermission => {
        if (!hasPermission) {
          // Redirect to an unauthorized page or home page
          this.router.navigate(['']);
          return false;
        }
        return true;
      })
    );
  }
}
