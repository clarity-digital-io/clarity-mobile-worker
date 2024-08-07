export const preparePicklists = (salesforcePicklists) => {
	console.log('salesforcePicklists', salesforcePicklists); 

	const picklists = salesforcePicklists.reduce((accum, picklist) => {

		let { PicklistValues, sObjectName, Name, Controller } = picklist;

		let nPicklist = {
			Id: sObjectName + '-' + Name,
			Name: Name,
			sObjectName: sObjectName,
			Controller: Controller
		};

		let nPicklistValues = PicklistValues.map(val => {
			return {
				Id: sObjectName + '-' + val.Label,
				Label: val.Label, 
				APIName: val.APIName
			}
		});

		let preparedPicklist = {}; 

		preparedPicklist['picklist'] = nPicklist;
		preparedPicklist['values'] = nPicklistValues;

		accum = accum.concat(preparedPicklist);

		return accum;

	}, []); 
	
	return picklists; 
}
