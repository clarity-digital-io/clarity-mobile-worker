export const prepare = (salesforceForms) => {

	const forms = salesforceForms.reduce((accum, obj) => {

		let { form, questions } = obj;

		let nForm = {
			Id: form.Id,
			Name: form.Name,
			Title__c: form.forms__Title__c,
			Status__c: form.forms__Status__c,
			Multi_Page__c: form.forms__Multi_Page__c,
			Multi_Page_Val__c: form.forms__Multi_Page_Val__c,
			Multi_Page_Info__c: form.forms__Multi_Page_Info__c,
		};

		let nQuestionOptions = new Map();
		let nQuestionCriteria = new Map();
		
		let nQuestions = questions.map(question => {

			if(question.hasOwnProperty('forms__Question_Options__r')) {
				let options = question.forms__Question_Options__r.records.map(option => {
					return {
						Id: option.Id,
						Name: option.Name,
						Question__c: option.forms__Question__c,
						Label__c: option.forms__Label__c
					}
				});
				nQuestionOptions.set(question.Id, options);
			}

			if(question.hasOwnProperty('forms__Question_Criteria__r')) {
				let criteria = question.forms__Question_Criteria__r.records.map(criteria => {
					return {
						Id: criteria.Id,
						Name: criteria.Name,
						Question__c: criteria.forms__Question__c,
						Field_Type__c: criteria.forms__Field_Type__c,
						Field__c: criteria.forms__Field__c,
						Operator__c: criteria.forms__Operator__c,
						Type__c: criteria.forms__Type__c,
						Value__c: criteria.forms__Value__c
					}
				});
				nQuestionCriteria.set(question.Id, criteria);
			}

			return {
				Id: question.Id,
				Name: question.Name, 
				Form__c: question.forms__Form__c,
				Type__c: question.forms__Type__c,
				FreeText_Type__c: question.forms__FreeText_Type__c,
				Logic__c: question.forms__Logic__c,
				Max_Length__c: question.forms__Max_Length__c,
				Max_Range__c: question.forms__Max_Range__c,
				Min_Range__c: question.forms__Min_Range__c,
				Order__c: question.forms__Order__c,
				Page__c: question.forms__Page__c,
				Required__c: question.forms__Required__c,
				Title__c: question.forms__Title__c,
			}
		});

		let preparedForm = {}; 

		preparedForm['form'] = nForm;
		preparedForm['questions'] = nQuestions; 
		preparedForm['questionoptions'] = nQuestionOptions; 
		preparedForm['questioncriteria'] = nQuestionCriteria; 

		accum = accum.concat(preparedForm);
		return accum; 

	}, [])
	
	return forms; 
}
