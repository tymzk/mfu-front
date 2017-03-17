import {Injectable, EventEmitter} from "@angular/core";
import {WindowService} from "./window.service";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

/*
Object
email:"mf12061@shibaura-it.ac.jp"
family_name:"Taku"
given_name:"Yamazaki"
hd:"shibaura-it.ac.jp"
id:"117590291618840080366"
locale:"ja"
name:"Yamazaki Taku"
picture:"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
verified_email:true
__proto__:Object
*/

@Injectable()
export class AuthService {
  private oAuthCallbackUrl: string;
  private oAuthTokenUrl: string;
  private oAuthUserUrl: string;
  private oAuthUserNameField: string;
  private oAuthUserEmailField: string;
  private oAuthUserDomainField: string;
  private authenticated: boolean = false;
  private autheticatedDomain: string;
  private token: string;
  private expires: any = 0;
  private userInfo: any = {};
  private windowHandle: any = null;
  private intervalId: any = null;
  private expiresTimerId: any = null;
  private loopCount = 600;
  private intervalLength = 100;

  private locationWatcher = new EventEmitter();

//  userInfo$ = this.userInfo.asObservable();

  constructor(private windows: WindowService, private http: Http) {
    this.oAuthCallbackUrl = "http://localhost.co.jp:4200/auth/callback";
    this.oAuthTokenUrl = "https://accounts.google.com/o/oauth2/auth?redirect_uri=__callbackUrl__&response_type=token&client_id=__clientId__&scope=__scopes__";
    this.oAuthTokenUrl = this.oAuthTokenUrl
      .replace('__callbackUrl__', this.oAuthCallbackUrl)
      .replace('__clientId__', "736775667868-fb4h70o2d4gotnfs5mj7vc0kef472lb2.apps.googleusercontent.com")
      .replace('__scopes__', "profile email");
    this.oAuthUserUrl = "https://www.googleapis.com/oauth2/v1/userinfo";
    this.oAuthUserNameField = "name";
    this.oAuthUserEmailField = "email";
    this.oAuthUserDomainField = "hd";
    this.autheticatedDomain = "shibaura-it.ac.jp"
  }

  public doLogin() {
    var loopCount = this.loopCount;
    this.windowHandle = this.windows.createWindow(this.oAuthTokenUrl, 'OAuth2 Login');
    this.intervalId = setInterval(() => {
      if (loopCount-- < 0) {
        clearInterval(this.intervalId);
        this.emitAuthStatus(false);
        this.windowHandle.close();
      } else {
        var href: string;
        try {
          href = this.windowHandle.location.href;
        } catch (e) {
        }
        if (href != null) {
          var re = /access_token=(.*)/;
          var found = href.match(re);
          if (found) {
            console.log("Callback URL:", href);
            clearInterval(this.intervalId);
            var parsed = this.parse(href.substr(this.oAuthCallbackUrl.length + 1));
            var expiresSeconds = Number(parsed.expires_in) || 1800;

            this.token = parsed.access_token;
            if (this.token) {
              this.authenticated = true;
              this.startExpiresTimer(expiresSeconds);
              this.expires = new Date();
              this.expires = this.expires.setSeconds(this.expires.getSeconds() + expiresSeconds);

              this.windowHandle.close();
              this.emitAuthStatus(true);
              this.fetchUserInfo();
            } else {
              this.authenticated = false;
              this.emitAuthStatus(false);
            }
          } else {
            if (href.indexOf(this.oAuthCallbackUrl) == 0) {
                clearInterval(this.intervalId);
                var parsed = this.parse(href.substr(this.oAuthCallbackUrl.length + 1));
                this.windowHandle.close();
                this.emitAuthStatusError(false, parsed);
            }
          }
        }
      }
    }, this.intervalLength);
  }

  public doLogout() {
    this.authenticated = false;
    this.expiresTimerId = null;
    this.expires = 0;
    this.token = null;
    this.emitAuthStatus(true);
    console.log('Session has been cleared');
  }

    private emitAuthStatus(success: boolean) {
      this.emitAuthStatusError(success, null);
    }

    private emitAuthStatusError(success: boolean, error: any) {
      this.locationWatcher.emit({
        success: success,
        authenticated: this.authenticated,
        token: this.token,
        expires: this.expires,
        error: error
      });
    }

    public getSession() {
      return {
        authenticated: this.authenticated,
        token: this.token,
        expires: this.expires
      };
    }

    private fetchUserInfo() {
        if (this.token != null) {
            var headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);
            this.http.get(this.oAuthUserUrl, {headers: headers})
                .map(res => res.json())
                .subscribe(info => {
                    this.userInfo = info;
                }, err => {
                    console.error("Failed to fetch user info:", err);
                });
        }
    }

    public getUserInfo() {
      console.log(this.userInfo);
      return this.userInfo;
    }

    public getUserName() {
      return this.userInfo ? this.userInfo[this.oAuthUserNameField] : null;
    }

    public getId() {
      if(this.userInfo[this.oAuthUserEmailField] === undefined){
        return null;
      }else{
        var pos = this.userInfo[this.oAuthUserEmailField].indexOf("@");
        if (pos < 0) {
          console.log(this.userInfo[this.oAuthUserEmailField]);
          return this.userInfo[this.oAuthUserEmailField];
        } else {
          console.log(this.userInfo[this.oAuthUserEmailField].substring(0, pos));
          return this.userInfo[this.oAuthUserEmailField].substring(0, pos);
        }
      }
    }

  private startExpiresTimer(seconds: number) {
      if (this.expiresTimerId != null) {
          clearTimeout(this.expiresTimerId);
      }
      this.expiresTimerId = setTimeout(() => {
          console.log('Session has expired');
          this.doLogout();
      }, seconds * 1000);
      console.log('Token expiration timer set for', seconds, "seconds");
  }

  public subscribe(onNext: (value: any) => void, onThrow?: (exception: any) => void, onReturn?: () => void) {
    return this.locationWatcher.subscribe(onNext, onThrow, onReturn);
  }

  public isAuthenticated() {
    return this.authenticated;
  }

  public getUserDomain() {
    return this.userInfo ? this.userInfo[this.oAuthUserDomainField] : null;
  }

  public isAllowedDomain(){
    return this.getUserDomain() === this.autheticatedDomain ? true : false;
  }

  private parse(str) {
    if (typeof str !== 'string') {
      return {};
    }

    str = str.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
      return {};
    }

    return str.split('&').reduce(function (ret, param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = parts.shift();
      var val = parts.length > 0 ? parts.join('=') : undefined;

      key = decodeURIComponent(key);

      val = val === undefined ? null : decodeURIComponent(val);

      if (!ret.hasOwnProperty(key)) {
          ret[key] = val;
      } else if (Array.isArray(ret[key])) {
          ret[key].push(val);
      } else {
          ret[key] = [ret[key], val];
      }

      return ret;
    }, {});
  };
}
