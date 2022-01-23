import { signUpDto } from 'src/app/dto/sign-up.dto';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { userDto } from 'src/app/dto/user.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  loggedUser: userDto;
  jobroleList: any[] = [];

  constructor(
    private service: AuthService,
    private _router: Router
  ) {
    this.jobroleList = [
      { label: "Designer", value: 1 },
      { label: "Developer", value: 2 },
      { label: "Manager", value: 3 },
      { label: "Programmer", value: 4 },
      { label: "Administrator", value: 5 },
    ]
   }

  async ngOnInit():Promise<void> {
    let token = localStorage.getItem('authtoken');
    let email = localStorage.getItem('email');

    console.log("new reg user data",token,email)

     await this.service.getRegDetails({email,token}).then( res => {
       this.loggedUser = res.data[0];
       console.log("user data",this.loggedUser);
     })
  }


  getJobLabel(type:any){
    const statusRow = this.jobroleList.find((row) => row.value == type);
    return statusRow.label;
  }

  logOut(){
    localStorage.removeItem('authtoken');
    localStorage.removeItem('email');
    this._router.navigate(['auth/login']);
  }

}
