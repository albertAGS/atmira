import { Injectable } from '@angular/core';
import { CONSTANTS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  entities: any;
  constructor() { }


  /**
   * Devuelve el nombre de la entidad a partir de un codigo
   * @param account: string;
   * @returns 
   */
  getNameEntity = (account: string) => {
    let name = '';
    CONSTANTS.entities.filter(data => {
      if (data.code === account.substr(0, 4)) {
        name = data.name;
      }
    });
    return name;
  }

  /**
   * 
   * @param param parametro a encriptar
   */
  encrypt = (param) => {
    return window.btoa(unescape(encodeURI(JSON.stringify(param))));
  }

  /**
   * 
   * @param param paramentro a desencriptar
   */
  decrypt = (param) => {
    return JSON.parse(decodeURIComponent(escape(window.atob(param))));
  }

  setEntities(banks: any) {
    this.entities = banks;
  }

  getEnt() {
    return this.entities;
  }
}
