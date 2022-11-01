/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 10-31-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class SearchController {
   
        /* public AccountSearchController() {
     
         }*/
         @AuraEnabled(cacheable=true)
         public static List <project__c> getProjects(){
             List <project__c> projectlist = new List <project__c>();
             projectlist = [SELECT Id, Name from project__c];
                 return projectlist;
             }

             @AuraEnabled(cacheable=true)
             public static List <cluster__c> getClusters(String projectid){
                 List <cluster__c> clusterlist = new List <cluster__c>();
             clusterlist = [SELECT Id, Name from cluster__c where Project__c=:projectid];
                 return clusterlist;
                 }
        
                 @AuraEnabled(cacheable=true)
                 public static List <tower__c> getTowers(String clusterid){
                     List <tower__c> towerlist = new List <tower__c>();
                     towerlist = [SELECT Id, Name from tower__c where Cluster__c=:clusterid];
                     return towerlist;
                     }
            
                     @AuraEnabled(cacheable=true)
                     public static List <wing__c> getWings(String towerid){
                         List <wing__c> winglist = new List <wing__c>();
                         winglist = [SELECT Id, Name from wing__c where Tower__c=:towerid];
                         return winglist;
                         }
                         
                         @AuraEnabled(cacheable=true)
                         public static List <Unit__c> getUnits(){
                            List <Unit__c> UnitList = [Select Id, Name from Unit__c];
                            return UnitList;
                         }
         
}
