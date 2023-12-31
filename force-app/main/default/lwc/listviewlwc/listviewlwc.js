import { LightningElement,track,api} from 'lwc';
import getAccountList from '@salesforce/apex/GetListViewAccount.getAccounts'; 
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
// datatable columns
const cols = [
    {label: 'Account Name',fieldName: 'Name'},     
    {label: 'Type',fieldName: 'Type'},     
    {label: 'Rating',fieldName: 'Rating'},
	{label: 'Phone',fieldName: 'Phone',type: 'phone'},
	{label: 'Website',fieldName: 'Website'},     
    ];
   
export default class Listviewlwc extends LightningElement {
    @api c__data;
    @track error;
	@track data;
	@track columns = cols;	
	@track count;
    connectedCallback(){    
        if(this.c__data!="" && this.c__data!=null && this.c__data!=undefined){
            var recids=this.c__data.split('-');                       
            this.getallaccounts(recids);
        }		
	}

    // fetching accounts from server using apex handler
	getallaccounts(recids) {
		getAccountList({lstRecIds:recids}).then(result => {
			console.log(result);
			this.data = result;			
			this.count=result!=null?result.length:0;
			this.error = undefined;
		})
		.catch(error => {
			this.data = undefined;
			this.error = error;
			this.count=0;
			this.dispatchEvent(
				new ShowToastEvent({
					title: 'Error while getting accounts', 
					message: error.message, 
					variant: 'error'
				}),
			);        
		});
	}
}