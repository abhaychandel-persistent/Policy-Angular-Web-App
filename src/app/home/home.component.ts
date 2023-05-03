import { Component, Inject, OnInit } from '@angular/core';
import { AzureAdDemoService } from '../azure-ad-demo.service';
import { Observable, of } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Employee } from '../app.module';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';

export interface PoliciesElement {
  id: string;
  policyNo: number;
  policyName: string;
  description: string;
  type: string;
  active: string;
}

// const employees$: PoliciesElement[] =[
//   {policyNo: 1, policyName: 'P1', active: 'Yes', type: 'Health Insurance'},
//   {policyNo: 2, policyName: 'P2', active: 'No', type: 'Motor Insurance'},
//   {policyNo: 3, policyName: 'P3', active: 'Yes', type: 'Home Insurance'},
//   {policyNo: 4, policyName: 'P4', active: 'No', type: 'Fire Insurance'},
//   {policyNo: 5, policyName: 'P5', active: 'Yes', type: 'Travel Insurance'},
//   {policyNo: 6, policyName: 'P6', active: 'No', type: 'Term Life Insurance'},
//   {policyNo: 7, policyName: 'P7', active: 'Yes', type: 'Term Life Insurance'},
// ]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  employees$: Observable<any>;
  displayPolicies: boolean = false;
  displayedColumns: string[] = ['policyNo', 'policyName', 'policyIsActive', 'policyType'];
  // const ELEMENT_DATA: PoliciesElement[];





  constructor(private azureAdDemoService: AzureAdDemoService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.azureAdDemoService.isUserLoggedIn.subscribe(x=>{
      this.isUserLoggedIn=x;
    });
    const xyz = localStorage.getItem('token');
    this.employees$ = this.employeeService.getEmployees();
    this.employees$.subscribe((res) => {
      console.log("######",res)
    })
    // console.log("DDDDDDD", this.employees)
  }

  showPolicies() {
    this.displayPolicies = !this.displayPolicies;
  }
}
