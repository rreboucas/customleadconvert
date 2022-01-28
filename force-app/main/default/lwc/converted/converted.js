import { LightningElement, api, wire } from 'lwc';
import { getAccountRecord } from 'lightning/uiRecordApi';
import { getContactRecord } from 'lightning/uiRecordApi';
import { getOpportunityRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

const ACCTFIELDS = [
    'Account.Name',
    'Account.Type',
    'Account.Industry',
    'Account.SDO_Sales_Closed_Won_Value__c',
    'Account.NumberOfEmployees',
];

const CONTACTFIELDS = [
    'Opportunity.Name',
    'Opportunity.Title',
    'Opportunity.Phone',
    'Opportunity.Email',
];

const OPTYFIELDS = [
    'Contact.Name',
    'Contact.Amount',
    'Contact.CloseDate',
    'Contact.Probability',
];


export default class Converted extends NavigationMixin(LightningElement) {
    @api accountid;
    @api contactid;
    @api opptyid;

    @wire(getAccountRecord, { recordId: '$accountid', fields: ACCTFIELDS })
    account;

    @wire(getContactRecord, { recordId: '$contactid', fields: CONTACTFIELDS })
    contact;

    @wire(getOpportunityRecord, { recordId: '$opptyid', fields: OPTYFIELDS })
    opportunity;

    // Account Fields:
    get accountname() {
        return this.account.data.fields.Name.value;
    }
    get accountype() {
        return this.account.data.fields.Type.value;
    }
    get accountindustry() {
        return this.account.data.fields.Industry.value;
    }
    get accountsales() {
        return this.account.data.fields.SDO_Sales_Closed_Won_Value__c.value;
    }
    get accountemployees() {
        return this.account.data.fields.NumberOfEmployees.value;
    }
    
    // Contact Fields:
    get contactname() {
        return this.contact.data.fields.Name.value;
    }
    get contacttitle() {
        return this.contact.data.fields.Title.value;
    }
    get contactphone() {
        return this.contact.data.fields.Phone.value;
    }
    get contactemail() {
        return this.contact.data.fields.Email.value;
    }

    // Opportunity Fields:
    get opptyname() {
        return this.opportunity.data.fields.Name.value;
    }
    get opptyamount() {
        return this.opportunity.data.fields.Amount.value;
    }
    get opptyclosedate() {
        return this.opportunity.data.fields.CloseDate.value;
    }
    get opptyprob() {
        return this.opportunity.data.fields.Probability.value;
    }

}