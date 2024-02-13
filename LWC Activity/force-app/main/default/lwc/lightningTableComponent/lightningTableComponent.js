import { LightningElement, api } from 'lwc';
import getContacts from '@salesforce/apex/contactListController.getContacts';
import deleteContact from '@salesforce/apex/contactListController.deleteContact';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'



export default class LightningTableComponent extends LightningElement {
    @api record;
    title;
    lstContacts;
    displayModal = false;
    data = [];
    
    async connectedCallback(){
        try {
            await this.obtainContacts();
        } catch (error) {
            console.error(error);
        }
    }
    recordData= {
        Id: null,
        FirstName: "",
        LastName: "",
        Email: "",
    }
    actions = [
        {
            label:'Show Detail',
            name: 'showDetails'
        },
        {
            label:'Delete',
            name: 'delete'
        },
    ];

    data = [
        {
            firstName: 'John',
            lastName: 'Smith',
            Email: 'johnsmith@deloitte.com'
        }
    ];

    columns = [
        {
            label: 'Id',
            fieldName: 'Id'
        },
        {
            label: 'Name',
            fieldName: 'FirstName'
        },
        {
            label: 'Last Name',
            fieldName: 'LastName'
        },
        {
            label: 'Email',
            fieldName: 'Email'
        },
        {
            type: "action",
            typeAttributes: {rowActions: this.actions}
        },
    ];
    
    async handleRowAction(event){
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        const contactId = row.Id;
        //console.log(actionName);

        switch(actionName){
            case 'showDetails':
                console.log('Modal abierto desde Show Details', contactId);
                this.title="Details";
                this.record = row;
                this.handleOpenModal();
                this.handleEditData(this.record);
                break;
            case 'delete':
                try {
                    const contactId = row.Id ? row.Id : row;
                    console.log(contactId)
                    await this.deleteContact(contactId);
                    this.showDeletedToast();
                } catch(error) {
                    console.error('Error al eliminar el contacto:', error);
                }
                break;
        }


    }


    handleOpenModal(){
        this.displayModal = true;
    }

    handleCloseModal(event){
        const message = event.detail.message;
        console.log(message)
        this.displayModal = false;
    }
    handleEditData(row){
        this.recordData = row;
        console.log('Record Data', this.recordData);
    }
    handleOpenButton() {
        this.record = {};
        this.title="Create new contact";
        //this.record = row; // Prepara un objeto vacío para un nuevo contacto
        this.handleOpenModal(); // Abre el modal
    }

    handleSuccess(modalEvent){
        try {
            const record = modalEvent.detail.record;
            const rowId = modalEvent.detail.row.Id;
            console.log("Record from form: " , record);
            console.log("List contact format ", this.lstContacts);
            this.displayModal = false;
            mappedRecord = 
            {
                FirstName: record.FirstName.value,
                LastName: record.LastName.value,
                Email: record.Email.value,
                Id:record.Id.value

            }; 
            this.lstContacts = this.lstContacts.map(contact => (contact.Id == mappedRecord.Id) ? mappedRecord : contact);
        }catch(err){
            console.log(err.getMessage());
            throw err;
        }
    }

    async deleteContact(contactId) {
        try {
            await deleteContact({ contactId });
            // Actualizar la lista de contactos después de eliminar el contacto
            this.lstContacts = this.lstContacts.filter(contact => contact.Id !== contactId);
        } catch (error) {
            console.error('Error al eliminar el contacto:', error);
            // Puedes mostrar un mensaje de error al usuario aquí si lo deseas
        }
    }
    
    async obtainContacts(){
        try {
            const contacts = await getContacts();
            this.lstContacts = contacts;
            console.log('contacts: ',this.lstContacts);
        } catch (error) {
            console.error(error);
            
        }
    }

    showDeletedToast(){
        const event = new ShowToastEvent({
            title: 'Success!',
            message: 'Record deleted',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    showToast(){
        const event = new ShowToastEvent({
            title: 'Success!',
            message: 'Record updated',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
}