import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "decodeHtml" })

export class DecodeHTMLString implements PipeTransform {
  transform(value: string) {
    const tempElement = document.createElement("p")
    tempElement.innerHTML = value
    return tempElement.innerText
  }
}
