public class ListViewExtension {
    public List<Account> selAccounts;
    public String accountIds;
    
    // Constructor
    public ListViewExtension(ApexPages.StandardSetController cntlr){
        selAccounts = cntlr.getSelected(); //get selected records from account list view
        accountIds = '';  
        for(Account acc : selAccounts){
            accountIds += acc.Id + '-'; //build list of ids string concatenated with comma                         
        }
        accountIds = accountIds.removeEnd('-'); 
    } 
    
    public PageReference redirectToLC(){
        /*
        Important:
        in the below line c__lwc=c:listviewlwc, listviewlwc is my lwc component, please make sure you will put 
        correct name of your lwc component in this parameter
        */
        String returnUrl ='/lightning/cmp/c__ListViewCMP?c__lwc=c:listviewlwc&c__data='+accountIds;
        PageReference pgReturnPage = new PageReference(returnUrl);
        pgReturnPage.setRedirect(true);
        return pgReturnPage;
    }
}