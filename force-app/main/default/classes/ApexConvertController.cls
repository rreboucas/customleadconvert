public with sharing class ApexConvertController {
    
    @AuraEnabled
    public String accountId { get;set; }
    @AuraEnabled
    public String contactId { get;set; }
    @AuraEnabled
    public String opportunityId { get;set; }

    @AuraEnabled(cacheable=false)
    public static ApexConvertController convertLead(String leadId, String ownerId) {
    
        ApexConvertController result = new ApexConvertController();
        Database.LeadConvert lc = new Database.LeadConvert();
        lc.setLeadId(leadId);
        lc.setOwnerId(ownerId);

        LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted=true LIMIT 1];
        lc.setConvertedStatus(convertStatus.MasterLabel);

        Database.LeadConvertResult lcr = Database.convertLead(lc);
        System.debug('######## lcr: ' + lcr);
        if (lcr.isSuccess())
        {
            result.accountId = lcr.getAccountId();
            result.contactId = lcr.getContactId();
            result.opportunityId = lcr.getOpportunityId();
        }

        System.debug('######## result: ' + result);
        return result;
    }
}
