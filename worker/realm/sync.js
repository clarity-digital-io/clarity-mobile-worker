export const sync = (realm, forms, groups, syncForm) => {

	realm.write(() => {

		forms.forEach(preparedForm => {

			let form = preparedForm.form; 
			let questions = preparedForm.questions;
			let questionoptions = preparedForm.questionoptions;
			let questioncriteria = preparedForm.questioncriteria;
			let connections = preparedForm.connections;
			let connectionFields = preparedForm.connectionfields;

			let updatedForm = realm.create('Form', form, 'all');
			let questionsList = updatedForm.Questions;
			let connectionsList = updatedForm.Form_Connections;
			
			/**
			 * Insert Questions / Question Options / Question Criteria
			 */
			if(questionsList.length > 0) {
				realm.delete(questionsList);
			}

			questions.forEach(question => {

				questionsList.push(question); 

			});

			let newQuestions1 = realm.objects('Question').filtered('Form == $0', preparedForm.Id);

			//need to get only questions with the form we are updating with it's a form sync
			let newQuestions = realm.objects('Question');//.filtered('Form == $0', preparedForm.Id); //can query for the ones with options here

			newQuestions.forEach(question => {

				let questionOptionsList = question.Question_Options;
				let questionCriteriaList = question.Question_Criteria;
				
				console.log('questionOptionsList WHY 0000', JSON.stringify(questionOptionsList), questionOptionsList.length);

				if(questionOptionsList.length > 0) {
					console.log('!!!!!!!');

					questionOptionsList = realm.delete(questionOptionsList);

					console.log('question.Question_Options', JSON.stringify(question.Question_Options)); 

					questionOptionsList = question.Question_Options; 

				}

				if(questionCriteriaList.length > 0) {
					questionCriteriaList = realm.delete(questionCriteriaList);
				}

				let actualQuestionOptions = questionoptions.has(question.Id) ? questionoptions.get(question.Id) : [];
				actualQuestionOptions.forEach(option => {
					console.log('questionOptionsList', JSON.stringify(questionOptionsList), questionOptionsList.length);
					console.log('option', option);
					//need to check if questionOptionsList already has the same id repace with new
					questionOptionsList.push(option); 
				});

				let actualQuestionCriteria = questioncriteria.has(question.Id) ? questioncriteria.get(question.Id) : [];

				actualQuestionCriteria.forEach(criteria => {
					questionCriteriaList.push(criteria)
				});
	
			});

			/**
			 * Insert Connections / Connection Fields
			 */
			if(connectionsList.length > 0) {
				realm.delete(connectionsList);
			}
			
			connections.forEach(connection => {

				connectionsList.push(connection); 

			});

			let newConnections = realm.objects('Form_Connection'); //can query for the ones with options here

			newConnections.forEach(connection => {

				let connectionFieldsList = connection.Form_Connection_Fields;

				let actualConnectionFields = connectionFields.has(connection.Id) ? connectionFields.get(connection.Id) : [];
				
				actualConnectionFields.forEach(field => {
					connectionFieldsList.push(field); 
				});

	
			});

		});

		groups.forEach(group => {
			
			realm.create('ChecklistGroup', group, 'all');

		})

	});

}