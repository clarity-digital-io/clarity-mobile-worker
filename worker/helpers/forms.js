export const prepare = (salesforceForms) => {

	const forms = salesforceForms.reduce((accum, obj) => {

		let { form, questions, connections } = obj;

		let nForm = {
			Id: form.Id,
			Name: form.Name,
			Title: form.forms__Title__c,
			Status: form.forms__Status__c,
			Multi_Page: form.forms__Multi_Page__c,
			Multi_Page_Val: form.forms__Multi_Page_Val__c,
			Multi_Page_Info: form.forms__Multi_Page_Info__c,
			Description: form.forms__Description__c,
			ChecklistGroup: form.forms__Checklist_Group__c
		};

		let nQuestionOptions = new Map();
		let nQuestionCriteria = new Map();
		let nConnectionFields = new Map();
		
		let nQuestions = questions.map(question => {

			if(question.hasOwnProperty('forms__Question_Options__r')) {
				let options = question.forms__Question_Options__r.records.map(option => {
					return {
						Id: option.Id,
						Name: option.Name,
						Question: option.forms__Question__c,
						Label: option.forms__Label__c
					}
				});
				nQuestionOptions.set(question.Id, options);
			}

			if(question.hasOwnProperty('forms__Question_Criteria__r')) {
				let criteria = question.forms__Question_Criteria__r.records.map(criteria => {
					return {
						Id: criteria.Id,
						Name: criteria.Name,
						Question: criteria.forms__Question__c,
						Field_Type: criteria.forms__Field_Type__c,
						Field: criteria.forms__Field__c,
						Operator: criteria.forms__Operator__c,
						Type: criteria.forms__Type__c,
						Value: criteria.forms__Value__c
					}
				});
				nQuestionCriteria.set(question.Id, criteria);
			}

			return {
				Id: question.Id,
				Name: question.Name, 
				Form: question.forms__Form__c,
				Type: question.forms__Type__c,
				FreeText_Type: question.forms__FreeText_Type__c,
				Logic: question.forms__Logic__c,
				Max_Length: question.forms__Max_Length__c,
				Max_Range: question.forms__Max_Range__c,
				Min_Range: question.forms__Min_Range__c,
				Order: question.forms__Order__c,
				Page: question.forms__Page__c,
				Required: question.forms__Required__c,
				Title: question.forms__Title__c,
				Record_Group: question.forms__Record_Group__c,
				Salesforce_Field: question.forms__Salesforce_Field__c
			}

		});

		let nConnections = connections.map(connection => {

			if(connection.hasOwnProperty('forms__Form_Connection_Fields__r')) {
				let fields = connection.forms__Form_Connection_Fields__r.records.map(field => {
					return {
						Id : field.Id,
						Name : field.Name,
						Form_Connection : field.forms__Form_Connection__c,
						Question : field.forms__Question__c,
						Custom_Value : field.forms__Custom_Value__c,
						PreFill : field.forms__PreFill__c,
						Salesforce_Field : field.forms__Salesforce_Field__c
					}
				});
				nConnectionFields.set(connection.Id, fields);
			}

			return {
				Id: connection.Id,
				Name: connection.Name, 
				Form: connection.forms__Form__c,
				New: connection.forms__New__c,
				Salesforce_Object: connection.forms__Salesforce_Object__c,
				Type: connection.forms__Type__c,
			}

		});

		let preparedForm = {}; 

		preparedForm['form'] = nForm;
		preparedForm['questions'] = nQuestions; 
		preparedForm['questionoptions'] = nQuestionOptions; 
		preparedForm['questioncriteria'] = nQuestionCriteria; 
		preparedForm['connections'] = nConnections; 
		preparedForm['connectionfields'] = nConnectionFields; 

		accum = accum.concat(preparedForm);
		return accum; 

	}, []);
	
	return forms; 
}
