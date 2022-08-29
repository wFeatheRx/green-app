import { NavigationModule } from './../navigation/navigation.module';
import { Register } from '../viewmodel/register';
import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AppService } from '../app.service';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { fromEvent, debounceTime, map, filter } from 'rxjs';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    NavigationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AppService, { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' }],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private title: string = '參觀申請';
  public register: Register = new Register();
  selected!: Date;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  phoneFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  visitNumberFormControl = new FormControl('', [Validators.required]);
  visitTimeFormControl = new FormControl('', [Validators.required])
  matcher = new MyErrorStateMatcher();
  constructor(private appService: AppService, private location: Location, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.appService.upsertTrackCount(this.title);

    var input = document.getElementById('inputMobile') as HTMLElement;

    var input$ = fromEvent(input, 'keyup').pipe(
      map(x => (x.target as HTMLInputElement).value),
      debounceTime(570),
      filter(x => x.length >= 10)
    )           
    input$.subscribe(x => this.setRegister(x));
  }

  public async setRegister(phone: string) {

    let register = await this.appService.getRegister(phone);

    if (register) {
      this.register = register;
    }
  }

  public onGoBack(): void {
    this.location.back();
  }

  public async onClick() {
    let result = await this.appService.addRegister(this.register);
    console.log(result);
  }
}
