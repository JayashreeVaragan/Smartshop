import { Component, OnInit, ɵCompiler_compileModuleAndAllComponentsSync__POST_R3__ } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-superuser',
  templateUrl: './superuser.component.html',
  styleUrls: ['./superuser.component.css']
})
export class SuperuserComponent implements OnInit {
  adminList: User[];
  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
    this.authService.adminInfo().subscribe(
      (data) => {
      this.adminList = data;
      });
    console.log(this.adminList);
  }
  accept(user: User) {
    user.status = "A";
    this.authService.response(user).subscribe(
      data => { user = data });
  }
  decline(user: User) {
    user.status = "D";
    this.authService.response(user).subscribe(
      data => { user = data });
  }
}
