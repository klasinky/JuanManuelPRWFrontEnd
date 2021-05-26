import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'atUser'
})
/**
 * Pipe para poner enlaces cuando una palabra comienza por @
 */
export class AtUserPipe implements PipeTransform {

  transform(value: any) {
    return this.stylize(value);
  }

  /**
   * Metodo sacado de Stackoverflow: 
   * https://stackoverflow.com/questions/48449708/angular-5-how-to-dynamically-add-links-to-strings-containing-a-certain-tag-lik
   * @param text {string} Texto que se va a evaluar
   */
  private stylize(text: string): string {
    let stylizedText: string = '';
    if (text && text.length > 0) {
      for (let t of text.split(" ")) {
        
        if (t.startsWith("@") && t.length > 1 && !t.includes("<a>") && !t.includes("</a>") ) {
          
          let username = t.replace(/[,.]/g, "");
          stylizedText += `<a class="tool-username" data-tooltip="${username.substring(1)}" href="${username.substring(1)}">${t}</a>`+" ";
        } else {
          stylizedText += t + " ";
        }
      }
      return stylizedText;
    }
    else return text;
  }

}
