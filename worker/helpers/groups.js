export const prepareGroups = (salesforceGroups) => {

	const groups = salesforceGroups.map((group) => {

		let nGroup = {
			Id: group.Id,
			Name: group.Name,
			Standard: group.forms__Standard__c
		};

		return nGroup;

	})
	
	return groups; 
}
