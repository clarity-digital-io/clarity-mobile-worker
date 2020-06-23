export const sync = async(realm, forms) => {

	realm.write(() => {

		forms.forEach(preparedForm => {

			let form = preparedForm.form; 
			let questions = preparedForm.questions;
			let questionoptions = preparedForm.questionoptions;
			let questioncriteria = preparedForm.questioncriteria;
			console.log('questioncriteria', questioncriteria); 
			let updatedForm = realm.create('Form__c', form, 'all');
			let questionsList = updatedForm.Questions__r;

			if(questionsList.length > 0) {
				realm.delete(questionsList);
			}

			questions.forEach(question => {

				questionsList.push(question); 

			});

			let newQuestions = realm.objects('Question__c'); //can query for the ones with options here

			newQuestions.forEach(question => {

				let questionOptionsList = question.Question_Options__r;
				let questionCriteriaList = question.Question_Criteria__r;
				
				// if(questionOptionsList.length > 0) {
				// 	realm.delete(questionOptionsList);
				// }

				// if(questionCriteriaList.length > 0) {
				// 	realm.delete(questionCriteriaList);
				// }

				let actualQuestionOptions = questionoptions.has(question.Id) ? questionoptions.get(question.Id) : [];
				
				actualQuestionOptions.forEach(option => {
					questionOptionsList.push(option); 
				});

				let actualQuestionCriteria = questioncriteria.has(question.Id) ? questioncriteria.get(question.Id) : [];

				actualQuestionCriteria.forEach(criteria => {
					questionCriteriaList.push(criteria); 
				});
	
			});

		});

	});

	realm.close(); 

}