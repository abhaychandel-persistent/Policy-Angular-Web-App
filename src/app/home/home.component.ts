import { Component, Inject, OnInit } from '@angular/core';
import { AzureAdDemoService } from '../azure-ad-demo.service';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CreatePolicyComponent } from '../create-policy/create-policy.component';
import { ToastrService } from 'ngx-toastr';

export interface PoliciesElement {
  id: string;
  policyNo: number;
  policyName: string;
  description: string;
  type: string;
  active: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  employees$: Observable<any>;
  displayPolicies: boolean = false;
   dataFromDialog: any;
  displayedColumns: string[] = ['policyNo', 'policyName', 'policyIsActive', 'policyType'];


  constructor(private azureAdDemoService: AzureAdDemoService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private employeeService: EmployeeService, public dialog: MatDialog, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.azureAdDemoService.isUserLoggedIn.subscribe(x=>{
      this.isUserLoggedIn=x;
    });
    const xyz = localStorage.getItem('token');
    this.employees$ = this.employeeService.getEmployees();
  }

  showPolicies() {
    this.displayPolicies = !this.displayPolicies;
  }

  createPolicy(){
    const dialogRef = this.dialog.open(CreatePolicyComponent,);
    dialogRef.afterClosed().subscribe((data) => {
      this.dataFromDialog = data.form;
      if (data.clicked === 'submit') {
        this.employeeService.SavePolicy(this.dataFromDialog).subscribe({
          next: data => {
            this.toastr.success('Policy Created Successfully!', 'Success');
            this.employees$ = this.employeeService.getEmployees();
        },
        error: error => {
          this.toastr.error('Something went wrong. Please try after some time', 'Error');
          console.error('There was an error!', error);
        }
       })
      }
    });
  }
}

