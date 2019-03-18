import { Component,ViewChild,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import Cropper from 'cropperjs'
import {CropperComponent } from 'angular-cropperjs';
@Component({
    selector: 'cropper',
    templateUrl: './cropper.component.html'
  })
  export class MyCropperComponent {
    @ViewChild('angularCropper') public angularCropper:CropperComponent;
    @ViewChild('result') public result:any;
    cropperOptions:any;
    croppedImage=null;
    myImg=null;
    scaleValX=1;
    scaleValY=1;
    form
    selectedFile=null;
    url = '';
    imgcontainer;
    constructor(private fb: FormBuilder,private changeDetectorRef: ChangeDetectorRef) {
      this.cropperOptions={
        dragMode:'crop',
        aspectRatio:1,
        autoCrop:true,
        movable:true,
        zoomable:true,
        scalable:true,
        autoCropArea:0.8,
      };
    }
  save()
  {
    if(this.angularCropper){
    let croppedImgB64String:string=this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', (100/100));
    this.croppedImage=croppedImgB64String;
    (document.getElementById("myimg") as HTMLImageElement).src=this.croppedImage;
    console.log(this.croppedImage);
    }
  }
   reset()
   {
    if(this.angularCropper)
     this.angularCropper.cropper.reset();
   }
   clear(){
    if(this.angularCropper)
     this.angularCropper.cropper.clear();
   }
   rotate(){
    if(this.angularCropper)
    this.angularCropper.cropper.rotate(90);
   }
   rotateright(){
    if(this.angularCropper)
    this.angularCropper.cropper.rotate(-90);
   }
   zoom(zoomIn:boolean)
   {
    if(this.angularCropper)
    {
     let factor=zoomIn?0.1:-0.1;
     this.angularCropper.cropper.zoom(factor);
    }
   }
   scaleX(){
    if(this.angularCropper){
     this.scaleValX=this.scaleValX*-1;
     this.angularCropper.cropper.scaleX(this.scaleValX);
    }
   }
   scaleY(){
    if(this.angularCropper){
    this.scaleValY=this.scaleValY*-1;
    this.angularCropper.cropper.scaleY(this.scaleValY);
    }
  }
  move(x,y){
    if(this.angularCropper)
    this.angularCropper.cropper.move(x,y);
  }
  destroy()
  {
    if(this.angularCropper)
    this.url=null;
    //this.angularCropper.cropper.destroy();;
  }
  close(){
    this.url=null;
    (document.getElementById("myimg") as HTMLImageElement).src=null;
  }
    onFileSelected(event)
    {
      if(this.angularCropper)
      {
        this.destroy();
      }
      console.log(this.imgcontainer);
      if (event.target.files && event.target.files[0]) {
        this.selectedFile=event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = reader.result.toString();

        }
    }
  }
    ngOnInit() {
      this.changeDetectorRef.detectChanges();
    }
  
    login() {
     
    }
  }