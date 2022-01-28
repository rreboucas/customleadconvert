import { LightningElement, api, wire  } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import LEANDATAIMG from '@salesforce/resourceUrl/leandatalogo';

const ACCTFIELDS = [
    'Account.Name',
    'Account.Type',
    'Account.Industry',
    'Account.SDO_Sales_Closed_Won_Value__c',
    'Account.NumberOfEmployees'
];

const CONTACTFIELDS = [
    'Contact.Name',
    'Contact.Title',
    'Contact.Phone',
    'Contact.Email'
];

const FIELDS = ['Contact.Name', 'Contact.Phone'];

const OPTYFIELDS = [
    'Opportunity.Name',
    'Opportunity.Amount',
    'Opportunity.CloseDate',
    'Opportunity.Probability'
];

export default class Result extends NavigationMixin(LightningElement) {
    @api accountid;
    @api contactid;
    @api opptyid;

    logoUrl = LEANDATAIMG;

    account;
    contact;
    opportunity;    

    accountname;
    actype;
    actindustry;
    actsales;
    actemployees;
    contactname;
    contactitle;
    contactphone;
    contactemail;
    opptyname;
    opptyamount;
    opptyclosedt;
    opptyprob;

    @wire(getRecord, { recordId: '$accountid', fields: ACCTFIELDS })
    wiredAccount({ error, data }) {
        if (error) {
            let message = 'Unknown error';
            if (Array.isArray(error.body)) {
                message = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                message = error.body.message;
            }
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading contact',
                    message,
                    variant: 'error',
                }),
            );
        } else if (data) {
            this.account = data;
            console.log('result.js - data: ' + this.account);
            this.accountname = this.account.fields.Name.value;
            this.actype = this.account.fields.Type.value;
            this.actindustry = this.account.fields.Industry.value;
            this.actsales = this.account.fields.SDO_Sales_Closed_Won_Value__c.value;
            this.actemployees = this.account.fields.NumberOfEmployees.value;
        }
    }

    @wire(getRecord, { recordId: '$contactid', fields: CONTACTFIELDS })
    wiredContact({ error, data }) {
        if (error) {
            let message = 'Unknown error';
            if (Array.isArray(error.body)) {
                message = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                message = error.body.message;
            }
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading contact',
                    message,
                    variant: 'error',
                }),
            );
        } else if (data) {
            this.contact = data;
            console.log('result.js - data: ' + this.contact);
            this.contactname = this.contact.fields.Name.value;
            this.contactitle = this.contact.fields.Title.value;
            this.contactphone = this.contact.fields.Phone.value;
            this.contactemail = this.contact.fields.Email.value;
        }
    }

    @wire(getRecord, { recordId: '$opptyid', fields: OPTYFIELDS })
    wiredOppty({ error, data }) {
        if (error) {
            let message = 'Unknown error';
            if (Array.isArray(error.body)) {
                message = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                message = error.body.message;
            }
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading contact',
                    message,
                    variant: 'error',
                }),
            );
        } else if (data) {
            this.opportunity = data;
            console.log('result.js - data: ' + this.opportunity);
            this.opptyname = this.opportunity.fields.Name.value;
            this.opptyamount = this.opportunity.fields.Amount.value;
            this.opptyclosedt = this.opportunity.fields.CloseDate.value;
            this.opptyprob = this.opportunity.fields.Probability.value;
        }
    }

    navToAccount(event) {
        // Navigate to the Account record page
        // Prevents the anchor element from navigating to a URL.
        event.preventDefault();

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.accountid,
                actionName: 'view'
            }
        });
    }

    navToOppty(event) {
        // Navigate to the Account record page
        // Prevents the anchor element from navigating to a URL.
        event.preventDefault();

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.opptyid,
                actionName: 'view'
            }
        });
    }

    navToContact(event) {
        // Navigate to the Account record page
        // Prevents the anchor element from navigating to a URL.
        event.preventDefault();

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.contactid,
                actionName: 'view'
            }
        });
    }

    connectedCallback() {

        

    }

  
}