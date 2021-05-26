import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private behaviorSubjects: Map<string, BehaviorSubject<any>>;



  constructor() {
    this.behaviorSubjects = new Map<string, BehaviorSubject<any>>();
  }

  async store(storageKey: string, value: any) {

    const encryptedValue = btoa(escape(JSON.stringify(value)));
    return Promise.resolve().then(function () {
      localStorage.setItem(storageKey, encryptedValue);
    });
  }

  getWithoutAsync(storageKey: string) {
    const res = localStorage.getItem(storageKey);

    if (res) {
      return JSON.parse(unescape(atob(res)));
    } else {
      return false;
    }
  }

  async removeKey(storageKey: string) {
    await localStorage.removeItem(storageKey);
  }

/* ----------------------------------- new ---------------------------------- */


  /**
  * Returns the behaviorSubject by identifier. If it's not handled a new one is created but not pre-filled with any value.
  * @param identifier The localStorage identifier
  */
  private getBehaviorSubject(identifier: string): BehaviorSubject<any> {
    let behaviorSubject: BehaviorSubject<any> | undefined = this.behaviorSubjects.get(identifier);
    if (!behaviorSubject) {
      behaviorSubject = new BehaviorSubject<any>(null);
      this.behaviorSubjects.set(identifier, behaviorSubject);
    }

    return behaviorSubject;
  }


  /**
    * Obtiene un item del localStorage 
    * @param identifier I
    * @param identifier Identificador del objeto de almacenamiento. Puede ser cualquier cosa,
    */
  public getItem(identifier: string): BehaviorSubject<any> {
    const behaviorSubject = this.getBehaviorSubject(identifier);
    let item = localStorage.getItem(identifier);
    if(item){
      item = JSON.parse(unescape(atob(item)));
    }
    behaviorSubject.next(item);
    return behaviorSubject;
  }


/**
	* Almacena un artículo y emite el nuevo valor a todos sus suscriptores
	* @param identifier LocalStorage identifier
	* @param object objeto que se va a almacenar
	*/
	public setItem(identifier: string, object: any): void {
		localStorage.setItem(identifier, btoa(escape(JSON.stringify(object))));
		this.getBehaviorSubject(identifier).next(object);
	}
  /**
   * Elimina un item del localStorage y avisa a todos sus suscriptores
   * @param identifier objeto que se va a eliminar
   */
	public removeItem(identifier: string): void {
		localStorage.removeItem(identifier);
		this.getBehaviorSubject(identifier).next(null);
	}

	/**
	* Borra el LocalStorage y le dice a todos los suscriptores de todos los artículos que el valor ahora es nulo
	*/
	public clear() {
		localStorage.clear();
		this.behaviorSubjects.forEach((behaviorSubject: BehaviorSubject<any>) => {
			behaviorSubject.next(null);
    });
    
	}

}
