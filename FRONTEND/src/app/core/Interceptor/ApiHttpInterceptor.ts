import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

@Injectable()


export class ApiHttpInterceptor implements HttpInterceptor {

  jwtToken: String = "";

  constructor(private route: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //add jwtToken in every request
    if (this.jwtToken != "") {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.jwtToken}`, 'Content-Type': 'application/json' }
      });
    }
    return next.handle(request).pipe(tap(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let tab: Array<String>;
          let enteteAuthorization = event["body"]["token"];
          if (enteteAuthorization != null) {
            this.jwtToken = enteteAuthorization;
          }
        }
      },
      (error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            // redirection vers la home page
            this.route.navigate(["/"]);
            location.reload();
          }
        }
      }
    ));
  }
}
