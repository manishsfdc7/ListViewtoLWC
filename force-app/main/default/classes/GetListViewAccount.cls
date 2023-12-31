public class GetListViewAccount {
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts(List<Id> lstRecIds){
        return [SELECT Id, Name,Type, Phone, Rating,Website FROM Account WHERE Id IN:lstRecIds ORDER BY Name];
    }
}