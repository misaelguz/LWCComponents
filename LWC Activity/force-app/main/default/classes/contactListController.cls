public with sharing class contactListController {
    @AuraEnabled
    public static List<Contact> getContacts(){
        try {
            List<Contact> lstContacts = [SELECT Id, FirstName, LastName, Email FROM Contact LIMIT 10];
            return lstContacts;
        } catch (Exception e) {
            System.debug(e.getMessage());
            throw e;
        }
    }

    @AuraEnabled
    public static Contact getContact(){
        try {
            Contact con = [SELECT Id, FirstName, LastName, Email FROM Contact WHERE Id =: 'Id'];
            return con;
        } catch (Exception e) {
            System.debug(e.getMessage());
            throw e;
        }
    }

    @AuraEnabled
    public static void deleteContact(String contactId) {
        try {
            Contact delCon = [SELECT Id FROM Contact WHERE Id = :contactId LIMIT 1];
            delete delCon;
        } catch (Exception e) {
            throw e;
        }
    }
    

    // public static Contact deleteContact(){
    //     try {
            
    //     } catch (Exception) {
            
    //     }
    // }
}