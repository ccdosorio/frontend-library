import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AppConfig, Layout } from '@models';

// Injectino Token
export const APP_CONFIG = new InjectionToken('appCustomConfig');

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private configSubject: BehaviorSubject<AppConfig> = new BehaviorSubject<AppConfig>({
    colorTheme: undefined,
    layout: new Layout()
  });
  private moduleConfig: AppConfig;

  constructor(
    private router: Router,
    @Inject(APP_CONFIG) private configToken: AppConfig
  ) {
    this.moduleConfig = configToken;
    this.init();
  }

  get config(): any | Observable<AppConfig> {
    return this.configSubject.asObservable();
  }

  private init(): void {
    // Seteando la configuracion por defecto
    this.configSubject = new BehaviorSubject<AppConfig>(this.moduleConfig);
    // Si el layout config es diferente
    this.router.events
      .pipe(filter(event => event instanceof ResolveEnd))
      .subscribe(() => {
        // Verificando el Layout
        if (this.configSubject.getValue().layout !== this.moduleConfig.layout) {
          const newConfig = { ...this.config.getValue(), ...this.moduleConfig };
          this.configSubject.next(newConfig);
        }
      });
  }

  public setConfig(value: any, opts = { emitEvent: true }): void {
    // Obteniendo configuracion actual
    let config = this.configSubject.getValue();
    // Actualizando la configuracion
    config = { ...config, ...value };
    this.moduleConfig = config;
    // Si el disparador es true
    if (opts.emitEvent) {
      this.configSubject.next(config);
    }
  }

  public getConfig(): AppConfig {
    return this.configSubject.getValue();
  }
}
