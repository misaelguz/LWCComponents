import { LightningElement,api } from 'lwc';

export default class LightningFormComponent extends LightningElement {
    @api record = {
        Id : false,
        FirstName : '',
        LastName : '',
        Email:''
    };
    @api displayModal;
    @api modalTitle = "";

    connectedCallback(){
        console.log('record from form: ',this.record);
    }

    handleSuccess(event){
        const successEvent = new CustomEvent('success',{
            detail:{
                record: event.detail.detail
            }
        })
        this.dispatchEvent(successEvent);

    }

    handleSave(){
       
    }

    // handleChange(){
    //     const
    // }

    handleCancel(){
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);

    }
    handleSuccess(formEvent){
        const successEvent = new CustomEvent("success", {
            detail:{
                record: formEvent.detail.record
            } 
        });
        this.dispatchEvent(successEvent);
    }

    
}