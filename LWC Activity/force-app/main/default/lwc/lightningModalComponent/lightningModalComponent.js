import { LightningElement, api } from 'lwc';

export default class LightningModalComponent extends LightningElement {

    // @api titleHeader = "";
    // @api columns = [];
    // @api rowFields = [];
    // fieldValues = [];
 
 
    // connectedCallback(){
    //     for (const column of this.columns){
    //         if (column.fieldName !== "Id" && column.type !== 'action') {
    //             this.fieldValues.push({
    //                 ...column,
    //                 value: this.rowFields[column.fieldName]
    //             })
    //         }
    //     }
    // }
 
    // handleCancel(){
    //     const closeEvent =  new CustomEvent('close', {});
 
    //     this.dispatchEvent(closeEvent);
    // }
 
    // handleSave(){
    //     const dataToSend =  this.rowFields;
    //     const saveEvenet = new CustomEvent('save', {
 
    //         //!IMPORTANT añadir una sub capa para la data y el mensaje
    //         detail: dataToSend
           
    //     });
    //     this.dispatchEvent(saveEvenet);
    // }
 
    // handleFieldChange(event){
    //     const fieldName = event.target.dataset.id;
    //     const fieldValue = event.target.value;
    //     const rowFields = {...this.rowFields};
    //     rowFields[fieldName] = fieldValue;
    //     this.rowFields = rowFields;
 
    // }

}