import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class appDropDown {
  @HostBinding('class.show')  isOpen=false;
@HostListener('click') toggleOpen()
{ 
    this.isOpen= !this.isOpen;
    let part = this.el.nativeElement.querySelector('.dropdown-menu');
    if(this.isOpen) 
    this.render.addClass(part,'show');
    else
    this.render.removeClass(part,'show');
}

    constructor(private el:ElementRef,private render:Renderer2){}

    ngOnInit(){}
}