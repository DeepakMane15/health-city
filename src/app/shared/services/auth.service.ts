import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { NavItemsContant } from 'src/app/common/constants/NavItemsConstant';
import { UserTypeConstant } from 'src/app/common/constants/UserTypeConstant';
import { NavItemNode } from 'src/app/common/models/NavItemNodeModel';
import { NavLinksModel } from 'src/app/common/models/NavLinksModel';
import { UserAuthModel } from 'src/app/common/models/UserAuthModel';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AppConstants } from 'src/app/common/constants/AppConstants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public showHeader: boolean = true;
  private _transformer = (node: NavLinksModel, level: number) => {
    return {
      expandable: !!node.subItems && node.subItems.length > 0,
      label: node.label,
      level: level,
      icon: node.icon,
      url: node.url,
    };
  };
  navItems: NavLinksModel[] = NavItemsContant;
  userRole: UserTypeConstant = UserTypeConstant.ADMIN;

  treeControl = new FlatTreeControl<NavItemNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.subItems
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataSource1 = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  currentlyExpandedNode: NavItemNode | null = null;

  hasChild = (_: number, node: NavItemNode) => node.expandable;

  public isLoggedIn: boolean = false; // Simulating user authentication status
  private userDataSubject = new BehaviorSubject<any>(null);
  public userData$: Observable<any> = this.userDataSubject.asObservable();
  public userProfile: any;
  private baseUrl = 'http://172.16.0.100/api';
  // private baseUrl = 'http://localhost:3500/api';

  constructor(private router: Router, private http: HttpClient) {
    const userData = this.getUserData();
    if (userData) {
      this.userDataSubject.next(userData);
    }
  }

  toggleNode(node: NavItemNode): void {
    if (
      this.currentlyExpandedNode &&
      this.treeControl.isExpanded(this.currentlyExpandedNode)
    ) {
      this.treeControl.collapse(this.currentlyExpandedNode);
      if (this.currentlyExpandedNode.label === node.label) {
        this.currentlyExpandedNode = null;
        return;
      }
    }
    // if(!this.currentlyExpandedNode) {
    this.treeControl.toggle(node);
    this.currentlyExpandedNode = this.treeControl.isExpanded(node)
      ? node
      : null;
    // }
    // else if( this.currentlyExpandedNode.label !== node.label ){
    //   this.treeControl.toggle(node);
    //   this.currentlyExpandedNode = this.treeControl.isExpanded(node) ? node : null;
    // }
  }

  login(userData: UserAuthModel): Observable<any> {
    const loginUrl = `${this.baseUrl}/auth/signin`; // Your login endpoint
    let fd = {
      userName: userData.email,
      password: userData.password
    };

    return this.http.post<any>(loginUrl, fd);
  }

  storeUserData(userData: any) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
    this.userDataSubject.next(userData);
  }

  getUserData(): any {
    return JSON.parse(sessionStorage.getItem('userData') || '{}');
  }

  logout(): void {
    this.router.navigate(['']);
    window.location.reload();
    this.isLoggedIn = false;
    sessionStorage.clear();
  }

  isAuthenticated(): boolean {
    this.userProfile = this.getUserData();
    let permissions = this.userProfile.permissions;
    let navItems = NavItemsContant.filter((navItems) =>
      navItems.roles.includes(this.userProfile.user_type)
    );
    for (const p of permissions) {
      for (const t of AppConstants.PERMISSION_TITLES) {
      if(p.title === t.key && p.canEdit === "0"){
        let index = navItems.findIndex((n:NavLinksModel) => n.label === t.value);
        if(index > -1) {
          navItems.splice(index,1);
        }
      }
      else if(p.title === t.key && p.canEdit === "0") {
        let index = navItems.findIndex((n:NavLinksModel) => n.label === t.value);
        if(index > -1) {
          navItems[index].subItems.splice(1,1);
        }
      }
    }
    if(p.title === 'Medical Team Board' && p.canEdit === "0"){
      let index = navItems.findIndex((n:NavLinksModel) => n.label === 'Medical Team');
        if(index > -1) {
          navItems[index].subItems.splice(navItems[index].subItems.length-1,1);
        }
    }
    }
    this.dataSource.data = navItems.filter((item) => item.category === '');
    this.dataSource1.data = navItems.filter(
      (item) => item.category === 'directory'
    );
    if (this.userProfile) this.isLoggedIn = true;
    else this.isLoggedIn = false;
    return !!this.userProfile && Object.keys(this.userProfile).length !== 0; // Assuming userData exists if the user is logged in
  }

  public isUsernameAvailable(userName: FormData): Observable<any> {
    const url = `${this.baseUrl}/${APIConstant.IS_USERNAME_AVAILABLE}`;
    const httpOptions = {
      headers: new HttpHeaders({
        Token: `Bearer ${this.userProfile.token}`,
      }),
    };
    return this.http.post(url, userName, httpOptions).pipe(
      catchError((error: any) => {
        console.error('Login failed', error);
        return of(false); // Return false in case of error
      })
    );
  }

  public async checkUsernameAvailable(username: string): Promise<boolean> {
    // this.isUnameAvailable = !this.isUnameAvailable
    let fd = new FormData();
    fd.append('username', username);
    return new Promise<boolean>((resolve, reject) => {
      this.isUsernameAvailable(fd).subscribe(
        (response: any) => {
          const isAvailable: boolean = response && response.status;
          resolve(isAvailable);
        },
        (error) => {
          reject(error); // Handle error if needed
        }
      );
    });
  }
  public hideHeader() {
    this.showHeader = false;
  }
}
