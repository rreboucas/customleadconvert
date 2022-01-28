({
    handleShowModal: function(component, evt, helper) {
        var modalBody;
        console.log("recid:" + component.get("v.recordId"));
        $A.createComponent("c:customLeadConvert", {leadid: component.get("v.recordId"),accountname: component.get("v.leadRecord.Company"),contactname: component.get("v.leadRecord.Name")},
           function(content, status) {
               if (status === "SUCCESS") {
                   modalBody = content;
                   component.find('overlayLib').showCustomModal({
                       header: "Convert Lead",
                       body: modalBody,
                       showCloseButton: true,
                       cssClass: "mymodal"
                   })
               }
           });
    }
})
