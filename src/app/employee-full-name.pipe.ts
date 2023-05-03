
import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './app.module';

@Pipe({
  name: 'employeeFullName',
})
export class EmployeeFullNamePipe implements PipeTransform {
  transform(employee: Employee): string {
    return `${employee.firstName} ${employee.lastName}`;
  }
}
